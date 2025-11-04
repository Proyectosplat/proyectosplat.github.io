// Sistema de historial y guardado de cálculos

const HISTORIAL_KEY = 'calculadoras_historial';

function obtenerHistorial() {
    const historial = localStorage.getItem(HISTORIAL_KEY);
    return historial ? JSON.parse(historial) : [];
}

function guardarEnHistorial(tipo, datos, resultado) {
    const historial = obtenerHistorial();
    const fecha = new Date().toLocaleString('es-MX');
    
    const entrada = {
        id: Date.now(),
        tipo: tipo,
        fecha: fecha,
        datos: datos,
        resultado: resultado
    };
    
    historial.unshift(entrada);
    
    // Mantener solo los últimos 50 registros
    if (historial.length > 50) {
        historial.pop();
    }
    
    localStorage.setItem(HISTORIAL_KEY, JSON.stringify(historial));
    
    mostrarNotificacion('✅ Cálculo guardado en el historial');
}

function guardarCalculo(tipoCalculo) {
    const resultadoDiv = document.getElementById(`resultado-${tipoCalculo}`);
    if (!resultadoDiv || !resultadoDiv.classList.contains('mostrar')) {
        mostrarNotificacion('⚠️ Primero debes realizar un cálculo', 'warning');
        return;
    }
    
    const resultado = resultadoDiv.innerHTML;
    const datos = obtenerDatosCalculo(tipoCalculo);
    
    guardarEnHistorial(tipoCalculo, datos, resultado);
}

function obtenerDatosCalculo(tipo) {
    let datos = {};
    
    switch(tipo) {
        case 'resistencias':
            datos = {
                tipo: document.getElementById('tipo-conexion')?.value,
                resistencias: document.getElementById('resistencias')?.value
            };
            break;
        case 'ley-ohm':
            datos = {
                calcular: document.getElementById('calcular-ohm')?.value
            };
            break;
        case 'depreciacion':
            datos = {
                valorActivo: document.getElementById('valor-activo')?.value,
                valorResidual: document.getElementById('valor-residual')?.value,
                vidaUtil: document.getElementById('vida-util')?.value
            };
            break;
        case 'interes-simple':
            datos = {
                capital: document.getElementById('capital-simple')?.value,
                tasa: document.getElementById('tasa-simple')?.value,
                tiempo: document.getElementById('tiempo-simple')?.value
            };
            break;
    }
    
    return datos;
}

function mostrarHistorial() {
    const historial = obtenerHistorial();
    
    if (historial.length === 0) {
        return '<div class="historial-vacio"><p>No hay cálculos guardados</p></div>';
    }
    
    let html = '<div class="historial-contenedor">';
    html += '<h3>📋 Historial de Cálculos</h3>';
    html += '<button class="btn-limpiar" onclick="limpiarHistorial()">🗑️ Limpiar Historial</button>';
    
    historial.forEach((entrada, index) => {
        html += `
            <div class="entrada-historial">
                <div class="entrada-header">
                    <strong>${entrada.tipo.toUpperCase()}</strong>
                    <span class="entrada-fecha">${entrada.fecha}</span>
                </div>
                <div class="entrada-contenido">
                    ${entrada.resultado}
                </div>
                <button class="btn-eliminar-entrada" onclick="eliminarEntrada(${entrada.id})">
                    🗑️ Eliminar
                </button>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

function eliminarEntrada(id) {
    const historial = obtenerHistorial();
    const nuevoHistorial = historial.filter(e => e.id !== id);
    localStorage.setItem(HISTORIAL_KEY, JSON.stringify(nuevoHistorial));
    
    // Recargar vista de historial si está activa
    const contenedor = document.getElementById('contenedor-calculadoras');
    if (contenedor.querySelector('.historial-contenedor')) {
        contenedor.innerHTML = mostrarHistorial();
    }
    
    mostrarNotificacion('✅ Entrada eliminada');
}

function limpiarHistorial() {
    if (confirm('¿Estás seguro de que quieres eliminar todo el historial?')) {
        localStorage.removeItem(HISTORIAL_KEY);
        const contenedor = document.getElementById('contenedor-calculadoras');
        contenedor.innerHTML = mostrarHistorial();
        mostrarNotificacion('✅ Historial limpiado');
    }
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    // Remover notificación anterior si existe
    const notifAnterior = document.querySelector('.notificacion');
    if (notifAnterior) {
        notifAnterior.remove();
    }
    
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.classList.add('mostrar');
    }, 10);
    
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}

function exportarHistorialExcel() {
    const historial = obtenerHistorial();
    
    if (historial.length === 0) {
        mostrarNotificacion('⚠️ No hay datos para exportar', 'warning');
        return;
    }
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Tipo,Fecha,Datos,Resultado\n";
    
    historial.forEach(entrada => {
        const datosStr = JSON.stringify(entrada.datos).replace(/,/g, ';');
        const resultadoStr = entrada.resultado.replace(/<[^>]*>/g, ' ').replace(/,/g, ';');
        csvContent += `"${entrada.tipo}","${entrada.fecha}","${datosStr}","${resultadoStr}"\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `historial_calculadoras_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    mostrarNotificacion('✅ Historial exportado a Excel');
}