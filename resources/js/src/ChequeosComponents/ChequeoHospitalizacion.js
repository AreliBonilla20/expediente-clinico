import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import API from '../api';

const ChequeoHospitalizacion = () => {
    
    const API_URL = API.API_URL;

    const {id_hospitalizacion} = useParams();
    const codigo = id_hospitalizacion.substr(0,7);
    const [chequeos, setChequeos] = useState([]);
    const [fecha_chequeo, setFecha_chequeo] = useState('');
    const [hora_chequeo, setHora_chequeo] = useState('');
    const [observacion_chequeo, setObservacion_chequeo] = useState('');

    useEffect(() => {
        API.chequeos_hospitalizacion(id_hospitalizacion).then(res => {
           const result = res.data;
           setChequeos(result.data);
       })
     }, []);

   

    const agregarChequeo = async e => {
        e.preventDefault();
        try {
          const body = { fecha_chequeo, hora_chequeo, observacion_chequeo};
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
            <form className="form form-vertical">
                <div className="form-body">
                    <div className="row">
                    
                        
                        <div className="col-6">
                            <div className="form-group has-icon-left">
                                <label htmlFor="fecha_chequeo">Fecha del chequeo (*)</label>
                                <div className="position-relative">
                                    <input type="date" className="form-control"
                                        name="fecha_chequeo"
                                        id="fecha_chequeo"
                                        value={fecha_chequeo}
                                        onChange={e => setFecha_chequeo(e.target.value)} />
                                    <div className="form-control-icon">
                                        <i className="bi bi-calendar"></i>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-6">
                            <div className="form-group has-icon-left">
                                <label htmlFor="hora_chequeo">Hora del chequeo (*)</label>
                                <div className="position-relative">
                                    <input type="time" className="form-control"
                                        name="hora_chequeo"
                                        id="hora_chequeo"
                                        value={hora_chequeo}
                                        onChange={e => setHora_chequeo(e.target.value)} />
                                    <div className="form-control-icon">
                                        <i className="bi bi-alarm"></i>
                                    </div>
                                </div>
                               
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="observacion_chequeo">Observaciones (*)</label>
                                <div className="position-relative">
                                    <textarea type="text" className="form-control" rows="8"
                                        name="observacion_chequeo"
                                        id="observacion_chequeo"
                                        value={observacion_chequeo}
                                        onChange={e => setObservacion_chequeo(e.target.value)} 
                                            />
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="button" className="btn btn-secondary" onClick={agregarChequeo}>Guardar</button>
                </div>
           
            </form>
            </div>
           
            </div>
        </div>
    
        </div>

        
        {chequeos.map((chequeo)=>(
        <section className="section">
           
         <div className="card">
         <div className="card-content">
             <div className="card-body">
                 <h4 className="card-title">Chequeo - {chequeo.id_chequeo_hospitalizacion}</h4>
                 <h6>Fecha - {chequeo.fecha_chequeo}</h6>
                 <h6>Hora - {chequeo.hora_chequeo}</h6>
                 <p className="card-text">
                     Observaciones: {chequeo.observacion_chequeo}
                 </p>
             </div>
         </div>
         <div className="card-footer d-flex justify-content-between">
             <span>Registrado por:</span>
         </div>
         </div>
        
     </section>
        ))}

    </div>

    
    );
}

export default ChequeoHospitalizacion;