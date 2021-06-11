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

const VerCirugia = () => {

    const { codigo } = useParams();
   
    const [codigo_cirugia, set_codigo_cirugia] = useState('');
    const [nombre_cirugia, set_nombre_cirugia] = useState('');
    const [descripcion_cirugia, set_descripcion_cirugia] = useState('');
    const [costo_cirugia, set_costo_cirugia] = useState('');
    
    useEffect(() => {
        API.cirugia_ver(codigo).then(res => {
           const cirugia = res.data;
           set_codigo_cirugia(cirugia.codigo_cirugia);
           set_nombre_cirugia(cirugia.nombre_cirugia);
           set_descripcion_cirugia(cirugia.descripcion_cirugia);
           set_costo_cirugia(cirugia.costo_cirugia);
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
                                <h4>Cirugía: {codigo_cirugia} - {nombre_cirugia}</h4>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/tratamientos_medicos">Consulta cirugía</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="ver">Ver cirugía</Link>
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
                            <h5>Cirugía</h5>
                            <hr />

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Código de cirugía</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{codigo_cirugia}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Nombre cirugía</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{nombre_cirugia}</p>
                                        </div>
                                </div>
                            </div>

                        

                            <div className="row">
                                <div className="col-md-4">  
                                        <div className="form-group">
                                       
                                            <p>Descripción de cirugía</p>
                                       
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                     
                                            <p style={{fontWeight: "bold"}}> {descripcion_cirugia}</p>
                                       
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">  
                                        <div className="form-group">
                                        {codigo_cirugia ? (
                                            <p>Costo de cirugía</p>
                                        ) : (
                                            <p></p>
                                        )}
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        {codigo_cirugia ? (
                                            <p style={{fontWeight: "bold"}}>$ {costo_cirugia}</p>
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

export default VerCirugia;