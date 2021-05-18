import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import schema from '../Validaciones/HospitalizacionValidacion';
import ClickLabel from '../Funciones/ClickLabel';

import API from '../api';

const EditarHospitalizacion = () => {

    const API_URL = API.API_URL;

    const { id_hospitalizacion } = useParams();

    const labels = document.getElementsByTagName('label');

    const [codigo_paciente, setCodigo_paciente] = useState('');
    const [fecha_ingreso, setFecha_ingreso] = useState('');
    const [hora_ingreso, setHora_ingreso] = useState('');
    const [motivo_ingreso, setMotivo_ingreso] = useState('');
    const [sala, setSala] = useState('');
    const [camilla, setCamilla] = useState('');
    const [estado_paciente, setEstado_paciente] = useState('');
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

    useEffect(() => {
        API.hospitalizacion_editar(id_hospitalizacion).then(res => {
            const hospitalizacion = res.data;
            setCodigo_paciente(hospitalizacion.codigo_paciente);
            setFecha_ingreso(hospitalizacion.fecha_ingreso);
            setHora_ingreso(hospitalizacion.hora_ingreso);
            setMotivo_ingreso(hospitalizacion.motivo_ingreso);
            setSala(hospitalizacion.sala);
            setCamilla(hospitalizacion.camilla);
            setEstado_paciente(hospitalizacion.estado_paciente);
            
            ClickLabel(labels);
       })

     }, []);


    const editarHospitalizacion = async (data) => {
    
        try {
          const body = { fecha_ingreso, hora_ingreso, motivo_ingreso, sala, camilla, estado_paciente};
          const response = await fetch(`${API_URL}/hospitalizaciones/${id_hospitalizacion}/actualizar`, {
            method: "PUT",
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
                                <h3>Hospitalización</h3>
                                <h5>Expediente </h5>
                            
                                <p className="text-subtitle text-muted">Editar hospitalización</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/expedientes/crear">Editar hospitalización</Link>
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
                                        <form className="form form-vertical" onSubmit={handleSubmit(editarHospitalizacion)}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                                   
                                                    <div className="col-6">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="fecha_ingreso">Fecha de ingreso (*)</label>
                                                            <div className="position-relative">
                                                                <input type="date" className="form-control"
                                                                    name="fecha_ingreso"
                                                                    id="fecha_ingreso"
                                                                    {...register('fecha_ingreso')}
                                                                    value={fecha_ingreso}
                                                                    onChange={e => setFecha_ingreso(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-calendar"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.fecha_ingreso?.message} </small>
                                                        </div>
                                                    </div>


                                                    <div className="col-6">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="hora_ingreso">Hora de ingreso (*)</label>
                                                            <div className="position-relative">
                                                                <input type="time" className="form-control"
                                                                    name="hora_ingreso"
                                                                    id="hora_ingreso"
                                                                    {...register('hora_ingreso')}
                                                                    value={hora_ingreso}
                                                                    onChange={e => setHora_ingreso(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-alarm"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.hora_ingreso?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="motivo_ingreso">Motivo de ingreso (*)</label>
                                                            <div className="position-relative">
                                                                <textarea type="text" className="form-control" rows="4"
                                                                    name="motivo_ingreso"
                                                                    id="motivo_ingreso"
                                                                    {...register('motivo_ingreso')}
                                                                    value={motivo_ingreso}
                                                                    onChange={e => setMotivo_ingreso(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-card-text"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.motivo_ingreso?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="sala">Sala de ingreso (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="sala"
                                                                    id="sala"
                                                                    {...register('sala')}
                                                                    value={sala}
                                                                    onChange={e => setSala(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-columns"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.sala?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="camilla">Camilla (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="camilla"
                                                                    id="camilla"
                                                                    {...register('camilla')}
                                                                    value={camilla}
                                                                    onChange={e => setCamilla(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-truck-flatbed"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.camilla?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="estado_paciente">Estado paciente (*)</label>
                                                            <div className="position-relative">
                                                                <textarea type="text" className="form-control" rows="4"
                                                                    name="estado_paciente"
                                                                    id="estado_paciente"
                                                                    {...register('estado_paciente')}
                                                                    value={estado_paciente}
                                                                    onChange={e => setEstado_paciente(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.estado_paciente?.message} </small>
                                                        </div>
                                                    </div>


                                                    <div className="col-12 d-flex justify-content-end">
                                                        <button className="btn btn-secondary">Actualizar</button>
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

export default EditarHospitalizacion;