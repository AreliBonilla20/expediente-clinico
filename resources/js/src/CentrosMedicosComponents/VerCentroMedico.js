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

const VerCentroMedico = () => {

    const { codigo } = useParams();
   
    
    const [id_centro_medico, setId_centro_medico] = useState('');
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

    
    useEffect(() => {
        API.centro_medico_ver(codigo).then(res => {
           const centro_medico = res.data;
            setId_centro_medico(centro_medico.id_centro_medico);  
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
                                <h3>Centro medico: {nombre_centro_medico}</h3>
                       
                               
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

export default VerCentroMedico;
