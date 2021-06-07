<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamenesResultadoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examenes_resultado', function (Blueprint $table) {
            $table->bigIncrements('id_examen_resultado');
            
            $table->string('id_atencion_medica');
            $table->foreign('id_atencion_medica')->references('id_atencion_medica')->on('atenciones_medicas');

            $table->string('parametro', 150);
            $table->string('resultado', 250);
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
        Schema::dropIfExists('examenes_resultado');
    }
}
