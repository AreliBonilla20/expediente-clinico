<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChequeosHospitalizacionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chequeos_hospitalizaciones', function (Blueprint $table) {
            $table->bigIncrements('id_chequeo_hospitalizacion');

            $table->string('id_hospitalizacion');
            $table->foreign('id_hospitalizacion')->references('id_hospitalizacion')->on('hospitalizaciones');

            $table->string('observacion_chequeo', 500);
            $table->date('fecha_chequeo');
            $table->time('hora_chequeo');

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
        Schema::dropIfExists('chequeos_hospitalizaciones');
    }
}
