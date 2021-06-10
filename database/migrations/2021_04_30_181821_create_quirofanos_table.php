<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuirofanosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quirofanos', function (Blueprint $table) {
            $table->string('id_quirofano', 25)->unique()->primary();

            $table->string('id_centro_medico');
            $table->foreign('id_centro_medico')->references('id_centro_medico')->on('centros_medicos');
           
            $table->string('quirofano', 150);
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
        Schema::dropIfExists('quirofanos');
    }
}
