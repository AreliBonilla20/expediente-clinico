<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HistorialTratamientosController extends Controller
{
    public function index($id_hospitalizacion)
    {  
       $historial_tratamientos_medicos = DB::select('select * from historial_tratamientos_medicos inner join atenciones_medicas on historial_tratamientos_medicos.id_atencion_medica=atenciones_medicas.id_atencion_medica
       inner join tratamientos_medicos on tratamientos_medicos.codigo_tratamiento=historial_tratamientos_medicos.codigo_tratamiento join tipo_tratamiento on 
       tipo_tratamiento.id_tipo_tratamiento=tratamientos_medicos.id_tipo_tratamiento
       where atenciones_medicas.id_hospitalizacion = ?', [$id_hospitalizacion]);
       return response()->json($historial_tratamientos_medicos);    
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
            DB::insert('insert into historial_tratamientos_medicos (id_atencion_medica, codigo_tratamiento, indicaciones_tratamiento, created_at) 
                values (?, ?, ?, ?, current_date + current_time)', 
                [$id_atencion_medica, 
                $request->inputList[$i]['codigo_tratamiento'],
                $request->inputList[$i]['indicaciones_tratamiento']
            ]);
        }

    

        return response()->json($request);   
    }
}
