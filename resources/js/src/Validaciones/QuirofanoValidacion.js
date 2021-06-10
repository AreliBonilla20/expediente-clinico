import * as yup from "yup";

const schema = yup.object().shape({

    quirofano: yup
    .string()
    .required("El campo nombre del quirofano es obligatorio")
    .max(150, "El máximo de caracteres es 150"),
    
  });


export default schema;