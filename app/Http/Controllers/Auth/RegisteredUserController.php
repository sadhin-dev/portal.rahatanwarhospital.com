<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisteredUserStoreRequest;
use App\Models\Page;
use App\Models\Setting;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\MessageBag;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;


class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $terms_condition_page_id = Setting::pull('default_terms_and_conditions_page');
        $page = Page::find($terms_condition_page_id);
        $data['terms_condition_url'] = route('pages.show', $page->slug);

        $current_page_url = request()->url();
        $meta_tags = 'register';
        $site_name = Setting::pull('site_name');
        $meta_title = __('Register');

        SEOMeta::setTitle($meta_title);
        SEOMeta::setCanonical($current_page_url);
        SEOMeta::addMeta('robots', 'index, follow');
        SEOMeta::addKeyword(explode(',', $meta_tags));

        OpenGraph::setUrl($current_page_url);
        OpenGraph::setSiteName($site_name);
        OpenGraph::addProperty('type', 'website');

        TwitterCard::setSite('@prohealth');
        TwitterCard::setType('summary_large_image');
        SEOMeta::addMeta('viewport', 'width=device-width, initial-scale=1');
        $data['meta_tags'] = $meta_tags;
        $data['site_name'] = $site_name;
        $data['tagline'] = $meta_title;

        return Inertia::render('Auth/Register', $data);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisteredUserStoreRequest $request)
{
    DB::beginTransaction();

    try {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'is_active' => 1,
        ]);

        event(new Registered($user)); // This may attempt to send an email

        Auth::login($user);

        DB::commit();

        return redirect(RouteServiceProvider::HOME);

    } catch (TransportExceptionInterface $e) {
        DB::rollBack();

        return back()->with('error', 'The SMTP configuration is incorrect or not properly set up.');
        
    } catch (\Exception $e) {
        DB::rollBack();

        return back()->with('error', 'An error occurred while creating your account. Please try again later.');
    }
}
}
