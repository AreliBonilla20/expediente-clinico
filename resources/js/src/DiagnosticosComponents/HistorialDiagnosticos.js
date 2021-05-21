import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import API from '../api';


const HistorialDiagnosticos = () => {
    
    const API_URL = API.API_URL;

    const {id_hospitalizacion} = useParams();

    const codigo = id_hospitalizacion.substr(0,7);

    const [tipos_diagnosticos, setTipos_diagnosticos] = useState([]);
    const [diagnosticos, setDiagnosticos] = useState([]);
    const [historial_diagnosticos, setHistorial_diagnosticos] = useState([]);
    const [opcion_tipo_diagnostico, setOpcion_tipo_diagnostico] = useState();

    const [fecha_atencion_medica, setFecha_atencion_medica] = useState('');
    const [hora_atencion_medica, setHora_atencion_medica] = useState('');
    const [codigo_diagnostico, setCodigo_diagnostico] = useState('');
    const [observaciones_diagnostico, setObservaciones_diagnostico] = useState('');
    const [indicaciones_diagnostico, setIndicaciones_diagnostico] = useState('');
    

    useEffect(() => {
        API.diagnosticos().then(res => {
            const result = res.data;
            setDiagnosticos(result.data);
        })

        API.datos_formulario_diagnostico().then(res => {
        const result = res.data;
        setTipos_diagnosticos(result.tipos_diagnosticos);
        })

        API.historial_diagnosticos(id_hospitalizacion).then(res => {
            const result = res.data;
            setHistorial_diagnosticos(result);
        })

     }, []);


    const asignarDiagnostico = async e => {
        e.preventDefault();
        try {
          const body = {id_hospitalizacion, codigo, fecha_atencion_medica, hora_atencion_medica, codigo_diagnostico, observaciones_diagnostico, indicaciones_diagnostico };
          const response = await fetch(`${API_URL}/historial_diagnosticos/guardar`, {
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
       
        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#agregar_diagnosticos">
        <i className="bi bi-plus"></i>
        Agregar
        </button>

        <div className="modal fade" id="agregar_diagnosticos" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-keyboard="false" data-backdrop="static" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Agregar diagnósticos</h5>
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

                        <div className="col-md-12 mb-4">
                        <label htmlFor="id_tipo_diagnostico">Tipo diagnóstico (*)</label>
                            <div className="form-group">
                            <select className="form-select"
                                    name="id_tipo_diagnostico" 
                                    id="id_tipo_diagnostico" 
                                    onChange={e => setId_tipo_diagnostico(e.target.value)} 
                                    onClick={e => setOpcion_tipo_diagnostico(e.target.value)} >
                                    <option value="">--Seleccione una opción--</option>
                                    {tipos_diagnosticos.map((tipo_diagnostico) => (
                                    <option  value={tipo_diagnostico.id_tipo_diagnostico}>{tipo_diagnostico.tipo_diagnostico}</option>
                                    ))}
                                </select>
                               
                            </div>
                        </div>

                        <div className="col-md-12 mb-4">
                        <label htmlFor="codigo_diagnostico">Diagnóstico (*)</label>
                            <div className="form-group">
                            <select className="form-select"
                                    name="codigo_diagnostico" 
                                    id="codigo_diagnostico" 
                                    value={codigo_diagnostico}
                                    onChange={e => setCodigo_diagnostico(e.target.value)} >
                                    <option value="">--Seleccione una opción--</option>
                                        {diagnosticos.map((diagnostico) => {
                                            if(diagnostico.id_tipo_diagnostico == opcion_tipo_diagnostico){
                                                return (
                                                <option key={diagnostico.codigo_diagnostico} 
                                                value={diagnostico.codigo_diagnostico}>{diagnostico.nombre_diagnostico}
                                                 </option>
                                                )
                                            }
                                        })}
                                </select>
                               
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="observaciones_diagnostico">Observaciones (*)</label>
                                <div className="position-relative">
                                    <textarea type="text" className="form-control" rows="4"
                                        name="observaciones_diagnostico"
                                        id="observaciones_diagnostico"
                                        value={observaciones_diagnostico}
                                        onChange={e => setObservaciones_diagnostico(e.target.value)} 
                                            />
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="indicaciones_diagnostico">Indicaciones (*)</label>
                                <div className="position-relative">
                                    <textarea type="text" className="form-control" rows="4"
                                        name="indicaciones_diagnostico"
                                        id="indicaciones_diagnostico"
                                        value={indicaciones_diagnostico}
                                        onChange={e => setIndicaciones_diagnostico(e.target.value)} 
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
                    <button type="button" className="btn btn-secondary" onClick={asignarDiagnostico}>Guardar</button>
                </div>
           
            </form>
            </div>
           
            </div>
        </div>
    
        </div>

        <section className="section">
            <br />
        <h4>Historial de diagnósticos</h4>
         <div className="card">
         <div className="card-content">
             <div className="card-body">
                 <div className="table-responsive">
                <table className="table mb-0">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Diagnóstico</th>
                            <th>Observaciones</th>
                            <th>Indicaciones</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {historial_diagnosticos.map((historial_diganostico)=>(
                        <tr>
                            <td>{historial_diganostico.fecha_atencion_medica}</td>
                            <td>{historial_diganostico.hora_atencion_medica}</td>
                            <td>{historial_diganostico.nombre_diagnostico}</td>
                            <td>{historial_diganostico.observaciones_diagnostico}</td>
                            <td>{historial_diganostico.indicaciones_diagnostico}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                
            </div>
         </div>
        
         </div>

     </section>

    </div>
    

    
    );
}


export default HistorialDiagnosticos;