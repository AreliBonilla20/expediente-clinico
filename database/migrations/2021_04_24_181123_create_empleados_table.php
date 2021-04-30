<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpleadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->string('id_empleado', 10)->unique()->primary();

            $table->unsignedBigInteger('id_genero');
            $table->foreign('id_genero')->references('id_genero')->on('generos');

            $table->unsignedBigInteger('id_tipo_personal');
            $table->foreign('id_tipo_personal')->references('id_tipo_personal')->on('tipo_personal');

            $table->string('id_centro_medico');
            $table->foreign('id_centro_medico')->references('id_centro_medico')->on('centros_medicos');

            $table->unsignedBigInteger('id_pais');
            $table->foreign('id_pais')->references('id_pais')->on('paises');

            $table->unsignedBigInteger('id_departamento');
            $table->foreign('id_departamento')->references('id_departamento')->on('departamentos');

            $table->unsignedBigInteger('id_municipio');
            $table->foreign('id_municipio')->references('id_municipio')->on('municipios');
            

            $table->string('nombre_empleado', 150);
            $table->string('apellido_empleado', 150);
            $table->string('identificacion_empleado', 50);
            $table->date('fecha_nacimiento_empleado');
            $table->string('direccion_empleado', 250);
            $table->string('telefono_empleado', 25);
            $table->string('correo_empleado', 150);
            $table->string('cargo_empleado', 100);
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
        Schema::dropIfExists('empleados');
    }
}
