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

const VerTratamiento = () => {

    const { codigo } = useParams();
   
    const [codigo_tratamiento, setCodigo_tratamiento] = useState('');
    const [nombre_tratamiento, setNombre_tratamiento] = useState('');
    const [tipo_tratamiento, setTipo_tratamiento] = useState('');
    const [descripcion_tratamiento, setDescripcion_tratamiento] = useState('');
    const [costo_tratamiento, setCosto_tratamiento] = useState('');
    
    useEffect(() => {
        API.tratamiento_ver(codigo).then(res => {
           const tratamiento = res.data;
           setCodigo_tratamiento(tratamiento.codigo_tratamiento);
           setNombre_tratamiento(tratamiento.nombre_tratamiento);
           setTipo_tratamiento(tratamiento.tipo_tratamiento);
           setDescripcion_tratamiento(tratamiento.descripcion_tratamiento);
           setCosto_tratamiento(tratamiento.costo_tratamiento);
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
                                <h4>Medicamento: {codigo_tratamiento} - {nombre_tratamiento}</h4>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/tratamientos_medicos">Consulta tratamientos</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="ver">Ver tratamiento</Link>
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
                            <h5>Tratamiento médico</h5>
                            <hr />

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Código de tratamiento</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{codigo_tratamiento}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Nombre tratamiento</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{nombre_tratamiento}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Tipo tratamiento</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{tipo_tratamiento}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">  
                                        <div className="form-group">
                                        {descripcion_tratamiento ? (
                                            <p>Descripción de tratamiento</p>
                                        ) : (
                                            <p></p>
                                        )}
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        {descripcion_tratamiento ? (
                                            <p style={{fontWeight: "bold"}}> {descripcion_tratamiento}</p>
                                        ) : (
                                            <p></p>
                                        )}
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">  
                                        <div className="form-group">
                                        {costo_tratamiento ? (
                                            <p>Costo de tratamiento</p>
                                        ) : (
                                            <p></p>
                                        )}
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        {costo_tratamiento ? (
                                            <p style={{fontWeight: "bold"}}>$ {costo_tratamiento}</p>
                                        ) : (
                                            <p></p>
                                        )}
                                        </div>
                                </div>
                            </div>

                            <div className="col-12 d-flex justify-content-end">
                                <Link to="editar" className="btn btn-sm btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
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

export default VerTratamiento;