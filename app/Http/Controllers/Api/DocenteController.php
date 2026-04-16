<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DocenteController extends Controller
{
    public function getAlumnosGrupo($id_grupo)
    {
        $alumnos = DB::select("
            SELECT i.Id_inscripcion, a.Nombre, a.Ap_paterno, c.Calificacion
            FROM Inscripciones i
            JOIN Alumnos a ON i.Id_alumno = a.Id_alumno
            LEFT JOIN Calificaciones c ON i.Id_inscripcion = c.Id_inscripcion
            WHERE i.Id_grupo = ?
        ", [$id_grupo]);

        return response()->json(['success' => true, 'data' => $alumnos]);
    }

    public function guardarCalificacion(Request $request)
    {
        try {
            DB::statement('CALL sp_registrar_calificacion(?, ?)', [
                $request->id_inscripcion,
                $request->calificacion
            ]);

            return response()->json(['success' => true, 'message' => 'Calificación guardada']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function getGrupos($id_docente)
    {
        try {
            $grupos = DB::table('Grupos')
                ->where('Id_docente', $id_docente)
                ->select('Id_grupo', 'Clave_grupo')
                ->get();

            return response()->json(['success' => true, 'data' => $grupos]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
