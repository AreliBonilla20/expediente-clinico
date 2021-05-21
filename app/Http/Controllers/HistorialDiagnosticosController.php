<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HistorialDiagnosticosController extends Controller
{   
    public function index($id_hospitalizacion)
    {  
       $historial_diagnosticos = DB::select('select * from historial_diagnosticos inner join atenciones_medicas on historial_diagnosticos.id_atencion_medica=atenciones_medicas.id_atencion_medica
       inner join diagnosticos on diagnosticos.codigo_diagnostico=historial_diagnosticos.codigo_diagnostico');
       return response()->json($historial_diagnosticos);    
    }

    public function store(Request $request)
    {   
        $id_atencion_medica = app('App\Http\Controllers\FuncionesController')->codigo_atencion_medica($request);
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');
        DB::insert('insert into atenciones_medicas (id_atencion_medica, id_consulta, id_hospitalizacion, fecha_atencion_medica, hora_atencion_medica, created_at) 
                    values (?, ?, ?, ?, ?, ?)', 
                    [$id_atencion_medica, 
                     null,
                     $request->id_hospitalizacion,
                     $request->fecha_atencion_medica, 
                     $request->hora_atencion_medica, 
                     $fecha_actual
                    ]);

       DB::insert('insert into historial_diagnosticos (id_atencion_medica, codigo_diagnostico, observaciones_diagnostico, indicaciones_diagnostico, created_at) 
                    values (?, ?, ?, ?, ?)', 
                    [$id_atencion_medica, 
                        $request->codigo_diagnostico,
                        $request->observaciones_diagnostico,
                        $request->indicaciones_diagnostico,
                        $fecha_actual
                    ]);

                    return response()->json($request);   
    }
}
