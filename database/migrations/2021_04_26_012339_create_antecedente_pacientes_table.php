<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAntecedentePacientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('antecedente_pacientes', function (Blueprint $table) {
            $table->increments('id_antecedentes_paciente');
            $table->string('historial_enfermedades', 500);
            $table->string('nombre_padre', 150)->nullable();
            $table->string('apellidos_padre', 150)->nullable();
            $table->date('fecha_nacimiento_padre')->nullable();
            $table->string('direccion_padre', 150)->nullable();
            $table->string('padecimientos_padre', 250)->nullable();

            $table->string('nombre_madre', 150)->nullable();
            $table->string('apellidos_madre', 150)->nullable();
            $table->date('fecha_nacimiento_madre')->nullable();
            $table->string('direccion_madre', 150)->nullable();
            $table->string('padecimientos_madre', 250)->nullable();

            $table->string('padecimientos_familiares', 250)->nullable();

            $table->integer('codigo_paciente')->unsigned()->foreign()->references('codigo')->on('pacientes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('antecedente_pacientes');
    }
}
