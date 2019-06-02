const cacheName = 'v1';

const cacheAssets = [
    '/',
    'index.html',
    'scss/styles.css',
    'js/app.js',
    'js/homeButton.js',
    'js/fetch.js',
    'js/promise.js'
];


//Call Install Event
self.addEventListener('install', e =>{
    console.log('Service Worker: Installed');

    //Caching Assets
    e.waitUntil(    //Wait with finishing install event until Promise is finished
        caches
            .open(cacheName)    //opens Cache
            .then(cache =>{     //Cache-Object
                console.log('Service Worker: Caching files');
                cache.addAll(cacheAssets);  //put Assets-Array in Cache-Object
            })
            .then(()=> self.skipWaiting()) //Skips waiting after finished caching
    );
});

//Call Activate Event
self.addEventListener('activate', e =>{
    console.log('Service Worker: Activated');

   //Remove unwanted Caches
    e.waitUntil(
        //Loop through Caches, if current Cache isnt the Cache we are looping through, then delete it
        caches.keys().then(cacheNames =>{   
            return Promise.all(
                cacheNames.map(cache =>{        //Map through cache names
                    if(cache !== cacheName){    //If Cache we are looping through isnt the active Cache, delete it
                        console.log('Service Worker: Clearing old Cache');
                        return caches.delete(cache);    //Clearing old Cache
                    }
                })
            )
        })
    )
});


//Call Fetch Event
self.addEventListener('fetch', e=>{
    console.log('Service Worker: Fetching');

    e.respondWith(
        fetch(e.request).catch(()=> caches.match(e.request)) //if there is no connection to the network and initial request failes, then catch by loading e.request form the cache!
            .then((res)=>{
                caches.open('dynamic')
                    .then((cache)=>{
                        cache.put(e.request.url, res.clone())
                        return res;
                    })
            })

    );       
});




