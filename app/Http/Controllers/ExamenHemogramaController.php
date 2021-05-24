<?php

namespace App\Http\Controllers;

use App\ExamenHemograma;
use App\Examen;
use App\Http\Resources\ExamenHemograma as ExamenHemogramaResource;
use App\Http\Resources\Examen as ExamenResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExamenHemogramaController extends Controller
{
    public function index()
    {  
       $examenes_hemogramas = DB::select('select * from examenes_hemogramas order by codigo_hemograma');
       
       return ExamenHemogramaResource::collection($examenes_hemogramas,$examenes);
      
    }

    public function create()
    {
        $codigos_hemogramas = DB::select('select * from examenes_hemogramas order by codigo_hemograma asc');
        $examenes = DB::select('select * from examenes order by codigo_examen');
        $data = [
            "codigos_hemogramas" => $codigos_hemogramas, 
            "examenes" => $examenes, 
        ];

        return response()->json($data);    
    }

    public function store(Request $request)
    { 
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');

        DB::insert('insert into examenes_hemogramas (codigo_hemograma, codigo_examen, parametro, unidad_de_medida, valor_min_mujeres, valor_max_mujeres,
                    valor_min_hombres, valor_max_hombres, valor_resultado, created_at) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [$request->codigo_hemograma, 
                    $request->codigo_examen,
                    $request->parametro,
                    $request->unidad_de_medida, 
                    round($request->valor_min_mujeres, 2), 
                    round($request->valor_max_mujeres, 2),
                    round($request->valor_min_hombres, 2),
                    round($request->valor_max_hombres, 2),
                    round($request->valor_resultado, 2),
                    $fecha_actual
                    ]);
        return response()->json('Hemograma creado!');    
    }

    public function edit($codigo)
    {
        $hemograma_editar = DB::select('select * from examenes_hemogramas where codigo_hemograma = ?', [$codigo]); 

        return response()->json($hemograma_editar[0]);    
    }

    public function show($codigo)
    {
        $hemograma_ver = DB::select('select * from examenes_hemogramas inner join examenes on examenes_hemogramas.codigo_examen = examenes.codigo_examen
                                        where codigo_examen = ?', [$codigo]); 

        return response()->json($hemograma_ver[0]);    
    }

    public function update($codigo, Request $request)
    {   
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');
        
        DB::update('update examenes_hemogramas set codigo_hemograma = ?, codigo_examen = ?, parametro = ?, unidad_de_medida = ?, valor_min_mujeres = ?, 
                    valor_max_mujeres = ?, valor_min_hombres = ?, valor_max_hombres = ?, valor_resultado = ?, updated_at = ? where codigo_hemograma = ?', 
                    [$request->codigo_hemograma, 
                    $request->codigo_examen,
                    $request->parametro,
                    $request->unidad_de_medida, 
                    round($request->valor_min_mujeres, 2), 
                    round($request->valor_max_mujeres, 2),
                    round($request->valor_min_hombres, 2),
                    round($request->valor_max_hombres, 2),
                    round($request->valor_resultado, 2),
                    $fecha_actual,
                    $codigo
                    ]);

        return response()->json('Hemograma  actualizado!');    
    }
}
