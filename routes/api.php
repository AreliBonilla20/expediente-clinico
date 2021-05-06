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

