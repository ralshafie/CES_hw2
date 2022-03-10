$(document).ready(function(){
console.log("hi")

});

var connect = document.getElementById("connect");
var button = document.getElementById("button")
button.addEventListener('click',replay)
var current = "00";

var card00 = document.getElementById("00");
card00.addEventListener('click', flipCard);

var card01 = document.getElementById("01");
card00.addEventListener('click', flipCard);

var card11 = document.getElementById("11");
card00.addEventListener('click', flipCard);

var card10 = document.getElementById("10");
card00.addEventListener('click', flipCard);

var card20 = document.getElementById("20");
card20.addEventListener('click', flipCard);

var card21 = document.getElementById("21");
card21.addEventListener('click', flipCard);

var card30 = document.getElementById("30");
card30.addEventListener('click', flipCard);

var card31 = document.getElementById("31");
card31.addEventListener('click', flipCard);

var card40 = document.getElementById("40");
card40.addEventListener('click', flipCard);

var card41 = document.getElementById("41");
card41.addEventListener('click', flipCard);

var card50 = document.getElementById("50");
card50.addEventListener('click', flipCard);

var card51 = document.getElementById("51");
card51.addEventListener('click', flipCard);



//when the user clicks anywhere on the page
connect.addEventListener('click', async () => {
  
    // Prompt user to select any serial port.
    var port = await navigator.serial.requestPort();
    // be sure to set the baudRate to match the ESP32 code
    await port.open({ baudRate: 115200 });
  
    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;
  
    reader = inputStream.getReader();
    readLoop();
  
  });
  
  async function readLoop() {
    counterVal = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        // Allow the serial port to be closed later.
        console.log("closing connection")
        reader.releaseLock();
        break;
      }
      if (value) {
        //console.log(value);
        try {
          a = JSON.parse(value);
        console.log(a.joystick);
         var dir = direction(a.joystick[0],a.joystick[1]);
         move(dir);
       //  console.log(a.button);
         if(a.button == 0){
           var a_click = move(dir);
           console.log(a_click);
           document.getElementById(a_click).click();
           console.log("clicked")
         }
        counterVal += parseInt(a.dial[0])/100.0;
        redVal = (1+Math.sin(counterVal)) * (255/2);
        document.body.style.backgroundColor = 'rgb(' + redVal + ',  255, 255)';
         
      } catch(e) {
          continue; // circle back, misses correctly 
    
      }
       //console.log(parsedVal);
        // if (!isNaN(parsedVal)) {
         //  if(parsedVal == 0){
           // window.location.href = "main.html";
           //}
        //   counterVal += parseInt(value)/100.0;
        //   redVal = (1+Math.sin(counterVal)) * (255/2);
        //   document.body.style.backgroundColor = 'rgb(' + redVal + ',  60, 50)';
         //}
  
      }
    }
  };

function direction( x,  y){
  if (x < 500 && y > 1900){
    return 0;
  }else if (x >1200&& y > 1400){
    return 1;
  }if (x >300 && y > 4000){
    return 2;
  }if (x > 300 && y == 0){
    return 3;
  }
}

function move(dir ){
  if (current == "00" && (dir == 0 )){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '01';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "00" && (dir == 3)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '10';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "01" && ( dir == 1)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '00';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "01" && (dir == 3)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '11';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "11" && (dir == 0 )){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '10';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "11" && (dir == 3)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '21';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "11" && (dir == 2)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '01';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "10" && (dir == 0 )){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '11';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "10" && (dir == 3)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '20';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "10" && (dir == 2)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '00';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "21" && ( dir == 1)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '20';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "21" && (dir == 3)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '20';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "21" && (dir == 2)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '11';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "20" && (dir == 0 )){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '21';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "20" && (dir == 3)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '30';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "20" && (dir == 2)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '10';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "31" && ( dir == 1)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '30';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "31" && (dir == 3)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '41';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "31" && (dir == 2)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '21';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "30" && (dir == 0 )){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '31';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "30" && (dir == 3)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '40';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "30" && (dir == 2)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '20';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "41" && (dir == 1)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '40';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "41" && (dir == 3)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '51';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "41" && (dir == 2)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '31';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "40" && (dir == 0 )){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '41';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "40" && (dir == 3)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '50';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "40" && (dir == 2)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '30';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "51" && ( dir == 1)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '50';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "51" && (dir == 3)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '01';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "51" && (dir == 2)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '41';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "50" && (dir == 0 )){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '51';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "50" && (dir == 3)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '00';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }else if (current == "50" && (dir == 2)){ //move up or down from 00
    var old = document.getElementById(current);
    old.style.backgroundColor = "aliceblue";
    current  = '40';
    var now = document.getElementById(current);
    now.style.backgroundColor = "yellow";
  }
  
  return current;
}

var cards = document.getElementsByClassName("card");
//var button = document.getElementById("button");



let hasFlipped = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlipped) {
        hasFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;

    isMatch();
  
    
}
var match_counter = 0;
function isMatch() {

    if (firstCard.dataset.framework === secondCard.dataset.framework) {
            disable();
            console.log(" match");
            match_counter +=1 ; 
        }
    else{
        unflip();
        console.log("no match");
    }
    return;
}

function disable() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.style.backgroundColor = 'green';
    secondCard.style.backgroundColor = 'green';
    console.log("unflip")
    reset();
}
function unflip(){
    lockBoard = true;
    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    reset();
    }, 1500);
} 

function reset() {
    [hasFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }


  
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', flipCard);
 
}
function replay(){
  window.location.reload();
}
