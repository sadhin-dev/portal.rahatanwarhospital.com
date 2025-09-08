<?php

namespace App\Repositories\Admin;

use App\Models\Department;
use App\Models\Doctor;
use App\Models\Page;
use App\Models\Post;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SeoRepository
{
    public function generateSitemap()
    {
        $sitemap = Sitemap::create();

        // page sitemap
        Page::all()->each(function (Page $page) use ($sitemap) {
            $sitemap->add(Url::create(route('pages.show', $page->slug))
                ->setLastModificationDate($page->updated_at));
        });

        // blog details sitemap
        Post::all()->each(function (Post $post) use ($sitemap) {
            $sitemap->add(Url::create(route('blog.show', $post->slug))
                ->setLastModificationDate($post->updated_at));
        });


        // case study sitemap
        Department::all()->each(function (Department $department) use ($sitemap) {
            $sitemap->add(Url::create(route('department.show', $department->slug))
                ->setLastModificationDate($department->updated_at));
        });
        // case study sitemap
        Doctor::all()->each(function (Doctor $doctor) use ($sitemap) {
            $sitemap->add(Url::create(route('doctor.show', $doctor->slug))
                ->setLastModificationDate($doctor->updated_at));
        });

        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}
