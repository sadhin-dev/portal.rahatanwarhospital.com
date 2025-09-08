<?php

namespace App\Http\Requests\Auth;

use App\Rules\CheckOtpExpired;
use App\Rules\MatchOtp;
use Illuminate\Foundation\Http\FormRequest;

class VerifyOtpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'otp' => ['required', new MatchOtp, new CheckOtpExpired],
        ];
    }
}
