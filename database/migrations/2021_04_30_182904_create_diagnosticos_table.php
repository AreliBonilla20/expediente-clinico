<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiagnosticosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('diagnosticos', function (Blueprint $table) {
            $table->string('codigo_diagnostico', 25)->unique()->primary();

            $table->unsignedBigInteger('id_tipo_diagnostico');
            $table->foreign('id_tipo_diagnostico')->references('id_tipo_diagnostico')->on('tipo_diagnostico');
            
            $table->string('nombre_diagnostico', 150);
            $table->string('descripcion_diagnostico', 500)->nullable();
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
        Schema::dropIfExists('diagnosticos');
    }
}
