import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import swal from 'sweetalert';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import schema from '../Validaciones/DiagnosticoValidacion';

import API from '../api';

const AgregarDiagnostico = () => {
    
    const API_URL = API.API_URL;

    const [diagnosticos, setDiagnosticos] = useState([]);

    const [tipos_diagnosticos, setTipos_diagnosticos] = useState([]);

    const [codigo_diagnostico, setCodigo_diagnostico] = useState('');
    const [nombre_diagnostico, setNombre_diagnostico] = useState('');
    const [id_tipo_diagnostico, setId_tipo_diagnostico] = useState('');
    const [descripcion_diagnostico, setDescripcion_diagnostico] = useState('');
    
    useEffect(() => {
        API.datos_formulario_diagnostico().then(res => {
           const result = res.data;
           setTipos_diagnosticos(result.tipos_diagnosticos);
       })

       API.diagnosticos().then(res => {
           const result = res.data;
           setDiagnosticos(result.data);
       })

     }, []);


     const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

    const agregarDiagnostico = async (data) => {
        try {
          const body = { codigo_diagnostico, nombre_diagnostico, id_tipo_diagnostico, descripcion_diagnostico};
          const response = await fetch(`${API_URL}/diagnosticos/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = "/diagnosticos";
          if(response.status === 200){
            swal({
                title: "Éxito",
                text: "Diagnóstico registrado!",
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
                                <h3>Diagnósticos</h3>
                              
                                <p className="text-subtitle text-muted">Agregar diagnóstico</p>
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
                                        <form className="form form-vertical" onSubmit={handleSubmit(agregarDiagnostico)}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                                <h5>Datos generales</h5>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="codigo_diagnostico">Código de diagnóstico</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="codigo_diagnostico"
                                                                    id="codigo_diagnostico"
                                                                    {...register('codigo_diagnostico')}
                                                                    value={codigo_diagnostico}
                                                                    onChange={e => setCodigo_diagnostico(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.codigo_diagnostico?.message} </small>
                                                              {
                                                                  diagnosticos.map((diagnostico) => {
                                                                      if(diagnostico.codigo_diagnostico === codigo_diagnostico){
                                                                        return(
                                                                            <small className="text-danger">Ya existe un registro con este mismo código, debe ser distinto</small>
                                                                        )
                                                                    }
                                                                  })
                                                              }
                                                        </div>
                                                    </div>
                                           
                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="nombre_diagnostico">Nombre diagnóstico (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="nombre_diagnostico"
                                                                    id="nombre_diagnostico"
                                                                    {...register('nombre_diagnostico')}
                                                                    value={nombre_diagnostico}
                                                                    onChange={e => setNombre_diagnostico(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.nombre_diagnostico?.message} </small>
                                                        </div>
                                                    </div>

                                                
                                                    <div className="col-md-12 mb-4">
                                                    <label htmlFor="id_tipo_diagnostico">Tipo diagnóstico (*)</label>
                                                        <div className="form-group">
                                                            <select className="form-select"
                                                                name="id_tipo_diagnostico" 
                                                                id="id_tipo_diagnostico" 
                                                                {...register('id_tipo_diagnostico')}
                                                                value={id_tipo_diagnostico}
                                                                onChange={e => setId_tipo_diagnostico(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {tipos_diagnosticos.map((tipo_diagnostico) => (
                                                                <option  value={tipo_diagnostico.id_tipo_diagnostico}>{tipo_diagnostico.tipo_diagnostico}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_tipo_diagnostico?.message} </small>
                                                        </div>
                                                    </div>


                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="descripcion_diagnostico">Descripción de diagnóstico</label>
                                                            <div className="position-relative">
                                                                <textarea type="text" className="form-control" rows="4"
                                                                    name="descripcion_diagnostico" 
                                                                    id="descripcion_diagnostico" 
                                                                    {...register('descripcion_diagnostico')}
                                                                    value={descripcion_diagnostico}
                                                                    onChange={e => setDescripcion_diagnostico(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.descripcion_diagnostico?.message} </small>
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

export default AgregarDiagnostico;