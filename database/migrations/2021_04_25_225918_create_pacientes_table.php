<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePacientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pacientes', function (Blueprint $table) {
            $table->string('codigo', 7)->unique()->primary();
            $table->string('nombres', 150);
            $table->string('apellidos', 150);
            $table->string('identificacion', 30)->nullable();
            $table->date('fecha_nacimiento');
            $table->string('direccion', 250);
            $table->string('telefono', 25);
            $table->string('correo', 150)->nullable();
            $table->string('estado_civil', 30);
            $table->string('nombre_conyugue', 150)->nullable();
            $table->string('apellido_conyugue', 150)->nullable();
            $table->string('nombre_contacto_emergencia', 150);
            $table->string('telefono_contacto_emergencia', 25);

            $table->unsignedBigInteger('id_genero');
            $table->foreign('id_genero')->references('id_genero')->on('generos');

            $table->unsignedBigInteger('id_pais');
            $table->foreign('id_pais')->references('id_pais')->on('pais');

            $table->unsignedBigInteger('id_departamento');
            $table->foreign('id_departamento')->references('id_departamento')->on('departamentos');

            $table->unsignedBigInteger('id_municipio');
            $table->foreign('id_municipio')->references('id_municipio')->on('municipios');

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
        Schema::dropIfExists('pacientes');
    }
}