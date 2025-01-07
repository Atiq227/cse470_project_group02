<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UserController
{
    public function register(Request $request)
    {
        try {
            // Validate input
            $validated = $request->validate([
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6'
            ]);

            // Debug log
            \Log::info('Registration attempt', ['data' => $request->only('email')]);

            // Create user
            $userId = DB::table('user')->insertGetId([
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'created_at' => now(),
                'updated_at' => now()
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Registration successful',
                'user' => [
                    'user_id' => $userId,
                    'email' => $validated['email']
                ]
            ], 201);

        } catch (ValidationException $e) {
            \Log::error('Validation error', ['errors' => $e->errors()]);
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Registration error', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 