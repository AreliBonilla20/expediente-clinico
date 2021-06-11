import * as yup from "yup";
import { string } from "yup/lib/locale";

const schema = yup.object().shape({

    codigo_cirugia: yup
    .string()
    .required("El campo código de cirugía es obligatorio")
    .max(25, "El máximo de caracteres es 25"),
    
    nombre_cirugia: yup
    .string()
    .required("El campo nombre de cirugía es obligatorio")
    .max(150, "El máximo de caracteres es 150"),
    
    descripcion_cirugia: yup
    .string()
    .required("El campo descripción de cirugía es obligatorio")
    .max(500, "El máximo de caracteres es 500"),

    costo_cirugia: yup
    .string()
    .required("El campo costo de cirugía es obligatorio"),

    
  });


export default schema;