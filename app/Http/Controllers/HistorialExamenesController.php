<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HistorialExamenesController extends Controller
{

  public function index($id_consulta, $id_hospitalizacion)
  {  
     $examenes_asignados = DB::select('select * from historial_examenes inner join atenciones_medicas on historial_examenes.id_atencion_medica=atenciones_medicas.id_atencion_medica
     inner join examenes on examenes.codigo_examen=historial_examenes.codigo_examen join tipo_examen on 
     tipo_examen.id_tipo_examen=examenes.id_tipo_examen
     where atenciones_medicas.id_hospitalizacion = ? or atenciones_medicas.id_consulta = ?', [$id_hospitalizacion, $id_consulta]);
    

     $data = [
       "examenes_asignados" => $examenes_asignados
     ];
     return response()->json($data);    
  }

    public function store(Request $request, $id_consulta, $id_hospitalizacion)
    {   

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
            DB::insert('insert into historial_examenes (id_atencion_medica, codigo_examen, created_at) 
                values (?, ?, current_date + current_time)', 
                [$id_atencion_medica, 
                $request->input_list[$i]['codigo_examen']
            ]);

            $codigo_examen = $request->input_list[$i]['codigo_examen'];
            $examen = DB::select('select * from examenes where codigo_examen = ?', [$codigo_examen]);
            $costo_examen = $examen[0]->costo;

          if($id_consulta !== 'null'){
            DB::update('update costo_servicios set costo_examenes = costo_examenes + ?, costo_total = costo_total + ? where id_consulta = ?', [$costo_examen, $costo_examen, $id_consulta]);
          }

          if($id_hospitalizacion !== 'null'){
            DB::update('update costo_servicios set costo_examenes = costo_examenes + ?, costo_total = costo_total + ? where id_hospitalizacion = ?', [$costo_examen, $costo_examen, $id_hospitalizacion]);
          } 
      
          }
      

        return response()->json('Examenes asignados!');   
    }

    public function archivo_resultado(Request $request, $id_atencion_medica)
    {
     
        //$url         = $request->file->
      
         $url = $request->file('file')->store('public');
      DB::update('update historial_examenes set archivo_resultado = ?
         where id_atencion_medica = ?', 
         [   
          $url,
             $id_atencion_medica
         ]);
    }
}
