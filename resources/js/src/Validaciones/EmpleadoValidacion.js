import * as yup from "yup";

const today = new Date(Date.now());
today.setHours(0, 0, 0, 0)

const phoneRegExp = /^(\d{4}[-]\d{4})$/;

const schema = yup.object().shape({

    id_empleado: yup
    .string()
    .max(30, "El máximo de caracteres es 30")
    .nullable(),

    nombre_empleado: yup
    .string()
    .required("El campo nombre es obligatorio")
    .max(150, "El máximo de caracteres es 150")
    .matches('^[ñíóáéú a-zA-Z ]+$', 'El campo nombres solo debe contener letras'),
    
    apellido_empleado: yup
    .string()
    .required("El campo apellidos es obligatorio")
    .max(150, "El máximo de caracteres es 150")
    .matches('^[ñíóáéú a-zA-Z ]+$', 'El campo apellidos solo debe contener letras'),

    identificacion_empleado: yup
    .string()
    .max(250, "El máximo de caracteres es 250")
    .required("El identificación es obligatorio"),
    
    fecha_nacimiento_empleado: yup
    .date()
    .max(today, 'La fecha no puede sobrepasar el día de hoy')
    .required("El campo fecha de nacimiento es obligatorio"),

    direccion_empleado: yup
    .string()
    .max(250, "El máximo de caracteres es 250")
    .required("El campo direccion es obligatorio"),

    telefono_empleado: yup
    .string().matches(phoneRegExp, 'El formato debe ser: 7777-7777')
    .max(25, "El máximo de caracteres es 25")
    .required("El campo telefono es obligatorio"),

    correo_empleado: yup
    .string()
    .nullable()
    .email("La dirección de correo debe ser válida")
    .max(150, "El máximo de caracteres es 150"),
  
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

    id_tipo_personal: yup
    .string()
    .required("El campo tipo de personal es obligatorio"),
    
    id_centro_medico: yup
    .string()
    .required("El campo centro médico es obligatorio"),
 
  });


export default schema;