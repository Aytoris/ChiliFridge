// Service Worker for ChiliFridge PWA - Client-Side Only
const CACHE_NAME = 'chilifridge-v2-standalone';
const urlsToCache = [
  './',
  './index.html',
  './css/styles.css',
  './js/recipesData.js',
  './js/api.js',
  './js/utility.js',
  './js/storeCategoriesData.js',
  './js/fridge.js',
  './js/meal.js',
  './js/grocery.js',
  './js/calendar.js',
  './manifest.json',
  './img/icon-192x192.svg',
  './img/icon-512x512.svg',
  'https://cdn.jsdelivr.net/npm/sortablejs@1.14.0/Sortable.min.js'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Cache installation failed:', error);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip API calls since we're now using localStorage
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the fetched response for future use
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // Offline fallback - return cached index.html
          return caches.match('./index.html');
        });
      })
  );
});

// Handle background sync (optional - for future enhancements)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Placeholder for syncing data when back online
  console.log('Syncing data...');
}

// Handle push notifications (optional - for future enhancements)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'ChiliFridge';
  const options = {
    body: data.body || 'You have a notification',
    icon: '/img/icon-192x192.png',
    badge: '/img/icon-192x192.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
