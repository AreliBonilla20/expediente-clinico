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

const VerMedicamento = () => {

    const { codigo } = useParams();
    const API_URL = API.API_URL;
    
    const [codigo_medicamento, setCodigo_medicamento] = useState('');
    const [id_tipo_medicamento, setTipo_medicamento] = useState('');
    const [nombre_medicamento, setNombre_medicamento] = useState('');
    const [via_administracion, setVia_administracion] = useState('');
    const [descripcion_medicamento, setDescripcion_medicamento] = useState('');
    const [presentacion_medicamento, setPresentacion_medicamento] = useState('');
    const [costo_medicamento, setCosto_medicamento] = useState('');
    const [existencia_medicamento, setExistencia_medicamento] = useState('');
   

    useEffect(() => {
        API.medicamento_ver(codigo).then(res => {
           const medicamento = res.data;
           setCodigo_medicamento(medicamento.codigo_medicamento);
           setTipo_medicamento(medicamento.tipo_medicamento);
           setNombre_medicamento(medicamento.nombre_medicamento);
           setVia_administracion(medicamento.via_administracion);
           setDescripcion_medicamento(medicamento.descripcion_medicamento);
           setPresentacion_medicamento(medicamento.presentacion_medicamento);
           setCosto_medicamento(medicamento.costo_medicamento);
           setExistencia_medicamento(medicamento.existencia_medicamento);
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
                                <h4>Medicamento: {codigo_medicamento} - {nombre_medicamento}</h4>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/medicamentos">Consulta de Medicamentos</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="ver">Ver Medicamento</Link>
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
                            <h5>Datos de Medicamento</h5>
                            <hr />

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        {codigo_medicamento ? (
                                            <p>Código Medicamento</p>
                                        ) : (
                                            <p></p>
                                        )}
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        {codigo_medicamento ? (
                                            <p style={{fontWeight: "bold"}}> {codigo_medicamento}</p>
                                        ) : (
                                            <p></p>
                                        )}
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Nombre Medicamento</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{nombre_medicamento}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Tipo de Medicamento</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{id_tipo_medicamento}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Vía de administración</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{via_administracion}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Descripción Medicamento</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{descripcion_medicamento}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Presentación</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{presentacion_medicamento}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Costo</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>$ {costo_medicamento}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Existencia</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{existencia_medicamento}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="col-12 d-flex justify-content-end">
                                <Link to="editar" className="btn btn-sm btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
                            </div>
                        </div>
                        </div>
                       
                    </section>

                    <section className="section">
                        <div className="card">
                           
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

export default VerMedicamento;