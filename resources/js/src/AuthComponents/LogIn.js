import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class LogIn extends Component{

    constructor(props){
        super(props)
        this.state={email:'', password:''};
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
            email:this.state.email, password:this.state.password
        }
        let response=fetch(`./api/login`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then((response)=>{
            response.json().then(function(json) {
            window.localStorage.setItem('token', json.token);
            let name = JSON.parse(atob(json.token.split('.')[1])).username[0].name;
            window.localStorage.setItem("name", name);
            })
            window.location="/"; 
        }).catch((error)=>{
            console.log(error)
        });
    }

        render(){
            return(
                <div id="auth">
                <div className="row h-100">
                    <div className="col-lg-5 col-12">
                        <div id="auth-left">
                            <h1 className="auth-title">Iniciar sesión</h1>
                            <p className="auth-subtitle mb-5">Accesa con tus datos</p>

                            <form action="index.html">
                                <div className="form-group position-relative has-icon-left mb-4">
                                    <input type="text" value={this.state.email} name='email' onChange={this.handleInputChange} className="form-control form-control-xl" placeholder="Correo electrónico"/>
                                    <div className="form-control-icon">
                                        <i className="bi bi-person"></i>
                                    </div>
                                </div>
                                <div className="form-group position-relative has-icon-left mb-4">
                                    <input type="password" value={this.state.password} name='password' onChange={this.handleInputChange} className="form-control form-control-xl" placeholder="Contraseña"/>
                                    <div className="form-control-icon">
                                        <i className="bi bi-shield-lock"></i>
                                    </div>
                                </div>
                                <div className="form-check form-check-lg d-flex align-items-end">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault"/>
                                    <label className="form-check-label text-gray-600" for="flexCheckDefault">
                                        Recordar mis credenciales
                                    </label>
                                </div>
                                <button className="btn btn-primary btn-block btn-lg shadow-lg mt-5" onClick={this.onSignIn}>Acceder</button>
                            </form>
                            <div className="text-center mt-5 text-lg fs-4">
                                <p className="text-gray-600">¿No tienes una cuenta? <Link to="/register" className="font-bold">Registrarse</Link>.</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 d-none d-lg-block">
                        <div id="auth-right">

                        </div>
                    </div>
                </div>

            </div>
            )
        }
} 