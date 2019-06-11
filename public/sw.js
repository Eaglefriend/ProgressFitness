/*const cacheName = 'v1';

const cacheAssets = [
    '/',
    'index.html',
    'scss/main.css',
    'js/app.js',
    'js/main.js',
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

*/

const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [    //store Request Urls -> later store as value for Assets the Response
    '/',
    '/index.html',
    '/js/app.js',
    '/js/main.js',
    '/js/homebutton.js',
    '/media/img/challenges_img/endurance_challenge.jpg',
    '/media/img/challenges_img/strength_challenge.jpg',
    '/media/img/challenges_img/mass_challenge.jpg',
    '/media/img/icons/',
    '/scss/main.css',
    'https://fonts.googleapis.com/css?family=Lato:300,400,400i,700,700i,900i&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js',
    'https://fonts.gstatic.com/s/lato/v15/S6u_w4BMUTPHjxsI5wq_Gwft.woff2',
    'https://fonts.gstatic.com/s/lato/v15/S6u_w4BMUTPHjxsI3wi_Gwft.woff2',
    'https://fonts.gstatic.com/s/lato/v15/S6uyw4BMUTPHjx4wXg.woff2',
    'https://fonts.gstatic.com/s/lato/v15/S6u9w4BMUTPHh7USSwiPGQ.woff2',
    'favicon.ico',
    '/pages/fallback.html'

];


// Cache Size Limit function
const limitCacheSize = (name, size)=>{
    caches.open(name).then(cache =>{
        cache.keys().then(keys =>{
            if(keys.length > size){
                cache.delete(keys[0])//delete oldest item
                .then(limitCacheSize(name,size));//recall function until length of keys !> size
            }
        })
    });
};


self.addEventListener('install', evt =>{
    //console.log('Service Worker installed!');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache=>{//open static caches
            console.log('Caching shell assets!');
            cache.addAll(assets);
        })
    );
    
});

self.addEventListener('activate', evt =>{
    //console.log('Service Worker activated!');
    evt.waitUntil(
        caches.keys().then(keys =>{ //go to all chaches and get keys
            //console.log(keys);
            return Promise.all(keys         //take Array of Promises with all keys and filter array
                .filter(key => key!== staticCacheName && key!==dynamicCacheName)//if names are not equal, it stays in Array
                .map(key => caches.delete(key))    //Map the key of leftover Array to Array of Promises and delete their cache
            )
        })
    );
});

self.addEventListener('fetch', evt =>{
    console.log('fetch event:', evt);

    evt.respondWith(//pause fetch event and instead respond with
        caches.match(evt.request)//is sth in cache that matches request?
            .then(cacheRes =>{
                return cacheRes || fetch(evt.request).then(fetchRes =>{ //if its not in the cachem, carry on initial Fetch Request to Server
                    return caches.open(dynamicCacheName).then(cache =>{//open Dynamic Cache
                        cache.put(evt.request.url, fetchRes.clone());//put clone of Response in dyn cache
                        limitCacheSize(dynamicCacheName, 15);//is cache over certain size? Here 15 items before deleting old cache items
                        return fetchRes;
                    })
                });
            })
            .catch(()=> {//Fallback if Page is not in Cache nor can be fetched from server because offline
                if(evt.request.url.indexOf('.html')>-1){//is requested offline stuff an html page?
                    return caches.match('pages/fallback.html');
                }
        })
    );
});