<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StaffComplaint;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class StaffComplaintController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'staff_id' => 'required|integer',
                'complaint_message' => 'required|string',
            ]);

            $complaint = StaffComplaint::create($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Complaint submitted successfully',
                'data' => $complaint
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
            Log::error('Error submitting complaint: ' . $e->getMessage(), [
                'request' => $request->all(),
                'exception' => $e
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while submitting the complaint',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}