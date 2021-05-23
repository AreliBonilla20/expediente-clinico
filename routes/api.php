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
Route::post('/hospitalizaciones/{id_hospitalizacion}/guardar', 'HospitalizacionController@store');
Route::get('/hospitalizaciones/{id_hospitalizacion}/ver', 'HospitalizacionController@show');
Route::get('/hospitalizaciones/{id_hospitalizacion}/editar', 'HospitalizacionController@edit');
Route::put('/hospitalizaciones/{id_hospitalizacion}/actualizar', 'HospitalizacionController@update');

//Rutas para chequeos - hospitalizaciones
Route::get('/chequeos_hospitalizaciones/{id_hospitalizacion}', 'ChequeoHospitalizacionController@index');
Route::post('/chequeos_hospitalizaciones/{id_hospitalizacion}/guardar', 'ChequeoHospitalizacionController@store');

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

//Rutas para consultorios-centrosm medicos
Route::get('/consultorios/{id_centro_medico}', 'ConsultorioController@index');
Route::post('/consultorios/{id_centro_medico}/guardar', 'ConsultorioController@store');
