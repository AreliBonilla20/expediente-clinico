<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedicamentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medicamentos', function (Blueprint $table) {
            $table->string('codigo_medicamento', 10)->unique()->primary();

            $table->unsignedBigInteger('id_tipo_medicamento');
            $table->foreign('id_tipo_medicamento')->references('id_tipo_medicamento')->on('tipo_medicamento');
            
            $table->string('nombre_medicamento', 250);
            $table->string('descripcion_medicamento', 250);
            $table->string('presentacion_medicamento', 150);
            $table->float('costo_medicamento');
            $table->string('existencia_medicamento', 25);
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
        Schema::dropIfExists('medicamentos');
    }
}
