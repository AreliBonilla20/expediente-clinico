import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import schema from '../Validaciones/MedicamentoValidacion';

import API from '../api';

const AgregarMedicamento = () => {

    const API_URL = API.API_URL;

    const [medicamentos,setMedicamentos] = useState([]);

    const [tipos_medicamentos, setTipos_Medicamentos] = useState([]);
    
    const [codigo_medicamento, setCodigoMedicamento] = useState('');
    const [id_tipo_medicamento, setIdTipoMedicamento] = useState('');
    const [nombre_medicamento, setNombreMedicamento] = useState('');
    const [descripcion_medicamento, setDescripcionMedicamento] = useState('');
    const [presentacion_medicamento, setPresentacionMedicamento] = useState('');
    const [costo_medicamento, setCostoMedicamento] = useState('');
    const [existencia_medicamento, setExistenciaMedicamento] = useState('');

    //Función para traer los datos al select de tipo medicamento y para los demás campos
    useEffect(() => {
        API.datos_formulario_medicamento().then(res => {
            const result = res.data;
            setTipos_Medicamentos(result.tipos_medicamentos);
       })

       API.medicamentos().then( res => {
           const result = res.data;
           setMedicamentos(result.data);
       })
    },[]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const agregarMedicamento = async (data) => {
        try {
          const body = { codigo_medicamento, id_tipo_medicamento, nombre_medicamento, descripcion_medicamento, 
            presentacion_medicamento, costo_medicamento, existencia_medicamento
         };
          const response = await fetch(`${API_URL}/medicamentos/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = "/medicamentos";
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
                                <h3>Medicamentos</h3>
                                
                                <p className="text-subtitle text-muted">Agregar medicamento</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/medicamentos/crear">Agregar medicamento</Link>
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
                                        <form className="form form-vertical" onSubmit={handleSubmit(agregarMedicamento)}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                                <h5>Datos Medicamento</h5>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="codigo_medicamento">Código Medicamento (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="codigo_medicamento"
                                                                    id="codigo_medicamento"
                                                                    {...register('codigo_medicamento')}
                                                                    value={codigo_medicamento}
                                                                    onChange={e => setCodigoMedicamento(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.codigo_medicamento?.message} </small>
                                                                {
                                                                    medicamentos.map((medicamento) => {
                                                                        if(medicamento.codigo_medicamento === codigo_medicamento){
                                                                            return(
                                                                                <small className="text-danger">Ya existe un registro con este código de medicamento, intente uno diferente.</small>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                        </div>
                                                    </div>

                                                    <div className="col-6">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="nombre_medicamento">Nombre Medicamento (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control" 
                                                                    name="nombre_medicamento"                   
                                                                    id="nombre_medicamento"
                                                                    {...register('nombre_medicamento')}
                                                                    value={nombre_medicamento}
                                                                    onChange={e => setNombreMedicamento(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.nombre_medicamento?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 mb-4">
                                                    <label htmlFor="id_tipo_medicamento">Tipo Medicamento (*)</label>
                                                        <div className="form-group">
                                                            <select className="choices form-select"
                                                                name="id_tipo_medicamento" 
                                                                id="id_tipo_medicamento" 
                                                                {...register('id_tipo_medicamento')}
                                                                value={id_tipo_medicamento}
                                                                onChange={e => setIdTipoMedicamento(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {tipos_medicamentos.map((tipo_medicamento) => (
                                                                <option value={tipo_medicamento.id_tipo_medicamento}>{tipo_medicamento.tipo_medicamento}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.id_tipo_medicamento?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="descripcion_medicamento">Descripción Medicamento</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="descripcion_medicamento"
                                                                    id="descripcion_medicamento"
                                                                    {...register('descripcion_medicamento')}
                                                                    value={descripcion_medicamento}
                                                                    onChange={e => setDescripcionMedicamento(e.target.value)} />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.descripcion_medicamento?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="presentacion_medicamento">Presentación Medicamento (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="presentacion_medicamento"
                                                                    id="presentacion_medicamento"
                                                                    {...register('presentacion_medicamento')}
                                                                    value={presentacion_medicamento}
                                                                    onChange={e => setPresentacionMedicamento(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.presentacion_medicamento?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="costo_medicamento">Costo Medicamento (*)</label>
                                                            <div className="position-relative">
                                                                <input type="number" className="form-control" step="0.01" min="0"
                                                                    name="costo_medicamento"
                                                                    id="costo_medicamento"
                                                                    {...register('costo_medicamento')}
                                                                    value={costo_medicamento}
                                                                    onChange={e => setCostoMedicamento(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.costo_medicamento?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="existencia_medicamento">Existencia Medicamento (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="existencia_medicamento"
                                                                    id="existencia_medicamento"
                                                                    {...register('existencia_medicamento')}
                                                                    value={existencia_medicamento}
                                                                    onChange={e => setExistenciaMedicamento(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                    <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.existencia_medicamento?.message} </small>
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

export default AgregarMedicamento;