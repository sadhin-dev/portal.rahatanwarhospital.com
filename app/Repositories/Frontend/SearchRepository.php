<?php

namespace App\Repositories\Frontend;

use App\Models\Department;
use App\Models\Doctor;
use App\Models\Page;
use App\Models\Post;
use Illuminate\Support\Facades\DB;

class SearchRepository
{
    protected Post $postModel;

    protected Page $pageModel;

    protected Doctor $doctor;

    protected Department $department;

    public function __construct(Post $post, Page $page, Doctor $doctor, Department $department)
    {
        $this->postModel = $post;
        $this->pageModel = $page;
        $this->doctor = $doctor;
        $this->department = $department;
    }

    public function searchResult($search)
    {
        if (empty($search)) {
            return collect();
        }

        // Search information
        $posts = $this->searchPosts($search);

        $pages = $this->searchPages($search);

        $department = $this->searchDepartment($search);

        $doctor = $this->searchDoctor($search);

        $products = $this->searchProducts($search);

        $result = $posts->concat($pages)->concat($department)->concat($doctor)->concat($products);

        $result->each(function ($item) {
            if (isset($item->post_id)) {
                $item->type = 'post';
                $item->route = 'blog';
                $item->id = $item->post_id;
            } elseif (isset($item->page_id)) {
                $item->type = 'page';
                $item->route = '';
                $item->id = $item->page_id;
            } elseif (isset($item->department_id)) {
                $item->type = 'department';
                $item->route = 'department';
                $item->id = $item->department_id;
            } elseif (isset($item->doctor_id)) {
                $item->type = 'doctor';
                $item->route = 'doctor';
                $item->id = $item->doctor_id;
            } elseif (isset($item->product_id)) {
                $item->type = 'product';
                $item->route = 'product';
                $item->id = $item->product_id;
            }
        });

        return $result;
    }

    private function searchPosts($search)
    {
        return DB::table('post_contents')
            ->join('posts', 'post_contents.post_id', '=', 'posts.id')
            ->where('post_contents.title', 'like', "%{$search}%")
            ->select('posts.id as post_id', 'posts.slug', 'post_contents.title', 'post_contents.language_code')
            ->get();
    }

    private function searchPages($search)
    {
        return DB::table('page_contents')
            ->join('pages', 'page_contents.page_id', '=', 'pages.id')
            ->where('page_contents.title', 'like', "%{$search}%")
            ->select('pages.id as page_id', 'pages.slug', 'page_contents.title', 'page_contents.language_code')
            ->get();
    }

    private function searchDepartment($search)
    {
        return DB::table('department_contents')
            ->join('departments', 'department_contents.department_id', '=', 'departments.id')
            ->where('department_contents.title', 'like', "%{$search}%")
            ->select('departments.id as department_id', 'departments.slug', 'department_contents.title', 'department_contents.language_code')
            ->get();
    }

    private function searchDoctor($search)
    {
        return DB::table('doctor_contents')
            ->join('doctors', 'doctor_contents.doctor_id', '=', 'doctors.id')
            ->where('doctor_contents.title', 'like', "%{$search}%")
            ->select('doctors.id as doctor_id', 'doctors.slug', 'doctor_contents.title', 'doctor_contents.language_code')
            ->get();
    }

    private function searchProducts($search)
    {
        return DB::table('product_contents')
            ->join('products', 'product_contents.product_id', '=', 'products.id')
            ->where('product_contents.title', 'like', "%{$search}%")
            ->select('products.id as product_id', 'products.slug', 'product_contents.title', 'product_contents.language_code')
            ->get();
    }
}
