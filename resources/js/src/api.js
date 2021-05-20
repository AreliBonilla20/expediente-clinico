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

    //Chequeos - Hospitalizacion
    chequeos_hospitalizacion: (id_hospitalizacion) =>
    axios.get(`${API_URL}/chequeos_hospitalizaciones/${id_hospitalizacion}`),

    //Signos vitales
    signos_vitales: (id_hospitalizacion) =>
    axios.get(`${API_URL}/signos_vitales/${id_hospitalizacion}`),

    signos_vitales_graficos: (id_hospitalizacion) =>
    axios.get(`${API_URL}/signos_vitales/${id_hospitalizacion}/graficos`),

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

    //Centros Médicos
     centros_medicos: () =>
     axios.get(`${API_URL}/centros_medicos`),
 
     datos_formulario_centro_medico: () =>
     axios.get(`${API_URL}/centros_medicos/crear`),
 
     centro_medico_editar: (codigo) =>
     axios.get(`${API_URL}/centros_medicos/${codigo}/editar`),
 
     centro_medico_buscar: (param_busqueda) =>
     axios.get(`${API_URL}/centros_medicos/${param_busqueda}/buscar`),
 
     centro_medico_ver: (codigo) =>
     axios.get(`${API_URL}/centros_medicos/${codigo}/ver`),

    //Tratamientos
    tratamientos_medicos: () =>
    axios.get(`${API_URL}/tratamientos_medicos`),

    datos_formulario_tratamiento: () =>
    axios.get(`${API_URL}/tratamientos_medicos/crear`),

    tratamiento_editar: (codigo) =>
    axios.get(`${API_URL}/tratamientos_medicos/${codigo}/editar`),

    tratamiento_ver: (codigo) =>
    axios.get(`${API_URL}/tratamientos_medicos/${codigo}/ver`),

    tratamiento_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/tratamientos_medicos/${param_busqueda}/buscar`),

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
    
    //Exámenes
    examenes: () =>
    axios.get(`${API_URL}/examenes`),

    datos_formulario_examen: () =>
    axios.get(`${API_URL}/examenes/crear`),

    examen_editar: (codigo) =>
    axios.get(`${API_URL}/examenes/${codigo}/editar`),

    examen_ver: (codigo) =>
    axios.get(`${API_URL}/examenes/${codigo}/ver`),

    examen_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/examenes/${param_busqueda}/buscar`),

    API_URL,

}
