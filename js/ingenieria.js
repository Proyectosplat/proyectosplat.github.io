function obtenerHTMLIngenieria() {
    return `
        <div class="calculadora-contenedor">
            <h2>🔧 Ingeniería</h2>
            <div class="submenu">
                <button class="btn-submenu activo" data-calc="resistencias">Resistencias</button>
                <button class="btn-submenu" data-calc="ley-ohm">Ley de Ohm</button>
                <button class="btn-submenu" data-calc="conversion">Conversión</button>
                <button class="btn-submenu" data-calc="potencia">Potencia Eléctrica</button>
                <button class="btn-submenu" data-calc="capacitores">Capacitores</button>
                <button class="btn-submenu" data-calc="estadistica">Estadística</button>
            </div>
            
            <div id="calc-resistencias" class="calculadora activa">
                <h3>Calculadora de Resistencias</h3>
                <div class="form-grupo">
                    <label>Tipo de conexión:</label>
                    <select id="tipo-conexion">
                        <option value="serie">Serie</option>
                        <option value="paralelo">Paralelo</option>
                    </select>
                </div>
                <div class="form-grupo">
                    <label>Resistencias (separadas por comas, en Ω):</label>
                    <input type="text" id="resistencias" placeholder="Ej: 100, 200, 300">
                </div>
                <button class="btn-calcular" onclick="calcularResistencias()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('resistencias')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('resistencias')">📄 Exportar PDF</button>
                <div id="resultado-resistencias" class="resultado"></div>
                <canvas id="grafica-resistencias" class="grafica-canvas"></canvas>
            </div>
            
            <div id="calc-ley-ohm" class="calculadora">
                <h3>Ley de Ohm (V = I × R)</h3>
                <div class="form-grupo">
                    <label>Calcular:</label>
                    <select id="calcular-ohm">
                        <option value="voltaje">Voltaje (V)</option>
                        <option value="corriente">Corriente (I)</option>
                        <option value="resistencia">Resistencia (R)</option>
                    </select>
                </div>
                <div id="campos-ohm"></div>
                <button class="btn-calcular" onclick="calcularLeyOhm()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('ley-ohm')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('ley-ohm')">📄 Exportar PDF</button>
                <div id="resultado-ohm" class="resultado"></div>
            </div>
            
            <div id="calc-conversion" class="calculadora">
                <h3>Conversión de Unidades</h3>
                <div class="form-grupo">
                    <label>Tipo de conversión:</label>
                    <select id="tipo-conversion">
                        <option value="longitud">Longitud</option>
                        <option value="masa">Masa</option>
                        <option value="temperatura">Temperatura</option>
                        <option value="velocidad">Velocidad</option>
                        <option value="presion">Presión</option>
                    </select>
                </div>
                <div class="form-grupo">
                    <label>Valor:</label>
                    <input type="number" id="valor-conversion" placeholder="Ingrese el valor">
                </div>
                <div class="form-grupo">
                    <label>De:</label>
                    <select id="unidad-origen"></select>
                </div>
                <div class="form-grupo">
                    <label>A:</label>
                    <select id="unidad-destino"></select>
                </div>
                <button class="btn-calcular" onclick="convertirUnidades()">Convertir</button>
                <button class="btn-secundario" onclick="guardarCalculo('conversion')">💾 Guardar</button>
                <div id="resultado-conversion" class="resultado"></div>
            </div>

            <div id="calc-potencia" class="calculadora">
                <h3>Potencia Eléctrica</h3>
                <div class="form-grupo">
                    <label>Calcular:</label>
                    <select id="calcular-potencia">
                        <option value="potencia">Potencia (P)</option>
                        <option value="voltaje-p">Voltaje (V)</option>
                        <option value="corriente-p">Corriente (I)</option>
                    </select>
                </div>
                <div id="campos-potencia"></div>
                <button class="btn-calcular" onclick="calcularPotencia()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('potencia')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('potencia')">📄 Exportar PDF</button>
                <div id="resultado-potencia" class="resultado"></div>
            </div>

            <div id="calc-capacitores" class="calculadora">
                <h3>Capacitores en Serie/Paralelo</h3>
                <div class="form-grupo">
                    <label>Tipo de conexión:</label>
                    <select id="tipo-conexion-cap">
                        <option value="serie">Serie</option>
                        <option value="paralelo">Paralelo</option>
                    </select>
                </div>
                <div class="form-grupo">
                    <label>Capacitores (separados por comas, en μF):</label>
                    <input type="text" id="capacitores" placeholder="Ej: 10, 20, 30">
                </div>
                <button class="btn-calcular" onclick="calcularCapacitores()">Calcular</button>
                <button class="btn-secundario" onclick="guardarCalculo('capacitores')">💾 Guardar</button>
                <div id="resultado-capacitores" class="resultado"></div>
            </div>

            <div id="calc-estadistica" class="calculadora">
                <h3>Análisis Estadístico</h3>
                <div class="form-grupo">
                    <label>Datos (separados por comas):</label>
                    <input type="text" id="datos-estadistica" placeholder="Ej: 10, 20, 30, 40, 50">
                </div>
                <button class="btn-calcular" onclick="calcularEstadistica()">Analizar</button>
                <button class="btn-secundario" onclick="guardarCalculo('estadistica')">💾 Guardar</button>
                <button class="btn-secundario" onclick="exportarPDF('estadistica')">📄 Exportar PDF</button>
                <div id="resultado-estadistica" class="resultado"></div>
                <canvas id="grafica-estadistica" class="grafica-canvas"></canvas>
            </div>
        </div>
    `;
}

function inicializarIngenieria() {
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
    
    document.getElementById('calcular-ohm').addEventListener('change', actualizarCamposOhm);
    actualizarCamposOhm();
    
    document.getElementById('tipo-conversion').addEventListener('change', actualizarUnidades);
    actualizarUnidades();

    document.getElementById('calcular-potencia').addEventListener('change', actualizarCamposPotencia);
    actualizarCamposPotencia();
}

function calcularResistencias() {
    const tipo = document.getElementById('tipo-conexion').value;
    const resistenciasInput = document.getElementById('resistencias').value;
    const resistencias = resistenciasInput.split(',').map(r => parseFloat(r.trim()));
    
    if (resistencias.some(isNaN)) {
        alert('Por favor, ingrese valores numéricos válidos');
        return;
    }
    
    let resultado;
    if (tipo === 'serie') {
        resultado = resistencias.reduce((sum, r) => sum + r, 0);
    } else {
        resultado = 1 / resistencias.reduce((sum, r) => sum + 1/r, 0);
    }
    
    document.getElementById('resultado-resistencias').innerHTML = `
        <h4>Resultado</h4>
        <p><strong>Resistencia Total:</strong> ${resultado.toFixed(2)} Ω</p>
        <p><strong>Tipo:</strong> ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</p>
        <p><strong>Resistencias:</strong> ${resistencias.join(' Ω, ')} Ω</p>
        <p><strong>Número de resistencias:</strong> ${resistencias.length}</p>
    `;
    document.getElementById('resultado-resistencias').classList.add('mostrar');
    
    crearGraficaBarras('grafica-resistencias', resistencias, resultado, 'Resistencias (Ω)');
    // Registrar en estadísticas
    registrarCalculo('ingenieria', 'resistencias');
}

function actualizarCamposOhm() {
    const calcular = document.getElementById('calcular-ohm').value;
    const camposDiv = document.getElementById('campos-ohm');
    
    let html = '';
    if (calcular === 'voltaje') {
        html = `
            <div class="form-grupo">
                <label>Corriente (A):</label>
                <input type="number" id="corriente-ohm" step="0.01">
            </div>
            <div class="form-grupo">
                <label>Resistencia (Ω):</label>
                <input type="number" id="resistencia-ohm" step="0.01">
            </div>
        `;
    } else if (calcular === 'corriente') {
        html = `
            <div class="form-grupo">
                <label>Voltaje (V):</label>
                <input type="number" id="voltaje-ohm" step="0.01">
            </div>
            <div class="form-grupo">
                <label>Resistencia (Ω):</label>
                <input type="number" id="resistencia-ohm" step="0.01">
            </div>
        `;
    } else {
        html = `
            <div class="form-grupo">
                <label>Voltaje (V):</label>
                <input type="number" id="voltaje-ohm" step="0.01">
            </div>
            <div class="form-grupo">
                <label>Corriente (A):</label>
                <input type="number" id="corriente-ohm" step="0.01">
            </div>
        `;
    }
    
    camposDiv.innerHTML = html;
}

function calcularLeyOhm() {
    const calcular = document.getElementById('calcular-ohm').value;
    let resultado, formula;
    
    if (calcular === 'voltaje') {
        const i = parseFloat(document.getElementById('corriente-ohm').value);
        const r = parseFloat(document.getElementById('resistencia-ohm').value);
        resultado = i * r;
        formula = `V = ${i} A × ${r} Ω = ${resultado.toFixed(2)} V`;
    } else if (calcular === 'corriente') {
        const v = parseFloat(document.getElementById('voltaje-ohm').value);
        const r = parseFloat(document.getElementById('resistencia-ohm').value);
        resultado = v / r;
        formula = `I = ${v} V / ${r} Ω = ${resultado.toFixed(2)} A`;
    } else {
        const v = parseFloat(document.getElementById('voltaje-ohm').value);
        const i = parseFloat(document.getElementById('corriente-ohm').value);
        resultado = v / i;
        formula = `R = ${v} V / ${i} A = ${resultado.toFixed(2)} Ω`;
    }
    
    document.getElementById('resultado-ohm').innerHTML = `
        <h4>Resultado</h4>
        <p><strong>Fórmula aplicada:</strong> ${formula}</p>
        <p><strong>Ley de Ohm:</strong> V = I × R</p>
    `;
    document.getElementById('resultado-ohm').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('ingenieria', 'ley-ohm');
}

function actualizarUnidades() {
    const tipo = document.getElementById('tipo-conversion').value;
    const origenSelect = document.getElementById('unidad-origen');
    const destinoSelect = document.getElementById('unidad-destino');
    
    let opciones = [];
    if (tipo === 'longitud') {
        opciones = ['metros', 'kilómetros', 'centímetros', 'milímetros', 'millas', 'pies', 'pulgadas', 'yardas'];
    } else if (tipo === 'masa') {
        opciones = ['kilogramos', 'gramos', 'miligramos', 'libras', 'onzas', 'toneladas'];
    } else if (tipo === 'temperatura') {
        opciones = ['Celsius', 'Fahrenheit', 'Kelvin'];
    } else if (tipo === 'velocidad') {
        opciones = ['m/s', 'km/h', 'mph', 'nudos'];
    } else if (tipo === 'presion') {
        opciones = ['Pascal', 'Bar', 'PSI', 'atm', 'mmHg'];
    }
    
    origenSelect.innerHTML = opciones.map(o => `<option value="${o}">${o}</option>`).join('');
    destinoSelect.innerHTML = opciones.map(o => `<option value="${o}">${o}</option>`).join('');
}

function convertirUnidades() {
    const valor = parseFloat(document.getElementById('valor-conversion').value);
    const tipo = document.getElementById('tipo-conversion').value;
    const origen = document.getElementById('unidad-origen').value;
    const destino = document.getElementById('unidad-destino').value;
    
    let resultado;
    
    if (tipo === 'longitud') {
        const factores = {
            'metros': 1,
            'kilómetros': 0.001,
            'centímetros': 100,
            'milímetros': 1000,
            'millas': 0.000621371,
            'pies': 3.28084,
            'pulgadas': 39.3701,
            'yardas': 1.09361
        };
        resultado = valor * (factores[destino] / factores[origen]);
    } else if (tipo === 'masa') {
        const factores = {
            'kilogramos': 1,
            'gramos': 1000,
            'miligramos': 1000000,
            'libras': 2.20462,
            'onzas': 35.274,
            'toneladas': 0.001
        };
        resultado = valor * (factores[destino] / factores[origen]);
    } else if (tipo === 'temperatura') {
        if (origen === 'Celsius' && destino === 'Fahrenheit') {
            resultado = (valor * 9/5) + 32;
        } else if (origen === 'Celsius' && destino === 'Kelvin') {
            resultado = valor + 273.15;
        } else if (origen === 'Fahrenheit' && destino === 'Celsius') {
            resultado = (valor - 32) * 5/9;
        } else if (origen === 'Fahrenheit' && destino === 'Kelvin') {
            resultado = ((valor - 32) * 5/9) + 273.15;
        } else if (origen === 'Kelvin' && destino === 'Celsius') {
            resultado = valor - 273.15;
        } else if (origen === 'Kelvin' && destino === 'Fahrenheit') {
            resultado = ((valor - 273.15) * 9/5) + 32;
        } else {
            resultado = valor;
        }
    } else if (tipo === 'velocidad') {
        const factores = {
            'm/s': 1,
            'km/h': 3.6,
            'mph': 2.23694,
            'nudos': 1.94384
        };
        resultado = valor * (factores[destino] / factores[origen]);
    } else if (tipo === 'presion') {
        const factores = {
            'Pascal': 1,
            'Bar': 0.00001,
            'PSI': 0.000145038,
            'atm': 0.00000986923,
            'mmHg': 0.00750062
        };
        resultado = valor * (factores[destino] / factores[origen]);
        // Registrar en estadísticas
    registrarCalculo('ingenieria', 'conversion');
    }
    
    document.getElementById('resultado-conversion').innerHTML = `
        <h4>Resultado</h4>
        <p><strong>${valor} ${origen} = ${resultado.toFixed(6)} ${destino}</strong></p>
        <p><strong>Tipo de conversión:</strong> ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</p>
    `;
    document.getElementById('resultado-conversion').classList.add('mostrar');
}

function actualizarCamposPotencia() {
    const calcular = document.getElementById('calcular-potencia').value;
    const camposDiv = document.getElementById('campos-potencia');
    
    let html = '';
    if (calcular === 'potencia') {
        html = `
            <div class="form-grupo">
                <label>Voltaje (V):</label>
                <input type="number" id="voltaje-potencia" step="0.01">
            </div>
            <div class="form-grupo">
                <label>Corriente (A):</label>
                <input type="number" id="corriente-potencia" step="0.01">
            </div>
        `;
    } else if (calcular === 'voltaje-p') {
        html = `
            <div class="form-grupo">
                <label>Potencia (W):</label>
                <input type="number" id="potencia-valor" step="0.01">
            </div>
            <div class="form-grupo">
                <label>Corriente (A):</label>
                <input type="number" id="corriente-potencia" step="0.01">
            </div>
        `;
    } else {
        html = `
            <div class="form-grupo">
                <label>Potencia (W):</label>
                <input type="number" id="potencia-valor" step="0.01">
            </div>
            <div class="form-grupo">
                <label>Voltaje (V):</label>
                <input type="number" id="voltaje-potencia" step="0.01">
            </div>
        `;
    }
    
    camposDiv.innerHTML = html;
}

function calcularPotencia() {
    const calcular = document.getElementById('calcular-potencia').value;
    let resultado, formula;
    
    if (calcular === 'potencia') {
        const v = parseFloat(document.getElementById('voltaje-potencia').value);
        const i = parseFloat(document.getElementById('corriente-potencia').value);
        resultado = v * i;
        formula = `P = ${v} V × ${i} A = ${resultado.toFixed(2)} W`;
    } else if (calcular === 'voltaje-p') {
        const p = parseFloat(document.getElementById('potencia-valor').value);
        const i = parseFloat(document.getElementById('corriente-potencia').value);
        resultado = p / i;
        formula = `V = ${p} W / ${i} A = ${resultado.toFixed(2)} V`;
    } else {
        const p = parseFloat(document.getElementById('potencia-valor').value);
        const v = parseFloat(document.getElementById('voltaje-potencia').value);
        resultado = p / v;
        formula = `I = ${p} W / ${v} V = ${resultado.toFixed(2)} A`;
    }
    
    const kwh = (resultado / 1000).toFixed(4);
    
    document.getElementById('resultado-potencia').innerHTML = `
        <h4>Resultado</h4>
        <p><strong>Fórmula aplicada:</strong> ${formula}</p>
        <p><strong>En kW:</strong> ${kwh} kW</p>
        <p><strong>Fórmula base:</strong> P = V × I</p>
    `;
    document.getElementById('resultado-potencia').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('ingenieria', 'potencia');
}

function calcularCapacitores() {
    const tipo = document.getElementById('tipo-conexion-cap').value;
    const capacitoresInput = document.getElementById('capacitores').value;
    const capacitores = capacitoresInput.split(',').map(c => parseFloat(c.trim()));
    
    if (capacitores.some(isNaN)) {
        alert('Por favor, ingrese valores numéricos válidos');
        return;
    }
    
    let resultado;
    if (tipo === 'paralelo') {
        resultado = capacitores.reduce((sum, c) => sum + c, 0);
    } else {
        resultado = 1 / capacitores.reduce((sum, c) => sum + 1/c, 0);
    }
    
    document.getElementById('resultado-capacitores').innerHTML = `
        <h4>Resultado</h4>
        <p><strong>Capacitancia Total:</strong> ${resultado.toFixed(4)} μF</p>
        <p><strong>Tipo:</strong> ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</p>
        <p><strong>Capacitores:</strong> ${capacitores.join(' μF, ')} μF</p>
        <p><strong>Número de capacitores:</strong> ${capacitores.length}</p>
    `;
    document.getElementById('resultado-capacitores').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('ingenieria', 'capacitores');
}

function calcularEstadistica() {
    const datosInput = document.getElementById('datos-estadistica').value;
    const datos = datosInput.split(',').map(d => parseFloat(d.trim()));
    
    if (datos.some(isNaN)) {
        alert('Por favor, ingrese valores numéricos válidos');
        return;
    }
    
    const n = datos.length;
    const suma = datos.reduce((a, b) => a + b, 0);
    const media = suma / n;
    
    const datosOrdenados = [...datos].sort((a, b) => a - b);
    let mediana;
    if (n % 2 === 0) {
        mediana = (datosOrdenados[n/2 - 1] + datosOrdenados[n/2]) / 2;
    } else {
        mediana = datosOrdenados[Math.floor(n/2)];
    }
    
    const varianza = datos.reduce((sum, val) => sum + Math.pow(val - media, 2), 0) / n;
    const desviacion = Math.sqrt(varianza);
    
    const minimo = Math.min(...datos);
    const maximo = Math.max(...datos);
    const rango = maximo - minimo;
    
    document.getElementById('resultado-estadistica').innerHTML = `
        <h4>Análisis Estadístico</h4>
        <p><strong>Cantidad de datos:</strong> ${n}</p>
        <p><strong>Media (promedio):</strong> ${media.toFixed(4)}</p>
        <p><strong>Mediana:</strong> ${mediana.toFixed(4)}</p>
        <p><strong>Desviación estándar:</strong> ${desviacion.toFixed(4)}</p>
        <p><strong>Varianza:</strong> ${varianza.toFixed(4)}</p>
        <p><strong>Mínimo:</strong> ${minimo}</p>
        <p><strong>Máximo:</strong> ${maximo}</p>
        <p><strong>Rango:</strong> ${rango}</p>
    `;
    document.getElementById('resultado-estadistica').classList.add('mostrar');
    // Registrar en estadísticas
    registrarCalculo('ingenieria', 'estadistica');
    
    crearGraficaLinea('grafica-estadistica', datos, media);
}