<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\DoctorContent;
use App\Models\Setting;
use App\Models\Team;
use App\Models\TeamContent;
use App\Repositories\Admin\DoctorRepository;
use App\Repositories\Admin\TeamRepository;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Inertia\Inertia;

class DoctorController extends Controller
{
    /**
     * Doctor show
     */
    public function show($slug, DoctorRepository $repository)
    {
        if (Setting::pull("is_enabled_doctors") === "0") {
            abort(404);
        }

        $data['team'] = Doctor::where('slug', $slug)->first();

        if ($data['team']) {
            $teamContent = DoctorContent::where('doctor_id', $data['team']->id)->first();

            $current_page_url = request()->url();
            $meta_title = $teamContent ? $teamContent->meta_title : $teamContent->title;
            $meta_description = $teamContent ? $teamContent->meta_description : '';
            $meta_tags = $teamContent ? $teamContent->meta_tags : '';
            $site_name = Setting::pull('site_name');
            $meta_image = $data['team']->meta_image_url;

            SEOMeta::setTitle($meta_title);
            SEOMeta::setDescription($meta_description);
            SEOMeta::setCanonical($current_page_url);
            SEOMeta::addMeta('robots', 'index, follow');
            SEOMeta::addKeyword(explode(',', $meta_tags));

            OpenGraph::setTitle($meta_title);
            OpenGraph::setDescription($meta_description);
            OpenGraph::setUrl($current_page_url);
            OpenGraph::setSiteName($site_name);
            OpenGraph::addProperty('type', 'website');

            TwitterCard::setTitle($meta_title);
            TwitterCard::setSite('@prohealth');
            TwitterCard::setDescription($meta_description);
            TwitterCard::setType('summary_large_image');
            TwitterCard::setImage($meta_image);
            SEOMeta::addMeta('viewport', 'width=device-width, initial-scale=1');

            $data['site_name'] = $site_name;
            $data = $repository->getDoctorData($data['team']);

            return Inertia::render('Page/Page', $data);
        }
        abort(404);
    }
}
