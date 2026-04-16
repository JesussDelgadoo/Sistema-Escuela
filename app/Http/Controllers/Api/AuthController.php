<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $usuario = DB::table('Usuarios')
            ->where('Email', $request->email)
            ->where('Password', $request->password)
            ->first();

        if ($usuario) {
            return response()->json([
                'success' => true,
                'rol' => $usuario->Rol,
                'id_ref' => $usuario->Id_referencia
            ]);
        }

        return response()->json(['success' => false, 'message' => 'Credenciales incorrectas'], 401);
    }

    public function register(Request $request)
    {
        try {
            DB::table('Usuarios')->insert([
                'Email' => $request->email,
                'Password' => $request->password,
                'Rol' => $request->rol,
                'Id_referencia' => $request->id_referencia
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Cuenta creada exitosamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al registrar: ' . $e->getMessage()
            ], 500);
        }
    }
}
