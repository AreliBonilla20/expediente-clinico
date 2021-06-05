import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import API from '../api';


const FacturacionHospitalizacion = () => {
    
    const API_URL = API.API_URL;

    const {id_hospitalizacion} = useParams();
    const [codigo_paciente, set_codigo_paciente] = useState('');
    const [paciente, set_paciente] = useState('');
    const [centro_medico, set_centro_medico] = useState('');
    const [direccion_centro_medico, set_direccion_centro_medico] = useState('');
    const [telefono_centro_medico, set_telefono_centro_medico] = useState('');
    const [fecha_ingreso, set_fecha_ingreso] = useState('');
    const [hora_ingreso, set_hora_ingreso] = useState('');
    const [dias_ingreso, set_dias_ingreso] = useState('');
    const [costo_dia_hospitalizacion, set_costo_dia_hospitalizacion] = useState('');
    const [costo_hospitalizacion, set_costo_hospitalizacion] = useState('');

   

    const [receta_medica, set_receta_medica] = useState([]);
   

    useEffect(() => {
       
        API.hospitalizacion_facturacion(id_hospitalizacion).then(res => {
            const result = res.data;
            set_codigo_paciente(result.codigo_paciente);
            set_centro_medico(result.nombre_centro_medico);
            set_direccion_centro_medico(result.direccion_centro_medico +', ' + result.nombre_departamento + ', ' + result.nombre_municipio);
            set_telefono_centro_medico(result.telefono1_centro_medico + ', ' + result.telefono2_centro_medico);
            set_codigo_paciente(result.codigo_paciente);
            set_paciente(result.nombres + ' ' + result.apellidos);
            set_fecha_ingreso(result.fecha_ingreso);
            set_hora_ingreso(result.hora_ingreso);
            set_costo_dia_hospitalizacion(result.costo_dia_hospitalizacion);
            set_dias_ingreso(result.dias_ingreso);
            set_costo_hospitalizacion(result.costo_hospitalizacion);

        })

     }, []);

    
      return(
        <div className="card-body">
        <div className="card">
           
          <section className="section">
            <div className="card">
            <div className="card-body">
            <div  style={{textAlign: "center"}}>
                <h3>Factura</h3> <br />
                <h5>{centro_medico}</h5>
                <p>Tel: {direccion_centro_medico} <br /> {telefono_centro_medico} </p>
            </div>
                <hr />

                <h4 style={{textAlign: "center"}}>Hospitalización</h4>
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
                            <p style={{fontWeight: "bold"}}>{fecha_ingreso}</p>
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
                            <p style={{fontWeight: "bold"}}>{hora_ingreso}</p>
                            </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                            <div className="form-group">
                            <p>Días de hospitalización</p>
                            </div>
                    </div>
                    <div className="col-md-7">
                            <div className="form-group">
                            <p style={{fontWeight: "bold"}}>{dias_ingreso}</p>
                            </div>
                    </div>
                </div>

               <hr />
               
                <h6>Costo por servicios médicos</h6>

                <div className="table-responsive">
                <table className="table mb-0">
                    <thead>
                       
                        <tr>
                            <th>Servicio</th>
                            <th>Costo</th>
                            <th>Cantidad</th>
                            <th>Sub-total</th>
                           
                        </tr>
                    </thead>
                    <br />
                    <tbody>
                        <tr><b>Costos de hospitalización</b></tr>

                        <tr>
                            <td>Días hospitalización</td>
                            <td>$ {costo_dia_hospitalizacion}</td>
                            <td>{dias_ingreso}</td>
                            <td>$ {costo_dia_hospitalizacion * dias_ingreso}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><b>$ {costo_hospitalizacion}</b></td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
        
            </div>
            </div>
        
        </section>

        </div>
        </div>
    

    
    );
}


export default FacturacionHospitalizacion;