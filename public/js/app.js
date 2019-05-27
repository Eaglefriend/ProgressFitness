var defferedPrompt;

window.addEventListener('load', async e =>{
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then(function() {
            console.log('Service worker registered!');
          });
      }
});

//prevent Add to Homescreen Install Banner Default to show at later point in time
window.addEventListener('beforeinstallprompt', function(event){
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    defferedPrompt = event; //store event in variable
    return false; //dont do anything upon this event
});