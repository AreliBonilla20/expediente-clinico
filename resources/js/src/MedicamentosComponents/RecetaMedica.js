import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import API from '../api';

function RecetaMedica() {
  const API_URL = API.API_URL;
 const {id_hospitalizacion} = useParams();
  const codigo = id_hospitalizacion.substr(0,7);

  const [inputList, setInputList] = useState([{ codigo_medicamento: "", dosis: "", indicaciones: ""}]);
  const [medicamentos,setMedicamentos] = useState([]);

  const [tipos_medicamentos, setTipos_Medicamentos] = useState([]);
  const [id_tipo_medicamento, setId_tipo_medicamento] = useState('');

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { codigo_medicamento: "", dosis: "", indicaciones: ""}]);
  };

  useEffect(() => {
    API.datos_formulario_medicamento().then(res => {
        const result = res.data;
        setTipos_Medicamentos(result.tipos_medicamentos);
   })

   API.medicamentos().then( res => {
       const result = res.data;
       setMedicamentos(result.data);
   })
},[]);

    const agregarRecetaMedica = async (e) => {
   e.preventDefault();
    try {
      const body = { inputList };
      const response = await fetch(`${API_URL}/recetas_medicas/${id_hospitalizacion}/guardar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
        
      });
      
      window.location = `/expedientes/${codigo}/hospitalizaciones/${id_hospitalizacion}/ver`;
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <div className="App">
        <br />
      <h4>Registro de receta médica</h4>
      <br />

      <form>
      {inputList.map((x, i) => {
        return (
      
          <div className="row">

            <div className="col-3">
            <label htmlFor="id_tipo_medicamento">Tipo medicamento (*)</label>
                <div className="form-group">
                    <select className="form-select"
                        name="id_tipo_medicamento" 
                        id="id_tipo_medicamento" 
                        value={id_tipo_medicamento} 
                        onChange={e => setId_tipo_medicamento(e.target.value)} >
                        <option value="">--Seleccione una opción--</option>
                        {tipos_medicamentos.map((tipo_medicamento) => (
                        <option value={tipo_medicamento.id_tipo_medicamento}>{tipo_medicamento.tipo_medicamento}</option>
                        ))}
                    </select>
                </div>
            </div>

           

            <div className="col-3">
            <label htmlFor="id_tipo_medicamento">Medicamento (*)</label>
                <div className="form-group">
                    <select className="form-select"
                        name="codigo_medicamento"
                        placeholder="Enter First Name"
                        value={x.codigo_medicamento}
                        onChange={e => handleInputChange(e, i)} >
                       <option value="">--Seleccione una opción--</option>
                        {medicamentos.map((medicamento) => {
                            if(medicamento.id_tipo_medicamento == id_tipo_medicamento){
                                return (
                                <option key={medicamento.codigo_medicamento} 
                                value={medicamento.codigo_medicamento}>{medicamento.nombre_medicamento}
                                </option>
                                )
                            }
                        })}
                    </select>
                </div>
            </div>

            <div className="col-3">
            <div className="form-group has-icon-left">
                <label htmlFor="dosis">Dosis</label>
                <div className="position-relative">
                    <textarea type="text" className="form-control" rows="4"
                        name="dosis"
                        value={x.dosis}
                        onChange={e => handleInputChange(e, i)} />
                    <div className="form-control-icon">
                        <i className="bi bi-clipboard-check"></i>
                    </div>
                </div>
            </div>
            </div>

            <div className="col-3">
            <div className="form-group has-icon-left">
                <label htmlFor="indicaciones">Indicaciones</label>
                <div className="position-relative">
                    <textarea type="text" className="form-control" rows="4"
                         name="indicaciones"
                         value={x.indicaciones}
                         onChange={e => handleInputChange(e, i)} />
                    <div className="form-control-icon">
                        <i className="bi bi-clipboard-check"></i>
                    </div>
                </div>
            </div>
            </div>

            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="btn btn-danger"
                onClick={() => handleRemoveClick(i)}> <i className="bi bi-dash"></i> </button>}
              {inputList.length - 1 === i && <button className="btn btn-primary" onClick={handleAddClick}><i className="bi bi-plus"></i></button>}
            </div>
         
          </div>
        
        );
      })}
       <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-secondary" onClick={agregarRecetaMedica}>Guardar</button>
        </div>
      </form>
     
     
    </div>
    
  );
}

export default RecetaMedica;