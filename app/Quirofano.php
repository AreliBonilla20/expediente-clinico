<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quirofano extends Model
{
    protected $table = 'quirofanos';
    public $incrementing  = false;
    protected $primaryKey = 'id_quirofano';

    protected $fillable = ['id_quirofano', 'id_centro_medico', 'quirofano'];

}
