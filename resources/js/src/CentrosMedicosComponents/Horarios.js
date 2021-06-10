import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import swal from 'sweetalert';

import schema from '../Validaciones/HorarioValidacion';

import API from '../api';

const Horarios = () => {
    
    const API_URL = API.API_URL;

    const {id_centro_medico} = useParams();
    const [horarios, set_horarios] = useState([]);

    const [dia_inicio, set_dia_inicio] = useState('');
    const [dia_final, set_dia_final] = useState('');
    const [hora_inicio, set_hora_inicio] = useState('');
    const [hora_final, set_hora_final] = useState('');

    useEffect(() => {
        API.horarios(id_centro_medico).then(res => {
           const result = res.data;
           set_horarios(result);
       })
     }, []);

     const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

   
    const agregarhorario = async (data)  => {
        
        try {
          const body = { dia_inicio, dia_final, hora_inicio, hora_final };
          const response = await fetch(`${API_URL}/horarios/${id_centro_medico}/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = `/centros_medicos/${id_centro_medico}/ver`;
          if(response.status === 200){
            swal({
                title: "Éxito",
                text: "Horario registrado!",
                icon: "success",
                button: "Aceptar",
              });
          }
          else{
            swal({
                title: "Error",
                text: "Ocurrió un error!",
                icon: "danger",
                button: "Aceptar",
              });
          }
        } catch (err) {
          console.error(err.message);
        }
      };
    
    
    return(
        <div className="card-body">
             
        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
        <i className="bi bi-plus"></i>
        Agregar
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-keyboard="false" data-backdrop="static" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Agregar horario</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>

            </div>
            <div className="modal-body">
            <form className="form form-vertical" onSubmit={handleSubmit(agregarhorario)}>
                <div className="form-body">
                    <div className="row">
                    
                 
                        <div className="col-md-6 mb-4">
                        <label htmlFor="dia_inicio">Día inicio (*)</label>
                            <div className="form-group">
                                <select className="form-select"
                                    name="dia_inicio" 
                                    id="dia_inicio" 
                                    {...register('dia_inicio')}
                                    value={dia_inicio}
                                    onChange={e => set_dia_inicio(e.target.value)} >
                                    <option value="">--Seleccione una opción--</option>
                                    <option value="Lunes">Lunes</option>
                                    <option value="Martes">Martes</option>
                                    <option value="Miércoles">Miércoles</option>
                                    <option value="Jueves">Jueves</option>
                                    <option value="Viernes">Viernes</option>
                                    <option value="Sábado">Sábado</option>
                                    <option value="Domingo">Domingo</option> 
                                </select>
                                <small className="text-danger"> {errors.dia_inicio?.message} </small>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4">
                        <label htmlFor="dia_final">Día final (*)</label>
                            <div className="form-group">
                                <select className="form-select"
                                    name="dia_final" 
                                    id="dia_final" 
                                    {...register('dia_final')}
                                    value={dia_final}
                                    onChange={e => set_dia_final(e.target.value)} >
                                    <option value="">--Seleccione una opción--</option>
                                    <option value="Lunes">Lunes</option>
                                    <option value="Martes">Martes</option>
                                    <option value="Miércoles">Miércoles</option>
                                    <option value="Jueves">Jueves</option>
                                    <option value="Viernes">Viernes</option>
                                    <option value="Sábado">Sábado</option>
                                    <option value="Domingo">Domingo</option> 
                                </select>
                                <small className="text-danger"> {errors.dia_final?.message} </small>
                            </div>
                        </div>

                        
                        <div className="col-6">
                            <div className="form-group has-icon-left">
                                <label htmlFor="hora_inicio">Hora inicio (*)</label>
                                <div className="position-relative">
                                    <input type="time" className="form-control" rows="2"
                                        name="hora_inicio"
                                        id="hora_inicio"
                                        {...register('hora_inicio')}
                                        value={hora_inicio}
                                        onChange={e => set_hora_inicio(e.target.value)} 
                                            />
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                <small className="text-danger"> {errors.hora_inicio?.message} </small>
                            </div>
                        </div>

                       
                        <div className="col-6">
                            <div className="form-group has-icon-left">
                                <label htmlFor="hora_final">Hora final (*)</label>
                                <div className="position-relative">
                                    <input type="time" className="form-control" rows="2"
                                        name="hora_final"
                                        id="hora_final"
                                        {...register('hora_final')}
                                        value={hora_final}
                                        onChange={e => set_hora_final(e.target.value)} 
                                            />
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                <small className="text-danger"> {errors.hora_final?.message} </small>
                            </div>
                        </div>


                        </div>
                        </div>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="submit" className="btn btn-secondary">Guardar</button>
                </div>
           
            </form>
            </div>
           
            </div>
        </div>
    
        </div>

        <div className="container" >
        <div className="row">
        <div className="col-6">
        <div className="card">
         <div className="card-content">
             <div className="card-body">
        {horarios.length > 0 &&
                 <div className="table-responsive">
                <table className="table lg">
                    <thead>
                        <tr>                     
			             <th>ID horario</th>
                         <th>Día inicio</th>
                         <th>Día final</th>
                         <th>Hora inicio</th>
                         <th>Hora final</th>
                        </tr>
                    </thead>
                    <tbody>
                    {horarios.map((horario)=>(
                        <tr>                  
                            <td>{horario.id_horario}</td>
                            <td>{horario.dia_inicio}</td>
                            <td>{horario.dia_final}</td>
                            <td>{horario.hora_inicio}</td>
                            <td>{horario.hora_final}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div> 
                }            
            </div>
         </div>
    </div>
    </div>
    </div>
    </div>
   
    </div>
        

    
    );
}

export default Horarios;