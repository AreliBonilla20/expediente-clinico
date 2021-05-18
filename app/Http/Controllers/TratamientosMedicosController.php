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
       $tratamientos_medicos = DB::select('select * from tratamientos_medicos order by codigo_tratamiento');
       return TratamientosMedicosResource::collection($tratamientos_medicos);
      
    }

    public function create()
    {
        $tipos_tratamientos = DB::select('select * from tipo_tratamiento order by tipo_tratamiento asc');

        $data = [
            "tipos_tratamientos"=> $tipos_tratamientos,
        ];
        

        return response()->json($data);    
    }

    public function store(Request $request)
    {   
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');

        DB::insert('insert into tratamientos_medicos (codigo_tratamiento, id_tipo_tratamiento, nombre_tratamiento, descripcion_tratamiento, costo_tratamiento, created_at) 
                    values (?, ?, ?, ?, ?, ?)', 
                    [$request->codigo_tratamiento, 
                     $request->id_tipo_tratamiento,
                     $request->nombre_tratamiento,
                     $request->descripcion_tratamiento, 
                     $request->costo_tratamiento, 
                     $fecha_actual
                    ]);
        
        return response()->json('Tratamiento médico creado!');    
    }

    public function edit($codigo)
    {
        $tratamiento_editar = DB::select('select * from tratamientos_medicos where codigo_tratamiento = ?', [$codigo]); 

        return response()->json($tratamiento_editar[0]);    
    }

    public function show($codigo)
    {
        $tratamiento_ver = DB::select('select * from tratamientos_medicos inner join tipo_tratamiento on tratamientos_medicos.id_tipo_tratamiento = tipo_tratamiento.id_tipo_tratamiento 
        where codigo_tratamiento = ?', [$codigo]); 

        return response()->json($tratamiento_ver[0]);    
    }

    public function update($codigo, Request $request)
    {   
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');
        
        DB::update('update tratamientos_medicos set codigo_tratamiento = ?, id_tipo_tratamiento = ?, nombre_tratamiento = ?, descripcion_tratamiento = ?, costo_tratamiento = ?, updated_at = ?
                    where codigo_tratamiento = ?', 
                    [$request->codigo_tratamiento, 
                     $request->id_tipo_tratamiento,
                     $request->nombre_tratamiento,
                     $request->descripcion_tratamiento,
                     $request->costo_tratamiento,
                     $fecha_actual,
                     $codigo
                    ]);

        return response()->json('Tratamiento médico actualizado!');    
    }

    public function buscar($param_busqueda)
    {
        $param_busqueda = app('App\Http\Controllers\FuncionesController')->acentos($param_busqueda);

        $codigo_tratamiento = '%'.$param_busqueda.'%';
        $nombre_tratamiento = '%'.$param_busqueda.'%';
        
        $tratamientos_medicos = DB::select('select * from tratamientos_medicos where UNACCENT(lower(codigo_tratamiento)) LIKE ? or UNACCENT(lower(nombre_tratamiento)) LIKE ?', 
        [strtolower($codigo_tratamiento), strtolower($nombre_tratamiento)]);

        return TratamientosMedicosResource::collection($tratamientos_medicos);

    }


}
