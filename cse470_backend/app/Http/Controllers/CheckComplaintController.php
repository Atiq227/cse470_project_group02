<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckComplaintController extends Controller
{
    public function index()
    {
        $complaints = DB::table('staff_complaints')
            ->join('staff', 'staff_complaints.staff_id', '=', 'staff.staff_id')
            ->select('staff_complaints.complaint_id', 'staff_complaints.staff_id', 'staff.staff_name', 'staff_complaints.complaint_message')
            ->get();

        return response()->json($complaints);
    }
}