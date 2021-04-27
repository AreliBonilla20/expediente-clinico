const axios = window.axios;

const BASE_API_URL = 'http://localhost:8000/api';

export default {
    getAllPacientes: () =>
    axios.get(`${BASE_API_URL}/expedientes`),

    getDataAgregarPaciente: () =>
    axios.get(`${BASE_API_URL}/expedientes/crear`),
}