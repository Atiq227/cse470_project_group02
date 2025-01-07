<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChefController;
use App\Http\Controllers\FoodItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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

Route::post('/login', [UserController::class, 'login']);

Route::post('/menu/add', [ChefController::class, 'addMenu']);
Route::post('/menu/item/add', [ChefController::class, 'addFoodItem']);
Route::delete('/menu/item/remove/{id}', [ChefController::class, 'removeFoodItem']);
Route::post('/order/{id}/accept', [ChefController::class, 'acceptOrder']);
Route::post('/order/{id}/decline', [ChefController::class, 'declineOrder']);
Route::post('/notify', [ChefController::class, 'sendNotification']);

Route::post('/food-items', [FoodItemController::class, 'store']); // Add food item
Route::delete('/food-items/{id}', [FoodItemController::class, 'destroy']); // Remove food item

Route::post('/orders/{id}/accept', [OrderController::class, 'accept']); // Accept order
Route::post('/orders/{id}/decline', [OrderController::class, 'decline']); // Decline order

Route::post('/notifications', [NotificationController::class, 'store']); // Send notification

Route::get('/csrf-cookie', function() {
    return response()->json(['message' => 'CSRF cookie set']);
})->middleware('web');

Route::middleware(['api'])->group(function () {
    Route::post('/register', 'App\Http\Controllers\UserController@register');
    Route::post('/login', 'App\Http\Controllers\UserController@login');
    Route::get('/food-items', 'App\Http\Controllers\FoodItemController@index');
});

Route::get('/test-db', function () {
    try {
        $users = DB::table('user')->get();
        return response()->json([
            'status' => 'success',
            'message' => 'Database connection successful',
            'data' => $users
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
});

// Temporary route to update password - remove this after using it
Route::get('/update-password', function() {
    DB::table('user')
        ->where('email', 'test@example.com')
        ->update([
            'password' => Hash::make('password')
        ]);
    
    return "Password updated";
});

Route::get('/food-items', [FoodItemController::class, 'index']);

Route::get('/orders', [ChefController::class, 'getOrders']);
Route::get('/staff', [ChefController::class, 'getStaffList']);

