<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>


    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    @php
    $menuRepository = app(\App\Repositories\Admin\MenuRepository::class);
    $main_menu = $menuRepository->getMenus('main_menu');
    $services_menu = $menuRepository->getMenus('services_menu');
    $footer_menu_one = $menuRepository->getMenus('footer_menu_one');
    $footer_menu_two = $menuRepository->getMenus('footer_menu_two');
    $footer_menu_three = $menuRepository->getMenus('footer_menu_three');
    $page_settings = app(\App\Repositories\SettingRepository::class)->getPageSettingInfo();
    $google_captcha_site_key = \App\Models\Setting::pull('google_captcha_site_key');
    $is_active_google_captcha = \App\Models\Setting::pull('is_active_google_captcha');

    $settings = app(\App\Repositories\SettingRepository::class);
    $customize_settings = $settings->getSiteSettings();
    $customize_settings['social_links']['social_list'] = json_decode($customize_settings['social_links']['social_list']);
    $fav_icon = \App\Models\Setting::pull('site_favicon');
    $blogs = app(\App\Repositories\Frontend\BlogRepository::class)->getPublishedBlogs();
    $recent_post = \App\Models\Post::where('status', '1')->with('content')->latest()->take(4)->get();
    $categories = \App\Models\Category::with('content')->withCount('posts')->get();
    $tags = \App\Models\Tag::whereHas('posts')->pluck('name');

    $testimonials = app(App\Repositories\Admin\TestimonialRepository::class)->getTestimonialData();
    $current_lang = app()->getLocale();
    $languageSettings = json_decode(\App\Models\Setting::pull('languages'), true);
    $direction = $languageSettings[$current_lang]['is_ltr'] === 'no' ? 'rtl' : '';
    $langJson = Illuminate\Support\Facades\File::get(base_path("lang/${current_lang}.json"));
    $jsonLang = json_decode($langJson, true);
    @endphp
    <!-- Scripts -->
    @routes
    <link rel="stylesheet" href="{{ mix('css/admin/all.css') }}">
    <script src="{{ mix('js/admin/app.js') }}" defer></script>

    <link rel="icon" type="image/x-icon" href="{{ $fav_icon }}">

    <script>
        localStorage.setItem('translation', JSON.stringify(@json($jsonLang)));
        localStorage.setItem('main_menu', JSON.stringify(@json($main_menu)));
        localStorage.setItem('footer_menu_one', JSON.stringify(@json($footer_menu_one)));
        localStorage.setItem('footer_menu_two', JSON.stringify(@json($footer_menu_two)));
        localStorage.setItem('footer_menu_three', JSON.stringify(@json($footer_menu_three)));
        localStorage.setItem('blogs', JSON.stringify(@json($blogs)));

        localStorage.setItem('recent_post', JSON.stringify(@json($recent_post)));
        localStorage.setItem('categories', JSON.stringify(@json($categories)));
        localStorage.setItem('tags', JSON.stringify(@json($tags)));

        localStorage.setItem('testimonials', JSON.stringify(@json($testimonials)));
        localStorage.setItem('customize_settings', JSON.stringify(@json($customize_settings)));
        localStorage.setItem('google_captcha_site_key', JSON.stringify(@json($google_captcha_site_key)));
        localStorage.setItem('is_active_google_captcha', JSON.stringify(@json($is_active_google_captcha)));
        localStorage.setItem('page_settings', JSON.stringify(@json($page_settings)));
    </script>
    @inertiaHead
</head>

<body class="font-sans antialiased {{ $direction }}">
    @inertia
</body>

</html>