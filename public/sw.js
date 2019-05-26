self.addEventListener('install', function(event){
    console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', function(event){
    console.log('[Service Worker] Activating Service Worker ...', event);
    return self.clients.claim();
});

//Listen to non-livecycle-event
self.addEventListener('fetch', function(event){
    console.log("[Service Worker] Fetching something ...", event);
    event.respondWith(fetch(event.request)); //overwrite data which gets send back -> return fetch request
});