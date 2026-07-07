const CACHE_NAME = 'brazo-ble-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Instalación y guardado en caché de los archivos básicos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activación
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

// Estrategia Offline: primero busca en caché, si no está va a la red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    })
  );
});
