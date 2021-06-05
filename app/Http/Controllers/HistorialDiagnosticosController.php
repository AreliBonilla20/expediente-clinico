<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HistorialDiagnosticosController extends Controller
{   
    public function index($id_consulta, $id_hospitalizacion)
    {  
       $historial_diagnosticos = DB::select('select * from historial_diagnosticos inner join atenciones_medicas on historial_diagnosticos.id_atencion_medica=atenciones_medicas.id_atencion_medica
       inner join diagnosticos on diagnosticos.codigo_diagnostico=historial_diagnosticos.codigo_diagnostico join tipo_diagnostico on 
       tipo_diagnostico.id_tipo_diagnostico=diagnosticos.id_tipo_diagnostico
       where atenciones_medicas.id_hospitalizacion = ? or atenciones_medicas.id_consulta = ?', [$id_hospitalizacion, $id_consulta]);
       return response()->json($historial_diagnosticos);    
    }

    public function store(Request $request, $id_consulta, $id_hospitalizacion)
    {   
        $estado_diagnostico = 'Vigente';

        $id_atencion_medica = '';
    
        if($id_consulta !== 'null'){

          $id_atencion_medica = app('App\Http\Controllers\FuncionesController')->codigo_atencion_medica(substr($id_consulta, 0, 7));
          
          DB::insert('insert into atenciones_medicas (id_atencion_medica, id_consulta, id_hospitalizacion, fecha_atencion_medica, hora_atencion_medica) 
                      values (?, ?, ?, current_date, current_time)', 
                      [$id_atencion_medica,
                      $id_consulta, 
                      null
          ]);
        }

        if($id_hospitalizacion !== 'null'){

          $id_atencion_medica = app('App\Http\Controllers\FuncionesController')->codigo_atencion_medica(substr($id_hospitalizacion, 0, 7));

          DB::insert('insert into atenciones_medicas (id_atencion_medica, id_consulta, id_hospitalizacion, fecha_atencion_medica, hora_atencion_medica) 
                      values (?, ?, ?, current_date, current_time)', 
                      [$id_atencion_medica,
                      null,
                      $id_hospitalizacion
          ]);
        } 

       
          for($i=0; $i<count($request->input_list); $i++){
            DB::insert('insert into historial_diagnosticos (id_atencion_medica, codigo_diagnostico, observaciones_diagnostico, indicaciones_diagnostico, estado_diagnostico, created_at) 
                values (?, ?, ?, ?, ?, current_date + current_time)', 
                [$id_atencion_medica, 
                $request->input_list[$i]['codigo_diagnostico'],
                $request->input_list[$i]['observaciones_diagnostico'],
                $request->input_list[$i]['indicaciones_diagnostico'],
                $estado_diagnostico
            ]);
      
          }
      

        return response()->json('Diagnósticos creados!');   
    }
}
