import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

import API from '../api';


const VerResultadoExamen = () => {
    
    const API_URL = API.API_URL;

    const {id_atencion_medica} = useParams();

    const [examen_resultados, set_examen_resultados] =useState([]);
   
    useEffect(() => {
         API.examen_resultado(id_atencion_medica).then(res => {
            const result = res.data;
            set_examen_resultados(result);
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
                                <h3>Exámenes</h3>
                                
                                <p className="text-subtitle text-muted">Consulta de exámenes</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/examenes">Consulta exámenes</Link>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="page-heading">
                   
                    <section className="section">
                        <div className="card">
                           
                            <br />
                            <div className="card-body">
                            <div className="card">
                            
                                {examen_resultados.length > 0 &&
                                
                                <div className="card-body">
                                    <h4>Parámetros</h4>
                                <div className="table-responsive">
                                <table className="table lg">
                                <thead>
                                    <tr>                     
                                        <th>Parámetro</th>
                                        <th>Resultado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {examen_resultados.map((examen)=>(
                                    <tr>                  
                                        <td>{examen.parametro}</td>
                                        <td>{examen.resultado}</td>

                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                                </div>             
                                </div>
                                }
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


export default VerResultadoExamen;