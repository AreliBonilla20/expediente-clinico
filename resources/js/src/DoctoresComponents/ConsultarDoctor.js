import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from '../Validaciones/DoctorHorarioValidacion';

import API from '../api';

const ConsultarDoctor = () => {
    
    const API_URL = API.API_URL;


    const {id_centro_medico} = useParams();
    const [doctores, set_doctores] = useState([]);
    const [horarios, set_horarios] = useState([]);
   
    const [id_horario, set_id_horario] = useState('');
    const [id_doctor, set_id_doctor] = useState('');
   
    useEffect(() => {
        API.horarios_doctores(id_centro_medico).then(res => {
           const result = res.data;
           set_doctores(result);
       })
        API.horarios(id_centro_medico).then(res => {
            const result = res.data;
            set_horarios(result);
            document.getElementById('id_doctor').click();
    })
     }, []);
      

     const asignarHorario = async (e) => {
       e.preventDefault();
        try {
          const body = { id_horario, id_doctor };
          const response = await fetch(`${API_URL}/doctores/horarios/asignar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = "/diagnosticos";
        } catch (err) {
          console.error(err.message);
        }
      };

    
    return(
        
        <div className="card-body">
            <h4>Médicos</h4>
        <div className="card">
         <div className="card-content">
             <div className="card-body">
                 <div className="table-responsive">
                <table className="table mb-0">
                    <thead>
                        <tr>                           
			             <th>ID empleado</th>
                         <th>ID doctor</th>
                         <th>Doctor</th>
                         <th>Especialidad</th>
                         <th>Área de atención</th>
                         <th>Asignar / editar horarios</th>
                         
                         
                        </tr>
                    </thead>
                    <tbody>
                    {doctores.map((doctor)=>(
                        <tr>                          
                            <td>{doctor.id_empleado}</td>
                            <td>{doctor.id_doctor}</td>
                            <td>{doctor.nombre_empleado} {doctor.apellido_empleado}</td>
                            <td>{doctor.nombre_especialidad}</td>
                            <td>{doctor.area_atencion}</td>
                            <td>
                            <button type="button" className="btn btn-sm btn-primary" data-toggle="modal" data-target="#chequeosModal">
                            <i className="bi bi-pencil"> </i>
                             Asignar / editar horarios
                            </button>

                            <div className="modal fade" id="chequeosModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-keyboard="false" data-backdrop="static" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Agregar chequeo</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>

                                </div>
                                <div className="modal-body">
                                <form className="form form-vertical" >
                                    <div className="form-body">
                                        <div className="row">

                                        <div className="col-12">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="id_doctor">ID doctor</label>
                                                <div className="position-relative">
                                                    <input type="text" className="form-control" readOnly
                                                        name="id_doctor"
                                                        id="id_doctor"
                                                        value={doctor.id_doctor}
                                                        onClick={e => set_id_doctor(e.target.value)}
                                                       />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-person"></i>
                                                    </div>
                                                </div>
                                        
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="id_doc">Doctor</label>
                                                <div className="position-relative">
                                                    <input type="text" className="form-control" readOnly
                                                        name="id_doc"
                                                        id="id_doc"
                                                        value={doctor.nombre_empleado + ' ' + doctor.apellido_empleado}
                                                       />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-person"></i>
                                                    </div>
                                                </div>
                                        
                                            </div>
                                        </div>
                                        <br />
                                        <div className="col-md-12 mb-4">
                                        <label htmlFor="horario_doctor">Tipo diagnóstico (*)</label>
                                            <div className="form-group">
                                                <select className="form-select"
                                                    name="horario_doctor" 
                                                    id="horario_doctor" 
                                                    value={id_horario}
                                                    onChange={e => set_id_horario(e.target.value)} >
                                                    <option value="">--Seleccione una opción--</option>
                                                    {horarios.map((horario) => (
                                                    <option  value={horario.id_horario}>{horario.dia_inicio} a {horario.dia_final} de {horario.hora_inicio} a {horario.hora_final}</option>
                                                    ))}
                                                </select>
                                               
                                            </div>
                                        </div>



                                    
                                        </div>
                                    </div>
                                    
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                                        <button type="button" className="btn btn-secondary" onClick={asignarHorario} >Guardar</button>
                                    </div>
                            
                                </form>
                                </div>
                            
                                </div>
                            </div>
                        
                            </div>
                            </td>
                         
                        </tr>
                        ))}
                    </tbody>
                   {JSON.stringify(id_doctor)}
                   {JSON.stringify(id_horario)}
                </table>
                </div>             
            </div>
         </div>
    </div>
                
    
    </div>
    );
}

export default ConsultarDoctor;
