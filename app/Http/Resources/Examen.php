<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Examen extends JsonResource
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
            'codigo_examen'=> $this->codigo_examen,
            'id_tipo_examen'=> $this->id_tipo_examen,
            'nombre_examen'=> $this->nombre_examen,
            'indicaciones_examen'=> $this->indicaciones_examen,
            'costo'=> $this->costo, 
        ];
    }
}
 