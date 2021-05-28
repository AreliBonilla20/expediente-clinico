<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DoctorController extends Controller
{   
    public function centro_medico_doctores($id_centro_medico){

        $doctores = DB::select('select * from doctores inner join empleados on empleados.id_empleado=doctores.id_empleado
                                inner join especialidades on especialidades.id_especialidad=doctores.id_especialidad
                                where id_centro_medico = ?', [$id_centro_medico]);
 
        return response()->json($doctores);    
    }

    public function create(){

        $especialidades = DB::select('select * from especialidades order by nombre_especialidad');
 
        return response()->json($especialidades);    
    }
 
    public function store($request, $id_empleado){
    
     $id_doctor = app('App\Http\Controllers\FuncionesController')->get_id_doctor();
        
     DB::insert('insert into doctores (id_doctor, id_empleado, id_especialidad, area_atencion, created_at) 
     values (?, ?, ?, ?, current_date + current_time )', 
     [   
         $id_doctor,
         $id_empleado,
         $request->id_especialidad,
         $request->area_atencion    
     ]);
 
     return response()->json('Doctor registrado!');    
    }

    public function horarios(Request $request){
    
           
        DB::insert('insert into doctores_horarios (id_doctor, id_horario, created_at) 
        values (?, ?, current_date + current_time )', 
        [   
            $request->id_doctor,
            $request->id_horario    
        ]);
    
        return response()->json('Horario asignado!');    
    }
}
