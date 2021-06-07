<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamenesParametrosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examenes_parametros', function (Blueprint $table) {
            $table->bigIncrements('id_parametro_examen');

            $table->string('codigo_examen');
            $table->foreign('codigo_examen')->references('codigo_examen')->on('examenes');

            $table->string('parametro', 150);
            $table->string('unidad_medida', 25)->nullable();
            $table->float('valor_min', 8, 2)->nullable();
            $table->float('valor_max', 8, 2)->nullable();
  
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
        Schema::dropIfExists('examenes_parametros');
    }
}
