<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Diagnostico extends Model
{   
    protected $table = 'diagnosticos';
    public $incrementing  = false;
    protected $primaryKey = 'codigo_diagnostico';

    protected $fillable = ['codigo_diagnostico', 'id_tipo_diagnostico', 'nombre_diagnostico', 'descripcion_diagnostico'];
}
