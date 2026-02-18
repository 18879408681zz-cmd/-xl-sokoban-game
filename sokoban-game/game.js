// 推箱子游戏 - 主逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 游戏状态
    const gameState = {
        currentLevel: 1,
        moves: 0,
        time: 0,
        timerInterval: null,
        gameBoard: [],
        playerPos: { x: 0, y: 0 },
        boxes: [],
        targets: [],
        isCompleted: false,
        soundEnabled: true
    };

    // 关卡定义 (10x10 网格)
    const levels = [
        {
            // 关卡 1
            grid: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 2, 3, 3, 2, 0, 0, 1],
                [1, 0, 0, 3, 0, 0, 3, 0, 0, 1],
                [1, 0, 0, 3, 0, 0, 3, 0, 0, 1],
                [1, 0, 0, 2, 3, 3, 2, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            playerStart: { x: 4, y: 4 },
            boxes: [{x: 3, y: 3}, {x: 6, y: 3}, {x: 3, y: 6}, {x: 6, y: 6}],
            targets: [{x: 4, y: 3}, {x: 5, y: 3}, {x: 4, y: 6}, {x: 5, y: 6}]
        },
        {
            // 关卡 2
            grid: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 2, 3, 0, 0, 3, 2, 0, 1],
                [1, 0, 3, 0, 3, 3, 0, 3, 0, 1],
                [1, 0, 0, 3, 2, 2, 3, 0, 0, 1],
                [1, 0, 0, 3, 2, 2, 3, 0, 0, 1],
                [1, 0, 3, 0, 3, 3, 0, 3, 0, 1],
                [1, 0, 2, 3, 0, 0, 3, 2, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            playerStart: { x: 4, y: 4 },
            boxes: [{x: 2, y: 2}, {x: 7, y: 2}, {x: 2, y: 7}, {x: 7, y: 7}],
            targets: [{x: 3, y: 3}, {x: 6, y: 3}, {x: 3, y: 6}, {x: 6, y: 6}]
        },
        {
            // 关卡 3
            grid: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 2, 0, 0, 0, 0, 2, 0, 1],
                [1, 0, 3, 3, 3, 3, 3, 3, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 3, 3, 3, 3, 3, 3, 0, 1],
                [1, 0, 2, 0, 0, 0, 0, 2, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            playerStart: { x: 4, y: 4 },
            boxes: [{x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y: 3}, {x: 6, y: 3}, {x: 7, y: 3}],
            targets: [{x: 2, y: 2}, {x: 7, y: 2}, {x: 2, y: 7}, {x: 7, y: 7}]
        },
        {
            // 关卡 4
            grid: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 2, 3, 0, 0, 3, 2, 0, 1],
                [1, 0, 0, 3, 0, 0, 3, 0, 0, 1],
                [1, 0, 0, 0, 3, 3, 0, 0, 0, 1],
                [1, 0, 0, 0, 3, 3, 0, 0, 0, 1],
                [1, 0, 0, 3, 0, 0, 3, 0, 0, 1],
                [1, 0, 2, 3, 0, 0, 3, 2, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            playerStart: { x: 4, y: 4 },
            boxes: [{x: 2, y: 2}, {x: 6, y: 2}, {x: 3, y: 3}, {x: 6, y: 3}, {x: 2, y: 7}, {x: 6, y: 7}],
            targets: [{x: 3, y: 2}, {x: 6, y: 2}, {x: 2, y: 3}, {x: 7, y: 3}, {x: 2, y: 6}, {x: 7, y: 6}]
        },
        {
            // 关卡 5
            grid: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 2, 2, 2, 2, 2, 2, 0, 1],
                [1, 0, 2, 3, 3, 3, 3, 2, 0, 1],
                [1, 0, 2, 3, 0, 0, 3, 2, 0, 1],
                [1, 0, 2, 3, 0, 0, 3, 2, 0, 1],
                [1, 0, 2, 3, 3, 3, 3, 2, 0, 1],
                [1, 0, 2, 2, 2, 2, 2, 2, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            playerStart: { x: 4, y: 4 },
            boxes: [{x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y: 3}, {x: 6, y: 3},
                    {x: 3, y: 4}, {x: 6, y: 4},
                    {x: 3, y: 5}, {x: 6, y: 5},
                    {x: 3, y: 6}, {x: 4, y: 6}, {x: 5, y: 6}, {x: 6, y: 6}],
            targets: [{x: 3, y: 3}, {x: 6, y: 3}, {x: 3, y: 6}, {x: 6, y: 6}]
        }
    ];

    // DOM 元素
    const gameBoardElement = document.getElementById('game-board');
    const levelElement = document.getElementById('level');
    const movesElement = document.getElementById('moves');
    const timerElement = document.getElementById('timer');
    const boxesLeftElement = document.getElementById('boxes-left');
    const resetButton = document.getElementById('reset-level');
    const prevButton = document.getElementById('prev-level');
    const nextButton = document.getElementById('next-level');
    const hintButton = document.getElementById('hint');
    const levelButtons = document.querySelectorAll('.level-btn');
    const winModal = document.getElementById('win-modal');
    const winLevelElement = document.getElementById('win-level');
    const winTimeElement = document.getElementById('win-time');
    const winMovesElement = document.getElementById('win-moves');
    const nextLevelModalButton = document.getElementById('next-level-modal');
    const closeModalButton = document.getElementById('close-modal');
    const toggleSoundButton = document.getElementById('toggle-sound');

    // 初始化游戏
    function initGame() {
        loadLevel(gameState.currentLevel);
        renderGameBoard();
        updateUI();
        startTimer();
        setupEventListeners();
    }

    // 加载关卡
    function loadLevel(levelNum) {
        const levelIndex = levelNum - 1;
        if (levelIndex < 0 || levelIndex >= levels.length) return;
        
        const level = levels[levelIndex];
        gameState.gameBoard = JSON.parse(JSON.stringify(level.grid)); // 深拷贝
        gameState.playerPos = { ...level.playerStart };
        gameState.boxes = JSON.parse(JSON.stringify(level.boxes));
        gameState.targets = JSON.parse(JSON.stringify(level.targets));
        gameState.moves = 0;
        gameState.isCompleted = false;
        
        // 更新关卡按钮状态
        levelButtons.forEach(btn => {
            if (parseInt(btn.dataset.level) === levelNum) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // 渲染游戏棋盘
    function renderGameBoard() {
        gameBoardElement.innerHTML = '';
        gameBoardElement.style.gridTemplateColumns = `repeat(${gameState.gameBoard[0].length}, 1fr)`;
        
        for (let y = 0; y < gameState.gameBoard.length; y++) {
            for (let x = 0; x < gameState.gameBoard[y].length; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                
                // 确定单元格类型
                let cellType = 'floor';
                if (gameState.gameBoard[y][x] === 1) {
                    cellType = 'wall';
                } else {
                    // 检查是否是目标点
                    const isTarget = gameState.targets.some(t => t.x === x && t.y === y);
                    // 检查是否是箱子
                    const boxIndex = gameState.boxes.findIndex(b => b.x === x && b.y === y);
                    const isBox = boxIndex !== -1;
                    // 检查是否是玩家
                    const isPlayer = gameState.playerPos.x === x && gameState.playerPos.y === y;
                    
                    if (isPlayer) {
                        cellType = 'player';
                    } else if (isBox && isTarget) {
                        cellType = 'box-on-target';
                    } else if (isBox) {
                        cellType = 'box';
                    } else if (isTarget) {
                        cellType = 'target';
                    } else {
                        cellType = 'floor';
                    }
                }
                
                cell.classList.add(cellType);
                gameBoardElement.appendChild(cell);
            }
        }
    }

    // 更新UI
    function updateUI() {
        levelElement.textContent = `${gameState.currentLevel} / ${levels.length}`;
        movesElement.textContent = gameState.moves;
        
        // 计算剩余箱子
        const boxesOnTarget = gameState.boxes.filter(box => {
            return gameState.targets.some(target => target.x === box.x && target.y === box.y);
        });
        boxesLeftElement.textContent = gameState.boxes.length - boxesOnTarget.length;
        
        // 检查是否获胜
        if (boxesOnTarget.length === gameState.boxes.length && gameState.boxes.length > 0) {
            if (!gameState.isCompleted) {
                gameState.isCompleted = true;
                showWinModal();
            }
        }
    }

    // 移动玩家
    function movePlayer(dx, dy) {
        if (gameState.isCompleted) return;
        
        const newX = gameState.playerPos.x + dx;
        const newY = gameState.playerPos.y + dy;
        
        // 检查边界和墙壁
        if (newX < 0 || newX >= gameState.gameBoard[0].length || 
            newY < 0 || newY >= gameState.gameBoard.length) {
            return;
        }
        
        if (gameState.gameBoard[newY][newX] === 1) {
            return; // 撞墙
        }
        
        // 检查是否有箱子
        const boxIndex = gameState.boxes.findIndex(b => b.x === newX && b.y === newY);
        
        if (boxIndex !== -1) {
            // 尝试移动箱子
            const newBoxX = newX + dx;
            const newBoxY = newY + dy;
            
            // 检查箱子移动是否有效
            if (newBoxX < 0 || newBoxX >= gameState.gameBoard[0].length || 
                newBoxY < 0 || newBoxY >= gameState.gameBoard.length) {
                return;
            }
            
            if (gameState.gameBoard[newBoxY][newBoxX] === 1) {
                return; // 箱子撞墙
            }
            
            // 检查是否有其他箱子在目标位置
            const boxAtTarget = gameState.boxes.find(b => b.x === newBoxX && b.y === newBoxY);
            if (boxAtTarget) {
                return; // 箱子撞箱子
            }
            
            // 移动箱子
            gameState.boxes[boxIndex].x = newBoxX;
            gameState.boxes[boxIndex].y = newBoxY;
        }
        
        // 移动玩家
        gameState.playerPos.x = newX;
        gameState.playerPos.y = newY;
        gameState.moves++;
        
        // 播放声音
        if (gameState.soundEnabled) {
            playMoveSound();
        }
        
        renderGameBoard();
        updateUI();
    }

    // 开始计时器
    function startTimer() {
        clearInterval(gameState.timerInterval);
        gameState.time = 0;
        updateTimerDisplay();
        
        gameState.timerInterval = setInterval(() => {
            gameState.time++;
            updateTimerDisplay();
        }, 1000);
    }

    // 更新计时器显示
    function updateTimerDisplay() {
        const minutes = Math.floor(gameState.time / 60);
        const seconds = gameState.time % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // 显示获胜模态框
    function showWinModal() {
        winLevelElement.textContent = gameState.currentLevel;
        winTimeElement.textContent = timerElement.textContent;
        winMovesElement.textContent = gameState.moves;
        winModal.style.display = 'flex';
        
        if (gameState.soundEnabled) {
            playWinSound();
        }
    }

    // 播放移动声音
    function playMoveSound() {
        // 简单的音频反馈
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // 音频上下文不支持
        }
    }

    // 播放获胜声音
    function playWinSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            let time = audioContext.currentTime;
            
            notes.forEach((freq, i) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, time);
                gainNode.gain.linearRampToValueAtTime(0.1, time + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
                
                oscillator.start(time);
                oscillator.stop(time + 0.3);
                
                time += 0.2;
            });
        } catch (e) {
            // 音频上下文不支持
        }
    }

    // 设置事件监听器
    function setupEventListeners() {
        // 键盘控制
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    movePlayer(0, -1);
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    movePlayer(0, 1);
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    movePlayer(-1, 0);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    movePlayer(1, 0);
                    break;
            }
        });

        // 按钮事件
        resetButton.addEventListener('click', () => {
            loadLevel(gameState.currentLevel);
            renderGameBoard();
            updateUI();
            startTimer();
        });

        prevButton.addEventListener('click', () => {
            if (gameState.currentLevel > 1) {
                gameState.currentLevel--;
                loadLevel(gameState.currentLevel);
                renderGameBoard();
                updateUI();
                startTimer();
            }
        });

        nextButton.addEventListener('click', () => {
            if (gameState.currentLevel < levels.length) {
                gameState.currentLevel++;
                loadLevel(gameState.currentLevel);
                renderGameBoard();
                updateUI();
                startTimer();
            }
        });

        hintButton.addEventListener('click', () => {
            alert('提示：尝试先将箱子推到目标点附近，然后调整位置。注意不要将箱子推到角落！');
        });

        // 关卡选择按钮
        levelButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const level = parseInt(btn.dataset.level);
                gameState.currentLevel = level;
                loadLevel(level);
                renderGameBoard();
                updateUI();
                startTimer();
            });
        });

        // 模态框按钮
        nextLevelModalButton.addEventListener('click', () => {
            winModal.style.display = 'none';
            if (gameState.currentLevel < levels.length) {
                gameState.currentLevel++;
                loadLevel(gameState.currentLevel);
                renderGameBoard();
                updateUI();
                startTimer();
            }
        });

        closeModalButton.addEventListener('click', () => {
            winModal.style.display = 'none';
        });

        // 音效切换
        toggleSoundButton.addEventListener('click', () => {
            gameState.soundEnabled = !gameState.soundEnabled;
            toggleSoundButton.innerHTML = gameState.soundEnabled ? 
                '<i class="fas fa-volume-up"></i> 音效: 开' : 
                '<i class="fas fa-volume-mute"></i> 音效: 关';
        });

        // 点击棋盘移动（可选功能）
        gameBoardElement.addEventListener('click', (e) => {
            if (!e.target.classList.contains('cell')) return;
            
            const x = parseInt(e.target.dataset.x);
            const y = parseInt(e.target.dataset.y);
            
            // 计算移动方向
            const dx = x - gameState.playerPos.x;
            const dy = y - gameState.playerPos.y;
            
            // 只允许直线移动
            if (Math.abs(dx) > Math.abs(dy)) {
                // 水平移动
                movePlayer(dx > 0 ? 1 : -1, 0);
            } else {
                // 垂直移动
                movePlayer(0, dy > 0 ? 1 : -1);
            }
        });
    }

    // 初始化游戏
    initGame();
});