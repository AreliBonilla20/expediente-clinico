<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExamenesResultadoController extends Controller
{
    public function create($id_atencion_medica)
    {
        $parametros_examen = DB::select('select * from historial_examenes inner join examenes on historial_examenes.codigo_examen = examenes.codigo_examen
        inner join examenes_parametros on examenes_parametros.codigo_examen = examenes.codigo_examen where id_atencion_medica = ?', [$id_atencion_medica]);
        
        return response()->json($parametros_examen);
    }

    
    public function store(Request $request, $id_atencion_medica)
    {
    
        $parametros_examen = DB::select('select * from historial_examenes inner join examenes on historial_examenes.codigo_examen = examenes.codigo_examen
        inner join examenes_parametros on examenes_parametros.codigo_examen = examenes.codigo_examen where id_atencion_medica = ?', [$id_atencion_medica]);

        for($i=0; $i<count($parametros_examen); $i++){
        DB::insert('insert into examenes_resultado (id_atencion_medica, parametro, resultado, created_at) 
        values (?, ?, ?, current_date + current_time )', 
        [   
            $id_atencion_medica,
            $parametros_examen[$i]->parametro,
            $request->resultado_parametros[$i]
        ]);
        }

        return response()->json("Resultados registrados");    
   }

  

   
   public function examen_resultado($id_atencion_medica)
   {
       $resultados = DB::select('select * from examenes_resultado where id_atencion_medica = ?', [$id_atencion_medica]);
       
       return response()->json($resultados);
   }
}
