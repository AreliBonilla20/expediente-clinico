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
       $examenes = DB::select('select * from index_examen');
       return ExamenResource::collection($examenes);
      
    }

    public function create()
    {
        $tipos_examenes = DB::select('select * from create_examen');
        
        $data = [
            "tipos_examenes" => $tipos_examenes,
        ];

        return response()->json($data);    
    }

    public function store(Request $request)
    {   
        DB::insert('call public."add_examen_proce"(:codigo_examen, :id_tipo_examen, :nombre_examen, :indicaciones_examen, :costo, current_date)', 
                    ["codigo_examen" => $request->codigo_examen,
                     "id_tipo_examen" => $request->id_tipo_examen,
                     "nombre_examen" => $request->nombre_examen,
                     "indicaciones_examen" => $request->indicaciones_examen, 
                     "costo" => $request->costo
                     ]);
        
        return response()->json('Examen creado!');    
    }

    public function edit($codigo)
    {
        $examen_editar = DB::select('SELECT v_codigo as codigo_examen, v_id_tipo as id_tipo_examen, v_nombre as nombre_examen, v_indicacion as indicaciones_examen,
        v_costo  as costo from public."edit_examen"(:codigo)', 
        ["codigo" => $codigo]); 

        return response()->json($examen_editar[0]);    
    }
    
    public function show($codigo)
    {
        $examen_ver = DB::select('SELECT v_codigo as codigo_examen, v_tipo_examen as nombre_tipo_examen, v_nombre_examen as nombre_examen, v_indicaciones as indicaciones_examen,
        v_costo  as costo from public."get_by_codigo_examen"(:codigo)', 
        ["codigo" => $codigo
        ]); 

        return response()->json($examen_ver[0]);    
    }

    public function update(Request $request, $codigo)
    {
        DB::select('call public."udp_examen_proce"(:codigo_examen, :id_tipo_examen, :nombre_examen, :indicaciones_examen, :costo, current_date)', 
        ["codigo_examen" => $codigo,
        "id_tipo_examen" => $request->id_tipo_examen,
        "nombre_examen" => $request->nombre_examen,
        "indicaciones_examen" => $request->indicaciones_examen, 
        "costo" => $request->costo
        ]);
        
        return response()->json('Examen actualizado!');    
    }

    public function buscar($param_busqueda)
    {

        $param_busqueda = app('App\Http\Controllers\FuncionesController')->acentos($param_busqueda);
        $codigo_examen = '%'.$param_busqueda.'%';
        $nombre_examen = '%'.$param_busqueda.'%';
       
        $examenes = DB::select('SELECT * from public."buscar_examen"(:codigo_examen, :nombre_examen)', 
        ["codigo_examen" => strtolower($codigo_examen), 
        "nombre_examen" =>strtolower($nombre_examen)]);
        
        return response()->json(array('data' => $examenes), 200);

    }
}
