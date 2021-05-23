import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';
import schema from '../Validaciones/EmpleadoValidacion';

import ClickLabel from '../Funciones/ClickLabel';

import API from '../api';

const EditarEmpleado = () => {

    const API_URL = API.API_URL;
    
    const labels = document.getElementsByTagName('label');

    const {id_empleado} = useParams();
    
    const [empleados, setEmpleados]=useState([]);

    //Datos para el formulario
    const [tipo_personal, setTipo_personal] =useState([]);
    const [generos, setGeneros] =useState([]);
    const [paises, setPaises] =useState([]);
    const [municipios, setMunicipios] =useState([]);
    const [departamentos, setDepartamentos] =useState([]);
    const [centros_medicos, setCentros_medicos] =useState([]);

    const [opcion_pais, setOpcion_pais] = useState();
    const [opcion_depto, setOpcion_depto] = useState();
    
    //Datos para la tabla
    const [id_genero, setId_genero] = useState('');
    const [id_tipo_personal, setId_tipo_personal] = useState('');
    const [id_centro_medico, setId_centro_medico] = useState('');
    const [id_pais, setId_pais] = useState('');
    const [id_departamento, setId_departamento] = useState('');
    const [id_municipio, setId_municipio] = useState('');
    const [nombre_empleado, setNombre_empleado] = useState('');
    const [apellido_empleado, setApellido_empleado] = useState('');
    const [identificacion_empleado, setIdentificacion_empleado] = useState('');
    const [fecha_nacimiento_empleado, setFecha_nacimiento_empleado] = useState('');
    const [direccion_empleado, setDireccion_empleado] = useState('');
    const [telefono_empleado, setTelefono_empleado] = useState('');
    const [correo_empleado, setCorreo_empleado] = useState('');
    const [cargo_empleado, setCargo_empleado] = useState('');

    //Función para traer los datos que se ven en el formulario

    useEffect(() => {
        API.datos_formulario_empleado().then(res => {
           const result = res.data;
           setTipo_personal(result.tipo_personal);
           setGeneros(result.generos);
           setPaises(result.paises);
           setDepartamentos(result.departamentos);
           setMunicipios(result.municipios);
           setCentros_medicos(result.centros_medicos);

           ClickLabel(labels);
        })

        API.empleado_editar(id_empleado).then(res => {
            const result = res.data;
            setId_genero(result.id_genero);
            setId_tipo_personal(result.id_tipo_personal);
            setId_centro_medico(result.id_centro_medico);
            setId_pais(result.id_pais);
            setId_departamento(result.id_departamento);
            setId_municipio(result.id_municipio);
            setNombre_empleado(result.nombre_empleado);
            setApellido_empleado(result.apellido_empleado);
            setIdentificacion_empleado(result.identificacion_empleado);
            setFecha_nacimiento_empleado(result.fecha_nacimiento_empleado);
            setDireccion_empleado(result.direccion_empleado);
            setTelefono_empleado(result.telefono_empleado);
            setCorreo_empleado(result.correo_empleado);
            setCargo_empleado(result.cargo_empleado);

            setOpcion_pais(result.id_pais);
            setOpcion_depto(result.id_departamento);

            ClickLabel(labels);


        }) 

     }, []);


     const { register, handleSubmit, formState: { errors } } = useForm({
         resolver: yupResolver(schema),
      });


      //Funcion para guardar
    const editarEmpleado = async (data) => {
        try {
          const body = { id_empleado, id_genero, id_tipo_personal, id_centro_medico, id_pais, id_departamento, id_municipio, 
          nombre_empleado, apellido_empleado, identificacion_empleado, fecha_nacimiento_empleado, direccion_empleado, telefono_empleado, 
          correo_empleado, cargo_empleado
         };
          const response = await fetch(`${API_URL}/empleados/${id_empleado}/actualizar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
         //Regresa luego de guardar. Misma ruta de api.php
          window.location = "/empleados";
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
                                
                                <p className="text-subtitle text-muted">Editar empleado</p>
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
                                        <form className="form form-vertical" onSubmit={handleSubmit(editarEmpleado)}>
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
                                                                    onChange={e => setIdentificacion_empleado(e.target.value)} />
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
                                                                    onChange={e => setNombre_empleado(e.target.value)} />
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
                                                                    onChange={e => setApellido_empleado(e.target.value)} />
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
                                                                    onChange={e => setFecha_nacimiento_empleado(e.target.value)} />
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
                                                                onChange={e => setId_genero(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {generos.map((genero) => (
                                                                <option value={genero.id_genero}>{genero.genero}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_genero?.message} </small>
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
                                                                onChange={e => setId_tipo_personal(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {tipo_personal.map((personal) => (
                                                                <option value={personal.id_tipo_personal}>{personal.tipo_personal}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_tipo_personal?.message} </small>
                                                        </div>
                                                    </div> 

                                                    <div className="col-md-12 mb-4">
                                                        <label htmlFor="id_centro_medico">Centro médico (*)</label>
                                                        <div className="form-group">
                                                            <select className="form-select"
                                                                name="id_centro_medico" 
                                                                id="id_centro_medico" 
                                                                {...register('id_centro_medico')}
                                                                value={id_centro_medico}
                                                                onChange={e => setId_centro_medico(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {centros_medicos.map((centro_medico) => (
                                                                <option value={centro_medico.id_centro_medico}>{centro_medico.nombre_centro_medico}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_centro_medico?.message} </small>
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
                                                                onChange={e => setId_pais(e.target.value)} 
                                                                onClick={e => setOpcion_pais(e.target.value)} >
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
                                                                <select className="form-select" 
                                                                name="id_municipio" 
                                                                id="id_municipio"
                                                                {...register('id_municipio')}
                                                                value={id_municipio}
                                                                onChange={e => setId_municipio(e.target.value)} >
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
                                                                    onChange={e => setDireccion_empleado(e.target.value)} />
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
                                                                    onChange={e => setTelefono_empleado(e.target.value)} />
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
                                                                    onChange={e => setCorreo_empleado(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-envelope"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.correo_empleado?.message} </small>
                                                        </div>
                                                    </div>                                                

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                        <label htmlFor="cargo_empleado">Cargo empleado (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="cargo_empleado" 
                                                                    id="cargo_empleado" 
                                                                    {...register('cargo_empleado')}
                                                                    value={cargo_empleado}
                                                                    onChange={e => setCargo_empleado(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-briefcase"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.cargo_empleado?.message} </small>
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

export default EditarEmpleado;