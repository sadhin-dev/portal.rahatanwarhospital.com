<?php

namespace App\Listeners;

use App\Events\FormSubmitted;
use Illuminate\Support\Facades\Mail;

class SendFormResponseMail
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(FormSubmitted $event): void
    {
        $data = $event->data;
        Mail::to(config('app.admin_mail'))->send(new \App\Mail\SendFormResponseMail($data));
    }
}
