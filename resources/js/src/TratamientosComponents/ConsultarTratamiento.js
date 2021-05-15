import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import API from '../api';

const ConsultarTratamiento = () => {

    const [tratamientosmedicos, setTratamientosMedicos] =useState([]);
    const [param_busqueda, setParam_busqueda] = useState('');
   
    useEffect(() => {
         API.tratamientosmedicos().then(res => {
            const result = res.data;
            setTratamientosMedicos(result.data);
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
                                <h3>Tratamientos médicos</h3>
                                
                                <p className="text-subtitle text-muted">Consulta de tratamientos</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/tratamientosmedicos">Consulta tratamientos</Link>
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
                                <Link to="/tratamientosmedicos/crear" className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
                            </div>
                            
                            <br />
                            <div className="card-body">
                            <h4>Buscar tratamiento</h4>
                            <p>Ingrese cualquiera de los parámetros solicitados</p>
                           
                    
                            <form className="form">
                                <div className="row">

                                    <div className="col-md-12 mb-1">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1"><i
                                                    className="bi bi-search"></i></span>
                                        <input type="text" id="last-name-column" className="form-control"
                                                    placeholder="Código, nombre del tratamiento" name="lname-column" 
                                                    id="codigo_busqueda"
                                                    value={param_busqueda}
                                                    onChange={e => setParam_busqueda(e.target.value)} />
                                            <Link to={`tratamientosmedicos/${param_busqueda}/buscar`} className="btn btn-secondary"> Buscar</Link>
                                        </div>
                                    </div>
                                </div>
                               
                            </form>
                            <br /><br />
                                <table className="table table-striped" id="table1">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Tratamiento</th>
                                            <th>Editar</th>
                                            <th>Consultar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {tratamientosmedicos.map((tratamiento) => 
                                          <tr>
                                            <td>{tratamiento.codigo_tratamiento}</td>
                                            <td>{tratamiento.nombre_tratamiento}</td>
                                           
                                            <td>
                                            <Link to={`tratamientosmedicos/${tratamiento.codigo_tratamiento}/editar`} className="btn btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
                                            </td>
                                            <td>
                                            <Link to={`tratamientosmedicos/${tratamiento.nombre_tratamiento}/ver`} className="btn btn-info"><i className="bi bi-table"></i> Consultar</Link>
                                            </td>
                                             
                                          </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
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

export default ConsultarTratamiento;