<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCostoServiciosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('costo_servicios', function (Blueprint $table) {
            $table->bigIncrements('id_costo_servicio');

            $table->string('codigo_paciente');
            $table->foreign('codigo_paciente')->references('codigo')->on('pacientes');

            $table->string('id_consulta')->nullable();
            $table->foreign('id_consulta')->references('id_consulta')->on('consultas');

            $table->string('id_hospitalizacion')->nullable();
            $table->foreign('id_hospitalizacion')->references('id_hospitalizacion')->on('hospitalizaciones');

            $table->string('id_centro_medico');
            $table->foreign('id_centro_medico')->references('id_centro_medico')->on('centros_medicos');

            $table->float('costo_consulta', 8, 2)->default(0)->nullable();
            $table->float('costo_hospitalizacion', 8, 2)->default(0)->nullable();
            $table->float('costo_medicamentos', 8, 2)->default(0)->nullable();
            $table->float('costo_tratamientos', 8, 2)->default(0)->nullable();
            $table->float('costo_examenes', 8, 2)->default(0)->nullable();
            $table->float('costo_total', 8, 2)->default(0)->nullable();
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
        Schema::dropIfExists('costo_servicios');
    }
}
