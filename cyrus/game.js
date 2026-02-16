// Game Constants
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 600;
const GRAVITY = 0.6;
const FRICTION = 0.85;
const PLAYER_SPEED = 5;
const JUMP_FORCE = -14;

// Level Definitions
const levels = [
    {
        name: "Level 1: The Beginning",
        platforms: [
            { x: 0, y: 550, width: 1024, height: 50, type: 'ground' },
            { x: 150, y: 470, width: 150, height: 20, type: 'platform' },
            { x: 400, y: 420, width: 120, height: 20, type: 'platform' },
            { x: 600, y: 470, width: 150, height: 20, type: 'platform' },
            { x: 50, y: 350, width: 120, height: 20, type: 'platform' },
            { x: 250, y: 300, width: 100, height: 20, type: 'platform' },
            { x: 450, y: 320, width: 150, height: 20, type: 'platform' },
            { x: 700, y: 350, width: 120, height: 20, type: 'platform' },
            { x: 100, y: 220, width: 100, height: 20, type: 'platform' },
            { x: 300, y: 180, width: 120, height: 20, type: 'platform' },
            { x: 550, y: 200, width: 100, height: 20, type: 'platform' },
            { x: 750, y: 250, width: 150, height: 20, type: 'platform' },
            { x: 200, y: 120, width: 80, height: 20, type: 'platform' },
            { x: 500, y: 100, width: 100, height: 20, type: 'platform' },
            { x: 800, y: 140, width: 120, height: 20, type: 'platform' },
            { x: -10, y: 0, width: 10, height: 600, type: 'wall' },
            { x: 1024, y: 0, width: 10, height: 600, type: 'wall' }
        ],
        stars: [
            { x: 320, y: 140, width: 30, height: 30, collected: false, ability: 'doubleJump' },
            { x: 520, y: 60, width: 30, height: 30, collected: false, ability: 'dash' },
            { x: 850, y: 100, width: 30, height: 30, collected: false, ability: 'shield' },
            { x: 80, y: 310, width: 30, height: 30, collected: false, ability: null },
            { x: 900, y: 500, width: 30, height: 30, collected: false, ability: 'superJump' }
        ],
        enemies: [],
        playerStart: { x: 100, y: 400 },
        background: 'meadow'
    },
    {
        name: "Level 2: Dark Forest",
        platforms: [
            { x: 0, y: 550, width: 400, height: 50, type: 'ground' },
            { x: 500, y: 550, width: 524, height: 50, type: 'ground' },
            { x: 100, y: 480, width: 100, height: 20, type: 'platform' },
            { x: 280, y: 430, width: 100, height: 20, type: 'platform' },
            { x: 450, y: 380, width: 120, height: 20, type: 'platform' },
            { x: 650, y: 450, width: 100, height: 20, type: 'platform' },
            { x: 200, y: 350, width: 120, height: 20, type: 'platform' },
            { x: 500, y: 300, width: 150, height: 20, type: 'platform' },
            { x: 750, y: 350, width: 120, height: 20, type: 'platform' },
            { x: 100, y: 250, width: 100, height: 20, type: 'platform' },
            { x: 350, y: 200, width: 120, height: 20, type: 'platform' },
            { x: 600, y: 220, width: 100, height: 20, type: 'platform' },
            { x: 800, y: 250, width: 150, height: 20, type: 'platform' },
            { x: 200, y: 140, width: 100, height: 20, type: 'platform' },
            { x: 500, y: 120, width: 120, height: 20, type: 'platform' },
            { x: -10, y: 0, width: 10, height: 600, type: 'wall' },
            { x: 1024, y: 0, width: 10, height: 600, type: 'wall' }
        ],
        stars: [
            { x: 550, y: 260, width: 30, height: 30, collected: false, ability: 'sword' },
            { x: 380, y: 160, width: 30, height: 30, collected: false, ability: null },
            { x: 850, y: 210, width: 30, height: 30, collected: false, ability: null },
            { x: 130, y: 210, width: 30, height: 30, collected: false, ability: null },
            { x: 950, y: 500, width: 30, height: 30, collected: false, ability: null }
        ],
        enemies: [
            { x: 600, y: 500, width: 40, height: 40, type: 'octorok', health: 3, velX: 2, patrolStart: 550, patrolEnd: 750 },
            { x: 700, y: 500, width: 40, height: 40, type: 'octorok', health: 3, velX: -2, patrolStart: 550, patrolEnd: 750 },
            { x: 300, y: 380, width: 35, height: 50, type: 'moblin', health: 5, velX: 1.5, patrolStart: 200, patrolEnd: 400 }
        ],
        playerStart: { x: 50, y: 400 },
        background: 'forest'
    },
    {
        name: "Level 3: Death Mountain",
        platforms: [
            { x: 0, y: 550, width: 300, height: 50, type: 'ground' },
            { x: 400, y: 550, width: 200, height: 50, type: 'ground' },
            { x: 700, y: 550, width: 324, height: 50, type: 'ground' },
            { x: 350, y: 500, width: 30, height: 50, type: 'lava' },
            { x: 620, y: 500, width: 30, height: 50, type: 'lava' },
            { x: 100, y: 470, width: 80, height: 20, type: 'platform' },
            { x: 250, y: 420, width: 80, height: 20, type: 'platform' },
            { x: 420, y: 380, width: 100, height: 20, type: 'platform' },
            { x: 600, y: 430, width: 80, height: 20, type: 'platform' },
            { x: 780, y: 470, width: 100, height: 20, type: 'platform' },
            { x: 150, y: 350, width: 100, height: 20, type: 'platform' },
            { x: 350, y: 300, width: 120, height: 20, type: 'platform' },
            { x: 550, y: 330, width: 100, height: 20, type: 'platform' },
            { x: 750, y: 350, width: 120, height: 20, type: 'platform' },
            { x: 200, y: 240, width: 100, height: 20, type: 'platform' },
            { x: 450, y: 200, width: 120, height: 20, type: 'platform' },
            { x: 700, y: 240, width: 100, height: 20, type: 'platform' },
            { x: 350, y: 140, width: 100, height: 20, type: 'platform' },
            { x: 600, y: 120, width: 120, height: 20, type: 'platform' },
            { x: -10, y: 0, width: 10, height: 600, type: 'wall' },
            { x: 1024, y: 0, width: 10, height: 600, type: 'wall' }
        ],
        stars: [
            { x: 630, y: 80, width: 30, height: 30, collected: false, ability: 'bow' },
            { x: 380, y: 100, width: 30, height: 30, collected: false, ability: null },
            { x: 800, y: 310, width: 30, height: 30, collected: false, ability: null },
            { x: 180, y: 200, width: 30, height: 30, collected: false, ability: null },
            { x: 50, y: 500, width: 30, height: 30, collected: false, ability: null }
        ],
        enemies: [
            { x: 750, y: 500, width: 40, height: 40, type: 'octorok', health: 3, velX: 2, patrolStart: 700, patrolEnd: 950 },
            { x: 450, y: 500, width: 35, height: 50, type: 'moblin', health: 5, velX: 2, patrolStart: 400, patrolEnd: 550 },
            { x: 400, y: 340, width: 40, height: 40, type: 'octorok', health: 3, velX: 3, patrolStart: 350, patrolEnd: 550 },
            { x: 200, y: 200, width: 35, height: 50, type: 'moblin', health: 5, velX: 1.5, patrolStart: 150, patrolEnd: 300 }
        ],
        playerStart: { x: 50, y: 400 },
        background: 'mountain'
    },
    {
        name: "Level 4: Shadow Temple",
        platforms: [
            { x: 0, y: 550, width: 200, height: 50, type: 'ground' },
            { x: 300, y: 550, width: 150, height: 50, type: 'ground' },
            { x: 550, y: 550, width: 150, height: 50, type: 'ground' },
            { x: 800, y: 550, width: 224, height: 50, type: 'ground' },
            { x: 220, y: 520, width: 60, height: 30, type: 'spike' },
            { x: 470, y: 520, width: 60, height: 30, type: 'spike' },
            { x: 720, y: 520, width: 60, height: 30, type: 'spike' },
            { x: 80, y: 480, width: 80, height: 20, type: 'platform' },
            { x: 220, y: 440, width: 80, height: 20, type: 'platform' },
            { x: 380, y: 400, width: 100, height: 20, type: 'platform' },
            { x: 560, y: 450, width: 80, height: 20, type: 'platform' },
            { x: 720, y: 480, width: 100, height: 20, type: 'platform' },
            { x: 150, y: 370, width: 100, height: 20, type: 'platform' },
            { x: 350, y: 320, width: 120, height: 20, type: 'platform' },
            { x: 580, y: 350, width: 100, height: 20, type: 'platform' },
            { x: 780, y: 370, width: 120, height: 20, type: 'platform' },
            { x: 100, y: 270, width: 80, height: 20, type: 'platform' },
            { x: 280, y: 230, width: 100, height: 20, type: 'platform' },
            { x: 480, y: 250, width: 100, height: 20, type: 'platform' },
            { x: 680, y: 270, width: 100, height: 20, type: 'platform' },
            { x: 200, y: 160, width: 100, height: 20, type: 'platform' },
            { x: 450, y: 140, width: 120, height: 20, type: 'platform' },
            { x: 700, y: 170, width: 100, height: 20, type: 'platform' },
            { x: -10, y: 0, width: 10, height: 600, type: 'wall' },
            { x: 1024, y: 0, width: 10, height: 600, type: 'wall' }
        ],
        stars: [
            { x: 500, y: 100, width: 30, height: 30, collected: false, ability: 'hookshot' },
            { x: 230, y: 190, width: 30, height: 30, collected: false, ability: null },
            { x: 730, y: 130, width: 30, height: 30, collected: false, ability: null },
            { x: 100, y: 440, width: 30, height: 30, collected: false, ability: null },
            { x: 900, y: 500, width: 30, height: 30, collected: false, ability: null }
        ],
        enemies: [
            { x: 850, y: 500, width: 40, height: 40, type: 'octorok', health: 4, velX: 3, patrolStart: 800, patrolEnd: 980 },
            { x: 600, y: 500, width: 35, height: 50, type: 'moblin', health: 6, velX: 2, patrolStart: 550, patrolEnd: 680 },
            { x: 350, y: 500, width: 35, height: 50, type: 'moblin', health: 6, velX: 2, patrolStart: 300, patrolEnd: 430 },
            { x: 400, y: 360, width: 40, height: 40, type: 'octorok', health: 4, velX: 3.5, patrolStart: 350, patrolEnd: 500 },
            { x: 600, y: 310, width: 35, height: 50, type: 'moblin', health: 6, velX: 2.5, patrolStart: 550, patrolEnd: 700 },
            { x: 300, y: 190, width: 40, height: 40, type: 'octorok', health: 4, velX: 3, patrolStart: 250, patrolEnd: 400 }
        ],
        playerStart: { x: 50, y: 400 },
        background: 'temple'
    },
    {
        name: "Level 5: Ganon's Tower",
        platforms: [
            { x: 0, y: 550, width: 150, height: 50, type: 'ground' },
            { x: 250, y: 550, width: 100, height: 50, type: 'ground' },
            { x: 450, y: 550, width: 100, height: 50, type: 'ground' },
            { x: 650, y: 550, width: 100, height: 50, type: 'ground' },
            { x: 850, y: 550, width: 174, height: 50, type: 'ground' },
            { x: 170, y: 530, width: 60, height: 20, type: 'spike' },
            { x: 370, y: 530, width: 60, height: 20, type: 'spike' },
            { x: 570, y: 530, width: 60, height: 20, type: 'spike' },
            { x: 770, y: 530, width: 60, height: 20, type: 'spike' },
            { x: 50, y: 470, width: 70, height: 20, type: 'platform' },
            { x: 180, y: 430, width: 70, height: 20, type: 'platform' },
            { x: 320, y: 390, width: 80, height: 20, type: 'platform' },
            { x: 480, y: 420, width: 70, height: 20, type: 'platform' },
            { x: 630, y: 460, width: 80, height: 20, type: 'platform' },
            { x: 780, y: 430, width: 70, height: 20, type: 'platform' },
            { x: 920, y: 470, width: 80, height: 20, type: 'platform' },
            { x: 100, y: 350, width: 80, height: 20, type: 'platform' },
            { x: 260, y: 310, width: 100, height: 20, type: 'platform' },
            { x: 440, y: 330, width: 80, height: 20, type: 'platform' },
            { x: 600, y: 350, width: 100, height: 20, type: 'platform' },
            { x: 780, y: 320, width: 80, height: 20, type: 'platform' },
            { x: 150, y: 240, width: 80, height: 20, type: 'platform' },
            { x: 320, y: 210, width: 100, height: 20, type: 'platform' },
            { x: 500, y: 230, width: 80, height: 20, type: 'platform' },
            { x: 680, y: 250, width: 100, height: 20, type: 'platform' },
            { x: 850, y: 220, width: 80, height: 20, type: 'platform' },
            { x: 200, y: 140, width: 100, height: 20, type: 'platform' },
            { x: 450, y: 120, width: 120, height: 20, type: 'platform' },
            { x: 700, y: 140, width: 100, height: 20, type: 'platform' },
            { x: -10, y: 0, width: 10, height: 600, type: 'wall' },
            { x: 1024, y: 0, width: 10, height: 600, type: 'wall' }
        ],
        stars: [
            { x: 500, y: 80, width: 30, height: 30, collected: false, ability: 'timeSlow' },
            { x: 230, y: 100, width: 30, height: 30, collected: false, ability: null },
            { x: 730, y: 100, width: 30, height: 30, collected: false, ability: null },
            { x: 60, y: 430, width: 30, height: 30, collected: false, ability: null },
            { x: 950, y: 430, width: 30, height: 30, collected: false, ability: null }
        ],
        enemies: [
            { x: 900, y: 500, width: 40, height: 40, type: 'octorok', health: 5, velX: 4, patrolStart: 850, patrolEnd: 1000 },
            { x: 700, y: 500, width: 35, height: 50, type: 'moblin', health: 8, velX: 2.5, patrolStart: 650, patrolEnd: 780 },
            { x: 500, y: 500, width: 35, height: 50, type: 'moblin', health: 8, velX: 2.5, patrolStart: 450, patrolEnd: 580 },
            { x: 300, y: 500, width: 35, height: 50, type: 'moblin', health: 8, velX: 2.5, patrolStart: 250, patrolEnd: 380 },
            { x: 500, y: 390, width: 40, height: 40, type: 'octorok', health: 5, velX: 4, patrolStart: 450, patrolEnd: 580 },
            { x: 700, y: 290, width: 40, height: 40, type: 'octorok', health: 5, velX: 4, patrolStart: 650, patrolEnd: 780 },
            { x: 350, y: 270, width: 35, height: 50, type: 'moblin', health: 8, velX: 3, patrolStart: 300, patrolEnd: 450 },
            { x: 500, y: 190, width: 40, height: 40, type: 'octorok', health: 5, velX: 4, patrolStart: 450, patrolEnd: 600 }
        ],
        playerStart: { x: 50, y: 400 },
        background: 'tower'
    }
];

// Game State
const gameState = {
    isRunning: false,
    currentLevel: 0,
    starsCollected: 0,
    totalStars: 5,
    abilities: {
        dash: false,
        doubleJump: false,
        superJump: false,
        shield: false,
        sword: false,
        bow: false,
        hookshot: false,
        timeSlow: false
    },
    timeSlowActive: false,
    timeSlowTimer: 0
};

// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Player Object
const player = {
    x: 100,
    y: 400,
    width: 40,
    height: 50,
    velX: 0,
    velY: 0,
    isGrounded: false,
    facing: 'right',
    isDashing: false,
    dashCooldown: 0,
    canDash: true,
    jumpCount: 0,
    maxJumps: 1,
    hasShield: false,
    shieldActive: false,
    color: '#228B22',
    hatColor: '#2E8B2E',
    health: 100,
    maxHealth: 100,
    isAttacking: false,
    attackCooldown: 0,
    attackDirection: 'right',
    invincible: false,
    invincibleTimer: 0
};

// Projectiles array
let projectiles = [];
let arrows = [];
let hookshots = [];

// Input State
const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    dash: false,
    shield: false,
    sword: false,
    bow: false,
    hookshot: false,
    timeSlow: false
};

// Particles array
let particles = [];

// Current level data
let currentPlatforms = [];
let currentStars = [];
let currentEnemies = [];

// Ability descriptions
const abilityDescriptions = {
    dash: { name: 'Dash', icon: '⚡', description: 'Press SHIFT to dash quickly' },
    doubleJump: { name: 'Double Jump', icon: '🦅', description: 'Jump twice in mid-air' },
    superJump: { name: 'Super Jump', icon: '🚀', description: 'Hold SPACE for higher jumps' },
    shield: { name: 'Shield', icon: '🛡️', description: 'Press E for protection' },
    sword: { name: 'Sword', icon: '⚔️', description: 'Press J to attack enemies' },
    bow: { name: 'Bow', icon: '🏹', description: 'Press K to shoot arrows' },
    hookshot: { name: 'Hookshot', icon: '🪝', description: 'Press L to grapple to platforms' },
    timeSlow: { name: 'Time Slow', icon: '⏰', description: 'Press T to slow time' }
};

// Initialize Game
function init() {
    gameState.currentLevel = 0;
    gameState.abilities = {
        dash: false,
        doubleJump: false,
        superJump: false,
        shield: false,
        sword: false,
        bow: false,
        hookshot: false,
        timeSlow: false
    };
    
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('victory-screen').classList.add('hidden');
    document.getElementById('level-complete-screen').classList.add('hidden');
    
    loadLevel(0);
}

// Load Level
function loadLevel(levelIndex) {
    if (levelIndex >= levels.length) {
        // Victory!
        document.getElementById('victory-screen').classList.remove('hidden');
        gameState.isRunning = false;
        return;
    }
    
    gameState.currentLevel = levelIndex;
    const level = levels[levelIndex];
    
    // Reset player position
    player.x = level.playerStart.x;
    player.y = level.playerStart.y;
    player.velX = 0;
    player.velY = 0;
    player.health = player.maxHealth;
    player.invincible = false;
    player.invincibleTimer = 0;
    
    // Copy level data
    currentPlatforms = JSON.parse(JSON.stringify(level.platforms));
    currentStars = JSON.parse(JSON.stringify(level.stars));
    currentEnemies = JSON.parse(JSON.stringify(level.enemies));
    
    // Reset projectiles
    projectiles = [];
    arrows = [];
    hookshots = [];
    particles = [];
    
    // Reset stars collected for this level
    gameState.starsCollected = 0;
    
    // Update UI
    document.getElementById('level-name').textContent = level.name;
    updateUI();
    updateHealth();
    
    gameState.isRunning = true;
    requestAnimationFrame(gameLoop);
}

// Show Level Complete
function showLevelComplete(newAbilities) {
    gameState.isRunning = false;
    
    const screen = document.getElementById('level-complete-screen');
    const abilitiesText = document.getElementById('new-abilities-text');
    
    if (newAbilities.length > 0) {
        abilitiesText.innerHTML = 'New Abilities:<br>' + 
            newAbilities.map(a => 
                `<span class="ability-unlocked">${abilityDescriptions[a].icon} ${abilityDescriptions[a].name}</span>`
            ).join('');
    } else {
        abilitiesText.innerHTML = '';
    }
    
    screen.classList.remove('hidden');
}

// Event Listeners
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'ArrowLeft':
        case 'KeyA':
            keys.left = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keys.right = true;
            break;
        case 'ArrowUp':
        case 'KeyW':
            keys.up = true;
            break;
        case 'ArrowDown':
        case 'KeyS':
            keys.down = true;
            break;
        case 'Space':
            if (!keys.jump) {
                keys.jump = true;
                handleJump();
            }
            break;
        case 'ShiftLeft':
        case 'ShiftRight':
            if (!keys.dash) {
                keys.dash = true;
                handleDash();
            }
            break;
        case 'KeyE':
            if (!keys.shield) {
                keys.shield = true;
                handleShield();
            }
            break;
        case 'KeyJ':
            if (!keys.sword) {
                keys.sword = true;
                handleSword();
            }
            break;
        case 'KeyK':
            if (!keys.bow) {
                keys.bow = true;
                handleBow();
            }
            break;
        case 'KeyL':
            if (!keys.hookshot) {
                keys.hookshot = true;
                handleHookshot();
            }
            break;
        case 'KeyT':
            if (!keys.timeSlow) {
                keys.timeSlow = true;
                handleTimeSlow();
            }
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.code) {
        case 'ArrowLeft':
        case 'KeyA':
            keys.left = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keys.right = false;
            break;
        case 'ArrowUp':
        case 'KeyW':
            keys.up = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            keys.down = false;
            break;
        case 'Space':
            keys.jump = false;
            break;
        case 'ShiftLeft':
        case 'ShiftRight':
            keys.dash = false;
            break;
        case 'KeyE':
            keys.shield = false;
            player.shieldActive = false;
            break;
        case 'KeyJ':
            keys.sword = false;
            break;
        case 'KeyK':
            keys.bow = false;
            break;
        case 'KeyL':
            keys.hookshot = false;
            break;
        case 'KeyT':
            keys.timeSlow = false;
            break;
    }
});

document.getElementById('start-btn').addEventListener('click', init);
document.getElementById('restart-btn').addEventListener('click', init);
document.getElementById('next-level-btn').addEventListener('click', () => {
    document.getElementById('level-complete-screen').classList.add('hidden');
    loadLevel(gameState.currentLevel + 1);
});

// Handle Jump
function handleJump() {
    if (player.isGrounded) {
        player.velY = gameState.abilities.superJump ? JUMP_FORCE * 1.3 : JUMP_FORCE;
        player.jumpCount = 1;
        player.isGrounded = false;
        createParticles(player.x + player.width / 2, player.y + player.height, 5, '#fff');
    } else if (gameState.abilities.doubleJump && player.jumpCount < 2) {
        player.velY = JUMP_FORCE;
        player.jumpCount = 2;
        createParticles(player.x + player.width / 2, player.y + player.height, 8, '#ffd700');
    }
}

// Handle Dash
function handleDash() {
    if (gameState.abilities.dash && player.canDash && player.dashCooldown <= 0) {
        player.isDashing = true;
        player.canDash = false;
        player.dashCooldown = 60;
        
        const dashSpeed = 20;
        player.velX = player.facing === 'right' ? dashSpeed : -dashSpeed;
        player.velY = 0;
        
        createParticles(player.x + player.width / 2, player.y + player.height / 2, 15, '#00ffff');
        
        setTimeout(() => {
            player.isDashing = false;
        }, 150);
    }
}

// Handle Shield
function handleShield() {
    if (gameState.abilities.shield) {
        player.hasShield = true;
        player.shieldActive = true;
        
        createParticles(player.x + player.width / 2, player.y + player.height / 2, 20, '#4169e1');
        
        setTimeout(() => {
            player.shieldActive = false;
            player.hasShield = false;
        }, 2000);
    }
}

// Handle Sword Attack
function handleSword() {
    if (gameState.abilities.sword && player.attackCooldown <= 0) {
        player.isAttacking = true;
        player.attackDirection = player.facing;
        player.attackCooldown = 30;
        
        const swordX = player.facing === 'right' ? player.x + player.width : player.x - 50;
        const swordHitbox = {
            x: swordX,
            y: player.y,
            width: 50,
            height: player.height
        };
        
        // Check enemy hits
        currentEnemies.forEach(enemy => {
            if (checkCollision(swordHitbox, enemy)) {
                damageEnemy(enemy, 2);
                createParticles(enemy.x + enemy.width/2, enemy.y + enemy.height/2, 10, '#ff0000');
            }
        });
        
        createParticles(
            player.x + player.width/2 + (player.facing === 'right' ? 30 : -30),
            player.y + player.height/2,
            10,
            '#fff'
        );
        
        setTimeout(() => {
            player.isAttacking = false;
        }, 200);
    }
}

// Handle Bow
function handleBow() {
    if (gameState.abilities.bow) {
        const arrow = {
            x: player.x + player.width / 2,
            y: player.y + player.height / 2,
            width: 20,
            height: 5,
            velX: player.facing === 'right' ? 12 : -12,
            velY: 0,
            life: 100
        };
        arrows.push(arrow);
        createParticles(arrow.x, arrow.y, 5, '#fff');
    }
}

// Handle Hookshot
function handleHookshot() {
    if (gameState.abilities.hookshot) {
        const hookshot = {
            x: player.x + player.width / 2,
            y: player.y + player.height / 2,
            targetX: player.x + player.width / 2 + (player.facing === 'right' ? 200 : -200),
            targetY: player.y,
            width: 10,
            height: 10,
            velX: player.facing === 'right' ? 15 : -15,
            attached: false,
            pulling: false
        };
        hookshots.push(hookshot);
    }
}

// Handle Time Slow
function handleTimeSlow() {
    if (gameState.abilities.timeSlow && !gameState.timeSlowActive) {
        gameState.timeSlowActive = true;
        gameState.timeSlowTimer = 300; // 5 seconds at 60fps
        
        createParticles(player.x + player.width/2, player.y + player.height/2, 30, '#00ffff');
    }
}

// Damage Enemy
function damageEnemy(enemy, damage) {
    enemy.health -= damage;
    
    if (enemy.health <= 0) {
        // Enemy defeated
        createParticles(enemy.x + enemy.width/2, enemy.y + enemy.height/2, 20, '#ff6600');
    }
}

// Create Particles
function createParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            velX: (Math.random() - 0.5) * 8,
            velY: (Math.random() - 0.5) * 8,
            life: 30 + Math.random() * 20,
            color: color,
            size: 3 + Math.random() * 4
        });
    }
}

// Update Particles
function updateParticles() {
    const timeScale = gameState.timeSlowActive ? 0.3 : 1;
    
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.velX * timeScale;
        p.y += p.velY * timeScale;
        p.velY += 0.2 * timeScale;
        p.life--;
        
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

// Draw Particles
function drawParticles() {
    particles.forEach(p => {
        ctx.globalAlpha = p.life / 50;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
}

// Update Player Physics
function updatePlayer() {
    const timeScale = gameState.timeSlowActive ? 0.3 : 1;
    
    // Horizontal Movement
    if (keys.left) {
        player.velX--;
        player.facing = 'left';
    }
    if (keys.right) {
        player.velX++;
        player.facing = 'right';
    }
    
    // Apply friction
    player.velX *= FRICTION;
    
    // Limit speed (unless dashing)
    if (!player.isDashing) {
        const maxSpeed = PLAYER_SPEED;
        if (player.velX > maxSpeed) player.velX = maxSpeed;
        if (player.velX < -maxSpeed) player.velX = -maxSpeed;
    }
    
    // Apply gravity
    player.velY += GRAVITY * timeScale;
    
    // Update position
    player.x += player.velX * timeScale;
    player.y += player.velY * timeScale;
    
    // Dash cooldown
    if (player.dashCooldown > 0) {
        player.dashCooldown--;
    }
    if (!player.canDash && player.dashCooldown <= 0) {
        player.canDash = true;
    }
    
    // Attack cooldown
    if (player.attackCooldown > 0) {
        player.attackCooldown--;
    }
    
    // Invincibility
    if (player.invincible) {
        player.invincibleTimer--;
        if (player.invincibleTimer <= 0) {
            player.invincible = false;
        }
    }
    
    // Time slow
    if (gameState.timeSlowActive) {
        gameState.timeSlowTimer--;
        if (gameState.timeSlowTimer <= 0) {
            gameState.timeSlowActive = false;
        }
    }
    
    // Screen boundaries
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > CANVAS_WIDTH) player.x = CANVAS_WIDTH - player.width;
    if (player.y < 0) {
        player.y = 0;
        player.velY = 0;
    }
    
    // Fall off screen - damage
    if (player.y > CANVAS_HEIGHT) {
        takeDamage(20);
        player.x = levels[gameState.currentLevel].playerStart.x;
        player.y = levels[gameState.currentLevel].playerStart.y;
        player.velY = 0;
    }
    
    // Platform Collision
    player.isGrounded = false;
    
    currentPlatforms.forEach(platform => {
        if (checkCollision(player, platform)) {
            if (platform.type === 'spike' || platform.type === 'lava') {
                takeDamage(1);
            }
            
            if (platform.type !== 'spike' && platform.type !== 'lava') {
                // Landing on top
                if (player.velY > 0 && 
                    player.y + player.height - player.velY <= platform.y + 5) {
                    player.y = platform.y - player.height;
                    player.velY = 0;
                    player.isGrounded = true;
                    player.jumpCount = 0;
                }
                // Hitting bottom
                else if (player.velY < 0 && 
                         player.y - player.velY >= platform.y + platform.height - 5) {
                    player.y = platform.y + platform.height;
                    player.velY = 0;
                }
                // Hitting side
                else {
                    if (player.velX > 0) {
                        player.x = platform.x - player.width;
                    } else if (player.velX < 0) {
                        player.x = platform.x + platform.width;
                    }
                    player.velX = 0;
                }
            }
        }
    });
    
    // Star Collection
    currentStars.forEach(star => {
        if (!star.collected && checkCollision(player, star)) {
            collectStar(star);
        }
    });
    
    // Hookshot logic
    updateHookshots();
}

// Update Hookshots
function updateHookshots() {
    for (let i = hookshots.length - 1; i >= 0; i--) {
        const h = hookshots[i];
        
        if (!h.attached && !h.pulling) {
            h.x += h.velX;
            
            // Check if reached max distance
            if ((h.velX > 0 && h.x >= h.targetX) || (h.velX < 0 && h.x <= h.targetX)) {
                h.attached = true;
                
                // Check if hit a platform
                let hitPlatform = false;
                currentPlatforms.forEach(platform => {
                    if (platform.type !== 'spike' && platform.type !== 'lava' &&
                        h.x >= platform.x && h.x <= platform.x + platform.width &&
                        h.y >= platform.y - 20 && h.y <= platform.y + platform.height) {
                        hitPlatform = true;
                    }
                });
                
                if (hitPlatform) {
                    h.pulling = true;
                } else {
                    // No platform hit, retract
                    setTimeout(() => hookshots.splice(i, 1), 200);
                }
            }
        } else if (h.pulling) {
            // Pull player towards hookshot
            const dx = h.x - (player.x + player.width/2);
            player.x += dx * 0.15;
            player.y += (h.y - (player.y + player.height/2)) * 0.15;
            
            // Check if close enough
            if (Math.abs(dx) < 20) {
                setTimeout(() => hookshots.splice(i, 1), 100);
            }
        }
    }
}

// Take Damage
function takeDamage(amount) {
    if (player.invincible) return;
    
    if (player.shieldActive) {
        player.shieldActive = false;
        player.hasShield = false;
        createParticles(player.x + player.width/2, player.y + player.height/2, 15, '#4169e1');
        return;
    }
    
    player.health -= amount;
    player.invincible = true;
    player.invincibleTimer = 60;
    
    updateHealth();
    createParticles(player.x + player.width/2, player.y + player.height/2, 10, '#ff0000');
    
    if (player.health <= 0) {
        // Player died - restart level
        player.health = player.maxHealth;
        updateHealth();
        loadLevel(gameState.currentLevel);
    }
}

// Update Health UI
function updateHealth() {
    const healthPercent = (player.health / player.maxHealth) * 100;
    document.getElementById('health-fill').style.width = healthPercent + '%';
    document.getElementById('health-value').textContent = Math.max(0, player.health);
}

// Check Collision (AABB)
function checkCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

// Collect Star
function collectStar(star) {
    star.collected = true;
    gameState.starsCollected++;
    
    createParticles(star.x + star.width / 2, star.y + star.height / 2, 30, '#ffd700');
    
    const newAbilities = [];
    
    if (star.ability && !gameState.abilities[star.ability]) {
        gameState.abilities[star.ability] = true;
        newAbilities.push(star.ability);
        
        if (star.ability === 'doubleJump') {
            player.maxJumps = 2;
        }
        
        showAbilityUnlock(star.ability);
    }
    
    updateUI();
    
    // Check if all stars collected
    if (gameState.starsCollected >= gameState.totalStars) {
        setTimeout(() => {
            showLevelComplete(newAbilities);
        }, 500);
    }
}

// Show Ability Unlock
function showAbilityUnlock(ability) {
    const abilityEl = document.querySelector(`[data-ability="${ability}"]`);
    if (abilityEl) {
        abilityEl.classList.remove('locked');
        abilityEl.classList.add('unlocked', 'just-unlocked');
        
        setTimeout(() => {
            abilityEl.classList.remove('just-unlocked');
        }, 600);
    }
}

// Update UI
function updateUI() {
    document.getElementById('stars-collected').textContent = gameState.starsCollected;
    document.getElementById('stars-total').textContent = gameState.totalStars;
    
    Object.keys(gameState.abilities).forEach(ability => {
        const el = document.querySelector(`[data-ability="${ability}"]`);
        if (el) {
            if (gameState.abilities[ability]) {
                el.classList.remove('locked');
                el.classList.add('unlocked');
            }
        }
    });
}

// Update Enemies
function updateEnemies() {
    const timeScale = gameState.timeSlowActive ? 0.3 : 1;
    
    currentEnemies.forEach((enemy, index) => {
        if (enemy.health <= 0) {
            currentEnemies.splice(index, 1);
            return;
        }
        
        // Patrol movement
        enemy.x += enemy.velX * timeScale;
        
        if (enemy.x <= enemy.patrolStart || enemy.x + enemy.width >= enemy.patrolEnd) {
            enemy.velX *= -1;
        }
        
        // Check collision with player
        if (checkCollision(player, enemy)) {
            takeDamage(10);
        }
        
        // Check arrow hits
        for (let i = arrows.length - 1; i >= 0; i--) {
            const arrow = arrows[i];
            if (checkCollision(arrow, enemy)) {
                damageEnemy(enemy, 1);
                arrows.splice(i, 1);
                createParticles(enemy.x + enemy.width/2, enemy.y + enemy.height/2, 5, '#ff0000');
            }
        }
    });
}

// Update Arrows
function updateArrows() {
    const timeScale = gameState.timeSlowActive ? 0.3 : 1;
    
    for (let i = arrows.length - 1; i >= 0; i--) {
        const arrow = arrows[i];
        arrow.x += arrow.velX * timeScale;
        arrow.life--;
        
        if (arrow.life <= 0 || arrow.x < 0 || arrow.x > CANVAS_WIDTH) {
            arrows.splice(i, 1);
        }
    }
}

// Draw Background
function drawBackground() {
    const level = levels[gameState.currentLevel];
    const bg = level ? level.background : 'meadow';
    
    let gradient;
    switch(bg) {
        case 'forest':
            gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
            gradient.addColorStop(0, '#1a472a');
            gradient.addColorStop(0.5, '#2d5016');
            gradient.addColorStop(1, '#1a3a0a');
            break;
        case 'mountain':
            gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
            gradient.addColorStop(0, '#8b0000');
            gradient.addColorStop(0.5, '#cd5c5c');
            gradient.addColorStop(1, '#8b4513');
            break;
        case 'temple':
            gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
            gradient.addColorStop(0, '#2c2c54');
            gradient.addColorStop(0.5, '#40407a');
            gradient.addColorStop(1, '#1a1a2e');
            break;
        case 'tower':
            gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
            gradient.addColorStop(0, '#4a0000');
            gradient.addColorStop(0.5, '#8b0000');
            gradient.addColorStop(1, '#2c0000');
            break;
        default: // meadow
            gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
            gradient.addColorStop(0, '#87ceeb');
            gradient.addColorStop(0.5, '#98fb98');
            gradient.addColorStop(1, '#228B22');
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw background decorations based on level
    if (bg === 'forest') {
        ctx.fillStyle = 'rgba(0, 50, 0, 0.3)';
        for (let i = 0; i < 10; i++) {
            const x = i * 120;
            ctx.beginPath();
            ctx.moveTo(x, CANVAS_HEIGHT);
            ctx.lineTo(x + 40, CANVAS_HEIGHT - 200);
            ctx.lineTo(x + 80, CANVAS_HEIGHT);
            ctx.fill();
        }
    } else if (bg === 'mountain') {
        ctx.fillStyle = 'rgba(60, 20, 20, 0.5)';
        ctx.beginPath();
        ctx.moveTo(0, CANVAS_HEIGHT);
        ctx.lineTo(300, 250);
        ctx.lineTo(600, CANVAS_HEIGHT);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(400, CANVAS_HEIGHT);
        ctx.lineTo(700, 200);
        ctx.lineTo(1024, CANVAS_HEIGHT);
        ctx.fill();
    } else if (bg === 'temple' || bg === 'tower') {
        ctx.fillStyle = 'rgba(50, 50, 80, 0.3)';
        for (let i = 0; i < 8; i++) {
            const x = i * 140;
            ctx.fillRect(x + 20, 200, 60, CANVAS_HEIGHT - 200);
            ctx.fillRect(x + 10, 220, 10, 30);
            ctx.fillRect(x + 50, 220, 10, 30);
        }
    } else {
        // Meadow - draw clouds
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        drawCloud(100, 80, 60);
        drawCloud(400, 60, 80);
        drawCloud(750, 100, 50);
    }
}

// Draw Cloud
function drawCloud(x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
    ctx.arc(x + size * 0.4, y - size * 0.2, size * 0.4, 0, Math.PI * 2);
    ctx.arc(x + size * 0.8, y, size * 0.5, 0, Math.PI * 2);
    ctx.fill();
}

// Draw Platforms
function drawPlatforms() {
    currentPlatforms.forEach(platform => {
        if (platform.type === 'ground') {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            ctx.fillStyle = '#228B22';
            ctx.fillRect(platform.x, platform.y, platform.width, 10);
            ctx.fillStyle = '#32CD32';
            for (let i = 0; i < platform.width; i += 20) {
                ctx.fillRect(platform.x + i, platform.y - 3, 3, 6);
            }
        } else if (platform.type === 'wall') {
            ctx.fillStyle = '#654321';
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        } else if (platform.type === 'spike') {
            ctx.fillStyle = '#888';
            ctx.beginPath();
            ctx.moveTo(platform.x, platform.y + platform.height);
            ctx.lineTo(platform.x + platform.width / 2, platform.y);
            ctx.lineTo(platform.x + platform.width, platform.y + platform.height);
            ctx.fill();
        } else if (platform.type === 'lava') {
            ctx.fillStyle = '#ff4500';
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            ctx.fillStyle = '#ff6347';
            for (let i = 0; i < platform.width; i += 15) {
                ctx.beginPath();
                ctx.arc(platform.x + i, platform.y, 8, Math.PI, 0);
                ctx.fill();
            }
        } else {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            ctx.fillStyle = '#d4af37';
            ctx.fillRect(platform.x, platform.y, platform.width, 4);
            ctx.fillStyle = '#654321';
            for (let i = 5; i < platform.width - 10; i += 20) {
                ctx.fillRect(platform.x + i, platform.y + 8, 10, 8);
            }
        }
    });
}

// Draw Player
function drawPlayer() {
    ctx.save();
    
    // Flicker when invincible
    if (player.invincible && Math.floor(Date.now() / 50) % 2 === 0) {
        ctx.globalAlpha = 0.5;
    }
    
    const x = player.x;
    const y = player.y;
    const w = player.width;
    const h = player.height;
    
    // Shield effect
    if (player.shieldActive) {
        ctx.strokeStyle = '#4169e1';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x + w/2, y + h/2, w, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(65, 105, 225, 0.2)';
        ctx.fill();
    }
    
    // Dash effect
    if (player.isDashing) {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.fillRect(x - 20, y, w, h);
        ctx.fillRect(x - 35, y + 5, w * 0.8, h * 0.8);
    }
    
    // Sword attack
    if (player.isAttacking) {
        ctx.fillStyle = '#c0c0c0';
        const swordX = player.facing === 'right' ? x + w : x - 40;
        ctx.beginPath();
        ctx.moveTo(swordX, y + h/2);
        ctx.lineTo(player.facing === 'right' ? swordX + 35 : swordX - 35, y + h/2);
        ctx.lineTo(swordX, y + h/2 - 5);
        ctx.fill();
    }
    
    // Body (green tunic)
    ctx.fillStyle = player.color;
    ctx.fillRect(x + 5, y + 20, w - 10, h - 20);
    
    // Belt
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x + 5, y + 30, w - 10, 5);
    
    // Head
    ctx.fillStyle = '#FFE4C4';
    ctx.fillRect(x + 8, y + 5, w - 16, 18);
    
    // Hat (green pointed hat)
    ctx.fillStyle = player.hatColor;
    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x + w, y + 10);
    ctx.lineTo(x + w + (player.facing === 'right' ? 10 : -10), y);
    ctx.lineTo(x + (player.facing === 'right' ? -5 : w + 5), y + 5);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = '#000';
    if (player.facing === 'right') {
        ctx.fillRect(x + 22, y + 12, 4, 4);
    } else {
        ctx.fillRect(x + 14, y + 12, 4, 4);
    }
    
    // Boots
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x + 8, y + h - 8, 10, 8);
    ctx.fillRect(x + w - 18, y + h - 8, 10, 8);
    
    ctx.restore();
}

// Draw Stars
function drawStars() {
    currentStars.forEach(star => {
        if (!star.collected) {
            const centerX = star.x + star.width / 2;
            const centerY = star.y + star.height / 2;
            const time = Date.now() / 200;
            const floatY = Math.sin(time) * 5;
            
            const gradient = ctx.createRadialGradient(
                centerX, centerY + floatY, 0,
                centerX, centerY + floatY, 25
            );
            gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY + floatY, 25, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const angle = (i * 4 * Math.PI / 5) - Math.PI / 2;
                const x = centerX + Math.cos(angle) * 12;
                const y = centerY + floatY + Math.sin(angle) * 12;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const angle = (i * 4 * Math.PI / 5) - Math.PI / 2 + Math.PI / 5;
                const x = centerX + Math.cos(angle) * 5;
                const y = centerY + floatY + Math.sin(angle) * 5;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
        }
    });
}

// Draw Enemies
function drawEnemies() {
    currentEnemies.forEach(enemy => {
        if (enemy.health <= 0) return;
        
        const x = enemy.x;
        const y = enemy.y;
        const w = enemy.width;
        const h = enemy.height;
        
        if (enemy.type === 'octorok') {
            // Octorok - red octopus-like creature
            ctx.fillStyle = '#dc143c';
            ctx.beginPath();
            ctx.arc(x + w/2, y + h/2, w/2, 0, Math.PI * 2);
            ctx.fill();
            
            // Eyes
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(x + w/2 - 8, y + h/2 - 5, 6, 0, Math.PI * 2);
            ctx.arc(x + w/2 + 8, y + h/2 - 5, 6, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(x + w/2 - 8, y + h/2 - 5, 3, 0, Math.PI * 2);
            ctx.arc(x + w/2 + 8, y + h/2 - 5, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Tentacles
            ctx.fillStyle = '#dc143c';
            for (let i = 0; i < 4; i++) {
                const tx = x + 5 + i * 10;
                const ty = y + h - 5 + Math.sin(Date.now() / 100 + i) * 5;
                ctx.beginPath();
                ctx.arc(tx, ty, 5, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (enemy.type === 'moblin') {
            // Moblin - pig-like humanoid
            ctx.fillStyle = '#8b0000';
            ctx.fillRect(x + 5, y + 10, w - 10, h - 10);
            
            // Head
            ctx.fillStyle = '#a52a2a';
            ctx.fillRect(x + 8, y, w - 16, 20);
            
            // Snout
            ctx.fillStyle = '#8b0000';
            ctx.fillRect(x + (enemy.velX > 0 ? w - 15 : 5), y + 8, 12, 8);
            
            // Eyes
            ctx.fillStyle = '#ffff00';
            ctx.fillRect(x + (enemy.velX > 0 ? w - 12 : 12), y + 5, 4, 4);
            
            // Club
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(x + (enemy.velX > 0 ? w - 5 : -15), y + 15, 5, 25);
        }
        
        // Health bar
        const maxHealth = enemy.type === 'octorok' ? 3 : 5;
        const healthPercent = enemy.health / (enemy.type === 'moblin' ? 8 : 5);
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y - 8, w, 5);
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(x, y - 8, w * healthPercent, 5);
    });
}

// Draw Arrows
function drawArrows() {
    arrows.forEach(arrow => {
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(arrow.x, arrow.y, arrow.width, arrow.height);
        
        // Arrow head
        ctx.fillStyle = '#c0c0c0';
        ctx.beginPath();
        if (arrow.velX > 0) {
            ctx.moveTo(arrow.x + arrow.width, arrow.y);
            ctx.lineTo(arrow.x + arrow.width + 10, arrow.y + arrow.height/2);
            ctx.lineTo(arrow.x + arrow.width, arrow.y + arrow.height);
        } else {
            ctx.moveTo(arrow.x, arrow.y);
            ctx.lineTo(arrow.x - 10, arrow.y + arrow.height/2);
            ctx.lineTo(arrow.x, arrow.y + arrow.height);
        }
        ctx.fill();
        
        // Arrow fletching
        ctx.fillStyle = '#fff';
        const fx = arrow.velX > 0 ? arrow.x : arrow.x + arrow.width;
        ctx.fillRect(fx - 3, arrow.y - 2, 3, 3);
        ctx.fillRect(fx - 3, arrow.y + arrow.height - 1, 3, 3);
    });
}

// Draw Hookshots
function drawHookshots() {
    hookshots.forEach(h => {
        // Chain
        ctx.strokeStyle = '#c0c0c0';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(player.x + player.width/2, player.y + player.height/2);
        ctx.lineTo(h.x, h.y);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Hook
        ctx.fillStyle = '#c0c0c0';
        ctx.beginPath();
        ctx.arc(h.x, h.y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Hook point
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(h.x, h.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Draw Time Slow Effect
function drawTimeSlowEffect() {
    if (gameState.timeSlowActive) {
        ctx.fillStyle = 'rgba(0, 100, 255, 0.1)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Timer bar
        ctx.fillStyle = '#333';
        ctx.fillRect(CANVAS_WIDTH/2 - 100, 30, 200, 10);
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(CANVAS_WIDTH/2 - 100, 30, 200 * (gameState.timeSlowTimer / 300), 10);
    }
}

// Game Loop
function gameLoop() {
    if (!gameState.isRunning) return;
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    updatePlayer();
    updateEnemies();
    updateArrows();
    updateParticles();
    
    drawBackground();
    drawPlatforms();
    drawStars();
    drawEnemies();
    drawArrows();
    drawHookshots();
    drawPlayer();
    drawParticles();
    drawTimeSlowEffect();
    
    requestAnimationFrame(gameLoop);
}

// Initial draw
drawBackground();
drawPlatforms();
