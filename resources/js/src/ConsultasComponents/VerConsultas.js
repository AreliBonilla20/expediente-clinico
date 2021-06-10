import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';


import API from '../api';

const VerConsultas = () => {
    
    const { codigo } = useParams();
    const [consultas, set_consultas] =useState([]);

    useEffect(() => {
         API.consultas_paciente(codigo).then(res => {
            const result = res.data;
            set_consultas(result);
        })
      }, []);


    return(
        <section className="section">
          
        <div className="card">
            
            
            <br />
            {consultas.length == 0 &&
            <div className="card-body">
                <p>No hay consultas registradas</p>
            </div>
            }
            {consultas.length > 0 &&
            <div className="card-body">
            <h4>Consultas del paciente</h4>
            
            <br /><br />
                <table className="table table-striped" id="table1">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Fecha de consulta</th>
                            <th>Hora de consulta</th>
                            <th>Consultar</th>
                         
                        </tr>
                    </thead>
                    <tbody>
                    {consultas.map((consulta) => 
                        <tr>
                        <td>{consulta.id_consulta}</td>
                        <td>{consulta.fecha_cita}</td>
                        <td>{consulta.hora_cita}</td>
                       
                        <td>
                        <Link to={`consultas/${consulta.id_consulta}/ver`} className="btn btn-sm btn-info"><i className="bi bi-table"></i> Consultar</Link>
                        </td>
                            
                        </tr>
                    )}
                    </tbody>
                   
                </table>
            </div>
            }
        </div>
       
    </section>
    
    );
}

export default VerConsultas;