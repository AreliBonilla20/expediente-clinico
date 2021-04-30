<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctores', function (Blueprint $table) {
            $table->string('id_doctor', 10)->unique()->primary();

            $table->string('id_especialidad');
            $table->foreign('id_especialidad')->references('id_especialidad')->on('especialidades');

            $table->string('id_empleado');
            $table->foreign('id_empleado')->references('id_empleado')->on('empleados');

            $table->string('area_atencion', 150);
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
        Schema::dropIfExists('doctores');
    }
}
