import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import API from '../api';

const VerDiagnostico = () => {

    const { codigo } = useParams();
   
    const [codigo_diagnostico, setCodigo_diagnostico] = useState('');
    const [id_tipo_diagnostico, setTipo_diagnostico] = useState('');
    const [nombre_diagnostico, setNombre_diagnostico] = useState('');
    const [descripcion_diagnostico, setDscripcion_diagnostico] = useState('');
    
    useEffect(() => {
        API.diagnostico_ver(codigo).then(res => {
           const diagnostico = res.data;
           setCodigo_diagnostico(diagnostico.codigo_diagnostico);
           setTipo_diagnostico(diagnostico.tipo_diagnostico);
           setNombre_diagnostico(diagnostico.nombre_diagnostico);
           setDscripcion_diagnostico(diagnostico.descripcion_diagnostico);
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
                                <h3>Consultar</h3>
                                <h4>Diagnóstico: {codigo_diagnostico} - {nombre_diagnostico}</h4>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/diagnosticos">Consulta diagnósticos</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="ver">Ver diagnóstico</Link>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="page-heading">
                   
                    <section className="section">
                        <div className="card">
                        <div className="card-body">
                            <h5>Diagnóstico</h5>
                            <hr />

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Código</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{codigo_diagnostico}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Nombre</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{nombre_diagnostico}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Tipo de diagnóstico</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{id_tipo_diagnostico}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">  
                                        <div className="form-group">
                                        {descripcion_diagnostico ? (
                                            <p>Descripción del diagnóstico</p>
                                        ) : (
                                            <p></p>
                                        )}
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        {descripcion_diagnostico ? (
                                            <p style={{fontWeight: "bold"}}> {descripcion_diagnostico}</p>
                                        ) : (
                                            <p></p>
                                        )}
                                        </div>
                                </div>
                            </div>

                            <div className="col-12 d-flex justify-content-end">
                                <Link to="editar" className="btn btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
                            </div>
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

export default VerDiagnostico;