<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AlumnoController extends Controller
{
    public function getDesempeno($id)
    {
        try {
            $desempeno = DB::select('CALL sp_consultar_desempeno(?)', [$id]);

            return response()->json([
                'success' => true,
                'data' => $desempeno
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al consultar la base de datos: ' . $e->getMessage()
            ], 500);
        }
    }
}
