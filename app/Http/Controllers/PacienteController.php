<?php

namespace App\Http\Controllers;

use App\Paciente;
use App\Pais;
use App\Departamento;
use App\Municipio;
use App\Genero;
use App\Http\Resources\Paciente as PacienteResource;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    public function index()
    {  
       return PacienteResource::collection(Paciente::all());
    }

    public function create()
    {
        $paises = Pais::all();
        $departamentos = Departamento::all();
        $municipios = Municipio::all();
        $generos = Genero::all();
        
        $data = [
            "generos" => $generos,
            "paises" => $paises,
            "departamentos" => $departamentos,
            "municipios" => $municipios,   
        ];

        return response()->json($data);    
    }


    public function store(Request $request)
    {   
        $nombre = $request->nombres;
        $apellidos = $request->apellidos;
        $codigo = $this->get_codigo($nombre, $apellidos);
        

        $paciente = new Paciente();
        $paciente->codigo = $codigo;
        $paciente->identificacion = $request->identificacion;
        $paciente->nombres = $request->nombres;
        $paciente->apellidos = $request->apellidos;
        $paciente->fecha_nacimiento = $request->fecha_nacimiento;
        $paciente->direccion = $request->direccion;
        $paciente->telefono = $request->telefono;
        $paciente->correo = $request->correo;
        $paciente->estado_civil = $request->estado_civil;
        $paciente->nombre_conyugue = $request->nombre_conyugue;
        $paciente->apellido_conyugue = $request->apellido_conyugue;
        $paciente->nombre_contacto_emergencia = $request->nombre_contacto_emergencia;
        $paciente->telefono_contacto_emergencia = $request->telefono_contacto_emergencia;
        $paciente->id_genero = $request->id_genero;
        $paciente->id_pais = $request->id_pais;
        $paciente->id_municipio = $request->id_municipio;
        $paciente->id_departamento = $request->id_departamento;


        
        
        $paciente->save();
        
        return response()->json($request);    
    }

    public function edit()
    {
          
    }

    public function update(Request $request)
    {
         
    }


        

    public function get_codigo($nombre, $apellidos)
    {
        $nombre_inicial = strtoupper(substr($nombre, 0, 1));
        $apellido_inicial = strtoupper(substr($apellidos, 0, 1));
        $anyo = substr((string) date("Y"), 2, 2);
        $cod = $nombre_inicial.$apellido_inicial.$anyo;
        
        $pacientes = Paciente::all();
        
        if(count($pacientes)>0){
            foreach($pacientes as $paciente){
                if(substr($paciente->codigo, 0, 4)===$cod){
                    $numeracion = (int)substr($paciente->codigo, 4, 3);
                    $correlativo = (string) $numeracion + 1; 
                    
                    if(strlen($correlativo)===1){
                        $correlativo = '00'.$correlativo;
                    }
                    if(strlen($correlativo)===2){
                        $correlativo = '0'.$correlativo;
                    }
                }
                else{
                    $correlativo = '001';
                }
            }
        }
        else{
            $correlativo = '001';
        }

        $cod = $nombre_inicial.$apellido_inicial.$anyo.$correlativo;

        return $cod;
    }
}

