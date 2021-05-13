import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import API from '../api';

const VerExpediente = () => {

    const { codigo } = useParams();
    const API_URL = API.API_URL;
    
    const [antecedente, setAntecedente] = useState([]);
    const [historial_enfermedades, setHistorial_enfermedades] = useState('');
    const [padecimientos_familiares, setPadecimientos_familiares] = useState('');
    const [nombre_padre, setNombre_padre] = useState('');
    const [apellidos_padre, setApellidos_padre] = useState('');
    const [fecha_nacimiento_padre, setFecha_nacimiento_padre] = useState('');
    const [direccion_padre, setDireccion_padre] = useState('');
    const [padecimientos_padre, setPadecimientos_padre] = useState('');
    const [nombre_madre, setNombre_madre] = useState('');
    const [apellidos_madre, setApellidos_madre] = useState('');
    const [fecha_nacimiento_madre, setFecha_nacimiento_madre] = useState('');
    const [direccion_madre, setDireccion_madre] = useState('');
    const [padecimientos_madre, setPadecimientos_madre] = useState('');
   

    useEffect(() => {
        API.antecedente_ver(codigo).then(res => {
           const antecedente = res.data;
           setAntecedente(antecedente);
           setHistorial_enfermedades(antecedente.historial_enfermedades);
           setPadecimientos_familiares(antecedente.padecimientos_familiares);
           setNombre_padre(antecedente.nombre_padre);
           setApellidos_padre(antecedente.apellidos_padre);
           setFecha_nacimiento_padre(antecedente.fecha_nacimiento_padre);
           setDireccion_padre(antecedente.direccion_padre);
           setPadecimientos_padre(antecedente.padecimientos_padre);
           setNombre_madre(antecedente.nombre_madre);
           setApellidos_madre(antecedente.apellidos_madre);
           setFecha_nacimiento_madre(antecedente.fecha_nacimiento_madre);
           setDireccion_madre(antecedente.direccion_madre);
           setPadecimientos_madre(antecedente.padecimientos_madre);
        
       })
    }, []);

    
    return(
        
        <div className="card-body">
            <h5>Antecedentes</h5>
            <hr />

            
            <div className="row">
            {nombre_padre && 
           
            <div className="col-md-6">
                 <h6>Antecedentes del padre</h6>
                
                    {nombre_padre &&
                    <div className="row">
                        <div className="col-md-6">
                                <div className="form-group">
                                
                                    <p>Nombre del padre</p>
                                
                                </div>
                        </div>
                    <div className="col-md-6">
                            <div className="form-group">
                                <p style={{fontWeight: "bold"}}> {nombre_padre} {apellidos_padre}</p>
                            </div>
                    </div>
                    </div>
                    }

                    {fecha_nacimiento_padre &&
                    <div className="row">
                        <div className="col-md-6">
                                <div className="form-group">
                                
                                    <p>Fecha de nacimiento del padre</p>
                                
                                </div>
                        </div>
                    <div className="col-md-6">
                            <div className="form-group">
                                <p style={{fontWeight: "bold"}}> {fecha_nacimiento_padre}</p>
                            </div>
                    </div>
                    </div>
                    }
                
                    {direccion_padre &&
                    <div className="row">
                    <div className="col-md-6">
                            <div className="form-group">
                            
                                <p>Dirección del padre</p>
                            
                            </div>
                    </div>
                    <div className="col-md-6">
                            <div className="form-group">
                                <p style={{fontWeight: "bold"}}> {direccion_padre}</p>
                            </div>
                    </div>
                    </div>
                    }

                    {padecimientos_padre &&
                    <div className="row">
                    <div className="col-md-6">
                            <div className="form-group">
                            
                                <p>Padecimientos del padre</p>
                            
                            </div>
                    </div>
                    <div className="col-md-6">
                            <div className="form-group">
                                <p style={{fontWeight: "bold"}}> {padecimientos_padre}</p>
                            </div>
                    </div>
                    </div>
                    }
                </div>
                }

                {nombre_madre  &&        
                <div className="col-md-6">
                <h6>Antecedentes de la madre</h6>
         
                {nombre_madre  &&
                    <div className="row">
                        <div className="col-md-6">
                                <div className="form-group">
                                
                                    <p>Nombre de la madre</p>
                                
                                </div>
                        </div>
                    <div className="col-md-6">
                            <div className="form-group">
                                <p style={{fontWeight: "bold"}}> {nombre_madre} {apellidos_madre}</p>
                            </div>
                    </div>
                    </div>
                    }

                {fecha_nacimiento_madre &&
                <div className="row">
                    <div className="col-md-6">
                            <div className="form-group">
                            
                                <p>Fecha de nacimiento de la madre</p>
                            
                            </div>
                    </div>
                <div className="col-md-6">
                        <div className="form-group">
                            <p style={{fontWeight: "bold"}}> {fecha_nacimiento_madre}</p>
                        </div>
                </div>
                </div>
                }

                {direccion_madre &&
                <div className="row">
                <div className="col-md-6">
                        <div className="form-group">
                        
                            <p>Dirección de la madre</p>
                        
                        </div>
                </div>
                <div className="col-md-6">
                        <div className="form-group">
                            <p style={{fontWeight: "bold"}}> {direccion_madre}</p>
                        </div>
                </div>
                </div>
                }

                {padecimientos_madre &&
                <div className="row">
                <div className="col-md-6">
                        <div className="form-group">
                        
                            <p>Padecimientos de la madre</p>
                        
                        </div>
                </div>
                <div className="col-md-6">
                        <div className="form-group">
                            <p style={{fontWeight: "bold"}}> {padecimientos_madre}</p>
                        </div>
                </div>
                </div>
                }
            </div>
            }
                
            </div>
            <br />
                {padecimientos_familiares &&
                <div className="row">
                    <h6>Padecimientos familiares</h6>
                
                <div className="col-md-3">
                        <div className="form-group">
                        
                            <p>Padecimientos familiares</p>
                        
                        </div>
                </div>
                <div className="col-md-9">
                        <div className="form-group">
                            <p style={{fontWeight: "bold"}}> {padecimientos_familiares}</p>
                        </div>
                </div>
                </div>
            }
            <br />

            {historial_enfermedades &&
                <div className="row">
                <h6>Antecedentes del paciente</h6>
               
                <div className="col-md-3">
                        <div className="form-group">
                        
                            <p>Historial de enfermedades</p>
                        
                        </div>
                </div>
                <div className="col-md-9">
                        <div className="form-group">
                            <p style={{fontWeight: "bold"}}> {historial_enfermedades}</p>
                        </div>
                </div>
                </div>
            }
                
            
            {!antecedente == '' &&
            <div className="col-12 d-flex justify-content-end">
                <Link to="antecedentes/editar" className="btn btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
            </div>
            }

            {antecedente.length == 0 &&
            <div className="col-12 d-flex justify-content-start">
                <Link to="antecedentes/crear" className="btn btn-success"><i className="bi bi-plus"></i> Agregar antecedentes</Link>
            </div>
            }
        </div>
    );
}

export default VerExpediente;