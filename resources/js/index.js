import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './src/LayoutComponents/Home';
import ConsultarExpediente from './src/ExpedientesComponents/ConsultarExpediente';
import AgregarExpediente from './src/ExpedientesComponents/AgregarExpediente';
import EditarExpediente from './src/ExpedientesComponents/EditarExpediente';

function Index(){
    return(
        <BrowserRouter>
            <Switch>
            <Route path="/" exact component={Home} />
                <Route path="/pacientes" exact component={ConsultarExpediente} />
                <Route path="/pacientes/crear" exact component={AgregarExpediente} />
                <Route path="/:id/editar" exact component={EditarExpediente} />
            </Switch>
        </BrowserRouter>
    );
}

export default Index;

if (document.getElementById('layout')) {
    ReactDOM.render(<Index />, document.getElementById('layout'));
}