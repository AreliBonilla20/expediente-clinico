<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    
    protected $primaryKey = 'codigo';


    protected $fillable = ['codigo', 'nombres_estudiante', 'apellidos_estudiante'];

   

}
