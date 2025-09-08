<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\Department\DepartmentCategoryStoreRequest;
use App\Http\Requests\Admin\Department\DepartmentCategoryUpdateRequest;
use App\Models\Department;
use App\Models\DepartmentCategory;
use App\Models\DepartmentCategoryContent;
use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class DepartmentCategoryRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected DepartmentCategory $model;

    /**
     *  Constructor for Category repository
     */
    public function __construct(DepartmentCategory $category)
    {
        $this->model = $category;
    }

    /**
     * Get search result with paginate
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->with('content')->newQuery();

        // search category
        if (isset($search)) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('language_code', app()->getLocale())
                    ->where('title', 'like', '%' . $search . '%');
            });
        }

        // sort category
        if (isset($sort['column']) && isset($sort['order'])) {
            $column = $sort['column'];
            $order = $sort['order'];

            if ($column === 'title') {
                $query->orderBy(DepartmentCategoryContent::select($sort['column'])
                    ->whereColumn('department_categories.id', 'department_category_contents.department_category_id')
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
     * Store category
     */
    public function store(DepartmentCategoryStoreRequest $request): void
    {
        $testimonial = $this->model->create($request->all());

        $languages = json_decode(Setting::pull('languages'), true);
        $content = array_map(function ($language) use ($request) {
            $langCode = $language['code'];

            return [
                'language_code' => $langCode,
                'title' => $request[$langCode . '_title'],
            ];
        }, $languages);

        $testimonial->contents()->createMany($content);
    }

    /**
     * Get edited data
     */
    public function getEditData(DepartmentCategory $departmentCategory): array
    {
        $languages = json_decode(Setting::pull('languages'), true);
        $data = [
            'id' => $departmentCategory->id,
            'created_at' => $departmentCategory->created_at,
        ];

        foreach ($languages as $language) {
            $langCode = $language['code'];
            $data[$langCode . '_title'] = '';
        }

        foreach ($departmentCategory->contents as $content) {
            $langCode = $content->language_code;
            $data[$langCode . '_title'] = $content->title;
        }

        return $data;
    }

    /**
     * Update category
     */
    public function update(DepartmentCategory $departmentCategory, DepartmentCategoryUpdateRequest $request): void
    {
        if ($departmentCategory?->content?->title == 'Uncategorized') {
            throw new \Exception('The category cannot be updated.');
        }

        $languages = json_decode(Setting::pull('languages'), true);
        foreach ($languages as $language) {
            $langCode = $language['code'];

            $departmentCategory->contents()->updateOrCreate(
                ['language_code' => $langCode],
                [
                    'title' => $request[$langCode . '_title'],
                ],
            );
        }
    }

    /**
     * Bulk delete
     */
    public function bulkDelete($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->destroy($idArray);
    }

    /**
     * Delete category
     *
     * @throws \Exception
     */
    public function destroy(DepartmentCategory $departmentCategory): void
    {
        $departmentCategory->delete();
    }
}
