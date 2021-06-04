import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import SignosVitales from '../SignosVitalesComponents/SignosVitales';
import HistorialDiagnosticos from '../DiagnosticosComponents/HistorialDiagnosticos';
import RecetaMedica from '../MedicamentosComponents/RecetaMedica';
import HistorialTratamientos from '../TratamientosComponents/HistorialTratamientos';


import API from '../api';


const VerExpediente = () => {

    const { id_consulta } = useParams();
   
    const [fecha_cita, set_fecha_cita] = useState('');
    const [hora_cita, set_hora_cita] = useState('');
    const [doctor, set_doctor] = useState('');
    const [sintomatologia, set_sintomatologia] = useState('');
    const [observaciones, set_observaciones] = useState('');
   

    useEffect(() => {
        API.consulta_ver(id_consulta).then(res => {
            
            const consulta = res.data;
            
            set_fecha_cita(consulta.fecha_cita);
            set_hora_cita(consulta.hora_cita);  
            set_doctor(consulta.id_doctor + ' - ' + consulta.nombre_empleado);
            set_sintomatologia(consulta.sintomatologia);
            set_observaciones(consulta.observaciones);
             
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
                                
                       
                               
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/expedientes">Consulta expedientes</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="ver">Ver expediente</Link>
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
                                    <h5 className="card-title">Datos de la consulta</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="datos_consulta-tab" data-bs-toggle="tab" href="#datos_consulta"
                                                role="tab" aria-controls="datos_consulta" aria-selected="true">Datos de la consulta</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="signos_vitales-tab" data-bs-toggle="tab" href="#signos_vitales"
                                                role="tab" aria-controls="signos_vitales" aria-selected="false">Signos Vitales</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="diagnosticos-tab" data-bs-toggle="tab" href="#diagnosticos"
                                                role="tab" aria-controls="diagnosticos" aria-selected="false">Diagnósticos</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="receta_medica-tab" data-bs-toggle="tab" href="#receta_medica"
                                                role="tab" aria-controls="receta_medica" aria-selected="false">Recetas médicas</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="tratamientos-tab" data-bs-toggle="tab" href="#tratamientos"
                                                role="tab" aria-controls="tratamientos" aria-selected="false">Tratamientos</a>
                                        </li>
                                       
                                    </ul>


                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="datos_consulta" role="tabpanel"
                                            aria-labelledby="datos_consulta-tab">
                                             <section className="section">
                                                <div className="card">
                                                <div className="card-body">
                                                    <h5>Datos generales</h5>
                                                    <hr />

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Código de consulta</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{id_consulta}</p>
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Fecha</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{fecha_cita}</p>
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Hora</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{hora_cita}</p>
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Doctor</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{doctor}</p>
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <br />

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Sintomatología</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{sintomatologia}</p>
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Observaciones</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{observaciones}</p>
                                                                </div>
                                                        </div>
                                                    </div>

                                        
                                                </div>
                                                </div>
                                            
                                            </section>

                                        </div>
                                            

                                            <div className="tab-pane fade" id="signos_vitales" role="tabpanel"
                                                aria-labelledby="signos_vitales-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                          <SignosVitales />
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="diagnosticos" role="tabpanel"
                                                aria-labelledby="diagnosticos-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                        <HistorialDiagnosticos />
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="receta_medica" role="tabpanel"
                                                aria-labelledby="receta_medica-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                        <RecetaMedica />
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="tratamientos" role="tabpanel"
                                                aria-labelledby="tratamientos-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                            <HistorialTratamientos />
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

export default VerExpediente;