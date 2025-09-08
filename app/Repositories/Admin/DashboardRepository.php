<?php

namespace App\Repositories\Admin;

use App\Models\CaseStudy;
use App\Models\Comment;
use App\Models\Department;
use App\Models\Doctor;
use App\Models\FormResponse;
use App\Models\Post;
use App\Models\Product;
use App\Models\Service;
use App\Models\Subscriber;
use App\Models\User;

class DashboardRepository
{
    /**
     * Get post count
     */
    public function getPostCount(): mixed
    {
        return Post::count();
    }

    /**
     * Get comment count
     */
    public function getCommentCount(): mixed
    {
        return Comment::count();
    }

    /**
     * Get subscriber count
     */
    public function getSubscribeCount(): mixed
    {
        return Subscriber::count();
    }

    /**
     * Get department count
     */
    public function getDepartmentCount(): mixed
    {
        return Department::count();
    }

    /**
     * Get doctor count
     */
    public function getDoctorCount(): mixed
    {
        return Doctor::count();
    }

    /**
     * Get doctor count
     */
    public function getProductCount(): mixed
    {
        return Product::count();
    }

    /**
     * Get contact count
     */
    public function getFormResponseCount(): mixed
    {
        return FormResponse::count();
    }

    public function getUserCount(): mixed
    {
        return User::count();
    }

    /**
     * Get latest contacts
     */
    public function getLatestSubscribers(): mixed
    {
        return Subscriber::latest()->limit(10)->get();
    }

    /**
     * Get latest comments
     */
    public function getLatestComments(): mixed
    {
        return Comment::latest()->limit(10)->get();
    }
}
