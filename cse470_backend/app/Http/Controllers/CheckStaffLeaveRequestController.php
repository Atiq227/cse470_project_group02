<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckStaffLeaveRequestController extends Controller
{
    public function index()
    {
        $leaveRequests = DB::table('staff_leave')
            ->join('staff', 'staff_leave.staff_id', '=', 'staff.staff_id')
            ->select('staff.staff_id', 'staff_leave.leave_id', 'staff.staff_name', 'staff_leave.reason', 'staff_leave.leave_from', 'staff_leave.leave_to')
            ->get();

        return response()->json($leaveRequests);
    }
}