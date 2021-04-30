<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamenesHemogramasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examenes_hemogramas', function (Blueprint $table) {
            $table->integer('codigo_hemograma')->unique()->primary();
            
            $table->string('codigo_examen');
            $table->foreign('codigo_examen')->references('codigo_examen')->on('examenes');
            
            $table->string('parametro', 150);
            $table->string('unidad_de_medida', 50);
            $table->float('valor_min_mujeres');
            $table->float('valor_max_mujeres');
            $table->float('valor_min_hombres');
            $table->float('valor_max_hombres');
            $table->float('valor_resultado');
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
        Schema::dropIfExists('examenes_hemogramas');
    }
}
