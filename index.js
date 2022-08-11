
let roundResults = document.querySelector('.round-results')
let playerPoints = document.querySelector('.player-score')
let computerPoints = document.querySelector('.computer-score')

const matchWinner = document.querySelector('.instructions')
const playerIcon = document.querySelector('.player-selection')
const computerIcon = document.querySelector('.computer-selection')

const reset = document.querySelector('.play-again')
reset.style.display = 'none'


const choices = ['Rock', 'Paper', 'Scissors']


// Randomise computer's choice from the choices array
function getComputerChoice(){
    compChoice = choices[Math.floor(Math.random() * choices.length)]
    return compChoice
}

// Plays a round between player and computer and compares each one's selection and displays outcome
function playRound(playerSelection, computerSelection){
    // Outcomes if Player Chooses Rock
    if(playerSelection === 'Rock' && computerSelection === 'Rock'){
        roundResults.textContent = 'Tie! You both chose Rock.'
    } else if(playerSelection === 'Rock' && computerSelection === 'Paper'){
        roundResults.textContent = 'You lost! Computer chose Paper.'
    } else if(playerSelection === 'Rock' && computerSelection === 'Scissors'){
        roundResults.textContent = 'You won! Computer chose Scissors.'
    }

    // Outcome if Player chooses Paper
    else if(playerSelection === 'Paper' && computerSelection === 'Paper'){
        roundResults.textContent = 'Tie! You both chose Paper.'
    } else if(playerSelection === 'Paper' && computerSelection === 'Scissors'){
        roundResults.textContent = 'You lost! Computer chose Scissors.'
    } else if(playerSelection === 'Paper' && computerSelection === 'Rock'){
        roundResults.textContent = 'You won! Computer chose Rock.'
    }

    // Outcome if Player chooses Scissors
    else if(playerSelection === 'Scissors' && computerSelection === 'Scissors'){
        roundResults.textContent = 'Tie! You both chose Scissors.'
    } else if(playerSelection === 'Scissors' && computerSelection === 'Rock'){
        roundResults.textContent = 'You lost! Computer chose Rock.'
    } else if(playerSelection === 'Scissors' && computerSelection === 'Paper'){
        roundResults.textContent = 'You won! Computer chose Paper.'
    }
}


let playerScore = 0;
let computerScore = 0;
playerPoints.textContent = playerScore
computerPoints.textContent = computerScore


// Adds points to player and computer's score
function addScores(round){
    if(round.includes('won')){
        playerScore++;
        playerPoints.textContent = playerScore;
        roundResults.style.color = 'rgb(99, 226, 49)'
    } else if(round.includes('lost')){
        computerScore++;
        computerPoints.textContent = computerScore;
        roundResults.style.color = 'lightblue'
    } else{
        roundResults.style.color = 'rgb(226, 43, 43)'
    }
    announceWinner();
}

// If someone reaches 6 points, display large text to announce who won
function announceWinner(){
    if(playerScore === 5){
        matchWinner.textContent = 'You have won the match!';
        matchWinner.style.color = 'rgb(99, 226, 49)'
        matchWinner.style.transform = 'scale(1.5)'
        matchWinner.style.transition = 'all 0.3s'
    } else if(computerScore === 5){
        matchWinner.textContent = 'Computer has won the match!';
        matchWinner.style.color = 'lightblue'
        matchWinner.style.transform = 'scale(1.5)'
        matchWinner.style.transition = 'all 0.3s'
    }
}

// add the corresponding icon to the DOM for each button click and computer choice
function addIcon(computerChoice, playerChoice){
    if(computerChoice === 'Rock'){
        computerIcon.innerHTML = '<i class="fa fa-hand-rock-o"></i>'
    }else if(computerChoice === 'Scissors'){
        computerIcon.innerHTML = '<i class="fa fa-hand-scissors-o"></i>'
    }else if(computerChoice === 'Paper'){
        computerIcon.innerHTML = '<i class="fa fa-hand-paper-o"></i>'
    }

    if(playerChoice === 'Rock'){
        playerIcon.innerHTML = '<i class="fa fa-hand-rock-o"></i>'
    }else if(playerChoice === 'Scissors'){
        playerIcon.innerHTML = '<i class="fa fa-hand-scissors-o"></i>'
    }else if(playerChoice === 'Paper'){
        playerIcon.innerHTML = '<i class="fa fa-hand-paper-o"></i>'
    }
}

// If play again button is clicked, reset all stats and text
function playAgain(){
    reset.style.display = 'block'

    reset.onclick = function(){
        playerScore = 0;
        computerScore = 0;

        matchWinner.innerHTML = '<div class="instructions">First to 5 wins!</div>'
        matchWinner.style.transform = 'scale(1)'

        playerPoints.textContent = playerScore;
        computerPoints.textContent = computerScore;

        roundResults.style.display = 'none'
        reset.style.display = 'none'
        computerIcon.style.display = 'none'
        playerIcon.style.display = 'none'
    }
}

const buttons = document.querySelectorAll('.choice-btn')

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {

        const computerChoice = getComputerChoice();
        const playerChoice = btn.dataset.choice;
        
        // Allow the game to play if no one has reached 5 points
        if(playerScore < 5 && computerScore < 5){
            roundResults.style.display = 'block';
            computerIcon.style.display = 'flex';
            playerIcon.style.display = 'block';
            playRound(playerChoice, computerChoice);
            addIcon(computerChoice, playerChoice);
            addScores(roundResults.textContent);
        }

        // Reset Game
        if(playerScore == 5 || computerScore == 5){
            playAgain();
        }
    })
})