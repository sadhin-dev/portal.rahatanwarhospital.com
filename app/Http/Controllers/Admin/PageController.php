<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Pages\PageSlugUpdateRequest;
use App\Http\Resources\Admin\DepartmentsUrlResource;
use App\Http\Resources\Admin\DoctorsUrlResource;
use App\Http\Resources\Admin\ServicesUrlResource;
use App\Http\Resources\PricingPlanUrlResource;
use App\Models\Department;
use App\Models\Doctor;
use App\Models\Page;
use App\Models\PricingPlan;
use App\Models\Service;
use App\Models\Setting;
use App\Repositories\Admin\PageRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Database\QueryException;


class PageController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'bulkDelete', 'update', 'store', 'clone', 'updateSlug']]);
    }

    /**
     * Get pages
     */
    public function index(Request $request, PageRepository $repository): Response
    {
        $data['default_home_page'] = Setting::pull('default_home_page');
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['pages'] = $repository->paginateSearchResult($data['search'], $data['sort'], $data['filtered_lang']);

        return Inertia::render('Pages/Index', $data);
    }

    public function create()
    {
        $data['default_lang'] = Setting::pull('default_lang');
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['departments'] = DepartmentsUrlResource::collection(Department::with('content')->get());
        $data['doctors'] = DoctorsUrlResource::collection(Doctor::with('content')->get());

        return Inertia::render('Pages/Create', $data);
    }

    /**
     * Store page
     */
    public function store(Request $request, PageRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        try{
            $repository->store($request, $settingRepository);
            return redirect()->route('admin.pages.index')->with('success', 'Page successfully created');
        }catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return back()->with('error', 'The page already exists');
            }
            throw $e;
        } catch (\Exception $e) {
            return back()->with('error', 'Something went wrong, please try again');
        } 
    }

    /**
     * Edit page
     *
     * @return Response|void
     */
    public function edit(Page $page, PageRepository $repository)
    {
        $data = $repository->getPageData($page);
        $data['default_lang'] = Setting::pull('default_lang');
        $data['sections'] = $page->sections;
        $data['page'] = $page->load('content');
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['departments'] = DepartmentsUrlResource::collection(Department::with('content')->get());
        $data['doctors'] = DoctorsUrlResource::collection(Doctor::with('content')->get());

        if ($data['page']->type === 'custom') {
            return Inertia::render('Pages/Edit', $data);
        } elseif ($data['page']->type === 'regular') {
            $data['languages'] = json_decode(Setting::pull('languages'));

            return Inertia::render('Pages/RegularEdit', $data);
        }
    }

    /**
     * Update page
     *
     * @return RedirectResponse|void
     */
    public function update(Request $request, Page $page, PageRepository $repository, SettingRepository $settingRepository)
    {
        try{
            $repository->updatePage($request, $page, $settingRepository);
            return redirect()->route('admin.pages.index')->with('success', 'Successfully page updated');
        }catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return back()->with('error', 'The page already exists');
            }
            throw $e;
        } catch (\Exception $e) {
            return back()->with('error', 'Something went wrong, please try again');
        } 
    }

    /**
     * Delete page
     */
    public function destroy(Page $page): RedirectResponse
    {
        if ($page->type == 'regular') {
            return back()->with('error', 'This page is not deletable');
        }
        $page->delete();

        return back()->with('success', 'Page successfully deleted');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, PageRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);
        return back()->with('success', 'Selected items successfully deleted');
    }

    /**
     * Upload file
     */
    public function uploadFile(Request $request, PageRepository $repository): string
    {
        return $repository->uploadFile($request);
    }

    /**
     * Update page slug
     */
    public function updateSlug(PageSlugUpdateRequest $request, Page $page, PageRepository $repository): RedirectResponse
    {
        $repository->updateSlug($request, $page);
        return back()->with('success', 'Page slug updated successfully!');
    }

    public function clone(Page $page, PageRepository $repository)
    {
        $repository->clone($page);
        return back()->with('success', 'Page successfully cloned');
    }
}
