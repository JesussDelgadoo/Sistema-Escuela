const idUsuario = localStorage.getItem('user_id');
if (!idUsuario) window.location.href = 'login.html';

document.addEventListener('DOMContentLoaded', () => {
    cargarAlumnos(1);
});

function cargarAlumnos(idGrupo) {
    fetch(`http://localhost:8000/api/docente/grupo/${idGrupo}`)
        .then(res => res.json())
        .then(res => {
            const tabla = document.getElementById('tabla-alumnos');
            tabla.innerHTML = '';
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
                alert("Calificación guardada correctamente");
                location.reload();
            } else {
                alert("Error: " + res.message);
            }
        });
}
