<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CentroMedico extends JsonResource
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
        'id_centro_medico'=> $this->id_centro_medico,
        'nombre_centro_medico'=> $this->nombre_centro_medico,
        'direccion_centro_medico'=> $this->direccion_centro_medico,
        'director'=> $this->director,
        'telefono_director'=> $this->telefono_director,
        'correo_director'=> $this->correo_director,
        'telefono1_centro_medico'=> $this->telefono1_centro_medico,
        'telefono2_centro_medico'=> $this->telefono2_centro_medico,
        'correo_centro_medico'=> $this->correo_centro_medico,
        'tiempo_consulta_medica'=> $this->tiempo_consulta_medica,
        'id_tipo_centro_medico'=> $this->id_tipo_centro_medico,
        'id_pais'=> $this->id_pais,
        'id_municipio'=> $this->id_municipio,
        'id_departamento'=> $this->id_departamento,
        ];
    }
}
