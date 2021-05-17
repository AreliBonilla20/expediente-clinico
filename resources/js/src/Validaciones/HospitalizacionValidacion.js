import * as yup from "yup";

const schema = yup.object().shape({

    fecha_ingreso: yup
    .string()
    .required("El campo fecha de ingreso es obligatorio"),

    hora_ingreso: yup
    .string()
    .required("El campo hora de ingreso es obligatorio"),

    motivo_ingreso: yup
    .string()
    .required("El campo motivo de ingreso es obligatorio")
    .max(500, "El máximo de caracteres es 500"),

    sala: yup
    .string()
    .required("El campo sala de ingreso es obligatorio")
    .max(50, "El máximo de caracteres es 50"),

    camilla: yup
    .string()
    .required("El campo camilla es obligatorio")
    .max(10, "El máximo de caracteres es 10"),

    estado_paciente: yup
    .string()
    .required("El campo estado del paciente es obligatorio")
    .max(500, "El máximo de caracteres es 500"),
    
  });


export default schema;