let gameseq = [];
let userseq = [];

let started = false;
let level = 0;

let btns = ["yellow", "green", "blue", "red"];

let clickSound1 = new Audio('sounds/lil1.mp3');
let clickSound2 = new Audio('sounds/lil2.mp3');
let clickSound3 = new Audio('sounds/lil3.mp3');
let clickSound4 = new Audio('sounds/lil4.mp3');

let wrongAns = new Audio("sounds/err.mp3");

function playSound(sound){
    sound.pause(); // Pause the sound if it's already playing
    sound.currentTime = 0; //Reset the sound to the begining
    sound.play();
}
function wrongPress(){
    wrongAns.pause();
    wrongAns.currentTime = 0;
    wrongAns.play();
}


document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game Started!");
        started = true;
        level_up();
    }
});

let h2 = document.querySelector('h2');
function level_up(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomInt = Math.floor(Math.random()*4);
    let randomColor = btns[randomInt];
    // from radomly generated color now i want to select that particular div and add flash on it.
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameseq.push(randomColor);
    console.log(gameseq);
    gameFlash(randomBtn);

};

function gameFlash(btn){
    //randomBtn div select kr raha hai with specific class na ki color select kr rha h
    //hence we need to access it via classList
    btn.classList.add('gameflash');
    if (btn.classList.contains("yellow")) {
        playSound(clickSound1);
    }
    else if (btn.classList.contains("green")) {
        playSound(clickSound2);
    }
    else if (btn.classList.contains("red")) {
        playSound(clickSound3);
    }
    else if (btn.classList.contains("blue")) {
        playSound(clickSound4);
    }

    setTimeout(function(){
        btn.classList.remove('gameflash');
    }, 200);

};
function userFlash(btn){
    let index = userseq.length-1
    if(userseq[index] === gameseq[index]){
            btn.classList.add('userflash');
            if (btn.classList.contains("yellow")) {
                playSound(clickSound1);
            }
            else if (btn.classList.contains("green")) {
                playSound(clickSound2);
            }
            else if (btn.classList.contains("red")) {
                playSound(clickSound3);
            }
            else if (btn.classList.contains("blue")) {
                playSound(clickSound4);
            }
            setTimeout(function(){
                btn.classList.remove('userflash');
            }, 200);        
    
    }
   
};

function checkAns(index){
    //play clicksound only when the input is correct
    if(userseq[index] === gameseq[index]){
        if(userseq.length == gameseq.length){
            setTimeout(level_up, 2000);
        }
    } 
    else{
        wrongPress();
        document.querySelector("body").style.backgroundColor = "red";
        h2.innerHTML = `<span class="red-text">Game Over!</span> Your score is ${level}.  Press any key to restart.`;
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
        setTimeout(reset, 200);
        console.log('Game Over!');
        
    }
}

function userBtnPress(){
    let btn = this;
    let userColor = btn.getAttribute('id');
    userseq.push(userColor);
    console.log(userseq);

    userFlash(btn);
    checkAns(userseq.length-1);
};

let allBtns = document.querySelectorAll('.btn');
for(b of allBtns){
    b.addEventListener('click', userBtnPress);
};

function reset(){
    gameseq = [];
    userseq = [];
    level = 0;
    started = false;
}