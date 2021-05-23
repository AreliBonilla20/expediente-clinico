<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    protected $table = 'empleados';
    public $incrementing  = false;
    protected $primaryKey = 'id_empleado';

    protected $fillable = ['id_empleado', 'id_genero', 'id_tipo_personal', 'id_centro_medico', 'id_pais', 'id_departamento', 'id_municipio', 
    'nombre_empleado', 'apellido_empleado', 'identificacion_empleado', 'fecha_nacimiento_empleado', 'direccion_empleado', 'telefono_empleado', 
    'correo_empleado', 'cargo_empleado'];
}
