<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTratamientosMedicosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tratamientos_medicos', function (Blueprint $table) {
            $table->string('codigo_tratamiento', 10)->unique()->primary();

            $table->unsignedBigInteger('id_tipo_tratamiento');
            $table->foreign('id_tipo_tratamiento')->references('id_tipo_tratamiento')->on('tipo_tratamiento');
            
            $table->string('nombre_tratamiento', 150);
            $table->string('descripcion_tratamiento', 500);
            $table->float('costo_tratamiento', 8,2)->nullable();
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
        Schema::dropIfExists('tratamientos_medicos');
    }
}
