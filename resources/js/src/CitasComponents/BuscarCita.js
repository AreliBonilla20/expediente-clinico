import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import {useParams} from 'react-router-dom';
import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import API from '../api';


const BuscarDiagnostico = () => {
    
    const { param_busqueda } = useParams();
    const [citas, set_citas] =useState([]);

    useEffect(() => {
        API.citas_buscar(param_busqueda).then(res => {
           const result = res.data;
           set_citas(result);
             
       })
     }, []);

    return(
        <div id="app">
        <Menu />
        <div id="main" className='layout-navbar'>
        <Header />
            <div id="main-content">

                <div className="page-heading">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <h3>Citas</h3>
                               
                                <p className="text-subtitle text-muted">Búsqueda</p>
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
                            <div className="card-header">
                                <Link to="/citas" className="btn btn-secondary"><i className="bi bi-arrow-left"></i> Regresar </Link>
                            </div>
                            
                            <br />
                            {citas.length > 0 &&
                            <div className="card-body">
                            <h4>Resultados </h4>
                            <p>Citas encontradas</p>
                            

                            <table className="table table-striped" id="table1">
                                    
                                    <thead>
                                        <tr>
                                            <th>ID cita</th>
                                            <th>Código paciente</th>
                                            <th>Paciente</th>
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
                                            <td>{cita.nombres} {cita.apellidos}</td>
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
                            {citas.length == 0 &&
                               <div className="card-body">
                                   <hr />
                                   <p>No se encontaron resultados</p>
                               </div>
                            }
                        </div>
                    </section>
            </div>
            </div>   
            </div>
        </div>
        <Footer />
    </div>
    );
}

export default BuscarDiagnostico;