import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from '../Validaciones/ConsultorioValidacion';

import API from '../api';

const Consultorio = () => {
    
    const API_URL = API.API_URL;

    const {id_centro_medico} = useParams();
    const [consultorios, set_consultorios] = useState([]);
    const [consultorio, set_consultorio] = useState('');
    const [area, set_area] = useState('');

    useEffect(() => {
        API.consultorios(id_centro_medico).then(res => {
           const result = res.data;
           set_consultorios(result.data);
       })
     }, []);

     const { register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

   
    const agregarConsultorio = async e => {
        e.preventDefault();
        try {
          const body = { consultorio, area };
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
                                        onChange={e => set_consultorio(e.target.value)} 
                                            />
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                <small className="text-danger"> {errors.consultorio?.message} </small>
                            </div>
                        </div>
                 
                        <div className="col-md-12 mb-4">
                        <label htmlFor="area">Área (*)</label>
                            <div className="form-group">
                                <select className="form-select"
                                    name="area" 
                                    id="area" 
                                    {...register('area')}
                                    value={area}
                                    onChange={e => set_area(e.target.value)} >
                                    <option value="">--Seleccione una opción--</option>
                                    <option value="Medicina general">Medicina general</option>
                                    <option value="Pediatría">Pediatría</option>
                                    <option value="Ginecología">Ginecología</option>
                                    <option value="Psicología">Psicología</option>
                                    <option value="Neurología">Neurología</option>
                                    <option value="Oftamología">Oftamología</option>
                                    <option value="Odontología">Odontología</option>
                                    <option value="Cardiología">Cardiología</option>
                                    <option value="Dermatología">Dermatología</option>

                                    
                                </select>
                                <small className="text-danger"> {errors.area?.message} </small>
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

        <div className="container" >
        <div className="row">
        <div className="col-6">
        <div className="card">
         <div className="card-content">
             <div className="card-body">

                 <div className="table-responsive">
                <table className="table lg">
                    <thead>
                        <tr>                     
			             <th>ID quirófano</th>
                         <th>Quirófano</th>
                         <th>Área</th>
                        </tr>
                    </thead>
                    <tbody>
                    {consultorios.map((consultorio)=>(
                        <tr>                  
                            <td>{consultorio.id_consultorio}</td>
                            <td>{consultorio.consultorio}</td>
                            <td>{consultorio.area}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>             
            </div>
         </div>
    </div>
    </div>
    </div>
    </div>
   
    </div>
        

    
    );
}

export default Consultorio;