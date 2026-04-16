<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AlumnoController;
use App\Http\Controllers\Api\DocenteController;
use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/docente/grupo/{id}', [DocenteController::class, 'getAlumnosGrupo']);
Route::post('/docente/calificar', [DocenteController::class, 'guardarCalificacion']);
Route::get('/docente/{id}/grupos', [DocenteController::class, 'getGrupos']);

Route::get('/alumnos/{id}/desempeno', [AlumnoController::class, 'getDesempeno']);
