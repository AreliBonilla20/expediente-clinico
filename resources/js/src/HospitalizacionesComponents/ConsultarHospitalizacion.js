import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import API from '../api';

const ConsultarHospitalizacion = () => {
    
    
    const [hospitalizaciones, setHospitalizaciones] =useState([]);

    useEffect(() => {
         API.hospitalizaciones().then(res => {
            const result = res.data;
            setHospitalizaciones(result.data);
        })
      }, []);


    return(
        <section className="section">
        <div className="card">
            <div className="card-header">
                <Link to="hospitalizaciones/crear" className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
            </div>
            
            <br />
            {hospitalizaciones.length > 0 &&
            <div className="card-body">
            <h4>Hospitalizaciones del paciente</h4>
            
            <br /><br />
                <table className="table table-striped" id="table1">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Fecha de ingreso</th>
                            <th>Hora de ingreso</th>
                            <th>Sala</th>
                            <th>Camilla</th>
                            <th>Editar</th>
                            <th>Consultar</th>
                         
                        </tr>
                    </thead>
                    <tbody>
                    {hospitalizaciones.map((hospitalizacion) => 
                        <tr>
                        <td>{hospitalizacion.id_hospitalizacion}</td>
                        <td>{hospitalizacion.fecha_ingreso}</td>
                        <td>{hospitalizacion.hora_ingreso}</td>
                        <td>{hospitalizacion.sala}</td>
                        <td>{hospitalizacion.camilla}</td>
                       
                        <td>
                        <Link to={`hospitalizaciones/${hospitalizacion.id_hospitalizacion}/editar`} className="btn btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
                        </td>
                        <td>
                        <Link to={`hospitalizaciones/${hospitalizacion.id_hospitalizacion}/ver`} className="btn btn-info"><i className="bi bi-table"></i> Consultar</Link>
                        </td>
                            
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            }
        </div>
    </section>
    );
}

export default ConsultarHospitalizacion;