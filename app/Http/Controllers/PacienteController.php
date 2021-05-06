<?php

namespace App\Http\Controllers;

use App\Paciente;
use App\Pais;
use App\Departamento;
use App\Municipio;
use App\Genero;
use App\Http\Resources\Paciente as PacienteResource;
use Illuminate\Http\Request;
use App\Http\Requests\PacienteRequest;

use Illuminate\Support\Facades\DB;

class PacienteController extends Controller
{
    public function index()
    {  
       return PacienteResource::collection(Paciente::orderBy('created_at', 'desc')->paginate(15));
      
    }


    public function create()
    {
        $paises = DB::select('select * from paises order by nombre_pais asc');
        $departamentos = DB::select('select * from departamentos order by nombre_departamento asc');
        $municipios = DB::select('select * from municipios order by nombre_municipio asc');
        $generos = DB::select('select * from generos order by genero asc');
        
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
        $paciente->estado_paciente = $request->estado_paciente;
        $paciente->telefono_contacto_emergencia = $request->telefono_contacto_emergencia;
        $paciente->id_genero = $request->id_genero;
        $paciente->id_pais = $request->id_pais;
        $paciente->id_municipio = $request->id_municipio;
        $paciente->id_departamento = $request->id_departamento;

        $paciente->save();
        
        return response()->json($request);    
    }


    public function edit($codigo)
    {
        $paciente_editar = DB::select('select * from pacientes where codigo = ?', [$codigo]); 

        return response()->json($paciente_editar[0]);    
    }


    public function update($codigo, Request $request)
    {
        $paciente_editar = Paciente::findOrFail($codigo);

        $paciente_editar->codigo = $codigo;
        $paciente_editar->identificacion = $request->identificacion;
        $paciente_editar->nombres = $request->nombres;
        $paciente_editar->apellidos = $request->apellidos;
        $paciente_editar->fecha_nacimiento = $request->fecha_nacimiento;
        $paciente_editar->direccion = $request->direccion;
        $paciente_editar->telefono = $request->telefono;
        $paciente_editar->correo = $request->correo;
        $paciente_editar->estado_civil = $request->estado_civil;
        $paciente_editar->nombre_conyugue = $request->nombre_conyugue;
        $paciente_editar->apellido_conyugue = $request->apellido_conyugue;
        $paciente_editar->nombre_contacto_emergencia = $request->nombre_contacto_emergencia;
        $paciente_editar->estado_paciente = $request->estado_paciente;
        $paciente_editar->telefono_contacto_emergencia = $request->telefono_contacto_emergencia;
        $paciente_editar->id_genero = $request->id_genero;
        $paciente_editar->id_pais = $request->id_pais;
        $paciente_editar->id_municipio = $request->id_municipio;
        $paciente_editar->id_departamento = $request->id_departamento;

        $paciente_editar->save();

        return response()->json('Paciente actualizado!');    
    }

    public function buscar($param_busqueda)
    {
        
        $pacientes = DB::select("select * from pacientes where lower(codigo) = ? or lower(identificacion) = ? or lower(nombres) LIKE ? or lower(apellidos) LIKE ?", 
        [strtolower($param_busqueda), strtolower($param_busqueda), strtolower($param_busqueda), strtolower($param_busqueda)]);
        
        return PacienteResource::collection($pacientes);

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

