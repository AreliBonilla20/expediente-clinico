import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import API from '../api';


const HistorialTratamientos = () => {
    
    const API_URL = API.API_URL;

    const {id_consulta, id_hospitalizacion} = useParams();

    var codigo;

    if(id_hospitalizacion){
        codigo = id_hospitalizacion.substr(0,7);
    }

    if(id_consulta){
        codigo = id_consulta.substr(0,7);
    }

    const [historial_tratamientos, set_historial_tratamientos] = useState([]);

    useEffect(() => {
       
        API.historial_tratamientos(id_consulta, id_hospitalizacion).then(res => {
            const result = res.data;
            set_historial_tratamientos(result);
        })

     }, []);

    
    
      return(
        <div className="card-body">
        <div className="card">
            <div className="card-header">
            {id_hospitalizacion &&
                <Link to={`/expedientes/${codigo}/hospitalizaciones/${id_hospitalizacion}/asignar_tratamientos`} className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
                }
                {id_consulta &&
                <Link to={`/expedientes/${codigo}/consultas/${id_consulta}/asignar_tratamientos`} className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
                }
            </div>
        {historial_tratamientos.length > 0 &&
        <section className="section">
            <br />
        <h4>Historial de medicamentos</h4>
        <div className="card">
        <div className="card-content">
        {historial_tratamientos.map((tratamiento, i) =>
            <div className="card-body">
                 <div className="alert alert-secondary">
                    <h4 className="alert-heading">tratamiento {i + 1 } : {tratamiento.codigo_tratamiento} - {tratamiento.nombre_tratamiento} </h4>
                    <h6>Emisión : {tratamiento.fecha_atencion_medica} - {tratamiento.hora_atencion_medica}</h6>
                 </div>
              
                <p className="card-text">
                    <p>Clasificación: {tratamiento.tipo_tratamiento}</p>
                    <p>Descripción: {tratamiento.descripcion_tratamiento}</p>
                    <p>Indicaciones: {tratamiento.indicaciones_tratamiento}</p>
                </p>
           
                <p className="card-footer" style={{fontWeight: "bold"}}>Realizado por: </p>
            </div>
        )}
   
        <hr />
        </div>
    
      
    </div>

     </section>
     }

    </div>
    </div>
    

    
    );
}


export default HistorialTratamientos;