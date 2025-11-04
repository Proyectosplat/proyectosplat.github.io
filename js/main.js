document.addEventListener('DOMContentLoaded', function() {
    const botonesMenu = document.querySelectorAll('.btn-menu');
    const contenedor = document.getElementById('contenedor-calculadoras');
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        mostrarNotificacion('👋 Bienvenido a Calculadoras Profesionales');
    }, 500);
    
    botonesMenu.forEach(boton => {
        boton.addEventListener('click', function() {
            botonesMenu.forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');
            
            const area = this.getAttribute('data-area');
            cargarArea(area);
        });
    });
    
    function cargarArea(area) {
        switch(area) {
            case 'ingenieria':
                contenedor.innerHTML = obtenerHTMLIngenieria();
                inicializarIngenieria();
                break;
            case 'contabilidad':
                contenedor.innerHTML = obtenerHTMLContabilidad();
                inicializarContabilidad();
                break;
            case 'economia':
                contenedor.innerHTML = obtenerHTMLEconomia();
                inicializarEconomia();
                break;
            case 'historial':
                mostrarVistaHistorial();
                break;
        }
    }
    
    // Atajos de teclado
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + H para historial
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            mostrarVistaHistorial();
        }
        
        // Ctrl/Cmd + S para guardar
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            const btnGuardar = document.querySelector('.btn-secundario');
            if (btnGuardar) {
                btnGuardar.click();
            }
        }
    });
});

function mostrarVistaHistorial() {
    const contenedor = document.getElementById('contenedor-calculadoras');
    const botonesMenu = document.querySelectorAll('.btn-menu');
    
    botonesMenu.forEach(b => b.classList.remove('activo'));
    const btnHistorial = document.querySelector('[data-area="historial"]');
    if (btnHistorial) {
        btnHistorial.classList.add('activo');
    }
    
    contenedor.innerHTML = `
        <div class="calculadora-contenedor">
            ${mostrarHistorial()}
            <div style="margin-top: 2rem; text-align: center;">
                <button class="btn-calcular" onclick="exportarHistorialExcel()" style="display: inline-block; width: auto; margin: 0.5rem;">
                    📊 Exportar a Excel
                </button>
                <button class="btn-calcular" onclick="exportarPDFCompleto()" style="display: inline-block; width: auto; margin: 0.5rem;">
                    📄 Exportar PDF Completo
                </button>
            </div>
        </div>
    `;
}

// Guardar estado antes de cerrar
window.addEventListener('beforeunload', function(e) {
    const historial = obtenerHistorial();
    if (historial.length > 0) {
        // Los navegadores modernos muestran un mensaje genérico
        e.preventDefault();
        e.returnValue = '';
    }
});