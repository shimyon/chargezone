<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTransactionTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::table('transaction_log', function (Blueprint $table) {
            $table->string('charged_battery_rec_2', 100)->nullable()->after('charged_battery_soc_2');
            $table->string('charged_battery_rec_1', 100)->nullable()->after('charged_battery_soc_2');
            $table->string('discharged_battery_rec_2', 100)->nullable()->after('charged_battery_soc_2');
            $table->string('discharged_battery_rec_1', 100)->nullable()->after('charged_battery_soc_2');
            $table->string('charged_battery_bv_2', 100)->nullable()->after('charged_battery_soc_2');
            $table->string('charged_battery_bv_1', 100)->nullable()->after('charged_battery_soc_2');
            $table->string('discharged_battery_bv_2', 100)->nullable()->after('charged_battery_soc_2');
            $table->string('discharged_battery_bv_1', 100)->nullable()->after('charged_battery_soc_2');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::table('transaction_log', function (Blueprint $table) {
            //
        });
    }

}
