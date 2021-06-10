import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';

import API from '../api';

const EmpleadosCentroMedico = () => {
    
    const API_URL = API.API_URL;

    const {id_centro_medico} = useParams();
    const [empleados, set_empleados] = useState([]);
  

    useEffect(() => {
        API.centro_medico_empleados(id_centro_medico).then(res => {
           const result = res.data;
           set_empleados(result);
       })
     }, []);

    
    return(
        
        <div className="card-body">
            
        <div className="card">
         <div className="card-content">
             <div className="card-body">
             {empleados.length == 0 &&
                
                <p>No hay empleados registrados</p>
            
            }   

                {empleados.length > 0 &&
                 <div className="table-responsive">
                     <h4>Empleados</h4>
                <table className="table mb-0">
                    <thead>
                        <tr>                           
			             <th>ID empleado</th>
                         <th>Nombres</th>
                         <th>Apellidos</th>
                         <th>Área de trabajo</th>
                         <th>Cargo</th>
                         <th>Editar</th>
                         <th>Consultar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {empleados.map((empleado)=>(
                        <tr>                          
                            <td>{empleado.id_empleado}</td>
                            <td>{empleado.nombre_empleado}</td>
                            <td>{empleado.apellido_empleado}</td>
                            <td>{empleado.area}</td>
                            <td>{empleado.cargo}</td>
                            <td>
                                <Link to={`empleados/${empleado.id_empleado}/editar`} className="btn btn-sm btn-primary"><i className="bi bi-pencil"></i> Editar</Link>
                            </td>
                            <td>
                                <Link to={`empleados/${empleado.id_empleado}/ver`} className="btn btn-sm btn-info"><i className="bi bi-table"></i> Consultar</Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                }             
            </div>
         </div>
    </div>
    </div>
    );
}

export default EmpleadosCentroMedico;
