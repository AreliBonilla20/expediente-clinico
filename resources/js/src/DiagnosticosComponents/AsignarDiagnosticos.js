import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import API from '../api';
import swal from 'sweetalert';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';



function AsignarDiagnosticos() {
  const API_URL = API.API_URL;

  var {id_consulta, id_hospitalizacion} = useParams();
  var cont = 0 ;
  if(id_consulta == undefined){
        id_consulta = 'null';
  }

  if(id_hospitalizacion == undefined){
    id_hospitalizacion = 'null';
  }

  const [input_list, set_input_list] = useState([{ codigo_diagnostico: "", observaciones_diagnostico: "", indicaciones_diagnostico: ""}]);
  const [diagnosticos, set_diagnosticos] = useState([]);

  const [tipos_diagnosticos, set_tipos_diagnosticos] = useState([]);
  const [id_tipo_diagnostico, set_id_tipo_diagnostico] = useState('');
  const [error_diagnostico, set_error_diagnostico] = useState('');
  const [error_observaciones, set_error_observaciones] = useState('');
  const [error_indicaciones, set_error_indicaciones] = useState('');


  const validar_diagnostico = (e, index) => {
    if(!e.target.value){
        set_error_diagnostico('El campo diagnóstico es obligatorio');
    }
    else{
        set_error_diagnostico('');
        
    }
    
    const { name, value } = e.target;
    const list = [...input_list];
    list[index][name] = value;
    set_input_list(list);
  
      
  };

  const validar_observaciones = (e, index) => {
    if(e.target.value.length==0){
        set_error_observaciones('El campo observaciones es obligatorio');
    }
    else if(e.target.value.length > 0 && e.target.value.length <250){
        set_error_observaciones('');
    }

    else if(e.target.value.length > 250){
        set_error_observaciones('No deben ser mas de 250 caracteres');
    }
    else{
        set_error_observaciones('');
    }
    
    const { name, value } = e.target;
    const list = [...input_list];
    list[index][name] = value;
    set_input_list(list);
  
      
  };

  const validar_indicaciones = (e, index) => {
    if(e.target.value.length==0){
        set_error_indicaciones('El campo indicaciones es obligatorio');
    }
    else if(e.target.value.length > 0 && e.target.value.length <250){
        set_error_indicaciones('');
    }

    else if(e.target.value.length > 250){
        set_error_indicaciones('No deben ser mas de 250 caracteres');
    }
    else{
        set_error_indicaciones('');
    }
    
    const { name, value } = e.target;
    const list = [...input_list];
    list[index][name] = value;
    set_input_list(list);



  };

  
    for(let i=0; i<input_list.length; i++){
        if(input_list[i]['codigo_diagnostico'] == ''){
            cont++;
        }
        if(input_list[i]['indicaciones_diagnostico'] == ''){
            cont++;
        }
        if(input_list[i]['observaciones_diagnostico'] == ''){
            cont++;
        }
    }

   


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
    
    set_input_list([...input_list, { codigo_diagnostico: "", observaciones_diagnostico: "", indicaciones_diagnostico: ""}]);
  };

  useEffect(() => {
    API.datos_formulario_diagnostico().then(res => {
        const result = res.data;
        set_tipos_diagnosticos(result.tipos_diagnosticos);
        set_diagnosticos(result.diagnosticos);
   })
},[]);

  

    const asignarDiagnosticos = async (e) => {
    e.preventDefault();
    try {
      const body = { input_list };
      const response = await fetch(`${API_URL}/historial_diagnosticos/${id_consulta}/${id_hospitalizacion}/guardar`, {
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
      if(response.status === 200){
        swal({
            title: "Éxito",
            text: "Diagnósticos registrados!",
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
                                <h3>Diagnósticos</h3>
                             
            
                                <p className="text-subtitle text-muted">Agregar diagnóstico</p>
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
                                    <form  onSubmit={asignarDiagnosticos}>
                                    {input_list.map((x, i) => {
                                        return (    
                                    
                                        <div className="row">
                                            <div className="card-header">
                                                <h6>Diagnóstico {i + 1 }</h6>
                                            </div>

                                            <div className="col-12">
                                            <label htmlFor="id_tipo_diagnostico">Tipo diagnostico (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="id_tipo_diagnostico" 
                                                        id="id_tipo_diagnostico" 
                                                        value={id_tipo_diagnostico} 
                                                        onChange={e => set_id_tipo_diagnostico(e.target.value)} >
                                                        <option value="">--Seleccione una opción--</option>
                                                        {tipos_diagnosticos.map((tipo_diagnostico) => (
                                                        <option value={tipo_diagnostico.id_tipo_diagnostico}>{tipo_diagnostico.tipo_diagnostico}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                        

                                            <div className="col-12">
                                            <label htmlFor="id_tipo_diagnostico">Diagnóstico (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="codigo_diagnostico"
                                                        placeholder="Enter First Name"
                                                        value={x.codigo_diagnostico}
                                                        onChange={e => validar_diagnostico(e, i)} 
                                                      >
                                                    <option value="">--Seleccione una opción--</option>
                                                        {diagnosticos.map((diagnostico) => {
                                                            if(diagnostico.id_tipo_diagnostico == id_tipo_diagnostico){
                                                                return (
                                                                <option key={diagnostico.codigo_diagnostico} 
                                                                value={diagnostico.codigo_diagnostico}>{diagnostico.nombre_diagnostico}
                                                                </option>
                                                                )
                                                            }
                                                        })}
                                                    </select>
                                                   
                                                      <small className="text-danger">{error_diagnostico}</small>
                                                    
                                                </div>
                                            </div>

                                            <div className="col-6">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="observaciones_diagnostico">Observaciones diagnóstico</label>
                                                <div className="position-relative">
                                                    <textarea type="text" className="form-control" rows="4"
                                                        name="observaciones_diagnostico"
                                                        value={x.observaciones_diagnostico}
                                                        onChange={e => validar_observaciones(e, i)} 
                                                       />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-clipboard-check"></i>
                                                    </div>
                                                </div>
                                                <small className="text-danger">{error_observaciones}</small>
                                            </div>
                                            </div>

                                            <div className="col-6">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="indicaciones_diagnostico">Indicaciones diagnóstico</label>
                                                <div className="position-relative">
                                                    <textarea type="text" className="form-control" rows="4"
                                                        name="indicaciones_diagnostico"
                                                        value={x.indicaciones_diagnostico}
                                                        onChange={e => validar_indicaciones(e, i)} 
                                                       />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-clipboard-check"></i>
                                                    </div>
                                                </div>
                                                <small className="text-danger">{error_indicaciones}</small>
                                            </div>
                                            </div>

                                            <div className="btn-box">
                                            {input_list.length !== 1 && <button
                                                className="btn btn-sm btn-danger rounded-pill"
                                                onClick={() => handleRemoveClick(i)}> <i className="bi bi-dash"></i>  </button>}
                                            {input_list.length - 1 === i && <button className="btn btn-sm btn-primary rounded-pill" onClick={handleAddClick}><i className="bi bi-plus"></i></button>}
                                            </div>
                                        
                                        </div>
                                        
                                        );
                                    })}

                                    
                                    
                                  {cont == 0 &&
                                    <div className="col-12 d-flex justify-content-end">
                                        <button className="btn btn-secondary" id="btn_guardar">Guardar</button>
                                    </div>
                                   }
                                       
                                      
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

export default AsignarDiagnosticos;