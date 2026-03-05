const CACHE_NAME = 'easymytools-v2032-core';
const urlsToCache = [
  '/',
  '/p/all-tools.html'
];

// Install Phase: App ka core data phone me save karta hai
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch Phase: Network bypass karke 0ms me file load karta hai
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Super-fast offline load
        }
        return fetch(event.request); // Agar pehli baar khol raha hai toh net se lega
      })
  );
});

// Activate Phase: Purana kachra clear karta hai
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
