<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Usuario extends JsonResource
{
    
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'email'=>$this->email,
            'password'=>$this->password,
            'id_empleado'=>$this->id_empleado,
            'codigo_paciente'=>$this->codigo_paciente,
        ];
    }
}
