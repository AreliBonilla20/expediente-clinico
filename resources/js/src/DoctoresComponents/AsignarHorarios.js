import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import API from '../api';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';



function AsignarHorarios() {
  const API_URL = API.API_URL;

  const {id_centro_medico} = useParams();

  const [input_list, set_input_list] = useState([{ id_doctor: "", id_horario: "" }]);

  const [doctores, set_doctores] = useState([]);
  const [horarios, set_horarios] = useState([]);

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
    set_input_list([...input_list, { id_doctor: "", id_horario: "" }]);
  };

  useEffect(() => {
    API.horarios(id_centro_medico).then(res => {
        const result = res.data;
        set_horarios(result);
   })

   API.centro_medico_doctores(id_centro_medico).then( res => {
       const result = res.data;
       set_doctores(result);
   })
},[]);

  

    const asignarHorarios = async (e) => {
    e.preventDefault();
    try {
      const body = { input_list };
      const response = await fetch(`${API_URL}/doctores/horarios/asignar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
        
      });
      
      window.location = `/centros_medicos/${id_centro_medico}/ver`;
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
                                <h3>Horarios</h3>
                              
                                <p className="text-subtitle text-muted">Asignar horarios</p>
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
                                    <form  onSubmit={asignarHorarios}>
                                    {input_list.map((x, i) => {
                                        return (    
                                    
                                        <div className="row">
                                            <div className="card-header">
                                                <h6>Doctor {i + 1 }</h6>
                                            </div>

                                            <div className="col-8">
                                            <label htmlFor="id_doctor">Doctor (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="id_doctor" 
                                                        id="id_doctor" 
                                                        value={x.id_doctor} 
                                                        onChange={e => handleInputChange(e, i)} >
                                                        <option value="">--Seleccione una opción--</option>
                                                        {doctores.map((doctor) => (
                                                        <option key={doctor.id_doctor} value={doctor.id_doctor}>
                                                            {doctor.id_doctor} - {doctor.nombre_empleado} {doctor.apellido_empleado}
                                                        </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-4">
                                            <label htmlFor="id_horario">Horario (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="id_horario" 
                                                        id="id_horario" 
                                                        value={x.id_horario} 
                                                        onChange={e => handleInputChange(e, i)} >
                                                        <option value="">--Seleccione una opción--</option>
                                                        {horarios.map((horario) => (
                                                        <option key={horario.id_horario} value={horario.id_horario}>
                                                           {horario.dia_inicio} a {horario.dia_final} de {horario.hora_inicio} a {horario.hora_final}
                                                        </option>
                                                        ))}
                                                    </select>
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

export default AsignarHorarios;