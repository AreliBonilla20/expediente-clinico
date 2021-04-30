<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonalCirugiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personal_cirugias', function (Blueprint $table) {
            $table->bigIncrements('id_personal_cirugia');

            $table->string('id_empleado');
            $table->foreign('id_empleado')->references('id_empleado')->on('empleados');

            $table->unsignedBigInteger('id_historial_cirugia');
            $table->foreign('id_historial_cirugia')->references('id_historial_cirugia')->on('historial_cirugias');
            
            $table->string('rol_personal_medico', 150);
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
        Schema::dropIfExists('personal_cirugias');
    }
}
