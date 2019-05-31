/*let athsb = document.querySelector('#athsb');


const openAddToHomescreenBanner =()=>{
    if(defferedPrompt){
        athsb.style.opacity="0";
        defferedPrompt.prompt();//will show banner



        deferredPrompt.userChoice.then(function(choiceResult){
            console.log(choiceResult.outcome);

            if(choiceResult.outcome==dismissed){
                console.log("User cancelled installation");
            }else{
                console.log("User added to Homescreen!");
            }
        });

        deferredPrompt = null;
    }
}

athsb.addEventListener('click', openAddToHomescreenBanner);
*/

/*
let deferredPrompt;
let btnAdd = document.getElementById('btnAdd');

window.addEventListener('beforeInstallPrompt', e=>{
    e.preventDefault();

    console.log(defferedPrompt);

    defferedPrompt = e;

    btnAdd.style.display = 'block';
});


btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
  */