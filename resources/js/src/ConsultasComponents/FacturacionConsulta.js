import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

import API from '../api';
import {fecha, hora } from '../Funciones/FuncionesAuxiliares';



const FacturacionConsulta = () => {
    
    const API_URL = API.API_URL;

    const container = React.useRef(null);
    const pdfExportComponent = React.useRef(null);

    const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
        pdfExportComponent.current.save();
    }
    };

    const {id_consulta} = useParams();
    const [codigo_paciente, set_codigo_paciente] = useState('');
    const [paciente, set_paciente] = useState('');
    const [centro_medico, set_centro_medico] = useState('');
    const [direccion_centro_medico, set_direccion_centro_medico] = useState('');
    const [telefono_centro_medico, set_telefono_centro_medico] = useState('');
    const [costo_por_consulta, set_costo_por_consulta] = useState('');
    const [fecha_cita, set_fecha_cita] = useState('');
    const [hora_cita, set_hora_cita] = useState('');
    const [costo_medicamentos, set_costo_medicamentos] = useState('');
    const [costo_tatamientos, set_costo_tatamientos] = useState('');
    const [costo_total, set_costo_total] = useState('');
   

    const [receta_medica, set_receta_medica] = useState([]);
    const [tratamientos, set_tratamientos] = useState([]);

   

    useEffect(() => {
       
        API.consulta_factura(id_consulta).then(res => {
            const result = res.data;
            const costo = result.costo_de_consulta;
            set_receta_medica(result.medicamentos);
            set_tratamientos(result.tratamientos);

            set_costo_por_consulta(costo.costo_consulta);
            set_codigo_paciente(costo.codigo_paciente);
            set_centro_medico(costo.nombre_centro_medico);
            set_direccion_centro_medico(costo.direccion_centro_medico +', ' + costo.nombre_departamento + ', ' + costo.nombre_municipio);
            set_telefono_centro_medico(costo.telefono1_centro_medico + ', ' + costo.telefono2_centro_medico);
            set_codigo_paciente(costo.codigo_paciente);
            set_paciente(costo.nombres + ' ' + costo.apellidos);
            set_fecha_cita(costo.fecha_cita);
            set_hora_cita(costo.hora_cita);
            set_costo_medicamentos(costo.costo_medicamentos);
            set_costo_tatamientos(costo.costo_tratamientos);
            set_costo_total(costo.costo_total);
        })

     }, []);

    
      return(
        <div className="card-body">
            <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-sm btn-danger" onClick={exportPDFWithComponent}>
                <i class="bi bi-download"></i> Descargar
                </button>                                       
            </div>
           
        <div className="card">
        
       
            <PDFExport
            paperSize="A4" margin="0.5cm"
            ref={pdfExportComponent}
            fileName={`Factura Paciente - ${paciente}`}
            >
            
            <div className="col-12" ref={container} style={{paddingLeft: "5%"}} >
            <section className="section" >
            <div className="card">
            <div className="card-body">
            <div  style={{textAlign: "center"}}>
                <h3>Factura</h3> <br />
                <h5>{centro_medico}</h5>
                <p>Tel: {direccion_centro_medico} <br /> {telefono_centro_medico} </p>
            </div>
                <hr />

                <h4 style={{textAlign: "center"}}>Consulta</h4>
                <p>Fecha: {fecha()}</p>
                <p>Hora: {hora()}</p>
                <br />
                <h6>Datos generales</h6>
               
                <div className="row">
                    <div className="col-md-5">
                            <div className="form-group">
                            <p>Código de expediente </p>
                            </div>
                    </div>
                    <div className="col-md-7">
                            <div className="form-group">
                            <p style={{fontWeight: "bold"}}>{codigo_paciente}</p>
                            </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                            <div className="form-group">
                            <p>Paciente </p>
                            </div>
                    </div>
                    <div className="col-md-7">
                            <div className="form-group">
                            <p style={{fontWeight: "bold"}}>{paciente}</p>
                            </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                            <div className="form-group">
                            <p>Fecha de ingreso</p>
                            </div>
                    </div>
                    <div className="col-md-7">
                            <div className="form-group">
                            <p style={{fontWeight: "bold"}}>{fecha_cita}</p>
                            </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                            <div className="form-group">
                            <p>Hora de ingreso</p>
                            </div>
                    </div>
                    <div className="col-md-7">
                            <div className="form-group">
                            <p style={{fontWeight: "bold"}}>{hora_cita}</p>
                            </div>
                    </div>
                </div>

               <hr />
               
                <h6>Costo por servicios médicos</h6>

                <div class="table-responsive">
                    <table class="table table-borderless mb-0">
                    <thead>
                       
                        <tr>
                            <th>Código</th>
                            <th>Servicio</th>
                            <th>Costo</th>
                            <th>Cantidad</th>
                            <th>Sub-total</th>
                           
                        </tr>
                    </thead>
                    <br />
                    <tbody>
                        <tr><b>Costos de consulta</b></tr>

                        <tr>
                            <td>{id_consulta}</td>
                            <td>Consulta</td>
                            <td>$ {costo_por_consulta}</td>
                            <td>1</td>
                            <td>$ {costo_por_consulta}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td> <h6> <b>$ {costo_por_consulta}</b> </h6></td>
                        </tr>

                        {receta_medica.length > 0 &&
                        <tr><b>Medicamentos</b></tr>
                        
                        }
                        {receta_medica.length > 0 && receta_medica.map((medicamento) => 
                            <tr>
                            <td>{medicamento.codigo_medicamento}</td>
                            <td>{medicamento.nombre_medicamento}</td>
                            <td>$ {medicamento.costo_medicamento}</td>
                            <td>{medicamento.cantidad_medicamento}</td>
                            <td><b>$ {medicamento.costo_medicamento * medicamento.cantidad_medicamento}</b></td>
                            </tr>
                        )}
                          {receta_medica.length > 0 &&
                            <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td> <h6> <b>$ {costo_medicamentos}</b> </h6></td>
                            </tr>
                        }

                        {tratamientos.length > 0 &&
                        <tr><b>Tratamientos</b></tr>
                        
                        }
                        {tratamientos.length > 0 && tratamientos.map((tratamiento) => 
                            <tr>
                            <td>{tratamiento.codigo_tratamiento}</td>
                            <td>{tratamiento.nombre_tratamiento}</td>
                            <td>$ {tratamiento.costo_tratamiento}</td>
                            <td>{tratamiento.cantidad_tratamiento}</td>
                            <td><b>$ {tratamiento.costo_tratamiento * tratamiento.cantidad_tratamiento}</b></td>
                            </tr>
                        )}
                        
                        {tratamientos.length > 0 &&

                         <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td> <h6> <b>$ {costo_tatamientos}</b> </h6></td>
                        </tr>
                        }
                        <hr />
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><h5><b>Total a pagar</b></h5></td>
                            <td><h5><b>$ {costo_total}</b></h5></td>
                        </tr>
 
                    </tbody>
                </table>
            </div>
        
            </div>
            </div>
        
        </section>
        </div>
       
        </PDFExport>            
        </div>
        </div>
    

    
    );
}


export default FacturacionConsulta;