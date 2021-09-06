<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFaultMaster extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fault_master', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('type')->default(1)->comment("1-Battery,2-EV,3-Charger");
            $table->string('title', 100)->nullable();
            $table->integer('oem_id')->default(0);
            $table->integer('bit_position')->default(0);
            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->default(0);
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
        Schema::dropIfExists('fault_master');
    }
}
