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
  
        $id_quirofano= DB::select('SELECT public."generar_codigo_quirofano"(:id_centro_medico)', 
        ["id_centro_medico" => $id_centro_medico
        ]);
    
         //Proceso desde PostgreSQL
         DB::select('call public."add_quirofano_proce"(:id_quirofano, :id_centro_medico, :quirofano, current_date)', 
         ["id_quirofano" => $id_quirofano[0]->generar_codigo_quirofano, 
         "id_centro_medico" => $id_centro_medico, 
         "quirofano" =>  $request->quirofano
         ]);
 
            return response()->json('Quirofano creado');    
    
    }

}
