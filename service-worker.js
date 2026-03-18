// Self-destruct: clear all caches, claim clients, reload, and unregister
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    clients.claim()
    .then(() => caches.keys())
    .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
    .then(() => self.clients.matchAll())
    .then((cls) => cls.forEach((c) => c.navigate(c.url)))
    .then(() => self.registration.unregister())
  );
});