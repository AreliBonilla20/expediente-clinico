<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Quirofano extends JsonResource
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
            'id_quirofano'=> $this->id_quirofano,
            'id_centro_medico'=> $this->id_centro_medico,
            'quirofano'=> $this->quirofano,
        ];
    }
}
