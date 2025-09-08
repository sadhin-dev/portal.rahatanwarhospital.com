<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DepartmentCategory extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['department_count'];

    /**
     * Get Team contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(DepartmentCategoryContent::class);
    }

    /**
     * Get Team content
     */
    public function content(): mixed
    {
        return $this->hasOne(DepartmentCategoryContent::class)->where('language_code', app()->getLocale());
    }

    /**
     * Get All departments
     */
    public function departments(): HasMany
    {
        return $this->hasMany(Department::class, 'category_id', 'id');
    }

    /**
     * get department count
     */
    public function getDepartmentCountAttribute(): int
    {
        return $this->departments()->count();
    }
}
