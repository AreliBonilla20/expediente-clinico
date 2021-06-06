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

        $cita = DB::select('select * from citas inner join centros_medicos on citas.id_centro_medico = centros_medicos.id_centro_medico 
                            inner join especialidades on especialidades.id_especialidad = citas.id_especialidad
                            where id_cita = ?', [$id_cita]);
        
        if($cita[0]->nombre_especialidad == 'Medicina general')
        {
            $costo_consulta = $cita[0]->costo_consulta_general;
        }
        else{
            $costo_consulta = $cita[0]->costo_consulta_especialidad;
        }
    
        $id_consulta = app('App\Http\Controllers\FuncionesController')->get_id_consulta($id_cita, $codigo_paciente);
        
        DB::insert('insert into consultas (id_consulta, id_cita, sintomatologia, observaciones, created_at) 
                    values (?, ?, ?, ?, current_date + current_time)', 
                    [$id_consulta,
                     $request->id_cita, 
                     $request->sintomatologia, 
                     $request->observaciones 
                     
                    ]);


        DB::insert('insert into costo_servicios (codigo_paciente, id_centro_medico, id_consulta, costo_consulta, costo_total, created_at)
        values (?, ?, ?, ?, ?, current_date + current_time)',
            [$codigo_paciente,
            $cita[0]->id_centro_medico,
            $id_consulta,
            $costo_consulta,
            $costo_consulta
            ]);
        
        return response()->json('Consulta iniciada');    
    }

    public function show($id_consulta)
    {
        $consulta_ver = DB::select('select * from consultas inner join citas on citas.id_cita = consultas.id_cita 
        inner join doctores on doctores.id_doctor = citas.id_doctor
        inner join empleados on empleados.id_empleado = doctores.id_empleado where id_consulta = ?', [$id_consulta]);
        return response()->json($consulta_ver[0]);

    }

    public function consulta_factura($id_consulta)
    {
        $costo_de_consulta = DB::select('select * from costo_servicios 
        inner join centros_medicos on centros_medicos.id_centro_medico = costo_servicios.id_centro_medico
        inner join departamentos on departamentos.id_departamento = centros_medicos.id_departamento
        inner join municipios on municipios.id_municipio = centros_medicos.id_municipio
        inner join pacientes on pacientes.codigo = costo_servicios.codigo_paciente
        inner join consultas on consultas.id_consulta = costo_servicios.id_consulta
        inner join citas on citas.id_cita = consultas.id_cita
        where costo_servicios.id_consulta = ?', [$id_consulta]);

        $medicamentos = DB::select('select * from recetas inner join medicamentos on medicamentos.codigo_medicamento = recetas.codigo_medicamento 
                                    where id_atencion_medica in (select id_atencion_medica from atenciones_medicas where id_consulta = ?)', [$id_consulta]);
        $tratamientos = DB::select('select * from historial_tratamientos_medicos inner join tratamientos_medicos on tratamientos_medicos.codigo_tratamiento = historial_tratamientos_medicos.codigo_tratamiento 
                                    where id_atencion_medica in (select id_atencion_medica from atenciones_medicas where id_consulta = ?)', [$id_consulta]);

        $data = [
            "costo_de_consulta" => $costo_de_consulta[0],
            "medicamentos" => $medicamentos,
            "tratamientos" => $tratamientos
        ];
        
        return response()->json($data);    
    }
}
