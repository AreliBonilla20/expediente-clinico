<?php

namespace App\Http\Controllers;

use App\Http\Resources\Cirugia as CirugiaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CirugiaController extends Controller
{
    public function index()
    {  
       $cirugias = DB::select('select * from cirugias order by nombre_cirugia');
       return CirugiaResource::collection($cirugias);
      
    }

    public function store(Request $request)
    {   

        DB::insert('insert into cirugias (codigo_cirugia, nombre_cirugia, descripcion_cirugia, costo_cirugia, created_at) 
                    values (?, ?, ?, ?, current_date + current_time)', 
                    [$request->codigo_cirugia, 
                     $request->nombre_cirugia,
                     $request->descripcion_cirugia,
                     round($request->costo_cirugia, 2)
                    ]);
        
        return response()->json('Cirugía creada!');    
    }

    public function edit($codigo)
    {
        $cirugia_editar = DB::select('select * from cirugias where codigo_cirugia = ?', [$codigo]); 

        return response()->json($cirugia_editar[0]);    
    }

    public function show($codigo)
    {
        $cirugia_ver = DB::select('select * from cirugias where codigo_cirugia = ?', [$codigo]); 

        return response()->json($cirugia_ver[0]);    
    }

    public function update(Request $request, $codigo)
    {   
        
        DB::update('update cirugias set nombre_cirugia = ?, descripcion_cirugia = ?,  costo_cirugia = ?, updated_at = current_date + current_time
                    where codigo_cirugia = ?', 
                    [
                    $request->nombre_cirugia,
                    $request->descripcion_cirugia,
                    round($request->costo_cirugia, 2),
                     $codigo
                    ]);

        return response()->json('Cirugía actualizada!');    
    }

    /*public function buscar($param_busqueda)
    {
        $param_busqueda = app('App\Http\Controllers\FuncionesController')->acentos($param_busqueda);

        $codigo_diagnostico = '%'.$param_busqueda.'%';
        $nombre_diagnostico = '%'.$param_busqueda.'%';
        
        $diagnosticos = DB::select('select * from diagnosticos where UNACCENT(lower(codigo_diagnostico)) LIKE ? or UNACCENT(lower(nombre_diagnostico)) LIKE ?', 
        [strtolower($codigo_diagnostico), strtolower($nombre_diagnostico)]);

        return DiagnosticoResource::collection($diagnosticos);
    }*/
}
