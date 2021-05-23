import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from '../Validaciones/ConsultorioValidacion';

import API from '../api';

const Consultorio = () => {
    
    const API_URL = API.API_URL;

    const {id_centro_medico} = useParams();
    const [consultorios, setConsultorios] = useState([]);
    const [consultorio, setConsultorio] = useState('');

    useEffect(() => {
        API.consultorios(id_centro_medico).then(res => {
           const result = res.data;
           setConsultorios(result.data);
       })
     }, []);

     const { register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

   
    const agregarConsultorio = async e => {
        e.preventDefault();
        try {
          const body = { consultorio };
          const response = await fetch(`${API_URL}/consultorios/${id_centro_medico}/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = `/centros_medicos/${id_centro_medico}/ver`;
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
                <h5 className="modal-title" id="exampleModalLabel">Agregar consultorio</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>

            </div>
            <div className="modal-body">
            <form className="form form-vertical">
                <div className="form-body">
                    <div className="row">
                    


                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="consultorio">Consultorio (*)</label>
                                <div className="position-relative">
                                    <textarea type="text" className="form-control" rows="2"
                                        name="consultorio"
                                        id="consultorio"
                                        {...register('consultorio')}
                                        value={consultorio}
                                        onChange={e => setConsultorio(e.target.value)} 
                                            />
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                <small className="text-danger"> {errors.consultorio?.message} </small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="button" className="btn btn-secondary" onClick={agregarConsultorio}>Guardar</button>
                </div>
           
            </form>
            </div>
           
            </div>
        </div>
    
        </div>

           
           <div className="card">
         <div className="card-content">
             <div className="card-body">
                 <div className="table-responsive">
                <table className="table mb-0">
                    <thead>
                        <tr>                           
			             <th>Id cosultorio</th>
                         <th>Consultorio</th>
                        </tr>
                    </thead>
                    <tbody>
                    {consultorios.map((consultorio)=>(
                        <tr>                          
                            <td>{consultorio.id_consultorio}</td>
                            <td>{consultorio.consultorio}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>             
            </div>
         </div>
    </div>
        
  
  
    
    
       
    </div>

    
    );
}

export default Consultorio;