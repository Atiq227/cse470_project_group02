<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Default route for the welcome page
Route::get('/', function () {
    return view('welcome');
});

// Group routes for user-related operations
Route::prefix('user')->group(function () {
    // User registration (GET for form, POST for submission)
    Route::get('/register', [UserController::class, 'registerForm'])->name('user.register.form');
    Route::post('/register', [UserController::class, 'register'])->name('user.register');

    // User login
    Route::post('/login', [UserController::class, 'login'])->name('user.login');

    // User logout
    Route::post('/logout', [UserController::class, 'logout'])->name('user.logout');

    // User profile
    Route::get('/profile', [UserController::class, 'profile'])->name('user.profile');
});
