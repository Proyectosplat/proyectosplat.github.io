function obtenerHTMLContabilidad() {
    return `
        <div class="calculadora-contenedor">
            <h2>📊 Contabilidad</h2>
            <div class="submenu">
                <button class="btn-submenu activo" data-calc="depreciacion">Depreciación</button>
                <button class="btn-submenu" data-calc="punto-equilibrio">Punto de Equilibrio</button>
                <button class="btn-submenu" data-calc="iva">Cálculo de IVA</button>
                <button class="btn-submenu" data-calc="roi">ROI</button>
                <button class="btn-submenu" data-calc="flujo-caja">Flujo de Caja</button>
                <button class="btn-submenu" data-calc="razones">Razones Financieras</button>
            </div>
            
            <div id="calc-depreciacion" class="calculadora activa">
                <h3>Depreciación Lineal</h3>
                <div class="form-grupo">
                    <label>Valor del activo:</label>
                    <input type="number" id="valor-activo" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Valor residual:</label>
                    <input type="number" id="valor-residual" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Vida útil (años):</label>
                    <input type="number" id="vida-util">
                </div>
                <button class="btn-calcular" onclick="calcularDepreciacion()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('depreciacion')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('depreciacion')">📄 Exportar PDF</button>
                <div id="resultado-depreciacion" class="resultado"></div>
            </div>
            
            <div id="calc-punto-equilibrio" class="calculadora">
                <h3>Punto de Equilibrio</h3>
                <div class="form-grupo">
                    <label>Costos Fijos:</label>
                    <input type="number" id="costos-fijos" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Precio de Venta Unitario:</label>
                    <input type="number" id="precio-venta" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Costo Variable Unitario:</label>
                    <input type="number" id="costo-variable" placeholder="$">
                </div>
                <button class="btn-calcular" onclick="calcularPuntoEquilibrio()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('punto-equilibrio')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('punto-equilibrio')">📄 Exportar PDF</button>
                <div id="resultado-equilibrio" class="resultado"></div>
            </div>
            
            <div id="calc-iva" class="calculadora">
                <h3>Calculadora de IVA</h3>
                <div class="form-grupo">
                    <label>Operación:</label>
                    <select id="operacion-iva">
                        <option value="agregar">Agregar IVA</option>
                        <option value="quitar">Quitar IVA</option>
                    </select>
                </div>
                <div class="form-grupo">
                    <label>Monto:</label>
                    <input type="number" id="monto-iva" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Porcentaje IVA (%):</label>
                    <input type="number" id="porcentaje-iva" value="16">
                </div>
                <button class="btn-calcular" onclick="calcularIVA()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('iva')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('iva')">📄 Exportar PDF</button>
                <div id="resultado-iva" class="resultado"></div>
            </div>

            <div id="calc-roi" class="calculadora">
                <h3>Retorno de Inversión (ROI)</h3>
                <div class="form-grupo">
                    <label>Inversión Inicial:</label>
                    <input type="number" id="inversion-inicial" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Ganancia Total:</label>
                    <input type="number" id="ganancia-total" placeholder="$">
                </div>
                <button class="btn-calcular" onclick="calcularROI()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('roi')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('roi')">📄 Exportar PDF</button>
                <div id="resultado-roi" class="resultado"></div>
            </div>

            <div id="calc-flujo-caja" class="calculadora">
                <h3>Flujo de Caja</h3>
                <div class="form-grupo">
                    <label>Ingresos por período (separados por comas):</label>
                    <input type="text" id="ingresos-flujo" placeholder="Ej: 10000, 12000, 15000">
                </div>
                <div class="form-grupo">
                    <label>Egresos por período (separados por comas):</label>
                    <input type="text" id="egresos-flujo" placeholder="Ej: 8000, 9000, 11000">
                </div>
                <button class="btn-calcular" onclick="calcularFlujoCaja()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('flujo-caja')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('flujo-caja')">📄 Exportar PDF</button>
                <div id="resultado-flujo-caja" class="resultado"></div>
                <canvas id="grafica-flujo-caja" class="grafica-canvas"></canvas>
            </div>

            <div id="calc-razones" class="calculadora">
                <h3>Razones Financieras</h3>
                <div class="form-grupo">
                    <label>Activo Circulante:</label>
                    <input type="number" id="activo-circulante" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Pasivo Circulante:</label>
                    <input type="number" id="pasivo-circulante" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Inventarios:</label>
                    <input type="number" id="inventarios" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Utilidad Neta:</label>
                    <input type="number" id="utilidad-neta" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Ventas:</label>
                    <input type="number" id="ventas-razones" placeholder="$">
                </div>
                <button class="btn-calcular" onclick="calcularRazones()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('razones')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('razones')">📄 Exportar PDF</button>
                <div id="resultado-razones" class="resultado"></div>
            </div>
        </div>
    `;
}

function inicializarContabilidad() {
    const botonesSubmenu = document.querySelectorAll('.btn-submenu');
    const calculadoras = document.querySelectorAll('.calculadora');
    
    botonesSubmenu.forEach(boton => {
        boton.addEventListener('click', function() {
            botonesSubmenu.forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');
            
            const calc = this.getAttribute('data-calc');
            calculadoras.forEach(c => c.classList.remove('activa'));
            document.getElementById(`calc-${calc}`).classList.add('activa');
        });
    });
}

function calcularDepreciacion() {
    const valorActivo = parseFloat(document.getElementById('valor-activo').value);
    const valorResidual = parseFloat(document.getElementById('valor-residual').value);
    const vidaUtil = parseFloat(document.getElementById('vida-util').value);
    
    if (isNaN(valorActivo) || isNaN(valorResidual) || isNaN(vidaUtil)) {
        alert('Por favor, completa todos los campos con valores numéricos válidos');
        return;
    }
    
    const depreciacionAnual = (valorActivo - valorResidual) / vidaUtil;
    const depreciacionMensual = depreciacionAnual / 12;
    const tasaDepreciacion = (depreciacionAnual / valorActivo) * 100;
    
    document.getElementById('resultado-depreciacion').innerHTML = `
        <h4>Resultado</h4>
        <p><strong>Valor del Activo:</strong> $${valorActivo.toFixed(2)}</p>
        <p><strong>Valor Residual:</strong> $${valorResidual.toFixed(2)}</p>
        <p><strong>Valor Depreciable:</strong> $${(valorActivo - valorResidual).toFixed(2)}</p>
        <p><strong>Depreciación Anual:</strong> $${depreciacionAnual.toFixed(2)}</p>
        <p><strong>Depreciación Mensual:</strong> $${depreciacionMensual.toFixed(2)}</p>
        <p><strong>Tasa de Depreciación:</strong> ${tasaDepreciacion.toFixed(2)}%</p>
        <p><strong>Vida Útil:</strong> ${vidaUtil} años</p>
    `;
    document.getElementById('resultado-depreciacion').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('contabilidad', 'depreciacion');
}

function calcularPuntoEquilibrio() {
    const costosFijos = parseFloat(document.getElementById('costos-fijos').value);
    const precioVenta = parseFloat(document.getElementById('precio-venta').value);
    const costoVariable = parseFloat(document.getElementById('costo-variable').value);
    
    if (isNaN(costosFijos) || isNaN(precioVenta) || isNaN(costoVariable)) {
        alert('Por favor, completa todos los campos con valores numéricos válidos');
        return;
    }
    
    const margenContribucion = precioVenta - costoVariable;
    const puntoEquilibrio = costosFijos / margenContribucion;
    const ventasEquilibrio = puntoEquilibrio * precioVenta;
    const ratioMargen = (margenContribucion / precioVenta) * 100;
    
    document.getElementById('resultado-equilibrio').innerHTML = `
        <h4>Resultado</h4>
        <p><strong>Unidades en Punto de Equilibrio:</strong> ${Math.ceil(puntoEquilibrio)} unidades</p>
        <p><strong>Ventas en Punto de Equilibrio:</strong> $${ventasEquilibrio.toFixed(2)}</p>
        <p><strong>Margen de Contribución:</strong> $${margenContribucion.toFixed(2)} por unidad</p>
        <p><strong>Ratio de Margen:</strong> ${ratioMargen.toFixed(2)}%</p>
        <p style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #667eea;">
            <strong>Interpretación:</strong> Necesitas vender ${Math.ceil(puntoEquilibrio)} unidades 
            para cubrir todos tus costos (no ganancia ni pérdida).
        </p>
    `;
    document.getElementById('resultado-equilibrio').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('contabilidad', 'punto-equilibrio');
}

function calcularIVA() {
    const operacion = document.getElementById('operacion-iva').value;
    const monto = parseFloat(document.getElementById('monto-iva').value);
    const porcentaje = parseFloat(document.getElementById('porcentaje-iva').value) / 100;
    
    if (isNaN(monto) || isNaN(porcentaje)) {
        alert('Por favor, completa todos los campos con valores numéricos válidos');
        return;
    }
    
    let subtotal, iva, total;
    
    if (operacion === 'agregar') {
        subtotal = monto;
        iva = monto * porcentaje;
        total = monto + iva;
    } else {
        total = monto;
        subtotal = monto / (1 + porcentaje);
        iva = monto - subtotal;
    }
    
    document.getElementById('resultado-iva').innerHTML = `
        <h4>Resultado</h4>
        <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
        <p><strong>IVA (${(porcentaje * 100).toFixed(0)}%):</strong> $${iva.toFixed(2)}</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        <p><strong>Operación:</strong> ${operacion === 'agregar' ? 'IVA agregado' : 'IVA desglosado'}</p>
    `;
    document.getElementById('resultado-iva').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('contabilidad', 'iva');
}

function calcularROI() {
    const inversion = parseFloat(document.getElementById('inversion-inicial').value);
    const ganancia = parseFloat(document.getElementById('ganancia-total').value);
    
    if (isNaN(inversion) || isNaN(ganancia)) {
        alert('Por favor, completa todos los campos con valores numéricos válidos');
        return;
    }
    
    const roi = ((ganancia - inversion) / inversion) * 100;
    const utilidadNeta = ganancia - inversion;
    
    let clasificacion = '';
    let color = '';
    if (roi > 20) {
        clasificacion = 'Excelente';
        color = '#4CAF50';
    } else if (roi > 10) {
        clasificacion = 'Bueno';
        color = '#8BC34A';
    } else if (roi > 0) {
        clasificacion = 'Aceptable';
        color = '#FFC107';
    } else {
        clasificacion = 'Negativo - Pérdida';
        color = '#f44336';
    }
    
    document.getElementById('resultado-roi').innerHTML = `
        <h4>Resultado ROI (Return on Investment)</h4>
        <p><strong>Inversión Inicial:</strong> $${inversion.toFixed(2)}</p>
        <p><strong>Ganancia Total:</strong> $${ganancia.toFixed(2)}</p>
        <p><strong>Utilidad Neta:</strong> $${utilidadNeta.toFixed(2)}</p>
        <p style="font-size: 1.3rem; margin-top: 1rem; color: ${color};">
            <strong>ROI:</strong> ${roi.toFixed(2)}%
        </p>
        <p><strong>Clasificación:</strong> <span style="color: ${color};">${clasificacion}</span></p>
        <p style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #667eea;">
            <strong>Interpretación:</strong> Por cada $1 invertido, ${roi > 0 ? 'ganaste' : 'perdiste'} 
            $${Math.abs(roi/100).toFixed(2)}
        </p>
    `;
    document.getElementById('resultado-roi').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('contabilidad', 'roi');
}

function calcularFlujoCaja() {
    const ingresosInput = document.getElementById('ingresos-flujo').value;
    const egresosInput = document.getElementById('egresos-flujo').value;
    
    const ingresos = ingresosInput.split(',').map(i => parseFloat(i.trim()));
    const egresos = egresosInput.split(',').map(e => parseFloat(e.trim()));
    
    if (ingresos.some(isNaN) || egresos.some(isNaN)) {
        alert('Por favor, ingrese valores numéricos válidos separados por comas');
        return;
    }
    
    const totalIngresos = ingresos.reduce((sum, i) => sum + i, 0);
    const totalEgresos = egresos.reduce((sum, e) => sum + e, 0);
    const flujoNeto = totalIngresos - totalEgresos;
    
    const meses = Math.max(ingresos.length, egresos.length);
    const promedioIngreso = totalIngresos / ingresos.length;
    const promedioEgreso = totalEgresos / egresos.length;
    
    document.getElementById('resultado-flujo-caja').innerHTML = `
        <h4>Análisis de Flujo de Caja</h4>
        <p><strong>Total Ingresos:</strong> $${totalIngresos.toFixed(2)}</p>
        <p><strong>Total Egresos:</strong> $${totalEgresos.toFixed(2)}</p>
        <p style="font-size: 1.3rem; margin-top: 1rem;">
            <strong>Flujo Neto:</strong> 
            <span style="color: ${flujoNeto >= 0 ? '#4CAF50' : '#f44336'}">
                $${flujoNeto.toFixed(2)}
            </span>
        </p>
        <p><strong>Períodos analizados:</strong> ${meses}</p>
        <p><strong>Promedio Ingreso por período:</strong> $${promedioIngreso.toFixed(2)}</p>
        <p><strong>Promedio Egreso por período:</strong> $${promedioEgreso.toFixed(2)}</p>
        <p style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #667eea;">
            <strong>Estado:</strong> ${flujoNeto >= 0 ? '✅ Flujo Positivo - Situación favorable' : '⚠️ Flujo Negativo - Revisar gastos'}
        </p>
    `;
    document.getElementById('resultado-flujo-caja').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('contabilidad', 'flujo-caja');
    
    crearGraficaFlujoCaja('grafica-flujo-caja', ingresos, egresos);
}

function crearGraficaFlujoCaja(canvasId, ingresos, egresos) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (canvas.chart) {
        canvas.chart.destroy();
    }
    
    canvas.style.display = 'block';
    
    const maxLength = Math.max(ingresos.length, egresos.length);
    const labels = Array.from({length: maxLength}, (_, i) => `Período ${i + 1}`);
    
    canvas.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Ingresos',
                    data: ingresos,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Egresos',
                    data: egresos,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Flujo de Caja - Ingresos vs Egresos',
                    font: { size: 16 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Monto ($)'
                    }
                }
            }
        }
    });
}

function calcularRazones() {
    const activoCirculante = parseFloat(document.getElementById('activo-circulante').value);
    const pasivoCirculante = parseFloat(document.getElementById('pasivo-circulante').value);
    const inventarios = parseFloat(document.getElementById('inventarios').value);
    const utilidadNeta = parseFloat(document.getElementById('utilidad-neta').value);
    const ventas = parseFloat(document.getElementById('ventas-razones').value);
    
    if (isNaN(activoCirculante) || isNaN(pasivoCirculante) || isNaN(inventarios) || isNaN(utilidadNeta) || isNaN(ventas)) {
        alert('Por favor, completa todos los campos con valores numéricos válidos');
        return;
    }
    
    // Razón Circulante
    const razonCirculante = activoCirculante / pasivoCirculante;
    
    // Prueba Ácida
    const pruebaAcida = (activoCirculante - inventarios) / pasivoCirculante;
    
    // Margen de Utilidad
    const margenUtilidad = (utilidadNeta / ventas) * 100;
    
    // Capital de Trabajo
    const capitalTrabajo = activoCirculante - pasivoCirculante;
    
    let interpretacionCirculante = '';
    if (razonCirculante > 2) interpretacionCirculante = 'Excelente liquidez';
    else if (razonCirculante > 1) interpretacionCirculante = 'Buena liquidez';
    else interpretacionCirculante = 'Problemas de liquidez';
    
    document.getElementById('resultado-razones').innerHTML = `
        <h4>Razones Financieras</h4>
        <p><strong>Razón Circulante:</strong> ${razonCirculante.toFixed(2)}</p>
        <p style="font-size: 0.9rem; color: #666; margin-left: 1rem;">
            ${interpretacionCirculante} - Por cada $1 de deuda tienes $${razonCirculante.toFixed(2)} de activos
        </p>
        
        <p style="margin-top: 1rem;"><strong>Prueba Ácida:</strong> ${pruebaAcida.toFixed(2)}</p>
        <p style="font-size: 0.9rem; color: #666; margin-left: 1rem;">
            Liquidez inmediata sin depender de inventarios
        </p>
        
        <p style="margin-top: 1rem;"><strong>Margen de Utilidad:</strong> ${margenUtilidad.toFixed(2)}%</p>
        <p style="font-size: 0.9rem; color: #666; margin-left: 1rem;">
            Por cada $1 vendido, generas $${(margenUtilidad/100).toFixed(2)} de utilidad
        </p>
        
        <p style="margin-top: 1rem;"><strong>Capital de Trabajo:</strong> $${capitalTrabajo.toFixed(2)}</p>
        <p style="font-size: 0.9rem; color: #666; margin-left: 1rem;">
            Recursos disponibles para operación diaria
        </p>
    `;
    document.getElementById('resultado-razones').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('contabilidad', 'razones');
}