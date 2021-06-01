<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    protected $table = 'citas';
    public $incrementing = false;
    protected $primarykey = 'id_cita';

    protected $fillable = ['id_cita', 'codigo_paciente', 'id_doctor', 'id_consultorio', 'fecha_cita', 'hora_cita', 'estado_cita'];
}
