<?php

namespace App\Repositories\Admin;

use App\Models\Doctor;
use App\Models\DoctorContent;
use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class DoctorRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected Doctor $model;

    /**
     *  Constructor for Doctor repository
     */
    public function __construct(Doctor $doctor)
    {
        $this->model = $doctor;
    }

    /**
     * Get services
     *
     * @param  array  $filter
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->with('content')->newQuery();

        if ($search) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('language_code', app()->getLocale())
                    ->where('title', 'like', '%' . $search . '%');
            });
        }

        // sort doctor
        if (isset($sort['column']) && isset($sort['order'])) {
            $column = $sort['column'];
            $order = $sort['order'];

            if ($column === 'title') {
                $query->orderBy(DoctorContent::select($sort['column'])
                    ->whereColumn('doctors.id', 'doctor_contents.doctor_id')
                    ->where('language_code', app()->getLocale()), $sort['order']);
            } else {
                $query->orderBy($column, $order);
            }
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
                'lang' => app()->getLocale(),
            ]));
    }

    /**
     * Store Doctor
     */
    public function store(Request $request): void
    {
        $default_lang = Setting::pull('default_lang');
        $doctor = Doctor::create([
            'slug' => Str::slug($request->pageInfo[$default_lang]['title']),
            'is_show_breadcrumb' => $request->pageInfo[$default_lang]['is_show_breadcrumb'] ? '1' : '0',
            'breadcrumb_image' => $request->pageInfo[$default_lang]['breadcrumb_image'],
            'header_layout' => $request->pageInfo[$default_lang]['header_layout'],
            'footer_layout' => $request->pageInfo[$default_lang]['footer_layout'],
            'sections' => json_encode($request->customizeSections),
            'meta_image' => $request->pageInfo[$default_lang]['meta_image'],
        ]);

        foreach ($request->pageData as $key => $value) {
            DoctorContent::create([
                'doctor_id' => $doctor->id,
                'language_code' => $key,
                'title' => $request->pageInfo[$key]['title'],
                'breadcrumb_title' => $request->pageInfo[$key]['breadcrumb_title'],
                'header_action_button_text' => $request->pageInfo[$key]['header_action_button_text'],
                'header_action_button_url' => $request->pageInfo[$key]['header_action_button_url'],
                'meta_title' => $request->pageInfo[$key]['meta_title'],
                'meta_description' => $request->pageInfo[$key]['meta_description'],
                'meta_tags' => $request->pageInfo[$key]['meta_tags'],
                'sections_data' => json_encode($request->pageData[$key]),
            ]);
        }
    }

    /**
     * Update doctor
     */
    public function update(Request $request, Doctor $doctor): void
    {
        $default_lang = Setting::pull('default_lang');
        $doctor->update([
            'is_show_breadcrumb' => $request->pageInfo[$default_lang]['is_show_breadcrumb'] ? '1' : '0',
            'breadcrumb_image' => $request->pageInfo[$default_lang]['breadcrumb_image'],
            'header_layout' => $request->pageInfo[$default_lang]['header_layout'],
            'footer_layout' => $request->pageInfo[$default_lang]['footer_layout'],
            'sections' => json_encode($request->customizeSections),
            'meta_image' => $request->pageInfo[$default_lang]['meta_image'],
        ]);

        foreach ($request->pageData as $key => $value) {
            DoctorContent::updateOrCreate(
                [
                    'doctor_id' => $doctor->id,
                    'language_code' => $key,
                ],
                [
                    'doctor_id' => $doctor->id,
                    'language_code' => $key,
                    'title' => $request->pageInfo[$key]['title'],
                    'breadcrumb_title' => $request->pageInfo[$key]['breadcrumb_title'],
                    'header_action_button_text' => $request->pageInfo[$key]['header_action_button_text'],
                    'header_action_button_url' => $request->pageInfo[$key]['header_action_button_url'],
                    'meta_title' => $request->pageInfo[$key]['meta_title'],
                    'meta_description' => $request->pageInfo[$key]['meta_description'],
                    'meta_tags' => $request->pageInfo[$key]['meta_tags'],
                    'sections_data' => json_encode($request->pageData[$key]),
                ]
            );
        }
    }

    /**
     * Delete doctor
     */
    public function destroy(Doctor $doctor): void
    {
        $doctor->delete();
    }

    /**
     * Bulk doctor delete
     */
    public function bulkDelete(Request $request): void
    {
        $idArray = explode(',', $request->ids);
        $this->model->destroy($idArray);
    }

    public function getDoctorData(Doctor $doctor)
    {
        $doctor->load('contents');
        $formattedPageData = [];
        $formattedPageInfo = [];

        foreach ($doctor->contents as $doctorContent) {
            $content = json_decode($doctorContent->sections_data, true);
            $formattedPageData[$doctorContent->language_code] = $content;
            $formattedPageInfo[$doctorContent->language_code] = [
                'title' => $doctorContent->title,
                'breadcrumb_title' => $doctorContent->breadcrumb_title,
                'header_action_button_text' => $doctorContent->header_action_button_text,
                'header_action_button_url' => $doctorContent->header_action_button_url,
                'meta_title' => $doctorContent->meta_title,
                'meta_description' => $doctorContent->meta_description,
                'meta_tags' => $doctorContent->meta_tags,
                'meta_image' => $doctor->meta_image,
                'header_layout' => $doctor->header_layout,
                'footer_layout' => $doctor->footer_layout,
                'is_show_breadcrumb' => (bool) $doctor->is_show_breadcrumb,
                'breadcrumb_image' => $doctor->breadcrumb_image,
            ];
        }

        $data['page_data'] = $formattedPageData;
        $data['page_info'] = $formattedPageInfo;

        return $data;
    }

    /**
     * doctor slug update
     */
    public function updateSlug(Request $request, Doctor $doctor)
    {
        $doctor->update(['slug' => $request->input('slug')]);
    }

    public function clone(Doctor $doctor)
    {
        $newDoctor = $doctor->replicate();
        $newDoctor->slug = $doctor->slug . '-' . Str::random(6);
        $newDoctor->save();

        foreach ($doctor->contents as $content) {
            $newContent = $content->replicate();
            $newContent->doctor_id = $newDoctor->id;
            $newContent->save();
        }
    }
}
