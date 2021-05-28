<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FuncionesController extends Controller
{
    public function acentos($cadena){
        
		$cadena = str_replace(
        array('Á', 'À', 'Â', 'Ä', 'á', 'à', 'ä', 'â', 'ª'),
        array('A', 'A', 'A', 'A', 'a', 'a', 'a', 'a', 'a'),
        $cadena);
       
        $cadena = str_replace(
        array('É', 'È', 'Ê', 'Ë', 'é', 'è', 'ë', 'ê'),
        array('E', 'E', 'E', 'E', 'e', 'e', 'e', 'e'),
        $cadena );
     
        $cadena = str_replace(
        array('Í', 'Ì', 'Ï', 'Î', 'í', 'ì', 'ï', 'î'),
        array('I', 'I', 'I', 'I', 'i', 'i', 'i', 'i'),
        $cadena );
      
        $cadena = str_replace(
        array('Ó', 'Ò', 'Ö', 'Ô', 'ó', 'ò', 'ö', 'ô'),
        array('O', 'O', 'O', 'O', 'o', 'o', 'o', 'o'),
        $cadena );
       
        $cadena = str_replace(
        array('Ú', 'Ù', 'Û', 'Ü', 'ú', 'ù', 'ü', 'û'),
        array('U', 'U', 'U', 'U', 'u', 'u', 'u', 'u'),
        $cadena );

        return $cadena;
    }

    public function get_codigo($nombre, $apellidos)
    {
        $nombre_inicial = strtoupper(substr($nombre, 0, 1));
        $apellido_inicial = strtoupper(substr($apellidos, 0, 1));
        $anyo = substr((string) date("Y"), 2, 2);
        $cod = $nombre_inicial.$apellido_inicial.$anyo;
        
        $pacientes = DB::select('select * from pacientes');
        
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

    public function get_id_empleado($nombre, $apellidos)
    {
        $nombre_inicial = strtoupper(substr($nombre, 0, 1));
        $apellido_inicial = strtoupper(substr($apellidos, 0, 1));
        $anyo = substr((string) date("Y"), 2, 2);
        $cod = 'E-'.$nombre_inicial.$apellido_inicial.$anyo;
        
        $empleados = DB::select('select * from empleados');
        
        if(count($empleados)>0){
            foreach($empleados as $empleado){
                if(substr($empleado->id_empleado, 0, 5)===$cod){
                    $numeracion = (int)substr($empleado->id_empleado, 4, 3);
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

        $cod = 'E-'.$nombre_inicial.$apellido_inicial.$anyo.$correlativo;

        return $cod;
    }

    public function codigo_atencion_medica($id_hospitalizacion)
    {   
        $cont = 0;
        $codigo = substr($id_hospitalizacion, 0, 7);
        $atenciones_medicas = DB::select('select* from atenciones_medicas');

        if(count($atenciones_medicas)>0)
        {
            foreach($atenciones_medicas as $atencion_medica)
            {
                if(substr($atencion_medica->id_atencion_medica, 0, 7) == $codigo)
                $cont++;    
            }   

            $correlativo = (string) $cont + 1;
            $id_atencion = $codigo.'A'.$correlativo;
        }
        else {
            $id_atencion = $codigo.'A1';
        }
        
        return $id_atencion;
    }

    public function id_quirofano($id_centro_medico)
    {   
        $cont = 0;
        $quirofanos = DB::select('select* from quirofanos');

        if(count($quirofanos)>0)
        {
            foreach($quirofanos as $quirofano)
            {
                if($quirofano->id_centro_medico == $id_centro_medico)
                $cont++;    
            }   

            $correlativo = (string) $cont + 1;
            $id_quirofano = $id_centro_medico.'Q'.$correlativo;
        }
        else {
            $id_quirofano = $id_centro_medico.'Q1';
        }
        
        return $id_quirofano;
    }

    public function get_id_doctor()
    {   
        $cont = 0;
      
        $doctores = DB::select('select * from doctores');

        if(count($doctores)>0)
        {
            $cont = count($doctores);
            $correlativo = $cont + 1;
            $id_doc = 'DOC-0'.$correlativo;
        }
        else {
            $id_doc = 'DOC-01';
        }
        
        return $id_doc;
    }

    
}
