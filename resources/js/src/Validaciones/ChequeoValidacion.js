import * as yup from "yup";

const schema = yup.object().shape({

sintomas_chequeo: yup
.string()
.max(500, "El máximo de caracteres es 500")
.required("El campo síntomas es obligatorio"),
    
observacion_chequeo: yup
.string()
.max(500, "El máximo de caracteres es 500")
.required("El campo observaciones es obligatorio"),

});


export default schema;