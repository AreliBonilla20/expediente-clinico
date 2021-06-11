<?php

namespace App\Http\Controllers;

use App\Medicamento;
use App\Http\Resources\Medicamento as MedicamentoResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MedicamentoController extends Controller
{
    public function index()
    {  
       $medicamentos = DB::select('select * from index_medicamento');
       return MedicamentoResource::collection($medicamentos);
      
    }

    public function create()
    {
        $tipos_medicamentos = DB::select('select * from create_medicamento');
        
        $data = [
            "tipos_medicamentos" => $tipos_medicamentos, 
        ];

        return response()->json($data);    
    }

    public function store(Request $request)
    { 

        DB::select('call public."add_medicamento_proce" (:codigo_medicamento, :id_tipo_medicamento, :nombre_medicamento, :via_administracion, :descripcion_medicamento, :presentacion_medicamento,
                    :costo_medicamento, :existencia_medicamento, current_date)', 
                    ["codigo_medicamento" => $request->codigo_medicamento, 
                    "id_tipo_medicamento" => $request->id_tipo_medicamento,
                    "nombre_medicamento" => $request->nombre_medicamento,
                    "via_administracion" => $request->via_administracion, 
                    "descripcion_medicamento" => $request->descripcion_medicamento, 
                    "presentacion_medicamento"=> $request->presentacion_medicamento, 
                    "costo_medicamento" => $request->costo_medicamento, 
                    "existencia_medicamento" => $request->existencia_medicamento
                    ]);
                    
       
        return response()->json('Medicamento creado!');    
    }

    public function edit($codigo)
    {
        $medicamento_editar = DB::select('SELECT  v_codigo as codigo_medicamento, v_id_tipo  as id_tipo_medicamento, v_nombre as nombre_medicamento, v_descripcion as descripcion_medicamento, 
        v_via_administracion as via_administracion, v_presentacion as presentacion_medicamento, v_costo as costo_medicamento,  v_existencia as existencia_medicamento from public."edit_medicamento"(:codigo)', 
        ["codigo" => $codigo]);

        return response()->json($medicamento_editar[0]);    
    }

    public function show($codigo)
    {
        $medicamento_ver = DB::select('SELECT  v_codigo as codigo_medicamento, v_nombre_tipo  as tipo_medicamento, v_nombre as nombre_medicamento, v_descripcion as descripcion_medicamento, 
        v_via_administracion as via_administracion, v_presentacion as presentacion_medicamento, v_costo as costo_medicamento,  v_existencia as existencia_medicamento from public."get_by_codigo_medicamento"(:codigo)', 
        ["codigo" => $codigo]); 

        return response()->json($medicamento_ver[0]);    
    }


    public function update($codigo, Request $request)
    {   
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');
        
        DB::select('call public."udp_medicamento_proce" (:codigo_medicamento, :id_tipo_medicamento, :nombre_medicamento, :via_administracion, :descripcion_medicamento, :presentacion_medicamento,
                    :costo_medicamento, :existencia_medicamento, current_date)', 
                    ["codigo_medicamento" => $request->codigo_medicamento, 
                    "id_tipo_medicamento" => $request->id_tipo_medicamento,
                    "nombre_medicamento" => $request->nombre_medicamento,
                    "via_administracion" => $request->via_administracion, 
                    "descripcion_medicamento" => $request->descripcion_medicamento, 
                    "presentacion_medicamento"=> $request->presentacion_medicamento, 
                    "costo_medicamento" => $request->costo_medicamento, 
                    "existencia_medicamento" => $request->existencia_medicamento
                    ]);
                    
        return response()->json('Medicamento actualizado!');    
    }

    public function buscar($param_busqueda)
    {
        $param_busqueda = app('App\Http\Controllers\FuncionesController')->acentos($param_busqueda);

        $codigo_medicamento = '%'.$param_busqueda.'%';
        $nombre_medicamento = '%'.$param_busqueda.'%';
        
        $medicamentos = DB::select('SELECT * from public."buscar_medicamento"(:codigo_medicamento, :nombre_medicamento)', 
        ["codigo_medicamento" => strtolower($codigo_medicamento), 
        "nombre_medicamento" => strtolower($nombre_medicamento)]);
       
        return response()->json(array('data' => $medicamentos), 200);

    }
}
