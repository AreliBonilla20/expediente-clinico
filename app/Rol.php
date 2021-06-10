<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    public function permissions()
    {
        return $this->belongsToMany(Permiso::class,'rol_permiso');
    }
}
