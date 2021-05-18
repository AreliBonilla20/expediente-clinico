<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hospitalizacion extends Model
{   
    protected $table = 'hospitalizaciones';
    public $incrementing  = false;
    protected $primaryKey = 'id_hospitalizacion';
    
    protected $fillable = ['id_hospitalizacion', 'codigo_paciente', 'fecha_ingreso', 'hora_ingreso', 'motivo_ingreso',
    'sala', 'camilla', 'estado_paciente', 'dias_ingreso', 'fecha_alta', 'costo'];
}
