//Desktop Navigation
//let navBtn = document.querySelector('.menuBtn_dsk');
let openNav = document.querySelector('.openNavBtn');

let lineOne = document.querySelector('.line_one');
let lineTwo = document.querySelector('.line_two');
let lineThree = document.querySelector('.line_three');
let lines = [lineOne, lineTwo, lineThree];

let closeNav = document.getElementById('closeNavBtn');
let sideMenu = document.getElementById('sideMenu');
sideMenu.style.display='none';


/*openNav.addEventListener('click',()=>{
   
    
    closeNav.style.display='block';
    openNav.style.display='none';
});
*/

//Menu-Button Hover
const tlm = new TimelineMax({});

openNav.addEventListener('mouseenter',()=>{

    if(openNav.classList.contains('js-x')){
      return;   
    }
    tlm.staggerTo(lines, 0.25, {transformOrigin: "50% 50%", scaleX: 1.5, repeat: 1, yoyo: true, ease: Power2.easeIn}, 0.125);
    
});



//Menu-Button Click
const toggleMenu = new TimelineMax({paused: true, reversed: true});

toggleMenu
    .to(lineTwo, 0.125, {opacity: 0})
    .to(lineOne, 0.25, {transformOrigin: "50% 50%", y:10, ease: Power2.easeInOut}, "slide")
    .to(lineThree, 0.25, {transformOrigin: "50% 50%", y:-10, ease: Power2.easeInOut}, "slide")
    .to(openNav, 0.5, {transformOrigin: "50% 50%", rotation: 360, ease: Power4.easeInOut})
    .to(lineOne, 0.25, {rotation: 45, ease: Power2.easeInOut},"cross")
    .to(lineThree, 0.25, {rotation: -45, ease: Power2.easeInOut},"cross");
    
openNav.addEventListener('click', ()=>{
    openNav.classList.toggle('js-x');
    toggleMenu.reversed() ? toggleMenu.play() : toggleMenu.reverse();
    

    if(sideMenu.style.display==='none'){
        sideMenu.style.display='flex';
    }else{
        sideMenu.style.display='none';
    }
})


/*
closeNav.addEventListener('click',()=>{

    sideMenu.style.display='none';
    closeNav.style.display='none';
    openNav.style.display='block';
    
})
*/

