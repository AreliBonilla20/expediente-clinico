import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import API from '../api';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';



function AsignarTratamientos() {
  const API_URL = API.API_URL;

  const {id_hospitalizacion} = useParams();

  const codigo = id_hospitalizacion.substr(0,7);

  const [inputList, setInputList] = useState([{ codigo_tratamiento: "", indicaciones_tratamiento: ""}]);
  const [tratamientos,set_tratamientos] = useState([]);

  const [tipos_tratamientos, set_tipos_tratamientos] = useState([]);
  const [id_tipo_tratamiento, set_id_tipo_tratamiento] = useState('');

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
    setInputList([...inputList, { codigo_tratamiento: "", indicaciones_tratamiento: ""}]);
  };

  useEffect(() => {
    API.datos_formulario_tratamiento().then(res => {
        const result = res.data;
        set_tipos_tratamientos(result.tipos_tratamientos);
   })

   API.tratamientos_medicos().then( res => {
       const result = res.data;
       set_tratamientos(result.data);
   })
},[]);

  

    const asignarTratamientos = async (e) => {
    e.preventDefault();
    try {
      const body = { inputList };
      const response = await fetch(`${API_URL}/historial_tratamientos/${id_hospitalizacion}/guardar`, {
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
                                <h3>Tratamientos</h3>
                              
                                <p className="text-subtitle text-muted">Asignar tratamientos</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/tratamiento/crear">Agregar diagnóstico</Link>
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
                                    <form  onSubmit={asignarTratamientos}>
                                    {inputList.map((x, i) => {
                                        return (    
                                    
                                        <div className="row">
                                            <div className="card-header">
                                                <h6>Tratamiento {i + 1 }</h6>
                                            </div>

                                            <div className="col-12">
                                            <label htmlFor="id_tipo_tratamiento">Tipo tratamiento (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="id_tipo_tratamiento" 
                                                        id="id_tipo_tratamiento" 
                                                        value={id_tipo_tratamiento} 
                                                        onChange={e => set_id_tipo_tratamiento(e.target.value)} >
                                                        <option value="">--Seleccione una opción--</option>
                                                        {tipos_tratamientos.map((tipo_tratamiento) => (
                                                        <option value={tipo_tratamiento.id_tipo_tratamiento}>{tipo_tratamiento.tipo_tratamiento}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                        

                                            <div className="col-12">
                                            <label htmlFor="id_tipo_tratamiento">Tratamiento (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="codigo_tratamiento"
                                                        placeholder="Enter First Name"
                                                        value={x.codigo_tratamiento}
                                                        onChange={e => handleInputChange(e, i)} >
                                                    <option value="">--Seleccione una opción--</option>
                                                        {tratamientos.map((tratamiento) => {
                                                            if(tratamiento.id_tipo_tratamiento == id_tipo_tratamiento){
                                                                return (
                                                                <option key={tratamiento.codigo_tratamiento} 
                                                                value={tratamiento.codigo_tratamiento}>{tratamiento.nombre_tratamiento}
                                                                </option>
                                                                )
                                                            }
                                                        })}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="indicaciones_tratamiento">Indicaciones</label>
                                                <div className="position-relative">
                                                    <textarea type="text" className="form-control" rows="4"
                                                        name="indicaciones_tratamiento"
                                                        value={x.indicaciones_tratamiento}
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
                        {JSON.stringify(inputList)}
                    </div>
                </div>   
            </div>
        </div>
        <Footer />
    </div>
    );
}

export default AsignarTratamientos;