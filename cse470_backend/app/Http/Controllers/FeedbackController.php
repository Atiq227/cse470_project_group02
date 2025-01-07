<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FeedbackController extends Controller
{
    public function index()
    {
        $feedbacks = DB::table('order_table')
            ->join('customer', 'order_table.customer_id', '=', 'customer.customer_id')
            ->whereNotNull('feedback_rating')
            ->where('feedback_rating', '>', 0)
            ->whereNotNull('feedback_comment')
            ->where('feedback_comment', '!=', '')
            ->select('order_table.customer_id', 'customer.customer_id', 'customer.customer_name', 'feedback_rating', 'feedback_comment')
            ->get();

        return response()->json($feedbacks);
    }
}