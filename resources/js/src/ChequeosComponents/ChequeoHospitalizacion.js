import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from '../Validaciones/ChequeoValidacion';

import API from '../api';

const ChequeoHospitalizacion = () => {
    
    const API_URL = API.API_URL;

    const {id_hospitalizacion} = useParams();
    const codigo = id_hospitalizacion.substr(0,7);
    const [chequeos, setChequeos] = useState([]);
    const [observacion_chequeo, setObservacion_chequeo] = useState('');

    useEffect(() => {
        API.chequeos_hospitalizacion(id_hospitalizacion).then(res => {
           const result = res.data;
           setChequeos(result.data);
       })
     }, []);

     const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

   

    const agregarChequeo = async (data) => {
       
        try {
          const body = { observacion_chequeo };
          const response = await fetch(`${API_URL}/chequeos_hospitalizaciones/${id_hospitalizacion}/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = `/expedientes/${codigo}/hospitalizaciones/${id_hospitalizacion}/ver`;
        } catch (err) {
          console.error(err.message);
        }
      };
    
    
    return(
        <div className="card-body">
       
        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#chequeosModal">
        <i className="bi bi-plus"></i>
        Agregar
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
            <form className="form form-vertical" onSubmit={handleSubmit(agregarChequeo)}>
                <div className="form-body">
                    <div className="row">
                

                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="observacion_chequeo">Observaciones (*)</label>
                                <div className="position-relative">
                                    <textarea type="text" className="form-control" rows="8"
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
                    </div>
                </div>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="submit" className="btn btn-secondary" >Guardar</button>
                </div>
           
            </form>
            </div>
           
            </div>
        </div>
    
        </div>

        
        <section className="section">
        <br />
        <h4>Historial de chequeos</h4>
        <div className="card">
        <div className="card-content">
        {chequeos.map((chequeo, i) =>
            <div className="card-body">
                <div className="alert alert-secondary">
                    <h4 className="alert-heading">Chequeo {i + 1 } </h4>
                    <h6>Fecha: {chequeo.fecha_chequeo} Hora: {chequeo.hora_chequeo}</h6>
                </div>
            
                <p className="card-text">
                    <p>Observaciones: {chequeo.observacion_chequeo}</p>
                </p>
        
                <p className="card-footer" style={{fontWeight: "bold"}}>Realizado por: </p>
            </div>
        )}

        <hr />
    </div>

  
</div>

 </section>

    </div>

    
    );
}

export default ChequeoHospitalizacion;