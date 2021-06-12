<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistorialCirugiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historial_cirugias', function (Blueprint $table) {
            $table->bigIncrements('id_historial_cirugia');

            $table->string('id_atencion_medica');
            $table->foreign('id_atencion_medica')->references('id_atencion_medica')->on('atenciones_medicas');

            $table->string('codigo_cirugia');
            $table->foreign('codigo_cirugia')->references('codigo_cirugia')->on('cirugias');
            
            $table->string('id_quirofano');
            $table->foreign('id_quirofano')->references('id_quirofano')->on('quirofanos');

           
            $table->time('hora_cirugia');
            $table->string('estado_cirugia', 50);
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
        Schema::dropIfExists('historial_cirugias');
    }
}
