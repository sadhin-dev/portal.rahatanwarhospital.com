<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\ForgetPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\SocialLoginController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('/register', [RegisteredUserController::class, 'store'])
        ->name('register');

    Route::get('/login', [AuthenticatedSessionController::class, 'create'])
        ->name('login.create');

    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store');

    Route::get('/forgot-password', [ForgetPasswordController::class, 'forgotPassword'])
        ->name('forgot.password');

    Route::post('/forgot-password', [ForgetPasswordController::class, 'forgotPasswordSubmit'])
        ->name('forgot.password');

    Route::get('/reset-password/{token}', [ForgetPasswordController::class, 'passwordUpdate'])
        ->name('password.reset');

    Route::post('/reset-password', [ForgetPasswordController::class, 'passwordStore'])
        ->name('rest.password.update');

    // Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    //     ->name('password.email');
    Route::get('/{provider}/redirect', [SocialLoginController::class, 'redirect'])
        ->name('social.redirect');
    Route::get('/{provider}/callback', [SocialLoginController::class, 'callback'])
        ->name('social.callback');
});

Route::middleware('auth')->group(function () {
    Route::get('auth/verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
