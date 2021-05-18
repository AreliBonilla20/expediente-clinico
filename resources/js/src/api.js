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

    paciente_ver: (codigo) =>
    axios.get(`${API_URL}/expedientes/${codigo}/ver`),

    paciente_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/expedientes/${param_busqueda}/buscar`),

    //Antecedentes
    antecedente_editar: (codigo) =>
    axios.get(`${API_URL}/antecedentes/${codigo}/editar`),

    antecedente_ver: (codigo) =>
    axios.get(`${API_URL}/antecedentes/${codigo}/ver`),

    //Hospitalizacion
    hospitalizaciones: () =>
    axios.get(`${API_URL}/hospitalizaciones`),

    hospitalizacion_editar: (id_hospitalizacion) =>
    axios.get(`${API_URL}/hospitalizaciones/${id_hospitalizacion}/editar`),

    hospitalizacion_ver: (id_hospitalizacion) =>
    axios.get(`${API_URL}/hospitalizaciones/${id_hospitalizacion}/ver`),

    //Diagnósticos
    diagnosticos: () =>
    axios.get(`${API_URL}/diagnosticos`),

    datos_formulario_diagnostico: () =>
    axios.get(`${API_URL}/diagnosticos/crear`),

    diagnostico_editar: (codigo) =>
    axios.get(`${API_URL}/diagnosticos/${codigo}/editar`),

    diagnostico_ver: (codigo) =>
    axios.get(`${API_URL}/diagnosticos/${codigo}/ver`),

    diagnostico_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/diagnosticos/${param_busqueda}/buscar`),

    //Tratamientos
    tratamientosmedicos: () =>
    axios.get(`${API_URL}/tratamientosmedicos`),

    datos_formulario_tratamiento: () =>
    axios.get(`${API_URL}/tratamientosmedicos/crear`),

    tratamiento_editar: (codigo) =>
    axios.get(`${API_URL}/tratamientosmedicos/${codigo}/editar`),

    tratamiento_ver: (codigo) =>
    axios.get(`${API_URL}/tratamientosmedicos/${codigo}/ver`),

    tratamiento_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/tratamientosmedicos/${param_busqueda}/buscar`),
    //Medicamentos
    medicamentos: () =>
    axios.get(`${API_URL}/medicamentos`),

    datos_formulario_medicamento: () =>
    axios.get(`${API_URL}/medicamentos/crear`),

    medicamento_editar: (codigo) =>
    axios.get(`${API_URL}/medicamentos/${codigo}/editar`),

    medicamento_ver: (codigo) =>
    axios.get(`${API_URL}/medicamentos/${codigo}/ver`),

    medicamento_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/medicamentos/${param_busqueda}/buscar`),

    API_URL,

}