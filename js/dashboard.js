// Sistema de Dashboard y Estadísticas

const STATS_KEY = 'calculadoras_estadisticas';

// Obtener estadísticas
function obtenerEstadisticas() {
    const stats = localStorage.getItem(STATS_KEY);
    return stats ? JSON.parse(stats) : {
        totalCalculos: 0,
        calculosPorArea: {
            ingenieria: 0,
            contabilidad: 0,
            economia: 0
        },
        calculosPorTipo: {},
        ultimaActividad: null,
        primeraVez: new Date().toISOString(),
        diasActivo: 1
    };
}

// Guardar estadísticas
function guardarEstadisticas(stats) {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

// Registrar un cálculo
function registrarCalculo(area, tipo) {
    const stats = obtenerEstadisticas();
    
    stats.totalCalculos++;
    stats.calculosPorArea[area]++;
    
    if (!stats.calculosPorTipo[tipo]) {
        stats.calculosPorTipo[tipo] = 0;
    }
    stats.calculosPorTipo[tipo]++;
    
    stats.ultimaActividad = new Date().toISOString();
    
    // Calcular días activos
    const primeraVez = new Date(stats.primeraVez);
    const ahora = new Date();
    const diasTranscurridos = Math.floor((ahora - primeraVez) / (1000 * 60 * 60 * 24));
    stats.diasActivo = diasTranscurridos + 1;
    
    guardarEstadisticas(stats);
}

// Obtener HTML del Dashboard
function obtenerHTMLDashboard() {
    const stats = obtenerEstadisticas();
    const historial = obtenerHistorial();
    
    // Calcular calculadora más usada
    let calculadoraMasUsada = 'Ninguna';
    let maxUsos = 0;
    
    for (const [tipo, usos] of Object.entries(stats.calculosPorTipo)) {
        if (usos > maxUsos) {
            maxUsos = usos;
            calculadoraMasUsada = tipo;
        }
    }
    
    // Área más usada
    let areaMasUsada = 'Ninguna';
    let maxUsosArea = 0;
    
    for (const [area, usos] of Object.entries(stats.calculosPorArea)) {
        if (usos > maxUsosArea) {
            maxUsosArea = usos;
            areaMasUsada = area.charAt(0).toUpperCase() + area.slice(1);
        }
    }
    
    // Promedio de cálculos por día
    const promedioPorDia = stats.diasActivo > 0 ? 
        (stats.totalCalculos / stats.diasActivo).toFixed(1) : 0;
    
    return `
        <div class="dashboard-contenedor">
            <div class="dashboard-header">
                <h2>📊 Dashboard de Estadísticas</h2>
                <p>Resumen de tu actividad en la plataforma</p>
            </div>
            
            <!-- Tarjetas de Estadísticas -->
            <div class="stats-grid">
                <div class="stat-card card-morado">
                    <div class="stat-icono">🧮</div>
                    <div class="stat-info">
                        <div class="stat-numero">${stats.totalCalculos}</div>
                        <div class="stat-label">Cálculos Realizados</div>
                    </div>
                </div>
                
                <div class="stat-card card-azul">
                    <div class="stat-icono">📅</div>
                    <div class="stat-info">
                        <div class="stat-numero">${stats.diasActivo}</div>
                        <div class="stat-label">Días Activo</div>
                    </div>
                </div>
                
                <div class="stat-card card-verde">
                    <div class="stat-icono">📈</div>
                    <div class="stat-info">
                        <div class="stat-numero">${promedioPorDia}</div>
                        <div class="stat-label">Promedio por Día</div>
                    </div>
                </div>
                
                <div class="stat-card card-naranja">
                    <div class="stat-icono">💾</div>
                    <div class="stat-info">
                        <div class="stat-numero">${historial.length}</div>
                        <div class="stat-label">Guardados</div>
                    </div>
                </div>
            </div>
            
            <!-- Información Destacada -->
            <div class="info-destacada">
                <div class="info-item">
                    <div class="info-icono">🏆</div>
                    <div class="info-texto">
                        <strong>Calculadora Favorita</strong>
                        <span>${calculadoraMasUsada.toUpperCase()} (${maxUsos} usos)</span>
                    </div>
                </div>
                
                <div class="info-item">
                    <div class="info-icono">⭐</div>
                    <div class="info-texto">
                        <strong>Área Más Utilizada</strong>
                        <span>${areaMasUsada} (${maxUsosArea} cálculos)</span>
                    </div>
                </div>
                
                <div class="info-item">
                    <div class="info-icono">🕐</div>
                    <div class="info-texto">
                        <strong>Última Actividad</strong>
                        <span>${stats.ultimaActividad ? new Date(stats.ultimaActividad).toLocaleString('es-MX') : 'Sin actividad'}</span>
                    </div>
                </div>
            </div>
            
            <!-- Gráficas -->
            <div class="graficas-dashboard">
                <div class="grafica-contenedor">
                    <h3>📊 Cálculos por Área</h3>
                    <canvas id="grafica-areas"></canvas>
                </div>
                
                <div class="grafica-contenedor">
                    <h3>🔝 Top 5 Calculadoras</h3>
                    <canvas id="grafica-top-calculadoras"></canvas>
                </div>
            </div>
            
            <!-- Actividad Reciente -->
            <div class="actividad-reciente">
                <h3>🕐 Actividad Reciente</h3>
                ${historial.length > 0 ? `
                    <div class="lista-actividad">
                        ${historial.slice(0, 5).map(entrada => `
                            <div class="actividad-item">
                                <div class="actividad-icono">
                                    ${entrada.tipo === 'ingenieria' ? '🔧' : 
                                      entrada.tipo === 'contabilidad' ? '📊' : '💰'}
                                </div>
                                <div class="actividad-info">
                                    <strong>${entrada.tipo.toUpperCase()}</strong>
                                    <span>${entrada.fecha}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <p class="sin-actividad">No hay actividad reciente</p>
                `}
            </div>
            
            <!-- Botones de Acción -->
            <div class="dashboard-acciones">
                <button class="btn-dashboard" onclick="resetearEstadisticas()">
                    🔄 Resetear Estadísticas
                </button>
                <button class="btn-dashboard" onclick="exportarEstadisticas()">
                    📥 Exportar Datos
                </button>
            </div>
        </div>
    `;
}

// Mostrar Dashboard
function mostrarDashboard() {
    const contenedor = document.getElementById('contenedor-calculadoras');
    const botonesMenu = document.querySelectorAll('.btn-menu');
    
    botonesMenu.forEach(b => b.classList.remove('activo'));
    
    contenedor.innerHTML = obtenerHTMLDashboard();
    
    // Crear gráficas
    setTimeout(() => {
        crearGraficaAreas();
        crearGraficaTopCalculadoras();
    }, 100);
}

// Crear gráfica de áreas
function crearGraficaAreas() {
    const canvas = document.getElementById('grafica-areas');
    if (!canvas) return;
    
    const stats = obtenerEstadisticas();
    const ctx = canvas.getContext('2d');
    
    if (canvas.chart) {
        canvas.chart.destroy();
    }
    
    canvas.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Ingeniería', 'Contabilidad', 'Economía'],
            datasets: [{
                data: [
                    stats.calculosPorArea.ingenieria || 0,
                    stats.calculosPorArea.contabilidad || 0,
                    stats.calculosPorArea.economia || 0
                ],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Crear gráfica de top calculadoras
function crearGraficaTopCalculadoras() {
    const canvas = document.getElementById('grafica-top-calculadoras');
    if (!canvas) return;
    
    const stats = obtenerEstadisticas();
    const ctx = canvas.getContext('2d');
    
    if (canvas.chart) {
        canvas.chart.destroy();
    }
    
    // Ordenar y obtener top 5
    const topCalculadoras = Object.entries(stats.calculosPorTipo)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    if (topCalculadoras.length === 0) {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#999';
        ctx.textAlign = 'center';
        ctx.fillText('No hay datos aún', canvas.width / 2, canvas.height / 2);
        return;
    }
    
    canvas.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topCalculadoras.map(([nombre]) => nombre.toUpperCase()),
            datasets: [{
                label: 'Usos',
                data: topCalculadoras.map(([, usos]) => usos),
                backgroundColor: 'rgba(102, 126, 234, 0.7)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Resetear estadísticas
function resetearEstadisticas() {
    if (confirm('¿Estás seguro de que quieres resetear todas las estadísticas?\n\nEsto no afectará tu historial de cálculos guardados.')) {
        localStorage.removeItem(STATS_KEY);
        mostrarDashboard();
        mostrarNotificacion('✅ Estadísticas reseteadas correctamente');
    }
}

// Exportar estadísticas
function exportarEstadisticas() {
    const stats = obtenerEstadisticas();
    const dataStr = JSON.stringify(stats, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `estadisticas_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    mostrarNotificacion('✅ Estadísticas exportadas');
}

// Agregar botón de Dashboard al menú
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que el DOM esté completamente cargado
    setTimeout(() => {
        const menuPrincipal = document.querySelector('.menu-principal');
        if (menuPrincipal && !document.querySelector('[data-area="dashboard"]')) {
            const btnDashboard = document.createElement('button');
            btnDashboard.className = 'btn-menu';
            btnDashboard.setAttribute('data-area', 'dashboard');
            btnDashboard.innerHTML = '📊 Dashboard';
            btnDashboard.addEventListener('click', function() {
                document.querySelectorAll('.btn-menu').forEach(b => b.classList.remove('activo'));
                this.classList.add('activo');
                mostrarDashboard();
            });
            
            // Insertar antes del botón de Historial
            const btnHistorial = document.querySelector('[data-area="historial"]');
            if (btnHistorial) {
                menuPrincipal.insertBefore(btnDashboard, btnHistorial);
            } else {
                menuPrincipal.appendChild(btnDashboard);
            }
        }
    }, 100);
});