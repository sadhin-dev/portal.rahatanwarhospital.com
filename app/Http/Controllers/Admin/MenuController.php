<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CategoriesMenuResource;
use App\Http\Resources\Admin\DepartmentMenuResource;
use App\Http\Resources\Admin\DoctorMenuResource;
use App\Http\Resources\Admin\PageMenuResource;
use App\Http\Resources\Admin\PostMenuResource;
use App\Models\Category;
use App\Models\Department;
use App\Models\Doctor;
use App\Models\Page;
use App\Models\Post;
use App\Repositories\Admin\MenuRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['store']]);
    }

    /**
     * Menu index
     */
    public function index(Request $request, MenuRepository $repository)
    {
        $data['pages_menu'] = new PageMenuResource(Page::all());
        $data['posts_menu'] = new PostMenuResource(Post::all());
        $data['departments_menu'] = new DepartmentMenuResource(Department::all());
        $data['doctors_menu'] = new DoctorMenuResource(Doctor::all());
        $data['categories_menu'] = new CategoriesMenuResource(Category::all());
        $data['edit_action'] = $request->edit_action ?? 'main_menu';
        $data['menu_list'] = $repository->getMenus($data['edit_action']);

        return Inertia::render('Menus/Index', $data);
    }

    /**
     * Store menu
     */
    public function store(Request $request, MenuRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $repository->store($request, $settingRepository);

        return back()->with('success', 'Menu successfully saved');
    }
}
