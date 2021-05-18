<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCentrosMedicosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('centros_medicos', function (Blueprint $table) {
            $table->string('id_centro_medico', 10)->unique()->primary();

            $table->unsignedBigInteger('id_tipo_centro_medico');
            $table->foreign('id_tipo_centro_medico')->references('id_tipo_centro_medico')->on('tipo_centro_medico');

            $table->unsignedBigInteger('id_pais');
            $table->foreign('id_pais')->references('id_pais')->on('paises');

            $table->unsignedBigInteger('id_departamento');
            $table->foreign('id_departamento')->references('id_departamento')->on('departamentos');

            $table->unsignedBigInteger('id_municipio');
            $table->foreign('id_municipio')->references('id_municipio')->on('municipios');

            $table->string('nombre_centro_medico', 250);
            $table->string('direccion_centro_medico', 250);
            $table->string('director', 150);
            $table->string('telefono_director', 25);
            $table->string('correo_director', 150)->nullable();
            $table->string('telefono1_centro_medico', 25);
            $table->string('telefono2_centro_medico', 25)->nullable();
            $table->string('correo_centro_medico', 150);
            $table->time('tiempo_consulta_medica');

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
        Schema::dropIfExists('centros_medicos');
    }
}
