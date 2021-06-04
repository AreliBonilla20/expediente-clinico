import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import API from '../api';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';



function AsignarMedicamento() {
  const API_URL = API.API_URL;

  var {id_consulta, id_hospitalizacion} = useParams();

  if(id_consulta == undefined){
        id_consulta = 'null';
  }

  if(id_hospitalizacion == undefined){
    id_hospitalizacion = 'null';
  }

  const [input_list, set_input_list] = useState([{ codigo_medicamento: "", dosis_medicamento: "", indicaciones_medicamento: ""}]);
  const [medicamentos,set_medicamentos] = useState([]);

  const [tipos_medicamentos, set_tipos_medicamentos] = useState([]);
  const [id_tipo_medicamento, set_id_tipo_medicamento] = useState('');

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...input_list];
    list[index][name] = value;
    set_input_list(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...input_list];
    list.splice(index, 1);
    set_input_list(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    set_input_list([...input_list, { codigo_medicamento: "", dosis_medicamento: "", indicaciones_medicamento: ""}]);
  };

  useEffect(() => {
    API.datos_formulario_medicamento().then(res => {
        const result = res.data;
        set_tipos_medicamentos(result.tipos_medicamentos);
   })

   API.medicamentos().then( res => {
       const result = res.data;
       set_medicamentos(result.data);
   })
},[]);

  

    const asignarMedicamento = async (e) => {
    e.preventDefault();
    try {
      const body = { input_list };
      const response = await fetch(`${API_URL}/recetas_medicas/${id_consulta}/${id_hospitalizacion}/guardar`, {
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

    } catch (err) {
      console.error(err.message);
    }
  };


  return (
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
                                {JSON.stringify(input_list)}
                                <p className="text-subtitle text-muted">Asignar medicamentos</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/medicamento/crear">Agregar diagnóstico</Link>
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
                                    <form  onSubmit={asignarMedicamento}>
                                    {input_list.map((x, i) => {
                                        return (    
                                    
                                        <div className="row">
                                            <div className="card-header">
                                                <h6>Medicamento {i + 1 }</h6>
                                            </div>

                                            <div className="col-12">
                                            <label htmlFor="id_tipo_medicamento">Tipo medicamento (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="id_tipo_medicamento" 
                                                        id="id_tipo_medicamento" 
                                                        value={id_tipo_medicamento} 
                                                        onChange={e => set_id_tipo_medicamento(e.target.value)} >
                                                        <option value="">--Seleccione una opción--</option>
                                                        {tipos_medicamentos.map((tipo_medicamento) => (
                                                        <option value={tipo_medicamento.id_tipo_medicamento}>{tipo_medicamento.tipo_medicamento}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                        

                                            <div className="col-12">
                                            <label htmlFor="id_tipo_medicamento">Diagnóstico (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="codigo_medicamento"
                                                        placeholder="Enter First Name"
                                                        value={x.codigo_medicamento}
                                                        onChange={e => handleInputChange(e, i)} >
                                                    <option value="">--Seleccione una opción--</option>
                                                        {medicamentos.map((medicamento) => {
                                                            if(medicamento.id_tipo_medicamento == id_tipo_medicamento){
                                                                return (
                                                                <option key={medicamento.codigo_medicamento} 
                                                                value={medicamento.codigo_medicamento}>{medicamento.nombre_medicamento}
                                                                </option>
                                                                )
                                                            }
                                                        })}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="dosis_medicamento">Dósis</label>
                                                <div className="position-relative">
                                                    <textarea type="text" className="form-control" rows="4"
                                                        name="dosis_medicamento"
                                                        value={x.dosis_medicamento}
                                                        onChange={e => handleInputChange(e, i)} />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-clipboard-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>

                                            <div className="col-6">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="indicaciones_medicamento">Indicaciones</label>
                                                <div className="position-relative">
                                                    <textarea type="text" className="form-control" rows="4"
                                                        name="indicaciones_medicamento"
                                                        value={x.indicaciones_medicamento}
                                                        onChange={e => handleInputChange(e, i)} />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-clipboard-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>

                                            <div className="btn-box">
                                            {input_list.length !== 1 && <button
                                                className="btn btn-sm btn-danger rounded-pill"
                                                onClick={() => handleRemoveClick(i)}> <i className="bi bi-dash"></i>  </button>}
                                            {input_list.length - 1 === i && <button className="btn btn-sm btn-primary rounded-pill" onClick={handleAddClick}><i className="bi bi-plus"></i></button>}
                                            </div>
                                        
                                        </div>
                                        
                                        );
                                    })}
                                    <div className="col-12 d-flex justify-content-end">
                                            <button className="btn btn-secondary">Guardar</button>
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

export default AsignarMedicamento;