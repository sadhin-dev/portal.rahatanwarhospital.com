<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    {!! SEO::generate() !!}
    @php
    $menuRepository = app(\App\Repositories\Admin\MenuRepository::class);
    $main_menu = $menuRepository->getMenus('main_menu');
    $footer_menu_one = $menuRepository->getMenus('footer_menu_one');
    $footer_menu_two = $menuRepository->getMenus('footer_menu_two');
    $footer_menu_three = $menuRepository->getMenus('footer_menu_three');
    $page_settings = app(\App\Repositories\SettingRepository::class)->getPageSettingInfo();
    $settings = app(\App\Repositories\SettingRepository::class);
    $customize_settings = $settings->getSiteSettings();
    $customize_settings['social_links']['social_list'] = json_decode($customize_settings['social_links']['social_list']);
    $fav_icon = \App\Models\Setting::pull('site_favicon');
    $primary_font = \App\Models\Setting::pull('primary_font');
    $secondary_font = \App\Models\Setting::pull('secondary_font');
    $meta_title = \App\Models\Setting::pull('meta_title');
    $meta_description = \App\Models\Setting::pull('meta_description');
    $meta_image = asset(\App\Models\Setting::pull('meta_image'));
    $blogs = app(\App\Repositories\Frontend\BlogRepository::class)->getPublishedBlogs();
    $google_captcha_site_key = \App\Models\Setting::pull('google_captcha_site_key');
    $is_active_google_captcha = \App\Models\Setting::pull('is_active_google_captcha');

    $recent_post = \App\Models\Post::where('status', '1')->with('content')->latest()->take(4)->get();
    $categories = \App\Models\Category::with('content')->withCount('posts')->get();
    $tags = \App\Models\Tag::whereHas('posts')->pluck('name');

    $testimonials = app(App\Repositories\Admin\TestimonialRepository::class)->getTestimonialData();
    $meta_tags = \App\Models\Setting::pull('meta_tags');
    $current_lang = app()->getLocale();
    $languageSettings = json_decode(\App\Models\Setting::pull('languages'), true);
    $direction = $languageSettings[$current_lang]['is_ltr'] === 'no' ? 'rtl' : '';
    $langJson = Illuminate\Support\Facades\File::get(base_path("lang/${current_lang}.json"));
    $jsonLang = json_decode($langJson, true);
    @endphp

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family={{ $primary_font }}:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet" />
    <link
        href="https://fonts.googleapis.com/css2?family={{ $secondary_font }}:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet" />
    <link rel="stylesheet" href="{{ mix('css/frontend/globals.css') }}">
    <script src="{{ mix('js/frontend/app.js') }}" defer></script>
    <link rel="stylesheet" href="{{ route('custom.css') }}" />

    <link rel="icon" type="image/x-icon" href="{{ $fav_icon }}">

    <script>
        localStorage.setItem('translation', JSON.stringify(@json($jsonLang)));
        localStorage.setItem('main_menu', JSON.stringify(@json($main_menu)));
        localStorage.setItem('footer_menu_one', JSON.stringify(@json($footer_menu_one)));
        localStorage.setItem('footer_menu_two', JSON.stringify(@json($footer_menu_two)));
        localStorage.setItem('footer_menu_three', JSON.stringify(@json($footer_menu_three)));
        localStorage.setItem('google_captcha_site_key', JSON.stringify(@json($google_captcha_site_key)));
        localStorage.setItem('is_active_google_captcha', JSON.stringify(@json($is_active_google_captcha)));
        localStorage.setItem('blogs', JSON.stringify(@json($blogs)));

        localStorage.setItem('recent_post', JSON.stringify(@json($recent_post)));
        localStorage.setItem('categories', JSON.stringify(@json($categories)));
        localStorage.setItem('tags', JSON.stringify(@json($tags)));

        localStorage.setItem('testimonials', JSON.stringify(@json($testimonials)));
        localStorage.setItem('customize_settings', JSON.stringify(@json($customize_settings)));
        localStorage.setItem('page_settings', JSON.stringify(@json($page_settings)));

        window.seo = {
            meta_title: "{{ e($meta_title) }}",
            meta_description: "{{ e($meta_description) }}",
            meta_image: "{{ $meta_image }}",
            meta_tags: "{{ e($meta_tags) }}",
            og_url: "{{ url('/') }}"
        };
    </script>

    @inertiaHead
    @routes
</head>

<body class="font-sans antialiased {{ $direction }}">
    @inertia

    {!! \App\Models\Setting::pull('html_embed_code') !!}
</body>

</html>