<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class NewChargezoneTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        //Battery Master
        Schema::create('battery_master', function (Blueprint $table) {
            $table->increments('battery_master_id');
            $table->integer('oem_id')->default(0);
            $table->string('model_name', 100)->nullable();
            $table->string('make_year', 100)->nullable();
            $table->string('type_of_connector', 100)->nullable();
            $table->text('file_name_path')->nullable();
            $table->string('remark_1', 100)->nullable();
            $table->string('remark_2', 100)->nullable();
            $table->boolean('is_active')->default(1);
            $table->text('all_data')->nullable();
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });

        //Owner Master
        Schema::create('owner_master', function (Blueprint $table) {
            $table->increments('owner_master_id');
            $table->string('name', 100)->nullable();
            $table->string('remark', 100)->nullable();
            $table->text('all_data')->nullable();
            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });

        //Battery Inventory
        Schema::create('battery_inventory', function (Blueprint $table) {
            $table->increments('battery_inventory_id');
            $table->integer('battery_master_id')->default(0);
            $table->integer('hub_id')->default(0);
            $table->integer('ev_inventory_id')->default(0);
            $table->integer('b_qr_code')->default(0);
            $table->integer('own_by')->default(0);
            $table->decimal('bin', 10, 0)->default(0);
            $table->string('imei', 100)->nullable();
            $table->string('soc', 100)->nullable();
            $table->string('lat', 100)->nullable();
            $table->string('long', 100)->nullable();
            $table->string('lon', 100)->nullable();
            $table->boolean('is_faulty')->default(0);
            $table->boolean('in_charging')->default(0);
            $table->string('remark', 100)->nullable();
            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });

        //Battery IT log
        Schema::create('battery_it_log', function (Blueprint $table) {
            $table->increments('battery_it_log_id');
            $table->integer('battery_inventory_id_id')->default(0);
            $table->decimal('bin', 10, 0)->default(0);
            $table->string('battery_voltage', 100)->nullable();
            $table->string('battery_current', 100)->nullable();
            $table->string('soc', 100)->nullable();
            $table->string('lat', 100)->nullable();
            $table->string('long', 100)->nullable();
            $table->text('all_data')->nullable();
            $table->string('remark', 100)->nullable();
            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });


        //Queue Master
        Schema::create('queue_master', function (Blueprint $table) {
            $table->increments('queue_master_id');
            $table->integer('smarteSwappingId')->default(0);
            $table->integer('hub_id')->default(0);
            $table->integer('start_otp')->default(0);
            $table->integer('end_otp')->default(0);
            $table->integer('e_qr_code')->default(0);
            $table->integer('ev_inventory_id')->default(0);
            $table->integer('vechicle_id')->default(0);
            $table->double('discharged_battery_bin_1', 15, 0)->default(0);
            $table->double('discharged_battery_bin_2', 15, 0)->default(0);
            $table->double('charged_battery_bin_1', 15, 0)->default(0);
            $table->double('charged_battery_bin_2', 15, 0)->default(0);
            $table->string('vehicle_vin', 100)->nullable();
            $table->string('registration_no', 100)->nullable();
            $table->string('discharged_battery_soc_1', 100)->nullable();
            $table->string('discharged_battery_soc_2', 100)->nullable();
            $table->string('charged_battery_soc_1', 100)->nullable();
            $table->string('charged_battery_soc_2', 100)->nullable();
            $table->string('remark', 100)->nullable();
            $table->timestamp('start_time')->nullable();
            $table->timestamp('end_time')->nullable();
            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });

        //EV Master
        Schema::create('ev_master', function (Blueprint $table) {
            $table->increments('ev_master_id');
            $table->string('vehicle_model', 100)->nullable();
            $table->string('battery_capacity', 100)->nullable();
            $table->string('vehicle_make', 100)->nullable();
            $table->string('vehicle_type', 100)->nullable();
            $table->integer('fleet_owner_id', 100)->default(0);
            $table->string('fleet_owner', 100)->nullable();
            $table->string('remark_1', 100)->nullable();
            $table->string('remark_2', 100)->nullable();
            $table->boolean('is_active')->default(1);
            $table->text('all_data')->nullable();
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });

        //EV Inventory Master
        Schema::create('ev_inventory_master', function (Blueprint $table) {
            $table->increments('ev_inventory_id');
            $table->integer('ev_master_id')->default(0);
            $table->integer('e_qr_code')->default(0);
            $table->string('registration_no', 100)->nullable();
            $table->integer('hub_id')->default(0);
            $table->integer('battery_id_1')->default(0);
            $table->integer('battery_id_2')->default(0);
            $table->integer('vechicle_id')->default(0);
            $table->string('vehicle_vin', 100)->nullable();
            $table->integer('fleet_owner_id', 100)->default(0);
            $table->string('fleet_owner', 100)->nullable();
            $table->string('remark_1', 100)->nullable();
            $table->string('remark_2', 100)->nullable();
            $table->boolean('modified')->default(1);
            $table->boolean('is_active')->default(1);
            $table->text('all_data')->nullable();
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });

        //Station Master
        Schema::create('hub_master', function (Blueprint $table) {
            $table->increments('hub_master_id');
            $table->string('name', 100)->nullable();
            $table->string('address', 100)->nullable();
            $table->integer('city_id')->default(0);
            $table->integer('state_id')->default(0);
            $table->integer('country_id')->default(0);
            $table->integer('ev_capacity')->default(0);
            $table->integer('total_charger')->default(0);
            $table->string('latitude', 20)->nullable();
            $table->string('longitude', 20)->nullable();
            $table->string('remark_1', 100)->nullable();
            $table->string('remark_2', 100)->nullable();
            $table->boolean('is_faulty')->default(0);
            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });

        //Station Master
        Schema::create('user_hub_log', function (Blueprint $table) {
            $table->increments('log_id');
            $table->integer('hub_id')->default(0);
            $table->integer('user_id')->default(0);
            $table->integer('role_id')->default(0);
            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });


        //Transaction Log
        Schema::create('transaction_log', function (Blueprint $table) {
            $table->increments('transaction_log_id');
            $table->integer('queue_master_id')->default(0);
            $table->integer('smarteSwappingId')->default(0);
            $table->integer('hub_id')->default(0);
            $table->integer('start_otp')->default(0);
            $table->integer('end_otp')->default(0);
            $table->integer('e_qr_code')->default(0);
            $table->integer('ev_inventory_id')->default(0);
            $table->integer('vechicle_id')->default(0);
            $table->double('discharged_battery_bin_1', 15, 0)->default(0);
            $table->double('discharged_battery_bin_2', 15, 0)->default(0);
            $table->double('charged_battery_bin_1', 15, 0)->default(0);
            $table->double('charged_battery_bin_2', 15, 0)->default(0);
            $table->string('vehicle_vin', 100)->nullable();
            $table->string('registration_no', 100)->nullable();
            $table->string('discharged_battery_soc_1', 100)->nullable();
            $table->string('discharged_battery_soc_2', 100)->nullable();
            $table->string('charged_battery_soc_1', 100)->nullable();
            $table->string('charged_battery_soc_2', 100)->nullable();
            $table->string('remark', 100)->nullable();
            $table->timestamp('start_time')->nullable();
            $table->timestamp('end_time')->nullable();
            $table->string('remark_1', 100)->nullable();
            $table->string('remark_2', 100)->nullable();
            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->default(0);
            $table->timestamps();
        });
        
        //Smarte Credentials Log
        Schema::create('smarte_credentials', function (Blueprint $table) {
            $table->increments('log_id');
            $table->text('username')->nullable();
            $table->text('password')->nullable();
            $table->text('token')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('battery_master');
        Schema::dropIfExists('battery_inventory');
        Schema::dropIfExists('battery_it_log');
        Schema::dropIfExists('owner_master');
        Schema::dropIfExists('transaction_log');
        Schema::dropIfExists('hub_master');
        Schema::dropIfExists('user_hub_log');
        Schema::dropIfExists('ev_master');
        Schema::dropIfExists('ev_inventory_master');
        Schema::dropIfExists('queue_master');
        Schema::dropIfExists('smarte_credentials');
    }

}
