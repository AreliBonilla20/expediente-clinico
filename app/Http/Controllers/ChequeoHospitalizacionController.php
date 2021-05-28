<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ChequeoHospitalizacion as ChequeoHospitalizacionResource;
use Illuminate\Support\Facades\DB;

class ChequeoHospitalizacionController extends Controller
{
    public function index($id_hospitalizacion)
    {  
       $chequeos = DB::select('select * from chequeos_hospitalizaciones where id_hospitalizacion = ? order by created_at desc', [$id_hospitalizacion]);
       return ChequeoHospitalizacionResource::collection($chequeos);
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
