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

Route::get('/expedientes', 'PacienteController@index');
Route::get('/expedientes/crear', 'PacienteController@create');
Route::post('/expedientes/guardar', 'PacienteController@store');
Route::get('/expedientes/{id}/ver', 'PacienteController@show');
Route::get('/expedientes/{id}/editar', 'PacienteController@edit');
Route::put('/expedientes/{id}/actualizar', 'PacienteController@update');
Route::get('/expedientes/{id}/eliminar', 'PacienteController@delete');
