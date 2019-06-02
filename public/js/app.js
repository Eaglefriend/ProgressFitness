var defferedPrompt;

if(!window.Promise){
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>{
        navigator.serviceWorker
          .register('sw.js')
          .then(reg => {
            console.log('Service worker: Registered!');
          })
          .catch(err => console.log(`Service Worker: Error: ${err}`))
      });
};

/*
//prevent Add to Homescreen Install Banner Default to show at later point in time
window.addEventListener('beforeinstallprompt', function(event){
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    defferedPrompt = event; //store event in variable
    return false; //dont do anything upon this event

});
*/

