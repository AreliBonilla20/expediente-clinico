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


const HistorialCirugias = () => {
    
    const API_URL = API.API_URL;

    var codigo;

    const {id_consulta, id_hospitalizacion} = useParams();

    if(id_hospitalizacion){
        codigo = id_hospitalizacion.substr(0,7);
    }

    if(id_consulta){
        codigo = id_consulta.substr(0,7);
    }

    const [historial_cirugias, set_historial_cirugias] = useState([]);

    useEffect(() => {
       
        API.historial_cirugias(id_consulta, id_hospitalizacion).then(res => {
            const result = res.data;
            set_historial_cirugias(result);
        })

     }, []);

    

      return(
        <div className="card-body">
        <div className="card">
            <div className="card-header">
                {id_hospitalizacion &&
                <Link to={`/expedientes/${codigo}/hospitalizaciones/${id_hospitalizacion}/asignar_cirugia`} className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
                }
                {id_consulta &&
                <Link to={`/expedientes/${codigo}/consultas/${id_consulta}/asignar_cirugia`} className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
                }
            </div>

        {historial_cirugias.length > 0 &&
        <section className="section">
            <br />
        <h4>Historial de diagnósticos</h4>
        <div className="card">
        <div className="card-content">
        {historial_cirugias.map((cirugia, i) =>
            <div className="card-body">
                 <div className="alert alert-secondary">
                    <h4 className="alert-heading">Cirugía {i + 1 } : {cirugia.codigo_cirugia} - {cirugia.nombre_cirugia} </h4>
                    <h6>Emisión : {cirugia.fecha_atencion_medica} - {cirugia.hora_atencion_medica}</h6>
                 </div>
              
                 <p><b>Descripción: </b>{cirugia.descripcion_cirugia}</p>
                 <p><b>Hora: </b>{cirugia.hora_cirugia}</p>
                 <p><b>Estado: </b>{cirugia.estado_cirugia}</p>

                 <div className="col-12 d-flex justify-content-end">
                    <Link to={`/editar`} className="btn btn-sm btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
                </div>  

 
                <p className="card-footer" style={{fontWeight: "bold"}}>Prescrita por: </p>

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


export default HistorialCirugias;