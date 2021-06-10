import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import {useParams} from 'react-router-dom';


import API from '../api';

const ConsultarChequeoHospitalizacion = () => {
    
    const { id_hospitalizacion } = useParams();

    const [chequeos, setChequeos] = useState([]);

    useEffect(() => {
         API.chequeos(id_hospitalizacion).then(res => {
            const result = res.data;
            setChequeos(result.data);
        })
      }, []);


    return(

        <section className="section">
        <br />
        <h4>Historial de chequeos</h4>
        <div className="card">
        <div className="card-content">
        {chequeos.map((chequeo, i) =>
            <div className="card-body">
                <div className="alert alert-secondary">
                    <h4 className="alert-heading">Chequeo {i + 1 } </h4>
                    <h6>Fecha: {chequeo.fecha_atencion_medica} Hora: {chequeo.hora_atencion_medica}</h6>
                </div>
            
                <p className="card-text">
                    <p>Sintomatología: {chequeo.sintomas_chequeo}</p>
                    <p>Observaciones: {chequeo.observacion_chequeo}</p>
                </p>
        
                <p className="card-footer" style={{fontWeight: "bold"}}>Realizado por: </p>
            </div>
        )}

        <hr />
    </div>

  
</div>

 </section>
        
   
        
    );
}

export default ConsultarChequeoHospitalizacion;