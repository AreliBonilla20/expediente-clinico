import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import swal from 'sweetalert';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import API from '../api';
import schema from '../Validaciones/CirugiaValidacion';

const AgregarCirugia = () => {

    const API_URL = API.API_URL;

    const [cirugias, set_cirugias] = useState([]);

    //Datos para la tabla
    const [codigo_cirugia, set_codigo_cirugia] = useState('');
    const [nombre_cirugia, set_nombre_cirugia] = useState('');
    const [descripcion_cirugia, set_descripcion_cirugia] = useState('');
    const [costo_cirugia, set_costo_cirugia] = useState('');

    //Función para traer los datos que se ven en el formulario
    useEffect(() => {
        API.cirugias().then(res => {
           const result = res.data;
           set_cirugias(result.data);
       })
     }, []);


     const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });


    //Funcion para guardar
    const agregarCirugia = async (data) => {
        try {
          const body = { codigo_cirugia, nombre_cirugia, descripcion_cirugia, costo_cirugia };
          const response = await fetch(`${API_URL}/cirugias/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = "/cirugias";
          if(response.status === 200){
            swal({
                title: "Éxito",
                text: "Cirugía registrado!",
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
                                        <Link to="/cirugias/crear">Agregar cirugía</Link>
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
                                        <form className="form form-vertical" onSubmit={handleSubmit(agregarCirugia)}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                                <h5>Datos de tratamiento</h5>

                                                <div className="col-md-12 mb-4">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="codigo_cirugia">Código de la cirugía (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="codigo_cirugiao"
                                                                    id="codigo_cirugia"
                                                                    {...register('codigo_cirugia')}
                                                                    value={codigo_cirugia}
                                                                    onChange={e => set_codigo_cirugia(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                <i className="bi bi-upc-scan"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.codigo_cirugia?.message} </small>
                                                            {
                                                                cirugias.map((cirugia)=> {
                                                                    if(cirugia.codigo_cirugia == codigo_cirugia){
                                                                        return(
                                                                        <small className="text-danger"> Ya existe un registro con este código.</small>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                           
                                                    <div className="col-md-12 mb-4">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="nombre_cirugia">Nombre de la cirugía (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="nombre_cirugia"
                                                                    id="nombre_cirugia"
                                                                    {...register('nombre_cirugia')}
                                                                    value={nombre_cirugia}
                                                                    onChange={e => set_nombre_cirugia(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.nombre_cirugia?.message} </small>
                                                        </div>
                                                    </div>

                                            

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="descripcion_cirugia">Descripción de la cirugía (*)</label>
                                                            <div className="position-relative">
                                                                <textarea type="text" className="form-control" rows="4"
                                                                    name="descripcion_cirugiao"
                                                                    id="descripcion_cirugia"
                                                                    {...register('descripcion_cirugia')}
                                                                    value={descripcion_cirugia}
                                                                    onChange={e => set_descripcion_cirugia(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                <i class="bi bi-card-checklist"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.descripcion_cirugia?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="costo_cirugia">Costo de la cirugía (*)</label>
                                                            <div className="position-relative">
                                                                <input type="number" className="form-control" step="0.01" min="0"
                                                                    name="costo_cirugiao"
                                                                    id="costo_cirugia"
                                                                    {...register('costo_cirugia')}
                                                                    value={costo_cirugia}
                                                                    onChange={e => set_costo_cirugia(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                <i className="bi bi-cash"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.costo_cirugia?.message} </small>
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

export default AgregarCirugia;