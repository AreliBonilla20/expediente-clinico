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


//Rutas para diagnosticos
Route::get('/diagnosticos', 'DiagnosticoController@index');
Route::get('/diagnosticos/crear', 'DiagnosticoController@create');
Route::post('/diagnosticos/guardar', 'DiagnosticoController@store');
Route::get('/diagnosticos/{codigo}/ver', 'DiagnosticoController@show');
Route::get('/diagnosticos/{codigo}/editar', 'DiagnosticoController@edit');
Route::put('/diagnosticos/{codigo}/actualizar', 'DiagnosticoController@update');
Route::get('/diagnosticos/{param_busqueda}/buscar', 'DiagnosticoController@buscar');


//Rutas para medicamentos
Route::get('/medicamentos', 'MedicamentoController@index');
Route::get('/medicamentos/crear', 'MedicamentoController@create');
Route::post('/medicamentos/guardar', 'MedicamentoController@store');
Route::get('/medicamentos/{codigo}/ver', 'MedicamentoController@show');
Route::get('/medicamentos/{codigo}/editar', 'MedicamentoController@edit');
Route::put('/medicamentos/{codigo}/actualizar', 'MedicamentoController@update');
Route::get('/medicamentos/{param_busqueda}/buscar', 'MedicamentoController@buscar');