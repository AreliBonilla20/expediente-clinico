<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Cirugia extends JsonResource
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
            'codigo_cirugia'=> $this->codigo_cirugia,
            'nombre_cirugia'=> $this->nombre_cirugia,
            'descripcion_cirugia'=> $this->descripcion_cirugia,
            'costo_cirugia'=> $this->costo_cirugia
        ];
    }
}
