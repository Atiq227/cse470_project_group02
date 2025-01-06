<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function show($id)
    {
        \Log::info('Customer ID lookup:', ['id' => $id]);
        
        try {
            $customer = Customer::where('customer_id', $id)->first();

            if ($customer) {
                return response()->json([
                    'customer_id' => $customer->customer_id,
                    'customer_name' => $customer->customer_name,
                    'contact' => $customer->customer_contact
                ], 200);
            } else {
                return response()->json(['message' => 'Customer not found'], 404);
            }
        } catch (\Exception $e) {
            \Log::error('Error fetching customer:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }
}