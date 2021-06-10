import * as yup from "yup";
import { string } from "yup/lib/locale";

const schema = yup.object().shape({

    codigo_tratamiento: yup
    .string()
    .required("El campo código de tratamiento es obligatorio")
    .max(25, "El máximo de caracteres es 25"),
    
    nombre_tratamiento: yup
    .string()
    .required("El campo nombre de tratamiento es obligatorio")
    .max(150, "El máximo de caracteres es 150"),
    
    descripcion_tratamiento: yup
    .string()
    .required("El campo descripción de tratamiento es obligatorio")
    .max(500, "El máximo de caracteres es 500"),

    id_tipo_tratamiento: yup
    .string()
    .required("El campo tipo de tratamiento es obligatorio"),

    costo_tratamiento: yup
    .string()
    .required("El campo costo de tratamiento es obligatorio"),

    
  });


export default schema;