import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import swal from 'sweetalert';

import schema from '../Validaciones/ChequeoValidacion';

import API from '../api';

const ChequeoHospitalizacion = () => {
    
    const API_URL = API.API_URL;

    const {id_hospitalizacion} = useParams();
    const codigo = id_hospitalizacion.substr(0,7);
    const [chequeos, set_chequeos] = useState([]);
    const [observacion_chequeo, set_observacion_chequeo] = useState('');
    const [sintomas_chequeo, set_sintomas_chequeo] = useState('');
    const [alta_aprobada, set_alta_aprobada] = useState('');
  
    useEffect(() => {
        API.chequeos_hospitalizacion(id_hospitalizacion).then(res => {
           const result = res.data;
           set_chequeos(result.chequeos);
           set_alta_aprobada(result.alta.fecha_alta);
       })
     }, []);

     const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

   

    const agregarChequeo = async (data) => {
       
        try {
          const body = { observacion_chequeo, sintomas_chequeo };
          const response = await fetch(`${API_URL}/chequeos_hospitalizaciones/${id_hospitalizacion}/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = `/expedientes/${codigo}/hospitalizaciones/${id_hospitalizacion}/ver`;
          if(response.status === 200){
            swal({
                title: "Éxito",
                text: "Chequeo registrado!",
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
       
       {!alta_aprobada &&    
        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#chequeosModal">
        <i className="bi bi-plus"></i>
        Agregar
        </button>
        }
        
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
                                <label htmlFor="sintomas_chequeo">Sintomatología (*)</label>
                                <div className="position-relative">
                                    <textarea type="text" className="form-control" rows="8"
                                        name="sintomas_chequeo"
                                        id="sintomas_chequeo"
                                        {...register('sintomas_chequeo')}
                                        value={sintomas_chequeo}
                                        onChange={e => set_sintomas_chequeo(e.target.value)} 
                                            />
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                <small className="text-danger"> {errors.sintomas_chequeo?.message} </small>
                            </div>
                        </div>
                

                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="observacion_chequeo">Observaciones (*)</label>
                                <div className="position-relative">
                                    <textarea type="text" className="form-control" rows="8"
                                        name="observacion_chequeo"
                                        id="observacion_chequeo"
                                        {...register('observacion_chequeo')}
                                        value={observacion_chequeo}
                                        onChange={e => set_observacion_chequeo(e.target.value)} 
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

        {chequeos.length>0 &&
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
                    <p>Sintomatología: {chequeo.sintomas_chequeo}</p>
                    <p>Observaciones: {chequeo.observacion_chequeo}</p>
                </p>
        
            
            </div>
        )}

        <hr />
    </div>

  
</div>

 </section>
 }

    </div>

    
    );
}

export default ChequeoHospitalizacion;