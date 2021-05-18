<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    protected $table = 'examenes';
    public $incrementing  = false;
    protected $primaryKey = 'codigo_examen';

    protected $fillable = ['codigo_examen', 'id_tipo_examen', 'nombre_examen', 'indicaciones_examen', 'costo'];
}
