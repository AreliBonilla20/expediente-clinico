<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    public $incrementing  = false;
    protected $primaryKey = 'codigo';
    
    protected $fillable = ['codigo', 'nombres', 'apellidos', 'identificacion',
    'fecha_nacimiento', 'direccion', 'telefono', 'correo', 'estado_civil', 'nombre_conyugue', 'apellido_conyugue',
    'nombre_contacto_emergencia', 'telefono_contacto_emergencia', 'id_genero', 'id_pais', 'id_departamento', 'id_municipio'];
}
