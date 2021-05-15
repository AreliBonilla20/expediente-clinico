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
       return ExamenResource::collection(Examen::orderBy('created_at', 'desc')->paginate(15));
      
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

        DB::table('examenes')->insert(
            [
             'codigo_examen' => $request->codigo_examen,
             'id_tipo_examen' => $request->id_tipo_examen,
             'nombre_examen' => $request->nombre_examen,
             'indicaciones_examen' => $request->indicaciones_examen,
             'costo' => $request->costo
             ]
        );
        
        return response()->json('Examen creado!');    
    }

    public function edit($codigo)
    {
        $examen_editar = DB::select('select * from examenes where codigo_examen = ?', [$codigo]); 

        return response()->json($examen_editar[0]);    
    }

    public function update($codigo, Request $request)
    {
        DB::table('examenes')->where('codigo_examen', $codigo)->update(array
            (
            'codigo_examen' => $request->codigo_examen,
            'id_tipo_examen' => $request->id_tipo_examen,
            'nombre_examen' => $request->nombre_examen,
            'indicaciones_examen' => $request->indicaciones_examen,
            'costo' => $request->costo
            )
        );

        return response()->json('Examen actualizado!');    
    }

    public function buscar($param_busqueda)
    {

        $examenes = DB::select("select * from examenes where lower(codigo_examen) = ? or lower(nombre_examen) = ?", 
        [strtolower($param_busqueda), strtolower($param_busqueda)]);
        
        return ExamenResource::collection($examenes);

    }
}
