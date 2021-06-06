import React, {useState, useEffect} from 'react';
import { Line } from "react-chartjs-2";
import { useParams } from 'react-router';

import API from '../api';

const GraficosSignosVitales = () => {

    const {id_hospitalizacion, id_consulta} = useParams();

    const [fechas, set_fechas] = useState([]);
    const [peso, set_peso] = useState([]);
    const [estatura, set_estatura] = useState([]);
    const [temperatura, set_temperatura] = useState([]);
    const [presion_diastolica, set_presion_diastolica] = useState([]);
    const [presion_sistolica, set_presion_sistolica] = useState([]);
    const [ritmo_cardiaco, set_ritmo_cardiaco] = useState([]);
    const [respiracion, set_respiracion] = useState([]);

    useEffect(() => {
        API.signos_vitales_graficos(id_consulta, id_hospitalizacion).then(res => {
           const result = res.data;
           set_fechas(result.fecha_array);
           set_peso(result.peso_array);
           set_estatura(result.estatura_array);
           set_temperatura(result.temperatura_array);
           set_presion_diastolica(result.presion_diastolica_array);
           set_presion_sistolica(result.presion_sistolica_array);
           set_ritmo_cardiaco(result.ritmo_cardiaco_array);
           set_respiracion(result.respiracion_array);
       })
     }, []);


    return(

        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Gráficos</h4>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-3">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                            aria-orientation="vertical">
                            <a className="nav-link active" id="v-pills-peso-tab" data-bs-toggle="pill"
                                href="#v-pills-peso" role="tab" aria-controls="v-pills-peso"
                                aria-selected="true">Peso</a>
                            <a className="nav-link" id="v-pills-estatura-tab" data-bs-toggle="pill"
                                href="#v-pills-estatura" role="tab" aria-controls="v-pills-estatura"
                                aria-selected="false">Estatura</a>
                            <a className="nav-link" id="v-pills-temperatura-tab" data-bs-toggle="pill"
                                href="#v-pills-temperatura" role="tab" aria-controls="v-pills-temperatura"
                                aria-selected="false">Temperatura</a>
                            <a className="nav-link" id="v-pills-presion_sistolica-tab" data-bs-toggle="pill"
                                href="#v-pills-presion_sistolica" role="tab" aria-controls="v-pills-presion_sistolica"
                                aria-selected="false">Presión sistólica</a>
                            <a className="nav-link" id="v-pills-presion_diastolica-tab" data-bs-toggle="pill"
                                href="#v-pills-presion_diastolica" role="tab" aria-controls="v-pills-presion_diastolica"
                                aria-selected="false">Presión diastólica</a>
                            <a className="nav-link" id="v-pills-ritmo_cardiaco-tab" data-bs-toggle="pill"
                                href="#v-pills-ritmo_cardiaco" role="tab" aria-controls="v-pills-ritmo_cardiaco"
                                aria-selected="false">Ritmo cardíaco</a>
                            <a className="nav-link" id="v-pills-respiracion-tab" data-bs-toggle="pill"
                                href="#v-pills-respiracion" role="tab" aria-controls="v-pills-respiracion"
                                aria-selected="false">Respiración</a>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-peso" role="tabpanel"
                                aria-labelledby="v-pills-peso-tab">
                                   <Line
                                    data={{
                                        labels: fechas,
                                        datasets: [{ 
                                            data: peso,
                                            label: "Peso (kg)",
                                            borderColor: "#e82113",
                                            fill: false
                                        }
                                        ]
                                    }}
                                    height={150}
                                    width={300}
                                    />
                            </div>
                            <div className="tab-pane fade" id="v-pills-estatura" role="tabpanel"
                                aria-labelledby="v-pills-estatura-tab">
                                 <Line
                                    data={{
                                        labels: fechas,
                                        datasets: [{ 
                                            data: estatura,
                                            label: "Estatura (cm)",
                                            borderColor: "#49d941",
                                            fill: false
                                        }
                                        ]
                                    }}
                                    height={150}
                                    width={300}
                                    />
                            </div>
                            <div className="tab-pane fade" id="v-pills-temperatura" role="tabpanel"
                                aria-labelledby="v-pills-temperatura-tab">
                                 <Line
                                    data={{
                                        labels: fechas,
                                        datasets: [{ 
                                            data: temperatura,
                                            label: "Temperatura (°C)",
                                            borderColor: "#07aae6",
                                            fill: false
                                        }
                                        ]
                                    }}
                                    height={150}
                                    width={300}
                                    />
                            </div>
                            <div className="tab-pane fade" id="v-pills-presion_sistolica" role="tabpanel"
                                aria-labelledby="v-pills-presion_sistolica-tab">
                                <Line
                                    data={{
                                        labels: fechas,
                                        datasets: [{ 
                                            data: presion_sistolica,
                                            label: "Presión sistólica (mmHg)",
                                            borderColor: "#d14bb5",
                                            fill: false
                                        }
                                        ]
                                    }}
                                    height={150}
                                    width={300}
                                    />
                            </div>
                            <div className="tab-pane fade" id="v-pills-presion_diastolica" role="tabpanel"
                                aria-labelledby="v-pills-presion_diastolica-tab">
                               <Line
                                    data={{
                                        labels: fechas,
                                        datasets: [{ 
                                            data: presion_diastolica,
                                            label: "Presión diastólica (mmHg)",
                                            borderColor: "#31ebe1",
                                            fill: false
                                        }
                                        ]
                                    }}
                                    height={150}
                                    width={300}
                                    />
                            </div>
                            <div className="tab-pane fade" id="v-pills-ritmo_cardiaco" role="tabpanel"
                                aria-labelledby="v-pills-ritmo_cardiaco-tab">
                               <Line
                                    data={{
                                        labels: fechas,
                                        datasets: [{ 
                                            data: ritmo_cardiaco,
                                            label: "Ritmo cardíaco (x min)",
                                            borderColor: "#f7c23b",
                                            fill: false
                                        }
                                        ]
                                    }}
                                    height={150}
                                    width={300}
                                    />
                            </div>
                            <div className="tab-pane fade" id="v-pills-respiracion" role="tabpanel"
                                aria-labelledby="v-pills-respiracion-tab">
                               <Line
                                    data={{
                                        labels: fechas,
                                        datasets: [{ 
                                            data: respiracion,
                                            label: "Respiración (x min)",
                                            borderColor: "#1fa7f0",
                                            fill: false
                                        }
                                        ]
                                    }}
                                    height={150}
                                    width={300}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    );
}

export default GraficosSignosVitales;