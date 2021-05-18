<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Medicamento extends JsonResource
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
            'codigo_medicamento'=>$this->codigo_medicamento,
            'id_tipo_medicamento'=>$this->id_tipo_medicamento,
            'nombre_medicamento'=>$this->nombre_medicamento,
            'descripcion_medicamento'=>$this->descripcion_medicamento,
            'presentacion_medicamento'=>$this->presentacion_medicamento,
            'costo_medicamento'=>$this->costo_medicamento,
            'existencia_medicamento'=>$this->existencia_medicamento,
        ];
    }
}
