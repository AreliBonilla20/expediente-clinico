import React from 'react';
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

import ConsultarDiagnostico from './DiagnosticosComponents/ConsultarDiagnostico';
import AgregarDiagnostico from './DiagnosticosComponents/AgregarDiagnostico';
import EditarDiagnostico from './DiagnosticosComponents/EditarDiagnostico';
import BuscarDiagnostico from './DiagnosticosComponents/BuscarDiagnostico';
import VerDiagnostico from './DiagnosticosComponents/VerDiagnostico';

import ConsultarMedicamento from './MedicamentosComponents/ConsultarMedicamento';
import AgregarMedicamento from './MedicamentosComponents/AgregarMedicamento';
import EditarMedicamento from './MedicamentosComponents/EditarMedicamento';
import BuscarMedicamento from './MedicamentosComponents/BuscarMedicamento';
import VerMedicamento from './MedicamentosComponents/VerMedicamento';

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

                <Route exact path="/diagnosticos" component={ConsultarDiagnostico} />
                <Route exact path="/diagnosticos/crear" component={AgregarDiagnostico} />
                <Route exact path="/diagnosticos/:codigo/editar" component={EditarDiagnostico} />
                <Route exact path="/diagnosticos/:codigo/ver" component={VerDiagnostico} />
                <Route exact path="/diagnosticos/:param_busqueda/buscar" component={BuscarDiagnostico} />

                <Route exact path="/medicamentos" component={ConsultarMedicamento} />
                <Route exact path="/medicamentos/crear" component={AgregarMedicamento} />
                <Route exact path="/medicamentos/:codigo/editar" component={EditarMedicamento} />
                <Route exact path="/medicamentos/:codigo/ver" component={VerMedicamento} />
                <Route exact path="/medicamentos/:param_busqueda/buscar" component={BuscarMedicamento} />

                <Route component={NotFound} />
            </Switch>
        </Router>

    );
};

ReactDOM.render(<App />, document.getElementById('app'));