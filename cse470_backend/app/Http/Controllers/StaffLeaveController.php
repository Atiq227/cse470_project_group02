<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StaffLeave;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class StaffLeaveController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'staff_id' => 'required|integer',
                'reason' => 'required|string',
                'leave_from' => 'required|date|after_or_equal:today',
                'leave_to' => 'required|date|after_or_equal:leave_from',
            ]);

            $leave = StaffLeave::create($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Leave request submitted successfully',
                'data' => $leave
            ], 201);

        } catch (ValidationException $e) {
            Log::error('Validation error:', [
                'request' => $request->all(),
                'errors' => $e->errors()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            Log::error('Error submitting leave request: ' . $e->getMessage(), [
                'request' => $request->all(),
                'exception' => $e
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while submitting the leave request',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        try {
            $leaves = StaffLeave::all();
            return response()->json([
                'status' => 'success',
                'data' => $leaves
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error fetching leave requests: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch leave requests',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}