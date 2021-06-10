<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios_roles', function (Blueprint $table) {
            $table->bigIncrements('id_usuario_rol');

            $table->string('id_rol');
            $table->foreign('id_rol')->references('id_rol')->on('roles');
            
            $table->bigInteger('id_usuario');
            $table->foreign('id_usuario')->references('id')->on('users');
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
        Schema::dropIfExists('usuarios_roles');
    }
}
