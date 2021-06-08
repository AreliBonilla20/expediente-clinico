import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import API from '../api';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';
import e from 'cors';



function AgregarResultadoExamen() {
  const API_URL = API.API_URL;

  var {id_atencion_medica, id_consulta, id_hospitalizacion} = useParams();

  const [examen_parametros, set_examen_parametros] = useState([]);

  const [resultados, set_resultados] = useState("");
  var resultado_parametros;

  useEffect(() => {
    API.examen_parametros(id_atencion_medica).then(res => {
        const result = res.data;
        set_examen_parametros(result);
   })

},[]);

   resultado_parametros = resultados.split(',');


    const AgregarResultadoExamen = async (e) => {
    e.preventDefault();
    try {
      const body = { resultado_parametros };
      const response = await fetch(`${API_URL}/examenes_resultado/${id_atencion_medica}/guardar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
        
      });
      
      if(id_hospitalizacion !== 'null'){
        const codigo = id_hospitalizacion.substring(0,7);
        window.location = `/expedientes/${codigo}/hospitalizaciones/${id_hospitalizacion}/ver`;
      }

      if(id_consulta !== 'null'){
        const codigo = id_consulta.substring(0,7);
        window.location = `/expedientes/${codigo}/consultas/${id_consulta}/ver`;
      }
      
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <div id="app">
        <Menu />
        <div id="main" className='layout-navbar'>
        <Header />
            <div id="main-content">
                

                <div className="page-heading">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <h3>Exámenes</h3>
                             
            
                                <p className="text-subtitle text-muted">Agregar resultado</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/examen/crear">Agregar examen</Link>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    
                    <div className="page-heading">
                    <div className="col-md-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Complete los campos del formulario</h3>
                                    <p>Los campos que contienen (*) son obligatorios</p>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                    <form  onSubmit={AgregarResultadoExamen}>
                                   
                                        <div className="row">
                                            <div className="card-header">
                                                <h6>Nombre examen</h6>
                                            </div>

                                         
                                             
                                             <div className="table-responsive">
                                             <table className="table lg">
                                             <thead>
                                                 <tr>                     
                                                     <th>Parámetro</th>
                                                     <th>Resultado</th>
                                                     <th>Unidad de medida</th>
                                                     <th>Valores normales</th>
                                                    
                                                 </tr>
                                             </thead>
                                             <tbody>
                                             {examen_parametros.map((examen)=>(
                                                 <tr>                  
                                                     <td>{examen.parametro}</td>
                                                     <td>
                                                         <input  type="text" onBlur={e => set_resultados(resultados.length > 0 ? resultados + ',' + e.target.value : e.target.value)}/>
                                                     </td>
                                                     <td>{examen.unidad_medida}</td>
                                                     <td>{examen.valor_min} - {examen.valor_max} {examen.unidad_medida}</td>
                                                    
                                                 </tr>
                                                ))}     
                                             </tbody>
                                             </table>
                                             </div>             
                                                
                                                                       
                                           

                                          
                                        </div>
                              
                                    <div className="col-12 d-flex justify-content-end">
                                            <button className="btn btn-secondary">Guardar</button>
                                        </div>
                                    </form>
                                    </div>

                                    
                                    {JSON.stringify(resultado_parametros[0])}
                                
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>   
            </div>
        </div>
        <Footer />
    </div>
    );
}

export default AgregarResultadoExamen;