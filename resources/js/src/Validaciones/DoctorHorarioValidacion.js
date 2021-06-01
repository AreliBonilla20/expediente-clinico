import * as yup from "yup";

const schema = yup.object().shape({

id_doctor: yup
.string()
.required("El campo id doctor es obligatorio"),

doctor: yup
.string()
.required("El campo doctor es obligatorio"),

horario_doctor: yup
.string()
.required("El campo horario es obligatorio"),
 
});


export default schema;