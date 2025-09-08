<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Department\DepartmentSlugUpdateRequest;
use App\Http\Resources\Admin\CategoryResource;
use App\Http\Resources\Admin\DepartmentsUrlResource;
use App\Http\Resources\Admin\DoctorsUrlResource;
use App\Http\Resources\PricingPlanUrlResource;
use App\Models\Department;
use App\Models\DepartmentCategory;
use App\Models\Doctor;
use App\Models\PricingPlan;
use App\Models\Setting;
use App\Repositories\Admin\DepartmentRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;


class DepartmentController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'bulkDelete', 'update', 'store', 'clone', 'updateSlug']]);
    }

    /**
     * Paginate search result
     */
    public function index(Request $request, DepartmentRepository $repository)
    {
        if (Setting::pull("is_enabled_departments") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['filter']['category'] = $request->filter['category'] ?? 'All Categories';
        $data['categories'] = DepartmentCategory::with('content')->get();
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['departments'] = $repository->paginateSearchResult($data['search'], $data['sort'], $data['filter']);

        return Inertia::render('Departments/Index', $data);
    }

    /**
     * Create department
     */
    public function create()
    {
        if (Setting::pull("is_enabled_departments") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['categories'] = CategoryResource::collection(DepartmentCategory::all());
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['departments'] = DepartmentsUrlResource::collection(Department::with('content')->get());
        $data['doctors'] = DoctorsUrlResource::collection(Doctor::with('content')->get());

        return Inertia::render('Departments/Create', $data);
    }

    /**
     * Store department
     */
    public function store(Request $request, DepartmentRepository $repository)
    {
        try{
            $repository->store($request);
            return redirect()->route('admin.departments.index')->with('success', 'Department successfully created');
        }catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return back()->with('error', 'The department already exists');
            }
            throw $e;
        } catch (\Exception $e) {
            return back()->with('error', 'Something went wrong, please try again');
        } 
    }

    /**
     * Edit department
     */
    public function edit(Department $department, DepartmentRepository $repository)
    {
        if (Setting::pull("is_enabled_departments") === "0") {
            abort(404);
        }

        $data = $repository->getDepartmentData($department);
        $data['categories'] = CategoryResource::collection(DepartmentCategory::all());
        $data['default_lang'] = Setting::pull('default_lang');
        $data['sections'] = $department->sections;
        $data['department'] = $department;
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['departments'] = DepartmentsUrlResource::collection(Department::with('content')->get());
        $data['doctors'] = DoctorsUrlResource::collection(Doctor::with('content')->get());

        return Inertia::render('Departments/Edit', $data);
    }

    /**
     * Update department
     */
    public function update(Request $request, Department $department, DepartmentRepository $repository)
    {
        $repository->update($request, $department);

        return redirect()->route('admin.departments.index')->with('success', 'Department successfully updated');
    }

    /**
     * Service destroy
     */
    public function destroy(Department $department, DepartmentRepository $repository)
    {
        $repository->destroy($department);

        return redirect()->route('admin.departments.index')->with('success', 'Department successfully deleted');
    }

    /**
     * bulk delete
     */
    public function bulkDelete(Request $request, DepartmentRepository $repository)
    {
        $repository->bulkDelete($request);

        return redirect()->route('admin.departments.index')->with('success', 'Selected departments successfully deleted');
    }

    /**
     * update slug
     */
    public function updateSlug(DepartmentSlugUpdateRequest $request, Department $department, DepartmentRepository $repository)
    {
        $repository->updateSlug($request, $department);
        return back()->with('success', 'Department slug updated successfully!');
    }

    public function clone(Department $department, DepartmentRepository $repository)
    {
        $repository->clone($department);

        return back()->with('success', 'Department successfully cloned');
    }
}
