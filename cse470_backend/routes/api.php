<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChefController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [UserController::class, 'register']);

Route::post('/menu/add', [ChefController::class, 'addMenu']);
Route::post('/menu/item/add', [ChefController::class, 'addFoodItem']);
Route::delete('/menu/item/remove/{id}', [ChefController::class, 'removeFoodItem']);
Route::post('/order/{id}/accept', [ChefController::class, 'acceptOrder']);
Route::post('/order/{id}/decline', [ChefController::class, 'declineOrder']);
Route::post('/notify', [ChefController::class, 'sendNotification']);
Route::get('/homepage', [ChefController::class, 'homepage']);

