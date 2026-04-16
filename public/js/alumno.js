const idUsuario = localStorage.getItem('user_id');
if (!idUsuario) window.location.href = 'login.html';

document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:8000/api/alumnos/${idUsuario}/desempeno`)
        .then(res => res.json())
        .then(res => {
            if (res.success && res.data.length > 0) {
                const info = res.data[0];
                document.getElementById('txt-saludo').textContent = `Hola, ${info.Nombre}`;

                document.getElementById('contenedor-kpis').innerHTML = `
                    <div class="kpi">
                        <div class="kpi__title">PROMEDIO GENERAL</div>
                        <div class="kpi__value">${info.promedio_general}</div>
                    </div>
                    <div class="kpi">
                        <div class="kpi__title">ESTATUS ACADÉMICO</div>
                        <div class="kpi__value" style="color: ${info.clasificacion === 'Aprobado' ? 'var(--olive-600)' : 'var(--danger)'}">
                            ${info.clasificacion}
                        </div>
                    </div>
                    <div class="kpi">
                        <div class="kpi__title">MATERIAS CURSADAS</div>
                        <div class="kpi__value">${info.materia_cursadas}</div>
                    </div>
                `;
            }
        });
});
