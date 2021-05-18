<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Hospitalizacion extends JsonResource
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
            'id_hospitalizacion'=> $this->id_hospitalizacion,
            'codigo_paciente'=> $this->codigo_paciente,
            'fecha_ingreso'=> $this->fecha_ingreso,
            'hora_ingreso'=> $this->hora_ingreso,
            'motivo_ingreso'=> $this->motivo_ingreso,
            'sala'=> $this->sala,
            'camilla'=> $this->camilla,
            'estado_paciente'=> $this->estado_paciente,
            'dias_ingreso'=> $this->dias_ingreso,
            'fecha_alta'=> $this->fecha_alta,
            'costo'=> $this->costo,
        ];
    }
}
