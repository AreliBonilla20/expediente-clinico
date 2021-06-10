import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';

import { yupResolver } from "@hookform/resolvers/yup";
import schema from '../Validaciones/QuirofanoValidacion';


import API from '../api';

const AgregarQuirofano = () => {
    
    const API_URL = API.API_URL;

    const {id_centro_medico} = useParams();
    const [quirofanos, setQuirofanos] = useState([]);
    const [quirofano, setQuirofano] = useState('');

    useEffect(() => {
        API.quirofanos(id_centro_medico).then(res => {
           const result = res.data;
           setQuirofanos(result.data);
       })
     }, []);

     const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });


    const agregarQuirofano = async (data) => {
        try {
          const body = {quirofano};
          const response = await fetch(`${API_URL}/quirofanos/${id_centro_medico}/guardar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            
          });
          
          window.location = `/centros_medicos/${id_centro_medico}/ver`;
          if(response.status === 200){
            swal({
                title: "Éxito",
                text: "Quirofano registrado!",
                icon: "success",
                button: "Aceptar",
              });
          }
          else{
            swal({
                title: "Error",
                text: "Ocurrió un error!",
                icon: "danger",
                button: "Aceptar",
              });
          }
        } catch (err) {
          console.error(err.message);
        }
      };
    
    
    return(

        <div className="card-body">
       
        <button type="submit" className="btn btn-success" data-toggle="modal" data-target="#quirofanoModal">
        <i className="bi bi-plus"></i>
        Agregar
        </button>

        <div className="modal fade" id="quirofanoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-keyboard="false" data-backdrop="static" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Agregar quirófano</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>

            </div>
            <div className="modal-body">
            <form className="form form-vertical" onSubmit={handleSubmit(agregarQuirofano)}>
                <div className="form-body">
                    <div className="row">
                    
                        <div className="col-12">
                            <div className="form-group has-icon-left">
                                <label htmlFor="quirofano">Nombre quirófano (*)</label>
                                <div className="position-relative">
                                    <textarea type="text" className="form-control" 
                                        name="quirofano"
                                        id="quirofano"
                                        {...register('quirofano')}
                                        value={quirofano}
                                        onChange={e => setQuirofano(e.target.value)} 
                                            />                                 
                                    <div className="form-control-icon">
                                        <i className="bi bi-card-text"></i>
                                    </div>
                                </div>
                                <small className="text-danger"> {errors.quirofano?.message} </small>    
                                
                            </div>
                        </div>


                    </div>
                </div>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="submit" className="btn btn-secondary" >Guardar</button>
                </div>
           
            </form>
            </div>
           
            </div>
        </div>
    
        </div>



        <div className="container" >
        <div className="row">
        <div className="col-5">
        <div className="card">
         <div className="card-content">
             <div className="card-body">
                {quirofanos.length > 0 &&
                 <div className="table-responsive">
                <table className="table lg">
                    <thead>
                        <tr>                     
			             <th>ID quirófano</th>
                         <th>Quirófano</th>
                        </tr>
                    </thead>
                    <tbody>
                    {quirofanos.map((quirofano)=>(
                        <tr>                  
                            <td>{quirofano.id_quirofano}</td>
                            <td>{quirofano.quirofano}</td>
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
    </div>
    </div>
     </div>
   
    );
}

export default AgregarQuirofano;
