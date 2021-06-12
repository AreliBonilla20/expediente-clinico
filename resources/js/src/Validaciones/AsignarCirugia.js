import * as yup from "yup";

const schema = yup.object().shape({

codigo_cirugia: yup
.string()
.required("El campo cirugía es obligatorio"),
    
id_quirofano: yup
.string()
.required("El campo quirofano es obligatorio"),

hora_cirugia: yup
.string()
.required("El campo hora de la cirugía es obligatorio"),

});


export default schema;