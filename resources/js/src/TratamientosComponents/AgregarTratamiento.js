import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';


import API from '../api';

const AgregarTratamiento = () => {

    const API_URL = API.API_URL;

    //Datos para el formulario
    const [tipos_tratamientos, setTipos_tratamientos] = useState([]);

    //Datos para la tabla
    const [codigo_tratamiento, setCodigo_tratamiento] = useState('');
    const [nombre_tratamiento, setNombre_tratamiento] = useState('');
    const [id_tipo_tratamiento, setId_tipo_tratamiento] = useState('');
    const [descripcion_tratamiento, setDescripcion_tratamiento] = useState('');
    const [costo_tratamiento, setCosto_tratamiento] = useState('');

    //Función para traer los datos que se ven en el formulario
    useEffect(() => {
        API.datos_formulario_tratamiento().then(res => {
           const result = res.data;
           setTipos_tratamientos(result.tipos_tratamientos);
       })
     }, []);


     const { register, handleSubmit, formState: { errors } } = useForm({
        //resolver: yupResolver(schemaAgregarExpediente),
      });


    //Funcion para guardar
    const agregarTratamiento = async e => {
        e.preventDefault();
        try {
          const body = { codigo_tratamiento, nombre_tratamiento, id_tipo_tratamiento, descripcion_tratamiento, costo_tratamiento};
          const response = await fetch(`${API_URL}/tratamientosmedicos/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = "/tratamientosmedicos";
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
                                <h3>Tratamientos médicos</h3>
                                
                                <p className="text-subtitle text-muted">Agregar tratamiento</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/tratamientosmedicos/crear">Agregar tratamiento</Link>
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
                                        <form className="form form-vertical" onSubmit={agregarTratamiento}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                                <h5>Datos de tratamiento</h5>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="codigo_tratamiento">Código de tratamiento</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="codigo_tratamiento"
                                                                    id="codigo_tratamiento"
                                                                    {...register('codigotratamiento')}
                                                                    value={codigo_tratamiento}
                                                                    onChange={e => setCodigo_tratamiento(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-upc-scan"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.codigo_tratamiento?.message} </small>
                                                        </div>
                                                    </div>
                                           
                                                    <div className="col-6">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="nombre_tratamiento">Nombre del tratamiento (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="nombre_tratamientoo"
                                                                    id="nombre_tratamiento"
                                                                    {...register('nombre_tratamiento')}
                                                                    value={nombre_tratamiento}
                                                                    onChange={e => setNombre_tratamiento(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.nombre_tratamiento?.message} </small>
                                                        </div>
                                                    </div>

                                                
                                                    <div className="col-md-12 mb-4">
                                                    <label htmlFor="id_tipo_tratamiento">Tipo del tratamiento (*)</label>
                                                        <div className="form-group">
                                                            <select className="choices form-select"
                                                                name="id_tipo_tratamiento" 
                                                                id="id_tipo_tratamiento" 
                                                                {...register('id_tipo_tratamiento')}
                                                                value={id_tipo_tratamiento}
                                                                onChange={e => setId_tipo_tratamiento(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {tipos_tratamientos.map((tipo_tratamiento) => (
                                                                <option value={tipo_tratamiento.id_tipo_tratamiento}>{tipo_tratamiento.tipo_tratamiento}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_tipo_tratamiento?.message} </small>
                                                        </div>
                                                    </div>


                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="descripcion_tratamiento">Descripción del tratamiento</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="descripcion_tratamiento" 
                                                                    id="descripcion_tratamiento" 
                                                                    {...register('descripcion_tratamiento')}
                                                                    value={descripcion_tratamiento}
                                                                    onChange={e => setDescripcion_tratamiento(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i class="bi bi-card-checklist"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <small className="text-danger"> {errors.descripcion_tratamiento?.message} </small>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="costo_tratamiento">Costo del tratamiento</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="costo_tratamiento" 
                                                                    id="costo_tratamiento" 
                                                                    {...register('descripcion_tratamiento')}
                                                                    value={costo_tratamiento}
                                                                    onChange={e => setCosto_tratamiento(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-cash"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <small className="text-danger"> {errors.costo_tratamiento?.message} </small>
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

export default AgregarTratamiento;