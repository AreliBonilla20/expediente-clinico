<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->string('id_usuario', 25)->unique()->primary();

            $table->string('id_tipo_usuario');
            $table->foreign('id_tipo_usuario')->references('id_tipo_usuario')->on('tipo_usuario');

            $table->string('id_empleado')->nullable();
            $table->foreign('id_empleado')->references('id_empleado')->on('empleados');

            $table->string('codigo_paciente')->nullable();
            $table->foreign('codigo_paciente')->references('codigo')->on('pacientes');
            
            $table->string('nombre_usuario', 25);
            $table->string('correo', 150);
            $table->string('password', 15);
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
        Schema::dropIfExists('usuarios');
    }
}
