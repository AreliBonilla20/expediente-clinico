const axios = window.axios;

const API_URL = 'http://localhost:8000/api';

export default {

    //usuarios
    usuarios: () =>
    axios.get(`${API_URL}/usuarios`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    datos_formulario_usuarios: () =>
    axios.get(`${API_URL}/usuarios/${id_empleado}/crear`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    //Expedientes
    pacientes: () =>
    axios.get(`${API_URL}/expedientes`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    datos_formulario_paciente: () =>
    axios.get(`${API_URL}/expedientes/crear`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    paciente_editar: (codigo) =>
    axios.get(`${API_URL}/expedientes/${codigo}/editar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    paciente_ver: (codigo) =>
    axios.get(`${API_URL}/expedientes/${codigo}/ver`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    paciente_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/expedientes/${param_busqueda}/buscar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    //Antecedentes
    antecedente_editar: (codigo) =>
    axios.get(`${API_URL}/antecedentes/${codigo}/editar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    antecedente_ver: (codigo) =>
    axios.get(`${API_URL}/antecedentes/${codigo}/ver`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    //Hospitalizacion
    hospitalizaciones: () =>
    axios.get(`${API_URL}/hospitalizaciones`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    hospitalizacion_editar: (id_hospitalizacion) =>
    axios.get(`${API_URL}/hospitalizaciones/${id_hospitalizacion}/editar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    hospitalizacion_ver: (id_hospitalizacion) =>
    axios.get(`${API_URL}/hospitalizaciones/${id_hospitalizacion}/ver`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    //Chequeos - Hospitalizacion
    chequeos_hospitalizacion: (id_hospitalizacion) =>
    axios.get(`${API_URL}/chequeos_hospitalizaciones/${id_hospitalizacion}`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

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
    axios.get(`${API_URL}/diagnosticos`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    datos_formulario_diagnostico: () =>
    axios.get(`${API_URL}/diagnosticos/crear`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    diagnostico_editar: (codigo) =>
    axios.get(`${API_URL}/diagnosticos/${codigo}/editar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    diagnostico_ver: (codigo) =>
    axios.get(`${API_URL}/diagnosticos/${codigo}/ver`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    diagnostico_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/diagnosticos/${param_busqueda}/buscar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    //Centros Médicos
     centros_medicos: () =>
     axios.get(`${API_URL}/centros_medicos`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),
 
     datos_formulario_centro_medico: () =>
     axios.get(`${API_URL}/centros_medicos/crear`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),
 
     centro_medico_editar: (id_centro_medico) =>
     axios.get(`${API_URL}/centros_medicos/${id_centro_medico}/editar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),
 
     centro_medico_buscar: (param_busqueda) =>
     axios.get(`${API_URL}/centros_medicos/${param_busqueda}/buscar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),
 
     centro_medico_ver: (id_centro_medico) =>
     axios.get(`${API_URL}/centros_medicos/${id_centro_medico}/ver`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

     centro_medico_empleados: (id_centro_medico) =>
     axios.get(`${API_URL}/centro_medico_empleados/${id_centro_medico}`),

    //Tratamientos
    tratamientos_medicos: () =>
    axios.get(`${API_URL}/tratamientos_medicos`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    datos_formulario_tratamiento: () =>
    axios.get(`${API_URL}/tratamientos_medicos/crear`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    tratamiento_editar: (codigo) =>
    axios.get(`${API_URL}/tratamientos_medicos/${codigo}/editar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    tratamiento_ver: (codigo) =>
    axios.get(`${API_URL}/tratamientos_medicos/${codigo}/ver`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    tratamiento_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/tratamientos_medicos/${param_busqueda}/buscar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    //Medicamentos
    medicamentos: () =>
    axios.get(`${API_URL}/medicamentos`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    datos_formulario_medicamento: () =>
    axios.get(`${API_URL}/medicamentos/crear`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    medicamento_editar: (codigo) =>
    axios.get(`${API_URL}/medicamentos/${codigo}/editar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    medicamento_ver: (codigo) =>
    axios.get(`${API_URL}/medicamentos/${codigo}/ver`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    medicamento_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/medicamentos/${param_busqueda}/buscar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),
    
    //Exámenes
    examenes: () =>
    axios.get(`${API_URL}/examenes`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    datos_formulario_examen: () =>
    axios.get(`${API_URL}/examenes/crear`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    examen_editar: (codigo) =>
    axios.get(`${API_URL}/examenes/${codigo}/editar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    examen_ver: (codigo) =>
    axios.get(`${API_URL}/examenes/${codigo}/ver`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    examen_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/examenes/${param_busqueda}/buscar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),


    //Empleados
    empleados: () =>
    axios.get(`${API_URL}/empleados`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    datos_formulario_empleado: () =>
    axios.get(`${API_URL}/empleados/crear`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    empleado_editar: (id_empleado) =>
    axios.get(`${API_URL}/empleados/${id_empleado}/editar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    empleado_ver: (id_empleado) =>
    axios.get(`${API_URL}/empleados/${id_empleado}/ver`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    empleado_buscar: (param_busqueda) =>
    axios.get(`${API_URL}/empleados/${param_busqueda}/buscar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),    

    //Consultorios - centro medico
     consultorios : (id_centro_medico) =>
     axios.get(`${API_URL}/consultorios/${id_centro_medico}`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    //Hemogramas
    examenes_hemogramas: () =>
    axios.get(`${API_URL}/examenes_hemogramas`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    datos_formulario_examen_hemograma: () =>
    axios.get(`${API_URL}/examenes_hemogramas/crear`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),
    
    //Quirófanos
    quirofanos: (id_centro_medico) =>
    axios.get(`${API_URL}/quirofanos/${id_centro_medico}`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    //Médicos
    especialidades: () =>
    axios.get(`${API_URL}/doctores/crear`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    centro_medico_doctores: (id_centro_medico) =>
    axios.get(`${API_URL}/centro_medico_doctores/${id_centro_medico}`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    doctor_horario: () =>
    axios.get(`${API_URL}/doctores/doctor_horario`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    //Horarios
    horarios: (id_centro_medico) =>
    axios.get(`${API_URL}/horarios/${id_centro_medico}`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    horarios_doctores: (id_centro_medico) =>
    axios.get(`${API_URL}/horarios/${id_centro_medico}/doctores`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    //Citas
    citas: () => 
    axios.get(`${API_URL}/citas`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    cita_editar: (id_cita) =>
    axios.get(`${API_URL}/citas/${id_cita}/editar`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    cita_ver: (id_cita) =>
    axios.get(`${API_URL}/citas/${id_cita}/ver`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    datos_formulario_cita: () =>
    axios.get(`${API_URL}/citas/crear`, {
        headers:{'Authorization':"Bearer " + window.localStorage.getItem('token')}
    }),

    API_URL,

}
