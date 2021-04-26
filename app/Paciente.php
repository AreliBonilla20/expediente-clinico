<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    
    protected $primaryKey = 'id';


    protected $fillable = ['id', 'nombres_estudiante', 'apellidos_estudiante'];

    public function getRouteKeyName()
    {
        return 'id';
    }

}
