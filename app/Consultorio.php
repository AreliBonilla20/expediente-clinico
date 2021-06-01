<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Consultorio extends Model
{
    protected $table = 'consultorios';
    public $incrementing = false;
    protected $primarykey = 'id_consultorio';

    protected $fillable = ['id_consultorio', 'id_centro_medico', 'consultorio'];
}
