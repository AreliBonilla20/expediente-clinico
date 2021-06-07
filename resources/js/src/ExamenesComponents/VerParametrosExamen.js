import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import API from '../api';


const HistorialDiagnosticos = () => {
    
    const API_URL = API.API_URL;

    const {codigo} = useParams();

    const [examen_parametros, set_examen_parametros] =useState([]);
   
    useEffect(() => {
         API.ver_parametros_examen(codigo).then(res => {
            const result = res.data;
            set_examen_parametros(result);
        })
      }, []);


      return(
        <div className="card-body">
        <div className="card">
            {examen_parametros.length == 0 &&
            <div className="card-header"> 
                <Link to={`/examenes/${codigo}/agregar_parametros`} className="btn btn-success"><i className="bi bi-plus"></i> Agregar </Link>
            </div>
            }

            {examen_parametros.length > 0 &&
            
            <div className="card-body">
                <h4>Parámetros</h4>
            <div className="table-responsive">
            <table className="table lg">
            <thead>
                <tr>                     
                    <th>Parámetro</th>
                    <th>Unidad de medida</th>
                    <th>Valor mínimo</th>
                    <th>Valor máximo</th>
                </tr>
            </thead>
            <tbody>
            {examen_parametros.map((examen)=>(
                <tr>                  
                    <td>{examen.parametro}</td>
                    <td>{examen.unidad_medida}</td>
                    <td>{examen.valor_min}</td>
                    <td>{examen.valor_max}</td>
                </tr>
                ))}
            </tbody>
            </table>
            </div>             
            </div>
             }
        </div>
        </div>
    

    
    );
}


export default HistorialDiagnosticos;