<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RecetaMedicaController extends Controller
{   
    
    public function index($id_consulta, $id_hospitalizacion)
    {  
       $recetas = DB::select('select * from recetas inner join atenciones_medicas on atenciones_medicas.id_atencion_medica = recetas.id_atencion_medica
       inner join medicamentos on medicamentos.codigo_medicamento = recetas.codigo_medicamento inner join tipo_medicamento on tipo_medicamento.id_tipo_medicamento = medicamentos.id_tipo_medicamento
       where atenciones_medicas.id_consulta = ? or atenciones_medicas.id_hospitalizacion = ?', [$id_consulta, $id_hospitalizacion]);
       return response()->json($recetas);   
    }


    public function store(Request $request, $id_consulta, $id_hospitalizacion)
    {   
        $id_atencion_medica = '';
        $estado_medicamento = 'Vigente';
    
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
            DB::insert('insert into recetas (id_atencion_medica, codigo_medicamento, dosis_medicamento, indicaciones_medicamento, cantidad_medicamento, estado_medicamento, created_at) 
                values (?, ?, ?, ?, ?, ?, current_date + current_time)', 
                [$id_atencion_medica, 
                $request->input_list[$i]['codigo_medicamento'],
                $request->input_list[$i]['dosis_medicamento'],
                $request->input_list[$i]['indicaciones_medicamento'],
                $request->input_list[$i]['cantidad_medicamento'],
                $estado_medicamento
            ]);

              $codigo_medicamento = $request->input_list[$i]['codigo_medicamento'];
              $cantidad_medicamento = $request->input_list[$i]['cantidad_medicamento'];
              $medicamento = DB::select('select * from medicamentos where codigo_medicamento = ?', [$codigo_medicamento]);
              $costo_medicamentos = $medicamento[0]->costo_medicamento * $cantidad_medicamento;

            if($id_consulta !== 'null'){
              DB::update('update costo_servicios set costo_medicamentos = costo_medicamentos + ?, costo_total = costo_total + costo_medicamentos where id_consulta = ?', [$costo_medicamentos, $id_consulta]);
            }

            if($id_hospitalizacion !== 'null'){
              DB::update('update costo_servicios set costo_medicamentos = costo_medicamentos + ?, costo_total = costo_total + costo_medicamentos where id_hospitalizacion = ?', [$costo_medicamentos, $id_hospitalizacion]);
            } 

        }
      
    }
}
