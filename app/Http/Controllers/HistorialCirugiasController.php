<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HistorialCirugiasController extends Controller
{   
    public function index($id_consulta, $id_hospitalizacion)
    {  
       $historial_cirugias = DB::select('select * from historial_cirugias inner join atenciones_medicas on historial_cirugias.id_atencion_medica=atenciones_medicas.id_atencion_medica
       inner join cirugias on cirugias.codigo_cirugia=historial_cirugias.codigo_cirugia 
       inner join quirofanos on quirofanos.id_quirofano = historial_cirugias.id_quirofano
       where atenciones_medicas.id_hospitalizacion = ? or atenciones_medicas.id_consulta = ?', [$id_hospitalizacion, $id_consulta]);
       return response()->json($historial_cirugias);    
    }

    public function create($id_consulta, $id_hospitalizacion)
    {
        $cirugias = DB::select('select * from cirugias order by nombre_cirugia');
        $quirofanos = DB::select('select * from quirofanos order by quirofano');

        $data = [
            "cirugias" => $cirugias,
            "quirofanos" => $quirofanos
        ];

        return response()->json($data);
    }


    public function store(Request $request, $id_consulta, $id_hospitalizacion)
    {   
        $estado_cirugia = 'Asignada';

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

         
            DB::insert('insert into historial_cirugias (id_atencion_medica, codigo_cirugia, id_quirofano, hora_cirugia, estado_cirugia, created_at) 
                values (?, ?, ?, ?, ?, current_date + current_time)', 
                [$id_atencion_medica, 
                $request->codigo_cirugia,
                $request->id_quirofano,
                $request->hora_cirugia,
                $estado_cirugia
            ]);
           
    }

}
