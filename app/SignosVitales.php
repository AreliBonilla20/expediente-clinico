<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SignosVitales extends Model
{
    protected $table = 'signos_vitales';
    
    protected $fillable = ['id_signos', 'id_atencion_medica', 'presion_arterial_sistolica', 
    'presion_arterial_diastolica','peso_paciente', 'estatura_paciente', 'temperatura_paciente',
    'ritmo_cardiaco_paciente', 'respiracion_paciente'];   
}
