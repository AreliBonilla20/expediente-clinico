<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistorialTratamientosMedicosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historial_tratamientos_medicos', function (Blueprint $table) {
            $table->integer('id_historial_tratamiento')->unique()->primary();
            
            $table->string('id_atencion_medica');
            $table->foreign('id_atencion_medica')->references('id_atencion_medica')->on('atenciones_medicas');

            $table->string('codigo_tratamiento');
            $table->foreign('codigo_tratamiento')->references('codigo_tratamiento')->on('tratamientos_medicos');

            $table->string('indicaciones', 250);

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
        Schema::dropIfExists('historial_tratamientos_medicos');
    }
}
