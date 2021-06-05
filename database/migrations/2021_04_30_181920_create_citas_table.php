<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCitasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('citas', function (Blueprint $table) {
            $table->string('id_cita', 10)->unique()->primary();

            $table->string('id_centro_medico');
            $table->foreign('id_centro_medico')->references('id_centro_medico')->on('centros_medicos');

            $table->string('id_especialidad');
            $table->foreign('id_especialidad')->references('id_especialidad')->on('especialidades');

            $table->string('codigo_paciente');
            $table->foreign('codigo_paciente')->references('codigo')->on('pacientes');

            $table->string('id_doctor');
            $table->foreign('id_doctor')->references('id_doctor')->on('doctores');

            $table->string('id_consultorio');
            $table->foreign('id_consultorio')->references('id_consultorio')->on('consultorios');

            $table->date('fecha_cita');
            $table->time('hora_cita');
            $table->string('estado_cita', 75);
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
        Schema::dropIfExists('citas');
    }
}
