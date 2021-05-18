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

       return TratamientosMedicosResource::collection(TratamientosMedicos::orderBy('created_at', 'desc')->paginate(15));
      
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

        DB::table('tratamientos_medicos')->insert(
            [
             'codigo_tratamiento' => $request->codigo_tratamiento,
             'id_tipo_tratamiento' => $request->id_tipo_tratamiento,
             'nombre_tratamiento' => $request->nombre_tratamiento,
             'descripcion_tratamiento' => $request->descripcion_tratamiento,
             'costo_tratamiento' => $request->costo_tratamiento,
             ]
        );
        
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
        DB::table('tratamientos_medicos')->where('codigo_tratamiento', $codigo)->update(array
            (
                'codigo_tratamiento'=> $request->codigo_tratamiento,
                'id_tipo_tratamiento' => $request->id_tipo_tratamiento,
                'nombre_tratamiento' => $request->nombre_tratamiento,
                'descripcion_tratamiento' => $request->descripcion_tratamiento,
                'costo_tratamiento' => $request->costo_tratamiento,
            )
        );

        return response()->json('Tratamiento médico actualizado!');    
    }

    public function buscar($param_busqueda)
    {
        $tratamientos = DB::select("select * from tratamientos_medicos where lower(codigo_tratamiento) = ? or lower(nombre_tratamiento) = ?", 
        [strtolower($param_busqueda), strtolower($param_busqueda)]);
        
        return TratamientosMedicosResource::collection($tratamientos);

    }


}
