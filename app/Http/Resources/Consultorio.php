<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Consultorio extends JsonResource
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
            'id_consultorio'=> $this->id_consultorio,
            'id_centro_medico'=> $this->id_centro_medico,
            'consultorio'=>$this->consultorio,
        ];
    }
}
