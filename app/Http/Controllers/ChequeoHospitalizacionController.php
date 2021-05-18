<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChequeoHospitalizacionController extends Controller
{
    public function index($id_hospitalizacion)
    {  
       $chequeos = DB::select('select * from pacientes order by created_at desc limit 10');
       return PacienteResource::collection($pacientes);
    }
}
