let athsb = document.querySelector('#athsb');


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
