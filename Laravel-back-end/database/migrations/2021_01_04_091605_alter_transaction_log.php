<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTransactionLog extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('transaction_log', function (Blueprint $table) {
            $table->integer('discharged_battery_inventory_id_2')->default(0)->after('charged_battery_bin_2');
            $table->integer('discharged_battery_inventory_id_1')->default(0)->after('charged_battery_bin_2');
            $table->integer('charged_battery_inventory_id_2')->default(0)->after('charged_battery_bin_2');
            $table->integer('charged_battery_inventory_id_1')->default(0)->after('charged_battery_bin_2');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('transaction_log', function (Blueprint $table) {
            //
        });
    }
}
