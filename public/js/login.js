document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('contrasena').value;
    const msgElement = document.getElementById('msg');

    const data = {
        email: email,
        password: password
    };

    msgElement.textContent = "Validando...";
    msgElement.style.color = "var(--muted)";

    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                localStorage.setItem('user_id', res.id_ref);
                localStorage.setItem('user_rol', res.rol);

                msgElement.textContent = "¡Acceso concedido!";
                msgElement.style.color = "var(--olive-600)";

                setTimeout(() => {
                    if (res.rol === 'Alumno') window.location.href = 'dashboard-alumno.html';
                    else if (res.rol === 'Docente') window.location.href = 'dashboard-docente.html';
                    else alert("Rol no reconocido");
                }, 800);
            } else {
                msgElement.textContent = res.message;
                msgElement.style.color = "var(--danger)";
            }
        })
        .catch(err => {
            console.error("Error:", err);
            msgElement.textContent = "Error de conexión con el servidor";
            msgElement.style.color = "var(--danger)";
        });
});
