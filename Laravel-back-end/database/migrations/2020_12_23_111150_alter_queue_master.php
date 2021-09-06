<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterQueueMaster extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::table('queue_master', function (Blueprint $table) {
            $table->dropColumn(['discharged_battery_bin_1', 'discharged_battery_bin_2', 'charged_battery_bin_1', 'charged_battery_bin_2', 'discharged_battery_soc_1', 'discharged_battery_soc_2', 'charged_battery_soc_1', 'charged_battery_soc_2']);
            $table->integer('discharged_b1_qr_code')->default(0)->after('registration_no');
            $table->integer('discharged_b2_qr_code')->default(0)->after('discharged_b1_qr_code');
            $table->integer('charged_b1_qr_code')->default(0)->after('discharged_b2_qr_code');
            $table->integer('charged_b2_qr_code')->default(0)->after('charged_b1_qr_code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::table('queue_master', function (Blueprint $table) {
            //
        });
    }

}
