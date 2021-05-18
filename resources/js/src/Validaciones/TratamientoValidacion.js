import * as yup from "yup";
import { string } from "yup/lib/locale";

const schemaAgregarTratamiento = yup.object().shape({

    codigo_tratamiento: yup
    .string()
    .max(10, "El máximo de caracteres es 10")
    .required("El campo código de tratamiento es obligatorio"),
    
    nombre_tratamiento: yup
    .string()
    .required("El campo nombre de tratamiento es obligatorio")
    .max(150, "El máximo de caracteres es 150"),
    
    descripcion_tratamiento: yup
    .string()
    .max(250, "El máximo de caracteres es 250"),

    id_tipo_tratamiento: yup
    .string()
    .required("El campo tipo de tratamiento es obligatorio"),

    costo_tratamiento: yup
    .number()
    .required("El campo costo de tratamiento es obligatorio"),

    
  });


export default schemaAgregarTratamiento;