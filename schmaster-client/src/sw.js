// public/sw.js

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/',
          '../index.html',
          '/globals.css',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      fetch(event.request).catch(error => {
        console.error('Fetch failed; returning offline page instead.', error);
        return caches.match(event.request)
          .then(response => response || caches.match('/offline.html'));
      })
    );
  });


// self.addEventListener('fetch', event => {
//   if (event.request.url.startsWith('https://13.200.203.23:3000/' || 'https://13.200.203.23')) {
//     // Skip handling these requests to test
//     return;
//   }

//   event.respondWith(
//     fetch(event.request).catch(error => {
//       console.error('Fetch failed; returning offline page instead.', error);
//       return caches.match(event.request)
//         .then(response => response || caches.match('/offline.html'));
//     })
//   );
// });

  
  