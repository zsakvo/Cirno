// set the prefix and suffix of our sw's name
workbox.core.setCacheNameDetails({
  prefix: 'cirno',
  suffix: 'v1.0.0'
})
// have our sw update and control a web page as soon as possible.
workbox.core.skipWaiting()
workbox.core.clientsClaim()

// vue-cli3.0 supports pwa with the help of workbox-webpack-plugin, we need to get the precacheing list through this sentence.
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

// cache our data, and use networkFirst strategy.
workbox.routing.registerRoute(/\/api/, new workbox.strategies.StaleWhileRevalidate())
