import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from 'uuid';

import API from '../api';

function RecetaMedica() {

    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), codigo_medicamento: '', dosis: '', observaciones: '', id_tipo_medicamento: ''},
      ]);

      const [medicamentos, setMedicamentos] = useState([]);
      const [tipo_medicamentos, setTipo_medicamentos] = useState([]);


    useEffect(() => {
    API.datos_formulario_medicamento().then(res => {
        const result = res.data;
        setTipo_medicamentos(result.tipos_medicamentos);
    })

    API.medicamentos().then( res => {
        const result = res.data;
        setMedicamentos(result.data);
    })
    },[]);


 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), codigo_medicamento: '', dosis: '', observaciones: '', id_tipo_medicamento: '' }])
  }

  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }

  return (
    <div className="container">
        <br />
      <h4>Registrar receta médica</h4>
      <br />
      <form onSubmit={handleSubmit}>
        { inputFields.map(inputField => (
        <div key={inputField.id}>
        <div className="row">

        <div className="col-md-3 mb-4">
            <label htmlFor="id_tipo_medicamento">Tipo medicamento (*)</label>
                <div className="form-group">
                    <select className="form-select"
                        name="id_tipo_medicamento" 
                        id="id_tipo_medicamento" 
                        >
                        <option value="">--Seleccione una opción--</option>
                        {tipo_medicamentos.map((tipo_medicamento) => (
                        <option value={tipo_medicamento.id_tipo_medicamento}>{tipo_medicamento.tipo_medicamento}</option>
                        ))}
                    </select>
                    
                </div>
        </div>

        <div className="col-md-3 mb-4">
            <label htmlFor="medicamento">Medicamento (*)</label>
                <div className="form-group">
                    <select className="form-select"
                        name="medicamento" 
                        id="medicamento" 
                        >
                        <option value="">--Seleccione una opción--</option>
                        {medicamentos.map((medicamento) => (
                        <option value={medicamento.codigp_medicamento}>{medicamento.nombre_medicamento}</option>
                        ))}
                    </select>
                    
                </div>
        </div>


        <div className="col-3">
            <div className="form-group has-icon-left">
                <label htmlFor="descripcion_diagnostico">Dosis</label>
                <div className="position-relative">
                    <textarea type="text" className="form-control" rows="6"
                        id="dosis" 
                        name="dosis"
                        value={inputField.dosis}
                        onChange={event => handleChangeInput(inputField.id, event)} 
                       
                        />
                    <div className="form-control-icon">
                        <i className="bi bi-clipboard-check"></i>
                    </div>
                </div>
                
            </div> 
        </div>

        <div className="col-3">
            <div className="form-group has-icon-left">
                <label htmlFor="descripcion_diagnostico">Indicaciones</label>
                <div className="position-relative">
                    <textarea type="text" className="form-control" rows="6"
                        id="indicaciones" 
                        name="indicaciones"
                        value={inputField.indicaciones}
                        onChange={event => handleChangeInput(inputField.id, event)} 
                       
                        />
                    <div className="form-control-icon">
                        <i className="bi bi-clipboard-check"></i>
                    </div>
                </div>
                
            </div> 
        </div>

       
       
        </div>
        
        <div>
            <button className="btn btn-danger" disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                <i className="bi bi-dash"></i>
            </button>

            <button className="btn btn-primary" onClick={handleAddFields}>
                <i className="bi bi-plus"></i>
            </button>

        </div>
        <br />
        </div>

        )) }

        <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-secondary">Guardar</button>
        </div>       
      </form>
      </div>
  );
}

export default RecetaMedica;