import React from 'react';
import {
    BrowserRouter as Router,
    Switch, 
    Route
} from 'react-router-dom';
import ReactDOM from 'react-dom'; 

import Home from '../src/LayoutComponents/Home';
import ConsultarExpediente from '../src/ExpedientesComponents/ConsultarExpediente';
import AgregarExpediente from '../src/ExpedientesComponents/AgregarExpediente';
import EditarExpediente from '../src/ExpedientesComponents/EditarExpediente';
import BuscarExpediente from '../src/ExpedientesComponents/BuscarExpediente';
import VerExpediente from '../src/ExpedientesComponents/VerExpediente';
import NotFound from '../src/LayoutComponents/NotFound';

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
                <Route component={NotFound} />
            </Switch>
        </Router>

    );
};

ReactDOM.render(<App />, document.getElementById('app'));