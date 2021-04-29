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

            $table->integer('id_genero')->unsigned()->foreign()->references('id')->on('generos')->onDelete('cascade');
            $table->integer('id_pais')->unsigned()->foreign()->references('id')->on('pais')->onDelete('cascade');
            $table->integer('id_municipio')->unsigned()->foreign()->references('id')->on('municipios')->onDelete('cascade');
            $table->integer('id_departamento')->unsigned()->foreign()->references('id')->on('departamentos')->onDelete('cascade');
            
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
