<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Rol;
use App\Permiso;
use Illuminate\Support\Facades\DB;

class MiddlewareController extends Controller
{
    public function verifyPermission(Request $request)
    {
        
        return response()->json(compact('verifyPermission'));
    }
}
