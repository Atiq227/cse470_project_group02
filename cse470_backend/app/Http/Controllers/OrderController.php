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

            // Calculating credits based on order amount
            $amount = $request->amount;
            $creditsToAdd = round(($amount / 500) * 100);
            
            // Add credits for all order amounts
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
                // Double decode to handle the double-encoded JSON
                $itemsString = json_decode($order->items);
                $items = json_decode($itemsString);

                return [
                    'order_id' => $order->order_id,
                    'items' => $items ?: [],
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
}