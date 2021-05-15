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
       $diagnosticos = DB::select('select * from diagnosticos order by created_at asc limit 10');
       return DiagnosticoResource::collection($diagnosticos);
      
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
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');

        DB::insert('insert into diagnosticos (codigo_diagnostico, id_tipo_diagnostico, nombre_diagnostico, descripcion_diagnostico, created_at) 
                    values (?, ?, ?, ?, ?)', 
                    [$request->codigo_diagnostico, 
                     $request->id_tipo_diagnostico,
                     $request->nombre_diagnostico,
                     $request->descripcion_diagnostico, 
                     $fecha_actual
                    ]);

        /*DB::table('diagnosticos')->insert(
            [
             'codigo_diagnostico' => $request->codigo_diagnostico,
             'id_tipo_diagnostico' => $request->id_tipo_diagnostico,
             'nombre_diagnostico' => $request->nombre_diagnostico,
             'descripcion_diagnostico' => $request->descripcion_diagnostico
             ]
        );*/
        
        return response()->json('Diagnóstico creado!');    
    }

    public function edit($codigo)
    {
        $diagnostico_editar = DB::select('select * from diagnosticos where codigo_diagnostico = ?', [$codigo]); 

        return response()->json($diagnostico_editar[0]);    
    }

    public function show($codigo)
    {
        $diagnostico_ver = DB::select('select * from diagnosticos inner join tipo_diagnostico on diagnosticos.id_tipo_diagnostico = tipo_diagnostico.id_tipo_diagnostico
        where codigo_diagnostico = ?', [$codigo]); 

        return response()->json($diagnostico_ver[0]);    
    }

    public function update(Request $request, $codigo)
    {   
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');
        
        DB::update('update diagnosticos set codigo_diagnostico = ?, id_tipo_diagnostico = ?, nombre_diagnostico = ?,  descripcion_diagnostico = ?, updated_at = ?
                    where codigo_diagnostico = ?', 
                    [$request->codigo_diagnostico, 
                     $request->id_tipo_diagnostico,
                     $request->nombre_diagnostico,
                     $request->descripcion_diagnostico,
                     $fecha_actual,
                     $codigo
                    ]);

        /*DB::table('diagnosticos')->where('codigo_diagnostico', $codigo)->update(array
            (
            'codigo_diagnostico' => $request->codigo_diagnostico,
            'id_tipo_diagnostico' => $request->id_tipo_diagnostico,
            'nombre_diagnostico' => $request->nombre_diagnostico,
            'descripcion_diagnostico' => $request->descripcion_diagnostico
            )
        );*/

        return response()->json('Diagnóstico actualizado!');    
    }

    public function buscar($param_busqueda)
    {
        $param_busqueda = app('App\Http\Controllers\FuncionesController')->acentos($param_busqueda);

        $codigo_diagnostico = '%'.$param_busqueda.'%';
        $nombre_diagnostico = '%'.$param_busqueda.'%';
        
        $diagnosticos = DB::select('select * from diagnosticos where UNACCENT(lower(codigo_diagnostico)) LIKE ? or UNACCENT(lower(nombre_diagnostico)) LIKE ?', 
        [strtolower($codigo_diagnostico), strtolower($nombre_diagnostico)]);

        return response()->json($diagnosticos);

    }

    
}
