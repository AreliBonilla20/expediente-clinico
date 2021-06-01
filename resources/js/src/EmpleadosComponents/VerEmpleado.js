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

const VerEmpleado = () => {

    const {id_empleado } = useParams();
    
    
    const [genero, setGenero] = useState('');
    const [nombre_empleado, setNombre_empleado] = useState('');
    const [apellido_empleado, setApellido_empleado] = useState('');
    const [identificacion_empleado, setIdentificacion_empleado] = useState('');
    const [fecha_nacimiento_empleado, setFecha_nacimiento_empleado] = useState('');
    const [direccion_empleado, setDireccion_empleado] = useState('');
    const [telefono_empleado, setTelefono_empleado] = useState('');
    const [correo_empleado, setCorreo_empleado] = useState('');
    const [area, set_area] = useState('');
    const [centro_medico, setCentro_medico] = useState('');
    const [cargo, set_cargo] = useState('');
    const [pais, setPais] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [municipio, setMunicipio] = useState('');

    useEffect(() => {
        API.empleado_ver(id_empleado).then(res => {
           const empleado = res.data;

    
           setGenero(empleado.genero);
           setNombre_empleado(empleado.nombre_empleado);
           setApellido_empleado(empleado.apellido_empleado);
           setIdentificacion_empleado(empleado.identificacion_empleado);
           setFecha_nacimiento_empleado(empleado.fecha_nacimiento_empleado);
           setDireccion_empleado(empleado.direccion_empleado);
           setTelefono_empleado(empleado.telefono_empleado);
           setCorreo_empleado(empleado.correo_empleado);
           set_area(empleado.area);
           setCentro_medico(empleado.nombre_centro_medico);
           set_cargo(empleado.cargo);
           setPais(empleado.nombre_pais);
           setDepartamento(empleado.nombre_departamento);
           setMunicipio(empleado.nombre_municipio);
           
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
                                <h4>Empleado: {id_empleado} </h4>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/empleados">Consulta empleados</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="ver">Ver empleado</Link>
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
                            <h5>Empleado</h5>
                            <hr />

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Código del empleado</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{id_empleado}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Identificación</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{identificacion_empleado}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                            <div className="form-group">
                                            {nombre_empleado||apellido_empleado ? (
                                            <p>Empleado</p>
                                            ) : (
                                            <p></p>
                                            )}
                                                            
                                            </div>
                                </div>
                                <div className="col-md-8">
                                            <div className="form-group">
                                            {nombre_empleado||apellido_empleado ? (
                                            <p style={{fontWeight: "bold"}}>{nombre_empleado} {apellido_empleado}</p>
                                            ) : (
                                            <p></p>
                                            )}
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
                                        <p style={{fontWeight: "bold"}}>{fecha_nacimiento_empleado}</p>
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
                                        <p>Centro médicoo</p>
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
                                            <p>Dirección</p>
                                            </div>
                                </div>
                                <div className="col-md-8">
                                            <div className="form-group">
                                            <p style={{fontWeight: "bold"}}>{direccion_empleado}, {municipio}, {departamento}, {pais}</p>
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
                                            <p style={{fontWeight: "bold"}}>{telefono_empleado}</p>
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
                                            <p style={{fontWeight: "bold"}}>{correo_empleado}</p>
                                            </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Área de trabajo</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{area}</p>
                                        </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Cargo</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{cargo}</p>
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

export default VerEmpleado;