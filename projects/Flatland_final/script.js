// DOM Elements
const square = document.getElementById('square');
const words = document.getElementById('words');
const resetBtn = document.getElementById('resetBtn');
const randomBtn = document.getElementById('randomBtn');

// Buzzwords array for dynamic content
const buzzwords = [
    "Interactive", "Dynamic", "Engaging", 
    "Responsive", "Modern", "Clickable",
    "Animated", "Reactive", "Digital",
    "Virtual", "Interactive", "Web 3.0"
];

// Color options
const colors = [
    'red', 'green', 'blue', 
    'yellow', 'purple', 'orange',
    'pink', 'teal', 'brown'
];

// Initialization
function init() {
    updateBuzzword('Welcome to Flatland!');
    setupEventListeners();
}

// Set up all event listeners
function setupEventListeners() {
    // Square interactions
    square.addEventListener('click', function() {
        this.style.backgroundColor = 'red';
        updateBuzzword();
    });
    
    square.addEventListener('mouseover', function() {
        this.style.backgroundColor = 'green';
    });
    
    square.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'gray';
    });
    
    // Control buttons
    resetBtn.addEventListener('click', function() {
        square.style.backgroundColor = 'gray';
        updateBuzzword('Welcome to Flatland!');
    });
    
    randomBtn.addEventListener('click', function() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        square.style.backgroundColor = randomColor;
        updateBuzzword(`Look at this ${randomColor} square!`);
    });
    
    // Bonus: Double click
    square.addEventListener('dblclick', function() {
        this.style.backgroundColor = 'blue';
        updateBuzzword("Double click detected!");
    });
}

// Update the words display
function updateBuzzword(customText) {
    if (customText) {
        words.textContent = customText;
    } else {
        const randomWord = buzzwords[Math.floor(Math.random() * buzzwords.length)];
        words.textContent = `${randomWord} experience!`;
    }
}

// Initialize when page loads
window.onload = init;