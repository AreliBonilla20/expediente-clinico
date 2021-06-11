<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

    Route::post('/register', 'UserController@register');
    Route::post('/login', 'UserController@authenticate');
    Route::post('/logout', 'UserController@logout');

    Route::group(['middleware' => ['jwt.verify']], function() {
        //Rutas para expedientes
        Route::get('/expedientes', 'PacienteController@index');
        Route::get('/expedientes/crear', 'PacienteController@create');
        Route::post('/expedientes/guardar', 'PacienteController@store');
        Route::get('/expedientes/{codigo}/ver', 'PacienteController@show');
        Route::get('/expedientes/{codigo}/editar', 'PacienteController@edit');
        Route::put('/expedientes/{codigo}/actualizar', 'PacienteController@update');
        Route::get('/expedientes/{param_busqueda}/buscar', 'PacienteController@buscar');

        //Rutas para antecedentes
        Route::post('/antecedentes/{codigo}/guardar', 'AntecedentePacienteController@store');
        Route::get('/antecedentes/{codigo}/editar', 'AntecedentePacienteController@edit');
        Route::get('/antecedentes/{codigo}/ver', 'AntecedentePacienteController@show');
        Route::put('/antecedentes/{codigo}/actualizar', 'AntecedentePacienteController@update');

        //Rutas para hospitalizaciones
        Route::get('/hospitalizaciones', 'HospitalizacionController@index');
        Route::get('/hospitalizaciones_paciente/{codigo}', 'HospitalizacionController@hospitalizaciones_paciente');
        Route::post('/hospitalizaciones/{codigo}/guardar', 'HospitalizacionController@store');
        Route::get('/hospitalizaciones/{id_hospitalizacion}/ver', 'HospitalizacionController@show');
        Route::get('/hospitalizaciones/{id_hospitalizacion}/editar', 'HospitalizacionController@edit');
        Route::put('/hospitalizaciones/{id_hospitalizacion}/actualizar', 'HospitalizacionController@update');
        Route::get('/hospitalizaciones/{id_hospitalizacion}/factura', 'HospitalizacionController@hospitalizacion_factura');

        //Rutas para chequeos - hospitalizaciones
        Route::get('/chequeos_hospitalizaciones/{id_hospitalizacion}', 'ChequeoHospitalizacionController@index');
        Route::post('/chequeos_hospitalizaciones/{id_hospitalizacion}/guardar', 'ChequeoHospitalizacionController@store');

        //Rutas para signos vitales
        Route::get('/signos_vitales/{id_consulta}/{id_hospitalizacion}', 'SignosVitalesController@index');
        Route::get('/signos_vitales/{id_consulta}/{id_hospitalizacion}/graficos', 'SignosVitalesController@graficos');
        Route::post('/signos_vitales/guardar', 'SignosVitalesController@store');

        //Rutas para el historial de diagnósticos del paciente
        Route::get('/historial_diagnosticos/{id_consulta}/{id_hospitalizacion}', 'HistorialDiagnosticosController@index');
        Route::post('/historial_diagnosticos/{id_consulta}/{id_hospitalizacion}/guardar', 'HistorialDiagnosticosController@store');
        Route::post('/historial_diagnosticos/{codigo_diagnostico}/actualizar', 'HistorialDiagnosticosController@update');

        //Rutas para el historial de recetas médicas del paciente
        Route::get('/recetas_medicas/{id_consulta}/{id_hospitalizacion}', 'RecetaMedicaController@index');
        Route::post('/recetas_medicas/{id_consulta}/{id_hospitalizacion}/guardar', 'RecetaMedicaController@store');

        //Rutas para el historial de tratamientos del paciente
        Route::get('/historial_tratamientos/{id_consulta}/{id_hospitalizacion}', 'HistorialTratamientosController@index');
        Route::post('/historial_tratamientos/{id_consulta}/{id_hospitalizacion}/guardar', 'HistorialTratamientosController@store');

        //Rutas para el historial de examenes del paciente
        Route::get('/historial_examenes/{id_consulta}/{id_hospitalizacion}', 'HistorialExamenesController@index');
        Route::post('/historial_examenes/{id_consulta}/{id_hospitalizacion}/guardar', 'HistorialExamenesController@store');
        Route::put('/historial_examenes/{id_atencion_medica}/archivo_resultado', 'HistorialExamenesController@archivo_resultado');

        //Rutas para los resultados de examenes del paciente
        Route::get('/examenes_resultado/{id_atencion_medica}/crear', 'ExamenesResultadoController@create');
        Route::post('/examenes_resultado/{id_atencion_medica}/guardar', 'ExamenesResultadoController@store');
        Route::get('/examenes_resultado/{id_atencion_medica}/ver', 'ExamenesResultadoController@examen_resultado');


        //Rutas para diagnosticos
        Route::get('/diagnosticos', 'DiagnosticoController@index');
        Route::get('/diagnosticos/crear', 'DiagnosticoController@create');
        Route::post('/diagnosticos/guardar', 'DiagnosticoController@store');
        Route::get('/diagnosticos/{codigo}/ver', 'DiagnosticoController@show');
        Route::get('/diagnosticos/{codigo}/editar', 'DiagnosticoController@edit');
        Route::put('/diagnosticos/{codigo}/actualizar', 'DiagnosticoController@update');
        Route::get('/diagnosticos/{param_busqueda}/buscar', 'DiagnosticoController@buscar');


        //Rutas para centrosMedicos
        Route::get('/centros_medicos', 'CentroMedicoController@index');
        Route::get('/centros_medicos/crear', 'CentroMedicoController@create');
        Route::post('/centros_medicos/guardar', 'CentroMedicoController@store');
        Route::get('/centros_medicos/{id_centro_medico}/ver', 'CentroMedicoController@show');
        Route::get('/centros_medicos/{id_centro_medico}/editar', 'CentroMedicoController@edit');
        Route::put('/centros_medicos/{id_centro_medico}/actualizar', 'CentroMedicoController@update');
        Route::get('/centros_medicos/{param_busqueda}/buscar', 'CentroMedicoController@buscar');
        Route::get('/centro_medico_empleados/{id_centro_medico}', 'CentroMedicoController@centro_medico_empleados');

        //Rutas para tratamientos medicos
        Route::get('/tratamientos_medicos', 'TratamientosMedicosController@index');
        Route::get('/tratamientos_medicos/crear', 'TratamientosMedicosController@create');
        Route::post('/tratamientos_medicos/guardar', 'TratamientosMedicosController@store');
        Route::get('/tratamientos_medicos/{codigo}/ver', 'TratamientosmedicosController@show');
        Route::get('/tratamientos_medicos/{codigo}/editar', 'TratamientosmedicosController@edit');
        Route::put('/tratamientos_medicos/{codigo}/actualizar', 'TratamientosmedicosController@update');
        Route::get('/tratamientos_medicos/{param_busqueda}/buscar', 'TratamientosmedicosController@buscar');

        //Rutas para medicamentos
        Route::get('/medicamentos', 'MedicamentoController@index');
        Route::get('/medicamentos/crear', 'MedicamentoController@create');
        Route::post('/medicamentos/guardar', 'MedicamentoController@store');
        Route::get('/medicamentos/{codigo}/ver', 'MedicamentoController@show');
        Route::get('/medicamentos/{codigo}/editar', 'MedicamentoController@edit');
        Route::put('/medicamentos/{codigo}/actualizar', 'MedicamentoController@update');
        Route::get('/medicamentos/{param_busqueda}/buscar', 'MedicamentoController@buscar');

        //Rutas para examenes
        Route::get('/examenes', 'ExamenController@index');
        Route::get('/examenes/crear', 'ExamenController@create');
        Route::post('/examenes/guardar', 'ExamenController@store');
        Route::get('/examenes/{codigo}/ver', 'ExamenController@show');
        Route::get('/examenes/{codigo}/editar', 'ExamenController@edit');
        Route::put('/examenes/{codigo}/actualizar', 'ExamenController@update');
        Route::get('/examenes/{param_busqueda}/buscar', 'ExamenController@buscar');
        Route::post('/examenes/{codigo}/agregar_parametros', 'ExamenController@agregar_parametros');
        Route::get('/examenes/{codigo}/ver_parametros_examen', 'ExamenController@ver_parametros_examen');


        //Rutas para empleados
        Route::get('/empleados', 'EmpleadoController@index');
        Route::get('/empleados/crear', 'EmpleadoController@create');
        Route::post('/empleados/guardar', 'EmpleadoController@store');
        Route::get('/empleados/{id_empleado}/ver', 'EmpleadoController@show');
        Route::get('/empleados/{id_empleado}/editar', 'EmpleadoController@edit');
        Route::put('/empleados/{id_empleado}/actualizar', 'EmpleadoController@update');
        Route::get('/empleados/{param_busqueda}/buscar', 'EmpleadoController@buscar');

        //Rutas para consultorios-centros medicos
        Route::get('/consultorios/{id_centro_medico}', 'ConsultorioController@index');
        Route::post('/consultorios/{id_centro_medico}/guardar', 'ConsultorioController@store');

        //Rutas para hemogramas
        Route::get('/examenes_hemogramas', 'ExamenHemogramaController@index');
        Route::get('/examenes_hemogramas/crear', 'ExamenHemogramaController@create');
        Route::post('/examenes_hemogramas/guardar', 'ExamenHemogramaController@store');
        Route::get('/examenes_hemogramas/{codigo}/ver', 'ExamenHemogramaController@show');
        Route::get('/examenes_hemogramas/{codigo}/editar', 'ExamenHemogramaController@edit');
        Route::put('/examenes_hemogramas/{codigo}/actualizar', 'ExamenHemogramaController@update');

        //Rutas para cirugías
        Route::get('/cirugias', 'CirugiaController@index');
        Route::get('/cirugias/crear', 'CirugiaController@create');
        Route::post('/cirugias/guardar', 'CirugiaController@store');
        Route::get('/cirugias/{codigo}/ver', 'CirugiaController@show');
        Route::get('/cirugias/{codigo}/editar', 'CirugiaController@edit');
        Route::put('/cirugias/{codigo}/actualizar', 'CirugiaController@update');

        //Rutas para quirofanos
        Route::get('/quirofanos/{id_centro_medico}', 'QuirofanoController@index');
        Route::post('/quirofanos/{id_centro_medico}/guardar', 'QuirofanoController@store');

        //Rutas para médicos
        Route::get('/centro_medico_doctores/{id_centro_medico}', 'DoctorController@centro_medico_doctores');
        Route::get('/doctores/crear', 'DoctorController@create');
        Route::post('/doctores/{id_empleado}/guardar', 'DoctorController@store');
        Route::post('/doctores/horarios/asignar', 'DoctorController@horarios');
        Route::get('/doctores/doctor_horario', 'DoctorController@doctor_horario');

        //Rutas para horarios
        Route::post('/horarios/{id_centro_medico}/guardar', 'HorarioController@store');
        Route::get('/horarios/{id_centro_medico}/', 'HorarioController@index');
        Route::get('/horarios/{id_centro_medico}/doctores', 'HorarioController@doctores_horarios');

        //Rutas para citas
        Route::get('/citas', 'CitaController@index');
        Route::get('/citas/crear', 'CitaController@create');
        Route::post('/citas/guardar', 'CitaController@store');
        Route::get('/citas/{id_cita}/ver', 'CitaController@show');
        Route::get('/citas/{id_cita}/editar', 'CitaController@edit');
        Route::put('/citas/{id_cita}/actualizar', 'CitaController@update');
        //Route::get('/citas/{param_busqueda}/buscar', 'CitaController@buscar');
        Route::get('/citas/{codigo_paciente}/citas_paciente', 'CitaController@citas_paciente');

        //Rutas para consultas
        Route::get('/consultas/{codigo}', 'ConsultaController@index');
        Route::get('/consultas/crear', 'ConsultaController@create');
        Route::post('/consultas/guardar', 'ConsultaController@store');
        Route::get('/consultas/{id_consulta}/ver', 'ConsultaController@show');
        Route::get('/consultas/{id_consulta}/factura', 'ConsultaController@consulta_factura');




  });

            //Rutas para expedientes
            Route::get('/expedientes', 'PacienteController@index');
            Route::get('/expedientes/crear', 'PacienteController@create');
            Route::post('/expedientes/guardar', 'PacienteController@store');
            Route::get('/expedientes/{codigo}/ver', 'PacienteController@show');
            Route::get('/expedientes/{codigo}/editar', 'PacienteController@edit');
            Route::put('/expedientes/{codigo}/actualizar', 'PacienteController@update');
            Route::get('/expedientes/{param_busqueda}/buscar', 'PacienteController@buscar');

            //Rutas para antecedentes
            Route::post('/antecedentes/{codigo}/guardar', 'AntecedentePacienteController@store');
            Route::get('/antecedentes/{codigo}/editar', 'AntecedentePacienteController@edit');
            Route::get('/antecedentes/{codigo}/ver', 'AntecedentePacienteController@show');
            Route::put('/antecedentes/{codigo}/actualizar', 'AntecedentePacienteController@update');

            //Rutas para hospitalizaciones
            Route::get('/hospitalizaciones', 'HospitalizacionController@index');
            Route::get('/hospitalizaciones_paciente/{codigo}', 'HospitalizacionController@hospitalizaciones_paciente');
            Route::post('/hospitalizaciones/{codigo}/guardar', 'HospitalizacionController@store');
            Route::get('/hospitalizaciones/{id_hospitalizacion}/ver', 'HospitalizacionController@show');
            Route::get('/hospitalizaciones/{id_hospitalizacion}/editar', 'HospitalizacionController@edit');
            Route::put('/hospitalizaciones/{id_hospitalizacion}/actualizar', 'HospitalizacionController@update');
            Route::get('/hospitalizaciones/{id_hospitalizacion}/factura', 'HospitalizacionController@hospitalizacion_factura');

            //Rutas para chequeos - hospitalizaciones
            Route::get('/chequeos_hospitalizaciones/{id_hospitalizacion}', 'ChequeoHospitalizacionController@index');
            Route::post('/chequeos_hospitalizaciones/{id_hospitalizacion}/guardar', 'ChequeoHospitalizacionController@store');

            //Rutas para signos vitales
            Route::get('/signos_vitales/{id_consulta}/{id_hospitalizacion}', 'SignosVitalesController@index');
            Route::get('/signos_vitales/{id_consulta}/{id_hospitalizacion}/graficos', 'SignosVitalesController@graficos');
            Route::post('/signos_vitales/guardar', 'SignosVitalesController@store');

            //Rutas para el historial de diagnósticos del paciente
            Route::get('/historial_diagnosticos/{id_consulta}/{id_hospitalizacion}', 'HistorialDiagnosticosController@index');
            Route::post('/historial_diagnosticos/{id_consulta}/{id_hospitalizacion}/guardar', 'HistorialDiagnosticosController@store');
            Route::post('/historial_diagnosticos/{codigo_diagnostico}/actualizar', 'HistorialDiagnosticosController@update');

            //Rutas para el historial de recetas médicas del paciente
            Route::get('/recetas_medicas/{id_consulta}/{id_hospitalizacion}', 'RecetaMedicaController@index');
            Route::post('/recetas_medicas/{id_consulta}/{id_hospitalizacion}/guardar', 'RecetaMedicaController@store');

            //Rutas para el historial de tratamientos del paciente
            Route::get('/historial_tratamientos/{id_consulta}/{id_hospitalizacion}', 'HistorialTratamientosController@index');
            Route::post('/historial_tratamientos/{id_consulta}/{id_hospitalizacion}/guardar', 'HistorialTratamientosController@store');

            //Rutas para el historial de examenes del paciente
            Route::get('/historial_examenes/{id_consulta}/{id_hospitalizacion}', 'HistorialExamenesController@index');
            Route::post('/historial_examenes/{id_consulta}/{id_hospitalizacion}/guardar', 'HistorialExamenesController@store');
            Route::put('/historial_examenes/{id_atencion_medica}/archivo_resultado', 'HistorialExamenesController@archivo_resultado');

            //Rutas para los resultados de examenes del paciente
            Route::get('/examenes_resultado/{id_atencion_medica}/crear', 'ExamenesResultadoController@create');
            Route::post('/examenes_resultado/{id_atencion_medica}/guardar', 'ExamenesResultadoController@store');
            Route::get('/examenes_resultado/{id_atencion_medica}/ver', 'ExamenesResultadoController@examen_resultado');


            //Rutas para diagnosticos
            Route::get('/diagnosticos', 'DiagnosticoController@index');
            Route::get('/diagnosticos/crear', 'DiagnosticoController@create');
            Route::post('/diagnosticos/guardar', 'DiagnosticoController@store');
            Route::get('/diagnosticos/{codigo}/ver', 'DiagnosticoController@show');
            Route::get('/diagnosticos/{codigo}/editar', 'DiagnosticoController@edit');
            Route::put('/diagnosticos/{codigo}/actualizar', 'DiagnosticoController@update');
            Route::get('/diagnosticos/{param_busqueda}/buscar', 'DiagnosticoController@buscar');


            //Rutas para centrosMedicos
            Route::get('/centros_medicos', 'CentroMedicoController@index');
            Route::get('/centros_medicos/crear', 'CentroMedicoController@create');
            Route::post('/centros_medicos/guardar', 'CentroMedicoController@store');
            Route::get('/centros_medicos/{id_centro_medico}/ver', 'CentroMedicoController@show');
            Route::get('/centros_medicos/{id_centro_medico}/editar', 'CentroMedicoController@edit');
            Route::put('/centros_medicos/{id_centro_medico}/actualizar', 'CentroMedicoController@update');
            Route::get('/centros_medicos/{param_busqueda}/buscar', 'CentroMedicoController@buscar');
            Route::get('/centro_medico_empleados/{id_centro_medico}', 'CentroMedicoController@centro_medico_empleados');

            //Rutas para tratamientos medicos
            Route::get('/tratamientos_medicos', 'TratamientosMedicosController@index');
            Route::get('/tratamientos_medicos/crear', 'TratamientosMedicosController@create');
            Route::post('/tratamientos_medicos/guardar', 'TratamientosMedicosController@store');
            Route::get('/tratamientos_medicos/{codigo}/ver', 'TratamientosmedicosController@show');
            Route::get('/tratamientos_medicos/{codigo}/editar', 'TratamientosmedicosController@edit');
            Route::put('/tratamientos_medicos/{codigo}/actualizar', 'TratamientosmedicosController@update');
            Route::get('/tratamientos_medicos/{param_busqueda}/buscar', 'TratamientosmedicosController@buscar');

            //Rutas para medicamentos
            Route::get('/medicamentos', 'MedicamentoController@index');
            Route::get('/medicamentos/crear', 'MedicamentoController@create');
            Route::post('/medicamentos/guardar', 'MedicamentoController@store');
            Route::get('/medicamentos/{codigo}/ver', 'MedicamentoController@show');
            Route::get('/medicamentos/{codigo}/editar', 'MedicamentoController@edit');
            Route::put('/medicamentos/{codigo}/actualizar', 'MedicamentoController@update');
            Route::get('/medicamentos/{param_busqueda}/buscar', 'MedicamentoController@buscar');

            //Rutas para examenes
            Route::get('/examenes', 'ExamenController@index');
            Route::get('/examenes/crear', 'ExamenController@create');
            Route::post('/examenes/guardar', 'ExamenController@store');
            Route::get('/examenes/{codigo}/ver', 'ExamenController@show');
            Route::get('/examenes/{codigo}/editar', 'ExamenController@edit');
            Route::put('/examenes/{codigo}/actualizar', 'ExamenController@update');
            Route::get('/examenes/{param_busqueda}/buscar', 'ExamenController@buscar');
            Route::post('/examenes/{codigo}/agregar_parametros', 'ExamenController@agregar_parametros');
            Route::get('/examenes/{codigo}/ver_parametros_examen', 'ExamenController@ver_parametros_examen');


            //Rutas para empleados
            Route::get('/empleados', 'EmpleadoController@index');
            Route::get('/empleados/crear', 'EmpleadoController@create');
            Route::post('/empleados/guardar', 'EmpleadoController@store');
            Route::get('/empleados/{id_empleado}/ver', 'EmpleadoController@show');
            Route::get('/empleados/{id_empleado}/editar', 'EmpleadoController@edit');
            Route::put('/empleados/{id_empleado}/actualizar', 'EmpleadoController@update');
            Route::get('/empleados/{param_busqueda}/buscar', 'EmpleadoController@buscar');

            //Rutas para consultorios-centros medicos
            Route::get('/consultorios/{id_centro_medico}', 'ConsultorioController@index');
            Route::post('/consultorios/{id_centro_medico}/guardar', 'ConsultorioController@store');

            //Rutas para hemogramas
            Route::get('/examenes_hemogramas', 'ExamenHemogramaController@index');
            Route::get('/examenes_hemogramas/crear', 'ExamenHemogramaController@create');
            Route::post('/examenes_hemogramas/guardar', 'ExamenHemogramaController@store');
            Route::get('/examenes_hemogramas/{codigo}/ver', 'ExamenHemogramaController@show');
            Route::get('/examenes_hemogramas/{codigo}/editar', 'ExamenHemogramaController@edit');
            Route::put('/examenes_hemogramas/{codigo}/actualizar', 'ExamenHemogramaController@update');

            //Rutas para cirugías
            Route::get('/cirugias', 'CirugiaController@index');
            Route::get('/cirugias/crear', 'CirugiaController@create');
            Route::post('/cirugias/guardar', 'CirugiaController@store');
            Route::get('/cirugias/{codigo}/ver', 'CirugiaController@show');
            Route::get('/cirugias/{codigo}/editar', 'CirugiaController@edit');
            Route::put('/cirugias/{codigo}/actualizar', 'CirugiaController@update');

            //Rutas para quirofanos
            Route::get('/quirofanos/{id_centro_medico}', 'QuirofanoController@index');
            Route::post('/quirofanos/{id_centro_medico}/guardar', 'QuirofanoController@store');

            //Rutas para médicos
            Route::get('/centro_medico_doctores/{id_centro_medico}', 'DoctorController@centro_medico_doctores');
            Route::get('/doctores/crear', 'DoctorController@create');
            Route::post('/doctores/{id_empleado}/guardar', 'DoctorController@store');
            Route::post('/doctores/horarios/asignar', 'DoctorController@horarios');
            Route::get('/doctores/doctor_horario', 'DoctorController@doctor_horario');

            //Rutas para horarios
            Route::post('/horarios/{id_centro_medico}/guardar', 'HorarioController@store');
            Route::get('/horarios/{id_centro_medico}/', 'HorarioController@index');
            Route::get('/horarios/{id_centro_medico}/doctores', 'HorarioController@doctores_horarios');

            //Rutas para citas
            Route::get('/citas', 'CitaController@index');
            Route::get('/citas/crear', 'CitaController@create');
            Route::post('/citas/guardar', 'CitaController@store');
            Route::get('/citas/{id_cita}/ver', 'CitaController@show');
            Route::get('/citas/{id_cita}/editar', 'CitaController@edit');
            Route::put('/citas/{id_cita}/actualizar', 'CitaController@update');
            //Route::get('/citas/{param_busqueda}/buscar', 'CitaController@buscar');
            Route::get('/citas/{codigo_paciente}/citas_paciente', 'CitaController@citas_paciente');

            //Rutas para consultas
            Route::get('/consultas/{codigo}', 'ConsultaController@index');
            Route::get('/consultas/crear', 'ConsultaController@create');
            Route::post('/consultas/guardar', 'ConsultaController@store');
            Route::get('/consultas/{id_consulta}/ver', 'ConsultaController@show');
            Route::get('/consultas/{id_consulta}/factura', 'ConsultaController@consulta_factura');



