<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('department_categories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('department_category_contents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('department_category_id')->index();
            $table->string('language_code', 10)->index();
            $table->string('title', 255);
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('department_category_id')
                ->references('id')->on('department_categories')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('department_categories');
        Schema::dropIfExists('department_category_contents');
    }
};
