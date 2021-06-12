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
    const [cirugias, set_cirugias] =useState([]);

    useEffect(() => {
        API.cirugias_buscar(param_busqueda) .then(res => {
           const result = res.data;
           set_cirugias(result.data);
             
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
                                <h3>Cirugías</h3>
                               
                                <p className="text-subtitle text-muted">Búsqueda</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/cirugias">Consulta cirugías</Link>
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
                                <Link to="/cirugias" className="btn btn-secondary"><i className="bi bi-arrow-left"></i> Regresar </Link>
                            </div>
                            
                            <br />
                            {cirugias.length > 0 &&
                            <div className="card-body">
                            <h4>Resultados </h4>
                            <p>Cirugías encontradas</p>
                            

                            <table className="table table-striped" id="table1">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Cirugía</th>
                                            <th>Editar</th>
                                            <th>Consultar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {cirugias.map((cirugia) => 
                                          <tr>
                                            <td>{cirugia.codigo_cirugia}</td>
                                            <td>{cirugia.nombre_cirugia}</td>
                                           
                                            <td>
                                            <Link to="editar" className="btn btn-sm btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
                                            </td>
                                            <td>
                                            <Link to="ver" className="btn btn-sm btn-info"><i className="bi bi-table"></i> Consultar</Link>
                                            </td>
                                             
                                          </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                            }
                            {cirugias.length == 0 &&
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