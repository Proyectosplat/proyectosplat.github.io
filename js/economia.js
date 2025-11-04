function obtenerHTMLEconomia() {
    return `
        <div class="calculadora-contenedor">
            <h2>💰 Economía</h2>
            <div class="submenu">
                <button class="btn-submenu activo" data-calc="interes-simple">Interés Simple</button>
                <button class="btn-submenu" data-calc="interes-compuesto">Interés Compuesto</button>
                <button class="btn-submenu" data-calc="inflacion">Inflación</button>
                <button class="btn-submenu" data-calc="van">VAN y TIR</button>
                <button class="btn-submenu" data-calc="amortizacion">Amortización</button>
                <button class="btn-submenu" data-calc="tipo-cambio">Tipo de Cambio</button>
            </div>
            
            <div id="calc-interes-simple" class="calculadora activa">
                <h3>Interés Simple</h3>
                <div class="form-grupo">
                    <label>Capital Inicial:</label>
                    <input type="number" id="capital-simple" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Tasa de Interés Anual (%):</label>
                    <input type="number" id="tasa-simple" step="0.01">
                </div>
                <div class="form-grupo">
                    <label>Tiempo (años):</label>
                    <input type="number" id="tiempo-simple" step="0.1">
                </div>
                <button class="btn-calcular" onclick="calcularInteresSimple()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('interes-simple')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('interes-simple')">📄 Exportar PDF</button>
                <div id="resultado-interes-simple" class="resultado"></div>
            </div>
            
            <div id="calc-interes-compuesto" class="calculadora">
                <h3>Interés Compuesto</h3>
                <div class="form-grupo">
                    <label>Capital Inicial:</label>
                    <input type="number" id="capital-compuesto" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Tasa de Interés Anual (%):</label>
                    <input type="number" id="tasa-compuesto" step="0.01">
                </div>
                <div class="form-grupo">
                    <label>Tiempo (años):</label>
                    <input type="number" id="tiempo-compuesto" step="0.1">
                </div>
                <div class="form-grupo">
                    <label>Frecuencia de capitalización:</label>
                    <select id="frecuencia-compuesto">
                        <option value="1">Anual</option>
                        <option value="2">Semestral</option>
                        <option value="4">Trimestral</option>
                        <option value="12">Mensual</option>
                        <option value="365">Diaria</option>
                    </select>
                </div>
                <button class="btn-calcular" onclick="calcularInteresCompuesto()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('interes-compuesto')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('interes-compuesto')">📄 Exportar PDF</button>
                <div id="resultado-interes-compuesto" class="resultado"></div>
                <canvas id="grafica-interes-compuesto" class="grafica-canvas"></canvas>
            </div>
            
            <div id="calc-inflacion" class="calculadora">
                <h3>Ajuste por Inflación</h3>
                <div class="form-grupo">
                    <label>Valor Inicial:</label>
                    <input type="number" id="valor-inicial-inflacion" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Tasa de Inflación Anual (%):</label>
                    <input type="number" id="tasa-inflacion" step="0.01">
                </div>
                <div class="form-grupo">
                    <label>Número de años:</label>
                    <input type="number" id="años-inflacion" step="0.1">
                </div>
                <button class="btn-calcular" onclick="calcularInflacion()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('inflacion')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('inflacion')">📄 Exportar PDF</button>
                <div id="resultado-inflacion" class="resultado"></div>
            </div>

            <div id="calc-van" class="calculadora">
                <h3>Valor Actual Neto (VAN) y TIR</h3>
                <div class="form-grupo">
                    <label>Inversión Inicial (negativo):</label>
                    <input type="number" id="inversion-inicial-van" placeholder="-10000">
                </div>
                <div class="form-grupo">
                    <label>Flujos de Efectivo (separados por comas):</label>
                    <input type="text" id="flujos-van" placeholder="Ej: 3000, 4000, 5000, 6000">
                </div>
                <div class="form-grupo">
                    <label>Tasa de Descuento (%):</label>
                    <input type="number" id="tasa-descuento" step="0.01" value="10">
                </div>
                <button class="btn-calcular" onclick="calcularVAN()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('van')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('van')">📄 Exportar PDF</button>
                <div id="resultado-van" class="resultado"></div>
                <canvas id="grafica-van" class="grafica-canvas"></canvas>
            </div>

            <div id="calc-amortizacion" class="calculadora">
                <h3>Tabla de Amortización</h3>
                <div class="form-grupo">
                    <label>Monto del Préstamo:</label>
                    <input type="number" id="monto-prestamo" placeholder="$">
                </div>
                <div class="form-grupo">
                    <label>Tasa de Interés Anual (%):</label>
                    <input type="number" id="tasa-prestamo" step="0.01">
                </div>
                <div class="form-grupo">
                    <label>Plazo (meses):</label>
                    <input type="number" id="plazo-prestamo">
                </div>
                <button class="btn-calcular" onclick="calcularAmortizacion()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('amortizacion')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('amortizacion')">📄 Exportar PDF</button>
                <div id="resultado-amortizacion" class="resultado"></div>
                <canvas id="grafica-amortizacion" class="grafica-canvas"></canvas>
            </div>

            <div id="calc-tipo-cambio" class="calculadora">
                <h3>Conversión de Divisas</h3>
                <div class="form-grupo">
                    <label>Monto:</label>
                    <input type="number" id="monto-divisa" placeholder="Cantidad">
                </div>
                <div class="form-grupo">
                    <label>De:</label>
                    <select id="divisa-origen">
                        <option value="MXN">Peso Mexicano (MXN)</option>
                        <option value="USD">Dólar Americano (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="GBP">Libra Esterlina (GBP)</option>
                        <option value="JPY">Yen Japonés (JPY)</option>
                        <option value="CAD">Dólar Canadiense (CAD)</option>
                    </select>
                </div>
                <div class="form-grupo">
                    <label>A:</label>
                    <select id="divisa-destino">
                        <option value="USD">Dólar Americano (USD)</option>
                        <option value="MXN">Peso Mexicano (MXN)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="GBP">Libra Esterlina (GBP)</option>
                        <option value="JPY">Yen Japonés (JPY)</option>
                        <option value="CAD">Dólar Canadiense (CAD)</option>
                    </select>
                </div>
                <div class="form-grupo">
                    <label>Tipo de Cambio:</label>
                    <input type="number" id="tipo-cambio-manual" step="0.0001" placeholder="Ej: 17.50">
                </div>
                <button class="btn-calcular" onclick="calcularTipoCambio()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('tipo-cambio')">💾 Guardar</button>
                <div id="resultado-tipo-cambio" class="resultado"></div>
            </div>
        </div>
    `;
}

function inicializarEconomia() {
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

function calcularInteresSimple() {
    const capital = parseFloat(document.getElementById('capital-simple').value);
    const tasa = parseFloat(document.getElementById('tasa-simple').value) / 100;
    const tiempo = parseFloat(document.getElementById('tiempo-simple').value);
    
    if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo)) {
        alert('Por favor, completa todos los campos con valores numéricos válidos');
        return;
    }
    
    const interes = capital * tasa * tiempo;
    const montoFinal = capital + interes;
    
    document.getElementById('resultado-interes-simple').innerHTML = `
        <h4>Resultado</h4>
        <p><strong>Capital Inicial:</strong> $${capital.toFixed(2)}</p>
        <p><strong>Interés Ganado:</strong> $${interes.toFixed(2)}</p>
        <p><strong>Monto Final:</strong> $${montoFinal.toFixed(2)}</p>
        <p><strong>Tasa Aplicada:</strong> ${(tasa * 100).toFixed(2)}% anual</p>
        <p><strong>Período:</strong> ${tiempo} años</p>
        <p style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #667eea;">
            <strong>Fórmula utilizada:</strong> I = C × r × t
        </p>
    `;
    document.getElementById('resultado-interes-simple').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('economia', 'interes-simple');
}

function calcularInteresCompuesto() {
    const capital = parseFloat(document.getElementById('capital-compuesto').value);
    const tasa = parseFloat(document.getElementById('tasa-compuesto').value) / 100;
    const tiempo = parseFloat(document.getElementById('tiempo-compuesto').value);
    const frecuencia = parseFloat(document.getElementById('frecuencia-compuesto').value);
    
    if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo)) {
        alert('Por favor, completa todos los campos con valores numéricos válidos');
        return;
    }
    
    const montoFinal = capital * Math.pow((1 + tasa / frecuencia), (frecuencia * tiempo));
    const interes = montoFinal - capital;
    const tasaEfectiva = Math.pow((1 + tasa / frecuencia), frecuencia) - 1;
    
    const nombreFrecuencia = {
        '1': 'Anual',
        '2': 'Semestral',
        '4': 'Trimestral',
        '12': 'Mensual',
        '365': 'Diaria'
    };
    
    document.getElementById('resultado-interes-compuesto').innerHTML = `
        <h4>Resultado</h4>
        <p><strong>Capital Inicial:</strong> $${capital.toFixed(2)}</p>
        <p><strong>Interés Ganado:</strong> $${interes.toFixed(2)}</p>
        <p><strong>Monto Final:</strong> $${montoFinal.toFixed(2)}</p>
        <p><strong>Capitalización:</strong> ${nombreFrecuencia[frecuencia]}</p>
        <p><strong>Tasa Nominal:</strong> ${(tasa * 100).toFixed(2)}% anual</p>
        <p><strong>Tasa Efectiva Anual:</strong> ${(tasaEfectiva * 100).toFixed(2)}%</p>
        <p><strong>Número de capitalizaciones:</strong> ${frecuencia * tiempo}</p>
        <p style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #667eea;">
            <strong>Fórmula utilizada:</strong> M = C(1 + r/n)^(n×t)
        </p>
    `;
    document.getElementById('resultado-interes-compuesto').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('economia', 'interes-compuesto');
    
    // Crear gráfica de crecimiento
    crearGraficaInteresCompuesto(capital, tasa, frecuencia, tiempo);
}

function crearGraficaInteresCompuesto(capital, tasa, frecuencia, tiempo) {
    const canvas = document.getElementById('grafica-interes-compuesto');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (canvas.chart) {
        canvas.chart.destroy();
    }
    
    canvas.style.display = 'block';
    
    const años = Math.ceil(tiempo);
    const labels = [];
    const datosCompuesto = [];
    const datosSimple = [];
    
    for (let i = 0; i <= años; i++) {
        labels.push(`Año ${i}`);
        const montoCompuesto = capital * Math.pow((1 + tasa / frecuencia), (frecuencia * i));
        const montoSimple = capital * (1 + tasa * i);
        datosCompuesto.push(montoCompuesto.toFixed(2));
        datosSimple.push(montoSimple.toFixed(2));
    }
    
    canvas.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Interés Compuesto',
                    data: datosCompuesto,
                    borderColor: 'rgba(102, 126, 234, 1)',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Interés Simple',
                    data: datosSimple,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.4,
                    fill: false,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparación: Interés Compuesto vs Simple',
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

function calcularInflacion() {
    const valorInicial = parseFloat(document.getElementById('valor-inicial-inflacion').value);
    const tasaInflacion = parseFloat(document.getElementById('tasa-inflacion').value) / 100;
    const años = parseFloat(document.getElementById('años-inflacion').value);
    
    if (isNaN(valorInicial) || isNaN(tasaInflacion) || isNaN(años)) {
        alert('Por favor, completa todos los campos con valores numéricos válidos');
        return;
    }
    
    const valorFuturo = valorInicial * Math.pow((1 + tasaInflacion), años);
    const perdidaPoderAdquisitivo = valorFuturo - valorInicial;
    const porcentajePerdida = (perdidaPoderAdquisitivo / valorInicial) * 100;
    const valorPresente = valorInicial / Math.pow((1 + tasaInflacion), años);
    const perdidaReal = valorInicial - valorPresente;
    const inflacionAcumulada = ((valorFuturo / valorInicial) - 1) * 100;
    
    document.getElementById('resultado-inflacion').innerHTML = `
        <h4>Resultado del Análisis de Inflación</h4>
        <p><strong>Valor Actual:</strong> $${valorInicial.toFixed(2)}</p>
        <p><strong>Necesitarás en el futuro:</strong> $${valorFuturo.toFixed(2)}</p>
        <p><strong>Incremento necesario:</strong> $${perdidaPoderAdquisitivo.toFixed(2)}</p>
        <p><strong>Porcentaje de incremento:</strong> ${porcentajePerdida.toFixed(2)}%</p>
        <p style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #667eea;">
            <strong>Poder adquisitivo:</strong><br>
            $${valorInicial.toFixed(2)} hoy equivaldrán a $${valorPresente.toFixed(2)} en ${años} años
        </p>
        <p><strong>Pérdida real de valor:</strong> $${perdidaReal.toFixed(2)}</p>
        <p><strong>Inflación acumulada:</strong> ${inflacionAcumulada.toFixed(2)}%</p>
        <p style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #667eea;">
            <strong>Interpretación:</strong><br>
            Para mantener el mismo poder adquisitivo, necesitarás $${valorFuturo.toFixed(2)} 
            dentro de ${años} años, considerando una inflación anual del ${(tasaInflacion * 100).toFixed(2)}%.
        </p>
    `;
    document.getElementById('resultado-inflacion').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('economia', 'inflacion');
}

function calcularVAN() {
    const inversionInicial = parseFloat(document.getElementById('inversion-inicial-van').value);
    const flujosInput = document.getElementById('flujos-van').value;
    const tasaDescuento = parseFloat(document.getElementById('tasa-descuento').value) / 100;
    
    const flujos = flujosInput.split(',').map(f => parseFloat(f.trim()));
    
    if (isNaN(inversionInicial) || flujos.some(isNaN) || isNaN(tasaDescuento)) {
        alert('Por favor, completa todos los campos con valores numéricos válidos');
        return;
    }
    
    // Calcular VAN
    let van = inversionInicial;
    for (let i = 0; i < flujos.length; i++) {
        van += flujos[i] / Math.pow(1 + tasaDescuento, i + 1);
    }
    
    // Calcular TIR (aproximación mediante Newton-Raphson)
    let tir = 0.1; // Valor inicial
    for (let iteracion = 0; iteracion < 100; iteracion++) {
        let f = inversionInicial;
        let df = 0;
        
        for (let i = 0; i < flujos.length; i++) {
            f += flujos[i] / Math.pow(1 + tir, i + 1);
            df -= (i + 1) * flujos[i] / Math.pow(1 + tir, i + 2);
        }
        
        const tirNueva = tir - f / df;
        if (Math.abs(tirNueva - tir) < 0.0001) {
            tir = tirNueva;
            break;
        }
        tir = tirNueva;
    }
    
    let decision = '';
    let color = '';
    if (van > 0) {
        decision = 'ACEPTAR - El proyecto genera valor';
        color = '#4CAF50';
    } else if (van < 0) {
        decision = 'RECHAZAR - El proyecto destruye valor';
        color = '#f44336';
    } else {
        decision = 'INDIFERENTE - El proyecto no agrega valor';
        color = '#FFC107';
    }
    
    document.getElementById('resultado-van').innerHTML = `
        <h4>Análisis de Inversión</h4>
        <p><strong>Inversión Inicial:</strong> $${inversionInicial.toFixed(2)}</p>
        <p><strong>Número de períodos:</strong> ${flujos.length}</p>
        <p><strong>Tasa de Descuento:</strong> ${(tasaDescuento * 100).toFixed(2)}%</p>
        <p style="font-size: 1.3rem; margin-top: 1rem; color: ${color};">
            <strong>VAN:</strong> $${van.toFixed(2)}
        </p>
        <p style="font-size: 1.3rem; color: #667eea;">
            <strong>TIR:</strong> ${(tir * 100).toFixed(2)}%
        </p>
        <p style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #667eea;">
            <strong>Decisión:</strong> <span style="color: ${color};">${decision}</span>
        </p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">
            ${tir > tasaDescuento ? '✅ La TIR es mayor que la tasa de descuento - Proyecto rentable' : '⚠️ La TIR es menor que la tasa de descuento - Proyecto no rentable'}
        </p>
    `;
    document.getElementById('resultado-van').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('economia', 'van');
    
    crearGraficaVAN(inversionInicial, flujos, tasaDescuento);
}

function crearGraficaVAN(inversionInicial, flujos, tasaDescuento) {
    const canvas = document.getElementById('grafica-van');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (canvas.chart) {
        canvas.chart.destroy();
    }
    
    canvas.style.display = 'block';
    
    const labels = ['Inicial', ...flujos.map((_, i) => `Período ${i + 1}`)];
    const datos = [inversionInicial, ...flujos];
    
    canvas.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Flujos de Efectivo ($)',
                data: datos,
                backgroundColor: datos.map(d => d >= 0 ? 'rgba(75, 192, 192, 0.7)' : 'rgba(255, 99, 132, 0.7)'),
                borderColor: datos.map(d => d >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Flujos de Efectivo del Proyecto',
                    font: { size: 16 }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Monto ($)'
                    }
                }
            }
        }
    });
}

function calcularAmortizacion() {
    const montoPrestamo = parseFloat(document.getElementById('monto-prestamo').value);
    const tasaAnual = parseFloat(document.getElementById('tasa-prestamo').value) / 100;
    const plazoMeses = parseInt(document.getElementById('plazo-prestamo').value);
    
    if (isNaN(montoPrestamo) || isNaN(tasaAnual) || isNaN(plazoMeses)) {
        alert('Por favor, completa todos los campos con valores numéricos válidos');
        return;
    }
    
    const tasaMensual = tasaAnual / 12;
    const pagoMensual = montoPrestamo * (tasaMensual * Math.pow(1 + tasaMensual, plazoMeses)) / (Math.pow(1 + tasaMensual, plazoMeses) - 1);
    
    let saldo = montoPrestamo;
    let totalIntereses = 0;
    let tablaHTML = '<table style="width: 100%; border-collapse: collapse; margin-top: 1rem;"><thead><tr style="background: #667eea; color: white;"><th style="padding: 0.5rem; border: 1px solid #ddd;">Mes</th><th style="padding: 0.5rem; border: 1px solid #ddd;">Pago</th><th style="padding: 0.5rem; border: 1px solid #ddd;">Interés</th><th style="padding: 0.5rem; border: 1px solid #ddd;">Capital</th><th style="padding: 0.5rem; border: 1px solid #ddd;">Saldo</th></tr></thead><tbody>';
    
    const datosIntereses = [];
    const datosCapital = [];
    
    for (let i = 1; i <= plazoMeses; i++) {
        const interesMes = saldo * tasaMensual;
        const capitalMes = pagoMensual - interesMes;
        saldo -= capitalMes;
        totalIntereses += interesMes;
        
        datosIntereses.push(interesMes);
        datosCapital.push(capitalMes);
        
        // Solo mostrar primeros 12 meses en la tabla
        if (i <= 12 || i === plazoMeses) {
            tablaHTML += `<tr><td style="padding: 0.5rem; border: 1px solid #ddd; text-align: center;">${i}</td><td style="padding: 0.5rem; border: 1px solid #ddd; text-align: right;">$${pagoMensual.toFixed(2)}</td><td style="padding: 0.5rem; border: 1px solid #ddd; text-align: right;">$${interesMes.toFixed(2)}</td><td style="padding: 0.5rem; border: 1px solid #ddd; text-align: right;">$${capitalMes.toFixed(2)}</td><td style="padding: 0.5rem; border: 1px solid #ddd; text-align: right;">$${Math.max(0, saldo).toFixed(2)}</td></tr>`;
        } else if (i === 13) {
            tablaHTML += `<tr><td colspan="5" style="padding: 0.5rem; border: 1px solid #ddd; text-align: center;">... (${plazoMeses - 13} meses más) ...</td></tr>`;
        }
    }
    
    tablaHTML += '</tbody></table>';
    
    const totalPagado = pagoMensual * plazoMeses;
    
    document.getElementById('resultado-amortizacion').innerHTML = `
        <h4>Tabla de Amortización</h4>
        <p><strong>Monto del Préstamo:</strong> $${montoPrestamo.toFixed(2)}</p>
        <p><strong>Pago Mensual:</strong> $${pagoMensual.toFixed(2)}</p>
        <p><strong>Total a Pagar:</strong> $${totalPagado.toFixed(2)}</p>
        <p><strong>Total Intereses:</strong> $${totalIntereses.toFixed(2)}</p>
        <p><strong>Plazo:</strong> ${plazoMeses} meses (${(plazoMeses/12).toFixed(1)} años)</p>
        <p><strong>Tasa Anual:</strong> ${(tasaAnual * 100).toFixed(2)}%</p>
        ${tablaHTML}
    `;
    document.getElementById('resultado-amortizacion').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('economia', 'amortizacion');
    
    crearGraficaAmortizacion(datosIntereses, datosCapital, plazoMeses);
}

function crearGraficaAmortizacion(datosIntereses, datosCapital, plazoMeses) {
    const canvas = document.getElementById('grafica-amortizacion');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (canvas.chart) {
        canvas.chart.destroy();
    }
    
    canvas.style.display = 'block';
    
    // Agrupar por años si hay muchos meses
    let labels, intereses, capital;
    if (plazoMeses > 24) {
        const añosCompletos = Math.floor(plazoMeses / 12);
        labels = [];
        intereses = [];
        capital = [];
        
        for (let año = 0; año < añosCompletos; año++) {
            labels.push(`Año ${año + 1}`);
            const inicio = año * 12;
            const fin = Math.min((año + 1) * 12, plazoMeses);
            
            let sumaIntereses = 0;
            let sumaCapital = 0;
            
            for (let i = inicio; i < fin; i++) {
                sumaIntereses += datosIntereses[i];
                sumaCapital += datosCapital[i];
            }
            
            intereses.push(sumaIntereses);
            capital.push(sumaCapital);
        }
        
        // Agregar meses restantes si hay
        if (plazoMeses % 12 !== 0) {
            labels.push('Parcial');
            const inicio = añosCompletos * 12;
            let sumaIntereses = 0;
            let sumaCapital = 0;
            
            for (let i = inicio; i < plazoMeses; i++) {
                sumaIntereses += datosIntereses[i];
                sumaCapital += datosCapital[i];
            }
            
            intereses.push(sumaIntereses);
            capital.push(sumaCapital);
        }
    } else {
        labels = datosIntereses.map((_, i) => `Mes ${i + 1}`);
        intereses = datosIntereses;
        capital = datosCapital;
    }
    
    canvas.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Interés',
                    data: intereses,
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Capital',
                    data: capital,
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Composición de Pagos',
                    font: { size: 16 }
                }
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Monto ($)'
                    }
                }
            }
        }
    });
}

function calcularTipoCambio() {
    const monto = parseFloat(document.getElementById('monto-divisa').value);
    const divisaOrigen = document.getElementById('divisa-origen').value;
    const divisaDestino = document.getElementById('divisa-destino').value;
    const tipoCambio = parseFloat(document.getElementById('tipo-cambio-manual').value);
    
    if (isNaN(monto) || isNaN(tipoCambio)) {
        alert('Por favor, completa todos los campos con valores numéricos válidos');
        return;
    }
    
    if (divisaOrigen === divisaDestino) {
        alert('Las divisas deben ser diferentes');
        return;
    }
    
    const resultado = monto * tipoCambio;
    const comision = resultado * 0.02; // 2% de comisión
    const totalConComision = resultado - comision;
    
    const nombresMonedas = {
        'MXN': 'Peso Mexicano',
        'USD': 'Dólar Americano',
        'EUR': 'Euro',
        'GBP': 'Libra Esterlina',
        'JPY': 'Yen Japonés',
        'CAD': 'Dólar Canadiense'
    };
    
    document.getElementById('resultado-tipo-cambio').innerHTML = `
        <h4>Conversión de Divisas</h4>
        <p><strong>Monto Original:</strong> ${monto.toFixed(2)} ${divisaOrigen}</p>
        <p><strong>De:</strong> ${nombresMonedas[divisaOrigen]}</p>
        <p><strong>A:</strong> ${nombresMonedas[divisaDestino]}</p>
        <p><strong>Tipo de Cambio:</strong> 1 ${divisaOrigen} = ${tipoCambio.toFixed(4)} ${divisaDestino}</p>
        <p style="font-size: 1.3rem; margin-top: 1rem; color: #667eea;">
            <strong>Resultado:</strong> ${resultado.toFixed(2)} ${divisaDestino}
        </p>
        <p style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #667eea;">
            <strong>Con comisión bancaria (2%):</strong>
        </p>
        <p><strong>Comisión:</strong> ${comision.toFixed(2)} ${divisaDestino}</p>
        <p><strong>Total a recibir:</strong> ${totalConComision.toFixed(2)} ${divisaDestino}</p>
    `;
    document.getElementById('resultado-tipo-cambio').classList.add('mostrar');
    registrarCalculo('economia', 'tipo-cambio');
}