<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChequeoHospitalizacion extends Model
{
    protected $table = 'chequeos_hospitalizaciones';
    
    protected $fillable = ['id_chequeo_hospitalizacion', 'id_hospitalizacion', 'observacion_chequeo', 'fecha_chequeo', 'hora_chequeo'];
}
