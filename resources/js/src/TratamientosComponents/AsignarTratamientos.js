import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import API from '../api';
import swal from 'sweetalert';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';



function AsignarTratamientos() {
  const API_URL = API.API_URL;
  var cont = 0;

  var {id_consulta, id_hospitalizacion} = useParams();

  if(id_consulta == undefined){
        id_consulta = 'null';
  }

  if(id_hospitalizacion == undefined){
    id_hospitalizacion = 'null';
  }

  const [input_list, set_input_list] = useState([{ codigo_tratamiento: "", indicaciones_tratamiento: "", cantidad_tratamiento: 1}]);
  const [tratamientos,set_tratamientos] = useState([]);

  const [tipos_tratamientos, set_tipos_tratamientos] = useState([]);
  const [id_tipo_tratamiento, set_id_tipo_tratamiento] = useState('');
  const [error_tratamiento, set_error_tratamiento] = useState('');
  const [error_indicaciones, set_error_indicaciones] = useState('');


  const validar_tratamiento = (e, index) => {
    if(!e.target.value){
        set_error_tratamiento('El campo tratamiento es obligatorio');
    }
    else{
        set_error_tratamiento('');
        
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
    if(input_list[i]['codigo_tratamiento'] == ''){
        cont++;
    }
    if(input_list[i]['indicaciones_tratamiento'] == ''){
        cont++;
    }
   
}


  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...input_list];
    list.splice(index, 1);
    set_input_list(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    set_input_list([...input_list, { codigo_tratamiento: "", indicaciones_tratamiento: "", cantidad_tratamiento: 1}]);
  };

  useEffect(() => {
    API.datos_formulario_tratamiento().then(res => {
        const result = res.data;
        set_tipos_tratamientos(result.tipos_tratamientos);
   })

   API.tratamientos_medicos().then( res => {
       const result = res.data;
       set_tratamientos(result.data);
   })
},[]);

  

    const asignarTratamientos = async (e) => {
    e.preventDefault();
    try {
      const body = { input_list };
      const response = await fetch(`${API_URL}/historial_tratamientos/${id_consulta}/${id_hospitalizacion}/guardar`, {
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
            text: "Tratamientos registrados!",
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
                                <h3>Tratamientos</h3>
                             
                                <p className="text-subtitle text-muted">Asignar tratamientos</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                        <Link to="/tratamiento/crear">Agregar diagnóstico</Link>
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
                                    <form  onSubmit={asignarTratamientos}>
                                    {input_list.map((x, i) => {
                                        return (    
                                    
                                        <div className="row">
                                            <div className="card-header">
                                                <h6>Tratamiento {i + 1 }</h6>
                                            </div>

                                            <div className="col-12">
                                            <label htmlFor="id_tipo_tratamiento">Tipo tratamiento (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="id_tipo_tratamiento" 
                                                        id="id_tipo_tratamiento" 
                                                        value={id_tipo_tratamiento} 
                                                        onChange={e => set_id_tipo_tratamiento(e.target.value)} >
                                                        <option value="">--Seleccione una opción--</option>
                                                        {tipos_tratamientos.map((tipo_tratamiento) => (
                                                        <option value={tipo_tratamiento.id_tipo_tratamiento}>{tipo_tratamiento.tipo_tratamiento}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                        

                                            <div className="col-10">
                                            <label htmlFor="id_tipo_tratamiento">Tratamiento (*)</label>
                                                <div className="form-group">
                                                    <select className="form-select"
                                                        name="codigo_tratamiento"
                                                        placeholder="Enter First Name"
                                                        value={x.codigo_tratamiento}
                                                        onChange={e => validar_tratamiento(e, i)}  >
                                                    <option value="">--Seleccione una opción--</option>
                                                        {tratamientos.map((tratamiento) => {
                                                            if(tratamiento.id_tipo_tratamiento == id_tipo_tratamiento){
                                                                return (
                                                                <option key={tratamiento.codigo_tratamiento} 
                                                                value={tratamiento.codigo_tratamiento}>{tratamiento.nombre_tratamiento}
                                                                </option>
                                                                )
                                                            }
                                                        })}
                                                    </select>
                                                    <small className="text-danger">{error_tratamiento}</small>
                                                </div>
                                            </div>

                                            <div className="col-2">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="cantidad_tratamiento">Cantidad</label>
                                                <div className="position-relative">
                                                <input type="number" className="form-control" min="1"
                                                name="cantidad_tratamiento"
                                                value={x.cantidad_tratamiento}
                                                onChange={e => handleInputChange(e, i)}  />
                                               
                                                <div className="form-control-icon">
                                                <i class="bi bi-sort-numeric-up"></i>
                                                    </div>
                                                    </div>
                                            </div>
                                            </div>

                                            <div className="col-12">
                                            <div className="form-group has-icon-left">
                                                <label htmlFor="indicaciones_tratamiento">Indicaciones</label>
                                                <div className="position-relative">
                                                    <textarea type="text" className="form-control" rows="4"
                                                        name="indicaciones_tratamiento"
                                                        value={x.indicaciones_tratamiento}
                                                        onChange={e => validar_indicaciones(e, i)}/>
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

export default AsignarTratamientos;