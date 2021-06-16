import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import schema from '../Validaciones/ConsultaValidacion';

import API from '../api';

const AgregarConsulta = () => {
    
    const API_URL = API.API_URL;

    const {id_cita, codigo_paciente} = useParams();

    const [sintomatologia, set_sintomatologia] = useState('');
    const [observaciones, set_observaciones] = useState('');
    
    
     const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

    const agregarConsulta = async (data) => {
        try {
          const body = { id_cita, sintomatologia, observaciones, codigo_paciente};
          const response = await fetch(`${API_URL}/consultas/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = `/expedientes/${codigo_paciente}/ver`;
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
                                <h3>Consulta</h3>
                              
                                <p className="text-subtitle text-muted">Agregar consulta</p>
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
                                        <form className="form form-vertical" onSubmit={handleSubmit(agregarConsulta)}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                                <h5>Datos generales</h5>

                                
                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="sintomatologia">Sintomatología (*)</label>
                                                            <div className="position-relative">
                                                                <textarea type="text" className="form-control" rows="6"
                                                                    name="sintomatologia"
                                                                    id="sintomatologia"
                                                                    {...register('sintomatologia')}
                                                                    value={sintomatologia}
                                                                    onChange={e => set_sintomatologia(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.sintomatologia?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="observaciones">Observaciones (*)</label>
                                                            <div className="position-relative">
                                                                <textarea type="text" className="form-control" rows="6"
                                                                    name="observaciones"
                                                                    id="observaciones"
                                                                    {...register('observaciones')}
                                                                    value={observaciones}
                                                                    onChange={e => set_observaciones(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.observaciones?.message} </small>
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

export default AgregarConsulta;