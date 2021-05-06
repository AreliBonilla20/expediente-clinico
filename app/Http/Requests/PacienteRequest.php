<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PacienteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nombres' => 'required|string|max:150',
            'apellidos' => 'required|string|max:150',
        ];
    }

    public function messages()
    {
        return [
             'nombres.required' => 'El nombre del paciente es obligatorio',
             'nombres.string' => 'Los caracteres deben ser solamente letras',
             'nombres.max' => 'El máximo de caracteres es 150',

             'apellidos.required' => 'El nombre del paciente es obligatorio',
             'apellidos.string' => 'Los caracteres deben ser solamente letras',
             'apellidos.max' => 'El máximo de caracteres es 150',


        ];
    }
}
