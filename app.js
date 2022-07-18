//global arrays and variables used to store data which will be used later
let iconArray = []
let iconImages = []
let allPoints = 0;
let enemyPoints = 0;
let interval;
let seconds = 3;
let currentClickedIcon;

//rotate paper icon after click
document.querySelector('.paper-i').addEventListener('click',() => {
    document.querySelector('.paper-i').classList.add('rot')
    playAudio()
})

//scale rock icon after click
document.querySelector('.rock-i').addEventListener('click',() => {
    document.querySelector('.rock-i').classList.add('scale-down-up')
    playAudio()
})

//rotate scissors icon after click
document.querySelector('.scissors-i').addEventListener('click',() => {
    document.querySelector('.scissors-i').classList.add('scissors-rot')
    playAudio()
})

function playAudio() {
    let a = document.createElement('audio')
    a.src = 'sound.mp3'
    a.play();
}





//read local file items.json and store icon names in iconArray
//and icon figures in array iconImages
async function getIcons() {
            
    fetch('items.json')
    .then(res => res.json())
    .then((data) => {
        data.forEach((d) => {
            iconArray.push(d.name);
            iconImages.push(d.iconName);
        })
        
            localStorage.setItem("foobar", JSON.stringify(iconArray))
            localStorage.setItem('iconImg',JSON.stringify(iconImages))
        
    })
    
        //console.log(iconArray);
    
     
}

async function chooseGesture() {
  
    return new Promise((resolve,reject) => {
       
        
        document.querySelector('.container').addEventListener('click',(e) => {
             
            

            console.log(e.target.parentElement.className);
            //current clicked icon
            currentClickedIcon = e.target.parentElement.className

            //generate random number between 0-2
            let randomNumber = Math.floor(Math.random() * 3);
            
            //get icon names array data
            let icons = JSON.parse(localStorage.getItem("foobar"))
            //get icon figures array data
            let iconImg = JSON.parse(localStorage.getItem('iconImg'))
            //console.log(userChoice);
            console.log(iconImg);
            console.log(icons[randomNumber]);

            
            //if any backwards counting is executing stop it
            stopCount()

        //count backwards from 3 to 0 and when 0 is reached
        //display results
            countStart()
            

            //display player choice after 3 seconds and rotate
            // icons properly
            setTimeout(() => {
                displayPlayerChoice()
            },3000)
            
            //display pc choice after 3 seconds and rotate icons properly
            setTimeout(() => {
                displayPcChoice(iconImg,randomNumber);
                
            },3000)

            
    
           
            //define winning and losing conditions
    if(currentClickedIcon === icons[randomNumber]) {
        setTimeout(() => {
            

            resolve(
                {
                    points:0,
                    state:'even',
                    msg:'Even result!',
                    enemyPoint:0
                }
               
            )
            
        },3000)
                
            }
    
            else if(currentClickedIcon === 'rock' && icons[randomNumber] === 'scissors') {
               setTimeout(() => {
               
                resolve(
                    {
                        points:1,
                        state:'win',
                        msg:'You won!',
                        enemyPoint:0
                    }

                )
                
               },3000)
            }

            else if(currentClickedIcon === 'scissors' && icons[randomNumber] === 'paper') {
               setTimeout(() => {
                
                resolve(
                    {
                        points:1,
                        state:'win',
                        msg:'You won!',
                        enemyPoint:0
                    }
                )
               },3000)
            }

            else if(currentClickedIcon === 'paper' && icons[randomNumber] === 'rock') {
               
                setTimeout(() => {
                    
                    resolve(
                        {
                            points:1,
                            state:'win',
                            msg:'You won!',
                            enemyPoint:0
                        }
                    )
                },3000)
            }

            else {
               setTimeout(() => {
                
                resolve(
                    {
                        points:0,
                        state:'lose',
                        msg:'You lost!',
                       enemyPoint:1
                    }
                )
               },3000)
            }

        });
      
        
        
    })
   
}


//----Countdown from 3 to 0 functions------
let countDown = () => {
 document.querySelector('.counter').innerHTML = `<p>${seconds--}</p>`
}

let countStart = () => {
interval = setInterval(countDown,1000)

}

 stopCount = () => {
clearInterval(interval)
document.querySelector('.counter').innerHTML = ''
}
 //-----------------------------------------       
    

//------ask for continue playing or stop game--------
const continueGame =  () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(window.confirm('Do you want to continue playing?')) {
                resolve(true)
                
            }
            else {
                resolve(false)
            }
                    
        },500)
        
    })
}
//--------------------------------------------------

//display score in .result div element
const displayCurrentResult = async (chooseGestureResult) => {
    document.querySelector('.result').innerHTML = `
    <h2>${chooseGestureResult.msg}! Points:${chooseGestureResult.points}</h2>`;
    
}

const displayScoreBoard = async(chooseGestureResult) => {
    
    allPoints += chooseGestureResult.points;
    enemyPoints += chooseGestureResult.enemyPoint;
    document.querySelector('.scoreboard').innerHTML = `
    <h2>ScoreBoard</h2>
    <pre><h4>You      VS   Computer</h4></pre> <br>
    <hr>
    <div class="points-container">
    <p>${allPoints}</p> <p>${enemyPoints}</p>
    </div>`
    
}

function reset() {
    document.querySelector('.computer').innerHTML = ''
    document.querySelector('.you').innerHTML = ''
    localStorage.clear()
    document.querySelector('.paper-i').classList.remove('rot')
    document.querySelector('.rock-i').classList.remove('scale-down-up')
    document.querySelector('.scissors-i').classList.remove('scissors-rot')
    document.querySelector('.you').classList.remove('move')
    document.querySelector('.computer').classList.remove('move2')
    document.querySelector('.you').style.transform = 'translateX(-130%)'
    document.querySelector('.computer').style.transform = 'translateX(130%)'
    iconArray = []
    iconImages = []
    seconds = 3;
            tryGame()
}

function displayPlayerChoice() {
    let selectedGesture;
                switch(currentClickedIcon) {
                    case 'rock':
                    selectedGesture = `<i class="fa-solid fa-hand-back-fist fa-10x"></i>`
                    break;
            
                    case 'paper':
                    selectedGesture = `<i class="fa-solid fa-hand fa-10x"></i>`
                    break;
            
                    case 'scissors':
                    selectedGesture = `<i class="fa-solid fa-hand-scissors fa-10x"></i>`
                    break;
                }
               
                if(selectedGesture =='<i class="fa-solid fa-hand-back-fist fa-10x"></i>') {
                    document.querySelector('.you').classList.add('move')
                    document.querySelector('.you').style.transform = "rotate(90deg)"
                    document.querySelector('.you').innerHTML = ` ${selectedGesture}`
                    
                }
            
                else if(selectedGesture =='<i class="fa-solid fa-hand-scissors fa-10x"></i>') {
                    
                    document.querySelector('.you').classList.add('move')
                    document.querySelector('.you').style.transform = "rotateY(3.142rad)"
                    document.querySelector('.you').innerHTML = ` ${selectedGesture}`
                }
            
                else {
                    document.querySelector('.you').classList.add('move')
                    document.querySelector('.you').style.transform = "rotate(0)"
                    document.querySelector('.you').innerHTML = ` ${selectedGesture}`
                } 
                      
}

function displayPcChoice(iconImg,randomNumber) {
    
    if(iconImg[randomNumber] === 'fa-solid fa-hand-back-fist fa-10x') {
        document.querySelector('.computer').classList.add('move2')
        document.querySelector('.computer').style.transform = "rotateY(3.142rad) rotate(90deg)";
        
        document.querySelector('.computer').innerHTML = `
   
        <i class="${iconImg[randomNumber]}"></i>`
    }

    else {
        document.querySelector('.computer').classList.add('move2')
        document.querySelector('.computer').style.transform = "rotate(0)"
        document.querySelector('.computer').innerHTML = `
   
        <i class="${iconImg[randomNumber]}"></i>`
    }
}

const tryGame = async () => {
    try {
        
        await getIcons()
        
        const result = await chooseGesture();
            
           await displayCurrentResult(result)
           await displayScoreBoard(result);
           
            //ask in window prompt if you want the game to continue
            // or not
            const checkContinue = await continueGame();

            //stop counting backwards 3 to 0
            stopCount()

            //if OK is pressed continue playing ,clear fields data
            //but keep counting in scoreboard 
            if(checkContinue) {
                reset()
                
            }

            //if cancel is pressed stop game ,clear fields data
            //and reset scoreboard too
            else {
                alert('Game ends')
                allPoints = 0;
                enemyPoints = 0;
                document.querySelector('.scoreboard').innerHTML = ''
                document.querySelector('.result').innerHTML = ''
                reset()
            }

    } catch (error) {
        alert(error)
    }
}

const start = () => {
    tryGame();
}

start()