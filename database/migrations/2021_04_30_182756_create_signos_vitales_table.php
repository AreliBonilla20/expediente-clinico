<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSignosVitalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('signos_vitales', function (Blueprint $table) {
            $table->bigIncrements('id_signos');
        
            $table->string('id_atencion_medica');
            $table->foreign('id_atencion_medica')->references('id_atencion_medica')->on('atenciones_medicas');

            $table->integer('presion_arterial_sistolica')->nullable();
            $table->integer('presion_arterial_diastolica')->nullable();
            $table->float('peso_paciente', 8,2)->nullable();
            $table->float('estatura_paciente', 8,2)->nullable();
            $table->float('temperatura_paciente', 8,2)->nullable();
            $table->integer('ritmo_cardiaco_paciente')->nullable();
            $table->integer('respiracion_paciente')->nullable();
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
        Schema::dropIfExists('signos_vitales');
    }
}
