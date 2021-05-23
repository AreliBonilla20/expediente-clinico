import * as yup from "yup";

const schema = yup.object().shape({
    
observacion_chequeo: yup
.string()
.max(500, "El máximo de caracteres es 500")
.required("El campo observaciones es obligatorio"),

});


export default schema;