import * as yup from "yup";

const today = new Date(Date.now());
today.setHours(0, 0, 0, 0)

const phoneRegExp = /^(\d{4}[-]\d{4})$/;

const schema = yup.object().shape({

    identificacion: yup
    .string()
    .max(17, "El máximo de caracteres es 17")
    .nullable(),

    nombres: yup
    .string()
    .required("El campo nombre es obligatorio")
    .max(150, "El máximo de caracteres es 150")
    .matches('^[ñíóáéú a-zA-Z ]+$', 'El campo nombres solo debe contener letras'),
    
    apellidos: yup
    .string()
    .required("El campo apellidos es obligatorio")
    .max(150, "El máximo de caracteres es 150")
    .matches('^[ñíóáéú a-zA-Z ]+$', 'El campo apellidos solo debe contener letras'),
    
    fecha_nacimiento: yup
    .date()
    .max(today, 'La fecha no puede sobrepasar el día de hoy')
    .required("El campo fecha de nacimiento es obligatorio"),

    estado_paciente: yup
    .string()
    .required("El campo estado paciente es obligatorio")
    .max(150, "El máximo de caracteres es 150")
    .matches('^[ñíóáéú a-zA-Z ]+$', 'El campo estado paciente solo debe contener letras'),
    
    direccion: yup
    .string()
    .max(250, "El máximo de caracteres es 250")
    .required("El campo direccion es obligatorio"),

    telefono: yup
    .string().matches(phoneRegExp, 'El formato debe ser: 7777-7777')
    .max(25, "El máximo de caracteres es 25")
    .required("El campo telefono es obligatorio"),

    correo: yup
    .string()
    .nullable()
    .email("La dirección de correo debe ser válida")
    .max(150, "El máximo de caracteres es 150"),
    
    estado_civil: yup
    .string()
    .max(30, "El máximo de caracteres es 30")
    .required("El campo estado civil es obligatorio"),

    nombre_conyugue: yup
    .string()
    .max(150, "El máximo de caracteres es 150")
    .nullable(),
    
    apellido_conyugue: yup
    .string()
    .max(150, "El máximo de caracteres es 150")
    .nullable(),
    
    nombre_contacto_emergencia: yup
    .string()
    .required("El campo contacto de emergencia es obligatorio")
    .matches('^[ñíóáéú a-zA-Z ]+$', 'El campo nombre contacto de emergencia solo debe contener letras')
    .max(150, "El máximo de caracteres es 150"),
    
    telefono_contacto_emergencia: yup
    .string().matches(phoneRegExp, 'El formato debe ser: 7777-7777')
    .required("El campo teléfono del contacto de emergencia es obligatorio")
    .max(25, "El máximo de caracteres es 25"),

    id_genero: yup
    .string()
    .required("El campo genéro es obligatorio"),

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