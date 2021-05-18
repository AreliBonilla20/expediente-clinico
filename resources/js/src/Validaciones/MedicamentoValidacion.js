import * as yup from "yup";

const schema = yup.object().shape({

    codigo_medicamento: yup
    .string()
    .required("El campo código del medicamento es obligatorio")
    .max(10, "El máximo de caracteres es 10"),

    nombre_medicamento: yup
    .string()
    .max(250, "El máximo de caracteres es 250")
    .required("El campo nombre del medicamento es obligatorio"),

    id_tipo_medicamento: yup
    .string()
    .required("El campo tipo de medicamento es obligatorio"),

    descripcion_medicamento: yup
    .string()
    .max(250, "El máximo de caracteres es 250"),

    presentacion_medicamento: yup
    .string()
    .max(150, "El máximo de caracteres es 150")
    .required("El campo código del medicamento es obligatorio"),

    costo_medicamento: yup
    .number()
    .required("El costo del medicamento es obligatorio"),
    
    existencia_medicamento: yup
    .string()
    .max(25, "El máximo de caracteres es 25")
    .required("El campo existencia del medicamento es obligatorio"),
  });


export default schema;