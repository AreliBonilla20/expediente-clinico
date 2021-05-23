<?php

namespace App\Http\Controllers;

use App\Http\Resources\Consultorio as ConsultorioResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConsultorioController extends Controller
{
    public function index($id_centro_medico)
    {  
       $consultorios = DB::select('select * from consultorios where id_centro_medico = ?', [$id_centro_medico]);
       return ConsultorioResource::collection($consultorios);
      
    }

    public function store(Request $request, $id_centro_medico)
    {   
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');
        $codigo_calculado = $this->id_consultorio($id_centro_medico);

        DB::insert('insert into consultorios (id_consultorio, id_centro_medico, consultorio, created_at) 
                    values (?, ?, ?, ?)', 
                    [$codigo_calculado,
                     $id_centro_medico,
                     $request->consultorio, 
                     $fecha_actual
                    ]);
        
        return response()->json('Consultorio creado!');    
    }


    public function id_consultorio($id_centro_medico)
    {   
        $cont = 0;
        $consultorios = DB::select('select* from consultorios');

        if(count($consultorios)>0)
        {
            foreach($consultorios as $consultorio)
            {
                if($consultorio->id_centro_medico == $id_centro_medico)
                {
                    $cont++;
                }    
            }
            $correlativo = (string) $cont + 1;
            $id_consultorio = $id_centro_medico.'C'.$correlativo;
        }
        else {
            $id_consultorio = $id_centro_medico.'C1';
        }
        
        return $id_consultorio;
    }
}
