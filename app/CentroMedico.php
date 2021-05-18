<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CentroMedico extends Model
{
    protected $table = 'centros_medicos';
    public $incrementing  = false;
    protected $primaryKey = 'id_centro_medico';
    
    protected $fillable = ['id_centro_medico', 'nombre_centro_medico', 'direccion_centro_medico', 'director', 'telefono_director', 'correo_director',
    'telefono1_centro_medico', 'telefono2_centro_medico', 'correo_centro_medico', 'tiempo_consulta_medica', 'id_tipo_centro_medico', 
    'id_pais', 'id_departamento', 'id_municipio'];
}
