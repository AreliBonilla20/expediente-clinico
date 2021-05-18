import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {useParams} from 'react-router-dom';

import schema from '../Validaciones/ChequeoValidacion';

import API from '../api';

const AgregarDiagnostico = () => {
    
    const API_URL = API.API_URL;

    const [fecha_chequeo, setFecha_chequeo] = useState('');
    const [hora_chequeo, setHora_chequeo] = useState('');
    const [observacion_chequeo, setObservacion_chequeo] = useState('');
   
    
     const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

    const agregarChequeo = async (data) => {
        try {
          const body = { fecha_chequeo, hora_chequeo, observacion_chequeo};
          const response = await fetch(`${API_URL}/diagnosticos/guardar`, {
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
        <div class="card-body">
       
        <button type="button" className="btn btn-success" data-bs-toggle="modal"
            data-bs-target="#default"><i className="bi bi-plus"></i>
            Agregar
        </button>

        
        <div className="modal fade text-left" id="default" tabindex="-1" role="dialog" data-backdrop="static"
            aria-labelledby="myModalLabel1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="myModalLabel1">Agregar chequeo</h5>
                        <button type="button" className="close rounded-pill"
                            data-bs-dismiss="modal" aria-label="Close">
                            <i data-feather="x"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                    <form className="form form-vertical" onSubmit={handleSubmit(agregarChequeo)}>
                            <div className="form-body">
                                <div className="row">
                                
                                    
                                    <div className="col-6">
                                        <div className="form-group has-icon-left">
                                            <label htmlFor="fecha_chequeo">Fecha del chequeo (*)</label>
                                            <div className="position-relative">
                                                <input type="date" className="form-control"
                                                    name="fecha_chequeo"
                                                    id="fecha_chequeo"
                                                    {...register('fecha_chequeo')}
                                                    value={fecha_chequeo}
                                                    onChange={e => setFecha_chequeo(e.target.value)} />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-calendar"></i>
                                                </div>
                                            </div>
                                            <small className="text-danger"> {errors.fecha_chequeo?.message} </small>
                                        </div>
                                    </div>


                                    <div className="col-6">
                                        <div className="form-group has-icon-left">
                                            <label htmlFor="hora_chequeo">Hora del chequeo (*)</label>
                                            <div className="position-relative">
                                                <input type="time" className="form-control"
                                                    name="hora_chequeo"
                                                    id="hora_chequeo"
                                                    {...register('hora_chequeo')}
                                                    value={hora_chequeo}
                                                    onChange={e => setHora_chequeo(e.target.value)} />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-alarm"></i>
                                                </div>
                                            </div>
                                            <small className="text-danger"> {errors.hora_chequeo?.message} </small>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group has-icon-left">
                                            <label htmlFor="observacion_chequeo">Observaciones (*)</label>
                                            <div className="position-relative">
                                                <textarea type="text" className="form-control" rows="6"
                                                    name="observacion_chequeo"
                                                    id="observacion_chequeo"
                                                    {...register('observacion_chequeo')}
                                                    value={observacion_chequeo}
                                                    onChange={e => setObservacion_chequeo(e.target.value)} 
                                                        />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-card-text"></i>
                                                </div>
                                            </div>
                                            <small className="text-danger"> {errors.observacion_chequeo?.message} </small>
                                        </div>
                                    </div>


                                    <div className="modal-footer">
                                    <button type="button" className="btn" data-bs-dismiss="modal">
                                        <i className="bx bx-x d-block d-sm-none"></i>
                                        <span className="d-none d-sm-block">Cerrar</span>
                                    </button>
                                    <button type="button" className="btn btn-secondary"
                                        data-bs-dismiss="modal">
                                        <i className="bx bx-check d-block d-sm-none"></i>
                                        <span className="d-none d-sm-block">Guardar</span>
                                    </button>
                                    </div>

                                    
                                </div>
                            </div>
                        </form>
                       
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
    );
}

export default AgregarDiagnostico;