<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamenesHecesOrinaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examenes_heces_orina', function (Blueprint $table) {
            $table->string('codigo_examen_heces_orina', 10)->unique()->primary();
            
            $table->string('codigo_examen');
            $table->foreign('codigo_examen')->references('codigo_examen')->on('examenes');

            $table->string('parametro', 150);
            $table->string('unidad_de_medida', 50);
            $table->float('valor_normal', 150);
            $table->float('valor_resultado', 150);
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
        Schema::dropIfExists('examenes_heces_orina');
    }
}
