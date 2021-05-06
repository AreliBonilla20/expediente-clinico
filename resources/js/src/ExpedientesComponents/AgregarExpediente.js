import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import ReactDOM from 'react-dom'; 

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import API from '../api';

const AgregarExpediente = () => {

    const [generos, setGeneros] =useState([]);
    const [paises, setPaises] =useState([]);
    const [municipios, setMunicipios] =useState([]);
    const [departamentos, setDepartamentos] =useState([]);
    
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
    const [id_genero, setId_genero] = useState('');
    const [id_pais, setId_pais] = useState('');
    const [id_municipio, setId_municipio] = useState('');
    const [id_departamento, setId_departamento] = useState('');

    useEffect(() => {
        API.datos_formulario_paciente().then(res => {
           const result = res.data;
           setGeneros(result.generos);
           setPaises(result.paises);
           setDepartamentos(result.departamentos);
           setMunicipios(result.municipios);
           
       })
     }, []);


    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { nombres, apellidos, fecha_nacimiento, identificacion, direccion, telefono, correo, estado_paciente,
            estado_civil, nombre_conyugue, apellido_conyugue, nombre_contacto_emergencia,
            telefono_contacto_emergencia, id_genero, id_pais, id_municipio, id_departamento
         };
          const response = await fetch("http://localhost:8000/api/expedientes/guardar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = "/expedientes";
        } catch (err) {
          console.error(err.message);
        }
      };
    
      

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
                                <h3>Expedientes</h3>
                                
                                <p className="text-subtitle text-muted">Agregar expediente</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/expedientes/crear">Agregar expediente</Link>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    
                    <div className="page-heading">
                    <div className="col-md-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Complete los campos del formulario</h3>
                                    <p>Los campos que contienen (*) son obligatorios</p>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <form className="form form-vertical" onSubmit={onSubmitForm}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                                <h5>Datos generales</h5>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="identificacion">Identificación</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    placeholder="Identificación del paciente"
                                                                    id="identificacion"
                                                                    value={identificacion}
                                                                    onChange={e => setIdentificacion(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                           
                                                    <div className="col-6">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="first-name-icon">Nombre (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    placeholder="Nombres del paciente"
                                                                    id="first-name-icon"
                                                                    value={nombres}
                                                                    onChange={e => setNombres(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="first-name-icon">Apellidos (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    placeholder="Apellidos del paciente"
                                                                    id="first-name-icon"
                                                                    value={apellidos}
                                                                    onChange={e => setApellidos(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="fecha_nacimiento">Fecha de nacimiento (*)</label>
                                                            <div className="position-relative">
                                                                <input type="date" className="form-control"
                                                                    placeholder="Fecha de nacimiento del paciente"
                                                                    id="fecha_nacimiento"
                                                                    value={fecha_nacimiento}
                                                                    onChange={e => setFecha_nacimiento(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-calendar"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="estado_paciente">Estado del paciente (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    placeholder="Estado del paciente"
                                                                    id="estado_paciente"
                                                                    value={estado_paciente}
                                                                    onChange={e => setEstado_paciente(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 mb-4">
                                                    <label>Género (*)</label>
                            
                                                        <div className="form-group">
                                                        {generos.map((genero) => (
                                                            <div>
                                                            <input className="form-check-input" type="radio" 
                                                                id="id_genero"
                                                                name="id_genero"
                                                                value={genero.id_genero}
                                                                onChange={e => setId_genero(e.target.value)} />
                                                                
                                                            <label className="form-check-label" >
                                                                {genero.genero}</label>
                                                            </div>
                                                            
                                                        ))}  
                                                        </div>
                                               
                                                     </div>

                                                     <div className="col-md-12 mb-4">
                                                        <label>Estado civil (*)</label>
                                                        <div className="form-group">
                                                            <div>
                                                            <input className="form-check-input" type="radio" 
                                                                id="estado_civil"
                                                                name="estado_civil"
                                                                value="Casado/a"
                                                                onChange={e => setestado_civil(e.target.value)} />   
                                                            <label className="form-check-label" >Casado/a</label>
                                                            </div>
                                                        
                                                            <div>
                                                            <input className="form-check-input" type="radio" 
                                                                id="estado_civil"
                                                                name="estado_civil"
                                                                value="Soltero/a"
                                                                onChange={e => setEstado_civil(e.target.value)} />   
                                                            <label className="form-check-label" >Soltero/a</label>
                                                            </div>
                                                        </div>
                                                     </div>
                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="nombre_conyugue">Nombre conyugue</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    placeholder="Nombres del conyugue"
                                                                    value={nombre_conyugue}
                                                                    onChange={e => setNombre_conyugue(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="apellidos_conyugue">Apellidos conyugue</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    placeholder="Apellidos del conyugue"
                                                                    value={apellido_conyugue}
                                                                    onChange={e => setApellido_conyugue(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="mobile-id-icon">Teléfono (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    placeholder="Número teléfonico del paciente" id="mobile-id-icon" 
                                                                    value={telefono}
                                                                    onChange={e => setTelefono(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-phone"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">

                                                    <div className="form-group has-icon-left">
                                                        <label htmlFor="email-id-icon">Correo electrónico </label>
                                                        <div className="position-relative">
                                                            <input type="text" className="form-control"
                                                                placeholder="Correo electrónico del paciente" id="email-id-icon"
                                                                value={correo}
                                                                onChange={e => setCorreo(e.target.value)} />
                                                            <div className="form-control-icon">
                                                                <i className="bi bi-envelope"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>


                                                    <div className="col-md-4 mb-4">
                                                   
                                                    <label htmlFor="pais">País (*)</label>
                                                  
                                                        <div className="form-group">
                                                            <select className="choices form-select" id="pais" value={id_pais}
                                                            onChange={e => setId_pais(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {paises.map((pais) => (
                                                                <option value={pais.id_pais}>{pais.nombre_pais}</option>
                                                                ))}
                                                                
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4 mb-4">
                                                    <label htmlFor="departamento">Departamento/Estado (*)</label>
                                                        <div className="form-group">
                                                            <select className="choices form-select" id="departamento" value={id_departamento}
                                                            onChange={e => setId_departamento(e.target.value)} >
                                                            <option value="">--Seleccione una opción--</option>
                                                                {departamentos.map((departamento) => (
                                                                <option value={departamento.id_departamento}>{departamento.nombre_departamento}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4 mb-4">
                                                    <label htmlFor="municipio">Municipio/Ciudad (*)</label>
                                                        <div className="form-group">
                                                            <select className="choices form-select" id="municipio" value={id_municipio}
                                                            onChange={e => setId_municipio(e.target.value)} >
                                                            <option value="">--Seleccione una opción--</option>
                                                                {municipios.map((municipio) => (
                                                                <option value={municipio.id_municipio}>{municipio.nombre_municipio}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="direccion">Dirección (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    placeholder="Dirección del paciente" id="direccion"
                                                                    value={direccion}
                                                                    onChange={e => setDireccion(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-house"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                  

                                                    <h5>En caso de emergencias</h5>

                                                    <div className="col-6">
                                                        <div className="form-group has-icon-left">
                                                         
                                                            <label htmlFor="contacto_emergencia">Contacto en caso de emergencia (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    placeholder="Nombres del contacto de emergencia"
                                                                    id="contacto_emergencia"
                                                                    value={nombre_contacto_emergencia}
                                                                    onChange={e => setNombre_contacto_emergencia(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="telefono_emergencia">Télefono en caso de emergencia (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    placeholder="Teléfono del contacto de emergencia"
                                                                    id="telefono_emergencia"
                                                                    value={telefono_contacto_emergencia}
                                                                    onChange={e => setTelefono_contacto_emergencia(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-phone"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                   
                                                    <div className="col-12 d-flex justify-content-end">
                                                    <button className="btn btn-secondary">Guardar</button>
                                                    <button type="reset"
                                                            className="btn btn-light-secondary me-1 mb-1">Limpiar</button>
                                                    </div>

                                                    
                                                </div>
                                            </div>
                                        </form>
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

export default AgregarExpediente;