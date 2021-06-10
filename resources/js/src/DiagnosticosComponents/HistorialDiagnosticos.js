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

     function cambiar_estado(){
        try {
          const body = { codigo_diagnostico };
          const response = fetch(`${API_URL}/historial_diagnosticos/${codigo_diagnostico}/actualizar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          if(id_hospitalizacion !== 'null'){
            const codigo = id_hospitalizacion.substring(0,7);
            window.location = `/expedientes/${codigo}/hospitalizaciones/${id_hospitalizacion}/ver`;
          }
    
          if(id_consulta !== 'null'){
            const codigo = id_consulta.substring(0,7);
            window.location = `/expedientes/${codigo}/consultas/${id_consulta}/ver`;
          }
          if(response.status === 200){
            swal({
                title: "Éxito",
                text: "Estado del diagnóstico actualizado!",
                icon: "success",
                button: "Aceptar",
              });
          }
          else{
            swal({
                title: "Error",
                text: "Ocurrió un error!",
                icon: "danger",
                button: "Aceptar",
              });
          }
          
        } catch (err) {
          console.error(err.message);
        }
      };
    

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
                    <p><b>Clasificación: </b>{diagnostico.tipo_diagnostico}</p>
                    <p><b>Observaciones: </b>{diagnostico.observaciones_diagnostico}</p>
                    <p><b>Indicaciones: </b>{diagnostico.indicaciones_diagnostico}</p>
                    {diagnostico.estado_diagnostico == 'Vigente' &&
                    <p><b>Estado diagnóstico: </b><span class="badge bg-light-success">{diagnostico.estado_diagnostico}</span></p>
                    }
                    {diagnostico.estado_diagnostico == 'Superado' &&
                    <p><b>Estado diagnóstico: </b><span class="badge bg-light-danger">{diagnostico.estado_diagnostico}</span></p>
                    }
                </p>
 
                <p className="card-footer" style={{fontWeight: "bold"}}>Diagnosticado por: </p>

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


export default HistorialDiagnosticos;