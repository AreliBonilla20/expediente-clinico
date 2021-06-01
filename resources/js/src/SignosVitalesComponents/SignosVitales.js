import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import API from '../api';
import SignosVitalesGraficos from './GraficoSignosVitales';

const SignosVitales = () => {
    
    const API_URL = API.API_URL;

    const {id_hospitalizacion} = useParams();
    const [prueba, setPrueba] = useState('');

    const codigo = id_hospitalizacion.substr(0,7);

    const [signos_vitales, setSignos_vitales] = useState([]);

    const [fecha_atencion_medica, setFecha_atencion_medica] = useState('');
    const [hora_atencion_medica, setHora_atencion_medica] = useState('');
    const [presion_arterial_sistolica, setPresion_arterial_sistolica] = useState('');
    const [presion_arterial_diastolica, setPresion_arterial_diastolica] = useState('');
    const [peso_paciente, setPeso_paciente] = useState('');
    const [estatura_paciente, setEstatura_paciente] = useState('');
    const [temperatura_paciente, setTemperatura_paciente] = useState('');
    const [ritmo_cardiaco_paciente, setRitmo_cardiaco_paciente] = useState('');
    const [respiracion_paciente, setRespiracion_paciente] = useState('');

    useEffect(() => {
        API.signos_vitales(id_hospitalizacion).then(res => {
           const result = res.data;
           setSignos_vitales(result);
           setPrueba(signos_vitales.length)
       })
     }, []);


    const agregarSignosvitales = async e => {
        e.preventDefault();
        try {
          const body = {id_hospitalizacion, codigo, fecha_atencion_medica, hora_atencion_medica, presion_arterial_sistolica,
                        presion_arterial_diastolica, peso_paciente, estatura_paciente, temperatura_paciente, ritmo_cardiaco_paciente, respiracion_paciente };
          const response = await fetch(`${API_URL}/signos_vitales/guardar`, {
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
       <div className="container">
       
        <div className="card-body">
    
        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#signosModal">
        <i className="bi bi-plus"></i>
        Agregar
        </button>

        <div className="modal fade" id="signosModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-keyboard="false" data-backdrop="static" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Agregar registro de signos vitales</h5>
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
                                <label htmlFor="fecha_atencion_medica">Fecha (*)</label>
                                <div className="position-relative">
                                    <input type="date" className="form-control"
                                        name="fecha_atencion_medica"
                                        id="fecha_atencion_medica"
                                        value={fecha_atencion_medica}
                                        onChange={e => setFecha_atencion_medica(e.target.value)} />
                                    <div className="form-control-icon">
                                        <i className="bi bi-calendar"></i>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-6">
                            <div className="form-group has-icon-left">
                                <label htmlFor="hora_atencion_medica">Hora(*)</label>
                                <div className="position-relative">
                                    <input type="time" className="form-control"
                                        name="hora_atencion_medica"
                                        id="hora_atencion_medica"
                                        value={hora_atencion_medica}
                                        onChange={e => setHora_atencion_medica(e.target.value)} />
                                    <div className="form-control-icon">
                                        <i className="bi bi-alarm"></i>
                                    </div>
                                </div>
                               
                            </div>
                        </div>

                        

                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="peso_paciente">Peso (kg)</label>
                                <div className="position-relative">
                                    <input type="number" className="form-control" step="0.01" min="0"
                                        name="peso_paciente"
                                        id="peso_paciente"
                                        value={peso_paciente}
                                        onChange={e => setPeso_paciente(e.target.value)} 
                                            />
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="estatura_paciente">Estatura (cm)</label>
                                <div className="position-relative">
                                    <input type="number" className="form-control" step="0.01" min="0"
                                        name="estatura_paciente"
                                        id="estatura_paciente"
                                        value={estatura_paciente}
                                        onChange={e => setEstatura_paciente(e.target.value)} 
                                            />
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="temperatura_paciente">Temperatura (°C)</label>
                                <div className="position-relative">
                                    <input type="number" className="form-control" step="0.01" min="0"
                                        name="temperatura_paciente"
                                        id="temperatura_paciente"
                                        value={temperatura_paciente}
                                        onChange={e => setTemperatura_paciente(e.target.value)} 
                                            />
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="presion_arterial_sistolica">Presión arterial sistólica (mmHg)</label>
                                <div className="position-relative">
                                    <input type="number" className="form-control" min="0"
                                        name="presion_arterial_sistolica"
                                        id="presion_arterial_sistolica"
                                        value={presion_arterial_sistolica}
                                        onChange={e => setPresion_arterial_sistolica(e.target.value)} 
                                            />
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="presion_arterial_diastolica">Presión arterial diastólica (mmHg)</label>
                                <div className="position-relative">
                                    <input type="number" className="form-control"
                                        name="presion_arterial_diastolica"
                                        id="presion_arterial_diastolica"
                                        value={presion_arterial_diastolica}
                                        onChange={e => setPresion_arterial_diastolica(e.target.value)} 
                                            />
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="ritmo_cardiaco_paciente">Ritmo cardíaco (x min)</label>
                                <div className="position-relative">
                                    <input type="number" className="form-control"
                                        name="ritmo_cardiaco_paciente"
                                        id="ritmo_cardiaco_paciente"
                                        value={ritmo_cardiaco_paciente}
                                        onChange={e => setRitmo_cardiaco_paciente(e.target.value)} 
                                            />
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="respiracion_paciente">Respiración (x min)</label>
                                <div className="position-relative">
                                    <input type="number" className="form-control"
                                        name="respiracion_paciente"
                                        id="respiracion_paciente"
                                        value={respiracion_paciente}
                                        onChange={e => setRespiracion_paciente(e.target.value)} 
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
                    <button type="button" className="btn btn-secondary" onClick={agregarSignosvitales}>Guardar</button>
                </div>
           
            </form>
            </div>
           
            </div>
        </div>
    
        </div>
        <section className="section">
        

        
         <div className="card">
         <div className="card-content">
             <div className="card-body">
                 <div class="table-responsive">
                <table class="table mb-0">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Peso</th>
                            <th>Estatura</th>
                            <th>Temperatura</th>
                            <th>Presión sistólica</th>
                            <th>Presión diastólica</th>
                            <th>Ritmo cardíaco</th>
                            <th>Respiración</th>
                        </tr>
                    </thead>
                    <tbody>
                    {signos_vitales.map((signo_vital)=>(
                        <tr>
                            <td>{signo_vital.fecha_atencion_medica}</td>
                            <td>{signo_vital.hora_atencion_medica}</td>
                            <td>{signo_vital.peso_paciente} kg</td>
                            <td>{signo_vital.estatura_paciente} cm</td>
                            <td>{signo_vital.temperatura_paciente} °C</td>
                            <td>{signo_vital.presion_arterial_sistolica} mmHg</td>
                            <td>{signo_vital.presion_arterial_diastolica} mmHg</td>
                            <td>{signo_vital.ritmo_cardiaco_paciente} x min</td>
                            <td>{signo_vital.respiracion_paciente} x min</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                
            </div>
         </div>
        
         </div>

     </section>
        <SignosVitalesGraficos/>
     
     </div>

    </div>

    
    );
}

export default SignosVitales;