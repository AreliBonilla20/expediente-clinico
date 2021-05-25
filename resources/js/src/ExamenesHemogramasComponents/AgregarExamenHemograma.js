import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

//import schema from '../Validaciones/MedicamentoValidacion';

import API from '../api';

const AgregarExamenHemograma = () => {

    const API_URL = API.API_URL;

    const [examenes_hemogramas, setExamenesHemogramas] =useState([]);

    const [examenes, setCodigoExamen] = useState([]);
    
    const [codigo_hemograma, setCodigo_hemograma] = useState('');
    const [codigo_examen, setCodigo_examen] = useState('');
    const [parametro, setParametro] = useState('');
    const [unidad_de_medida, setUnidad_Medida] = useState('');
    const [valor_min_mujeres, setValor_min_mujeres] = useState('');
    const [valor_max_mujeres, setValor_max_mujeres] = useState('');
    const [valor_min_hombres, setValor_min_hombres] = useState('');
    const [valor_max_hombres, setValor_max_hombres] = useState('');
    const [valor_resultado, setValor_resultado] = useState('');

    //Función para traer los datos al select de tipo medicamento y para los demás campos
    useEffect(() => {
        API.datos_formulario_examen_hemograma().then(res => {
            const result = res.data;
            setCodigoExamen(result.examenes);
       })

       API.examenes_hemogramas().then( res => {
           const result = res.data;
           setExamenesHemogramas(result.data);
       })
    },[]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        //resolver: yupResolver(schema),
    });

    const agregarExamenHemograma = async (data) => {
        try {
          const body = { codigo_medicamento, id_tipo_medicamento, nombre_medicamento, via_administracion, descripcion_medicamento, 
            presentacion_medicamento, costo_medicamento, existencia_medicamento
         };
          const response = await fetch(`${API_URL}/examenes_hemogramas/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = "/examenes_hemogramas";
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
                                <h3>Hemogramas</h3>
                                
                                <p className="text-subtitle text-muted">Agregar hemograma</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/examenes_hemogramas/crear">Agregar hemograma</Link>
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
                                        <form className="form form-vertical" onSubmit={handleSubmit(agregarExamenHemograma)}>
                                            <div className="form-body">
                                                <div className="row">
                                                
                                                <h5>Datos Hemograma</h5>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="codigo_hemograma">Código hemograma (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="codigo_hemograma"
                                                                    id="codigo_hemograma"
                                                                    {...register('codigo_hemograma')}
                                                                    value={codigo_hemograma}
                                                                    onChange={e => setCodigo_hemograma(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                <i className="bi bi-upc-scan"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.codigo_hemograma?.message} </small>
                                                                {
                                                                    examenes_hemogramas.map((hemograma) => {
                                                                        if(hemograma.codigo_hemograma === codigo_hemograma){
                                                                            return(
                                                                                <small className="text-danger">Ya existe un registro con este código de hemograma, intente uno diferente.</small>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 mb-4">
                                                    <label htmlFor="codigo_examen">Código Examen (*)</label>
                                                        <div className="form-group">
                                                            <select className="choices form-select"
                                                                name="codigo_examen" 
                                                                id="codigo_examen" 
                                                                {...register('codigo_examen')}
                                                                value={codigo_examen}
                                                                onChange={e => setCodigo_examen(e.target.value)} >
                                                                <option value="">--Seleccione una opción--</option>
                                                                {examenes.map((examen) => (
                                                                <option value={examen.codigo_examen}>{examen.codigo_examen}</option>
                                                                ))}
                                                            </select>
                                                            <small className="text-danger"> {errors.codigo_examen?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="parametro">Parámetro (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="parametro"
                                                                    id="parametro"
                                                                    {...register('parametro')}
                                                                    value={parametro}
                                                                    onChange={e => setParametro(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.parametro?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="unidad_de_medida">Unidad de medida (*)</label>
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control"
                                                                    name="unidad_de_medida"
                                                                    id="unidad_de_medida"
                                                                    {...register('unidad_de_medida')}
                                                                    value={unidad_de_medida}
                                                                    onChange={e => setUnidad_Medida(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.unidad_de_medida?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="valor_min_mujeres">Valor Mínimo Mujeres </label>
                                                            <div className="position-relative">
                                                                <input type="number" className="form-control" step="0.01" min="0"
                                                                    name="valor_min_mujeres"
                                                                    id="valor_min_mujeres"
                                                                    {...register('valor_min_mujeres')}
                                                                    value={valor_min_mujeres}
                                                                    onChange={e => setValor_min_mujeres(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.valor_min_mujeres?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="valor_max_mujeres">Valor Máximo Mujeres </label>
                                                            <div className="position-relative">
                                                                <input type="number" className="form-control" step="0.01" min="0"
                                                                    name="valor_max_mujeres"
                                                                    id="valor_max_mujeres"
                                                                    {...register('valor_max_mujeres')}
                                                                    value={valor_max_mujeres}
                                                                    onChange={e => setValor_max_mujeres(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.valor_max_mujeres?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="valor_min_hombres">Valor Mínimo Hombres </label>
                                                            <div className="position-relative">
                                                                <input type="number" className="form-control" step="0.01" min="0"
                                                                    name="valor_min_hombres"
                                                                    id="valor_min_hombres"
                                                                    {...register('valor_min_hombres')}
                                                                    value={valor_min_hombres}
                                                                    onChange={e => setValor_min_hombres(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.valor_min_hombres?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="valor_max_hombres">Valor Máximo Hombres </label>
                                                            <div className="position-relative">
                                                                <input type="number" className="form-control" step="0.01" min="0"
                                                                    name="valor_max_hombres"
                                                                    id="valor_max_hombres"
                                                                    {...register('valor_max_hombres')}
                                                                    value={valor_max_hombres}
                                                                    onChange={e => setValor_max_hombres(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.valor_max_hombres?.message} </small>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-group has-icon-left">
                                                            <label htmlFor="valor_resultado">Valor Resultado </label>
                                                            <div className="position-relative">
                                                                <input type="number" className="form-control" step="0.01" min="0"
                                                                    name="valor_resultado"
                                                                    id="valor_resultado"
                                                                    {...register('valor_resultado')}
                                                                    value={valor_resultado}
                                                                    onChange={e => setValor_resultado(e.target.value)} 
                                                                     />
                                                                <div className="form-control-icon">
                                                                <i className="bi bi-clipboard-check"></i>
                                                                </div>
                                                            </div>
                                                            <small className="text-danger"> {errors.valor_resultado?.message} </small>
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

export default AgregarExamenHemograma;