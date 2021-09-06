<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateChargerMaster extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('charger_master', function (Blueprint $table) {
            $table->id();
            $table->integer('oem_id')->default(0);
            $table->string('make', 100)->nullable();
            $table->string('model', 100)->nullable();
            $table->string('dimension', 100)->nullable();
            $table->text('file_name_path')->nullable();
            $table->string('remark_1', 100)->nullable();
            $table->string('remark_2', 100)->nullable();
            $table->boolean('is_active')->default(1);
            $table->text('all_data')->nullable();
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });
        Schema::create('charger_slot', function (Blueprint $table) {
            $table->id();
            $table->integer('charger_inventory_id')->default(0)->comment("id from charger inventory");
            $table->integer('hub_id')->default(0);
            $table->string('charger_id', 50)->nullable();
            $table->string('slot_id', 50)->nullable();
            $table->boolean('is_faulty')->default(0);
            $table->boolean('in_use')->default(0);
            $table->boolean('in_charging')->default(0);
            $table->integer('battery_inventory_id')->default(0);
            $table->string('battery_serial_no', 100)->nullable();
            $table->double('soc_voltage', 15, 0)->default(0);
            $table->double('soc_percentage', 15, 0)->default(0);
            $table->boolean('is_active')->default(1);
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('charger_master');
        Schema::dropIfExists('charger_slot');
    }
}
