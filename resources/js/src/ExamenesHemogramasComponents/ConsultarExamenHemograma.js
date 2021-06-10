import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import API from '../api';

const ConsultarExamenHemograma = () => {

    const [examenes_hemogramas, setExamenesHemogramas] =useState([]);

    useEffect(() => {
         API.examenes_hemogramas().then(res => {
            const result = res.data;
            setExamenesHemogramas(result.data);
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
                                <h3>Hemogramas</h3>
                                
                                <p className="text-subtitle text-muted">Consulta de hemogramas</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/examenes_hemogramas">Consulta hemogramas</Link>
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
                                <Link to="/examenes_hemogramas/crear" className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
                            </div>
                            
                            <br />
                            {examenes_hemogramas.length> 0 &&
                            <div className="card-body">
                            <form className="form">
                                <div className="row">
                                </div>
                            </form>
                            <br /><br />
                                <table className="table table-striped" id="table1">
                                    <thead>
                                        <tr>
                                            <th>Código Hemograma</th>
                                            <th>Código Examen</th>
                                            <th>Parametro</th>
                                            <th>Editar</th>
                                            <th>Consultar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {examenes_hemogramas.map((hemograma) => 
                                          <tr>
                                            <td>{hemograma.codigo_hemograma}</td>
                                            <td>{hemograma.codigo_examen}</td>
                                            <td>{hemograma.parametro}</td>
                                            <td>
                                            <Link to={`examenes_hemogramas/${hemograma.codigo_hemograma}/editar`} className="btn btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
                                            </td>
                                            <td>
                                            <Link to={`examenes_hemogramas/${hemograma.codigo_hemograma}/ver`} className="btn btn-info"><i className="bi bi-table"></i> Consultar</Link>
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
        </div>
        <Footer />
    </div>
    );
}

export default ConsultarExamenHemograma;