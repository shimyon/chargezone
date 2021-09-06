<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChargerInventoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('charger_inventory', function (Blueprint $table) {
            $table->id();
            $table->integer('charger_master_id')->default(0);
            $table->integer('hub_id')->default(0);
            $table->string('charger_id', 50)->nullable();
            $table->string('qr_code', 50)->nullable();
            $table->integer('no_of_slot')->default(0);
            $table->integer('own_by')->default(0)->comment("owner Id");
            $table->string('remark_1', 100)->nullable();
            $table->string('remark_2', 100)->nullable();
            $table->boolean('is_faulty')->default(0);
            $table->boolean('is_active')->default(1);
            $table->text('all_data')->nullable();
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
        Schema::dropIfExists('charger_inventory');
    }
}
