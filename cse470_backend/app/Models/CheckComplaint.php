<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckComplaint extends Model
{
    use HasFactory;

    protected $table = 'staff_complaints';

    protected $primaryKey = 'complaint_id';

    protected $fillable = [
        'staff_id',
        'complaint_text',
        'created_at'
    ];

    public $timestamps = false;
}