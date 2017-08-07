window.onload=function(){
    init();
};

var mode = 'hard' ;
var numCards= 6 ;
var gameover = false ;
var colors = [];
var pickedColor ;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var modeButtons = document.querySelectorAll(".mode");
var countdownDisplay = document.querySelector("#countdown");
var countdownId;
var blinkId;

function init(){
    initButtons();
    initCards();
    reset();
}

function initButtons(){
    for(var i =0;i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            for(var j=0 ; j<modeButtons.length; j++){
                modeButtons[j].classList.remove("selected") ;   
            }
            this.classList.add("selected");
            mode = this.textContent.toLowerCase();
            switch (mode){
                case 'easy' :
                    numCards = 3;
                    break ;
                default :
                    numCards = 6 ;  
            }
            reset();
        });
    }
}

function initCards(){
    for(var i = 0; i < cards.length; i++){
        cards[i].addEventListener("click",function(){
            if (gameover)
                return;
            var clickedColor = this.style.backgroundColor;

            if(clickedColor === pickedColor){
                clearInterval(countdownId);
                messageDisplay.textContent = "Correct!";
                end();
            } else {
                this.style.opacity = 0 ;
                messageDisplay.textContent = "Try Again" ;
            }
        })
    }
}

function end(){
    countdownDisplay.textContent = '';
    resetButton.style.opacity = 1 ;
    resetDisplay.textContent = "Play Again";
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
    gameover = true ;
}

function reset(){
    clearInterval(countdownId);
    gameover = false ;
    if(mode === 'nightmare'){
        resetButton.style.opacity = 0 ;
        countdownDisplay.innerHTML = '&nbsp;&nbsp;'+'3';
        countdownId = setInterval(countdown,1000);
    }else{
        countdownDisplay.textContent = ' '; 
    }
    colors = generateRandomColors(numCards);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color";
    messageDisplay.textContent = "What's the Color?";

    for(var i = 0 ; i < cards.length;i++){
        cards[i].style.opacity = 1 ;
        if(colors[i]){
            cards[i].style.display = "block" ;
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323" ;    
}


resetButton.addEventListener("click",function(){
    reset();
})

function changeColors(color){
    for(var i = 0 ; i < cards.length; i++){
        cards[i].style.opacity = 1 ;
        cards[i].style.backgroundColor = color ;    
    }
}

function pickColor(){
    var random = Math.floor(Math.random() *  colors.length);
    return colors[random] ;
}

function generateRandomColors(num){
    var arr = [] ;
    for (var i=0 ; i < num ;i++)
    {
        arr.push(randomColor())
    }
    return arr ;
}

function randomColor(){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function countdown(){
    var c = Number(countdownDisplay.textContent);
    countdownDisplay.innerHTML = '&nbsp;&nbsp;' + (--c);
    if(c === 0){
        clearInterval(countdownId);
        messageDisplay.textContent = "TimeOut!" ;
        end();
    }else{
        body.style.backgroundColor = '#FFF' ;
        blinkId = setInterval(blink , 50);
    }
}

function blink(){
    body.style.backgroundColor = '#232323' ;
}
