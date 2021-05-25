<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HistorialDiagnosticosController extends Controller
{   
    public function index($id_hospitalizacion)
    {  
       $historial_diagnosticos = DB::select('select * from historial_diagnosticos inner join atenciones_medicas on historial_diagnosticos.id_atencion_medica=atenciones_medicas.id_atencion_medica
       inner join diagnosticos on diagnosticos.codigo_diagnostico=historial_diagnosticos.codigo_diagnostico join tipo_diagnostico on 
       tipo_diagnostico.id_tipo_diagnostico=diagnosticos.id_tipo_diagnostico
       where atenciones_medicas.id_hospitalizacion = ?', [$id_hospitalizacion]);
       return response()->json($historial_diagnosticos);    
    }

    public function store(Request $request, $id_hospitalizacion)
    {   
        $id_atencion_medica = app('App\Http\Controllers\FuncionesController')->codigo_atencion_medica($id_hospitalizacion);
  
        DB::insert('insert into atenciones_medicas (id_atencion_medica, id_consulta, id_hospitalizacion, fecha_atencion_medica, hora_atencion_medica) 
                    values (?, ?, ?, current_date, current_time)', 
                    [$id_atencion_medica, 
                     null,
                     $id_hospitalizacion
                    ]);


        for($i=0; $i<count($request->inputList); $i++){
            DB::insert('insert into historial_diagnosticos (id_atencion_medica, codigo_diagnostico, observaciones_diagnostico, indicaciones_diagnostico, created_at) 
                values (?, ?, ?, ?, current_date + current_time)', 
                [$id_atencion_medica, 
                $request->inputList[$i]['codigo_diagnostico'],
                $request->inputList[$i]['observaciones_diagnostico'],
                $request->inputList[$i]['indicaciones_diagnostico']
            ]);
        }

    

        return response()->json($request);   
    }
}
