<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medicamento extends Model
{
    protected $table = 'medicamentos';
    public $incrementing = false;
    protected $primaryKey = 'codigo_medicamento';

    protected $fillable = ['codigo_medicamento', 'id_tipo_medicamento','nombre_medicamento',
                    'descripcion_medicamento','presentacion_medicamento','costo_medicamento',
                    'existencia_medicamento'];
}
