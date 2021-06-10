<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChequeoHospitalizacion extends JsonResource
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
            'id_chequeo_hospitalizacion'=> $this->id_chequeo_hospitalizacion,
            'id_hospitalizacion'=> $this->id_hospitalizacion,
            'observacion_chequeo'=> $this->observacion_chequeo,
            'sintomas_chequeo'=> $this->sintomas_chequeo,
            'fecha_chequeo'=> $this->fecha_chequeo,
            'hora_chequeo'=> $this->hora_chequeo
        ];
    }
}
