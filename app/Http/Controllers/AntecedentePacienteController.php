<?php

namespace App\Http\Controllers;

use App\AntecedentePaciente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AntecedentePacienteController extends Controller
{

   
    public function store(Request $request, $codigo)
    {
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');

        DB::insert('insert into antecedentes_pacientes (codigo_paciente, historial_enfermedades, nombre_padre, apellidos_padre, fecha_nacimiento_padre, direccion_padre, padecimientos_padre,
                    nombre_madre, apellidos_madre, fecha_nacimiento_madre, direccion_madre, padecimientos_madre, padecimientos_familiares, created_at) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [$codigo,
                     $request->historial_enfermedades,
                     $request->nombre_padre,
                     $request->apellidos_padre,
                     $request->fecha_nacimiento_padre,
                     $request->direccion_padre, 
                     $request->padecimientos_padre, 
                     $request->nombre_madre,
                     $request->apellidos_madre,
                     $request->fecha_nacimiento_madre,
                     $request->direccion_madre, 
                     $request->padecimientos_madre,
                     $request->padecimientos_familiares,
                     $fecha_actual
                    ]);
        /*
        DB::table('antecendentes_pacientes')->insert(
            [
             'codigo_paciente' => $codigo,
             'historial_enfermedades' => $request->historial_enfermedades,
             'nombre_padre' => $request->nombre_padre,
             'apellidos_padre' => $request->apellidos_padre,
             'fecha_nacimiento_padre' => $request->fecha_nacimiento_padre,
             'direccion_padre' => $request->direccion_padre,
             'padecimientos_padre' => $request->padecimientos_padre,
             'nombre_madre' => $request->nombre_madre,
             'apellidos_madre' => $request->apellidos_madre,
             'fecha_nacimiento_madre' => $request->fecha_nacimiento_madre,
             'direccion_madre' => $request->direccion_madre,
             'padecimientos_madre' => $request->padecimientos_madre,
             'padecimientos_familiares' => $request->padecimientos_familiares
             ]
        );*/
        
        return response()->json('Antecedentes creados!');
    }

   
    public function show($codigo)
    {
        $antecedente_paciente = DB::select('select * from antecedentes_pacientes where codigo_paciente = ?', [$codigo]);

        return response()->json($antecedente_paciente[0]);

    }

    public function edit($codigo)
    {
        $antecedente_paciente = DB::select('select * from antecedentes_pacientes where codigo_paciente = ?', [$codigo]);

        return response()->json($antecedente_paciente[0]);
    }

   
    public function update(Request $request, $codigo)
    {
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');
        
        DB::update('update antecedentes_pacientes set historial_enfermedades = ?, nombre_padre = ?, apellidos_padre = ?, fecha_nacimiento_padre = ?, direccion_padre = ?, padecimientos_padre = ?,
                    nombre_madre = ?, apellidos_madre = ?, fecha_nacimiento_madre = ?, direccion_madre = ?, padecimientos_madre = ?, padecimientos_familiares = ?, updated_at = ?
                    where codigo_paciente = ?', 
                    [
                     $request->historial_enfermedades,
                     $request->nombre_padre,
                     $request->apellidos_padre,
                     $request->fecha_nacimiento_padre,
                     $request->direccion_padre, 
                     $request->padecimientos_padre, 
                     $request->nombre_madre,
                     $request->apellidos_madre,
                     $request->fecha_nacimiento_madre,
                     $request->direccion_madre, 
                     $request->padecimientos_madre,
                     $request->padecimientos_familiares,
                     $fecha_actual,
                     $codigo
                    ]);

       /* DB::table('antecendentes_pacientes')->where('codigo_paciente', $codigo)->update(array
        (
             'historial_enfermedades' => $request->historial_enfermedades,
             'nombre_padre' => $request->nombre_padre,
             'apellidos_padre' => $request->apellidos_padre,
             'fecha_nacimiento_padre' => $request->fecha_nacimiento_padre,
             'direccion_padre' => $request->direccion_padre,
             'padecimientos_padre' => $request->padecimientos_padre,
             'nombre_madre' => $request->nombre_madre,
             'apellidos_madre' => $request->apellidos_madre,
             'fecha_nacimiento_madre' => $request->fecha_nacimiento_madre,
             'direccion_madre' => $request->direccion_madre,
             'padecimientos_madre' => $request->padecimientos_madre,
             'padecimientos_familiares' => $request->padecimientos_familiares
        )
       );*/

       return response()->json('Antecedentes actualizados!');    
    }

    
    
}
