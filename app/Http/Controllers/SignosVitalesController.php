<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SignosVitalesController extends Controller
{   
    public function index($id_consulta, $id_hospitalizacion)
    {  
      $signos_vitales = DB::select('select * from signos_vitales inner join atenciones_medicas 
      on atenciones_medicas.id_atencion_medica = signos_vitales.id_atencion_medica
      where id_consulta = ? or id_hospitalizacion = ?', [$id_consulta, $id_hospitalizacion]);

      return response()->json($signos_vitales);  
    }

    public function store(Request $request)
    {   
        $id_atencion_medica = '';
    
        if($request->id_consulta){

          $id_atencion_medica = app('App\Http\Controllers\FuncionesController')->codigo_atencion_medica(substr($request->id_consulta, 0, 7));
          
          DB::insert('insert into atenciones_medicas (id_atencion_medica, id_consulta, id_hospitalizacion, fecha_atencion_medica, hora_atencion_medica) 
                      values (?, ?, ?, current_date, current_time)', 
                      [$id_atencion_medica,
                      $request->id_consulta, 
                      null
          ]);
        }

        if($request->id_hospitalizacion){

          $id_atencion_medica = app('App\Http\Controllers\FuncionesController')->codigo_atencion_medica(substr($request->id_hospitalizacion, 0, 7));

          DB::insert('insert into atenciones_medicas (id_atencion_medica, id_consulta, id_hospitalizacion, fecha_atencion_medica, hora_atencion_medica) 
                      values (?, ?, ?, current_date, current_time)', 
                      [$id_atencion_medica,
                      null,
                      $request->id_hospitalizacion
          ]);
        } 
          

        DB::insert('insert into signos_vitales (id_atencion_medica, presion_arterial_sistolica, presion_arterial_diastolica, peso_paciente, 
        estatura_paciente, temperatura_paciente, ritmo_cardiaco_paciente, respiracion_paciente) 
                    values (?, ?, ?, ?, ?, ?, ?, ?)', 
                    [$id_atencion_medica, 
                     $request->presion_arterial_sistolica,
                     $request->presion_arterial_diastolica,
                     $request->peso_paciente,
                     $request->estatura_paciente, 
                     $request->temperatura_paciente, 
                     $request->ritmo_cardiaco_paciente, 
                     $request->respiracion_paciente
                    ]);
        
        return response()->json('Signos vitales registrados!');    
    }

    public function graficos($id_consulta, $id_hospitalizacion)
    {  
  
      $signos = DB::select("select fecha_atencion_medica|| '  ' || to_char(hora_atencion_medica, 'HH12:MI') as fecha, estatura_paciente, presion_arterial_sistolica,  
      presion_arterial_diastolica, peso_paciente, temperatura_paciente, ritmo_cardiaco_paciente, respiracion_paciente from signos_vitales inner join atenciones_medicas 
      on atenciones_medicas.id_atencion_medica = signos_vitales.id_atencion_medica
      where atenciones_medicas.id_hospitalizacion = ? or atenciones_medicas.id_consulta = ?", [$id_hospitalizacion, $id_consulta]);

      $estatura_array = [];
      $peso_array = [];
      $presion_sistolica_array = [];
      $presion_diastolica_array = [];
      $temperatura_array = [];
      $ritmo_cardiaco_array = [];
      $respiracion_array = [];
      $fecha_array = [];


      foreach($signos as $signo){

          $estatura_array [] = $signo->estatura_paciente;
          $peso_array [] = $signo->peso_paciente;
          $presion_sistolica_array [] = $signo->presion_arterial_sistolica;
          $presion_diastolica_array [] = $signo->presion_arterial_diastolica;
          $temperatura_array [] = $signo->temperatura_paciente;
          $ritmo_cardiaco_array [] = $signo->ritmo_cardiaco_paciente;
          $respiracion_array [] = $signo->respiracion_paciente;
          $fecha_array [] = $signo->fecha;
        }

        $data = [
          "estatura_array" => $estatura_array,
          "peso_array" => $peso_array,
          "presion_diastolica_array" => $presion_diastolica_array,
          "presion_sistolica_array" => $presion_sistolica_array,
          "temperatura_array" => $temperatura_array,   
          "ritmo_cardiaco_array" => $ritmo_cardiaco_array,   
          "respiracion_array" => $respiracion_array,   
          "fecha_array" => $fecha_array,   
      ];

      return response()->json($data);  
    }
}
