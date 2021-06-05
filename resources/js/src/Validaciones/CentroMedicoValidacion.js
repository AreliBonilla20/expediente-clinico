import * as yup from "yup";

const schema = yup.object().shape({

    id_centro_medico: yup
    .string()
    .required("El campo identificador es obligatorio")
    .max(25, "El máximo de caracteres es 25"),
    
    nombre_centro_medico: yup
    .string()
    .required("El campo nombre es obligatorio")
    .max(250, "El máximo de caracteres es 250")
    .matches('^[ñíóáéú a-zA-Z ]+$', 'El campo nombre solo debe contener letras'),

    direccion_centro_medico: yup
    .string()
    .max(250, "El máximo de caracteres es 250")
    .required("El campo dirección es obligatorio"),
    
    director: yup
    .string()
    .required("El campo director es obligatorio")
    .max(150, "El máximo de caracteres es 150")
    .matches('^[ñíóáéú a-zA-Z ]+$', 'El campo director solo debe contener letras'),

    telefono_director: yup
    .string()
    .max(25, "El máximo de caracteres es 25")
    .required("El campo teléfono es obligatorio"),

    correo_director: yup
    .string()
    .nullable()
    .email("La dirección de correo debe ser válida")
    .max(150, "El máximo de caracteres es 150"),

    correo_centro_medico: yup
    .string()
    .email("La dirección de correo debe ser válida")
    .max(150, "El máximo de caracteres es 150")
    .required("El campo correo eléctronico es obligatorio"),
    
    telefono1_centro_medico: yup
    .string()
    .max(25, "El máximo de caracteres es 25")
    .required("El campo teléfono es obligatorio"),

    telefono2_centro_medico: yup
    .string()
    .nullable()
    .max(25, "El máximo de caracteres es 25"),

    tiempo_consulta_medica: yup
    .string()
    .required("El campo tiempo de consulta médica es obligatorio"),
    
    id_tipo_centro_medico: yup
    .string()
    .required("El campo tipo centro médico es obligatorio"),

    id_pais: yup
    .string()
    .required("El campo país es obligatorio"),

    id_departamento: yup
    .string()
    .required("El campo departamento/estado es obligatorio"),

    id_municipio: yup
    .string()
    .required("El campo municipio/ciudad es obligatorio"),   
    
  });


export default schema;