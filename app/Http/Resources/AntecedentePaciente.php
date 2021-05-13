<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AntecedentePaciente extends JsonResource
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
            'id_antecedentes_paciente'=> $this->id_antecedentes_paciente,
            'codigo_paciente'=> $this->codigo_paciente,
            'historial_enfermedades'=> $this->historial_enfermedades,
            'nombre_padre'=> $this->nombre_padre,
            'apellidos_padre'=> $this->apellidos_padre,
            'fecha_nacimiento_padre'=> $this->fecha_nacimiento_padre,
            'direccion_padre'=> $this->direccion_padre,
            'padecimientos_madre'=> $this->padecimientos_madre,
            'nombre_madre'=> $this->nombre_madre,
            'apellidos_madre'=> $this->apellidos_madre,
            'fecha_nacimiento_madre'=> $this->fecha_nacimiento_madre,
            'direccion_madre'=> $this->direccion_madre,
            'padecimientos_madre'=> $this->padecimientos_madre

        ];
    }
}
