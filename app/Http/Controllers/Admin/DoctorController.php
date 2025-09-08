<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Doctor\DoctorSlugUpdateRequest;
use App\Http\Resources\Admin\DepartmentsUrlResource;
use App\Http\Resources\Admin\DoctorsUrlResource;
use App\Http\Resources\Admin\ServicesUrlResource;
use App\Http\Resources\PricingPlanUrlResource;
use App\Models\Department;
use App\Models\Doctor;
use App\Models\PricingPlan;
use App\Models\Service;
use App\Models\Setting;
use App\Repositories\Admin\DoctorRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;


class DoctorController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'bulkDelete', 'update', 'store', 'clone', 'updateSlug']]);
    }

    /**
     * Get doctors
     */
    public function index(Request $request, DoctorRepository $repository)
    {
        if (Setting::pull("is_enabled_doctors") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['doctors'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Doctors/Index', $data);
    }

    /**
     * Create Doctor
     */
    public function create()
    {
        if (Setting::pull("is_enabled_doctors") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['departments'] = DepartmentsUrlResource::collection(Department::with('content')->get());
        $data['doctors'] = DoctorsUrlResource::collection(Doctor::with('content')->get());

        return Inertia::render('Doctors/Create', $data);
    }

    /**
     * Store Doctor
     */
    public function store(Request $request, DoctorRepository $repository)
    {
        try{
            $repository->store($request);
            return redirect()->route('admin.doctors.index')->with('success', 'Doctor successfully created');
        }catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return back()->with('error', 'The doctor already exists');
            }
            throw $e;
        } catch (\Exception $e) {
            return back()->with('error', 'Something went wrong, please try again');
        } 
    }

    /**
     * Edit Doctor
     */
    public function edit(Doctor $doctor, DoctorRepository $repository)
    {
        if (Setting::pull("is_enabled_doctors") === "0") {
            abort(404);
        }

        $data = $repository->getDoctorData($doctor);
        $data['default_lang'] = Setting::pull('default_lang');
        $data['sections'] = $doctor->sections;
        $data['doctor'] = $doctor;
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['departments'] = DepartmentsUrlResource::collection(Department::with('content')->get());
        $data['doctors'] = DoctorsUrlResource::collection(Doctor::with('content')->get());

        return Inertia::render('Doctors/Edit', $data);
    }

    /**
     * Update doctor
     */
    public function update(Request $request, Doctor $doctor, DoctorRepository $repository)
    {
        $repository->update($request, $doctor);

        return redirect()->route('admin.doctors.index')->with('success', 'Doctor successfully updated');
    }

    /**
     * Delete doctor
     */
    public function destroy(Doctor $doctor, DoctorRepository $repository)
    {
        $repository->destroy($doctor);

        return back()->with('success', 'Doctor successfully deleted');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, DoctorRepository $repository)
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected doctor successfully deleted');
    }

    /**
     * update slug
     */
    public function updateSlug(DoctorSlugUpdateRequest $request, Doctor $doctor, DoctorRepository $repository)
    {
        $repository->updateSlug($request, $doctor);

        return back()->with('success', 'Doctor slug updated successfully!');
    }

    public function clone(Doctor $doctor, DoctorRepository $repository)
    {
        $repository->clone($doctor);

        return back()->with('success', 'Doctor successfully cloned');
    }
}
