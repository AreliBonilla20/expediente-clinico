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


import API from '../api';

const VerExpediente = () => {

    const { id_hospitalizacion, codigo } = useParams();
   
    const [fecha_ingreso, setFecha_ingreso] = useState('');
    const [hora_ingreso, setHora_ingreso] = useState('');
    const [motivo_ingreso, setMotivo_ingreso] = useState('');
    const [sala, setSala] = useState('');
    const [camilla, setCamilla] = useState('');
    const [estado_paciente, setEstado_paciente] = useState('');
   

    useEffect(() => {
        API.hospitalizacion_ver(id_hospitalizacion).then(res => {
            
            const hospitalizacion = res.data;
            
            setFecha_ingreso(hospitalizacion.fecha_ingreso);
            setHora_ingreso(hospitalizacion.hora_ingreso);
            setMotivo_ingreso(hospitalizacion.motivo_ingreso);
            setSala(hospitalizacion.sala);
            setCamilla(hospitalizacion.camilla);
            setEstado_paciente(hospitalizacion.estado_paciente);
            
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
                                            <a className="nav-link active" id="home-tab" data-bs-toggle="tab" href="#datos_ingreso"
                                                role="tab" aria-controls="datos_ingreso" aria-selected="true">Datos de ingreso</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="profile-tab" data-bs-toggle="tab" href="#chequeos"
                                                role="tab" aria-controls="chequeos" aria-selected="false">Chequeos</a>
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
                                            
                                                    <div className="col-12 d-flex justify-content-end">
                                                        <Link to="editar" className="btn btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
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