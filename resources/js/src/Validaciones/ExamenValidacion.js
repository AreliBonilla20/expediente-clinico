import * as yup from "yup";

const schema = yup.object().shape({

    codigo_examen: yup
    .string()
    .required("El campo código de examen es obligatorio.")
    .max(25, "El máximo de caracteres es 25"),

    nombre_examen: yup
    .string()
    .required("El campo nombre examen es obligatorio.")
    .max(150, "El máximo de caracteres es 150"),

    id_tipo_examen: yup
    .string()
    .required("El campo tipo examen es obligatorio."),

    indicaciones_examen: yup
    .string()
    .max(500, "El máximo de caracteres es 500"),


  });


export default schema;