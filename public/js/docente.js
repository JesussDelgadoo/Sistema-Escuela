const idUsuario = localStorage.getItem('user_id');
if (!idUsuario) window.location.href = 'login.html';

document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:8000/api/docente/${idUsuario}/grupos`)
        .then(res => res.json())
        .then(res => {
            const selector = document.getElementById('select-grupos');
            selector.innerHTML = '';

            if (res.success && res.data.length > 0) {
                res.data.forEach(grupo => {
                    const option = document.createElement('option');
                    option.value = grupo.Id_grupo;
                    option.textContent = grupo.Clave_grupo;
                    selector.appendChild(option);
                });

                cargarAlumnos(res.data[0].Id_grupo);
            } else {
                selector.innerHTML = '<option value="">Sin grupos asignados</option>';
            }
        })
        .catch(err => console.error("Error al obtener grupos:", err));

    document.getElementById('select-grupos').addEventListener('change', function() {
        cargarAlumnos(this.value);
    });
});

function cargarAlumnos(idGrupo) {
    const tabla = document.getElementById('tabla-alumnos');
    tabla.innerHTML = '<tr><td colspan="4" style="text-align:center;">Cargando lista...</td></tr>';

    fetch(`http://localhost:8000/api/docente/grupo/${idGrupo}`)
        .then(res => res.json())
        .then(res => {
            tabla.innerHTML = '';
            if (res.data.length === 0) {
                tabla.innerHTML = '<tr><td colspan="4" style="text-align:center;">No hay alumnos en este grupo.</td></tr>';
                return;
            }
            res.data.forEach(alumno => {
                tabla.innerHTML += `
                    <tr>
                        <td>${alumno.Id_inscripcion}</td>
                        <td style="font-weight:700;">${alumno.Nombre} ${alumno.Ap_paterno}</td>
                        <td>${alumno.Calificacion || '---'}</td>
                        <td>
                            <button class="btn" onclick="abrirModal(${alumno.Id_inscripcion}, ${alumno.Calificacion || 0})">
                                📝 Calificar
                            </button>
                        </td>
                    </tr>`;
            });
        });
}
function abrirModal(id, nota) {
    document.getElementById('input-inscripcion').value = id;
    document.getElementById('input-nota').value = nota;
    document.getElementById('modalCalificar').style.display = 'grid';
}

function cerrarModal() {
    document.getElementById('modalCalificar').style.display = 'none';
}

function enviarCalificacion() {
    const data = {
        id_inscripcion: document.getElementById('input-inscripcion').value,
        calificacion: document.getElementById('input-nota').value
    };

    fetch('http://localhost:8000/api/docente/calificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                location.reload();
            } else {
                alert("Error: " + res.message);
            }
        });
}
