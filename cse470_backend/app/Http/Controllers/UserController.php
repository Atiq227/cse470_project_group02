<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User; // Add this line to import the User model

class UserController extends Controller
{
    // Method for user registration
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customerName' => 'required|string|max:255',
            'contactNumber' => 'required|digits_between:8,15|unique:customer,customer_contact',
            'email' => 'required|email|unique:user,email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'type' => 'validation_error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        try {
            DB::beginTransaction();

            $hashedPassword = Hash::make($request->password);
            \Log::info('Hashed Password: ' . $hashedPassword);

            $userId = DB::table('user')->insertGetId([
                'email' => $request->email,
                'password' => $hashedPassword,
            ]);

            DB::table('customer')->insert([
                'customer_user_id' => $userId,
                'customer_name' => $request->customerName,
                'customer_contact' => $request->contactNumber,
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully',
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Registration failed: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'type' => 'server_error',
                'message' => 'Registration failed due to a server error.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Method for user login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'type' => 'validation_error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::where('email', $request->email)->first();

        // Email not found
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'type' => 'email_error',
                'message' => 'Email address not found'
            ], 401);
        }

        // Wrong password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'type' => 'password_error',
                'message' => 'Incorrect password'
            ], 401);
        }

        // Retrieve customer name from the `customer` table
        $customer = DB::table('customer')
            ->where('customer_user_id', $user->user_id)
            ->first();
        
        $customerName = $customer ? $customer->customer_name : 'Customer';

        $token = $user->createToken('UserLogin')->accessToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'user' => [
                'id' => $user->user_id,
                'email' => $user->email,
                'customerName' => $customerName,
            ],
            'token' => $token,
        ], 200);
    }
}
