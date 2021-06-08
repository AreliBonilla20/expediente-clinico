import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import API from '../api';

const HistorialExamenes = () => {
    
    const API_URL = API.API_URL;

    var codigo;

    const {id_consulta, id_hospitalizacion} = useParams();

    if(id_hospitalizacion){
        codigo = id_hospitalizacion.substr(0,7);
    }

    if(id_consulta){
        codigo = id_consulta.substr(0,7);
    }


    const [examenes_asignados, set_examenes_asignados] = useState([]);
    
    useEffect(() => {
       
        API.historial_examenes(id_consulta, id_hospitalizacion).then(res => {
            const result = res.data;
            set_examenes_asignados(result.examenes_asignados);
        })

     }, []);


      return(
        <div className="card-body">
        <div className="card">
            <div className="card-header">
                {id_hospitalizacion &&
                <Link to={`/expedientes/${codigo}/hospitalizaciones/${id_hospitalizacion}/asignar_examenes`} className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
                }
                {id_consulta &&
                <Link to={`/expedientes/${codigo}/consultas/${id_consulta}/asignar_examenes`} className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
                }
            </div>


        {examenes_asignados.length > 0 &&
        
            <div className="table-responsive">
                <h4>Examenes asignados</h4>
            <table className="table lg">
                <thead>
                    <tr>                     
                    <th>Código examen</th>
                    <th>Nombre examen</th>
                    <th>Tipo de examen</th>
                    <th>Fecha de asignación</th>
                    <th>Hora de asignación</th>
                    <th>Agregar resultados</th>
                    <th>Ver resultado</th>
                    </tr>
                </thead>
                <tbody>
                {examenes_asignados.map((examen_asignado)=>(
                    <tr>                  
                        <td>{examen_asignado.codigo_examen}</td>
                        <td>{examen_asignado.nombre_examen}</td>
                        <td>{examen_asignado.nombre_tipo_examen}</td>
                        <td>{examen_asignado.fecha_atencion_medica}</td>
                        <td>{examen_asignado.hora_atencion_medica}</td>
                        <td>
                        <Link to={`examenes/${examen_asignado.id_atencion_medica}/agregar_resultado`} className="btn btn-sm btn-primary"><i className="bi bi-plus"></i> Agregar resultados</Link>
                        </td>
                        <td>
                        <Link to={`examenes/${examen_asignado.id_atencion_medica}/ver_resultado`} className="btn btn-sm btn-info"><i className="bi bi-table"></i> Ver resultados</Link>
                        </td>
                        
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>          
        }

      

    </div>
    </div>
    

    
    );
}


export default HistorialExamenes;