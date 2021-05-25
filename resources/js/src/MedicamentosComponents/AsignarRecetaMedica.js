import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import API from '../api';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';



function AsignarMedicamento() {
  const API_URL = API.API_URL;

  const {id_hospitalizacion} = useParams();

  const codigo = id_hospitalizacion.substr(0,7);

  const [inputList, setInputList] = useState([{ codigo_medicamento: "", dosis: "", indicaciones: ""}]);
  const [medicamentos,set_medicamentos] = useState([]);

  const [tipos_medicamentos, set_tipos_medicamentos] = useState([]);
  const [id_tipo_medicamento, set_id_tipo_medicamento] = useState('');

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { codigo_medicamento: "", dosis: "", indicaciones: ""}]);
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
      const body = { inputList };
      const response = await fetch(`${API_URL}/recetas_medicas/${id_hospitalizacion}/guardar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
        
      });
      
      window.location = `/expedientes/${codigo}/hospitalizaciones/${id_hospitalizacion}/ver`;
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
                                    {inputList.map((x, i) => {
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
                                                <label htmlFor="dosis">Dosis</label>
                                                <div className="position-relative">
                                                    <textarea type="text" className="form-control" rows="4"
                                                        name="dosis"
                                                        value={x.dosis}
                                                        onChange={e => handleInputChange(e, i)} />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-clipboard-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>

                                            <div className="col-6">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="indicaciones">Indicaciones</label>
                                                <div className="position-relative">
                                                    <textarea type="text" className="form-control" rows="4"
                                                        name="indicaciones"
                                                        value={x.indicaciones}
                                                        onChange={e => handleInputChange(e, i)} />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-clipboard-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>

                                            <div className="btn-box">
                                            {inputList.length !== 1 && <button
                                                className="btn btn-danger rounded-pill"
                                                onClick={() => handleRemoveClick(i)}> <i className="bi bi-dash"></i> Eliminar </button>}
                                            {inputList.length - 1 === i && <button className="btn btn-primary rounded-pill" onClick={handleAddClick}><i className="bi bi-plus"></i>Agregar</button>}
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