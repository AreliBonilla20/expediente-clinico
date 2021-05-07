import * as yup from "yup";

const schemaAgregarExpediente = yup.object().shape({

    identificacion: yup
    .string("El campo identificación debe ser una cadena de texto")
    .max(30, "El máximo de caracteres es 30"),

    nombres: yup
    .string("El campo nombres debe ser una cadena de texto")
    .max(150, "El máximo de caracteres es 150")
    .required("El campo nombre es obligatorio"),

    apellidos: yup
    .string("El campo apellidos debe ser una cadena de texto")
    .max(150, "El máximo de caracteres es 150")
    .required("El campo apellidos es obligatorio"),

    fecha_nacimiento: yup
    .date("El campo fecha de nacimiento debe ser una fecha")
    .required("El campo fecha de nacimiento es obligatorio"),

    estado_paciente: yup
    .string("El campo estado paciente debe ser una cadena de texto")
    .max(150, "El máximo de caracteres es 150")
    .required("El campo estado paciente es obligatorio"),

    direccion: yup
    .string("El campo direccion debe ser una cadena de texto")
    .max(250, "El máximo de caracteres es 250")
    .required("El campo direccion es obligatorio"),

    telefono: yup
    .string("El campo telefono debe ser una cadena de texto")
    .max(25, "El máximo de caracteres es 25")
    .required("El campo telefono es obligatorio"),

    correo: yup
    .string("El campo correo debe ser una cadena de texto")
    .email("La dirección de correo debe ser válida")
    .max(150, "El máximo de caracteres es 150"),
    
    estado_civil: yup
    .string("El campo estado civil debe ser una cadena de texto")
    .max(30, "El máximo de caracteres es 30")
    .required("El campo estado civil es obligatorio"),

    nombre_conyugue: yup
    .string("El campo nombre conyugue debe ser una cadena de texto")
    .max(150, "El máximo de caracteres es 150"),

    apellido_conyugue: yup
    .string("El campo apellido conyugue debe ser una cadena de texto")
    .max(150, "El máximo de caracteres es 150"),

    nombre_contacto_emergencia: yup
    .string("El campo nombre contacto de emergencia debe ser una cadena de texto")
    .max(150, "El máximo de caracteres es 150")
    .required("El campo contacto de emergencia es obligatorio"),

    telefono_contacto_emergencia: yup
    .string("El campo teléfono contacto de emergencia debe ser una cadena de texto")
    .max(25, "El máximo de caracteres es 25")
    .required("El campo teléfono contacto de emergencia es obligatorio"),

    id_genero: yup
    .number()
    .required("El campo género es obligatorio"),

    id_pais: yup
    .number()
    .required("El campo pais es obligatorio"),

    id_departamento: yup
    .number()
    .required("El campo departamento/estado es obligatorio"),

    id_municipio: yup
    .number()
    .required("El campo municipio/estado es obligatorio"),
    
  });


export default schemaAgregarExpediente;