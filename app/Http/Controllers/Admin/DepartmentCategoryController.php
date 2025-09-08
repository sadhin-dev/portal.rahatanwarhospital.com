<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Department\DepartmentCategoryStoreRequest;
use App\Http\Requests\Admin\Department\DepartmentCategoryUpdateRequest;
use App\Models\DepartmentCategory;
use App\Models\Setting;
use App\Repositories\Admin\DepartmentCategoryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentCategoryController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'bulkDelete', 'update', 'store']]);
    }

    public function index(Request $request, DepartmentCategoryRepository $repository)
    {
        if (Setting::pull("is_enabled_departments") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['categories'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Departments/Categories/Index', $data);
    }

    /**
     * Create category
     */
    public function create()
    {
        if (Setting::pull("is_enabled_departments") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));

        return Inertia::render('Departments/Categories/Create', $data);
    }

    /**
     * Edit Department
     */
    public function edit(DepartmentCategory $departmentCategory, DepartmentCategoryRepository $repository)
    {
        if (Setting::pull("is_enabled_departments") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['category'] = $repository->getEditData($departmentCategory);

        return Inertia::render('Departments/Categories/Edit', $data);
    }

    /**
     * Update category
     */
    public function update(DepartmentCategory $departmentCategory, DepartmentCategoryUpdateRequest $request, DepartmentCategoryRepository $repository)
    {
        try {
            $repository->update($departmentCategory, $request);

            return redirect()->route('admin.departments.categories.index')->with('success', 'Category successfully updated');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Store category
     */
    public function store(DepartmentCategoryStoreRequest $request, DepartmentCategoryRepository $repository)
    {
        $repository->store($request);

        return redirect()->route('admin.departments.categories.index')->with('success', 'Category successfully created');
    }

    /**
     * Delete category
     */
    public function destroy(DepartmentCategory $departmentCategory, DepartmentCategoryRepository $repository)
    {
        try {
            $repository->destroy($departmentCategory);

            return back()->with('success', 'Category successfully deleted');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, DepartmentCategoryRepository $repository)
    {
        $repository->bulkDelete($request->ids);
        return back()->with('success', 'Category successfully deleted');
    }
}
