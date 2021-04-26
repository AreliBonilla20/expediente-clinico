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

Route::get('/pacientes', 'PacienteController@index');
Route::post('/pacientes/crear', 'PacienteController@create');
Route::get('/pacientes/{id}/ver', 'PacienteController@show');
Route::get('/pacientes/{id}/editar', 'PacienteController@edit');
Route::put('/pacientes/{id}/actualizar', 'PacienteController@update');
Route::get('/pacientes/{id}/eliminar', 'PacienteController@delete');
