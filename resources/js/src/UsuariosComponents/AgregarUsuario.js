
import React, {Component} from 'react';

import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

export default class AgregarUsuario extends Component{

    constructor(props){
        super(props)
        this.state={name:'', email:'', id_rol:'', password:'', password_confirmation:''};
        this.handleInputChange=this.handleInputChange.bind(this);
        this.onSignIn=this.onSignIn.bind(this);

    }

    handleInputChange(event){
        const target=event.target;
        const value=target.value;
        const name=target.name;
        this.setState({
            [name]:value
        })
    }

    onSignIn(event){
        event.preventDefault();
        const body={
            name:this.state.name, email:this.state.email, id_rol:this.state.id_rol, password:this.state.password, password_confirmation:this.state.password_confirmation
        }
        let response=fetch(`./api/usuarios/guardar`,{
            method: "POST",
            headers: { "Content-Type": "application/json", 'Authorization':"Bearer " + window.localStorage.getItem('token') },
            body: JSON.stringify(body)
        }).then((response)=>{
                response.json().then(function(json) {
                    this.saveToken(json.token)
                  })
            window.location="/"; 
        }).catch((error)=>{
            console.log(error)
        });
    }

    saveToken(token){
        if(window.localStorage.getItem('token')!=null){
            window.localStorage.setItem('token', token);
        }
    }

render(){
    return(
        <div id="app">
        <Menu />
        <div id="main" className='layout-navbar'>
        <Header />
            <div id="main-content"></div>
                <div className="col-md-6 col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Usuarios</h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                
                                    <div className="form-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group has-icon-left">
                                                    <label for="first-name-icon">Nombre</label>
                                                    <div className="position-relative">
                                                        <input type="text" value={this.state.name} name='name' onChange={this.handleInputChange} className="form-control" placeholder="Nombre" id="first-name-icon"/>
                                                        <div className="form-control-icon">
                                                            <i className="bi bi-person"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">

                                                <div className="form-group has-icon-left">
                                                    <label for="email-id-icon">Correo electrónico</label>
                                                    <div className="position-relative">
                                                        <input type="text" value={this.state.email} name='email' onChange={this.handleInputChange} className="form-control" placeholder="Correo electrónico" id="email-id-icon"/>
                                                        <div className="form-control-icon">
                                                            <i className="bi bi-envelope"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                                
                                            <div className="col-12">
                                                <div className="form-group has-icon-left">
                                                    <label for="password-id-icon">Contraseña</label>
                                                    <div className="position-relative">
                                                        <input type="password" value={this.state.password} name='password' onChange={this.handleInputChange} className="form-control" placeholder="Contraseña" id="password-id-icon"/>
                                                        <div className="form-control-icon">
                                                            <i className="bi bi-lock"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12"></div>
                                            <div className="form-group position-relative has-icon-left mb-4">
                                                <input type="password" value={this.state.password_confirmation} name="password_confirmation" onChange={this.handleInputChange} className="form-control form-control-xl" placeholder="Confirmar contraseña"/>
                                                <div className="form-control-icon">
                                                    <i className="bi bi-shield-lock"></i>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-check">
                                                    <div className="checkbox mt-2">
                                                        <input type="checkbox" id="remember-me-v" className="form-check-input" checked=""/>
                                                        <label for="remember-me-v">Remember Me</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 d-flex justify-content-end">
                                                <button type="submit" className="btn btn-primary me-1 mb-1">Submit</button>
                                                <button type="reset" className="btn btn-light-secondary me-1 mb-1">Reset</button>
                                            </div>
                                        </div>
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                    </div>
        <Footer />
    </div>
    )
}
}