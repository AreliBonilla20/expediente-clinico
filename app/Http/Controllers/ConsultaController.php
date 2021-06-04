<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConsultaController extends Controller
{   
    public function index($codigo)
    {
        $consultas_paciente = DB::select('select * from consultas inner join citas on citas.id_cita = consultas.id_cita where citas.codigo_paciente = ?', [$codigo]);
        return response()->json($consultas_paciente);
    }
    public function store(Request $request)
    {   
        $id_cita = $request->id_cita;
        $codigo_paciente = $request->codigo_paciente;
    
        $id_consulta = app('App\Http\Controllers\FuncionesController')->get_id_consulta($id_cita, $codigo_paciente);
        
        DB::insert('insert into consultas (id_consulta, id_cita, sintomatologia, observaciones, created_at) 
                    values (?, ?, ?, ?, current_date + current_time)', 
                    [$id_consulta,
                     $request->id_cita, 
                     $request->sintomatologia, 
                     $request->observaciones 
                     
                    ]);
        
        return response()->json('Cita creada!');    
    }

    public function show($id_consulta)
    {
        $consulta_ver = DB::select('select * from consultas inner join citas on citas.id_cita = consultas.id_cita 
        inner join doctores on doctores.id_doctor = citas.id_doctor
        inner join empleados on empleados.id_empleado = doctores.id_empleado where id_consulta = ?', [$id_consulta]);
        return response()->json($consulta_ver[0]);

    }
}
