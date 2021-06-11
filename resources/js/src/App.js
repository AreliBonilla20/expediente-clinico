import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import ReactDOM from 'react-dom';

import Home from '../src/LayoutComponents/Home';

import ConsultarExpediente from './ExpedientesComponents/ConsultarExpediente';
import AgregarExpediente from './ExpedientesComponents/AgregarExpediente';
import EditarExpediente from './ExpedientesComponents/EditarExpediente';
import BuscarExpediente from './ExpedientesComponents/BuscarExpediente';
import VerExpediente from './ExpedientesComponents/VerExpediente';

import AgregarAntecedente from './AntecedentesComponents/AgregarAntecedente';
import EditarAntecedente from './AntecedentesComponents/EditarAntecedente';

import AgregarHospitalizacion from './HospitalizacionesComponents/AgregarHospitalizacion';
import EditarHospitalizacion from './HospitalizacionesComponents/EditarHospitalizacion';
import VerHospitalizacion from './/HospitalizacionesComponents/VerHospitalizacion';

import ConsultarDiagnostico from './DiagnosticosComponents/ConsultarDiagnostico';
import AgregarDiagnostico from './DiagnosticosComponents/AgregarDiagnostico';
import EditarDiagnostico from './DiagnosticosComponents/EditarDiagnostico';
import BuscarDiagnostico from './DiagnosticosComponents/BuscarDiagnostico';
import VerDiagnostico from './DiagnosticosComponents/VerDiagnostico';
import AsignarDiagnosticos from './DiagnosticosComponents/AsignarDiagnosticos';

import ConsultarCentroMedico from './CentrosMedicosComponents/ConsultarCentroMedico';
import AgregarCentroMedico from './CentrosMedicosComponents/AgregarCentroMedico';
import EditarCentroMedico from './CentrosMedicosComponents/EditarCentroMedico';
import BuscarCentroMedico from './CentrosMedicosComponents/BuscarCentroMedico';
import VerCentroMedico from './CentrosMedicosComponents/VerCentroMedico';

import ConsultarTratamiento from './TratamientosComponents/ConsultarTratamiento';
import AgregarTratamiento from './TratamientosComponents/AgregarTratamiento';
import EditarTratamiento from './TratamientosComponents/EditarTratamiento';
import BuscarTratamiento from './TratamientosComponents/BuscarTratamiento';
import VerTratamiento from './TratamientosComponents/VerTratamiento';
import AsignarTratamientos from './TratamientosComponents/AsignarTratamientos';

import ConsultarMedicamento from './MedicamentosComponents/ConsultarMedicamento';
import AgregarMedicamento from './MedicamentosComponents/AgregarMedicamento';
import EditarMedicamento from './MedicamentosComponents/EditarMedicamento';
import BuscarMedicamento from './MedicamentosComponents/BuscarMedicamento';
import VerMedicamento from './MedicamentosComponents/VerMedicamento';
import AsignarRecetaMedica from './MedicamentosComponents/AsignarRecetaMedica';

import ConsultarCirugia from './CirugiasComponents/ConsultarCirugias';
import AgregarCirugia from './CirugiasComponents/AgregarCiugia';
import EditarCirugia from './CirugiasComponents/EditarCirugia';
import VerCirugia from './CirugiasComponents/VerCirugias';

import ConsultarExamen from './ExamenesComponents/ConsultarExamen';
import AgregarExamen from './ExamenesComponents/AgregarExamen';
import EditarExamen from './ExamenesComponents/EditarExamen';
import BuscarExamen from './ExamenesComponents/BuscarExamen';
import VerExamen from './ExamenesComponents/VerExamen';
import AgregarParametroExamen from './ExamenesComponents/AgregarParametrosExamen';
import AsignarExamenes from './ExamenesComponents/AsignarExamen';
import AgregarResultadoExamen from './ExamenesComponents/AgregarResultadoExamen';
import VerResultadoExamen from './ExamenesComponents/VerResultadoExamen';

import ConsultarEmpleado from './EmpleadosComponents/ConsultarEmpleado';
import AgregarEmpleado from './EmpleadosComponents/AgregarEmpleado';
import EditarEmpleado from './EmpleadosComponents/EditarEmpleado';
import BuscarEmpleado from './EmpleadosComponents/BuscarEmpleado';
import VerEmpleado from './EmpleadosComponents/VerEmpleado';

import ConsultarExamenHemograma from './ExamenesHemogramasComponents/ConsultarExamenHemograma';
import AgregarExamenHemograma from './ExamenesHemogramasComponents/AgregarExamenHemograma';
import AsignarHorarios from './DoctoresComponents/AsignarHorarios';

import ConsultarCita from './CitasComponents/ConsultarCita';
import AgregarCita from './CitasComponents/AgregarCita';
import EditarCita from './CitasComponents/EditarCita';
import VerCita from './CitasComponents/VerCita';

import AgregarConsulta from './ConsultasComponents/AgregarConsulta';
import VerDetallesConsulta from './ConsultasComponents/VerDetallesConsulta';

import AsignarUsuario from './UsuariosComponents/AsignarUsuario';

import Prueba from './Prueba/PruebaMostrar';


import NotFound from './LayoutComponents/NotFound';



const App = () => {

    
    return(
        <Router className="container">
            <Switch>

                <Route exact path="/" component={Home}/>

               
                <Route exact path="/expedientes" component={ConsultarExpediente} />
                
                <Route exact path="/expedientes/crear" component={AgregarExpediente} />
                <Route exact path="/expedientes/:codigo/editar" component={EditarExpediente} />
                <Route exact path="/expedientes/:codigo/ver" component={VerExpediente} />
                <Route exact path="/expedientes/:param_busqueda/buscar" component={BuscarExpediente} />
                
                <Route exact path="/expedientes/:codigo/antecedentes/crear" component={AgregarAntecedente} />
                <Route exact path="/expedientes/:codigo/antecedentes/editar" component={EditarAntecedente} />
                <Route exact path="/expedientes/:codigo/hospitalizaciones/crear" component={AgregarHospitalizacion} />
                <Route exact path="/expedientes/:codigo/hospitalizaciones/:id_hospitalizacion/editar" component={EditarHospitalizacion} />
                <Route exact path="/expedientes/:codigo/hospitalizaciones/:id_hospitalizacion/ver" component={VerHospitalizacion} />
                <Route exact path="/expedientes/:codigo/hospitalizaciones/:id_hospitalizacion/asignar_diagnosticos" component={AsignarDiagnosticos} />
                <Route exact path="/expedientes/:codigo/hospitalizaciones/:id_hospitalizacion/asignar_receta_medica" component={AsignarRecetaMedica} />
                <Route exact path="/expedientes/:codigo/hospitalizaciones/:id_hospitalizacion/asignar_tratamientos" component={AsignarTratamientos} />
                <Route exact path="/expedientes/:codigo/hospitalizaciones/:id_hospitalizacion/asignar_examenes" component={AsignarExamenes} />
                <Route exact path="/expedientes/:codigo/hospitalizaciones/:id_hospitalizacion/examenes/:id_atencion_medica/agregar_resultado" component={AgregarResultadoExamen} />
                <Route exact path="/expedientes/:codigo/hospitalizaciones/:id_hospitalizacion/examenes/:id_atencion_medica/ver_resultado" component={VerResultadoExamen} />
                
                <Route exact path="/expedientes/:codigo/consultas/:id_consulta/ver" component={VerDetallesConsulta} />
                <Route exact path="/expedientes/:codigo/consultas/:id_consulta/asignar_diagnosticos" component={AsignarDiagnosticos} />
                <Route exact path="/expedientes/:codigo/consultas/:id_consulta/asignar_receta_medica" component={AsignarRecetaMedica} />
                <Route exact path="/expedientes/:codigo/consultas/:id_consulta/asignar_tratamientos" component={AsignarTratamientos} />
                <Route exact path="/expedientes/:codigo/consultas/:id_consulta/asignar_examenes" component={AsignarExamenes} />
                <Route exact path="/expedientes/:codigo/consultas/:id_consulta/examenes/:id_atencion_medica/agregar_resultado" component={AgregarResultadoExamen} />
                <Route exact path="/expedientes/:codigo/consultas/:id_consulta/examenes/:id_atencion_medica/ver_resultado" component={VerResultadoExamen} />

                <Route exact path="/diagnosticos" component={ConsultarDiagnostico} />
                <Route exact path="/diagnosticos/crear" component={AgregarDiagnostico} />
                <Route exact path="/diagnosticos/:codigo/editar" component={EditarDiagnostico} />
                <Route exact path="/diagnosticos/:codigo/ver" component={VerDiagnostico} />
                <Route exact path="/diagnosticos/:param_busqueda/buscar" component={BuscarDiagnostico} />
                
                <Route exact path="/examenes" component={ConsultarExamen} />
                <Route exact path="/examenes/crear" component={AgregarExamen} />
                <Route exact path="/examenes/:codigo/editar" component={EditarExamen} />
                <Route exact path="/examenes/:codigo/ver" component={VerExamen} />
                <Route exact path="/examenes/:param_busqueda/buscar" component={BuscarExamen} />
                <Route exact path="/examenes/:codigo/agregar_parametros" component={AgregarParametroExamen} />

                <Route exact path="/centros_medicos" component={ConsultarCentroMedico} />
                <Route exact path="/centros_medicos/crear" component={AgregarCentroMedico} />
                <Route exact path="/centros_medicos/:id_centro_medico/editar" component={EditarCentroMedico} />
                <Route exact path="/centros_medicos/:id_centro_medico/ver" component={VerCentroMedico} />
                <Route exact path="/centros_medicos/:param_busqueda/buscar" component={BuscarCentroMedico} />
                <Route exact path="/centros_medicos/:id_centro_medico/empleados/:id_empleado/ver" component={VerEmpleado} />
                <Route exact path="/centros_medicos/:id_centro_medico/empleados/:id_empleado/editar" component={EditarEmpleado} />
                <Route exact path="/centros_medicos/:id_centro_medico/doctores/horario" component={AsignarHorarios} />
                           
                <Route exact path="/tratamientos_medicos" component={ConsultarTratamiento} />
                <Route exact path="/tratamientos_medicos/crear" component={AgregarTratamiento} />
                <Route exact path="/tratamientos_medicos/:codigo/editar" component={EditarTratamiento} />
                <Route exact path="/tratamientos_medicos/:codigo/ver" component={VerTratamiento} />
                <Route exact path="/tratamientos_medicos/:param_busqueda/buscar" component={BuscarTratamiento} />

                <Route exact path="/medicamentos" component={ConsultarMedicamento} />
                <Route exact path="/medicamentos/crear" component={AgregarMedicamento} />
                <Route exact path="/medicamentos/:codigo/editar" component={EditarMedicamento} />
                <Route exact path="/medicamentos/:codigo/ver" component={VerMedicamento} />
                <Route exact path="/medicamentos/:param_busqueda/buscar" component={BuscarMedicamento} />

                <Route exact path="/cirugias" component={ConsultarCirugia} />
                <Route exact path="/cirugias/crear" component={AgregarCirugia} />
                <Route exact path="/cirugias/:codigo/editar" component={EditarCirugia} />
                <Route exact path="/cirugias/:codigo/ver" component={VerCirugia} />
               
                <Route exact path="/empleados" component={ConsultarEmpleado} />
                <Route exact path="/empleados/crear" component={AgregarEmpleado} />
                <Route exact path="/empleados/:id_empleado/editar" component={EditarEmpleado} />
                <Route exact path="/empleados/:id_empleado/ver" component={VerEmpleado} />
                <Route exact path="/empleados/:param_busqueda/buscar" component={BuscarEmpleado} />
                
                <Route exact path="/examenes_hemogramas" component={ConsultarExamenHemograma} />
                <Route exact path="/examenes_hemogramas/crear" component={AgregarExamenHemograma} />

                <Route exact path="/citas" component={ConsultarCita} />
                <Route exact path="/expedientes/:codigo/agregar_cita" component={AgregarCita} />
                <Route exact path="/citas/:id_cita/editar" component={EditarCita} />
                <Route exact path="/citas/:id_cita/ver" component={VerCita} />

                <Route exact path="/usuarios/:id_empleado/asignar_usuario" component={AsignarUsuario} />

                <Route exact path="/consultas/:codigo_paciente/:id_cita/crear" component={AgregarConsulta} />

                <Route exact path="/prueba" component={Prueba} />
               
                
               

      

                <Route component={NotFound} />
            </Switch>
        </Router>

    );
};

ReactDOM.render(<App />, document.getElementById('app'));
