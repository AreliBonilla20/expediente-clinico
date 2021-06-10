<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ChequeoHospitalizacion as ChequeoHospitalizacionResource;
use Illuminate\Support\Facades\DB;

class ChequeoHospitalizacionController extends Controller
{
    public function index($id_hospitalizacion)
    {  
       $chequeos = DB::select('select * from chequeos_hospitalizaciones where chequeos_hospitalizaciones.id_hospitalizacion = ? order by created_at desc', [$id_hospitalizacion]);
       $alta = DB::select('select fecha_alta from hospitalizaciones where id_hospitalizacion = ?', [$id_hospitalizacion]);
       
       $data = [
           "chequeos" => ChequeoHospitalizacionResource::collection($chequeos),
           "alta" => $alta[0]
       ];
       
       
       return response()->json($data);    
    }
    public function store(Request $request, $id_hospitalizacion)
    {   

        DB::insert('insert into chequeos_hospitalizaciones (id_hospitalizacion, fecha_chequeo, hora_chequeo, sintomas_chequeo, observacion_chequeo) 
                    values (?, current_date, current_time, ?, ?)', 
                    [$id_hospitalizacion, 
                    $request->sintomas_chequeo,
                     $request->observacion_chequeo
                    ]);
        
        return response()->json('Chequeo creado!');    
    }
}
