<?php

namespace App\Http\Controllers;

use App\Paciente;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    public function index()
    {
        $pacientes = Paciente::all();
        return response()->json($pacientes);    
    }

    public function show($id)
    {
        $paciente = Paciente::findOrFail($id);

        return response()->json($paciente);    
    }

    public function create(Request $request)
    {
        $paciente = new Paciente();
        $paciente->nombres_paciente = $request->nombres_paciente;
        $paciente->apellidos_paciente = $request->apellidos_paciente;
        $paciente->save();
        
        return response()->json($paciente);    
    }

    public function edit($id)
    {
        $paciente_editar = Paciente::findOrFail($id);

        return response()->json($paciente_editar);    
    }

    public function update(Request $request)
    {
        $paciente_actualizar = new Paciente();
        $paciente_actualizar->nombres_paciente = $request->nombres_paciente;
        $paciente_actualizar->apellidos_paciente = $request->apellidos_paciente;
        $paciente_actualizar->save();

        return response()->json($paciente_actualizar);    
    }

    public function delete($id)
    {
        $paciente_eliminar = Paciente::findOrFail($id);
        $paciente_eliminar->delete();

        return response()->json($paciente_eliminar);    
    }
}
