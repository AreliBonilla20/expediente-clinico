import * as yup from "yup";

const schema = yup.object().shape({

    codigo_diagnostico: yup
    .string()
    .required("El campo diagnóstico es obligatorio"),
   
    observaciones_diagnostico: yup
    .string()
    .required("El campo observaciones del diagnóstico es obligatorio")
    .max(250, "El máximo de caracteres es 250"),

    indicaciones_diagnostico: yup
    .string()
    .required("El campo indicaciones del diagnóstico es obligatorio")
    .max(250, "El máximo de caracteres es 250"),
  
    
  });


export default schema;