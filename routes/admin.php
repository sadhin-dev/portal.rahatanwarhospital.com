<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CommentController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\Admin\CustomizeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DepartmentCategoryController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\DoctorController;
use App\Http\Controllers\Admin\EditorImageUploaderController;
use App\Http\Controllers\Admin\FormResponseController;
use App\Http\Controllers\Admin\LanguagesController;
use App\Http\Controllers\Admin\ManualPaymentGatewayController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PaymentHistoryController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\PricingPlanController;
use App\Http\Controllers\Admin\ProductCategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductTagController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\RolePermissionController;
use App\Http\Controllers\Admin\SeoController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SubscribeController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\TicketController;
use App\Http\Controllers\Admin\TranslateController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register Admin routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "auth" middleware group. Make something great!
|
*/

Route::redirect('/', '/admin/dashboard');

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
Route::get('test', [DashboardController::class, 'test'])->name('test');

// admin post routes
Route::resource('posts', PostController::class);
Route::post('posts/bulk/delete', [PostController::class, 'bulkDelete'])->name('posts.bulk.delete');
Route::post('posts/bulk/publish', [PostController::class, 'bulkPublish'])->name('posts.bulk.publish');
Route::post('posts/bulk/unpublish', [PostController::class, 'bulkUnPublish'])->name('posts.bulk.unpublish');
Route::post('posts/status/toggle', [PostController::class, 'statusToggle'])->name('posts.status.toggle');
Route::put('posts/slug/update/{post}', [PostController::class, 'updateSlug'])->name('posts.slug.update');

// admin category routes
Route::resource('categories', CategoryController::class);
Route::delete('categories/bulk/delete', [CategoryController::class, 'bulkDelete'])->name('categories.bulk.delete');

// admin tags route
Route::group(['prefix' => 'tags', 'as' => 'tags.'], function () {
    Route::get('/index', [TagController::class, 'index'])->name('index')->can('post_tags.index');
    Route::get('/search', [TagController::class, 'searchTag'])->name('search');
    Route::post('/store', [TagController::class, 'store'])->name('store')->can('post_tags.create');
    Route::get('/update', [TagController::class, 'update'])->name('update')->can('post_tags.edit');
    Route::delete('/destroy/{tag}', [TagController::class, 'destroy'])->name('destroy')->can('post_tags.delete');
    Route::delete('/bulk-delete', [TagController::class, 'bulkDelete'])->name('bulk.delete')->can('post_tags.delete');
});

// admin comment routes
Route::group(['prefix' => 'comments', 'as' => 'comments.'], function () {
    Route::get('index', [CommentController::class, 'index'])->name('index')->can('comments.index');
    Route::delete('destroy/{comment}', [CommentController::class, 'destroy'])->name('destroy')->can('comments.delete');
    Route::delete('bulk-delete', [CommentController::class, 'bulkDelete'])->name('bulk.delete')->can('comments.delete');
    Route::get('{comment}/approved', [CommentController::class, 'approved'])->name('approved')->can('comments.approve');
    Route::get('{comment}/unApproved', [CommentController::class, 'unApproved'])->name('unApproved')->can('comments.unApprove');
});

// subscribes route
Route::group(['prefix' => 'subscribers', 'as' => 'subscribers.'], function () {
    Route::get('/', [SubscribeController::class, 'index'])->name('index')->can('subscribers.index');
    Route::delete('/destroy/{subscriber}', [SubscribeController::class, 'destroy'])->name('destroy')->can('subscribers.delete');
    Route::delete('/bulk-delete', [SubscribeController::class, 'bulkDelete'])->name('bulk.delete')->can('subscribers.delete');
    Route::get('/export-newslatter', [SubscribeController::class, 'exportNewslatter'])->name('export');
});

// contacts route
Route::group(['prefix' => 'contacts', 'as' => 'contacts.'], function () {
    Route::get('/', [ContactController::class, 'index'])->name('index')->can('contacts.index');
    Route::delete('/destroy/{contact}', [ContactController::class, 'destroy'])->name('destroy')->can('contacts.delete');
    Route::delete('/bulk-delete', [ContactController::class, 'bulkDelete'])->name('bulk.delete')->can('contacts.delete');
    Route::get('/show/{contact}', [ContactController::class, 'show'])->name('show')->can('contacts.show');
    Route::get('/export-contact', [ContactController::class, 'exportContact'])->name('export');
});

// admin pages routes
Route::group(['prefix' => 'pages', 'as' => 'pages.'], function () {
    Route::get('/', [PageController::class, 'index'])->name('index')->can('pages.index');
    Route::get('create', [PageController::class, 'create'])->name('create')->can('pages.create');
    Route::post('store', [PageController::class, 'store'])->name('store')->can('pages.create');
    Route::put('update/{page}', [PageController::class, 'update'])->name('update')->can('pages.edit');
    Route::get('edit/{page}', [PageController::class, 'edit'])->name('edit')->can('pages.edit');
    Route::delete('destroy/{page}', [PageController::class, 'destroy'])->name('destroy')->can('pages.delete');
    Route::delete('bulk-delete', [PageController::class, 'bulkDelete'])->name('bulk.delete')->can('pages.delete');
    Route::post('upload/file', [PageController::class, 'uploadFile'])->name('upload.file');
    Route::put('/update/slug/{page}', [PageController::class, 'updateSlug'])->name('update.slug');
    Route::post('/clone/{page}', [PageController::class, 'clone'])->name('clone')->can('pages.create');
});

// customize pages routes
Route::group(['prefix' => 'customize', 'as' => 'customize.'], function () {
    Route::get('/', [CustomizeController::class, 'customize'])->name('customize')->can('appearance.customize');
    Route::put('/', [CustomizeController::class, 'update'])->name('update')->can('appearance.customize');
});

// departments page route
Route::group(['prefix' => 'departments', 'as' => 'departments.'], function () {
    Route::get('/', [DepartmentController::class, 'index'])->name('index')->can('departments.index');
    Route::get('/create', [DepartmentController::class, 'create'])->name('create')->can('departments.create');
    Route::post('/', [DepartmentController::class, 'store'])->name('store')->can('departments.create');
    Route::get('/edit/{department}', [DepartmentController::class, 'edit'])->name('edit')->can('departments.edit');
    Route::put('/update/{department}', [DepartmentController::class, 'update'])->name('update')->can('departments.edit');
    Route::delete('/destroy/{department}', [DepartmentController::class, 'destroy'])->name('destroy')->can('departments.delete');
    Route::delete('/bulk-delete', [DepartmentController::class, 'bulkDelete'])->name('bulk.delete')->can('departments.delete');
    Route::put('/update/slug/{department}', [DepartmentController::class, 'updateSlug'])->name('update.slug');
    Route::post('/clone/{department}', [DepartmentController::class, 'clone'])->name('clone')->can('departments.create');

    // department category route
    Route::group(['prefix' => 'categories', 'as' => 'categories.'], function () {
        Route::get('/', [DepartmentCategoryController::class, 'index'])->name('index')->can('department_categories.index');
        Route::post('/store', [DepartmentCategoryController::class, 'store'])->name('store')->can('department_categories.create');
        Route::get('/create', [DepartmentCategoryController::class, 'create'])->name('create')->can('department_categories.create');
        Route::put('/update/{department_category}', [DepartmentCategoryController::class, 'update'])->name('update')->can('department_categories.edit');
        Route::get('/edit/{department_category}', [DepartmentCategoryController::class, 'edit'])->name('edit')->can('department_categories.edit');
        Route::delete('/destroy/{department_category}', [DepartmentCategoryController::class, 'destroy'])->name('destroy')->can('department_categories.delete');
        Route::delete('/bulk-delete', [DepartmentCategoryController::class, 'bulkDelete'])->name('bulk.delete')->can('department_categories.delete');
    });
});

// menu routes
Route::group(['prefix' => 'menus', 'as' => 'menus.'], function () {
    Route::get('/', [MenuController::class, 'index'])->name('index')->can('appearance.menus');
    Route::post('/', [MenuController::class, 'store'])->name('store')->can('appearance.menus');
});

// doctors routes
Route::group(['prefix' => 'doctors', 'as' => 'doctors.'], function () {
    Route::get('/', [DoctorController::class, 'index'])->name('index')->can('doctors.index');
    Route::get('/create', [DoctorController::class, 'create'])->name('create')->can('doctors.create');
    Route::get('/edit/{doctor}', [DoctorController::class, 'edit'])->name('edit')->can('doctors.edit');
    Route::post('/', [DoctorController::class, 'store'])->name('store')->can('doctors.create');
    Route::delete('/{doctor}', [DoctorController::class, 'destroy'])->name('destroy')->can('doctors.delete');
    Route::delete('/bulk/delete', [DoctorController::class, 'bulkDelete'])->name('bulk.delete')->can('doctors.delete');
    Route::put('/update/{doctor}', [DoctorController::class, 'update'])->name('update')->can('doctors.edit');
    Route::put('/update/slug/{doctor}', [DoctorController::class, 'updateSlug'])->name('update.slug');
    Route::post('/clone/{doctor}', [DoctorController::class, 'clone'])->name('clone')->can('doctors.create');
});


// testimonial routes
Route::group(['prefix' => 'testimonials', 'as' => 'testimonials.'], function () {
    Route::get('/', [TestimonialController::class, 'index'])->name('index')->can('testimonials.index');
    Route::get('/create', [TestimonialController::class, 'create'])->name('create')->can('testimonials.create');
    Route::get('/edit/{testimonial}', [TestimonialController::class, 'edit'])->name('edit')->can('testimonials.edit');
    Route::post('/', [TestimonialController::class, 'store'])->name('store')->can('testimonials.create');
    Route::delete('/{testimonial}', [TestimonialController::class, 'destroy'])->name('destroy')->can('testimonials.delete');
    Route::delete('/bulk/delete', [TestimonialController::class, 'bulkDelete'])->name('bulk.delete')->can('testimonials.delete');
    Route::put('/update/{testimonial}', [TestimonialController::class, 'update'])->name('update')->can('testimonials.edit');
});

// users route
Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
    Route::get('/', [UserController::class, 'index'])->name('index')->can('users.index');
    Route::get('/create', [UserController::class, 'create'])->name('create')->can('users.create');
    Route::get('/edit/{user}', [UserController::class, 'edit'])->name('edit')->can('users.edit');
    Route::delete('/destroy/{user}', [UserController::class, 'destroy'])->name('destroy')->can('users.delete');
    Route::post('/store', [UserController::class, 'store'])->name('store')->can('users.create');
    Route::put('/update/{user}', [UserController::class, 'update'])->name('update')->can('users.edit');
    Route::delete('/bulk-delete', [UserController::class, 'bulkDelete'])->name('bulk.delete')->can('users.delete');
});

// role permission route
Route::group(['prefix' => 'roles-permissions', 'as' => 'roles.permissions.'], function () {
    Route::get('/', [RolePermissionController::class, 'index'])->name('index');
    Route::get('/create', [RolePermissionController::class, 'create'])->name('create');
    Route::post('/store', [RolePermissionController::class, 'store'])->name('store');
    Route::get('/edit/{role}', [RolePermissionController::class, 'edit'])->name('edit');
    Route::put('/update/{role}', [RolePermissionController::class, 'update'])->name('update');
    Route::delete('/destroy/{role}', [RolePermissionController::class, 'destroy'])->name('destroy');
    Route::delete('/bulk-delete', [RolePermissionController::class, 'bulkDelete'])->name('bulk.delete');
});

// pricing plan route
Route::group(['prefix' => 'pricing-plan', 'as' => 'pricing.plans.'], function () {
    Route::get('/', [PricingPlanController::class, 'index'])->name('index')->can('pricing_plans.index');
    Route::get('/create', [PricingPlanController::class, 'create'])->name('create')->can('pricing_plans.create');
    Route::post('/store', [PricingPlanController::class, 'store'])->name('store')->can('pricing_plans.create');
    Route::get('/show/{pricingPlan}', [PricingPlanController::class, 'show'])->name('show')->can('pricing_plans.show');
    Route::get('/edit/{pricingPlan}', [PricingPlanController::class, 'edit'])->name('edit')->can('pricing_plans.edit');
    Route::put('/update/{pricingPlan}', [PricingPlanController::class, 'update'])->name('update')->can('pricing_plans.edit');
    Route::delete('/destroy/{pricingPlan}', [PricingPlanController::class, 'destroy'])->name('destroy')->can('pricing_plans.delete');
    Route::delete('/bulk-delete', [PricingPlanController::class, 'bulkDelete'])->name('bulk.delete')->can('pricing_plans.delete');
});

// payment history route
Route::group(['prefix' => 'payment-history', 'as' => 'payment.history.'], function () {
    Route::get('/', [PaymentHistoryController::class, 'index'])->name('index')->can('payment_history.index');
    Route::get('/show/{paymentHistory}', [PaymentHistoryController::class, 'show'])->name('show')->can('payment_history.show');
});

// Languages route
Route::group(['prefix' => 'languages', 'as' => 'languages.'], function () {
    Route::get('/', [LanguagesController::class, 'index'])->name('index');
    Route::get('/create', [LanguagesController::class, 'create'])->name('create');
    Route::post('/store', [LanguagesController::class, 'store'])->name('store');
    Route::get('/edit/{language}', [LanguagesController::class, 'edit'])->name('edit');
    Route::put('/update/{language}', [LanguagesController::class, 'update'])->name('update');
    Route::delete('/delete/{language}', [LanguagesController::class, 'destroy'])->name('destroy');
    Route::post('/make-default/{language}', [LanguagesController::class, 'makeDefault'])->name('make.default');
});

// Translations route
Route::group(['prefix' => 'translations', 'as' => 'translations.'], function () {
    Route::get('/', [TranslateController::class, 'index'])->name('index');
    Route::get('/show/{language}', [TranslateController::class, 'show'])->name('show');
    Route::put('/update/{language}', [TranslateController::class, 'update'])->name('update');
    Route::put('/auto/{language}', [TranslateController::class, 'auto'])->name('auto');
});

// settings route
Route::group(['prefix' => 'settings', 'as' => 'settings.'], function () {
    Route::get('/common-settings', [SettingController::class, 'commonSettings'])->name('common.settings')->can('settings.manage');
    Route::put('/common-settings/update', [SettingController::class, 'commonSettingsUpdate'])->name('common.settings.update')->can('settings.manage');

    Route::get('/google-captcha', [SettingController::class, 'googleCaptcha'])->name('google.captcha')->can('settings.manage');
    Route::put('/google-captcha/update', [SettingController::class, 'googleCaptchaUpdate'])->name('google.captcha.update')->can('settings.manage');

    Route::get('/payment-gateways', [SettingController::class, 'paymentGateway'])->name('payment.gateway')->can('settings.manage');
    Route::put('/payment-gateway/update', [SettingController::class, 'paymentGatewayUpdate'])->name('payment.gateway.update')->can('settings.manage');

    Route::get('/smtp-setting', [SettingController::class, 'smtpSetting'])->name('smtp.setting')->can('settings.manage');
    Route::put('/smtp-setting/update', [SettingController::class, 'smtpUpdate'])->name('smtp.update')->can('settings.manage');

    Route::get('/page-settings', [SettingController::class, 'pageSetting'])->name('page.setting')->can('settings.manage');
    Route::put('/page-setting/update', [SettingController::class, 'pageSettingUpdate'])->name('page.setting.update')->can('settings.manage');

    Route::get('/currency-settings', [SettingController::class, 'currencySetting'])->name('currency.setting')->can('settings.manage')->can('settings.manage');
    Route::put('/currency-setting/update', [SettingController::class, 'currencySettingUpdate'])->name('currency.setting.update')->can('settings.manage')->can('settings.manage');

    Route::get('/invoice-setting', [SettingController::class, 'invoiceSetting'])->name('invoice')->can('settings.manage');
    Route::put('/invoice-setting/update', [SettingController::class, 'invoiceSettingUpdate'])->name('invoice.update')->can('settings.manage');

    Route::get('/social-login', [SettingController::class, 'socialLogin'])->name('social.login')->can('settings.manage');
    Route::put('/google-login/update', [SettingController::class, 'googleLoginUpdate'])->name('google.login.update')->can('settings.manage');
    Route::put('/facebook-login/update', [SettingController::class, 'facebookLoginUpdate'])->name('facebook.login.update')->can('settings.manage');
});

// form response
Route::group(['prefix' => 'form-response', 'as' => 'form.response.'], function () {
    Route::get('/', [FormResponseController::class, 'index'])->name('index')->can('form_response.index');
    Route::delete('/destroy/{formResponse}', [FormResponseController::class, 'destroy'])->name('destroy')->can('form_response.delete');
    Route::delete('/bulk-delete', [FormResponseController::class, 'bulkDelete'])->name('bulkDelete')->can('form_response.delete');
    Route::get('/{formResponse}', [FormResponseController::class, 'show'])->name('show')->can('form_response.show');
});

// profile route
Route::get('profile', [AuthController::class, 'profile'])->name('profile');
Route::put('profile', [AuthController::class, 'updateProfile'])->name('update');
Route::put('change-password', [AuthController::class, 'changePassword'])->name('change.password');

/** Media routes **/
Route::group(['prefix' => 'media', 'as' => 'media.'], function () {
    Route::get('/library', [MediaController::class, 'index'])->name('library')->can('media.index');
    Route::get('/', [MediaController::class, 'getMediaData'])->name('index');
    Route::post('/', [MediaController::class, 'store'])->name('store');
    Route::delete('/{media}', [MediaController::class, 'destroy'])->name('destroy');
    Route::get('/filtered-month-year', [MediaController::class, 'getFilteredMonthYear'])->name('filtered.month.year');
});

// admin editor image upload route
Route::post('editor/image/upload', [EditorImageUploaderController::class, 'upload'])->name('editor.image.upload');

Route::get('generate-sitemap', [SeoController::class, 'generateSitemap'])->name('generate.sitemap');
Route::get('/change-language/{lang}', [SettingController::class, 'changeLang'])->name('change.lang');

// Product category Routes
Route::group(['prefix' => 'product-categories', 'as' => 'product.categories.'], function () {
    Route::get('/', [ProductCategoryController::class, 'index'])->name('index')->can('product_categories.index');
    Route::get('/create', [ProductCategoryController::class, 'create'])->name('create')->can('product_categories.create');
    Route::post('/store', [ProductCategoryController::class, 'store'])->name('store')->can('product_categories.create');
    Route::get('/edit/{category}', [ProductCategoryController::class, 'edit'])->name('edit')->can('product_categories.edit');
    Route::put('/update/{category}', [ProductCategoryController::class, 'update'])->name('update')->can('product_categories.edit');
    Route::delete('/destroy/{category}', [ProductCategoryController::class, 'destroy'])->name('destroy')->can('product_categories.delete');
    Route::delete('/bulk-delete', [ProductCategoryController::class, 'bulkDelete'])->name('bulk.delete')->can('product_categories.delete');
});

// Product Tag Routes
Route::group(['prefix' => 'product-tags', 'as' => 'product.tags.'], function () {
    Route::get('/', [ProductTagController::class, 'index'])->name('index')->can('product_tags.index');
    Route::get('/create', [ProductTagController::class, 'create'])->name('create')->can('product_tags.create');
    Route::post('/store', [ProductTagController::class, 'store'])->name('store')->can('product_tags.create');
    Route::get('/edit/{tag}', [ProductTagController::class, 'edit'])->name('edit')->can('product_tags.edit');
    Route::put('/update/{tag}', [ProductTagController::class, 'update'])->name('update')->can('product_tags.edit');
    Route::delete('/destroy/{tag}', [ProductTagController::class, 'destroy'])->name('destroy')->can('product_tags.delete');
    Route::delete('/bulk-delete', [ProductTagController::class, 'bulkDelete'])->name('bulk.delete')->can('product_tags.delete');
});

// Products Routes
Route::group(['prefix' => 'products', 'as' => 'products.'], function () {
    Route::get('/', [ProductController::class, 'index'])->name('index')->can('products.index');
    Route::get('/create', [ProductController::class, 'create'])->name('create')->can('products.create');
    Route::post('/store', [ProductController::class, 'store'])->name('store')->can('products.create');
    Route::get('/edit/{product}', [ProductController::class, 'edit'])->name('edit')->can('products.edit');
    Route::put('/update/{product}', [ProductController::class, 'update'])->name('update')->can('products.edit');
    Route::delete('/destroy/{product}', [ProductController::class, 'destroy'])->name('destroy')->can('products.delete');
    Route::delete('/bulk-delete', [ProductController::class, 'bulkDelete'])->name('bulk.delete')->can('products.delete');
});

/** Coupon routes **/
Route::group(['prefix' => 'coupons', 'as' => 'coupons.'], function () {
    Route::get('/', [CouponController::class, 'index'])->name('index')->can('coupons.index');
    Route::get('/create', [CouponController::class, 'create'])->name('create')->can('coupons.create');
    Route::post('/store', [CouponController::class, 'store'])->name('store')->can('coupons.create');
    Route::get('/edit/{coupon}', [CouponController::class, 'edit'])->name('edit')->can('coupons.edit');
    Route::put('/update/{coupon}', [CouponController::class, 'update'])->name('update')->can('coupons.edit');
    Route::delete('/delete/{coupon}', [CouponController::class, 'delete'])->name('delete')->can('coupons.delete');
    Route::delete('/bulk-delete', [CouponController::class, 'bulkDelete'])->name('bulk.delete')->can('coupons.delete');
});

/** Orders routes **/
Route::group(['prefix' => 'orders', 'as' => 'orders.'], function () {
    Route::get('/', [OrderController::class, 'index'])->name('index')->can('orders.index');
    Route::get('/show/{order}', [OrderController::class, 'show'])->name('show')->can('orders.show');
    Route::put('/update-status/{order}', [OrderController::class, 'updateStatus'])->name('update.status')->can('orders.show');
    Route::get('/show-invoice/{order}', [OrderController::class, 'showInvoice'])->name('show.invoice')->can('orders.show');
    Route::get('/download-invoice/{order}', [OrderController::class, 'downloadInvoice'])->name('download.invoice')->can('orders.show');
    Route::delete('/delete/{order}', [OrderController::class, 'destroy'])->name('destroy')->can('orders.delete');
    Route::delete('/bulk-delete', [OrderController::class, 'bulkDelete'])->name('bulk.delete')->can('orders.delete');
});

/** Review routes **/
Route::group(['prefix' => 'reviews', 'as' => 'reviews.'], function () {
    Route::get('/', [ReviewController::class, 'index'])->name('index')->can('product_reviews.index');
    Route::get('{review}/approved', [ReviewController::class, 'approved'])->name('approved')->can('product_reviews.approve');
    Route::get('{review}/unApproved', [ReviewController::class, 'unApproved'])->name('unApproved')->can('product_reviews.unApprove');
});

/** Ticket routes **/
Route::group(['prefix' => 'tickets', 'as' => 'tickets.'], function () {
    Route::get('/', [TicketController::class, 'index'])->name('index');
    Route::get('/reply/{ticket}', [TicketController::class, 'reply'])->name('reply');
    Route::post('/reply/{ticket}', [TicketController::class, 'submitReply'])->name('submit.reply');
    Route::delete('/delete/{ticket}', [TicketController::class, 'destroy'])->name('destroy');
    Route::delete('/bulk-delete', [TicketController::class, 'bulkDelete'])->name('bulk.delete');
});

/** Manual payment gateway routes **/
Route::group(['prefix' => 'manual-payment-gateway', 'as' => 'manual.payment.gateway.'], function () {
    Route::get('/', [ManualPaymentGatewayController::class, 'index'])->name('index');
    Route::get('/create', [ManualPaymentGatewayController::class, 'create'])->name('create');
    Route::post('/store', [ManualPaymentGatewayController::class, 'store'])->name('store');
    Route::get('/edit/{gateway}', [ManualPaymentGatewayController::class, 'edit'])->name('edit');
    Route::put('/update/{gateway}', [ManualPaymentGatewayController::class, 'update'])->name('update');
    Route::delete('/delete/{gateway}', [ManualPaymentGatewayController::class, 'destroy'])->name('destroy');
    Route::delete('/bulk-delete', [ManualPaymentGatewayController::class, 'bulkDelete'])->name('bulk.delete');
    Route::post('/status/toggle', [ManualPaymentGatewayController::class, 'statusToggle'])->name('status.toggle');
});
