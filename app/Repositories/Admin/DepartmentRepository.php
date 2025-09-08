<?php

namespace App\Repositories\Admin;

use App\Models\Department;
use App\Models\DepartmentCategoryContent;
use App\Models\DepartmentContent;
use App\Models\Setting;
use App\Repositories\SettingRepository;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class DepartmentRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected Department $model;

    /**
     *  Constructor for Department repository
     */
    public function __construct(Department $department)
    {
        $this->model = $department;
    }

    /**
     * Get departments
     */
    public function paginateSearchResult($search, array $sort = [], array $filter = []): LengthAwarePaginator
    {
        $query = $this->model->with(['content', 'category.content', 'contents'])->newQuery();

        if ($search) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('language_code', app()->getLocale())
                    ->where('title', 'like', '%' . $search . '%');
            });
        }

        // Filter department by category title
        if (isset($filter['category']) && $filter['category'] !== 'All Categories') {
            $query->whereHas('category.content', function ($categoryQuery) use ($filter) {
                $categoryQuery->where('title', $filter['category']);
            });
        }

        // sort
        if (isset($sort['column']) && isset($sort['order'])) {
            $column = $sort['column'];
            $order = $sort['order'];

            if ($column === 'title') {
                $query->orderBy(DepartmentContent::select($sort['column'])
                    ->whereColumn('departments.id', 'department_contents.department_id')
                    ->where('language_code', app()->getLocale()), $sort['order']);
            } elseif ($column === 'category' || $column === 'category_title') {
                $query->orderBy(
                    DepartmentCategoryContent::select('title')
                        ->whereColumn('department_category_contents.department_category_id', 'departments.category_id')
                        ->where('language_code', app()->getLocale()),
                    $order
                );
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
     * Store department
     */
    public function store(Request $request): void
    {
        $default_lang = Setting::pull('default_lang');

        $department = $this->model->create([
            'slug' => Str::slug($request->pageInfo[$default_lang]['title']),
            'category_id' => $request->pageInfo[$default_lang]['category'],
            'is_show_breadcrumb' => $request->pageInfo[$default_lang]['is_show_breadcrumb'] ? '1' : '0',
            'breadcrumb_image' => $request->pageInfo[$default_lang]['breadcrumb_image'],
            'header_layout' => $request->pageInfo[$default_lang]['header_layout'],
            'footer_layout' => $request->pageInfo[$default_lang]['footer_layout'],
            'sections' => json_encode($request->customizeSections),
            'meta_image' => $request->pageInfo[$default_lang]['meta_image'],
        ]);

        foreach ($request->pageData as $key => $value) {
            DepartmentContent::create([
                'department_id' => $department->id,
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
     * Update department
     */
    public function update(Request $request, Department $department): void
    {
        $default_lang = Setting::pull('default_lang');
        $department->update([
            'category_id' => $request->pageInfo[$default_lang]['category'],
            'is_show_breadcrumb' => $request->pageInfo[$default_lang]['is_show_breadcrumb'] ? '1' : '0',
            'breadcrumb_image' => $request->pageInfo[$default_lang]['breadcrumb_image'],
            'header_layout' => $request->pageInfo[$default_lang]['header_layout'],
            'footer_layout' => $request->pageInfo[$default_lang]['footer_layout'],
            'sections' => json_encode($request->customizeSections),
            'meta_image' => $request->pageInfo[$default_lang]['meta_image'],
        ]);

        foreach ($request->pageData as $key => $value) {
            DepartmentContent::updateOrCreate([
                'department_id' => $department->id,
                'language_code' => $key,
            ], [
                'department_id' => $department->id,
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
     * department delete
     */
    public function destroy(Department $department): void
    {
        $department->delete();
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request): void
    {
        $idArray = explode(',', $request->ids);
        $this->model->destroy($idArray);
    }

    /**
     * department slug update
     */
    public function updateSlug(Request $request, Department $department)
    {
        $department->update(['slug' => $request->input('slug')]);
    }

    /**
     * Get department data.
     */
    public function getDepartmentData(Department $department)
    {
        $department->load('contents');
        $formattedPageData = [];
        $formattedPageInfo = [];

        foreach ($department->contents as $departmentContent) {
            // Prepare case study data
            $content = json_decode($departmentContent->sections_data, true);
            $formattedPageData[$departmentContent->language_code] = $content;

            // Prepare case study info
            $formattedPageInfo[$departmentContent->language_code] = [
                'title' => $departmentContent->title,
                'breadcrumb_title' => $departmentContent->breadcrumb_title,
                'header_action_button_text' => $departmentContent->header_action_button_text,
                'header_action_button_url' => $departmentContent->header_action_button_url,
                'meta_title' => $departmentContent->meta_title,
                'meta_tags' => $departmentContent->meta_tags,
                'meta_description' => $departmentContent->meta_description,
                'category' => $department->category_id,
                'meta_image' => $department->meta_image,
                'header_layout' => $department->header_layout,
                'footer_layout' => $department->footer_layout,
                'is_show_breadcrumb' => (bool) $department->is_show_breadcrumb,
                'breadcrumb_image' => $department->breadcrumb_image,
            ];
        }

        $data['page_data'] = $formattedPageData;
        $data['page_info'] = $formattedPageInfo;

        return $data;
    }

    public function clone(Department $department)
    {
        $newDepartment = $department->replicate();
        $newDepartment->slug = $department->slug . '-' . Str::random(6);
        $newDepartment->save();

        foreach ($department->contents as $content) {
            $newContent = $content->replicate();
            $newContent->department_id = $newDepartment->id;
            $newContent->save();
        }
    }
}
