import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';
import schema from '../Validaciones/CentroMedicoValidacion';

import API from '../api';

const AgregarCentroMedico = () => {

    const API_URL = API.API_URL;
    

    const [centros_medicos, setCentros_medicos]=useState([]);

    const [tipo_centro_medico, setTipo_centro_medico] =useState([]);
    const [paises, setPaises] =useState([]);
    const [municipios, setMunicipios] =useState([]);
    const [departamentos, setDepartamentos] =useState([]);

    const [opcion_pais, setOpcion_pais] = useState();
    const [opcion_depto, setOpcion_depto] = useState();
    
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
    const [id_tipo_centro_medico, setId_tipo_centro_medico] = useState('');
    const [id_pais, setId_pais] = useState('');
    const [id_departamento, setId_departamento] = useState('');
    const [id_municipio, setId_municipio] = useState('');
  

    useEffect(() => {
        API.datos_formulario_centro_medico().then(res => {
           const result = res.data;
           setTipo_centro_medico(result.tipos_centros_medicos);
           setPaises(result.paises);
           setDepartamentos(result.departamentos);
           setMunicipios(result.municipios);
        })

        API.centros_medicos().then(res => {
            const result = res.data;
            setCentros_medicos(result.data);
        }) 

     }, []);


     const { register, handleSubmit, formState: { errors } } = useForm({
         resolver: yupResolver(schema),
      });


    const agregarCentroMedico = async (data) => {
        try {
          const body = { id_centro_medico, nombre_centro_medico, direccion_centro_medico, director, telefono_director, 
            correo_director, telefono1_centro_medico, telefono2_centro_medico, correo_centro_medico, tiempo_consulta_medica,
            id_tipo_centro_medico, id_pais, id_departamento, id_municipio
         };
          const response = await fetch(`${API_URL}/centros_medicos/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
         //Regresa luego de guardar. Misma ruta de api.php
          window.location = "/centros_medicos";
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
                                <h3>Centros médicos</h3>
                                
                                <p className="text-subtitle text-muted">Agregar centro médico</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/centros_medicos/crear">Agregar centro médico</Link>
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
                                        <form className="form form-vertical" onSubmit={handleSubmit(agregarCentroMedico)}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                                <h5>Datos generales</h5>

                                                <div className="col-12">
                                                    <div className="form-group has-icon-left">
                                                        <label htmlFor="id_centro_medico">Identificador(*)</label>
                                                        <div className="position-relative">
                                                            <input type="text" className="form-control"
                                                                name="id_centro_medico"
                                                                id="id_centro_medico"
                                                                {...register('id_centro_medico')}
                                                                value={id_centro_medico}
                                                                onChange={e => setId_centro_medico(e.target.value)} 
                                                                />
                                                            <div className="form-control-icon">
                                                                <i className="bi bi-clipboard-check"></i>
                                                            </div>
                                                        </div>
                                                        <small className="text-danger"> {errors.id_centro_medico?.message} </small>
                                                        {
                                                                                centros_medicos.map((centros) => {
                                                                                if(centros.id_centro_medico === id_centro_medico){
                                                                                    return(
                                                                                        <small className="text-danger">Ya existe un registro con este mismo identificador, debe ser distinto</small>
                                                                                    )
                                                                                }
                                                                            })
                                                                        }
                                                         </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="nombre_centro_medico">Nombre (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="nombre_centro_medico"
                                                                    id="nombre_centro_medico"
                                                                    {...register('nombre_centro_medico')}
                                                                    value={nombre_centro_medico}
                                                                    onChange={e => setNombre_centro_medico(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.nombre_centro_medico?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 mb-4">
                                                        <label htmlFor="id_tipo_centro_medico">Tipo de centro médico (*)</label>
                                                        <div className="form-group">
                                                            <select className="choices form-select"
                                                                name="id_tipo_centro_medico" 
                                                                id="id_tipo_centro_medico" 
                                                                {...register('id_tipo_centro_medico')}
                                                                value={id_tipo_centro_medico}
                                                                onChange={e => setId_tipo_centro_medico(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {tipo_centro_medico.map((tipo_centro) => (
                                                                <option value={tipo_centro.id_tipo_centro_medico}>{tipo_centro.tipo_centro_medico}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_tipo_centro_medico?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4 mb-4">
                                                        
                                                        <label htmlFor="id_pais">País (*)</label>
                                                            <div className="form-group">
                                                                <select className="choices form-select" 
                                                                    name="id_pais" 
                                                                    id="id_pais" 
                                                                        {...register('id_pais')}
                                                                        value={id_pais}
                                                                        onChange={e => setId_pais(e.target.value)} 
                                                                        onClick={e => setOpcion_pais(e.target.value)} >
                                                                        <option value={-1}>--Seleccione una opción--</option>
                                                                        {paises.map((pais) => (
                                                                        <option key={pais.id_pais} value={pais.id_pais}>{pais.nombre_pais}</option>
                                                                        ))}
                                                                </select>
                                                                <small className="text-danger"> {errors.id_pais?.message} </small>
                                                            </div>
                                                    </div>

                                                    <div className="col-md-4 mb-4">
                                                        <label htmlFor="id_departamento">Departamento/Estado (*)</label>
                                                            <div className="form-group">
                                                                <select className="choices form-select" 
                                                                        name="id_departamento" 
                                                                        id="id_departamento" 
                                                                        value={id_departamento}
                                                                        {...register('id_departamento')}
                                                                        onChange={e => setId_departamento(e.target.value)} 
                                                                        onClick={e => setOpcion_depto(e.target.value)} >
                                                                        <option value="">--Seleccione una opción--</option>
                                                                        {departamentos.map((departamento) => {
                                                                                if(departamento.id_pais == opcion_pais){
                                                                                    return (
                                                                                    <option key={departamento.id_departamento} 
                                                                                    value={departamento.id_departamento}>{departamento.nombre_departamento}
                                                                                    </option>
                                                                                    )
                                                                                }
                                                                            })}
                                                                </select>
                                                                <small className="text-danger"> {errors.id_departamento?.message} </small>
                                                            </div>
                                                    </div>

                                                    <div className="col-md-4 mb-4">
                                                        <label htmlFor="id_municipio">Municipio/Ciudad (*)</label>
                                                            <div className="form-group">
                                                                <select className="choices form-select" 
                                                                    name="id_municipio" 
                                                                    id="id_municipio"
                                                                    {...register('id_municipio')}
                                                                    value={id_municipio}
                                                                    onChange={e => setId_municipio(e.target.value)}>
                                                                    <option value="">--Seleccione una opción--</option>
                                                                        {municipios.map((municipio) => {
                                                                            if(municipio.id_departamento == opcion_depto){
                                                                                return (
                                                                                <option key={municipio.id_municipio} 
                                                                                value={municipio.id_municipio}>{municipio.nombre_municipio}
                                                                                </option>
                                                                                )
                                                                            }
                                                                        })}
                                                                    </select>
                                                                    <small className="text-danger"> {errors.id_municipio?.message} </small>
                                                            </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="direccion_centro_medico">Dirección (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control" 
                                                                    name="direccion_centro_medico"                   
                                                                    id="direccion_centro_medico"
                                                                    {...register('direccion_centro_medico')}
                                                                    value={direccion_centro_medico}
                                                                    onChange={e => setDireccion_centro_medico(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-house"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.direccion_centro_medico?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="telefono1_centro_medico">Teléfono centro médico (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="telefono1_centro_medico" 
                                                                    id="telefono1_centro_medico" 
                                                                    {...register('telefono1_centro_medico')}
                                                                    value={telefono1_centro_medico}
                                                                    onChange={e => setTelefono1_centro_medico(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-phone"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.telefono1_centro_medico?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="telefono2_centro_medico">Otro teléfono centro médico</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="telefono2_centro_medico" 
                                                                    id="telefono2_centro_medico" 
                                                                    {...register('telefono2_centro_medico')}
                                                                    value={telefono2_centro_medico}
                                                                    onChange={e => setTelefono2_centro_medico(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-phone"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.telefono2_centro_medico?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                        <label htmlFor="correo_centro_medico">Correo electrónico centro médico(*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="correo_centro_medico" 
                                                                    id="correo_centro_medico" 
                                                                    {...register('correo_centro_medico')}
                                                                    value={correo_centro_medico}
                                                                    onChange={e => setCorreo_centro_medico(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-envelope"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.correo_centro_medico?.message} </small>
                                                        </div>
                                                    </div>                                                

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="director">Director(*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="director" 
                                                                    id="director" 
                                                                    {...register('director')}
                                                                    value={director}
                                                                    onChange={e => setDirector(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.director?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="telefono_director">Teléfono director (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="telefono_director" 
                                                                    id="telefono_director" 
                                                                    {...register('telefono_director')}
                                                                    value={telefono_director}
                                                                    onChange={e => setTelefono_director(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-phone"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.telefono_director?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                    <div className="form-group has-icon-left">
                                                        <label htmlFor="correo_director">Correo electrónico director</label>
                                                        <div className="position-relative">
                                                            <input type="text" className="form-control"
                                                                name="correo_director" 
                                                                id="correo_director" 
                                                                {...register('correo_director')}
                                                                value={correo_director}
                                                                onChange={e => setCorreo_director(e.target.value)} />
                                                            <div className="form-control-icon">
                                                                <i className="bi bi-envelope"></i>
                                                            </div>
                                                        </div>
                                                        <small className="text-danger"> {errors.correo_director?.message} </small>
                                                    </div>
                                                    </div>

                                                    <div className="col-12">
                                                    <div className="form-group has-icon-left">
                                                        <label htmlFor="tiempo_consulta_medica">Tiempo de consulta médica</label>
                                                        <div className="position-relative">
                                                            <input type="text" className="form-control"
                                                                placeholder="Formato HH:MM:SS" name="lname-column"
                                                                name="tiempo_consulta_medica" 
                                                                id="tiempo_consulta_medica" 
                                                                {...register('tiempo_consulta_medica')}
                                                                value={tiempo_consulta_medica}
                                                                onChange={e => setTiempo_consulta_medica(e.target.value)} />
                                                            <div className="form-control-icon">
                                                                <i className="bi bi-person"></i>
                                                            </div>
                                                        </div>
                                                        <small className="text-danger"> {errors.tiempo_consulta_medica?.message} </small>
                                                    </div>
                                                    </div>

                                                    <div className="col-12 d-flex justify-content-end">
                                                        <button className="btn btn-secondary">Guardar</button>
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

export default AgregarCentroMedico;