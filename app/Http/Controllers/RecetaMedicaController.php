<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RecetaMedicaController extends Controller
{   
    
    public function index($id_hospitalizacion)
    {  
       $recetas = DB::select('select * from recetas inner join atenciones_medicas on atenciones_medicas.id_atencion_medica = recetas.id_atencion_medica
       inner join medicamentos on medicamentos.codigo_medicamento = recetas.codigo_medicamento inner join tipo_medicamento on tipo_medicamento.id_tipo_medicamento = medicamentos.id_tipo_medicamento
       where id_hospitalizacion = ?', [$id_hospitalizacion]);
       return response()->json($recetas);   
    }


    public function store(Request $request, $id_hospitalizacion)
    {   
        $id_atencion_medica = app('App\Http\Controllers\FuncionesController')->codigo_atencion_medica($id_hospitalizacion);

        DB::insert('insert into atenciones_medicas (id_atencion_medica, id_consulta, id_hospitalizacion, fecha_atencion_medica, hora_atencion_medica) 
                values (?, ?, ?, current_date, current_time)', 
                [$id_atencion_medica, 
                 null,
                 $id_hospitalizacion,
                ]);

       for($i=0; $i<count($request->inputList); $i++){
            DB::insert('insert into recetas (id_atencion_medica, codigo_medicamento, dosis_medicamento, indicaciones_medicamento, created_at) 
                values (?, ?, ?, ?, current_date + current_time)', 
                [$id_atencion_medica, 
                $request->inputList[$i]['codigo_medicamento'],
                $request->inputList[$i]['dosis_medicamento'],
                $request->inputList[$i]['indicaciones_medicamento']
            ]);
       }
      
    }
}
