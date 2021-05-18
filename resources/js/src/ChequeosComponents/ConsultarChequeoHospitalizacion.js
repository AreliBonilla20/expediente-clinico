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

        <div className="card">
        <div className="card-content">
        {chequeos.map((chequeo) =>
            <div className="card-body">
                <h4 className="card-title">Chequeo - {chequeo.id_chequeo_hospitalizacion}</h4>
                <h6>Fecha: {chequeo.fecha_chequeo}</h6>
                <h6>Hora: {chequeo.hora_chequeo}</h6>
                <p className="card-text">
                    {chequeo.observacion_chequeo}
                </p>

                <span>Realizado por: </span>
            </div>
        )}
   
        <hr />
        </div>
    
      
    </div>
        
   
        
    );
}

export default ConsultarChequeoHospitalizacion;