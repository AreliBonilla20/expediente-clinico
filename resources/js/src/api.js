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

    //Historial diagnosticos
    historial_diagnosticos: (id_hospitalizacion) =>
    axios.get(`${API_URL}/historial_diagnosticos/${id_hospitalizacion}`),

     //Historial recetas médicas
    recetas_medicas: (id_hospitalizacion) =>
    axios.get(`${API_URL}/recetas_medicas/${id_hospitalizacion}`),

     //Historial tratamientos
    historial_tratamientos: (id_hospitalizacion) =>
     axios.get(`${API_URL}/historial_tratamientos/${id_hospitalizacion}`),

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
 
     centro_medico_editar: (id_centro_medico) =>
     axios.get(`${API_URL}/centros_medicos/${id_centro_medico}/editar`),
 
     centro_medico_buscar: (param_busqueda) =>
     axios.get(`${API_URL}/centros_medicos/${param_busqueda}/buscar`),
 
     centro_medico_ver: (id_centro_medico) =>
     axios.get(`${API_URL}/centros_medicos/${id_centro_medico}/ver`),

     centro_medico_empleados: (id_centro_medico) =>
     axios.get(`${API_URL}/centro_medico_empleados/${id_centro_medico}`),

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


    //Empleados
    empleados: () =>
    axios.get(`${API_URL}/empleados`),

    datos_formulario_empleado: () =>
    axios.get(`${API_URL}/empleados/crear`),

    empleado_editar: (id_empleado) =>
    axios.get(`${API_URL}/empleados/${id_empleado}/editar`),

    empleado_ver: (id_empleado) =>
    axios.get(`${API_URL}/empleados/${id_empleado}/ver`),

    empleado_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/empleados/${param_busqueda}/buscar`),    

    //Consultorios - centro medico
     consultorios : (id_centro_medico) =>
     axios.get(`${API_URL}/consultorios/${id_centro_medico}`),

    //Hemogramas
    examenes_hemogramas: () =>
    axios.get(`${API_URL}/examenes_hemogramas`),

    datos_formulario_examen_hemograma: () =>
    axios.get(`${API_URL}/examenes_hemogramas/crear`),
    
    //Quirófanos
    quirofanos: (id_centro_medico) =>
    axios.get(`${API_URL}/quirofanos/${id_centro_medico}`),

    //Médicos
    especialidades: () =>
    axios.get(`${API_URL}/doctores/crear`),

    centro_medico_doctores: (id_centro_medico) =>
    axios.get(`${API_URL}/centro_medico_doctores/${id_centro_medico}`),

    doctor_horario: () =>
    axios.get(`${API_URL}/doctores/doctor_horario`),

    //Horarios
    horarios: (id_centro_medico) =>
    axios.get(`${API_URL}/horarios/${id_centro_medico}`),

    horarios_doctores: (id_centro_medico) =>
    axios.get(`${API_URL}/horarios/${id_centro_medico}/doctores`),

    //Citas
    citas: () => 
    axios.get(`${API_URL}/citas`),

    cita_editar: (id_cita) =>
    axios.get(`${API_URL}/citas/${id_cita}/editar`),

    cita_ver: (id_cita) =>
    axios.get(`${API_URL}/citas/${id_cita}/ver`),

    datos_formulario_cita: () =>
    axios.get(`${API_URL}/citas/crear`),

    API_URL,

}
