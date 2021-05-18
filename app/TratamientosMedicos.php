<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TratamientosMedicos extends Model
{
    protected $table = 'tratamientos_medicos';
    public $incrementing = false;
    protected $primarykey = 'codigo_tratamiento';

    protected $fillable = ['codigo_tratamiento', 'nombre_tratamiento', 'id_tipo_tratamiento', 'descripcion_tratamiento', 'costo_tratamiento'];
}
