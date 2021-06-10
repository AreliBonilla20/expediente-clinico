<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id';

    protected $fillable = ['id', 'name', 'email', 'password', 'id_empleado', 'codigo_paciente'];
}
