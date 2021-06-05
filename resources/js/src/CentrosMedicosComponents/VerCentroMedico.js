import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';
import EmpleadosCentroMedico from '../EmpleadosComponents/EmpleadosCentroMedico';

import Consultorio from '../ConsultoriosComponents/Consultorio';
import AgregarQuirofano from '../QuirofanosComponents/AgregarQuirofano';
import Doctores from '../DoctoresComponents/ConsultarDoctor';
import Horarios from './Horarios';

import API from '../api';

const VerCentroMedico = () => {

    const { id_centro_medico } = useParams();
   

    const [nombre_centro_medico, setNombre_centro_medico] = useState('');
    const [direccion_centro_medico, setDireccion_centro_medico] = useState('');
    const [director, setDirector] = useState('');
    const [telefono_director, setTelefono_director] = useState('');
    const [correo_director, setCorreo_director] = useState('');
    const [telefono1_centro_medico, setTelefono1_centro_medico] = useState('');
    const [telefono2_centro_medico, setTelefono2_centro_medico] = useState('');
    const [correo_centro_medico, setCorreo_centro_medico] = useState('');
    const [tiempo_consulta_medica, setTiempo_consulta_medica] = useState('');
    const [tipo_centro, setTipo_centro] = useState('');
    const [pais, setPais] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [costo_dia_hospitalizacion, set_costo_dia_hospitalizacion] = useState('');
    const [costo_consulta_general, set_costo_consulta_general] = useState('');
    const [costo_consulta_especialidad, set_costo_consulta_especialidad] = useState('');
    

    
    useEffect(() => {
        API.centro_medico_ver(id_centro_medico).then(res => {
           const centro_medico = res.data; 
            setNombre_centro_medico(centro_medico.nombre_centro_medico);
            setDireccion_centro_medico(centro_medico.direccion_centro_medico);
            setDirector(centro_medico.director);
            setTelefono_director(centro_medico.telefono_director);
            setCorreo_director(centro_medico.correo_director);
            setTelefono1_centro_medico(centro_medico.telefono1_centro_medico);
            setTelefono2_centro_medico(centro_medico.telefono2_centro_medico);
            setCorreo_centro_medico(centro_medico.correo_centro_medico);
            setTiempo_consulta_medica(centro_medico.tiempo_consulta_medica);
            setTipo_centro(centro_medico.tipo_centro_medico);
            set_costo_dia_hospitalizacion(centro_medico.costo_dia_hospitalizacion);
            set_costo_consulta_general(centro_medico.costo_consulta_general);
            set_costo_consulta_especialidad(centro_medico.costo_consulta_especialidad);
  
            setPais(centro_medico.nombre_pais);
            setMunicipio(centro_medico.nombre_municipio);
            setDepartamento(centro_medico.nombre_departamento);
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
                                <h4>Centro medico: {id_centro_medico} - {nombre_centro_medico}</h4>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/centros_medicos">Consulta centros médicos</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="ver">Ver centro médico</Link>
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
                                    <h5 className="card-title">Datos del centro médico</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="datos_generales-tab" data-bs-toggle="tab" href="#datos_generales"
                                                role="tab" aria-controls="datos_generales" aria-selected="true">Datos generales</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="empleados-tab" data-bs-toggle="tab" href="#empleados"
                                                role="tab" aria-controls="empleados" aria-selected="false">Empleados</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="doctores-tab" data-bs-toggle="tab" href="#doctores"
                                                role="tab" aria-controls="doctores" aria-selected="false">Doctores</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="horarios-tab" data-bs-toggle="tab" href="#horarios"
                                                role="tab" aria-controls="horarios" aria-selected="false">Horarios</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="consultorios-tab" data-bs-toggle="tab" href="#consultorios"
                                                role="tab" aria-controls="consultorios" aria-selected="false">Consultorios</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="quirofanos-tab" data-bs-toggle="tab" href="#quirofanos"
                                                role="tab" aria-controls="quirofanos" aria-selected="false">Quirófanos</a>
                                        </li>
                                    </ul>


                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="datos_generales" role="tabpanel"
                                            aria-labelledby="datos_generales-tab">
                                            <section className="section">
                                            <div className="card">
                                            <div className="card-body">
                                                <h5>Datos generales</h5>
                                                <hr />

                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            {id_centro_medico ? (
                                                                <p>Identificador</p>
                                                            ) : (
                                                                <p></p>
                                                            )}
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            {id_centro_medico ? (
                                                                <p style={{fontWeight: "bold"}}> {id_centro_medico}</p>
                                                            ) : (
                                                                <p></p>
                                                            )}
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            <p>Tipo centro médico</p>
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            <p style={{fontWeight: "bold"}}>{tipo_centro}</p>
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
                                                            <p style={{fontWeight: "bold"}}>{nombre_centro_medico}</p>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            <p>Dirección</p>
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            <p style={{fontWeight: "bold"}}>{direccion_centro_medico}, {municipio}, {departamento}, {pais}</p>
                                                            </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            <p>Teléfono</p>
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            <p style={{fontWeight: "bold"}}>{telefono1_centro_medico}, {telefono2_centro_medico}</p>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            <p>Correo centro médico</p>
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            <p style={{fontWeight: "bold"}}>{correo_centro_medico}</p>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            <p>Tiempo consulta médica </p>
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            <p style={{fontWeight: "bold"}}>{tiempo_consulta_medica}</p>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            <p>Nombre director</p>
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            <p style={{fontWeight: "bold"}}>{director}</p>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            <p>Teléfono director</p>
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            <p style={{fontWeight: "bold"}}>{telefono_director}</p>
                                                            </div>
                                                    </div>
                                                </div>

                                                
                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            <p>Correo director</p>
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            <p style={{fontWeight: "bold"}}>{correo_director}</p>
                                                            </div>
                                                    </div>
                                                </div>
                                                <br />
                                               
                                                <h5>Costo por servicios</h5>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            {costo_dia_hospitalizacion ? (
                                                                <p>Costo por día de hospitalización</p>
                                                            ) : (
                                                                <p></p>
                                                            )}
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            {costo_dia_hospitalizacion ? (
                                                                <p style={{fontWeight: "bold"}}> $ {costo_dia_hospitalizacion}</p>
                                                            ) : (
                                                                <p></p>
                                                            )}
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            {costo_consulta_general ? (
                                                                <p>Costo por consulta general</p>
                                                            ) : (
                                                                <p></p>
                                                            )}
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            {costo_consulta_general ? (
                                                                <p style={{fontWeight: "bold"}}> $ {costo_consulta_general}</p>
                                                            ) : (
                                                                <p></p>
                                                            )}
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                            <div className="form-group">
                                                            {costo_consulta_especialidad ? (
                                                                <p>Costo por consulta de especialidad</p>
                                                            ) : (
                                                                <p></p>
                                                            )}
                                                            </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                            <div className="form-group">
                                                            {costo_consulta_especialidad ? (
                                                                <p style={{fontWeight: "bold"}}> $ {costo_consulta_especialidad}</p>
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
                                            

                                            <div className="tab-pane fade" id="empleados" role="tabpanel"
                                                aria-labelledby="empleados-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                        <EmpleadosCentroMedico />
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="doctores" role="tabpanel"
                                                aria-labelledby="doctores-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                       
                                                        < Doctores />     
                                                       
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="horarios" role="tabpanel"
                                                aria-labelledby="horarios-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                       
                                                        < Horarios />     
                                                       
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="consultorios" role="tabpanel"
                                                aria-labelledby="consultorios-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                        <Consultorio />
                                                        </div>
                                                    </section>
                                            </div>

                                            <div className="tab-pane fade" id="quirofanos" role="tabpanel"
                                                aria-labelledby="quirofanos-tab">
                                                    
                                                    <section className="section">
                                                        <div className="card">
                                                       
                                                        < AgregarQuirofano />     
                                                       
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

export default VerCentroMedico;
