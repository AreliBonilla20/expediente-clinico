import * as yup from "yup";

const schema = yup.object().shape({

    codigo_diagnostico: yup
    .string()
    .required("El campo código del diagnóstico es obligatorio")
    .max(25, "El máximo de caracteres es 25"),

    nombre_diagnostico: yup
    .string()
    .required("El campo nombre del diagnóstico es obligatorio")
    .max(150, "El máximo de caracteres es 150"),

    id_tipo_diagnostico: yup
    .string()
    .required("El campo tipo de diagnóstico es obligatorio"),

    descripcion_diagnostico: yup
    .string()
    .max(500, "El máximo de caracteres es 500"),
    
  });


export default schema;