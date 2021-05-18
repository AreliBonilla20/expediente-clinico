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
       return MedicamentoResource::collection(Medicamento::orderBy('created_at', 'desc')->paginate(15));
      
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
        DB::table('medicamentos')->insert(
            [
             'codigo_medicamento' => $request->codigo_medicamento,
             'id_tipo_medicamento' => $request->id_tipo_medicamento,
             'nombre_medicamento' => $request->nombre_medicamento,
             'descripcion_medicamento' => $request->descripcion_medicamento,
             'presentacion_medicamento' => $request->presentacion_medicamento,
             'costo_medicamento' => $request->costo_medicamento,
             'existencia_medicamento' => $request->existencia_medicamento,
             ]
        );
        
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
        DB::table('medicamentos')->where('codigo_medicamento', $codigo)->update(array
            (
                'codigo_medicamento' => $request->codigo_medicamento,
                'id_tipo_medicamento' => $request->id_tipo_medicamento,
                'nombre_medicamento' => $request->nombre_medicamento,
                'descripcion_medicamento' => $request->descripcion_medicamento,
                'presentacion_medicamento' => $request->presentacion_medicamento,
                'costo_medicamento' => $request->costo_medicamento,
                'existencia_medicamento' => $request->existencia_medicamento,
            )
        );

        return response()->json('Medicamento  actualizado!');    
    }

    public function buscar($param_busqueda)
    {
        $medicamentos = DB::select("select * from medicamentos where lower(codigo_medicamento) = ? or lower(nombre_medicamento) = ?", 
        [strtolower($param_busqueda), strtolower($param_busqueda)]);
        
        return MedicamentoResource::collection($medicamentos);

    }
}
