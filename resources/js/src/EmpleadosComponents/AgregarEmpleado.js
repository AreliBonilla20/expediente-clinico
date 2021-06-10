import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import swal from 'sweetalert';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';
import schema from '../Validaciones/EmpleadoValidacion';

import API from '../api';

const AgregarEmpleado = () => {

    const API_URL = API.API_URL;
    

    //Datos para el formulario
    const [tipo_personal, set_tipo_personal] =useState([]);
    const [generos, set_generos] =useState([]);
    const [paises, set_paises] =useState([]);
    const [municipios, set_municipios] =useState([]);
    const [departamentos, set_departamentos] =useState([]);
    const [centros_medicos, set_centros_medicos] =useState([]);
    const [especialidades, set_especialidades] =useState([]);

    const [opcion_pais, set_opcion_pais] = useState();
    const [opcion_depto, set_opcion_depto] = useState();
    const [id_medico, set_id_medico] = useState('');
    
    //Datos para la tabla
    const [id_genero, set_id_genero] = useState('');
    const [id_tipo_personal, set_id_tipo_personal] = useState('');
    const [id_centro_medico, set_id_centro_medico] = useState('');
    const [id_pais, set_id_pais] = useState('');
    const [id_departamento, set_id_departamento] = useState('');
    const [id_municipio, set_id_municipio] = useState('');
    const [nombre_empleado, set_nombre_empleado] = useState('');
    const [apellido_empleado, set_apellido_empleado] = useState('');
    const [identificacion_empleado, set_identificacion_empleado] = useState('');
    const [fecha_nacimiento_empleado, set_fecha_nacimiento_empleado] = useState('');
    const [direccion_empleado, set_direccion_empleado] = useState('');
    const [telefono_empleado, set_telefono_empleado] = useState('');
    const [correo_empleado, set_correo_empleado] = useState('');
    const [id_especialidad, set_id_especialidad] = useState('');
    const [area_atencion, set_area_atencion] = useState('');
 

    //Función para traer los datos que se ven en el formulario

    useEffect(() => {
        API.datos_formulario_empleado().then(res => {
           const result = res.data;
           set_tipo_personal(result.tipo_personal);
           set_generos(result.generos);
           set_paises(result.paises);
           set_departamentos(result.departamentos);
           set_municipios(result.municipios);
           set_centros_medicos(result.centros_medicos);
           set_id_medico(result.id_medico);
           //set_id_especialidad();
           //set_area_atencion(" ");
           
        })
        API.especialidades().then(res => {
            const result = res.data;
            set_especialidades(result);
        })
        
     }, []);


     const { register, handleSubmit, formState: { errors } } = useForm({
         resolver: yupResolver(schema),
      });


      //Funcion para guardar
    const agregarEmpleado = async (data) => {
        try {
          const body = { id_genero, id_tipo_personal, id_centro_medico, id_pais, id_departamento, id_municipio, area_atencion, id_especialidad,
          nombre_empleado, apellido_empleado, identificacion_empleado, fecha_nacimiento_empleado, direccion_empleado, telefono_empleado, 
          correo_empleado
         };
          const response = await fetch(`${API_URL}/empleados/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
         //Regresa luego de guardar. Misma ruta de api.php
          window.location = "/empleados";
          if(response.status === 200){
            swal({
                title: "Éxito",
                text: "Empleado registrado!",
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
                                <h3>Empleados </h3>
                                
                                <p className="text-subtitle text-muted">Agregar empleado</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/empleados/crear">Agregar empleado</Link>
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
                                        <form className="form form-vertical" onSubmit={handleSubmit(agregarEmpleado)}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                                <h5>Datos generales</h5>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="identificacion_empleado">Identificación (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control" 
                                                                    name="identificacion_empleado"                   
                                                                    id="identificacion_empleado"
                                                                    {...register('identificacion_empleado')}
                                                                    value={identificacion_empleado}
                                                                    onChange={e => set_identificacion_empleado(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person-badge-fill"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.identificacion_empleado?.message} </small>
                                                        </div>
                                                    </div>


                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="nombre_empleado">Nombres(*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="nombre_empleado"
                                                                    id="nombre_empleado"
                                                                    {...register('nombre_empleado')}
                                                                    value={nombre_empleado}
                                                                    onChange={e => set_nombre_empleado(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.nombre_empleado?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="apellido_empleado">Apellidos (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="apellido_empleado"
                                                                    id="apellido_empleado"
                                                                    {...register('apellido_empleado')}
                                                                    value={apellido_empleado}
                                                                    onChange={e => set_apellido_empleado(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-person"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.apellido_empleado?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="fecha_nacimiento_empleado">Fecha de nacimiento (*)</label>
                                                            <div className="position-relative">
                                                                <input type="date" className="form-control"
                                                                    name="fecha_nacimiento_empleado"
                                                                    id="fecha_nacimiento_empleado"
                                                                    {...register('fecha_nacimiento_empleado')}
                                                                    value={fecha_nacimiento_empleado}
                                                                    onChange={e => set_fecha_nacimiento_empleado(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-calendar"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.fecha_nacimiento_empleado?.message} </small>
                                                        </div>
                                                    </div>


                                                    <div className="col-md-12 mb-4">
                                                        <label htmlFor="id_genero">Género (*)</label>
                                                        <div className="form-group">
                                                            <select className="form-select"
                                                                name="id_genero" 
                                                                id="id_genero" 
                                                                {...register('id_genero')}
                                                                value={id_genero}
                                                                onChange={e => set_id_genero(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {generos.map((genero) => (
                                                                <option value={genero.id_genero}>{genero.genero}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_genero?.message} </small>
                                                        </div>
                                                    </div>
 
                                                   
                                                   
                                                    <div className="col-md-4 mb-4">
                                                        <label htmlFor="id_pais">País (*)</label>
                                                        <div className="form-group">
                                                            <select className="form-select" 
                                                                name="id_pais" 
                                                                id="id_pais" 
                                                                {...register('id_pais')}
                                                                value={id_pais}
                                                                onChange={e => set_id_pais(e.target.value)} 
                                                                onClick={e => set_opcion_pais(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
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
                                                                <select className="form-select" 
                                                                name="id_departamento" 
                                                                id="id_departamento" 
                                                                value={id_departamento}
                                                                {...register('id_departamento')}
                                                                onChange={e => set_id_departamento(e.target.value)} 
                                                                onClick={e => set_opcion_depto(e.target.value)} >
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
                                                                <select className="form-select" 
                                                                name="id_municipio" 
                                                                id="id_municipio"
                                                                {...register('id_municipio')}
                                                                value={id_municipio}
                                                                onChange={e => set_id_municipio(e.target.value)} >
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
                                                            <label htmlFor="direccion_empleado">Dirección (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control" 
                                                                    name="direccion_empleado"                   
                                                                    id="direccion_empleado"
                                                                    {...register('direccion_empleado')}
                                                                    value={direccion_empleado}
                                                                    onChange={e => set_direccion_empleado(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-house"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.direccion_empleado?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="telefono_empleado">Teléfono (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="telefono_empleado" 
                                                                    id="telefono_empleado" 
                                                                    {...register('telefono_empleado')}
                                                                    value={telefono_empleado}
                                                                    onChange={e => set_telefono_empleado(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-phone"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.telefono_empleado?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                        <label htmlFor="correo_empleado">Correo electrónico (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="correo_empleado" 
                                                                    id="correo_empleado" 
                                                                    {...register('correo_empleado')}
                                                                    value={correo_empleado}
                                                                    onChange={e => set_correo_empleado(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-envelope"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.correo_empleado?.message} </small>
                                                        </div>
                                                    </div> 

                                                    <h5>Información del lugar de trabajo</h5>
                                                   

                                                    <div className="col-md-12 mb-4">
                                                        <label htmlFor="id_centro_medico">Centro médico (*)</label>
                                                        <div className="form-group">
                                                            <select className="form-select"
                                                                name="id_centro_medico" 
                                                                id="id_centro_medico" 
                                                                {...register('id_centro_medico')}
                                                                value={id_centro_medico}
                                                                onChange={e => set_id_centro_medico(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {centros_medicos.map((centro_medico) => (
                                                                <option value={centro_medico.id_centro_medico}>{centro_medico.nombre_centro_medico}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_centro_medico?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 mb-4">
                                                        <label htmlFor="id_tipo_personal">Tipo Personal (*)</label>
                                                        <div className="form-group">
                                                            <select className="form-select"
                                                                name="id_tipo_personal" 
                                                                id="id_tipo_personal" 
                                                                {...register('id_tipo_personal')}
                                                                value={id_tipo_personal}
                                                                onChange={e => set_id_tipo_personal(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {tipo_personal.map((personal) => (
                                                                <option value={personal.id_tipo_personal}>{personal.cargo}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_tipo_personal?.message} </small>
                                                        </div>
                                                    </div>

                                                    {id_medico == id_tipo_personal &&
                                                    <div className="row">
                                                    <div className="col-md-12 mb-4" >
                                                        <label htmlFor="especialidad">Especialidad(*)</label>
                                                        <div className="form-group">
                                                            <select className="form-select" 
                                                                name="especialidad" 
                                                                id="especialidad" 
                                                                value={id_especialidad}
                                                                onChange={e => set_id_especialidad(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {especialidades.map((especialidad) => (
                                                                <option value={especialidad.id_especialidad}>{especialidad.nombre_especialidad}</option>
                                                                ))}
                                                            </select>
                                                           
                                                        </div>
                                                    </div> 


                                                    <div className="col-12">
                                                    <div className="form-group has-icon-left">
                                                        <label htmlFor="area_atencion">Área de atención</label>
                                                        <div className="position-relative">
                                                            <textarea type="text" className="form-control" rows="4"
                                                                name="area_atencion" 
                                                                id="area_atencion" 
                                                                value={area_atencion}
                                                                onChange={e => set_area_atencion(e.target.value)} />
                                                            <div className="form-control-icon">
                                                                <i className="bi bi-clipboard-check"></i>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>

                                                    </div>
                                                    </div>
                                                 }

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

export default AgregarEmpleado;