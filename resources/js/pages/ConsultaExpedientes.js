import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from '../components/Header';
import Menu from '../components/Menu.js';
import Footer from '../components/Footer';



import Axios from 'axios';

class ConsultaExpedientes extends Component{

   constructor(props){
       super(props);
       this.state = {
           pacientes : []
       }
   }

   componentDidMount(){
       Axios.get('api/pacientes')
            .then(response => {
                this.setState({
                    pacientes : response.data
                })
            })
            .catch(err => console.log(err));
   }
   render(){
       return (
        

        <div id="app">
        <Menu />
        <div id="main" className='layout-navbar'>
        <Header />
            <div id="main-content">

                <div className="page-heading">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <h3>Bienvenido!</h3>
                                <p className="text-subtitle text-muted">Navbar will appear in top of the page.</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Layout Vertical Navbar
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="page-heading">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <h3>DataTable</h3>
                                <p className="text-subtitle text-muted">For user to check they list</p>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">DataTable</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <section className="section">
                        <div className="card">
                            <div className="card-header">
                                Simple Datatable
                            </div>
                            <div className="card-body">
                                <table className="table table-striped" id="table1">
                                    <thead>
                                        <tr>
                                            <th>Nombres</th>
                                            <th>Apellidos</th>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.pacientes !== null
                                            ? this.state.pacientes.map(paciente => (
                                                <tr key={paciente.id}>
                                                        <td className="text-bold-500">{paciente.nombres_paciente}</td>
                                                        <td className="text-bold-500">{paciente.apellidos_paciente}</td>
                                                </tr>
                                        ))
                                        :
                                        null
                                    }
                                                        

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
            </div>
            </div>   
            </div>
        </div>
        
    </div>


  
    );  
    }
}

export default ConsultaExpedientes;

if (document.getElementById('layout')) {
    ReactDOM.render(<ConsultaExpedientes />, document.getElementById('layout'));
}