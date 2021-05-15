import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';
import Antecedentes from '../AntecedentesComponents/VerAntecedente';

import API from '../api';

const VerExpediente = () => {

    const { codigo } = useParams();
    const API_URL = API.API_URL;
    
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [fecha_nacimiento, setFecha_nacimiento] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [estado_civil, setEstado_civil] = useState('');
    const [nombre_conyugue, setNombre_conyugue] = useState('');
    const [apellido_conyugue, setApellido_conyugue] = useState('');
    const [nombre_contacto_emergencia, setNombre_contacto_emergencia] = useState('');
    const [telefono_contacto_emergencia, setTelefono_contacto_emergencia] = useState('');
    const [estado_paciente, setEstado_paciente] = useState('');
    const [genero, setGenero] = useState('');
    const [pais, setPais] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [departamento, setDepartamento] = useState('');
   

    useEffect(() => {
        API.paciente_ver(codigo).then(res => {
           const paciente = res.data;

           setNombres(paciente.nombres);
           setApellidos(paciente.apellidos);
           setIdentificacion(paciente.identificacion);
           setFecha_nacimiento(paciente.fecha_nacimiento);
           setDireccion(paciente.direccion);
           setTelefono(paciente.telefono);
           setCorreo(paciente.correo);
           setEstado_civil(paciente.estado_civil);
           setNombre_conyugue(paciente.nombre_conyugue);
           setApellido_conyugue(paciente.apellido_conyugue);
           setNombre_contacto_emergencia(paciente.nombre_contacto_emergencia);
           setTelefono_contacto_emergencia(paciente.telefono_contacto_emergencia);
           setEstado_paciente(paciente.estado_paciente);
           setGenero(paciente.genero);
           setPais(paciente.nombre_pais);
           setMunicipio(paciente.nombre_municipio);
           setDepartamento(paciente.nombre_departamento);

       })
    }, []);

    function edad() {

        const nace = new Date(fecha_nacimiento);
        const hoy = new Date()
    
        const mes = hoy.getMonth();
        const dia = hoy.getDate();
        const año = hoy.getFullYear();
    
        hoy.setDate(dia);
        hoy.setMonth(mes);
        hoy.setFullYear(año);
    
        edad = Math.floor(((hoy - nace) / (1000 * 60 * 60 * 24) / 365));
       
        return edad;
    }
    

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
                   
                    <section className="section">
                        <div className="card">
                        <div className="card-body">
                            <h5>Datos personales</h5>
                            <hr />

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        {identificacion ? (
                                            <p>Identificación</p>
                                        ) : (
                                            <p></p>
                                        )}
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        {identificacion ? (
                                            <p style={{fontWeight: "bold"}}> {identificacion}</p>
                                        ) : (
                                            <p></p>
                                        )}
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
                                        <p style={{fontWeight: "bold"}}>{nombres}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Apellidos</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{apellidos}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Estado paciente</p>
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
                                        <p>Género</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{genero}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Fecha de nacimiento [Año-Mes-Día]</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{fecha_nacimiento}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Edad</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{String(edad())} años</p>
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
                                        <p style={{fontWeight: "bold"}}>{direccion}, {municipio}, {departamento}, {pais}</p>
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
                                        <p style={{fontWeight: "bold"}}>{telefono}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Correo electrónico</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{correo}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Estado civil</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{estado_civil}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        {nombre_conyugue||apellido_conyugue ? (
                                            <p>Conyugue</p>
                                        ) : (
                                            <p></p>
                                        )}
                                       
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        {nombre_conyugue||apellido_conyugue ? (
                                            <p style={{fontWeight: "bold"}}>{nombre_conyugue} {apellido_conyugue}</p>
                                        ) : (
                                            <p></p>
                                        )}
                                        </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Contacto de emergencia</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{nombre_contacto_emergencia}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Teléfono del contacto de emergencia</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{telefono_contacto_emergencia}</p>
                                        </div>
                                </div>
                            </div>
                       
                            <div className="col-12 d-flex justify-content-end">
                                <Link to="editar" className="btn btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
                            </div>
                        </div>
                        </div>
                       
                    </section>

                    <section className="section">
                        <div className="card">
                        
                           <Antecedentes />
                            
                            
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

export default VerExpediente;