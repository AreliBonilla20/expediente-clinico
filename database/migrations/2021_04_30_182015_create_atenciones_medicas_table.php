<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAtencionesMedicasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('atenciones_medicas', function (Blueprint $table) {
            $table->string('id_atencion_medica', 25)->unique()->primary();

            $table->string('id_consulta')->nullable();
            $table->foreign('id_consulta')->references('id_consulta')->on('consultas');

            $table->string('id_hospitalizacion')->nullable();
            $table->foreign('id_hospitalizacion')->references('id_hospitalizacion')->on('hospitalizaciones');

            $table->date('fecha_atencion_medica');
            $table->time('hora_atencion_medica');
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
        Schema::dropIfExists('atenciones_medicas');
    }
}
