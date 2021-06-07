<?php

namespace App\Http\Controllers;

use App\Examen;
use App\Http\Resources\Examen as ExamenResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExamenController extends Controller
{
    public function index()
    {  
       $examenes = DB::select('select * from examenes order by codigo_examen');
       return ExamenResource::collection($examenes);
      
    }

    public function create()
    {
        $tipos_examenes = DB::select('select * from tipo_examen order by nombre_tipo_examen asc');
        
        $data = [
            "tipos_examenes" => $tipos_examenes,
        ];

        return response()->json($data);    
    }

    public function store(Request $request)
    {   

        DB::insert('insert into examenes (codigo_examen, id_tipo_examen, nombre_examen, indicaciones_examen, costo, created_at) 
                    values (?, ?, ?, ?, ?, current_date + current_time)', 
                    [$request->codigo_examen,
                     $request->id_tipo_examen,
                     $request->nombre_examen,
                     $request->indicaciones_examen, 
                     round($request->costo, 2)
                    ]);
        
        return response()->json('Examen creado!');    
    }

    public function edit($codigo)
    {
        $examen_editar = DB::select('select * from examenes where codigo_examen = ?', [$codigo]); 

        return response()->json($examen_editar[0]);    
    }
    
    public function show($codigo)
    {
        $examen_ver = DB::select('select * from examenes inner join tipo_examen on tipo_examen.id_tipo_examen=examenes.id_tipo_examen where codigo_examen = ?', [$codigo]); 

        return response()->json($examen_ver[0]);    
    }

    public function update(Request $request, $codigo)
    {
        
        DB::update('update examenes set codigo_examen = ?, id_tipo_examen = ?, nombre_examen = ?, indicaciones_examen = ?, costo = ?, updated_at = current_date + current_time
        where codigo_examen = ?', 
        [$request->codigo_examen,
         $request->id_tipo_examen,
         $request->nombre_examen,
         $request->indicaciones_examen, 
         round($request->costo, 2), 
         $codigo
        ]);
        
        return response()->json('Examen actualizado!');    
    }

    public function buscar($param_busqueda)
    {

        $param_busqueda = app('App\Http\Controllers\FuncionesController')->acentos($param_busqueda);
        $codigo_examen = '%'.$param_busqueda.'%';
        $nombre_examen = '%'.$param_busqueda.'%';
       
        $examenes = DB::select('select * from examenes where UNACCENT(lower(codigo_examen)) LIKE ? or UNACCENT(lower(nombre_examen)) LIKE ?', 
        [strtolower($codigo_examen), strtolower($nombre_examen)]);
        
        return ExamenResource::collection($examenes);

    }

    public function agregar_parametros(Request $request, $codigo)
    {
        
        for($i=0; $i<count($request->input_list); $i++){
            DB::insert('insert into examenes_parametros (codigo_examen, parametro, unidad_medida, valor_min, valor_max, created_at) 
                values (?, ?, ?, ?, ?, current_date + current_time)', 
                [$codigo,
                $request->input_list[$i]['parametro'],
                $request->input_list[$i]['unidad_medida'],
                $request->input_list[$i]['valor_min'],
                $request->input_list[$i]['valor_max']
            ]);
      
          }
        
        
        return response()->json('Parámetros ingresados!');    
    }

    
    public function ver_parametros_examen($codigo)
    {
        
        $parametros_examen = DB::select('select * from examenes_parametros where codigo_examen = ? order by parametro', [$codigo]);
        
        return response()->json($parametros_examen);    
    }
}
