import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import ChequeoHospitalizacion from '../ChequeosComponents/ChequeoHospitalizacion';
import SignosVitales from '../SignosVitalesComponents/SignosVitales';
import HistorialDiagnosticos from '../DiagnosticosComponents/HistorialDiagnosticos';
import RecetaMedica from '../MedicamentosComponents/RecetaMedica';
import HistorialTratamientos from '../TratamientosComponents/HistorialTratamientos';
import FacturacionHospitalizacion  from './FacturacionHospitalizacion';
import HistorialExamen from '../ExamenesComponents/HistorialExamenes';


import API from '../api';


const VerExpediente = () => {

    const { id_hospitalizacion, codigo } = useParams();
   
    const [fecha_ingreso, setFecha_ingreso] = useState('');
    const [hora_ingreso, setHora_ingreso] = useState('');
    const [motivo_ingreso, setMotivo_ingreso] = useState('');
    const [sala, setSala] = useState('');
    const [camilla, setCamilla] = useState('');
    const [estado_paciente, setEstado_paciente] = useState('');
    const [centro_medico, set_centro_medico] = useState('');
    const [dias_ingreso, set_dias_ingreso] = useState('');
   

    useEffect(() => {
        API.hospitalizacion_ver(id_hospitalizacion).then(res => {
            
            const hospitalizacion = res.data;
            
            setFecha_ingreso(hospitalizacion.fecha_ingreso);
            setHora_ingreso(hospitalizacion.hora_ingreso);
            setMotivo_ingreso(hospitalizacion.motivo_ingreso);
            setSala(hospitalizacion.sala);
            setCamilla(hospitalizacion.camilla);
            setEstado_paciente(hospitalizacion.estado_paciente);
            set_centro_medico(hospitalizacion.nombre_centro_medico);
            set_dias_ingreso(hospitalizacion.dias_ingreso);
            
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
                                <h3>Código de expediente: {codigo}</h3>
                       
                               
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
                                    <h5 className="card-title">Datos de hospitalización</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="datos_ingreso-tab" data-bs-toggle="tab" href="#datos_ingreso"
                                                role="tab" aria-controls="datos_ingreso" aria-selected="true">Datos de ingreso</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="chequeos-tab" data-bs-toggle="tab" href="#chequeos"
                                                role="tab" aria-controls="chequeos" aria-selected="false">Chequeos</a>
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
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="examenes-tab" data-bs-toggle="tab" href="#examenes"
                                                role="tab" aria-controls="examenes" aria-selected="false">Examenes</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="facturacion-tab" data-bs-toggle="tab" href="#facturacion"
                                                role="tab" aria-controls="facturacion" aria-selected="false">Facturación</a>
                                        </li>
                                       
                                    </ul>


                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="datos_ingreso" role="tabpanel"
                                            aria-labelledby="datos_ingreso-tab">
                                             <section className="section">
                                                <div className="card">
                                                <div className="card-body">
                                                    <h5>Datos personales</h5>
                                                    <hr />

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Código de hospitalizacion</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{id_hospitalizacion}</p>
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Centro médico</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{centro_medico}</p>
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Fecha de ingreso</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{fecha_ingreso}</p>
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Hora de ingreso</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{hora_ingreso}</p>
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Motivo de ingreso</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{motivo_ingreso}</p>
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Sala de ingreso</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{sala}</p>
                                                                </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Camilla</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{camilla}</p>
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Estado del paciente al ingresar</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{estado_paciente}</p>
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                                <div className="form-group">
                                                                <p>Días de hospitalización</p>
                                                                </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                                <div className="form-group">
                                                                <p style={{fontWeight: "bold"}}>{dias_ingreso}</p>
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
                                            <div className="tab-pane fade" id="chequeos" role="tabpanel"
                                                aria-labelledby="chequeos-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                            <ChequeoHospitalizacion/>
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="signos_vitales" role="tabpanel"
                                                aria-labelledby="signos_vitales-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                            <SignosVitales/>
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="diagnosticos" role="tabpanel"
                                                aria-labelledby="diagnosticos-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                            <HistorialDiagnosticos/>
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="receta_medica" role="tabpanel"
                                                aria-labelledby="receta_medica-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                            <RecetaMedica/>
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="tratamientos" role="tabpanel"
                                                aria-labelledby="tratamientos-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                            <HistorialTratamientos/>
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="examenes" role="tabpanel"
                                                aria-labelledby="examenes-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                            <HistorialExamen/>
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="facturacion" role="tabpanel"
                                                aria-labelledby="facturacion-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                            <FacturacionHospitalizacion/>
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