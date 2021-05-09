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
       return DiagnosticoResource::collection(Diagnostico::orderBy('created_at', 'desc')->paginate(15));
      
    }

    public function create()
    {
        $tipos_diagnosticos = DB::select('select * from tipo_diagnostico order by tipo_diagnostico asc');
        
        $data = [
            "tipos_diagnosticos" => $tipos_diagnosticos,
        ];

        return response()->json($data);    
    }

    public function store(Request $request)
    {   

        DB::table('diagnosticos')->insert(
            [
             'codigo_diagnostico' => $request->codigo_diagnostico,
             'id_tipo_diagnostico' => $request->id_tipo_diagnostico,
             'nombre_diagnostico' => $request->nombre_diagnostico,
             'descripcion_diagnostico' => $request->descripcion_diagnostico
             ]
        );
        
        return response()->json('Diagnóstico creado!');    
    }

    public function edit($codigo)
    {
        $diagnostico_editar = DB::select('select * from diagnosticos where codigo_diagnostico = ?', [$codigo]); 

        return response()->json($diagnostico_editar[0]);    
    }

    public function update($codigo, Request $request)
    {
        DB::table('diagnosticos')->where('codigo_diagnostico', $codigo)->update(array
            (
            'codigo_diagnostico' => $request->codigo_diagnostico,
            'id_tipo_diagnostico' => $request->id_tipo_diagnostico,
            'nombre_diagnostico' => $request->nombre_diagnostico,
            'descripcion_diagnostico' => $request->descripcion_diagnostico
            )
        );

        return response()->json('Diagnóstico actualizado!');    
    }

    public function buscar($param_busqueda)
    {

        $diagnosticos = DB::select("select * from diagnosticos where lower(codigo_diagnostico) = ? or lower(nombre_diagnostico) = ?", 
        [strtolower($param_busqueda), strtolower($param_busqueda)]);
        
        return DiagnosticoResource::collection($diagnosticos);

    }

    
}
