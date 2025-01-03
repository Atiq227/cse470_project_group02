<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

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

            // Calculate credits based on order amount
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
}