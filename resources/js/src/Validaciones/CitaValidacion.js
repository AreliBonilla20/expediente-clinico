import * as yup from "yup";

const today = new Date(Date.now());
today.setHours(0, 0, 0, 0)

const schema = yup.object().shape({

    id_doctor: yup
    .string()
    .required("El campo doctor es obligatorio"),

    id_consultorio: yup
    .string()
    .required("El campo consultorio es obligatorio"),

    fecha_cita: yup
    .date()
    .min(today, 'La fecha no puede ser anterior al día de hoy')
    .required("El campo fecha es obligatorio"),

    hora_cita: yup
    .string()
    .required("El campo hora es obligatorio"),

    id_centro_medico: yup
    .string()
    .required("El campo centro médico es obligatorio"),

    id_especialidad: yup
    .string()
    .required("El campo especialidad es obligatorio"),
    
  });


export default schema;