<?php

namespace App\Http\Controllers;

use App\Quirofano;
use App\Http\Resources\Quirofano as QuirofanoResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuirofanoController extends Controller
{
    public function index($id_centro_medico)
    {  
       $quirofanos = DB::select('select * from quirofanos where id_centro_medico = ?', [$id_centro_medico]);

       return QuirofanoResource::collection($quirofanos);
      
    }

    public function store(Request $request, $id_centro_medico)
    {   
  
        $id_quirofano= app('App\Http\Controllers\FuncionesController')->id_quirofano($id_centro_medico);
        
        DB::insert('insert into quirofanos (id_quirofano, id_centro_medico, quirofano, created_at) 
        values (?, ?, ?, current_date)', 
        [$id_quirofano,
        $id_centro_medico, 
        $request->quirofano
    
        ]);

            return response()->json('Quirófano creado!');    
    
    }

}
