import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import schema from '../Validaciones/CitaValidacion';
import ClickLabel from '../Funciones/ClickLabel';

import API from '../api';

const EditarCita = () => {
    
    const API_URL = API.API_URL;

    const {id_cita} = useParams();

    const [doctores, set_doctores] = useState([]);
    const [consultorios, set_consultorios] = useState([]);
    const [especialidades, set_especialidades] = useState([]);
    const [centros_medicos, set_centros_medicos] = useState([]);
   
    const labels = document.getElementsByTagName('label');

    const [id_doctor, set_id_doctor] = useState('');
    const [id_consultorio, set_id_consultorio] = useState('');
    const [fecha_cita, set_fecha_cita] = useState('');
    const [hora_cita, set_hora_cita] = useState('');
    const [id_especialidad, set_id_especialidad] = useState('');
    const [id_centro_medico, set_id_centro_medico] = useState('');
    const [opcion_centro_medico, set_opcion_centro_medico] = useState('');
    const [opcion_especialidad, set_opcion_especialidad] = useState('');
    
    useEffect(() => {
        API.datos_formulario_cita().then(res => {
           const result = res.data;
           set_doctores(result.doctores);
           set_consultorios(result.consultorios);
           set_especialidades(result.especialidades);
           set_centros_medicos(result.centros_medicos);
           ClickLabel(labels);
       })

       API.cita_ver(id_cita).then(res => {
        const cita = res.data;
        set_id_doctor(cita.id_doctor);
        set_id_consultorio(cita.id_consultorio);
        set_fecha_cita(cita.fecha_cita);
        set_hora_cita(cita.hora_cita);
        set_id_especialidad(cita.id_especialidad);
        set_id_centro_medico(cita.id_centro_medico); 

        ClickLabel(labels);
        
    })

     
     }, []);


     const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

    const editarCita = async (data) => {
        try {
          const body = { id_centro_medico, id_especialidad, id_consultorio, id_doctor, fecha_cita, hora_cita };
          const response = await fetch(`${API_URL}/citas/${id_cita}/actualizar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = "/citas";
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
                                <h3>Citas</h3>
                              
                                <p className="text-subtitle text-muted">Agregar cita</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/diagnostico/crear">Agregar diagnóstico</Link>
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
                                        <form className="form form-vertical" onSubmit={handleSubmit(editarCita)}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                                <div className="col-md-12 mb-4">
                                                    <label htmlFor="id_centro_medico">Centro médico (*)</label>
                                                        <div className="form-group">
                                                            <select className="form-select"
                                                                name="id_centro_medico" 
                                                                id="id_centro_medico" 
                                                                {...register('id_centro_medico')}
                                                                value={id_centro_medico}
                                                                onChange={e => set_id_centro_medico(e.target.value)}
                                                                onClick={e => set_opcion_centro_medico(e.target.value)}  >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {centros_medicos.map((centro_medico) => (
                                                                <option  value={centro_medico.id_centro_medico}>{centro_medico.nombre_centro_medico}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_centro_medico?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mb-4">
                                                    <label htmlFor="id_especialidad">Especialidad (*)</label>
                                                        <div className="form-group">
                                                            <select className="form-select"
                                                                name="id_especialidad" 
                                                                id="id_especialidad" 
                                                                {...register('id_especialidad')}
                                                                value={id_especialidad}
                                                                onChange={e => set_id_especialidad(e.target.value)}
                                                                onClick={e => set_opcion_especialidad(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {especialidades.map((especialidad) => (
                                                                <option  value={especialidad.id_especialidad}>{especialidad.nombre_especialidad}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_especialidad?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mb-4">
                                                    <label htmlFor="id_doctor">Doctor (*)</label>
                                                        <div className="form-group">
                                                            <select className="form-select"
                                                                name="id_doctor" 
                                                                id="id_doctor" 
                                                                {...register('id_doctor')}
                                                                value={id_doctor}
                                                                onChange={e => set_id_doctor(e.target.value)} >
                                                               <option value="">--Seleccione una opción--</option>
                                                                    {doctores.map((doctor) => {
                                                                        if(doctor.id_centro_medico == opcion_centro_medico && doctor.id_especialidad == opcion_especialidad){
                                                                            return (
                                                                            <option key={doctor.id_doctor} 
                                                                            value={doctor.id_doctor}>{doctor.nombre_empleado}
                                                                            </option>
                                                                            )
                                                                        }
                                                                    })}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_doctor?.message} </small>
                                                        </div>
                                                    </div>


                                                    <div className="col-md-4 mb-4">
                                                    <label htmlFor="id_consultorio">Consultorio (*)</label>
                                                        <div className="form-group">
                                                            <select className="form-select"
                                                                name="id_consultorio" 
                                                                id="id_consultorio" 
                                                                {...register('id_consultorio')}
                                                                value={id_consultorio}
                                                                onChange={e => set_id_consultorio(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                    {consultorios.map((consultorio) => {
                                                                        if(consultorio.id_centro_medico == opcion_centro_medico){
                                                                            return (
                                                                            <option key={consultorio.id_consultorio} 
                                                                            value={consultorio.id_consultorio}>{consultorio.consultorio}
                                                                            </option>
                                                                            )
                                                                        }
                                                                    })}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_consultorio?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-4">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="fecha_cita">Fecha (*)</label>
                                                            <div className="position-relative">
                                                                <input type="date" className="form-control"
                                                                    name="fecha_cita"
                                                                    id="fecha_cita"
                                                                    {...register('fecha_cita')}
                                                                    value={fecha_cita}
                                                                    onChange={e => set_fecha_cita(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.fecha_cita?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-4">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="hora_cita">Fecha (*)</label>
                                                            <div className="position-relative">
                                                                <input type="time" className="form-control"
                                                                    name="hora_cita"
                                                                    id="hora_cita"
                                                                    {...register('hora_cita')}
                                                                    value={hora_cita}
                                                                    onChange={e => set_hora_cita(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.hora_cita?.message} </small>
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

export default EditarCita;