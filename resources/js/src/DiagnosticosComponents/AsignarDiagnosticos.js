import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import API from '../api';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';



function AsignarDiagnosticos() {
  const API_URL = API.API_URL;

  const {id_hospitalizacion} = useParams();

  const codigo = id_hospitalizacion.substr(0,7);

  const [input_list, setinput_list] = useState([{ codigo_diagnostico: "", observaciones_diagnostico: "", indicaciones_diagnostico: ""}]);
  const [diagnosticos,setDiagnosticos] = useState([]);

  const [tipos_diagnosticos, setTipos_diagnosticos] = useState([]);
  const [id_tipo_diagnostico, setId_tipo_diagnostico] = useState('');

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...input_list];
    list[index][name] = value;
    setinput_list(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...input_list];
    list.splice(index, 1);
    setinput_list(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setinput_list([...input_list, { codigo_diagnostico: "", observaciones_diagnostico: "", indicaciones_diagnostico: ""}]);
  };

  useEffect(() => {
    API.datos_formulario_diagnostico().then(res => {
        const result = res.data;
        setTipos_diagnosticos(result.tipos_diagnosticos);
   })

   API.diagnosticos().then( res => {
       const result = res.data;
       setDiagnosticos(result.data);
   })
},[]);

  

    const asignarDiagnosticos = async (e) => {
    e.preventDefault();
    try {
      const body = { input_list };
      const response = await fetch(`${API_URL}/historial_diagnosticos/${id_hospitalizacion}/guardar`, {
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
                                    <form  onSubmit={asignarDiagnosticos}>
                                    {input_list.map((x, i) => {
                                        return (    
                                    
                                        <div className="row">
                                            <div className="card-header">
                                                <h6>Diagnóstico {i + 1 }</h6>
                                            </div>

                                            <div className="col-12">
                                            <label htmlFor="id_tipo_diagnostico">Tipo diagnostico (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="id_tipo_diagnostico" 
                                                        id="id_tipo_diagnostico" 
                                                        value={id_tipo_diagnostico} 
                                                        onChange={e => setId_tipo_diagnostico(e.target.value)} >
                                                        <option value="">--Seleccione una opción--</option>
                                                        {tipos_diagnosticos.map((tipo_diagnostico) => (
                                                        <option value={tipo_diagnostico.id_tipo_diagnostico}>{tipo_diagnostico.tipo_diagnostico}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                        

                                            <div className="col-12">
                                            <label htmlFor="id_tipo_diagnostico">Diagnóstico (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="codigo_diagnostico"
                                                        placeholder="Enter First Name"
                                                        value={x.codigo_diagnostico}
                                                        onChange={e => handleInputChange(e, i)} >
                                                    <option value="">--Seleccione una opción--</option>
                                                        {diagnosticos.map((diagnostico) => {
                                                            if(diagnostico.id_tipo_diagnostico == id_tipo_diagnostico){
                                                                return (
                                                                <option key={diagnostico.codigo_diagnostico} 
                                                                value={diagnostico.codigo_diagnostico}>{diagnostico.nombre_diagnostico}
                                                                </option>
                                                                )
                                                            }
                                                        })}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="observaciones_diagnostico">Observaciones diagnóstico</label>
                                                <div className="position-relative">
                                                    <textarea type="text" className="form-control" rows="4"
                                                        name="observaciones_diagnostico"
                                                        value={x.observaciones_diagnostico}
                                                        onChange={e => handleInputChange(e, i)} />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-clipboard-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>

                                            <div className="col-6">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="indicaciones_diagnostico">Indicaciones diagnóstico</label>
                                                <div className="position-relative">
                                                    <textarea type="text" className="form-control" rows="4"
                                                        name="indicaciones_diagnostico"
                                                        value={x.indicaciones_diagnostico}
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

export default AsignarDiagnosticos;