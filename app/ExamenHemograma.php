<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExamenHemograma extends Model
{
    protected $table = 'examenes_hemogramas';
    public $incrementing = false;
    protected $primaryKey = 'codigo_hemograma';

    protected $fillable = ['codigo_hemograma', 'codigo_examen','parametro',
                    'unidad_de_medida','valor_min_mujeres','valor_max_mujeres',
                    'valor_min_hombres','valor_max_hombres','valor_resultado'];
}
