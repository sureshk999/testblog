// Define a cache name
const CACHE_NAME = 'my-site-cache-v1'

// Define the files to cache
const urlsToCache = ['/', '/index.html', '/css/style.css', '/js/app.js', '/images/logo.png']

// Install the service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache opened')
      return cache.addAll(urlsToCache)
    })
  )
})

// Fetch resources from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        // Found in cache, return cached response
        return response
      }
      // Not found in cache, fetch from network
      return fetch(event.request).then((response) => {
        // Cache the fetched resource
        const cacheCopy = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, cacheCopy)
        })
        return response
      })
    })
  )
})

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
        })
      )
    })
  )
})
