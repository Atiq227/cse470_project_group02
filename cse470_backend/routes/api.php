<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\StaffLeaveController;
use App\Http\Controllers\StaffComplaintController;
use App\Http\Controllers\StaffTaskController;
use App\Http\Controllers\CustomerFavoriteController;


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

Route::post('staff-register', [UserController::class, 'staffRegister']);

Route::post('staff-login', [UserController::class, 'staffLogin']);

Route::get('/customer/{id}', [CustomerController::class, 'show']);

Route::get('/staff-orders/{staffId}', [OrderController::class, 'getStaffOrderHistory']);

Route::post('staff-leave', [StaffLeaveController::class, 'store']);

Route::post('staff-complaint', [StaffComplaintController::class, 'store']);

Route::post('staff-task', [StaffTaskController::class, 'store']);

Route::put('staff-task/{id}/done', [StaffTaskController::class, 'markAsDone']);

Route::get('staff-tasks/{staffId}', [StaffTaskController::class, 'index']);

Route::get('customer-favorite/{customerId}', [CustomerFavoriteController::class, 'index']);
Route::post('customer-favorite', [CustomerFavoriteController::class, 'store']);
Route::delete('customer-favorite/{customerId}/{itemId}', [CustomerFavoriteController::class, 'destroy']);