<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TratamientosMedicos extends JsonResource
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
            'codigo_tratamiento'=> $this->codigo_tratamiento,
            'nombre_tratamiento'=> $this->nombre_tratamiento,
            'id_tipo_tratamiento'=> $this->id_tipo_tratamiento,
            'descripcion_tratamiento'=> $this->descripcion_tratamiento,
            'costo_tratamiento'=> $this->costo_tratamiento,
        ];
    }
}
