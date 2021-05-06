const axios = window.axios;

const API_URL = 'http://localhost:8000/api';

export default {

    

    pacientes: () =>
    axios.get(`${API_URL}/expedientes`),

    datos_formulario_paciente: () =>
    axios.get(`${API_URL}/expedientes/crear`),

    paciente_editar: (codigo) =>
    axios.get(`${API_URL}/expedientes/${codigo}/editar`),

    paciente_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/expedientes/${param_busqueda}/buscar`),

    API_URL,

}