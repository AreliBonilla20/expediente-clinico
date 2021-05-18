import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {useParams} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import schema from '../Validaciones/AntecedenteValidacion';

import API from '../api';

const AgregarAntecedente = () => {

    const API_URL = API.API_URL;
    const { codigo } = useParams();

    const [historial_enfermedades, setHistorial_enfermedades] = useState('');
    const [nombre_padre, setNombre_padre] = useState('');
    const [apellidos_padre, setApellidos_padre] = useState('');
    const [fecha_nacimiento_padre, setFecha_nacimiento_padre] = useState('');
    const [direccion_padre, setDireccion_padre] = useState('');
    const [padecimientos_padre, setPadecimientos_padre] = useState('');
    const [nombre_madre, setNombre_madre] = useState('');
    const [apellidos_madre, setApellidos_madre] = useState('');
    const [fecha_nacimiento_madre, setFecha_nacimiento_madre] = useState('');
    const [direccion_madre, setDireccion_madre] = useState('');
    const [padecimientos_madre, setPadecimientos_madre] = useState('');
    const [padecimientos_familiares, setPadecimientos_familiares] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

    const agregarAntecedente = async (data) => {
        try {
          const body = { historial_enfermedades, nombre_padre, apellidos_padre, fecha_nacimiento_padre, direccion_padre, 
                         padecimientos_padre, nombre_madre, apellidos_madre, fecha_nacimiento_madre, direccion_madre, padecimientos_madre, padecimientos_familiares
         };

          const response = await fetch(`${API_URL}/antecedentes/${codigo}/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = `/expedientes/${codigo}/ver`;
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
                                <h3>Antecedentes</h3>
                                <h5>Expediente {codigo}</h5>
                                
                                <p className="text-subtitle text-muted">Agregar antecedente</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <Link to="/expedientes">Consultar expedientes</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <Link to="ver">Ver expediente</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <Link to="/expedientes/antecedentes/crear">Agregar antecedentes</Link>
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
                                        <form className="form form-vertical" onSubmit={handleSubmit(agregarAntecedente)}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                               

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="padecimientos_familiares">Padecimientos de familiares</label>
                                                            <div className="position-relative">
                                                                <textarea type="text" className="form-control" rows="4"
                                                                    name="padecimientos_familiares"
                                                                    id="padecimientos_familiares"
                                                                    {...register('padecimientos_familiares')}
                                                                    value={padecimientos_familiares}
                                                                    onChange={e => setPadecimientos_familiares(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.padecimientos_familiares?.message} </small>
                                                        </div>
                                                    </div>

                                                    <h5>Historial de enfermedades del padre</h5>

                                                    <div className="col-6">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="nombre_padre">Nombre del padre </label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="nombre_padre"
                                                                    id="nombre_padre"
                                                                    {...register('nombre_padre')}
                                                                    value={nombre_padre}
                                                                    onChange={e => setNombre_padre(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.nombre_padre?.message} </small>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="apellidos_padre">Apellidos del padre</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control" 
                                                                    name="apellidos_padre"                   
                                                                    id="apellidos_padre"
                                                                    {...register('apellidos_padre')}
                                                                    value={apellidos_padre}
                                                                    onChange={e => setApellidos_padre(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.apellidos_padre?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="fecha_nacimiento_padre">Fecha de nacimiento del padre</label>
                                                            <div className="position-relative">
                                                                <input type="date" className="form-control"
                                                                    name="fecha_nacimiento_padre"
                                                                    id="fecha_nacimiento_padre"
                                                                    {...register('fecha_nacimiento_padre')}
                                                                    value={fecha_nacimiento_padre}
                                                                    onChange={e => setFecha_nacimiento_padre(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-calendar"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.fecha_nacimiento_padre?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="direccion_padre">Dirección del padre</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="direccion_padre"
                                                                    id="direccion_padre"
                                                                    {...register('direccion_padre')}
                                                                    value={direccion_padre}
                                                                    onChange={e => setDireccion_padre(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-house"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.direccion_padre?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="padecimientos_padre">Padecimientos del padre</label>
                                                            <div className="position-relative">
                                                                <textarea type="text" className="form-control" rows="4"
                                                                    name="padecimientos_padre"
                                                                    id="padecimientos_padre"
                                                                    {...register('padecimientos_padre')}
                                                                    value={padecimientos_padre}
                                                                    onChange={e => setPadecimientos_padre(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.padecimientos_padre?.message} </small>
                                                        </div>
                                                    </div>
                                                   
                                                    <h5>Historial de enfermedades de la madre</h5>
                                                    <div className="col-6">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="nombre_madre">Nombres de la madre </label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="nombre_madre"
                                                                    id="nombre_madre"
                                                                    {...register('nombre_madre')}
                                                                    value={nombre_madre}
                                                                    onChange={e => setNombre_madre(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.nombre_madre?.message} </small>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="apellidos_madre">Apellidos de la madre</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control" 
                                                                    name="apellidos_madre"                   
                                                                    id="apellidos_madre"
                                                                    {...register('apellidos_madre')}
                                                                    value={apellidos_madre}
                                                                    onChange={e => setApellidos_madre(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.apellidos_madre?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="fecha_nacimiento_madre">Fecha de nacimiento de la madre</label>
                                                            <div className="position-relative">
                                                                <input type="date" className="form-control"
                                                                    name="fecha_nacimiento_madre"
                                                                    id="fecha_nacimiento_madre"
                                                                    {...register('fecha_nacimiento_madre')}
                                                                    value={fecha_nacimiento_madre}
                                                                    onChange={e => setFecha_nacimiento_madre(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-calendar"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.fecha_nacimiento_madre?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="direccion_madre">Dirección de la madre</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="direccion_madre"
                                                                    id="direccion_madre"
                                                                    {...register('direccion_madre')}
                                                                    value={direccion_madre}
                                                                    onChange={e => setDireccion_madre(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-house"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.direccion_madre?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="padecimientos_madre">Padecimientos de la madre</label>
                                                            <div className="position-relative">
                                                                <textarea type="text" className="form-control" rows="4"
                                                                    name="padecimientos_madre"
                                                                    id="padecimientos_madre"
                                                                    {...register('padecimientos_madre')}
                                                                    value={padecimientos_madre}
                                                                    onChange={e => setPadecimientos_madre(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.padecimientos_madre?.message} </small>
                                                        </div>
                                                    </div>
                                                
                                                    <h5>Historial de enfermedades del paciente</h5>
                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="historial_enfermedades">Historial de enfermedades (*)</label>
                                                            <div className="position-relative">
                                                                <textarea type="text" className="form-control" rows="4"
                                                                    name="historial_enfermedades"
                                                                    id="historial_enfermedades"
                                                                    {...register('historial_enfermedades')}
                                                                    value={historial_enfermedades}
                                                                    onChange={e => setHistorial_enfermedades(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.historial_enfermedades?.message} </small>
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

export default AgregarAntecedente;