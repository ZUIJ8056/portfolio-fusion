document.addEventListener('DOMContentLoaded', () => {
    // Game state
    const gameState = {
        wins: 0,
        losses: 0,
        ties: 0
    };
    
    // DOM elements
    const winsElement = document.getElementById('wins');
    const lossesElement = document.getElementById('losses');
    const tiesElement = document.getElementById('ties');
    const resultElement = document.getElementById('result');
    const computerChoiceElement = document.getElementById('computer-choice');
    const resetButton = document.getElementById('reset');
    const choiceButtons = document.querySelectorAll('.choice-btn');
    
    // Initialize the game
    init();
    
    function init() {
        // Add event listeners
        choiceButtons.forEach(button => {
            button.addEventListener('click', handlePlayerChoice);
        });
        
        resetButton.addEventListener('click', resetGame);
        
        // Update the scoreboard display
        updateScoreboard();
    }
    
    function handlePlayerChoice(e) {
        const playerChoice = e.target.id;
        const computerChoice = getComputerChoice();
        const result = determineWinner(playerChoice, computerChoice);
        
        // Update game state
        updateGameState(result);
        
        // Display choices and result
        displayChoices(playerChoice, computerChoice);
        displayResult(result);
        
        // Update scoreboard
        updateScoreboard();
    }
    
    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }
    
    function determineWinner(player, computer) {
        if (player === computer) {
            return 'tie';
        }
        
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'win';
        }
        
        return 'lose';
    }
    
    function updateGameState(result) {
        switch (result) {
            case 'win':
                gameState.wins++;
                break;
            case 'lose':
                gameState.losses++;
                break;
            case 'tie':
                gameState.ties++;
                break;
        }
    }
    
    function displayChoices(player, computer) {
        // Clear previous animations
        computerChoiceElement.classList.remove('fade-in');
        
        // Force reflow to restart animation
        void computerChoiceElement.offsetWidth;
        
        // Display computer choice with animation
        computerChoiceElement.textContent = getChoiceEmoji(computer);
        computerChoiceElement.classList.add('fade-in');
    }
    
    function getChoiceEmoji(choice) {
        switch (choice) {
            case 'rock': return '✊';
            case 'paper': return '✋';
            case 'scissors': return '✌️';
            default: return '';
        }
    }
    
    function displayResult(result) {
        // Clear previous classes and animations
        resultElement.className = 'result';
        resultElement.classList.remove('fade-in', 'win', 'lose', 'tie');
        
        // Force reflow to restart animation
        void resultElement.offsetWidth;
        
        // Set result text and styling
        let resultText = '';
        switch (result) {
            case 'win':
                resultText = 'You Win!';
                resultElement.classList.add('win');
                break;
            case 'lose':
                resultText = 'You Lose!';
                resultElement.classList.add('lose');
                break;
            case 'tie':
                resultText = "It's a Tie!";
                resultElement.classList.add('tie');
                break;
        }
        
        resultElement.textContent = resultText;
        resultElement.classList.add('fade-in');
    }
    
    function updateScoreboard() {
        // Apply animation to score elements
        winsElement.classList.add('score-update');
        lossesElement.classList.add('score-update');
        tiesElement.classList.add('score-update');
        
        // Remove animation after it completes
        setTimeout(() => {
            winsElement.classList.remove('score-update');
            lossesElement.classList.remove('score-update');
            tiesElement.classList.remove('score-update');
        }, 300);
        
        // Update score values
        winsElement.textContent = gameState.wins;
        lossesElement.textContent = gameState.losses;
        tiesElement.textContent = gameState.ties;
    }
    
    function resetGame() {
        // Reset game state
        gameState.wins = 0;
        gameState.losses = 0;
        gameState.ties = 0;
        
        // Update scoreboard
        updateScoreboard();
        
        // Clear result and computer choice displays
        resultElement.textContent = '';
        resultElement.className = 'result';
        computerChoiceElement.textContent = '';
        computerChoiceElement.className = 'computer-choice';
        
        // Add pulse animation to reset button for feedback
        resetButton.classList.add('pulse');
        setTimeout(() => {
            resetButton.classList.remove('pulse');
        }, 500);
    }
});