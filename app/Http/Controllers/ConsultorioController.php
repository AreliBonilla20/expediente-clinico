<?php

namespace App\Http\Controllers;

use App\Http\Resources\Consultorio as ConsultorioResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConsultorioController extends Controller
{
    public function index($id_centro_medico)
    {  
       $consultorios = DB::select('SELECT * from public."index_consultorio"(:id_centro_medico)', [$id_centro_medico]);
       return response()->json(array('data' => $consultorios), 200);
      
    }
   
    public function store(Request $request, $id_centro_medico)
    {   
        $id_consultorio= DB::select('SELECT public."generar_codigo_consultorio"(:id_centro_medico)', 
        ["id_centro_medico" => $id_centro_medico
        ]);
        
        DB::select('call public."add_consultorio_proce"(:id_consultorio, :id_centro_medico, :consultorio, :area, current_date)', 
                    ["id_consultorio" => $id_consultorio[0]->generar_codigo_consultorio, 
                    "id_centro_medico" => $id_centro_medico,
                    "consultorio" => $request->consultorio,
                    "area" => $request->area 
                    ]);
        
         return response()->json('Consultorio creado!');    
    }
}
