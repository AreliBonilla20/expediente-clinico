import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import swal from 'sweetalert';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import schema from '../Validaciones/AsignarCirugia';

import API from '../api';

const EditarCirugiaAsignada = () => {
    
    const API_URL = API.API_URL;

    var {id_consulta, id_hospitalizacion, id_atencion_medica} = useParams();
    if(id_consulta == undefined){
            id_consulta = 'null';
    }

    if(id_hospitalizacion == undefined){
        id_hospitalizacion = 'null';
    }

    const [cirugias, set_cirugias] = useState([]);
    const [quirofanos, set_quirofanos] = useState([]);

    const [codigo_cirugia, set_codigo_cirugia] = useState('');
    const [id_quirofano, set_id_quirofano] = useState('');
    const [hora_cirugia, set_hora_cirugia] = useState('');
    
    useEffect(() => {
        API.cirugia_asignada_editar(id_atencion_medica).then(res => {
           const cirugia_asignada_editar = res.data;
           set_codigo_cirugia(cirugia_asignada_editar.codigo_cirugia);
           set_id_quirofano(cirugia_asignada_editar.id_quirofano);
           set_hora_cirugia(cirugia_asignada_editar.hora_cirugia);
       })


     }, []);


     const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

    const editarCirugiaAsignada = async (data) => {
        try {
          const body = { codigo_cirugia, id_quirofano, hora_cirugia };
          const response = await fetch(`${API_URL}/historial_cirugias/${id_atencion_medica}/actualizar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          if(id_hospitalizacion !== 'null'){
            const codigo = id_hospitalizacion.substring(0,7);
            window.location = `/expedientes/${codigo}/hospitalizaciones/${id_hospitalizacion}/ver`;
          }
    
          if(id_consulta !== 'null'){
            const codigo = id_consulta.substring(0,7);
            window.location = `/expedientes/${codigo}/consultas/${id_consulta}/ver`;
          }
          if(response.status === 200){
            swal({
                title: "Éxito",
                text: "Cirugía asignada actualizada!",
                icon: "success",
                button: "Aceptar",
              });
          }
          else{
            swal({
                title: "Error",
                text: "Ocurrió un error!",
                icon: "danger",
                button: "Aceptar",
              });
          }
          
          
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
                                <h3>Cirugías</h3>
                              
                                <p className="text-subtitle text-muted">Agregar cirugía</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/cirugia/crear">Agregar cirugía</Link>
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
                                        <form className="form form-vertical" onSubmit={handleSubmit(editarCirugiaAsignada)}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                                <h5>Datos generales</h5>

                                                <div className="col-md-12 mb-4">
                                                    <label htmlFor="codigo_cirugia">Cirugía (*)</label>
                                                        <div className="form-group">
                                                            <select className="form-select"
                                                                name="codigo_cirugia" 
                                                                id="codigo_cirugia" 
                                                                {...register('codigo_cirugia')}
                                                                value={codigo_cirugia}
                                                                onChange={e => set_codigo_cirugia(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {cirugias.map((cirugia) => (
                                                                <option  value={cirugia.codigo_cirugia}>{cirugia.nombre_cirugia}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.codigo_cirugia?.message} </small>
                                                        </div>
                                                    </div>
                                           
                                                    <div className="col-md-12 mb-4">
                                                    <label htmlFor="id_quirofano">Quirofano (*)</label>
                                                        <div className="form-group">
                                                            <select className="form-select"
                                                                name="id_quirofano" 
                                                                id="id_quirofano" 
                                                                {...register('id_quirofano')}
                                                                value={id_quirofano}
                                                                onChange={e => set_id_quirofano(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {quirofanos.map((quirofano) => (
                                                                <option  value={quirofano.id_quirofano}>{quirofano.quirofano}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_quirofano?.message} </small>
                                                        </div>
                                                    </div>
                                           

                                                
                                                    <div className="col-md-12 mb-4">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="hora_cirugia">Hora de la cirugía (*)</label>
                                                            <div className="position-relative">
                                                                <input type="time" className="form-control"
                                                                    name="hora_cirugia"
                                                                    id="hora_cirugia"
                                                                    {...register('hora_cirugia')}
                                                                    value={hora_cirugia}
                                                                    onChange={e => set_hora_cirugia(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.hora_cirugia?.message} </small>
                                                        </div>
                                                    </div>

                                                   

                                                   
                                                    <div className="col-12 d-flex justify-content-end">
                                                        <button className="btn btn-secondary">Guardar</button>
                                                    </div>
                                                    {JSON.stringify(codigo_cirugia)}
                                                    {JSON.stringify(id_quirofano)}
                                                    {JSON.stringify(hora_cirugia)}

                                                    
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

export default EditarCirugiaAsignada;