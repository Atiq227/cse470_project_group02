<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StaffTask;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class StaffTaskController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'staff_id' => 'required|integer',
                'task_description' => 'required|string',
            ]);

            $task = StaffTask::create($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Task created successfully',
                'data' => $task
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
            Log::error('Error creating task: ' . $e->getMessage(), [
                'request' => $request->all(),
                'exception' => $e
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while creating the task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function markAsDone($id)
    {
        try {
            $task = StaffTask::findOrFail($id);
            $task->status = 1;
            $task->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Task marked as done',
                'data' => $task
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error marking task as done: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while marking the task as done',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index($staffId)
    {
        try {
            $tasks = StaffTask::where('staff_id', $staffId)->where('status', 0)->get();

            return response()->json([
                'status' => 'success',
                'data' => $tasks
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error fetching tasks: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while fetching the tasks',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}