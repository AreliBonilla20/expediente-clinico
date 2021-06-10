<?php

namespace App\Http\Controllers;

use App\TratamientosMedicos;
use Illuminate\Http\Request;
use App\Http\Resources\TratamientosMedicos as TratamientosMedicosResource;
use Illuminate\Support\Facades\DB;

class TratamientosMedicosController extends Controller
{
    public function index()
    {  
       $tratamientos_medicos = DB::select('select * from index_tratamiento');
       return TratamientosMedicosResource::collection($tratamientos_medicos);
      
    }

    public function create()
    {
        $tipos_tratamientos = DB::select('select * from create_tratamiento');

        $data = [
            "tipos_tratamientos"=> $tipos_tratamientos,
        ];
        

        return response()->json($data);    
    }

    public function store(Request $request)
    {   

        DB::insert('call public."add_tratamiento_proce"(:codigo_tratamiento, :id_tipo_tratamiento, :nombre_tratamiento, :descripcion_tratamiento, :costo_tratamiento, current_date)', 
                    ["codigo_tratamiento" => $request->codigo_tratamiento, 
                    "id_tipo_tratamiento" => $request->id_tipo_tratamiento,
                    "nombre_tratamiento" => $request->nombre_tratamiento,
                    "descripcion_tratamiento" => $request->descripcion_tratamiento, 
                    "costo_tratamiento" => $request->costo_tratamiento
                    ]);
        
        return response()->json('Tratamiento mÃ©dico creado!');    
    }

    public function edit($codigo)
    {
        $tratamiento_editar = DB::select('SELECT v_codigo  as codigo_tratamiento, v_tipo as id_tipo_tratamiento, v_nombre as nombre_tratamiento, v_descripcion  as descripcion_tratamiento,
        v_costo as costo_tratamiento from public."edit_tratamiento"(:codigo)', 
        ["codigo" => $codigo]); 

        return response()->json($tratamiento_editar[0]);    
    }

    public function show($codigo)
    {
        $tratamiento_ver = DB::select('SELECT v_codigo  as codigo_tratamiento, v_nombre_tipo  as tipo_tratamiento, v_nombre_tratamiento  as nombre_tratamiento, v_descripcion  as descripcion_tratamiento,
        v_costo as costo_tratamiento from public."get_by_codigo_tratamiento"(:codigo)',     
        ["codigo" => $codigo]); 

        return response()->json($tratamiento_ver[0]);    
    }

    public function update($codigo, Request $request)
    {   
        
        DB::select('call public."udp_tratamiento_proce"(:codigo_tratamiento, :id_tipo_tratamiento, :nombre_tratamiento, :descripcion_tratamiento, :costo_tratamiento, current_date)', 
        ["codigo_tratamiento" => $request->codigo_tratamiento, 
        "id_tipo_tratamiento" => $request->id_tipo_tratamiento,
        "nombre_tratamiento" => $request->nombre_tratamiento,
        "descripcion_tratamiento" => $request->descripcion_tratamiento, 
        "costo_tratamiento" => $request->costo_tratamiento
        ]);

        return response()->json('Tratamiento mÃ©dico actualizado!');    
    }

    public function buscar($param_busqueda)
    {
        $param_busqueda = app('App\Http\Controllers\FuncionesController')->acentos($param_busqueda);

        $codigo_tratamiento = '%'.$param_busqueda.'%';
        $nombre_tratamiento = '%'.$param_busqueda.'%';
        
        $tratamientos_medicos = DB::select('SELECT * from public."buscar_tratamiento"(:codigo_tratamiento, :nombre_tratamiento)', 
        ["codigo_tratamiento" => strtolower($codigo_tratamiento), 
        "nombre_tratamiento" => strtolower($nombre_tratamiento)]);

        return response()->json(array('data' => $tratamientos_medicos), 200);
    }


}
