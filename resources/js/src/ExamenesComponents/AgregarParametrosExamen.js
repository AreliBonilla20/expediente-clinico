import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import API from '../api';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

function AgregarParametrosExamen() {
  const API_URL = API.API_URL;

  const {codigo} = useParams();

  const [input_list, set_input_list] = useState([{ parametro: "", unidad_medida: "", valor_min: "", valor_max: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...input_list];
    list[index][name] = value;
    set_input_list(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...input_list];
    list.splice(index, 1);
    set_input_list(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    set_input_list([...input_list, { parametro: "", unidad_medida: "", valor_min: "", valor_max: ""}]);
  };

 
    const agregarParametrosExamen = async (e) => {
    e.preventDefault();
    try {
      const body = { input_list };
      const response = await fetch(`${API_URL}/examenes/${codigo}/agregar_parametros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
        
       
    });
          
    window.location = `/examenes/${codigo}/ver`;
      
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
                                <h3>Parámetros del examen</h3>
                        
                                <p className="text-subtitle text-muted">Agregar parámetros</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/diagnostico/crear">Agregar diagnóstico</Link>
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
                                    <form  onSubmit={agregarParametrosExamen}>
                                    {input_list.map((x, i) => {
                                        return (    
                                    
                                        <div className="row">
                                            <div className="card-header">
                                                <h6>Parámetro {i + 1 }</h6>
                                            </div>


                                            <div className="col-3">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="parametro">Parámetro</label>
                                                <div className="position-relative">
                                                    <input type="text" className="form-control"
                                                        name="parametro"
                                                        value={x.parametro}
                                                        onChange={e => handleInputChange(e, i)} />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-clipboard-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>

                                            <div className="col-2">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="unidad_medida">Unidad de medida</label>
                                                <div className="position-relative">
                                                    <input type="text" className="form-control"
                                                        name="unidad_medida"
                                                        value={x.unidad_medida}
                                                        onChange={e => handleInputChange(e, i)} />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-clipboard-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>

                                           
                                            <div className="col-3">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="valor_min">Valor mínimo</label>
                                                <div className="position-relative">
                                                    <input type="text" className="form-control"
                                                        name="valor_min"
                                                        value={x.valor_min}
                                                        onChange={e => handleInputChange(e, i)} />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-clipboard-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>

                                            <div className="col-3">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="valor_max">Valor máximo</label>
                                                <div className="position-relative">
                                                    <input type="text" className="form-control"
                                                        name="valor_max"
                                                        value={x.valor_max}
                                                        onChange={e => handleInputChange(e, i)} />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-clipboard-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>


                                            <div className="col-1">
                                                <br />
                                            <div className="btn-box">
                                            {input_list.length !== 1 && <button
                                                className="btn btn-sm btn-danger rounded-pill"
                                                onClick={() => handleRemoveClick(i)}> <i className="bi bi-dash"></i>  </button>}
                                            {input_list.length - 1 === i && <button className="btn btn-sm btn-primary rounded-pill" onClick={handleAddClick}><i className="bi bi-plus"></i></button>}
                                            </div>
                                            </div>
                                        
                                        </div>
                                        
                                        );
                                    })}
                                        <div className="col-12 d-flex justify-content-end">
                                            <button className="btn btn-secondary">Guardar</button>
                                        </div>
                                    </form>
                                    </div>
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

export default AgregarParametrosExamen;