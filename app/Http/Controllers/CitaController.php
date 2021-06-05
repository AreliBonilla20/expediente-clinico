<?php

namespace App\Http\Controllers;

use App\Http\Resources\Cita as CitaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CitaController extends Controller
{
    public function index()
    {  
       $citas_hoy = DB::select('select id_cita, fecha_cita, hora_cita, id_doctor, codigo_paciente, nombres, apellidos from citas inner join pacientes on pacientes.codigo = citas.codigo_paciente ');
       return response()->json($citas_hoy);   
      
    }

    public function create()
    {   
        $centros_medicos = DB::select('select * from centros_medicos order by nombre_centro_medico');
        $consultorios = DB::select('select * from consultorios order by consultorio');
        $especialidades = DB::select('select * from especialidades order by nombre_especialidad');
        $doctores = DB::select('select * from doctores inner join empleados on doctores.id_empleado = empleados.id_empleado order by nombre_empleado');
        
        $data = [
            "consultorios" => $consultorios,
            "doctores" => $doctores,
            "centros_medicos" => $centros_medicos,
            "especialidades" => $especialidades

        ];

        return response()->json($data);   
    }

    public function store(Request $request)
    {   
        $estado_cita = 'Pendiente';
        $codigo = $request->codigo;
        $id_cita = app('App\Http\Controllers\FuncionesController')->get_id_cita($codigo);
        
        DB::insert('insert into citas (id_cita, id_centro_medico, id_especialidad, codigo_paciente, id_doctor, id_consultorio, fecha_cita, hora_cita, estado_cita, created_at) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, current_date + current_time)', 
                    [$id_cita,
                     $request->id_centro_medico,
                     $request->id_especialidad,  
                     $codigo,
                     $request->id_doctor,
                     $request->id_consultorio, 
                     $request->fecha_cita, 
                     $request->hora_cita, 
                     $estado_cita
                    ]);
        
        return response()->json('Cita creada!');    
    }

    public function edit($id_cita)
    {
        $cita_editar = DB::select('select * from citas where id_cita = ?', [$id_cita]); 

        return response()->json($cita_editar[0]);    
    }

    public function show($id_cita)
    {
        $cita_ver = DB::select('select * from citas inner join pacientes on pacientes.codigo = citas.codigo_paciente
        inner join centros_medicos on centros_medicos.id_centro_medico = citas.id_centro_medico
        inner join especialidades on especialidades.id_especialidad = citas.id_especialidad
        inner join doctores on doctores.id_doctor = citas.id_doctor
        inner join consultorios on consultorios.id_consultorio = citas.id_consultorio
        inner join empleados on empleados.id_empleado = doctores.id_empleado where id_cita = ?', [$id_cita]); 

        return response()->json($cita_ver[0]);    
    }

    public function update(Request $request, $id_cita)
    {   
      
        
        DB::update('update citas set id_centro_medico = ?, id_especialidad = ?, id_doctor = ?,  id_consultorio = ?, fecha_cita = ?, hora_cita = ?, updated_at = current_date + current_time
                    where id_cita = ?', 
                    [
                     $request->id_centro_medico,
                     $request->id_especialidad,
                     $request->id_doctor,
                     $request->id_consultorio,
                     $request->fecha_cita,
                     $request->hora_cita,
                     $id_cita
                    ]);

        return response()->json('Cita actualizada!');    
    }

    public function citas_paciente($codigo_paciente)
    {
        $citas_paciente = DB::select('select * from citas where codigo_paciente = ?', [$codigo_paciente]);

        return response()->json($citas_paciente);
    }

    /*public function buscar($param_busqueda)
    {
        $param_busqueda = app('App\Http\Controllers\FuncionesController')->acentos($param_busqueda);

        $codigo_diagnostico = '%'.$param_busqueda.'%';
        $nombre_diagnostico = '%'.$param_busqueda.'%';
        
        $diagnosticos = DB::select('select * from diagnosticos where UNACCENT(lower(codigo_diagnostico)) LIKE ? or UNACCENT(lower(nombre_diagnostico)) LIKE ?', 
        [strtolower($codigo_diagnostico), strtolower($nombre_diagnostico)]);

        return DiagnosticoResource::collection($diagnosticos);
    }*/
}
