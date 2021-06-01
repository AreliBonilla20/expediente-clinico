<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExamenHemograma extends JsonResource
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
            'codigo_hemograma'=>$this->codigo_hemograma,
            'codigo_examen'=>$this->codigo_examen,
            'parametro'=>$this->parametro,
            'unidad_de_medida'=>$this->unidad_de_medida,
            'valor_min_mujeres'=>$this->valor_min_mujeres,
            'valor_max_mujeres'=>$this->valor_max_mujeres,
            'valor_min_hombres'=>$this->valor_min_hombres,
            'valor_max_hombres'=>$this->valor_max_hombres,
            'valor_resultado'=>$this->valor_resultado,
        ];
    }
}
