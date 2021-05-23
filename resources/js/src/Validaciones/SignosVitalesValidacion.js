import * as yup from "yup";
import { number } from "yup/lib/locale";

const schema = yup.object().shape({

    peso_paciente: yup.number().required().positive().integer()
   
  });

export default schema;
