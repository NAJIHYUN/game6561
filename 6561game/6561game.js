let grid = [];
const size = 4;

function initGame() {
    grid = Array(size).fill().map(() => Array(size).fill(0));
    addNewTile();
    addNewTile();
    updateDisplay();
}

function addNewTile() {
    let emptyCells = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j] === 0) emptyCells.push([i, j]);
        }
    }
    if (emptyCells.length > 0) {
        let [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[i][j] = Math.random() < 0.9 ? 1 : 3;
    }
}

function move(direction) {
    let originalGrid = JSON.parse(JSON.stringify(grid));
    if (direction === 'up' || direction === 'down') {
        for (let j = 0; j < size; j++) {
            let column = [grid[0][j], grid[1][j], grid[2][j], grid[3][j]];
            let newColumn = mergeLine(direction === 'up' ? column : column.reverse());
            if (direction === 'down') newColumn.reverse();
            for (let i = 0; i < size; i++) {
                grid[i][j] = newColumn[i];
            }
        }
    } else {
        for (let i = 0; i < size; i++) {
            let newRow = mergeLine(direction === 'left' ? grid[i] : grid[i].slice().reverse());
            if (direction === 'right') newRow.reverse();
            grid[i] = newRow;
        }
    }
    if (JSON.stringify(originalGrid) !== JSON.stringify(grid)) {
        addNewTile();
        updateDisplay();
        if (isGameOver()) {
            alert("게임 오버!");
        }
    }
}

function mergeLine(line) {
    let newLine = line.filter(x => x !== 0);
    for (let i = 0; i < newLine.length - 1; i++) {
        if (newLine[i] === newLine[i + 1]) {
            newLine[i] *= 3;
            newLine.splice(i + 1, 1);
        }
    }
    while (newLine.length < size) newLine.push(0);
    return newLine;
}

function isGameOver() {
    // 빈 셀이 있는지 확인
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j] === 0) return false;
        }
    }
    
    // 인접한 셀들 중 같은 값이 있는지 확인
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (i < size - 1 && grid[i][j] === grid[i + 1][j]) return false;
            if (j < size - 1 && grid[i][j] === grid[i][j + 1]) return false;
        }
    }
    
    return true;
}

function updateDisplay() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.textContent = grid[i][j] || '';
            gameBoard.appendChild(tile);
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    switch(event.key) {
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
    }
}

function getBackgroundColor(value) {
    if (value === 0) return '#CDC1B4';
    const maxPower = Math.log(6561) / Math.log(3);
    const power = Math.log(value) / Math.log(3);
    const percentage = power / maxPower;
    const r = Math.round(255 * (1 - percentage));
    const g = Math.round(255 * (1 - percentage));
    const b = Math.round(255 * (1 - percentage));
    return `rgb(${r}, ${g}, ${b})`;
}

function getTextColor(value) {
    if (value === 0) return '#776E65';
    const brightness = getBrightness(getBackgroundColor(value));
    return brightness > 128 ? '#776E65' : '#F9F6F2';
}

function getBrightness(color) {
    const rgb = color.match(/\d+/g);
    return (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
}

function updateDisplay() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            const value = grid[i][j];
            tile.textContent = value || '';
            tile.style.backgroundColor = getBackgroundColor(value);
            tile.style.color = getTextColor(value);
            gameBoard.appendChild(tile);
        }
    }
}
// 기존 코드는 그대로 두고, 아래 함수들을 수정하거나 추가합니다.

function move(direction) {
    let originalGrid = JSON.parse(JSON.stringify(grid));
    if (direction === 'up' || direction === 'down') {
        for (let j = 0; j < size; j++) {
            let column = [grid[0][j], grid[1][j], grid[2][j], grid[3][j]];
            let newColumn = mergeLine(direction === 'up' ? column : column.reverse());
            if (direction === 'down') newColumn.reverse();
            for (let i = 0; i < size; i++) {
                grid[i][j] = newColumn[i];
            }
        }
    } else {
        for (let i = 0; i < size; i++) {
            let newRow = mergeLine(direction === 'left' ? grid[i] : grid[i].slice().reverse());
            if (direction === 'right') newRow.reverse();
            grid[i] = newRow;
        }
    }
    if (JSON.stringify(originalGrid) !== JSON.stringify(grid)) {
        addNewTile();
        updateDisplay();
        if (isGameOver()) {
            showGameOver();
        }
    }
}

function showGameOver() {
    const gameBoard = document.getElementById('game-board');
    
    // 모든 타일을 빨간색으로 변경
    const tiles = gameBoard.getElementsByClassName('tile');
    for (let tile of tiles) {
        tile.style.backgroundColor = 'red';
        tile.style.color = 'white';
    }
    
    // 게임 오버 메시지 표시
    const gameOverMessage = document.createElement('div');
    gameOverMessage.textContent = 'GAME OVER!';
    gameOverMessage.style.position = 'absolute';
    gameOverMessage.style.top = '50%';
    gameOverMessage.style.left = '50%';
    gameOverMessage.style.transform = 'translate(-50%, -50%)';
    gameOverMessage.style.fontSize = '48px';
    gameOverMessage.style.fontWeight = 'bold';
    gameOverMessage.style.color = 'white';
    gameOverMessage.style.textShadow = '2px 2px 4px #000000';
    gameOverMessage.style.zIndex = '1000';
    
    document.body.appendChild(gameOverMessage);
    
    // 키 이벤트 리스너 제거
    document.removeEventListener('keydown', handleKeyPress);
}

function updateDisplay() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            const value = grid[i][j];
            tile.textContent = value || '';
            tile.style.backgroundColor = getBackgroundColor(value);
            tile.style.color = getTextColor(value);
            gameBoard.appendChild(tile);
        }
    }
}

// HTML 파일의 스타일 섹션에 다음 스타일을 추가합니다.
initGame();