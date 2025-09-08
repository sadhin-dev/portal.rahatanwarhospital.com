<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Department extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['meta_image_url'];

    /**
     * Get department contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(DepartmentContent::class);
    }

    /**
     * Get department content
     */
    public function content(): HasOne
    {
        return $this->hasOne(DepartmentContent::class)->where('language_code', app()->getLocale());
    }

    /**
     * Get category
     */
    public function category(): HasOne
    {
        return $this->hasOne(DepartmentCategory::class, 'id', 'category_id');
    }

    /**
     * Get icon box json to object
     */
    public function getIconBoxAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    /**
     * Get info box
     */
    public function getInfoListAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    /**
     * Get sections as array
     */
    public function getSectionsAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    public function getIsShowBreadcrumbAttribute($value): bool
    {
        return $value == '1';
    }

    /**
     * Get sections data as object
     */
    public function getSectionsDataAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    /**
     * Get meta image url
     */
    public function getMetaImageUrlAttribute(): string
    {
        return asset($this->meta_image);
    }
}
