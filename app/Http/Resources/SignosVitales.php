<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SignosVitales extends JsonResource
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
            'id_signos'=>$this->id_signos,
            'id_atencion_medica'=>$this->id_atencion_medica,
            'presion_arterial_sistolica'=>$this->presion_arterial_sistolica,
            'presion_arterial_diastolica'=>$this->presion_arterial_diastolica,
            'estatura_paciente'=>$this->estatura_paciente,
            'peso_paciente'=>$this->peso_paciente,
            'temperatura_paciente'=>$this->temperatura_paciente,
            'ritmo_cardiaco_paciente'=>$this->ritmo_cardiaco_paciente,
            'respiracion_paciente'=>$this->respiracion_paciente,
        ];
    }
}
