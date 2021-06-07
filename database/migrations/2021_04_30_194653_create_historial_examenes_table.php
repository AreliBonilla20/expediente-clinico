<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistorialExamenesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historial_examenes', function (Blueprint $table) {
            $table->bigIncrements('id_historial_examen');

            $table->string('codigo_examen');
            $table->foreign('codigo_examen')->references('codigo_examen')->on('examenes');

            $table->string('id_atencion_medica');
            $table->foreign('id_atencion_medica')->references('id_atencion_medica')->on('atenciones_medicas');

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
        Schema::dropIfExists('historial_examenes');
    }
}
