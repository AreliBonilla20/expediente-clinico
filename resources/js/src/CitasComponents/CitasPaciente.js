import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Link,
    useParams
} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import API from '../api';

const ConsultarDiagnostico = () => {

    const [citas, set_citas] =useState([]);
    const {codigo} = useParams();
   
    useEffect(() => {
         API.citas_paciente(codigo).then(res => {
            const result = res.data;
            set_citas(result);
        })
      }, []);

    return(
       
            <div id="main-content">

                <div className="page-heading">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <h3>Citas del paciente</h3>
                                
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/citas">Consulta citas</Link>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="page-heading">
                   
                    <section className="section">
                        <div className="card">
                            
                            
                            <br />
                            {citas.length > 0 &&
                            <div className="card-body">
                    
                                <table className="table table-striped" id="table1">
                                    
                                    <thead>
                                        <tr>
                                            <th>ID cita</th>
                                            <th>Código paciente</th>
                                            <th>Fecha</th>
                                            <th>Hora</th>
                                            <th>Editar</th>
                                            <th>Consultar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {citas.map((cita) => 
                                          <tr>
                                            <td>{cita.id_cita}</td>
                                            <td>{cita.codigo_paciente}</td>
                                            <td>{cita.fecha_cita}</td>
                                            <td>{cita.hora_cita}</td>
                                           
                                            <td>
                                            <Link to={`citas/${cita.id_cita}/editar`} className="btn btn-sm btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
                                            </td>
                                            <td>
                                            <Link to={`citas/${cita.id_cita}/ver`} className="btn btn-sm btn-info"><i className="bi bi-table"></i> Consultar</Link>
                                            </td>
                                            <td>
                                            <Link to={`consultas/${cita.codigo_paciente}/${cita.id_cita}/crear`} className="btn btn-sm btn-success"><i className="bi bi-play"></i> Iniciar consulta</Link>
                                            </td>
                                             
                                          </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                            }
                        </div>
                    </section>
            </div>
            </div>   
            </div>

    );
}

export default ConsultarDiagnostico;