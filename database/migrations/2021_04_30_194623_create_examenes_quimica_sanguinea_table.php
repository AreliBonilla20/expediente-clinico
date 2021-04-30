<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamenesQuimicaSanguineaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examenes_quimica_sanguinea', function (Blueprint $table) {
            $table->string('codigo_examen_quimica_sanguinea', 10)->unique()->primary();
            
            $table->string('codigo_examen');
            $table->foreign('codigo_examen')->references('codigo_examen')->on('examenes');

            $table->string('nombre_examen_quimica_sanguinea', 10);
            $table->string('unidades_convencionales', 10);
            $table->float('valor_min_unidad_convencional');
            $table->float('valor_max_unidad_convencional');
            $table->float('valor_min_unidad_si');
            $table->float('valor_max_unidad_si');
            $table->float('valor_resultado_unidades_convencionales')->nullable();
            $table->float('valor_resultado_unidades_si')->nullable();
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
        Schema::dropIfExists('examenes_quimica_sanguinea');
    }
}
