<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'customerName' => 'required|string|max:255',
            'contactNumber' => 'required|digits_between:8,15|unique:customer,customer_contact', // Ensuring unique contact number
            'email' => 'required|email|unique:user,email', // Ensuring unique email in the 'user' table
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            // Return detailed validation errors with a specific error type
            return response()->json([
                'status' => 'error',
                'type' => 'validation_error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400); // Return 400 if validation fails
        }

        try {
            DB::beginTransaction();

            // Insert user into 'user' table
            $userId = DB::table('user')->insertGetId([
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Insert customer data into 'customer' table
            DB::table('customer')->insert([
                'customer_user_id' => $userId,
                'customer_name' => $request->customerName,
                'customer_contact' => $request->contactNumber,
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully',
            ], 201); // Return success status if registration is successful
        } catch (\Exception $e) {
            DB::rollBack();

            // Log error details for debugging
            \Log::error('Registration failed: ' . $e->getMessage());

            // Return a more specific error type and message
            return response()->json([
                'status' => 'error',
                'type' => 'server_error',
                'message' => 'Registration failed due to a server error.',
                'error' => $e->getMessage() // Provide the exception message for debugging
            ], 500); // Return 500 if server error occurs
        }
    }
}
