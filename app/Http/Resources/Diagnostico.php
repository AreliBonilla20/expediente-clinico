<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Diagnostico extends JsonResource
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
            'codigo_diagnostico'=> $this->codigo_diagnostico,
            'id_tipo_diagnostico'=> $this->id_tipo_diagnostico,
            'nombre_diagnostico'=> $this->nombre_diagnostico,
            'descripcion_diagnostico'=> $this->descripcion_diagnostico,
        ];
    }
}
