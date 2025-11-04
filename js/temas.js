// Sistema de Temas Personalizables

const temas = {
    morado: {
        nombre: 'Morado Profesional',
        primary: '#667eea',
        secondary: '#764ba2',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        emoji: '💜'
    },
    azul: {
        nombre: 'Azul Océano',
        primary: '#2196F3',
        secondary: '#1976D2',
        background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
        emoji: '💙'
    },
    verde: {
        nombre: 'Verde Naturaleza',
        primary: '#4CAF50',
        secondary: '#388E3C',
        background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
        emoji: '💚'
    },
    naranja: {
        nombre: 'Naranja Energía',
        primary: '#FF5722',
        secondary: '#E64A19',
        background: 'linear-gradient(135deg, #FF5722 0%, #E64A19 100%)',
        emoji: '🧡'
    },
    rosa: {
        nombre: 'Rosa Moderno',
        primary: '#E91E63',
        secondary: '#C2185B',
        background: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
        emoji: '💗'
    },
    oscuro: {
        nombre: 'Modo Oscuro',
        primary: '#1a1a2e',
        secondary: '#16213e',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        emoji: '🌙'
    }
};

// Cargar tema guardado o usar morado por defecto
function cargarTema() {
    const temaGuardado = localStorage.getItem('tema-seleccionado') || 'morado';
    aplicarTema(temaGuardado);
}

// Aplicar tema
function aplicarTema(nombreTema) {
    const tema = temas[nombreTema];
    
    if (!tema) {
        console.error('Tema no encontrado:', nombreTema);
        return;
    }
    
    // Aplicar colores al documento
    document.documentElement.style.setProperty('--color-primary', tema.primary);
    document.documentElement.style.setProperty('--color-secondary', tema.secondary);
    document.body.style.background = tema.background;
    
    // Actualizar meta theme-color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
        metaTheme.setAttribute('content', tema.primary);
    }
    
    // Guardar preferencia
    localStorage.setItem('tema-seleccionado', nombreTema);
    
    // Actualizar botones activos
    actualizarBotonesActivos(nombreTema);
    
    // Notificación
    if (typeof mostrarNotificacion === 'function') {
        mostrarNotificacion(`${tema.emoji} Tema "${tema.nombre}" aplicado`);
    }
}

// Actualizar botones activos
function actualizarBotonesActivos(temaActivo) {
    const botones = document.querySelectorAll('.btn-tema');
    botones.forEach(btn => {
        if (btn.dataset.tema === temaActivo) {
            btn.classList.add('activo');
        } else {
            btn.classList.remove('activo');
        }
    });
}

// Crear selector de temas
function crearSelectorTemas() {
    const selector = document.createElement('div');
    selector.className = 'selector-temas';
    selector.innerHTML = `
        <button class="btn-abrir-temas" title="Cambiar Tema">
            🎨
        </button>
        <div class="panel-temas">
            <h3>🎨 Elige tu tema</h3>
            <div class="temas-grid">
                ${Object.keys(temas).map(key => `
                    <button class="btn-tema" data-tema="${key}" onclick="aplicarTema('${key}')">
                        <span class="tema-emoji">${temas[key].emoji}</span>
                        <span class="tema-nombre">${temas[key].nombre}</span>
                        <div class="tema-preview" style="background: ${temas[key].background}"></div>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(selector);
    
    // Toggle panel
    const btnAbrir = selector.querySelector('.btn-abrir-temas');
    const panel = selector.querySelector('.panel-temas');
    
    btnAbrir.addEventListener('click', () => {
        panel.classList.toggle('abierto');
    });
    
    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!selector.contains(e.target)) {
            panel.classList.remove('abierto');
        }
    });
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarTema();
    crearSelectorTemas();
});
