<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Empleado extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id_empleado'=> $this->id_empleado,
            'id_genero'=> $this->id_genero,
            'id_tipo_personal'=> $this->id_tipo_personal,
            'id_centro_medico'=> $this->id_centro_medico,
            'id_pais'=> $this->id_pais,
            'id_departamento'=> $this->id_departamento,
            'id_municipio'=> $this->id_municipio,
            'nombre_empleado'=> $this->nombre_empleado,
            'apellido_empleado'=> $this->apellido_empleado,
            'identificacion_empleado'=> $this->identificacion_empleado,
            'fecha_nacimiento_empleado'=> $this->fecha_nacimiento_empleado,
            'direccion_empleado'=> $this->direccion_empleado,
            'telefono_empleado'=> $this->telefono_empleado,
            'correo_empleado'=> $this->correo_empleado
        ];
    }
}
