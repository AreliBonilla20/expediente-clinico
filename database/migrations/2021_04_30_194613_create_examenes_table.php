<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamenesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examenes', function (Blueprint $table) {
            $table->string('codigo_examen', 5)->unique()->primary();

            $table->string('id_tipo_examen');
            $table->foreign('id_tipo_examen')->references('id_tipo_examen')->on('tipo_examen');
            
            $table->string('nombre_examen', 150);
            $table->string('indicaciones_examen', 150);
            $table->float('costo', 8,2)->nullable();
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
        Schema::dropIfExists('examenes');
    }
}
