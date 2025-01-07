<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class ModifyPriceController extends Controller
{
    public function updatePrice(Request $request, $id)
    {
        $request->validate([
            'item_price' => 'required|numeric|min:0',
        ]);

        $item = Item::findOrFail($id);
        $item->item_price = $request->input('item_price');
        $item->save();

        return response()->json(['message' => 'Item price updated successfully']);
    }
}