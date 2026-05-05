const CACHE_NAME = 'gelato-front';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './images/logo.webp',
    './images/logo64.png',
    './images/logo512.png',
    './images/banner.webp',
    './images/WPP.webp'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Fazendo whey no cache!');
            return cache.addAll(ASSETS);
        })
    );
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});
