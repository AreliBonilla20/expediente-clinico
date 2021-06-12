<?php

namespace App\Http\Controllers;

use App\Diagnostico;
use App\Http\Resources\Diagnostico as DiagnosticoResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DiagnosticoController extends Controller
{
    public function index()
    {  
       $diagnosticos = DB::select('select * from index_diagnostico');
       return DiagnosticoResource::collection($diagnosticos);
      
    }

    public function create()
    {
        $tipos_diagnosticos = DB::select('select * from create_diagnostico');
        $diagnosticos = DB::select('select * from diagnosticos order by nombre_diagnostico');
        
        $data = [
            "tipos_diagnosticos" => $tipos_diagnosticos,
            "diagnosticos" => $diagnosticos
        ];

        return response()->json($data);    
    }

    public function store(Request $request)
    {   
        DB::select('call public."add_diagnostico_proce"(:codigo_diagnostico, :id_tipo_diagnostico, :nombre_diagnostico, :descripcion_diagnostico, current_date)', 
        ["codigo_diagnostico" => $request -> codigo_diagnostico,
        "id_tipo_diagnostico" => $request -> id_tipo_diagnostico,
        "nombre_diagnostico" => $request -> nombre_diagnostico,
        "descripcion_diagnostico" => $request -> descripcion_diagnostico
        ]);
        
        return response()->json('Diagnóstico creado!');    
    }

    public function edit($codigo)
    {
        $diagnostico_editar = DB::select('SELECT v_codigo  as codigo_diagnostico, v_id_tipo  as id_tipo_diagnostico,
        v_nombre as nombre_diagnostico, v_descripcion as descripcion_diagnostico from public."edit_diagnostico"(:codigo)', 
         ["codigo" =>$codigo]); 

        return response()->json($diagnostico_editar[0]);    
    }

    public function show($codigo)
    {
        $diagnostico_ver = DB::select('SELECT v_codigo  as codigo_diagnostico, v_nombre_tipo  as tipo_diagnostico,
        v_nombre as nombre_diagnostico, v_descripcion as descripcion_diagnostico from public."get_by_codigo_diagnostico"(:codigo)', 
        ["codigo" =>$codigo]); 

        return response()->json($diagnostico_ver[0]);    
    }

    public function update(Request $request, $codigo)
    {   
        DB::select('call public."udp_diagnostico_proce"(:codigo_diagnostico, :id_tipo_diagnostico, :nombre_diagnostico, :descripcion_diagnostico, current_date)', 
                    ["codigo_diagnostico" => $codigo,
                    "id_tipo_diagnostico" => $request->id_tipo_diagnostico,
                    "nombre_diagnostico" => $request->nombre_diagnostico,
                    "descripcion_diagnostico" => $request->descripcion_diagnostico
                    ]);

        return response()->json('Diagnóstico actualizado!');    
    }

    public function buscar($param_busqueda)
    {
        $param_busqueda = app('App\Http\Controllers\FuncionesController')->acentos($param_busqueda);

        $codigo_diagnostico = '%'.$param_busqueda.'%';
        $nombre_diagnostico = '%'.$param_busqueda.'%';
        
        $diagnosticos = DB::select('SELECT * from public."buscar_diagnostico"(:codigo_diagnostico, :nombre_diagnostico)', 
        ["codigo_diagnostico" => strtolower($codigo_diagnostico), 
        'nombre_diagnostico'=> strtolower($nombre_diagnostico)]);

        return response()->json(array('data' => $diagnosticos), 200);
    }

    
}
