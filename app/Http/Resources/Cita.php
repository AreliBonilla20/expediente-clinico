<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Cita extends JsonResource
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
            'id_cita'=> $this->id_cita,
            'codigo_paciente'=> $this->codigo_paciente,
            'id_doctor'=>$this->id_doctor,
            'id_consultorio'=>$this->id_consultorio,
            'fecha_cita'=> $this->fecha_cita,
            'hora_cita'=>$this->hora_cita,
            'estado_cita'=>$this->estado_cita
        ];
    }
}
