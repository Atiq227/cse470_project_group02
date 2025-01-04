<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // User Registration
    public function register(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'customerName' => 'required|string|max:255',
            'contactNumber' => 'required|digits_between:8,15|unique:customer,customer_contact', // Unique contact number
            'email' => 'required|email|unique:user,email', // Unique email
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
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
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Registration failed: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Registration failed due to a server error.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // User Login
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials',
            ], 401);
        }

        $user = Auth::user();

        // Retrieve customer details
        $customer = DB::table('customer')->where('customer_user_id', $user->user_id)->first();
        $customerName = $customer ? $customer->customer_name : 'Customer';

        // Create session and token
        $token = $user->createToken('UserLogin')->accessToken;
        session(['user_id' => $user->user_id, 'user_email' => $user->email, 'customer_name' => $customerName]);

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'user' => [
                'id' => $user->user_id,
                'email' => $user->email,
                'customerName' => $customerName,
            ],
            'token' => $token,
        ]);
    }

    // User Logout
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'status' => 'success',
            'message' => 'Logout successful',
        ], 200);
    }

    // User Profile
    public function profile()
    {
        if (!session('user_id')) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized access',
            ], 401);
        }

        $user = DB::table('user')
            ->join('customer', 'user.user_id', '=', 'customer.customer_user_id')
            ->where('user.user_id', session('user_id'))
            ->select('user.user_id', 'user.email', 'customer.customer_name', 'customer.customer_contact')
            ->first();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'user' => [
                'id' => $user->user_id,
                'email' => $user->email,
                'customerName' => $user->customer_name,
                'contactNumber' => $user->customer_contact,
            ],
        ]);
    }
}
