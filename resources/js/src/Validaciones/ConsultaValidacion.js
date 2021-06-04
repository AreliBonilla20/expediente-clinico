import * as yup from "yup";

const schema = yup.object().shape({

    observaciones: yup
    .string()
    .required("El campo observaciones es obligatorio")
    .max(1000, "El máximo de caracteres es 1000"),

    sintomatologia: yup
    .string()
    .required("El campo sintomatología es obligatorio")
    .max(1000, "El máximo de caracteres es 1000"),
    
  });


export default schema;