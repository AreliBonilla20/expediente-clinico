import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import API from '../api';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';



function AsignarExamen() {
  const API_URL = API.API_URL;

  var {id_consulta, id_hospitalizacion} = useParams();

  if(id_consulta == undefined){
        id_consulta = 'null';
  }

  if(id_hospitalizacion == undefined){
    id_hospitalizacion = 'null';
  }

  const [input_list, set_input_list] = useState([{ codigo_examen: ""}]);
  const [examenes, set_examenes] = useState([]);

  const [tipo_examen, set_tipo_examen] = useState([]);
  const [id_tipo_examen, set_id_tipo_examen] = useState('');

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
    set_input_list([...input_list, { codigo_examen: ""}]);
  };

  useEffect(() => {
    API.datos_formulario_examen().then(res => {
        const result = res.data;
        set_tipo_examen(result.tipos_examenes);
   })

   API.examenes().then( res => {
       const result = res.data;
       set_examenes(result.data);
   })
},[]);

  

    const asignarExamen = async (e) => {
    e.preventDefault();
    try {
      const body = { input_list };
      const response = await fetch(`${API_URL}/historial_examenes/${id_consulta}/${id_hospitalizacion}/guardar`, {
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
                                <h3>Exámenes</h3>
                             
            
                                <p className="text-subtitle text-muted">Agregar examen</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/examen/crear">Agregar examen</Link>
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
                                    <form  onSubmit={asignarExamen}>
                                    {input_list.map((x, i) => {
                                        return (    
                                    
                                        <div className="row">
                                            <div className="card-header">
                                                <h6>Exámen {i + 1 }</h6>
                                            </div>

                                            <div className="col-4">
                                            <label htmlFor="id_tipo_examen">Tipo examen (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="id_tipo_examen" 
                                                        id="id_tipo_examen" 
                                                        value={id_tipo_examen} 
                                                        onChange={e => set_id_tipo_examen(e.target.value)} >
                                                        <option value="">--Seleccione una opción--</option>
                                                        {tipo_examen.map((tipo_examen) => (
                                                        <option value={tipo_examen.id_tipo_examen}>{tipo_examen.nombre_tipo_examen}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                        

                                            <div className="col-6">
                                            <label htmlFor="codigo_examen">Examen (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="codigo_examen"
                                                        placeholder="Enter First Name"
                                                        value={x.codigo_examen}
                                                        onChange={e => handleInputChange(e, i)} >
                                                    <option value="">--Seleccione una opción--</option>
                                                        {examenes.map((examen) => {
                                                            if(examen.id_tipo_examen == id_tipo_examen){
                                                                return (
                                                                <option key={examen.codigo_examen} 
                                                                value={examen.codigo_examen}>{examen.nombre_examen}
                                                                </option>
                                                                )
                                                            }
                                                        })}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-2">
                                            <br />
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
                                    {JSON.stringify(input_list)}
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

export default AsignarExamen;