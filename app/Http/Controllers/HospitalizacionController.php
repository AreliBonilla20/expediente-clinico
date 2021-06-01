<?php

namespace App\Http\Controllers;

use App\Hospitalizacion;
use Illuminate\Http\Request;
use App\Http\Resources\Hospitalizacion as HospitalizacionResource;
use Illuminate\Support\Facades\DB;

class HospitalizacionController extends Controller
{
    public function index()
    {  
       $hospitalizacion = DB::select('select * from hospitalizaciones order by created_at desc');
       return HospitalizacionResource::collection($hospitalizacion);
    }


    public function store(Request $request, $codigo)
    {   
        $codigo_calculado = $this->get_codigo($codigo);
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');

        DB::insert('insert into hospitalizaciones (id_hospitalizacion, codigo_paciente, fecha_ingreso, hora_ingreso, motivo_ingreso, sala, camilla,
        estado_paciente, created_at) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [$codigo_calculado,
                     $codigo,
                     $request->fecha_ingreso,
                     $request->hora_ingreso,
                     $request->motivo_ingreso,
                     $request->sala, 
                     $request->camilla, 
                     $request->estado_paciente,
                     $fecha_actual
                    ]);
        
        return response()->json('Hospitalización creada!');    
    }

    
    public function edit($id_hospitalizacion)
    {
        $hospitalizacion_editar = DB::select('select * from hospitalizaciones where id_hospitalizacion = ?', [$id_hospitalizacion]); 

        return response()->json($hospitalizacion_editar[0]);    
    }

    public function show($id_hospitalizacion)
    {
        $hospitalizacion_ver = DB::select('select * from hospitalizaciones where id_hospitalizacion = ?', [$id_hospitalizacion]); 

        return response()->json($hospitalizacion_ver[0]);    
    }


    public function update(Request $request, $id_hospitalizacion)
    {
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');

        if($request->alta_paciente){
            $fecha_alta = 'current_date';
        }
        
        DB::update('update hospitalizaciones set fecha_ingreso = ?, hora_ingreso = ?, motivo_ingreso = ?, sala = ?, camilla = ?,
                    dias_ingreso = ?, fecha_alta = ?, costo = ?, updated_at = ?
                    where id_hospitalizacion = ?', 
                    [
                    $request->fecha_ingreso,
                    $request->hora_ingreso,
                    $request->motivo_ingreso,
                    $request->sala, 
                    $request->camilla, 
                    $request->dias_ingreso, 
                    $request->fecha_alta, 
                    $request->costo, 
                    $fecha_actual,
                    $id_hospitalizacion
                    ]);

        return response()->json('Hospitalización actualizada!');    
    }


    public function get_codigo($codigo)
    {
        $hospitalizaciones = DB::select('select* from hospitalizaciones where codigo_paciente = ?', [$codigo]);

        if(count($hospitalizaciones)>0)
        {
            foreach($hospitalizaciones as $hospitalizacion)
            {
                $correlativo = (int) substr($hospitalizacion->id_hospitalizacion, 9, 10) + 1;
                $id_hosp = $codigo.'H'.(string) $correlativo;

            }   
        }
        else {
            $id_hosp = $codigo.'H1';
        }
        
        return $id_hosp;
    }
}
