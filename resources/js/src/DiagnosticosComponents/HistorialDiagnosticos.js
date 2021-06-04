import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import API from '../api';


const HistorialDiagnosticos = () => {
    
    const API_URL = API.API_URL;

    var codigo;

    const {id_consulta, id_hospitalizacion} = useParams();

    if(id_hospitalizacion){
        codigo = id_hospitalizacion.substr(0,7);
    }

    if(id_consulta){
        codigo = id_consulta.substr(0,7);
    }

   

    const [historial_diagnosticos, setHistorial_diagnosticos] = useState([]);

    useEffect(() => {
       
        API.historial_diagnosticos(id_consulta, id_hospitalizacion).then(res => {
            const result = res.data;
            setHistorial_diagnosticos(result);
        })

     }, []);


      return(
        <div className="card-body">
        <div className="card">
            <div className="card-header">
                {id_hospitalizacion &&
                <Link to={`/expedientes/${codigo}/hospitalizaciones/${id_hospitalizacion}/asignar_diagnosticos`} className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
                }
                {id_consulta &&
                <Link to={`/expedientes/${codigo}/consultas/${id_consulta}/asignar_diagnosticos`} className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
                }
            </div>

        {historial_diagnosticos.length > 0 &&
        <section className="section">
            <br />
        <h4>Historial de diagnósticos</h4>
        <div className="card">
        <div className="card-content">
        {historial_diagnosticos.map((diagnostico, i) =>
            <div className="card-body">
                 <div className="alert alert-secondary">
                    <h4 className="alert-heading">Diagnóstico {i + 1 } : {diagnostico.codigo_diagnostico} - {diagnostico.nombre_diagnostico} </h4>
                    <h6>Emisión : {diagnostico.fecha_atencion_medica} - {diagnostico.hora_atencion_medica}</h6>
                 </div>
              
                <p className="card-text">
                    <p>Clasificación: {diagnostico.tipo_diagnostico}</p>
                    <p>Observaciones: {diagnostico.observaciones_diagnostico}</p>
                    <p>Indicaciones: {diagnostico.indicaciones_diagnostico}</p> 
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


export default HistorialDiagnosticos;