<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Paciente extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
       return[
        'codigo'=> $this->codigo,
        'nombres'=> $this->nombres,
        'apellidos'=> $this->apellidos,
        'identificacion'=> $this->identificacion,
        'fecha_nacimiento'=> $this->fecha_nacimiento,
        'direccion'=> $this->direccion,
        'telefono'=> $this->telefono,
        'correo'=> $this->correo,
        'estado_civil'=> $this->estado_civil,
        'nombre_conyugue'=> $this->nombre_conyugue,
        'apellido_conyugue'=> $this->apellido_conyugue,
        'nombre_contacto_emergencia'=> $this->nombre_contacto_emergencia,
        'telefono_contacto_emergencia'=> $this->telefono_contacto_emergencia,
        'estado_paciente'=> $this->estado_paciente,
        'id_genero'=> $this->id_genero,
        'id_pais'=> $this->id_pais,
        'id_municipio'=> $this->id_municipio,
        'id_departamento'=> $this->id_departamento,
       ];
    }
}
