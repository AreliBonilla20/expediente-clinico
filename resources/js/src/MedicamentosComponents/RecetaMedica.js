import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import API from '../api';


const RecetaMedica = () => {
    
    const API_URL = API.API_URL;

    const {id_consulta, id_hospitalizacion} = useParams();

    var codigo;

    if(id_hospitalizacion){
        codigo = id_hospitalizacion.substr(0,7);
    }

    if(id_consulta){
        codigo = id_consulta.substr(0,7);
    }

    const [receta_medica, set_receta_medica] = useState([]);
   

    useEffect(() => {
       
        API.recetas_medicas(id_consulta, id_hospitalizacion).then(res => {
            const result = res.data;
            set_receta_medica(result);
        })

     }, []);

    
      return(
        <div className="card-body">
        <div className="card">
            <div className="card-header">
                {id_hospitalizacion &&
                <Link to={`/expedientes/${codigo}/hospitalizaciones/${id_hospitalizacion}/asignar_receta_medica`} className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
                }
                {id_consulta &&
                <Link to={`/expedientes/${codigo}/consultas/${id_consulta}/asignar_receta_medica`} className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
                }
            </div>
        {receta_medica.length > 0 &&
        <section className="section">
            <br />
        <h4>Historial de medicamentos</h4>
        <div className="card">
        <div className="card-content">
        {receta_medica.map((medicamento, i) =>
            <div className="card-body">
                 <div className="alert alert-secondary">
                    <h4 className="alert-heading">Medicamento {i + 1 } : {medicamento.codigo_medicamento} - {medicamento.nombre_medicamento} </h4>
                    <h6>Emisión : {medicamento.fecha_atencion_medica} - {medicamento.hora_atencion_medica}</h6>
                 </div>
              
                <p className="card-text">
                    <p><b>Clasificación: </b>{medicamento.tipo_medicamento}</p>
                    <p><b>Administración: </b>{medicamento.via_administracion}</p>
                    <p><b>Dósis: </b>{medicamento.dosis_medicamento}</p>
                    <p><b>Indicaciones: </b>{medicamento.indicaciones_medicamento}</p>
                    {medicamento.estado_medicamento == 'Vigente' &&
                    <p><b>Estado medicamento: </b><span class="badge bg-light-success">{medicamento.estado_medicamento}</span></p>
                    }
                    {medicamento.estado_medicamento == 'Suspendido' &&
                    <p><b>Estado medicamento: </b><span class="badge bg-light-danger">{medicamento.estado_medicamento}</span></p>
                    }
                </p>
           
                <p className="card-footer" style={{fontWeight: "bold"}}>Prescrito por: </p>
            </div>
        )}
   
       
        </div>
    
      
    </div>

     </section>
      }

    </div>
    </div>
    

    
    );
}


export default RecetaMedica;