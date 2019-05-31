var defferedPrompt;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>{
        navigator.serviceWorker
          .register('/sw.js')
          .then(reg => {
            console.log('Service worker: Registered!');
          })
          .catch(err => console.log(`Service Worker: Error: ${err}`))
      });
};

//prevent Add to Homescreen Install Banner Default to show at later point in time
window.addEventListener('beforeinstallprompt', function(event){
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    defferedPrompt = event; //store event in variable
    return false; //dont do anything upon this event
<<<<<<< HEAD
});
=======
});
*/
/*
var promise = new Promise(function(resolve, reject) {
  setTimeout(function(){
    //resolve('This is executed once the timer is done!');
    reject({code: 500, message: 'An error has ocurred!'});
  },3000);
});

*/
//Fetch API

//GET-Request
fetch('https://httpbin.org/ip')
  .then(function(response){
    console.log(response);
    return response.json();
  })
  .then(function(data){
    console.log(data);
  })
  .catch(function(err){
    console.log('Fetch error: ' + err);
  });

  //POST-Request
  fetch('https://httpbin.org/post', {
    //fetch Request
    method: 'POST',//Post request
    headers: {
      'Content-Type': 'application/json',//what kind of data we are sending
      'Accept': 'application/json'//Accept to get back Json-data
    },
    mode: 'cors',
    body: JSON.stringify({/*convert Javascript-Object into JSON-data*/ message: 'Does this work?'})//Data we want to send
  })
  .then(function(response){
    console.log(response);
    return response.json();//Extract data from Response
  })
  .then(function(data){
    console.log(data);//Output Data in log
  })
  .catch(function(err){
    console.log('Fetch error: ' + err);
  });
/*
promise.then(function(text){
  return text;
}, function(err){
  console.log(err.code, err.message)
}).then(function(newText){ 
  console.log("new text");
});
*/
/*
promise.then(function(text){
  return text;
}).then(function(newText){
    console.log(newText);
}).catch(function(err){
    console.log(err.code, err.message);
});
*/

/*console.log('This is executed right after setTimeout()');*/
>>>>>>> sw
