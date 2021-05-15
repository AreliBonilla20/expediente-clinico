import * as yup from "yup";

const schema = yup.object().shape({

    historial_enfermedades: yup
    .string("El campo historial enfermedades, debe ser una cadena de texto")
    .required("El campo apellidos es obligatorio")
    .max(500, "El máximo de caracteres es 150"),

    nombre_padre: yup
    .string()
    .max(150, "El máximo de caracteres es 150")
    .nullable(),

    apellidos_padre: yup
    .string()
    .max(150, "El máximo de caracteres es 150")
    .nullable(),

    fecha_nacimiento_padre: yup
    .string()
    .nullable(),

    direccion_padre: yup
    .string()
    .max(150, "El máximo de caracteres es 150")
    .nullable(),

    padecimientos_padre: yup
    .string()
    .max(250, "El máximo de caracteres es 150")
    .nullable(),
    
    nombre_madre: yup
    .string()
    .max(150, "El máximo de caracteres es 150")
    .nullable(),

    apellidos_madre: yup
    .string()
    .max(150, "El máximo de caracteres es 150")
    .nullable(),

    fecha_nacimiento_madre: yup
    .string()
    .nullable(),

    direccion_madre: yup
    .string()
    .max(150, "El máximo de caracteres es 150")
    .nullable(),

    padecimientos_madre: yup
    .string()
    .max(250, "El máximo de caracteres es 150")
    .nullable(),

    padecimientos_madre: yup
    .string()
    .max(250, "El máximo de caracteres es 150")
    .nullable(),
    
  });


export default schema;