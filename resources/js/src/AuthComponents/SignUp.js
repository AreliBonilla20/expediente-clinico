import React, {Component} from 'react';

export default class SignUp extends Component{
    constructor(props){
        super(props)
        this.state={name:'', email:'', password:'', password_confirmation:''};
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
        name:this.state.name, email:this.state.email, password:this.state.password, password_confirmation:this.state.password_confirmation
    }
    let response=fetch(`./api/register`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

<div id="auth">

    <div className="row h-100">
        <div className="col-lg-5 col-12">
            <div id="auth-left">

                <h1 className="auth-title">Registrarse</h1>
                <p className="auth-subtitle mb-5">Ingresa tus datos para registrarte</p>


                <div className="form-group position-relative has-icon-left mb-4">
                        <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} className="form-control form-control-xl" placeholder="Nombre de usuario"/>
                        <div className="form-control-icon">
                            <i className="bi bi-person"></i>
                        </div>
                    </div>
                    <div className="form-group position-relative has-icon-left mb-4">
                        <input type="text" value={this.state.email} name="email" onChange={this.handleInputChange} className="form-control form-control-xl" placeholder="Correo electrónico"/>
                        <div className="form-control-icon">
                            <i className="bi bi-envelope"></i>
                        </div>
                    </div>

                    <div className="form-group position-relative has-icon-left mb-4">
                        <input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} className="form-control form-control-xl" placeholder="Contraseña"/>
                        <div className="form-control-icon">
                            <i className="bi bi-shield-lock"></i>
                        </div>
                    </div>
                    <div className="form-group position-relative has-icon-left mb-4">
                        <input type="password" value={this.state.password_confirmation} name="password_confirmation" onChange={this.handleInputChange} className="form-control form-control-xl" placeholder="Confirmar contraseña"/>
                        <div className="form-control-icon">
                            <i className="bi bi-shield-lock"></i>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-block btn-lg shadow-lg mt-5" onClick={this.onSignIn}>Regístrate</button>

                <div className="text-center mt-5 text-lg fs-4">
                    <p className="text-gray-600">¿Ya tienes una cuenta? <a href="auth-login.html" className="font-bold">Iniciar sesión</a>.</p>
                </div>
            </div>
        </div>
        <div className="col-lg-7 d-none d-lg-block">
            <div id="auth-right">

            </div>
        </div>
    </div>

</div>)

}
}