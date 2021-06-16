<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HistorialTratamientosController extends Controller
{
    public function index($id_consulta, $id_hospitalizacion)
    {  
       $historial_tratamientos_medicos = DB::select('select * from historial_tratamientos_medicos inner join atenciones_medicas on historial_tratamientos_medicos.id_atencion_medica=atenciones_medicas.id_atencion_medica
       inner join tratamientos_medicos on tratamientos_medicos.codigo_tratamiento=historial_tratamientos_medicos.codigo_tratamiento join tipo_tratamiento on 
       tipo_tratamiento.id_tipo_tratamiento=tratamientos_medicos.id_tipo_tratamiento
       where atenciones_medicas.id_consulta = ? or atenciones_medicas.id_hospitalizacion = ?', [$id_consulta, $id_hospitalizacion]);

       return response()->json($historial_tratamientos_medicos);    
    }

    public function store(Request $request, $id_consulta, $id_hospitalizacion)
    {   
        $id_atencion_medica = '';
        $estado_tratamiento = 'Vigente';
    
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
            DB::insert('insert into historial_tratamientos_medicos (id_atencion_medica, codigo_tratamiento, indicaciones_tratamiento, cantidad_tratamiento, estado_tratamiento, created_at) 
                values (?, ?, ?, ?, ?, current_date + current_time)', 
                [$id_atencion_medica, 
                $request->input_list[$i]['codigo_tratamiento'],
                $request->input_list[$i]['indicaciones_tratamiento'],
                $request->input_list[$i]['cantidad_tratamiento'],
                $estado_tratamiento
            ]);

              $codigo_tratamiento = $request->input_list[$i]['codigo_tratamiento'];
              $cantidad_tratamiento = $request->input_list[$i]['cantidad_tratamiento'];
              $tratamiento = DB::select('select * from tratamientos_medicos where codigo_tratamiento = ?', [$codigo_tratamiento]);
              $costo_tratamientos = $tratamiento[0]->costo_tratamiento * $cantidad_tratamiento;

            if($id_consulta !== 'null'){
              DB::update('update costo_servicios set costo_tratamientos = costo_tratamientos + ?, costo_total = costo_total + ? where id_consulta = ?', [$costo_tratamientos, $costo_tratamientos, $id_consulta]);
            }

            if($id_hospitalizacion !== 'null'){
              DB::update('update costo_servicios set costo_tratamientos = costo_tratamientos + ?, costo_total = costo_total + ? where id_hospitalizacion = ?', [$costo_tratamientos, $costo_tratamientos, $id_hospitalizacion]);
            } 
        }

        return response()->json($request);   
    }
}
