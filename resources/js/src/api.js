const axios = window.axios;

const API_URL = 'http://localhost:8000/api';

export default {

    //Expedientes
    pacientes: () =>
    axios.get(`${API_URL}/expedientes`),

    datos_formulario_paciente: () =>
    axios.get(`${API_URL}/expedientes/crear`),

    paciente_editar: (codigo) =>
    axios.get(`${API_URL}/expedientes/${codigo}/editar`),

    paciente_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/expedientes/${param_busqueda}/buscar`),

    //Diagnósticos
    diagnosticos: () =>
    axios.get(`${API_URL}/diagnosticos`),

    datos_formulario_diagnostico: () =>
    axios.get(`${API_URL}/diagnosticos/crear`),

    diagnostico_editar: (codigo) =>
    axios.get(`${API_URL}/diagnosticos/${codigo}/editar`),

    diagnostico_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/diagnosticos/${param_busqueda}/buscar`),

    //Tratamientos
    tratamientosmedicos: () =>
    axios.get(`${API_URL}/tratamientosmedicos`),

    datos_formulario_tratamiento: () =>
    axios.get(`${API_URL}/tratamientosmedicos/crear`),

    tratamiento_editar: (codigo) =>
    axios.get(`${API_URL}/tratamientosmedicos/${codigo}/editar`),

    tratamiento_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/tratamientosmedicos/${param_busqueda}/buscar`),

    API_URL,

}