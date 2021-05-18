<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHospitalizacionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hospitalizaciones', function (Blueprint $table) {
            $table->string('id_hospitalizacion', 10)->unique()->primary();

            $table->string('codigo_paciente');
            $table->foreign('codigo_paciente')->references('codigo')->on('pacientes');

            $table->date('fecha_ingreso');
            $table->time('hora_ingreso');
            $table->string('motivo_ingreso', 500);
            $table->string('sala', 50);
            $table->string('camilla', 10);
            $table->string('estado_paciente', 500);
            $table->integer('dias_ingreso')->nullable();
            $table->date('fecha_alta')->nullable();
            $table->float('costo')->nullable();
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
        Schema::dropIfExists('hospitalizaciones');
    }
}
