<?php

namespace App\Http\Controllers;

use App\Paciente;
use App\Pais;
use App\Departamento;
use App\Municipio;
use App\Genero;
use App\Http\Resources\Paciente as PacienteResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PacienteController extends Controller
{
    public function index()
    {  
       $pacientes = DB::select('select * from pacientes order by created_at desc limit 10');
       return PacienteResource::collection($pacientes);
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
        $codigo_calculado = $this->get_codigo($nombre, $apellidos);
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');

        DB::insert('insert into pacientes (codigo, identificacion, nombres, apellidos, fecha_nacimiento, estado_paciente, direccion,
                    telefono, correo, estado_civil, nombre_conyugue, apellido_conyugue, nombre_contacto_emergencia, telefono_contacto_emergencia,
                    id_genero, id_pais, id_departamento, id_municipio, created_at) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [$codigo_calculado,
                     $request->identificacion,
                     $request->nombres,
                     $request->apellidos,
                     $request->fecha_nacimiento,
                     $request->estado_paciente, 
                     $request->direccion, 
                     $request->telefono, 
                     $request->correo, 
                     $request->estado_civil, 
                     $request->nombre_conyugue, 
                     $request->apellido_conyugue, 
                     $request->nombre_contacto_emergencia, 
                     $request->telefono_contacto_emergencia, 
                     $request->id_genero, 
                     $request->id_pais, 
                     $request->id_departamento, 
                     $request->id_municipio, 
                     $fecha_actual
                    ]);
        
        return response()->json('Expediente creado!');    
    }

    public function show($codigo)
    {   
    
        $paciente = DB::select("select * from pacientes 
                                inner join generos on generos.id_genero=pacientes.id_genero
                                inner join paises on paises.id_pais=pacientes.id_pais 
                                inner join departamentos on departamentos.id_departamento=pacientes.id_departamento
                                inner join municipios on municipios.id_municipio=pacientes.id_municipio 
                                where codigo= ?", [$codigo]);

        return response()->json($paciente[0]);    
    }


    public function edit($codigo)
    {
        $paciente_editar = DB::select('select * from pacientes where codigo = ?', [$codigo]); 

        return response()->json($paciente_editar[0]);    
    }


    public function update($codigo, Request $request)
    {
        
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');
        
        DB::update('update pacientes set identificacion = ?, nombres = ?, apellidos = ?, fecha_nacimiento = ?, estado_paciente = ?, direccion = ?,
                    telefono = ?, correo = ?, estado_civil = ?, nombre_conyugue = ?, apellido_conyugue = ?, nombre_contacto_emergencia = ?, telefono_contacto_emergencia = ?,
                    id_genero = ?, id_pais = ?, id_departamento = ?, id_municipio = ?, updated_at = ?
                    where codigo = ?', 
                    [
                    $request->identificacion,
                    $request->nombres,
                    $request->apellidos,
                    $request->fecha_nacimiento,
                    $request->estado_paciente, 
                    $request->direccion, 
                    $request->telefono, 
                    $request->correo, 
                    $request->estado_civil, 
                    $request->nombre_conyugue, 
                    $request->apellido_conyugue, 
                    $request->nombre_contacto_emergencia, 
                    $request->telefono_contacto_emergencia, 
                    $request->id_genero, 
                    $request->id_pais, 
                    $request->id_departamento, 
                    $request->id_municipio, 
                    $fecha_actual,
                    $codigo
                    ]);

        return response()->json('Paciente actualizado!');    
    }

    public function buscar($param_busqueda)
    {   
        $param_busqueda = app('App\Http\Controllers\FuncionesController')->acentos($param_busqueda);
        $codigo = '%'.$param_busqueda.'%';
        $identificacion = '%'.$param_busqueda.'%';
        $nombres = '%'.$param_busqueda.'%';
        $apellidos = '%'.$param_busqueda.'%';

        $pacientes = DB::select('select * from pacientes where UNACCENT(lower(codigo)) LIKE ? or UNACCENT(lower(identificacion)) LIKE ? or UNACCENT(lower(nombres)) LIKE ? or UNACCENT(lower(apellidos)) LIKE ?', 
        [strtolower($codigo), strtolower($identificacion), strtolower($nombres), strtolower($apellidos)]);
        
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

