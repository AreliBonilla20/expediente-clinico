import * as yup from "yup";

const schema = yup.object().shape({

consultorio: yup
.string()
.max(100, "El máximo de caracteres es 100")
.required("El campo observaciones es obligatorio"),

});


export default schema;