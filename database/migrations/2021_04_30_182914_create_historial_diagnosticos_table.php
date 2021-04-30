<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistorialDiagnosticosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historial_diagnosticos', function (Blueprint $table) {
            $table->bigIncrements('id_historial_diagnosticos');

            $table->string('id_atencion_medica');
            $table->foreign('id_atencion_medica')->references('id_atencion_medica')->on('atenciones_medicas');

            $table->string('codigo_diagnostico');
            $table->foreign('codigo_diagnostico')->references('codigo_diagnostico')->on('diagnosticos');

            $table->string('observaciones_diagnostico', 250);
            $table->string('indicaciones_diagnostico', 250);
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
        Schema::dropIfExists('historial_diagnosticos');
    }
}
