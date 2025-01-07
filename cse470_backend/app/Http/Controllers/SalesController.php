<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalesController extends Controller
{
    public function getTotalSales()
    {
        $totalSales = DB::table('order_table')
            ->sum('amount');

        return response()->json(['total_sales' => $totalSales]);
    }
}