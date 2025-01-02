<?php

namespace App\Http\Controllers;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ItemController extends Controller
{
    public function index()
    {
        try {
            $items = Item::all()->map(function ($item) {
                $item->photo = base64_encode($item->photo);
                return $item;
            });
            return response()->json($items);
        } catch (\Exception $e) {
            Log::error('Failed to fetch items: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch items', 'message' => $e->getMessage()], 500);
        }
    }
}