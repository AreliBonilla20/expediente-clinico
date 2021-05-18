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

const VerExamen = () => {

    const { codigo } = useParams();
   
    const [codigo_examen, setCodigo_examen] = useState('');
    const [nombre_examen, setNombre_examen] = useState('');
    const [nombre_tipo_examen, setNombre_tipo_examen] = useState('');
    const [indicaciones_examen, setIndicaciones_examen] = useState('');
    const [costo, setCosto] = useState('');
    
    useEffect(() => {
        API.examen_ver(codigo).then(res => {
           const examen = res.data;
           setCodigo_examen(examen.codigo_examen);
           setNombre_tipo_examen(examen.nombre_tipo_examen);
           setNombre_examen(examen.nombre_examen);
           setIndicaciones_examen(examen.indicaciones_examen);
           setCosto(examen.costo);
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
                                <h3>Ver</h3>
                                <h4>Medicamento: {codigo_examen} - {nombre_examen}</h4>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/examenes">Consulta exámenes</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="ver">Ver examen</Link>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="page-heading">
                   
                    <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Exámenes</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="datos_generales-tab" data-bs-toggle="tab" href="#datos_generales"
                                                role="tab" aria-controls="datos_generales" aria-selected="true">Datos generales</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="examenes_fisicos-tab" data-bs-toggle="tab" href="#examenes_fisicos"
                                                role="tab" aria-controls="examenes_fisicos" aria-selected="false">Exámenes físicos</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="examenes_quimicos-tab" data-bs-toggle="tab" href="#examenes_quimicos"
                                                role="tab" aria-controls="examenes_quimicos" aria-selected="false">Exámenes químicos</a>
                                        </li>
                                      
                                    </ul>


                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="datos_generales" role="tabpanel"
                                            aria-labelledby="datos_generales-tab">
                                             <section className="section">
                                            <div className="card">
                                            <div className="card-body">
                                                <h5>Examen</h5>
                                                <hr />

                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            <p>Código de examen</p>
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            <p style={{fontWeight: "bold"}}>{codigo_examen}</p>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            <p>Nombre examen</p>
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            <p style={{fontWeight: "bold"}}>{nombre_examen}</p>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            <p>Tipo examen</p>
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            <p style={{fontWeight: "bold"}}>{nombre_tipo_examen}</p>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">  
                                                            <div className="form-group">
                                                            {indicaciones_examen ? (
                                                                <p>Indicaciones de examen</p>
                                                            ) : (
                                                                <p></p>
                                                            )}
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            {indicaciones_examen ? (
                                                                <p style={{fontWeight: "bold"}}> {indicaciones_examen}</p>
                                                            ) : (
                                                                <p></p>
                                                            )}
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">  
                                                            <div className="form-group">
                                                            {costo ? (
                                                                <p>Costo de examen</p>
                                                            ) : (
                                                                <p></p>
                                                            )}
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            {costo ? (
                                                                <p style={{fontWeight: "bold"}}> $ {costo}</p>
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
                                            

                                            <div className="tab-pane fade" id="examenes_fisicos" role="tabpanel"
                                                aria-labelledby="examenes_fisicos-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                       

                                                       
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="examenes_quimicos" role="tabpanel"
                                                aria-labelledby="examenes_quimicos-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                        

                                                        </div>
                                                    </section>
                                            </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                   

                    </div>
            </div>   
            </div>
        </div>
        <Footer />
    </div>
    );
}

export default VerExamen;