<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuirofanosHorariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quirofanos_horarios', function (Blueprint $table) {
            $table->bigIncrements('id_quirofano_horario');

            $table->string('id_quirofano');
            $table->foreign('id_quirofano')->references('id_quirofano')->on('quirofanos');

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
        Schema::dropIfExists('quirofanos_horarios');
    }
}
