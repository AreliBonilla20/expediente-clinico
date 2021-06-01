<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HorarioController extends Controller
{   
    public function index($id_centro_medico)
    {
        $horarios = DB::select('select * from horarios where id_centro_medico = ?', [$id_centro_medico]);

        return response()->json($horarios); 
    }
    
    public function doctores_horarios($id_centro_medico)
    {
        $doctores_horarios = DB::select('select * from doctores Inner join empleados on empleados.id_empleado = doctores.id_empleado 
                                        inner join especialidades on especialidades.id_especialidad = doctores.id_especialidad
                                        where empleados.id_centro_medico = ?', [$id_centro_medico]);

        return response()->json($doctores_horarios); 
    }

   
     public function store(Request $request, $id_centro_medico)
     {
 
     DB::insert('insert into horarios (id_centro_medico, dia_inicio, dia_final, hora_inicio, hora_final, created_at) 
     values (?, ?, ?, ?, ?, current_date + current_time )', 
     [   
         $id_centro_medico,
         $request->dia_inicio,
         $request->dia_final,   
         $request->hora_inicio,
         $request->hora_final    
     ]);
 
     return response()->json('Horario registrado!');    
    }
}
