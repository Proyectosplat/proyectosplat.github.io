const CACHE_NAME = 'calculadoras-v2';
const urlsToCache = [
  './',
  './index.html',
  './css/styles.css',
  './js/main.js',
  './js/ingenieria.js',
  './js/contabilidad.js',
  './js/economia.js',
  './js/graficas.js',
  './js/historial.js',
  './js/exportar-pdf.js',
  './js/temas.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('⚙️ Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .then(() => console.log('✅ Archivos guardados en cache'))
      .catch(err => console.error('❌ Error al cachear archivos:', err))
  );
  self.skipWaiting();
});

// Activación y limpieza de caches antiguos
self.addEventListener('activate', event => {
  console.log('🔄 Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
  console.log('✅ Service Worker activado');
});

// Estrategia: Network First, fallback to Cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si la respuesta es válida, actualiza el cache
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, usa el cache
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Si no está en cache y es navegación, muestra página principal
         if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
