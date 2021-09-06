<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateFaultLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fault_history_log', function (Blueprint $table) {
            $table->id();
            $table->integer('hub_id')->default(0);
            $table->integer('owner_id')->default(0);
            $table->integer('oem_id')->default(0);
            $table->string('bin', 100)->nullable();
            $table->string('charger_id', 100)->nullable();
            $table->string('connector_id', 100)->nullable();
            $table->integer('fault_id')->default(0);
            $table->string('alarms', 100)->nullable();
            $table->boolean('is_active')->default(1);
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
        });
        Schema::create('current_battery_fault_log', function (Blueprint $table) {
            $table->id();
            $table->integer('battery_inventory_id')->default(0);
            $table->integer('fault_id')->default(0);
            $table->boolean('is_active')->default(1);
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
        });
        Schema::create('current_charger_fault_log', function (Blueprint $table) {
            $table->id();
            $table->integer('charger_inventory_id')->default(0);
            $table->integer('fault_id')->default(0);
            $table->boolean('is_active')->default(1);
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
        });
        Schema::create('current_connector_fault_log', function (Blueprint $table) {
            $table->id();
            $table->integer('connector_inventory_id')->default(0);
            $table->integer('fault_id')->default(0);
            $table->boolean('is_active')->default(1);
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
        });
        Schema::create('country_master', function (Blueprint $table) {
            $table->id();
            $table->string('country_name', 100)->nullable();
            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });
        Schema::create('state_master', function (Blueprint $table) {
            $table->id();
            $table->integer('country_id')->default(0);
            $table->string('state_name', 100)->nullable();
            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });
        Schema::create('city_master', function (Blueprint $table) {
            $table->id();
            $table->integer('state_id')->default(0);
            $table->string('city_name', 100)->nullable();
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
        Schema::dropIfExists('fault_history_log');
        Schema::dropIfExists('current_battery_fault_log');
        Schema::dropIfExists('current_charger_fault_log');
        Schema::dropIfExists('current_connector_fault_log');
        Schema::dropIfExists('country_master');
        Schema::dropIfExists('state_master');
        Schema::dropIfExists('city_master');
    }
}
