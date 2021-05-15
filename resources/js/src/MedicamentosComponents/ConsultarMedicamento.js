import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import API from '../api';

const ConsultarMedicamento = () => {

    const [medicamentos, setMedicamentos] =useState([]);
    const [param_busqueda, setParam_busqueda] = useState('');

    useEffect(() => {
         API.medicamentos().then(res => {
            const result = res.data;
            setMedicamentos(result.data);
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
                                <h3>Medicamentos</h3>
                                
                                <p className="text-subtitle text-muted">Consulta de medicamentos</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/medicamentos">Consulta medicamentos</Link>
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
                                <Link to="/medicamentos/crear" className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
                            </div>
                            
                            <br />
                            <div className="card-body">
                            <h4>Buscar medicamento</h4>
                            <p>Ingrese cualquiera de los parámetros solicitados</p>
                           
                    
                            <form className="form">
                                <div className="row">

                                    <div className="col-md-12 mb-1">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1"><i
                                                    className="bi bi-search"></i></span>
                                        <input type="text" id="last-name-column" className="form-control"
                                                    placeholder="Código o nombre del medicamento" name="lname-column" 
                                                    id="codigo_busqueda"
                                                    value={param_busqueda}
                                                    onChange={e => setParam_busqueda(e.target.value)} />
                                            <Link to={`medicamentos/${param_busqueda}/buscar`} className="btn btn-secondary"> Buscar</Link>
                                        </div>
                                    </div>
                                </div>
                               
                            </form>
                            <br /><br />
                                <table className="table table-striped" id="table1">
                                    <thead>
                                        <tr>
                                            <th>Código Medicamento</th>
                                            <th>Tipo Medicamento</th>
                                            <th>Nombre</th>
                                            <th>Editar</th>
                                            <th>Consultar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {medicamentos.map((medicamento) => 
                                          <tr>
                                            <td>{medicamento.codigo_medicamento}</td>
                                            <td>{medicamento.id_tipo_medicamento}</td>
                                            <td>{medicamento.nombre_medicamento}</td>
                                            <td>
                                            <Link to={`medicamentos/${medicamento.codigo_medicamento}/editar`} className="btn btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
                                            </td>
                                            <td>
                                            <Link to={`medicamentos/${medicamento.codigo_medicamento}/ver`} className="btn btn-info"><i className="bi bi-table"></i> Consultar</Link>
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

export default ConsultarMedicamento;