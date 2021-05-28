import * as yup from "yup";

const schema = yup.object().shape({

dia_inicio: yup
.string()
.required("El campo día inicio es obligatorio"),

dia_final: yup
.string()
.required("El campo día final es obligatorio"),

hora_inicio: yup
.string()
.required("El campo hora inicio es obligatorio"),

hora_final: yup
.string()
.required("El campo hora final es obligatorio"),
    
});


export default schema;