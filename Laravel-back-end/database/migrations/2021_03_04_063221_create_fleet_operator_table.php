<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFleetOperatorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fleet_operator_master', function (Blueprint $table) {
            $table->increments('fleet_operator_id');
            $table->string('name', 100)->nullable();
            $table->string('fleet_id', 100)->nullable();
            $table->string('address', 250)->nullable();
            $table->string('contact_person', 100)->nullable();
            $table->string('contact_email', 100)->nullable();
            $table->string('contact_number', 30)->nullable();
            $table->integer('hub_id')->default(0);
            $table->string('remark_1', 100)->nullable();
            $table->string('remark_2', 100)->nullable();
            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });
        Schema::create('fleet_operator_user', function (Blueprint $table) {
            $table->increments('fleet_user_id');
            $table->integer('fleet_operator_id')->default(0);
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
        Schema::dropIfExists('fleet_operator_master');
        Schema::dropIfExists('fleet_operator_user');
    }
}
