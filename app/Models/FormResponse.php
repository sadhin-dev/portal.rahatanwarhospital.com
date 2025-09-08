<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FormResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'response_data',
        'response_from',
        'form_name',
        'is_open',
    ];

    public function getResponseDataAttribute($value)
    {
        return json_decode($value);
    }

    public function formResponseType(): BelongsTo
    {
        return $this->belongsTo(FormResponseType::class, 'form_name', 'form_name');
    }
}
