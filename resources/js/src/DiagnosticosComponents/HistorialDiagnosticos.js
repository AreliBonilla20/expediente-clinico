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

    const {id_hospitalizacion} = useParams();

    const codigo = id_hospitalizacion.substr(0,7);

    const [historial_diagnosticos, setHistorial_diagnosticos] = useState([]);
   

   

    useEffect(() => {
       
        API.historial_diagnosticos(id_hospitalizacion).then(res => {
            const result = res.data;
            setHistorial_diagnosticos(result);
        })

     }, []);

    
    
      return(
        <div className="card-body">
        <div className="card">
            <div className="card-header">
                <Link to={`/expedientes/${codigo}/hospitalizaciones/${id_hospitalizacion}/asignar_diagnosticos`} className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
            </div>
        <section className="section">
            <br />
        <h4>Historial de diagnósticos</h4>
        <div className="card">
        <div className="card-content">
        {historial_diagnosticos.map((diagnostico, i) =>
            <div className="card-body">
                 <div className="alert alert-secondary">
                    <h4 className="alert-heading">Diagnóstico {i + 1 } : {diagnostico.codigo_diagnostico} - {diagnostico.nombre_diagnostico} </h4>
                    <h6>Fecha: {diagnostico.fecha_atencion_medica} Hora: {diagnostico.hora_atencion_medica}</h6>
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

    </div>
    </div>
    

    
    );
}


export default HistorialDiagnosticos;