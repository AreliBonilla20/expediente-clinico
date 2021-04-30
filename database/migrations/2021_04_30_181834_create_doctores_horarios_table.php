<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctoresHorariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctores_horarios', function (Blueprint $table) {
            $table->bigIncrements('id_doctor_horario');

            $table->string('id_doctor');
            $table->foreign('id_doctor')->references('id_doctor')->on('doctores');

            $table->unsignedBigInteger('id_horario');
            $table->foreign('id_horario')->references('id_horario')->on('horarios');
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
        Schema::dropIfExists('doctores_horarios');
    }
}
