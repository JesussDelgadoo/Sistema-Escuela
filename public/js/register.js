document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const rol = document.getElementById('rol').value;
    const ref = document.getElementById('ref').value;
    const msgElement = document.getElementById('msg');

    const data = {
        email: email,
        password: password,
        rol: rol,
        id_referencia: ref
    };

    msgElement.textContent = "Procesando registro...";
    msgElement.style.color = "var(--muted)";

    fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                msgElement.textContent = "¡Cuenta creada con éxito!";
                msgElement.style.color = "var(--olive-600)";

                // Redirigimos al login después de un momento
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
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
