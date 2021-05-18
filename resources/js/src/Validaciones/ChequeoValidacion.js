import * as yup from "yup";

const schema = yup.object().shape({

fecha_chequeo: yup
.string()
.required("El campo fecha del chequeo es obligatorio"),

horachequeo: yup
.string()
.required("El campo hora del chequeo es obligatorio"),

observacion_chequeo: yup
.string()
.max(500, "El máximo de caracteres es 500")
.required("El campo observaciones es obligatorio"),

});


export default schema;