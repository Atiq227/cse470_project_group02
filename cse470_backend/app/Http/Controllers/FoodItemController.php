<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class FoodItemController extends Controller
{
    public function index()
    {
        try {
            $foodItems = DB::table('item')
                ->select(['item_id', 'item_name', 'item_price'])
                ->get();

            \Log::info('Fetched food items:', ['count' => count($foodItems), 'items' => $foodItems]);

            return response()->json([
                'status' => 'success',
                'data' => [
                    'items' => $foodItems
                ]
            ]);

        } catch (\Exception $e) {
            \Log::error('Error fetching food items: ' . $e->getMessage());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching food items',
                'debug_message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
        ]);

        $foodItem = FoodItem::create($validated);
        return response()->json($foodItem, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FoodItem  $foodItem
     * @return \Illuminate\Http\Response
     */
    public function show(FoodItem $foodItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\FoodItem  $foodItem
     * @return \Illuminate\Http\Response
     */
    public function edit(FoodItem $foodItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FoodItem  $foodItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FoodItem $foodItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FoodItem  $foodItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(FoodItem $foodItem)
    {
        //
    }

    // Remove a food item by ID
    public function destroyById($id)
    {
        $foodItem = FoodItem::findOrFail($id);
        $foodItem->delete();
        return response()->json(['message' => 'Food item deleted'], 200);
    }
}