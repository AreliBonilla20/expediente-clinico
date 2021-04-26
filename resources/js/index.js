import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ConsultaExpedientes from './pages/ConsultaExpedientes';

import EditarExpediente from './pages/EditarExpediente';

function Index(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ConsultaExpedientes} />
        
                <Route path="/:id/editar" exact component={EditarExpediente} />
            </Switch>
        </BrowserRouter>
    );
}

export default Index;