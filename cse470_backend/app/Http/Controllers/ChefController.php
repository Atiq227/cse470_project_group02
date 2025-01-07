<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ChefController extends Controller
{
    public function addMenu(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
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

            DB::table('menus')->insert([
                'name' => $request->name,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Menu added successfully',
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            \Log::error('Failed to add menu: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'type' => 'server_error',
                'message' => 'Failed to add menu due to a server error.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function addFoodItem(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'menu_id' => 'required|exists:menus,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'availability' => 'required|boolean',
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

            DB::table('menu_items')->insert([
                'menu_id' => $request->menu_id,
                'name' => $request->name,
                'price' => $request->price,
                'availability' => $request->availability,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Food item added successfully',
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            \Log::error('Failed to add food item: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'type' => 'server_error',
                'message' => 'Failed to add food item due to a server error.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function removeFoodItem($id)
    {
        try {
            $deleted = DB::table('menu_items')->where('id', $id)->delete();

            if (!$deleted) {
                return response()->json([
                    'status' => 'error',
                    'type' => 'not_found',
                    'message' => 'Food item not found',
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Food item removed successfully',
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Failed to remove food item: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'type' => 'server_error',
                'message' => 'Failed to remove food item due to a server error.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function acceptOrder($id)
    {
        try {
            $updated = DB::table('orders')->where('id', $id)->update([
                'status' => 'accepted',
                'updated_at' => now(),
            ]);

            if (!$updated) {
                return response()->json([
                    'status' => 'error',
                    'type' => 'not_found',
                    'message' => 'Order not found',
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Order accepted successfully',
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Failed to accept order: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'type' => 'server_error',
                'message' => 'Failed to accept order due to a server error.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function declineOrder($id)
    {
        try {
            $updated = DB::table('orders')->where('id', $id)->update([
                'status' => 'declined',
                'updated_at' => now(),
            ]);

            if (!$updated) {
                return response()->json([
                    'status' => 'error',
                    'type' => 'not_found',
                    'message' => 'Order not found',
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Order declined successfully',
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Failed to decline order: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'type' => 'server_error',
                'message' => 'Failed to decline order due to a server error.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function sendNotification(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'message' => 'required|string|max:500',
            'staff_ids' => 'required|array',
            'staff_ids.*' => 'required|exists:staff,id',
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
            foreach ($request->staff_ids as $staffId) {
                DB::table('notifications')->insert([
                    'staff_id' => $staffId,
                    'message' => $request->message,
                    'created_at' => now(),
                ]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Notification sent successfully',
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Failed to send notification: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'type' => 'server_error',
                'message' => 'Failed to send notification due to a server error.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
