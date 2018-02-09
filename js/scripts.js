// scripts.js

var newGameBtn = document.getElementById('js-newGameButton');

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

newGameBtn.addEventListener('click', newGame);

pickRock.addEventListener('click', function() { playerPick('Rock'); });
pickPaper.addEventListener('click', function() { playerPick('Paper'); });
pickScissors.addEventListener('click', function() { playerPick('Scissors'); });

function setGameElements() {
    
    switch(gameState) {
    
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
        break;
    
        case 'ended':
            newGameBtn.innerText = 'Play again?';
            playerPickElem.innerHTML = 'Player\'s choice';
            computerPickElem.innerHTML = 'Computer choice';
            playerResultElem.innerHTML = 'Player\'s score';
            computerResultElem.innerHTML = 'Computer\'s score';
        
        case 'notStarted':
        
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }

}

setGameElements();

function newGame() {

  	player.name = prompt('Name request', '');
  	
    while (player.name == false) {
        alert('Name not entered!');
        player.name = prompt('Enter your name', '');
    }
    
    if (player.name) {
        player.score = computer.score = 0;
    	gameState = 'started';
    	setGameElements();

   		playerNameElem.innerHTML = player.name.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();});
   	    setGamePoints();
    
    }

}

function getComputerPick() {

    var possiblePicks = ['Rock', 'Paper', 'Scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];

}

function playerPick(playerPick) {

    console.log(player.name.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();}) + ' chose: ' + playerPick);
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = 'Selected: ' + playerPick;
    computerPickElem.innerHTML = 'Selected: ' + computerPick;

    checkRoundWinner(playerPick, computerPick);

}

function setGamePoints() {

    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;

}

function setGameEnd() {
    
    if (computer.score == 10) {
        alert('Computer won ' + computer.score + ' : ' + player.score + ' !!!');
        gameState = 'ended';
        setGameElements();
    }
    
    if (player.score == 10) {
        alert(player.name.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();}) + ' won ' + player.score + ' : ' + computer.score + ' !!!');
        gameState = 'ended';
        setGameElements();
    }

}

function checkRoundWinner(playerPick, computerPick) {
  	
  	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  	var winnerIs = 'player';

  	if (playerPick == computerPick) {
        winnerIs = 'noone';
        playerResultElem.innerHTML = "\<span class=\"label label-info\"\>Draw game";
        computerResultElem.innerHTML = "\<span class=\"label label-info\"\>Draw game";

    } else if (
        (computerPick == 'Rock' &&  playerPick == 'Scissors') ||
        (computerPick == 'Scissors' &&  playerPick == 'Paper') ||
        (computerPick == 'Paper' &&  playerPick == 'Rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "\<span class=\"label label-success\"\>Won";
        computerResultElem.innerHTML = "\<span class=\"label label-danger\"\>Lost";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "\<span class=\"label label-success\"\>Won";
        playerResultElem.innerHTML = "\<span class=\"label label-danger\"\>Lost";
        computer.score++;
    }

    setGamePoints();
    setGameEnd();

}