<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterBatteryItLog extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::table('battery_it_log', function (Blueprint $table) {
            $table->dropColumn('battery_inventory_id_id');
            $table->double('rec', 15, 0)->default(0)->after('soc');
            $table->double('bv', 15, 0)->default(0)->after('soc');
        });
        Schema::table('transaction_log', function (Blueprint $table) {
            $table->boolean('status')->default(1)->after('end_time')->comment = '1-Open, 7-Completed';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::table('battery_it_log', function (Blueprint $table) {
            //
        });
    }

}
