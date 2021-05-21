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

    
}
