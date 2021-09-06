<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oem_master', function (Blueprint $table) {
            $table->increments('oem_id');
            $table->tinyInteger('type')->default(1)->comment("1-Battery,2-EV,3-Charger");
            $table->string('name', 100)->nullable();
            $table->string('address', 250)->nullable();
            $table->string('contact_person', 100)->nullable();
            $table->string('contact_email', 100)->nullable();
            $table->string('contact_number', 30)->nullable();
            $table->string('remark_1', 100)->nullable();
            $table->string('remark_2', 100)->nullable();
            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });
        Schema::create('oem_user', function (Blueprint $table) {
            $table->increments('oem_user_id');
            $table->integer('oem_id')->default(0);
            $table->integer('user_id')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('oem_master');
        Schema::dropIfExists('oem_user');
    }
}
