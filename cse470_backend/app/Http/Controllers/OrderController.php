<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Order;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        try {
            Log::info('Order request:', $request->all());
            
            $order = Order::create([
                'items' => json_encode($request->items),
                'customer_id' => $request->customer_id,
                'staff_id' => $request->staff_id,
                'chef_id' => $request->chef_id,
                'amount' => $request->amount,
                'payment_method' => $request->payment_method,
                'status' => $request->status,
                'feedback_rating' => 0,
                'feedback_comment' => ''
            ]);

            $amount = $request->amount;
            $creditsToAdd = round(($amount / 500) * 100);
            
            DB::table('customer')
                ->where('customer_id', $request->customer_id)
                ->increment('credit', $creditsToAdd);

            return response()->json([
                'success' => true,
                'message' => 'Order created successfully',
                'order_id' => $order->order_id,
                'credits_earned' => $creditsToAdd
            ], 201);

        } catch (\Exception $e) {
            Log::error('Order creation failed: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getPreviousOrders($customerId)
    {
        try {
            $orders = DB::table('order_table')
                ->where('customer_id', $customerId)
                ->get();

            $detailedOrders = $orders->map(function ($order) {
                return [
                    'order_id' => $order->order_id,
                    'items' => json_decode($order->items),
                    'amount' => $order->amount
                ];
            });

            return response()->json([
                'status' => 'success',
                'orders' => $detailedOrders
            ], 200);
        } catch (\Exception $e) {
            Log::error('Failed to fetch previous orders: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch previous orders',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function submitReview(Request $request)
    {
        try {
            $request->validate([
                'order_id' => 'required|exists:order_table,order_id',
                'rating' => 'required|integer|min:1|max:5',
                'comment' => 'required|string|max:255'
            ]);
    
            DB::table('order_table')
                ->where('order_id', $request->order_id)
                ->update([
                    'feedback_rating' => $request->rating,
                    'feedback_comment' => $request->comment
                ]);
    
            return response()->json([
                'status' => 'success',
                'message' => 'Review submitted successfully'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Review submission failed: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to submit review'
            ], 500);
        }
    }

    public function getStaffOrderHistory($staffId)
    {
        try {
            Log::info('Fetching orders for staff ID: ' . $staffId);

            $orders = DB::table('order_table')
                ->where('staff_id', $staffId)
                ->get();

            $detailedOrders = $orders->map(function ($order) {
                $customer = DB::table('customer')
                    ->where('customer_id', $order->customer_id)
                    ->first();

                $items = json_decode($order->items, true);
                if (is_string($items)) {
                    $items = json_decode($items, true);
                }

                return [
                    'order_id' => $order->order_id,
                    'customer_id' => $order->customer_id,
                    'customer_name' => $customer ? $customer->customer_name : 'Unknown',
                    'items' => $items,
                    'amount' => $order->amount
                ];
            });

            return response()->json([
                'status' => 'success',
                'orders' => $detailedOrders
            ], 200);

        } catch (\Exception $e) {
            Log::error('Failed to fetch staff orders: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch staff orders: ' . $e->getMessage()
            ], 500);
        }
    }
}