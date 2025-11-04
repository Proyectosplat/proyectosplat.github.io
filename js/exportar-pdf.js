// Sistema de exportación a PDF usando jsPDF

function exportarPDF(tipoCalculo) {
    const resultadoDiv = document.getElementById(`resultado-${tipoCalculo}`);
    
    if (!resultadoDiv || !resultadoDiv.classList.contains('mostrar')) {
        mostrarNotificacion('⚠️ Primero debes realizar un cálculo', 'warning');
        return;
    }
    
    // Crear instancia de jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Configuración
    const margen = 20;
    let y = margen;
    
    // Título
    doc.setFontSize(20);
    doc.setTextColor(102, 126, 234);
    doc.text('Calculadoras Profesionales', margen, y);
    y += 10;
    
    // Subtítulo
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Reporte: ${tipoCalculo.toUpperCase()}`, margen, y);
    y += 10;
    
    // Fecha
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Fecha: ${new Date().toLocaleString('es-MX')}`, margen, y);
    y += 15;
    
    // Línea separadora
    doc.setDrawColor(102, 126, 234);
    doc.line(margen, y, 190, y);
    y += 10;
    
    // Contenido del resultado
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    // Extraer texto del HTML
    const textoResultado = resultadoDiv.innerText;
    const lineas = doc.splitTextToSize(textoResultado, 170);
    
    lineas.forEach(linea => {
        if (y > 270) {
            doc.addPage();
            y = margen;
        }
        doc.text(linea, margen, y);
        y += 7;
    });
    
    // Pie de página
    const totalPaginas = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPaginas; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
            `Página ${i} de ${totalPaginas} - Generado por Calculadoras Profesionales`,
            105,
            290,
            { align: 'center' }
        );
    }
    
    // Guardar PDF
    doc.save(`${tipoCalculo}_${Date.now()}.pdf`);
    mostrarNotificacion('✅ PDF generado exitosamente');
}

function exportarPDFCompleto() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const margen = 20;
    let y = margen;
    
    // Portada
    doc.setFontSize(24);
    doc.setTextColor(102, 126, 234);
    doc.text('Calculadoras Profesionales', 105, 100, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Reporte Completo de Cálculos', 105, 120, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Fecha: ${new Date().toLocaleString('es-MX')}`, 105, 140, { align: 'center' });
    
    // Agregar historial
    const historial = obtenerHistorial();
    
    if (historial.length === 0) {
        doc.addPage();
        doc.setFontSize(14);
        doc.text('No hay cálculos guardados en el historial', margen, 30);
    } else {
        historial.forEach((entrada, index) => {
            doc.addPage();
            y = margen;
            
            doc.setFontSize(16);
            doc.setTextColor(102, 126, 234);
            doc.text(`${index + 1}. ${entrada.tipo.toUpperCase()}`, margen, y);
            y += 10;
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(entrada.fecha, margen, y);
            y += 15;
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            
            const textoResultado = entrada.resultado.replace(/<[^>]*>/g, '\n');
            const lineas = doc.splitTextToSize(textoResultado, 170);
            
            lineas.forEach(linea => {
                if (y > 270) {
                    doc.addPage();
                    y = margen;
                }
                doc.text(linea, margen, y);
                y += 7;
            });
        });
    }
    
    doc.save(`reporte_completo_${Date.now()}.pdf`);
    mostrarNotificacion('✅ Reporte completo generado');
}