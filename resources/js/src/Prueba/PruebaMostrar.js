import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import API from '../api';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import Menu from '../LayoutComponents/Menu';
import Header from '../LayoutComponents/Header';
import Footer from '../LayoutComponents/Footer';

class RenderizadoPrueba extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        values: [],
        nroRenderElemento: 10,
        inputs: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
     
 

  
  useEffect(() => {
    API.examen_parametros(id_atencion_medica).then(res => {
        const result = res.data;
        set_examen_parametros(result);
   })

    },[]);
    
}
  
    handleChange(e, index) {
      const values = this.state.values.slice();
      values[index] = e.target.value;
      this.setState({values});
      console.log(this.state);
    }
  
    handleSubmit(e) {
      console.log("Este es el nombre introducido:", this.state.value);
      e.preventDefault();
    }
  
    componentDidMount() {
      this.setState({
        inputs: [...Array(this.state.nroRenderElemento)].map((input, i) => (
          <label key={input}>
            Introduzca su Nombre:
            <input type="text" name={i} onChange={e => this.handleChange(e, i)} />
          </label>
        ))
      });
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            {this.state.inputs}
            <input type="submit" value="Submit" />
          </form>
          {JSON.stringify(examen_parametros)}
        </div>
      );
    }
  }

  export default RenderizadoPrueba;