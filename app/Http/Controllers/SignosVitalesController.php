<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SignosVitalesController extends Controller
{   
    public function index($id_hospitalizacion)
    {  
      $signos_vitales = DB::select('select * from signos_vitales inner join atenciones_medicas 
      on atenciones_medicas.id_atencion_medica = signos_vitales.id_atencion_medica inner join hospitalizaciones on
      hospitalizaciones.id_hospitalizacion=atenciones_medicas.id_hospitalizacion');

      return response()->json($signos_vitales);  
    }

    public function store(Request $request, $id_hospitalizacion)
    {   
        $id_atencion_medica = app('App\Http\Controllers\FuncionesController')->codigo_atencion_medica($id_hospitalizacion);
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');

        DB::insert('insert into atenciones_medicas (id_atencion_medica, id_consulta, id_hospitalizacion, fecha_atencion_medica, hora_atencion_medica, created_at) 
                    values (?, ?, ?, ?, ?, ?)', 
                    [$id_atencion_medica, 
                     null,
                     $request->id_hospitalizacion,
                     $request->fecha_atencion_medica, 
                     $request->hora_atencion_medica, 
                     $fecha_actual
                    ]);

        DB::insert('insert into signos_vitales (id_atencion_medica, presion_arterial_sistolica, presion_arterial_diastolica, peso_paciente, 
        estatura_paciente, temperatura_paciente, ritmo_cardiaco_paciente, respiracion_paciente, created_at) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [$id_atencion_medica, 
                     $request->presion_arterial_sistolica,
                     $request->presion_arterial_diastolica,
                     $request->peso_paciente,
                     $request->estatura_paciente, 
                     $request->temperatura_paciente, 
                     $request->ritmo_cardiaco_paciente, 
                     $request->respiracion_paciente, 
                     $fecha_actual
                    ]);
        
        return response()->json('Signos vitales registrados!');    
    }

    public function graficos($id_hospitalizacion)
    {  
  
      $signos = DB::select('select fecha_atencion_medica, hora_atencion_medica, estatura_paciente, presion_arterial_sistolica,  
      presion_arterial_diastolica, peso_paciente, temperatura_paciente, ritmo_cardiaco_paciente, respiracion_paciente from signos_vitales inner join atenciones_medicas 
      on atenciones_medicas.id_atencion_medica = signos_vitales.id_atencion_medica inner join hospitalizaciones on
      hospitalizaciones.id_hospitalizacion=atenciones_medicas.id_hospitalizacion');

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
          $fecha_array [] = $signo->fecha_atencion_medica;
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
