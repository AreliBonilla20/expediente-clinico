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

const VerCita = () => {

    const { id_cita } = useParams();
   
    const [id_doctor, set_id_doctor] = useState('');
    const [consultorio, set_consultorio] = useState('');
    const [fecha_cita, set_fecha_cita] = useState('');
    const [hora_cita, set_hora_cita] = useState('');
    const [paciente, set_paciente] = useState('');
    const [doctor, set_doctor] = useState('');
    const [estado_cita, set_estado_cita] = useState('');
    
    useEffect(() => {
        API.cita_ver(id_cita).then(res => {
            const cita = res.data;
            set_id_doctor(cita.id_doctor);
            set_fecha_cita(cita.fecha_cita);
            set_hora_cita(cita.hora_cita);
            set_paciente(cita.codigo_paciente + ' - ' + cita.nombres + ' ' + cita.apellidos);
            set_doctor(cita.id_doctor + ' - ' + cita.nombre_empleado + ' ' + cita.apellido_empleado);
            set_consultorio(cita.consultorio);
            set_estado_cita(cita.estado_cita);
       })
    }, []);

    return(
        <div id="app">
        <Menu />
        <div id="main" className='layout-navbar'>
        <Header />
            <div id="main-content">

                <div className="page-heading">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <h3>Consultar</h3>
                                <h4>Cita: {id_cita}</h4>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/citas">Consulta citas</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="ver">Ver cita</Link>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="page-heading">
                   
                    <section className="section">
                        <div className="card">
                        <div className="card-body">
                            <h5>Cita</h5>
                            <hr />

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>ID cita</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{id_cita}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Paciente</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{paciente}</p>
                                        </div>
                                </div>
                            </div>

                            

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>ID doctor</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{doctor}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Fecha de cita</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{fecha_cita}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Hora de cita</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{hora_cita}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Consultorio</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{consultorio}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                        <div className="form-group">
                                        <p>Estado</p>
                                        </div>
                                </div>
                                <div className="col-md-8">
                                        <div className="form-group">
                                        <p style={{fontWeight: "bold"}}>{estado_cita}</p>
                                        </div>
                                </div>
                            </div>

                            <div className="col-12 d-flex justify-content-end">
                                <Link to="editar" className="btn btn-sm btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
                            </div>
                        </div>
                        </div>
                       
                    </section>

            </div>
            </div>   
            </div>
        </div>
        <Footer />
    </div>
    );
}

export default VerCita;