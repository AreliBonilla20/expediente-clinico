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
            
            $table->string('nombre_tratamiento', 150);
            $table->string('descripcion_tratamiento', 250);
            $table->float('costo_tratamiento');
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
