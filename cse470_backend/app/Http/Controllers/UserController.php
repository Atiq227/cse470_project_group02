<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Staff;
use App\Models\Customer;

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
                'credit' => 0
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

    // Method to show customer details
    public function show($id)
    {
        $customer = Customer::where('customer_id', $id)->first();

        if ($customer) {
            return response()->json($customer, 200);
        } else {
            return response()->json(['message' => 'Customer not found'], 404);
        }
    }

    // Method for staff registration
    public function staffRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'staffName' => 'required|string|max:255',
            'contactNumber' => 'required|string|max:15',
            'email' => 'required|string|email|max:255|unique:user,email',
            'password' => 'required|string|min:8',
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

            $userId = DB::table('user')->insertGetId([
                'email' => $request->email,
                'password' => $hashedPassword,
            ]);

            DB::table('staff')->insert([
                'staff_user_id' => $userId,
                'staff_name' => $request->staffName,
                'staff_contact' => $request->contactNumber,
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Staff registered successfully',
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Staff registration failed: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'type' => 'server_error',
                'message' => 'Staff registration failed due to a server error.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Method for staff login
    public function staffLogin(Request $request)
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

        try {
            $user = DB::table('user')->where('email', $request->email)->first();

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

            // Fetch staff details
            $staff = DB::table('staff')
                ->where('staff_user_id', $user->user_id)
                ->first();

            if (!$staff) {
                return response()->json([
                    'status' => 'error',
                    'type' => 'auth_error',
                    'message' => 'Not authorized as staff'
                ], 401);
            }

            session([
                'user_id' => $user->user_id,
                'user_email' => $user->email,
                'staff_name' => $staff->staff_name,
                'staff_id' => $staff->staff_id,
                'staff_contact' => $staff->staff_contact
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->user_id,
                    'email' => $user->email,
                    'staffName' => $staff->staff_name,
                    'staffId' => $staff->staff_id,
                    'contactNumber' => $staff->staff_contact
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Staff login failed: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'type' => 'server_error',
                'message' => 'Login failed due to a server error.',
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

        try {
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

            // Check if user is staff
            $staff = DB::table('staff')
                ->where('staff_user_id', $user->user_id)
                ->first();

            if ($staff) {
                return response()->json([
                    'status' => 'error',
                    'type' => 'auth_error',
                    'message' => 'Please use staff login for staff accounts'
                ], 401);
            }

            // Fetch customer details from the customer table
            $customer = DB::table('customer')
                ->where('customer_user_id', $user->user_id)
                ->first();

            if (!$customer) {
                return response()->json([
                    'status' => 'error',
                    'type' => 'auth_error',
                    'message' => 'Not authorized as customer'
                ], 401);
            }

            $customerName = $customer->customer_name;
            $customerId = $customer->customer_id;
            $customerContact = $customer->customer_contact;
            $customerCredit = $customer->credit;

            // Log customer details for debugging
            \Log::info('Customer Details:', [
                'customer' => $customer,
                'customerId' => $customerId
            ]);

            session([
                'user_id' => $user->user_id,
                'user_email' => $user->email,
                'customer_name' => $customerName,
                'customer_id' => $customerId,
                'customer_contact' => $customerContact,
                'customer_credit' => $customerCredit
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->user_id,
                    'email' => $user->email,
                    'customerName' => $customerName,
                    'customerId' => $customerId,
                    'contactNumber' => $customerContact,
                    'credit' => $customerCredit
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Login failed: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'type' => 'server_error',
                'message' => 'Login failed due to a server error.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Method for user logout
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

    // Protected profile method
    public function profile()
    {
        if (!session('user_id')) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized access'
            ], 401);
        }

        $user = DB::table('user')
            ->join('customer', 'user.user_id', '=', 'customer.customer_user_id')
            ->where('user.user_id', session('user_id'))
            ->select('user.*', 'customer.customer_name', 'customer.customer_contact')
            ->first();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'user' => [
                'id' => $user->user_id,
                'email' => $user->email,
                'customerName' => $user->customer_name,
                'contactNumber' => $user->customer_contact
            ]
        ]);
    }
}