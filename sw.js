// Import the Workbox libraries
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'

// Precache all static assets
precacheAndRoute(self.__WB_MANIFEST)

// Cache API requests with the NetworkFirst strategy
registerRoute(({ url }) => url.origin === 'https://api.example.com', new NetworkFirst())
