<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Admin\DashboardRepository;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard(DashboardRepository $repository)
    {
        $data['post_count'] = $repository->getPostCount();
        $data['department_count'] = $repository->getDepartmentCount();
        $data['doctor_count'] = $repository->getDoctorCount();
        $data['products_count'] = $repository->getProductCount();
        $data['comment_count'] = $repository->getCommentCount();
        $data['user_count'] = $repository->getUserCount();
        $data['subscriber_count'] = $repository->getSubscribeCount();
        $data['form_response_count'] = $repository->getFormResponseCount();
        $data['latest_subscribers'] = $repository->getLatestSubscribers();
        $data['latest_comments'] = $repository->getLatestComments();
        // return $data;

        return Inertia::render('Dashboard', $data);
    }

    public function test()
    {
        return redirect()->back()->with('success', 'Hello');
    }
}
