<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;

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

// User registration route
Route::post('register', [UserController::class, 'register']);

// User login route
Route::post('login', [UserController::class, 'login']);

// Menu items route
Route::get('/items', [ItemController::class, 'index']);

// Place order route
Route::post('/place-order', [OrderController::class, 'store']);

Route::get('/previous-orders/{customerId}', [OrderController::class, 'getPreviousOrders']);

Route::post('/submit-review', [OrderController::class, 'submitReview']);

Route::post('/logout', [UserController::class, 'logout']);