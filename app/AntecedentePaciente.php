<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AntecedentePaciente extends Model
{
    protected $table = 'antecedentes_pacientes';
    
    protected $fillable = ['id_antecedentes_paciente', 'codigo_paciente', 'historial_enfermedades', 
    'nombre_padre','apellidos_padre', 'fecha_nacimiento_padre', 'direccion_padre', 'padecimientos_padre',
    'nombre_madre','apellidos_madre', 'fecha_nacimiento_madre', 'direccion_madre', 'padecimientos_madre', 
    'padecimientos_familiares'];   
];
}
