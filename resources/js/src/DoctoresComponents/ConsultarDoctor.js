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
    const [doctor_hor, set_doctor_hor] = useState([]);
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
        API.doctor_horario().then(res => {
            const result = res.data;
            set_doctor_hor(result);
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
                         <th>Horarios</th>
                                         
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
                
                            {doctor_hor.map((horario) => {
                                if(horario.id_doctor == doctor.id_doctor){
                                    return (
                                    <td>{horario.dia_inicio} a {horario.dia_final} <br />{horario.hora_inicio} de {horario.hora_final}</td>
                                    )
                                }
                               
                            })}
                            
                        
                         
                        </tr>
                        ))}
                    </tbody>
                
                </table>

               

                
                </div>   
                     
            </div>
         </div>
    </div>
                
    <div className="col-12 d-flex justify-content-end">
        <Link to={`doctores/horario`} className="btn btn-sm btn-primary"><i className="bi bi-pencil"></i> Asignar / editar horario</Link>
    </div>     
    </div>
    );
}

export default ConsultarDoctor;
