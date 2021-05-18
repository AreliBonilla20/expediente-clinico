<?php

namespace App\Http\Controllers;

use App\CentroMedico;
use App\Pais;
use App\Departamento;
use App\Municipio;
use App\TipoCentroMedico;
use App\Http\Resources\CentroMedico as CentroMedicoResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CentroMedicoController extends Controller
{
    public function index()
    {  
       $centros_medicos = DB::select('select * from centros_medicos order by created_at desc limit 10');
       return CentroMedicoResource::collection($centros_medicos);
      
    }


    public function create()
    {
        $paises = DB::select('select * from paises order by nombre_pais asc');
        $departamentos = DB::select('select * from departamentos order by nombre_departamento asc');
        $municipios = DB::select('select * from municipios order by nombre_municipio asc');
        $tipos_centros_medicos = DB::select('select * from tipo_centro_medico order by tipo_centro_medico asc');
        
        $data = [
            "tipos_centros_medicos" => $tipos_centros_medicos,
            "paises" => $paises,
            "departamentos" => $departamentos,
            "municipios" => $municipios,   
        ];

        return response()->json($data);    
    }



    public function store(Request $request)
    {   
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');

        DB::insert('insert into centros_medicos (id_centro_medico, nombre_centro_medico, direccion_centro_medico, director, telefono_director, correo_director, telefono1_centro_medico,
        telefono2_centro_medico, correo_centro_medico, tiempo_consulta_medica, id_tipo_centro_medico, id_pais, id_departamento, id_municipio, created_at) 
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                [
                 $request->id_centro_medico,
                 $request->nombre_centro_medico,
                 $request->direccion_centro_medico,
                 $request->director,
                 $request->telefono_director, 
                 $request->correo_director, 
                 $request->telefono1_centro_medico, 
                 $request->telefono2_centro_medico, 
                 $request->correo_centro_medico, 
                 $request->tiempo_consulta_medica, 
                 $request->id_tipo_centro_medico, 
                 $request->id_pais, 
                 $request->id_departamento, 
                 $request->id_municipio, 
                 $fecha_actual
                ]);
        
        return response()->json('Centro médico creado!');    
    }
    
    public function show($codigo)
    {   
    
        $centro_medico = DB::select("select * from centros_medicos 
                    inner join tipo_centro_medico on tipo_centro_medico.id_tipo_centro_medico=centros_medicos.id_tipo_centro_medico
                    inner join paises on paises.id_pais=centros_medicos.id_pais 
                    inner join departamentos on departamentos.id_departamento=centros_medicos.id_departamento
                    inner join municipios on municipios.id_municipio=centros_medicos.id_municipio 
                    where id_centro_medico = ? ", [$codigo]);

        return response()->json($centro_medico[0]);    
    }

    public function edit($codigo)
    {
        $centro_medico_editar = DB::select('select * from centros_medicos where id_centro_medico = ?', [$codigo]); 

        return response()->json($centro_medico_editar[0]);    
    }


    public function update($codigo, Request $request)
    {
        $fecha_actual = date_create('now')->format('Y-m-d H:i:s');

        DB::update('update centros_medicos set id_centro_medico = ?, nombre_centro_medico = ?, direccion_centro_medico = ?, director = ?, telefono_director = ?, correo_director = ?, telefono1_centro_medico = ?,
                    telefono2_centro_medico = ?, correo_centro_medico = ?, tiempo_consulta_medica = ?, id_tipo_centro_medico = ?, id_pais = ?, id_departamento = ?, id_municipio = ?, created_at = ? 
                    where id_centro_medico = ?', 
                                [
                                 $request->id_centro_medico,
                                 $request->nombre_centro_medico,
                                 $request->direccion_centro_medico,
                                 $request->director,
                                 $request->telefono_director, 
                                 $request->correo_director, 
                                 $request->telefono1_centro_medico, 
                                 $request->telefono2_centro_medico, 
                                 $request->correo_centro_medico, 
                                 $request->tiempo_consulta_medica, 
                                 $request->id_tipo_centro_medico, 
                                 $request->id_pais, 
                                 $request->id_departamento, 
                                 $request->id_municipio, 
                                 $fecha_actual,
                                 $codigo
                                ]);


        return response()->json('Centro médico actualizado!');    
    }

    public function buscar($param_busqueda)
    {
        $param_busqueda = app('App\Http\Controllers\FuncionesController')->acentos($param_busqueda);
        $id = '%'.$param_busqueda.'%';
        $nombre = '%'.$param_busqueda.'%';
       

        $centros_medicos = DB::select('select * from centros_medicos where UNACCENT(lower(id_centro_medico)) LIKE ? or UNACCENT(lower(nombre_centro_medico)) LIKE ?', 
        [strtolower($id), strtolower($nombre)]);

        return CentroMedicoResource::collection($centros_medicos);

    }
}
