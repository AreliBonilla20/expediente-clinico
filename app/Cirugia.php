<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cirugia extends Model
{
    protected $table = 'cirugias';
    public $incrementing = false;
    protected $primarykey = 'codigo_cirugia';

    protected $fillable = ['codigo_cirugia', 'nombre_cirugia', 'descripcion_cirugia', 'costo_cirugia'];
}
