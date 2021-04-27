import React from 'react';
import {
    BrowserRouter as Router,
    Switch, 
    Route, 
    Link
} from 'react-router-dom';
import ReactDOM from 'react-dom'; 

import Home from '../src/LayoutComponents/Home';
import ConsultarExpediente from '../src/ExpedientesComponents/ConsultarExpediente';
import AgregarExpediente from '../src/ExpedientesComponents/AgregarExpediente';
import EditarExpediente from '../src/ExpedientesComponents/EditarExpediente';

const App = () => {
    return(
        <Router className="container">
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/expedientes" component={ConsultarExpediente} exact/>
                <Route path="/expedientes/crear" component={AgregarExpediente} exact/>
   
           
            </Switch>
        </Router>

    );
};

ReactDOM.render(<App />, document.getElementById('app'));