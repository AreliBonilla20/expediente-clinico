import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import schema from '../Validaciones/ExamenValidacion';
import {ClickLabel} from '../Funciones/FuncionesAuxiliares';

import API from '../api';

const EditarExamen = () => {

    //Aqui se guardar el codigo de examen que viene como parámetro 
    const { codigo } = useParams();

    const API_URL = API.API_URL;

    const labels = document.getElementsByTagName('label');

    const [examenes, setExamenes] = useState([]);
    const [codigo_inicial, setCodigo_inicial] = useState('');

    //Datos para el formulario
    const [tipos_examenes, setTipos_examenes] = useState([]);

    //Datos para la tabla
    const [codigo_examen, setCodigo_examen] = useState('');
    const [nombre_examen, setNombre_examen] = useState('');
    const [id_tipo_examen, setId_tipo_examen] = useState('');
    const [indicaciones_examen, setIndicaciones_examen] = useState('');
    const [costo, setCosto] = useState('');

    //Función para traer los datos que se ven en el formulario
    useEffect(() => {
        API.datos_formulario_examen().then(res => {
            const result = res.data;
            setTipos_examenes(result.tipos_examenes);

            ClickLabel(labels);
       })

        API.examenes().then(res => {
            const result = res.data;
            setExamenes(result.data);

            ClickLabel(labels);

            })
     }, []);


     //Función para cargar los datos del examen que se va a editar
     useEffect(() => {
        API.examen_editar(codigo).then(res => {
           const examen = res.data;
           setCodigo_examen(examen.codigo_examen);
           setNombre_examen(examen.nombre_examen);
           setId_tipo_examen(examen.id_tipo_examen);
           setIndicaciones_examen(examen.indicaciones_examen);
           setCosto(examen.costo);
           setCodigo_inicial(examen.codigo_examen);
           
           ClickLabel(labels);
       })
     }, []);


     const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });


    //Funcion para guardar
    const editarExamen = async (data) => {
        try {
          const body = { codigo_examen, nombre_examen, id_tipo_examen, indicaciones_examen, costo};
          const response = await fetch(`${API_URL}/examenes/${codigo}/actualizar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = `/examenes/${codigo}/ver`;
          if(response.status === 200){
            swal({
                title: "Éxito",
                text: "Examen actualizado!",
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
                                <h3>Editar</h3>
                                <h4>Examen: {codigo_examen} - {nombre_examen}</h4>
                                
                                
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/examenes">Consultar examen</Link>
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
                                        <form className="form form-vertical" onSubmit={handleSubmit(editarExamen)}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                                <h5>Datos generales</h5>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="codigo_examen">Código de examen</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="codigo_examen"
                                                                    id="codigo_examen"
                                                                    {...register('codigo_examen')}
                                                                    value={codigo_examen}
                                                                    onChange={e => setCodigo_examen(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-upc-scan"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.codigo_examen?.message} </small>
                                                            {   
                                                                  examenes.map((examen) => {
                                                                      if(examen.codigo_examen !== codigo_inicial){
                                                                        if(examen.codigo_examen === codigo_examen){
                                                                            return(
                                                                                <small className="text-danger">Ya existe un registro con este mismo código, debe ser distinto</small>
                                                                            )
                                                                          }
                                                                      }
                                                                  })
                                                              }
                                                        </div>
                                                    </div>
                                           
                                                    <div className="col-md-12 mb-4">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="nombre_examen">Nombre examen (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="nombre_examen"
                                                                    id="nombre_examen"
                                                                    {...register('nombre_examen')}
                                                                    value={nombre_examen}
                                                                    onChange={e => setNombre_examen(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.nombre_examen?.message} </small>
                                                        </div>
                                                    </div>

                                                
                                                    <div className="col-md-12 mb-4">
                                                    <label htmlFor="id_tipo_examen">Tipo examen (*)</label>
                                                        <div className="form-group">
                                                        <select className="form-select"
                                                                name="id_tipo_examen" 
                                                                id="id_tipo_examen" 
                                                                {...register('id_tipo_examen')}
                                                                value={id_tipo_examen}
                                                                onChange={e => setId_tipo_examen(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {tipos_examenes.map((tipo_examen) => (
                                                                <option value={tipo_examen.id_tipo_examen}>{tipo_examen.nombre_tipo_examen}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_tipo_examen?.message} </small>
                                                        </div>
                                                    </div>


                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="indicaciones_examen">Indicaciones de examen</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="indicaciones_examen" 
                                                                    id="indicaciones_examen" 
                                                                    {...register('indicaciones_examen')}
                                                                    value={indicaciones_examen}
                                                                    onChange={e => setIndicaciones_examen(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i class="bi bi-card-checklist"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <small className="text-danger"> {errors.indicaciones_examen?.message} </small>
                                                    </div>


                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="costo">Costo de examen</label>
                                                            <div className="position-relative">
                                                                <input type="number" className="form-control" step="0.01" min="0"
                                                                    name="costo" 
                                                                    id="costo" 
                                                                    {...register('costo')}
                                                                    value={costo}
                                                                    onChange={e => setCosto(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i class="bi bi-cash"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <small className="text-danger"> {errors.costo?.message} </small>
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

export default EditarExamen;