<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id')->index();
            $table->string('slug')->unique();
            $table->string('sku');
            $table->decimal('quantity');
            $table->decimal('price');
            $table->decimal('discount_price')->nullable();
            $table->string('thumbnail_image');
            $table->json('slider_images')->nullable();
            $table->unsignedTinyInteger('is_featured')->default(0)->comment('0 means will not show in home page, 1 means will show in home page');
            $table->unsignedTinyInteger('status')->default(1)->comment('0 means inactive, 1 means active');
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->timestamps();
        });

        Schema::create('product_contents', function (Blueprint $table) {
            $table->id();
            $table->string('language_code', 10)->index();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_contents');
        Schema::dropIfExists('products');
    }
};
