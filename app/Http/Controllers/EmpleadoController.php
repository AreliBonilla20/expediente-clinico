<?php

namespace App\Http\Controllers;

use App\Empleado;
use App\Http\Resources\Empleado as EmpleadoResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmpleadoController extends Controller
{
    public function index()
    {  
       $empleados = DB::select('select * from empleados order by id_empleado');
       return EmpleadoResource::collection($empleados);
      
    }


    public function create()
    {
        $tipo_personal = DB::select('select * from tipo_personal order by tipo_personal asc');
        $paises = DB::select('select * from paises order by nombre_pais asc');
        $departamentos = DB::select('select * from departamentos order by nombre_departamento asc');
        $municipios = DB::select('select * from municipios order by nombre_municipio asc');
        $generos = DB::select('select * from generos order by genero asc');
        $centros_medicos = DB::select('select * from centros_medicos order by centros_medicos asc');
        
        $data = [
            "tipo_personal" => $tipo_personal,
            "paises" => $paises,
            "departamentos" => $departamentos,
            "municipios" => $municipios,
            "generos" => $generos,
            "centros_medicos" => $centros_medicos,   
        ];

        return response()->json($data);    
    }


    public function store(Request $request)
    {   
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');

        DB::insert('insert into empleados (id_empleado, id_genero, id_tipo_personal, id_centro_medico, id_pais, id_departamento, id_municipio, 
                    nombre_empleado, apellido_empleado, identificacion_empleado, fecha_nacimiento_empleado, direccion_empleado, telefono_empleado, 
                    correo_empleado, cargo_empleado, created_at) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [   
                        $request->id_empleado,
                        $request->id_genero,
                        $request->id_tipo_personal,
                        $request->id_centro_medico,
                        $request->id_pais, 
                        $request->id_departamento, 
                        $request->id_municipio, 
                        $request->nombre_empleado, 
                        $request->apellido_empleado, 
                        $request->identificacion_empleado, 
                        $request->fecha_nacimiento_empleado, 
                        $request->direccion_empleado, 
                        $request->telefono_empleado, 
                        $request->correo_empleado,
                        $request->cargo_empleado, 
                        $fecha_actual
                    ]);
        
        return response()->json('Empleado creado!');    
    }

    public function show($id_empleado)
    {   
    
        $empleado = DB::select("select * from empleados 
                                    inner join generos on generos.id_genero=empleados.id_genero
                                    inner join tipo_personal on tipo_personal.id_tipo_personal=empleados.id_tipo_personal
                                    inner join centros_medicos on centros_medicos.id_centro_medico=empleados.id_centro_medico
                                    inner join paises on paises.id_pais=empleados.id_pais 
                                    inner join departamentos on departamentos.id_departamento=empleados.id_departamento
                                    inner join municipios on municipios.id_municipio=empleados.id_municipio 
                                    where codigo= ?", [$id_empleado]);

        return response()->json($empleado[0]);    
    }

    public function edit($id_empleado)
    {
        $empleado_editar = DB::select('select * from empleados where id_empleado = ?', [$id_empleado]); 

        return response()->json($empleado_editar[0]);    
    }

    public function update($id_empleado, Request $request)
    {
        
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');
        
        DB::update('update empleados set id_empleado = ?, id_genero = ?, id_tipo_personal = ?, id_centro_medico = ?, id_pais = ?, id_departamento = ?,
                    id_municipio = ?, nombre_empleado = ?, apellido_empleado = ?, identificacion_empleado = ?, fecha_nacimiento_empleado = ?, direccion_empleado = ?, telefono_empleado = ?,
                    correo_empleado = ?, cargo_empleado = ?, updated_at = ? where id_empleado = ?',
                    [
                    $request->id_empleado,
                    $request->id_genero,
                    $request->id_tipo_personal,
                    $request->id_centro_medico,
                    $request->id_pais, 
                    $request->id_departamento, 
                    $request->id_municipio, 
                    $request->nombre_empleado, 
                    $request->apellido_empleado, 
                    $request->identificacion_empleado, 
                    $request->fecha_nacimiento_empleado, 
                    $request->direccion_empleado, 
                    $request->telefono_empleado, 
                    $request->correo_empleado, 
                    $request->cargo_empleado,
                    $fecha_actual,
                    $id_empleado
                    ]);

        return response()->json('Empleado actualizado!');    
    }

    public function buscar($param_busqueda)
    {   
        $param_busqueda = app('App\Http\Controllers\FuncionesController')->acentos($param_busqueda);
        $id_empleado = '%'.$param_busqueda.'%';
        $nombre_empleado = '%'.$param_busqueda.'%';
        $apellido_empleado = '%'.$param_busqueda.'%';

        $empleados = DB::select('select * from empleados where UNACCENT(lower(id_empleado)) LIKE ? or UNACCENT(lower(nombre_empleado)) LIKE ? or UNACCENT(lower(apellido_empleado)) LIKE ?', 
        [strtolower($id_empleado), strtolower($nombre_empleado), strtolower($apellido_empleado)]);
        
        return EmpleadoResource::collection($empleados);

    }
}
