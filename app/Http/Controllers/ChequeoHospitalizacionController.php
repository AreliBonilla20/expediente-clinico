<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ChequeoHospitalizacion as ChequeoHospitalizacionResource;
use Illuminate\Support\Facades\DB;

class ChequeoHospitalizacionController extends Controller
{
    public function index($id_hospitalizacion)
    {  
       $chequeos = DB::select('select * from chequeos_hospitalizaciones where id_hospitalizacion = ? order by created_at desc limit 10', [$id_hospitalizacion]);
       return ChequeoHospitalizacionResource::collection($chequeos);
    }

    public function store(Request $request, $id_hospitalizacion)
    {   
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');

        DB::insert('insert into chequeos_hospitalizaciones (id_hospitalizacion, fecha_chequeo, hora_chequeo, observacion_chequeo, created_at) 
                    values (?, ?, ?, ?, ?)', 
                    [$id_hospitalizacion, 
                     $request->fecha_chequeo,
                     $request->hora_chequeo,
                     $request->observacion_chequeo, 
                     $fecha_actual
                    ]);
        
        return response()->json('Chequeo creado!');    
    }
}
