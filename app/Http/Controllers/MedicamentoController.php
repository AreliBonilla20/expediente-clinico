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
       $medicamentos = DB::select('select * from medicamentos order by codigo_medicamento');
       return MedicamentoResource::collection($medicamentos);
      
    }

    public function create()
    {
        $tipos_medicamentos = DB::select('select * from tipo_medicamento order by id_tipo_medicamento asc');
        
        $data = [
            "tipos_medicamentos" => $tipos_medicamentos, 
        ];

        return response()->json($data);    
    }

    public function store(Request $request)
    { 
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');

        DB::insert('insert into medicamentos (codigo_medicamento, id_tipo_medicamento, nombre_medicamento, via_administracion, descripcion_medicamento, presentacion_medicamento,
                    costo_medicamento, existencia_medicamento, created_at) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [$request->codigo_medicamento, 
                    $request->id_tipo_medicamento,
                    $request->nombre_medicamento,
                    $request->via_administracion, 
                    $request->descripcion_medicamento, 
                    $request->presentacion_medicamento, 
                    $request->costo_medicamento, 
                    $request->existencia_medicamento, 
                    $fecha_actual
                    ]);
      
       
        return response()->json('Medicamento creado!');    
    }

    public function edit($codigo)
    {
        $medicamento_editar = DB::select('select * from medicamentos where codigo_medicamento = ?', [$codigo]); 

        return response()->json($medicamento_editar[0]);    
    }

    public function show($codigo)
    {
        $medicamento_ver = DB::select('select * from medicamentos inner join tipo_medicamento on medicamentos.id_tipo_medicamento = tipo_medicamento.id_tipo_medicamento
                                        where codigo_medicamento = ?', [$codigo]); 

        return response()->json($medicamento_ver[0]);    
    }

    public function update($codigo, Request $request)
    {   
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');
        
        DB::update('update medicamentos set codigo_medicamento = ?, id_tipo_medicamento = ?, nombre_medicamento = ?, via_administracion = ?, descripcion_medicamento = ?, 
                    presentacion_medicamento = ?, costo_medicamento = ?, existencia_medicamento = ?, updated_at = ? where codigo_medicamento = ?', 
                    [$request->codigo_medicamento, 
                     $request->id_tipo_medicamento,
                     $request->nombre_medicamento,
                     $request->via_administracion,
                     $request->descripcion_medicamento,
                     $request->descripcion_medicamento,
                     $request->costo_medicamento,
                     $request->existencia_medicamento,
                     $fecha_actual,
                     $codigo
                    ]);


        return response()->json('Medicamento  actualizado!');    
    }

    public function buscar($param_busqueda)
    {
        $param_busqueda = app('App\Http\Controllers\FuncionesController')->acentos($param_busqueda);

        $codigo_medicamento = '%'.$param_busqueda.'%';
        $nombre_medicamento = '%'.$param_busqueda.'%';
        
        $medicamentos = DB::select('select * from medicamentos where UNACCENT(lower(codigo_medicamento)) LIKE ? or UNACCENT(lower(nombre_medicamento)) LIKE ?', 
        [strtolower($codigo_medicamento), strtolower($nombre_medicamento)]);
        
        return MedicamentoResource::collection($medicamentos);

    }
}
