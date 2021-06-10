<?php

namespace App\Http\Controllers;

use App\Hospitalizacion;
use Illuminate\Http\Request;
use App\Http\Resources\Hospitalizacion as HospitalizacionResource;
use Illuminate\Support\Facades\DB;

class HospitalizacionController extends Controller
{
    public function index()
    {  
       $hospitalizacion = DB::select('select * from hospitalizaciones order by fecha_ingreso desc');
       return HospitalizacionResource::collection($hospitalizacion);
    }

    public function hospitalizaciones_paciente($codigo) 
    {
        $hospitalizaciones_paciente = DB::select('select * from hospitalizaciones where codigo_paciente = ? order by fecha_ingreso desc', [$codigo]);

        return response()->json($hospitalizaciones_paciente);
    }


    public function store(Request $request, $codigo)
    {   
        $id_hospitalizacion = $this->get_codigo($codigo);
    
        $costo_hospitalizacion = DB::select('select * from centros_medicos where id_centro_medico = ?', [$request->id_centro_medico]);

    
        DB::insert('insert into hospitalizaciones (id_hospitalizacion, id_centro_medico, codigo_paciente, fecha_ingreso, hora_ingreso, motivo_ingreso, sala, camilla,
        estado_paciente, created_at) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, current_date + current_time)', 
                    [$id_hospitalizacion,
                     $request->id_centro_medico,
                     $codigo,
                     $request->fecha_ingreso,
                     $request->hora_ingreso,
                     $request->motivo_ingreso,
                     $request->sala, 
                     $request->camilla, 
                     $request->estado_paciente
                    ]);
        
        DB::insert('insert into costo_servicios (codigo_paciente, id_centro_medico, id_hospitalizacion, costo_hospitalizacion, costo_total, created_at)
                    values (?, ?, ?, ?, ?, current_date + current_time)',
                    [$codigo,
                    $request->id_centro_medico,
                    $id_hospitalizacion,
                    $costo_hospitalizacion[0]->costo_dia_hospitalizacion,
                    $costo_hospitalizacion[0]->costo_dia_hospitalizacion
                    ]);

        return response()->json('Hospitalización creada!');    
    }

    
    public function edit($id_hospitalizacion)
    {
        $hospitalizacion_editar = DB::select('select * from hospitalizaciones where id_hospitalizacion = ?', [$id_hospitalizacion]); 

        return response()->json($hospitalizacion_editar[0]);    
    }

    public function show($id_hospitalizacion)
    {
        
        $hospitalizacion_ver = DB::select('select * from hospitalizaciones inner join centros_medicos on centros_medicos.id_centro_medico = hospitalizaciones.id_centro_medico 
        where id_hospitalizacion = ?', [$id_hospitalizacion]); 

        $dias_ingreso = $hospitalizacion_ver[0]->dias_ingreso;
        $costo_dia_hospitalizacion = $hospitalizacion_ver[0]->costo_dia_hospitalizacion;
        $costo_hospitalizacion = $dias_ingreso * $costo_dia_hospitalizacion;

        DB::update('update hospitalizaciones set dias_ingreso = current_date - fecha_ingreso where id_hospitalizacion = ?', [$id_hospitalizacion]);


        DB::update('update costo_servicios set costo_hospitalizacion = ? where id_hospitalizacion = ?', [$costo_hospitalizacion, $id_hospitalizacion]);

        return response()->json($hospitalizacion_ver[0]);    
    }


    public function update(Request $request, $id_hospitalizacion)
    {
      
        DB::update('update hospitalizaciones set sala = ?, camilla = ?, updated_at = current_date + current_time
                    where id_hospitalizacion = ?', 
                    [
                    $request->sala, 
                    $request->camilla, 
                    $id_hospitalizacion
                    ]);

        if($request->alta_paciente == 'Aprobada'){
            DB::update('update hospitalizaciones set fecha_alta = current_date, updated_at = current_date + current_time
            where id_hospitalizacion = ?', 
            [
            $id_hospitalizacion
            ]);
        }

        return response()->json('Hospitalización actualizada!');    
    }


    public function get_codigo($codigo)
    {
        $hospitalizaciones = DB::select('select* from hospitalizaciones where codigo_paciente = ?', [$codigo]);

        if(count($hospitalizaciones)>0)
        {
            foreach($hospitalizaciones as $hospitalizacion)
            {
                $correlativo = (int) substr($hospitalizacion->id_hospitalizacion, 8, 9) + 1;
                $id_hosp = $codigo.'H'.(string) $correlativo;

            }   
        }
        else {
            $id_hosp = $codigo.'H1';
        }
        
        return $id_hosp;
    }

    public function hospitalizacion_factura($id_hospitalizacion)
    {
        $costo_hospitalizacion = DB::select('select * from costo_servicios 
        inner join centros_medicos on centros_medicos.id_centro_medico = costo_servicios.id_centro_medico
        inner join departamentos on departamentos.id_departamento = centros_medicos.id_departamento
        inner join municipios on municipios.id_municipio = centros_medicos.id_municipio
        inner join pacientes on pacientes.codigo = costo_servicios.codigo_paciente
        inner join hospitalizaciones on hospitalizaciones.id_hospitalizacion = costo_servicios.id_hospitalizacion
        where costo_servicios.id_hospitalizacion = ?', [$id_hospitalizacion]);

        $medicamentos = DB::select('select * from recetas inner join medicamentos on medicamentos.codigo_medicamento = recetas.codigo_medicamento 
                                    where id_atencion_medica in (select id_atencion_medica from atenciones_medicas where id_hospitalizacion = ?)', [$id_hospitalizacion]);
        $tratamientos = DB::select('select * from historial_tratamientos_medicos inner join tratamientos_medicos on tratamientos_medicos.codigo_tratamiento = historial_tratamientos_medicos.codigo_tratamiento 
                                    where id_atencion_medica in (select id_atencion_medica from atenciones_medicas where id_hospitalizacion = ?)', [$id_hospitalizacion]);

        $data = [
            "costo_hospitalizacion" => $costo_hospitalizacion[0],
            "medicamentos" => $medicamentos,
            "tratamientos" => $tratamientos
        ];
        
        return response()->json($data);    
    }
}
