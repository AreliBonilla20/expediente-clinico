<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConsultoriosHorariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consultorios_horarios', function (Blueprint $table) {
            $table->bigIncrements('id_consultorio_horario');

            $table->string('id_consultorio');
            $table->foreign('id_consultorio')->references('id_consultorio')->on('consultorios');

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
        Schema::dropIfExists('consultorios_horarios');
    }
}
