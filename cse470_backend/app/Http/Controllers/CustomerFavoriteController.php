<?php

namespace App\Http\Controllers;

use App\Models\CustomerFavorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Exception;

class CustomerFavoriteController extends Controller
{
    public function index($customerId)
    {
        try {
            Log::info('Fetching favorites for customer', ['customer_id' => $customerId]);

            $favorites = CustomerFavorite::where('customer_id', $customerId)
                ->with('item')
                ->get();

            if ($favorites->isEmpty()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'No favorites found',
                    'data' => []
                ], 200);
            }

            $favorites = $favorites->map(function ($favorite) {
                if ($favorite->item && $favorite->item->photo) {
                    $favorite->item->photo = base64_encode($favorite->item->photo);
                }
                return $favorite;
            });

            return response()->json([
                'status' => 'success',
                'data' => $favorites
            ], 200);

        } catch (Exception $e) {
            Log::error('Error fetching favorites:', [
                'customer_id' => $customerId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch favorite items',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'customer_id' => 'required|integer|exists:customer,customer_id',
                'item_id' => 'required|integer|exists:item,item_id'
            ]);

            $favorite = CustomerFavorite::create([
                'customer_id' => $validated['customer_id'],
                'item_id' => $validated['item_id']
            ]);

            Log::info('Item added to favorites', [
                'customer_id' => $validated['customer_id'],
                'item_id' => $validated['item_id']
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Item added to favorites successfully',
                'data' => $favorite
            ], 201);

        } catch (QueryException $e) {
            if ($e->getCode() == 23000) { // Integrity constraint violation
                return response()->json([
                    'success' => false,
                    'message' => 'Item is already in the favorites'
                ], 409);
            }

            Log::error('Database error:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($customerId, $itemId)
    {
        try {
            Log::info('Attempting to remove favorite', [
                'customer_id' => $customerId,
                'item_id' => $itemId
            ]);

            $favorite = CustomerFavorite::where('customer_id', $customerId)
                ->where('item_id', $itemId)
                ->first();

            if (!$favorite) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Favorite item not found'
                ], 404);
            }

            $favorite->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Item removed from favorites successfully'
            ], 200);

        } catch (QueryException $e) {
            Log::error('Database error removing favorite:', [
                'customer_id' => $customerId,
                'item_id' => $itemId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Database error occurred',
                'error' => $e->getMessage()
            ], 500);

        } catch (Exception $e) {
            Log::error('Error removing favorite:', [
                'customer_id' => $customerId,
                'item_id' => $itemId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to remove item from favorites',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}