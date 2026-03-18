// ============================================================================
// GAME MODULE - Hexagonal Tile Game System
// ============================================================================

const gameModule = (function() {
    // ========================================================================
    // Game State
    // ========================================================================
    let gameState = {
        players: [],
        currentPlayerIndex: 0,
        turnNumber: 1,
        maxAP: 6,
        hexMap: {},
        mapSize: 600, // Canvas size
        hexSize: 40
    };

    // ========================================================================
    // Hexagonal Coordinate System
    // ========================================================================
    const HEX_DIRECTIONS = {
        'n': { q: 0, r: -1 },
        'ne': { q: 1, r: -1 },
        'se': { q: 1, r: 0 },
        's': { q: 0, r: 1 },
        'sw': { q: -1, r: 1 },
        'nw': { q: -1, r: 0 }
    };

    // ========================================================================
    // Initialization
    // ========================================================================
    function init() {
        console.log('Game module initialized');
        openSetup();
    }

    // ========================================================================
    // Hexagon Generation
    // ========================================================================
    function generateHexMap() {
        const map = {};
        
        // Get all locations from locationsModule
        const allLocations = getLocationsFromModule();
        
        // Separate by category
        const safeZones = allLocations.filter(l => l.category === 'SAFE');
        const mediumZones = allLocations.filter(l => l.category === 'MEDIUM');
        const eliteZones = allLocations.filter(l => l.category === 'ELITE');
        const startZone = allLocations.find(l => l.category === 'START');
        
        // Center (0,0) - Home/Start
        map['0,0'] = {
            q: 0,
            r: 0,
            location: startZone || { zoneName: 'Home', category: 'START', primaryElements: '', gatherAction: '', specialAction: 'Put all ingredients from basket to container', penalty: 'None', playerLimit: 'Max 1', gatherLimit: 'Max 1' },
            color: '#8B4513',
            players: [],
            gatherCount: {}
        };
        
        // Ring 1 (6 tiles) - SAFE zones
        const ring1Coords = [
            {q: 0, r: -1}, {q: 1, r: -1}, {q: 1, r: 0},
            {q: 0, r: 1}, {q: -1, r: 1}, {q: -1, r: 0}
        ];
        ring1Coords.forEach((coord, index) => {
            const location = safeZones[index % safeZones.length];
            map[`${coord.q},${coord.r}`] = {
                q: coord.q,
                r: coord.r,
                location: location,
                color: getCategoryColor('SAFE'),
                players: [],
                gatherCount: {}
            };
        });
        
        // Ring 2 (12 tiles) - MEDIUM zones
        const ring2Coords = [
            {q: 0, r: -2}, {q: 1, r: -2}, {q: 2, r: -2}, {q: 2, r: -1},
            {q: 2, r: 0}, {q: 1, r: 1}, {q: 0, r: 2}, {q: -1, r: 2},
            {q: -2, r: 2}, {q: -2, r: 1}, {q: -2, r: 0}, {q: -1, r: -1}
        ];
        ring2Coords.forEach((coord, index) => {
            const location = mediumZones[index % mediumZones.length];
            map[`${coord.q},${coord.r}`] = {
                q: coord.q,
                r: coord.r,
                location: location,
                color: getCategoryColor('MEDIUM'),
                players: [],
                gatherCount: {}
            };
        });
        
        // Ring 3 (18 tiles) - ELITE zones with WATER as impassable barriers
        const ring3Coords = [
            {q: 0, r: -3}, {q: 1, r: -3}, {q: 2, r: -3}, {q: 3, r: -3},
            {q: 3, r: -2}, {q: 3, r: -1}, {q: 3, r: 0}, {q: 2, r: 1},
            {q: 1, r: 2}, {q: 0, r: 3}, {q: -1, r: 3}, {q: -2, r: 3},
            {q: -3, r: 3}, {q: -3, r: 2}, {q: -3, r: 1}, {q: -3, r: 0},
            {q: -2, r: -1}, {q: -1, r: -2}
        ];
        
        // Water tiles (impassable) at specific positions to separate ELITE tiles
        const waterPositions = [1, 4, 5, 7, 8, 11, 14, 15, 17];
        
        ring3Coords.forEach((coord, index) => {
            const isWater = waterPositions.includes(index);
            const location = isWater 
                ? { zoneName: 'Water', category: 'IMPASSABLE', primaryElements: 'Water', gatherAction: 'Cannot gather', specialAction: 'Impassable terrain', penalty: 'None', playerLimit: 'Max 0', gatherLimit: 'Max 0' }
                : eliteZones[index % eliteZones.length];
            
            map[`${coord.q},${coord.r}`] = {
                q: coord.q,
                r: coord.r,
                location: location,
                color: isWater ? '#4682B4' : getCategoryColor('ELITE'),
                players: [],
                gatherCount: {},
                impassable: isWater
            };
        });
        
        return map;
    }

    function getLocationsFromModule() {
        // Try to get locations from locationsModule if available
        const saved = localStorage.getItem('craftingLocations');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Fallback default locations
        return [
            { zoneName: 'Falls', category: 'SAFE', primaryElements: 'Water', gatherAction: 'Draw 2 Water, keep 1', specialAction: 'Draw 2 card from Water deck', penalty: 'None', playerLimit: 'Max 3', gatherLimit: 'Max 1' },
            { zoneName: 'Windy Fields', category: 'SAFE', primaryElements: 'Wind', gatherAction: 'Draw 2 Wind, keep 1', specialAction: 'Draw 2 card from Wind deck', penalty: 'None', playerLimit: 'Max 3', gatherLimit: 'Max 1' },
            { zoneName: 'Cave', category: 'SAFE', primaryElements: 'Earth', gatherAction: 'Draw 2 Earth, keep 1', specialAction: 'Draw 2 card from Earth deck', penalty: 'None', playerLimit: 'Max 3', gatherLimit: 'Max 1' },
            { zoneName: 'Mountain', category: 'SAFE', primaryElements: 'Fire', gatherAction: 'Draw 2 Fire, keep 1', specialAction: 'Draw 2 card from Fire deck', penalty: 'None', playerLimit: 'Max 3', gatherLimit: 'Max 1' },
            { zoneName: 'Forest', category: 'SAFE', primaryElements: 'Earth + Wind', gatherAction: 'Draw 1 Earth + 1 Wind, keep 1', specialAction: 'Alchemy costs 1 AP', penalty: 'None', playerLimit: 'Max 3', gatherLimit: 'Max 1' },
            { zoneName: 'Marshlands', category: 'SAFE', primaryElements: 'Water + Earth', gatherAction: 'Draw 1 Water + 1 Earth, keep 1', specialAction: 'Draw from discard', penalty: 'None', playerLimit: 'Max 3', gatherLimit: 'Max 1' },
            
            { zoneName: 'Geothermal Springs', category: 'MEDIUM', primaryElements: 'Fire + Water', gatherAction: 'Draw 2 Fire + 2 Water, keep 3', specialAction: 'Gain 2 AP movement', penalty: 'None', playerLimit: 'Max 1', gatherLimit: 'Max 1' },
            { zoneName: 'Windswept Canyon', category: 'MEDIUM', primaryElements: 'Earth + Wind', gatherAction: 'Draw 2 Earth + 2 Wind, keep 3', specialAction: 'Move another player', penalty: 'None', playerLimit: 'Max 1', gatherLimit: 'Max 1' },
            { zoneName: 'Misty Wetlands', category: 'MEDIUM', primaryElements: 'Water + Earth', gatherAction: 'Draw 2 Water + 2 Earth, keep 3', specialAction: 'Steal ingredient', penalty: 'None', playerLimit: 'Max 1', gatherLimit: 'Max 1' },
            { zoneName: 'Ruins', category: 'MEDIUM', primaryElements: 'Fire + Earth', gatherAction: 'Draw 2 Fire + 2 Earth, keep 3', specialAction: 'Block a zone', penalty: 'None', playerLimit: 'Max 1', gatherLimit: 'Max 1' },
            
            { zoneName: 'The Infernal Core', category: 'ELITE', primaryElements: 'Fire', gatherAction: 'Draw 4 Fire + 2 Earth + 2 Wind, keep 6', specialAction: 'Search deck for 2 resources', penalty: 'None', playerLimit: 'Max 1', gatherLimit: 'Max 1' },
            { zoneName: 'The Drowned Sepulcher', category: 'ELITE', primaryElements: 'Water', gatherAction: 'Draw 4 Water + 2 Earth + 2 Wind, keep 6', specialAction: 'Search deck for 2 resources', penalty: 'None', playerLimit: 'Max 1', gatherLimit: 'Max 1' },
            { zoneName: 'The Titan\'s Rest', category: 'ELITE', primaryElements: 'Earth', gatherAction: 'Draw 4 Earth + 2 Fire + 2 Water, keep 6', specialAction: 'Search deck for 2 resources', penalty: 'None', playerLimit: 'Max 1', gatherLimit: 'Max 1' },
            { zoneName: 'Utopia', category: 'ELITE', primaryElements: 'All', gatherAction: 'Draw 8, keep 6', specialAction: 'Trigger 2 special actions', penalty: 'Pay 2 AP', playerLimit: 'Max 1', gatherLimit: 'Max 1' }
        ];
    }

    function getCategoryColor(category) {
        const colors = {
            'START': '#8B4513',
            'SAFE': '#90EE90',
            'MEDIUM': '#FFD700',
            'ELITE': '#FF6347',
            'IMPASSABLE': '#4682B4'
        };
        return colors[category] || '#CCC';
    }

    // ========================================================================
    // Hex Coordinate Conversion
    // ========================================================================
    function hexToPixel(q, r, hexSize) {
        const x = hexSize * (Math.sqrt(3) * q + Math.sqrt(3)/2 * r);
        const y = hexSize * (3/2 * r);
        return { x, y };
    }

    // ========================================================================
    // Game Setup
    // ========================================================================
    function openSetup() {
        document.getElementById('gameSetupModal').style.display = 'block';
    }

    function closeSetup() {
        document.getElementById('gameSetupModal').style.display = 'none';
    }

    function startNewGame() {
        const numPlayers = parseInt(document.getElementById('numPlayers').value);
        const startingAP = parseInt(document.getElementById('startingAP').value);
        
        if (numPlayers < 1 || numPlayers > 6) {
            alert('Number of players must be between 1 and 6');
            return;
        }
        
        // Initialize players
        gameState.players = [];
        const playerColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
        
        for (let i = 0; i < numPlayers; i++) {
            gameState.players.push({
                id: i + 1,
                name: `Player ${i + 1}`,
                color: playerColors[i],
                position: { q: 0, r: 0 },
                ap: startingAP,
                basket: [],
                gatherCount: 0
            });
        }
        
        gameState.currentPlayerIndex = 0;
        gameState.turnNumber = 1;
        gameState.maxAP = startingAP;
        
        // Generate hex map
        gameState.hexMap = generateHexMap();
        
        // Place all players at starting position
        gameState.hexMap['0,0'].players = gameState.players.map(p => p.id);
        
        closeSetup();
        renderGame();
        updateUI();
        showToast('Game started! Good luck!', 'success');
    }

    function resetGame() {
        if (confirm('Are you sure you want to reset the game?')) {
            openSetup();
        }
    }

    // ========================================================================
    // Rendering
    // ========================================================================
    function renderGame() {
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) return;
        
        canvas.innerHTML = '';
        
        const hexMap = document.createElement('div');
        hexMap.className = 'hex-map';
        hexMap.style.width = `${gameState.mapSize}px`;
        hexMap.style.height = `${gameState.mapSize}px`;
        
        // Calculate center offset
        const centerX = gameState.mapSize / 2;
        const centerY = gameState.mapSize / 2;
        
        // Render each hex tile
        Object.entries(gameState.hexMap).forEach(([key, tile]) => {
            const hexTile = document.createElement('div');
            hexTile.className = 'hex-tile';
            hexTile.dataset.key = key;
            
            const pos = hexToPixel(tile.q, tile.r, gameState.hexSize);
            hexTile.style.left = `${centerX + pos.x - 40}px`;
            hexTile.style.top = `${centerY + pos.y - 46}px`;
            
            const hexShape = document.createElement('div');
            hexShape.className = 'hex-shape';
            hexShape.style.background = tile.color;
            
            const hexContent = document.createElement('div');
            hexContent.className = 'hex-content';
            hexContent.innerHTML = `
                <div style="font-size: 10px;">${tile.location.zoneName}</div>
                <div style="font-size: 8px; margin-top: 2px;">${tile.location.category}</div>
            `;
            
            hexShape.appendChild(hexContent);
            
            // Add player markers
            if (tile.players.length > 0) {
                const playersDiv = document.createElement('div');
                playersDiv.className = 'hex-players';
                tile.players.forEach(playerId => {
                    const player = gameState.players.find(p => p.id === playerId);
                    if (player) {
                        const marker = document.createElement('div');
                        marker.className = 'player-marker';
                        marker.style.background = player.color;
                        marker.textContent = `P${playerId}`;
                        playersDiv.appendChild(marker);
                    }
                });
                hexShape.appendChild(playersDiv);
            }
            
            hexTile.appendChild(hexShape);
            hexTile.onclick = () => showTileInfo(key);
            hexMap.appendChild(hexTile);
        });
        
        canvas.appendChild(hexMap);
    }

    function showTileInfo(key) {
        const tile = gameState.hexMap[key];
        if (!tile) return;
        
        const container = document.getElementById('currentTileDetails');
        const loc = tile.location;
        
        container.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Zone Name:</span>
                <span class="detail-value"><strong>${loc.zoneName}</strong></span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Category:</span>
                <span class="detail-value"><span class="category-badge category-${loc.category.toLowerCase()}">${loc.category}</span></span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Elements:</span>
                <span class="detail-value">${loc.primaryElements}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Gather Action:</span>
                <span class="detail-value">${loc.gatherAction}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Special Action:</span>
                <span class="detail-value">${loc.specialAction}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Penalty:</span>
                <span class="detail-value">${loc.penalty}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Player Limit:</span>
                <span class="detail-value">${loc.playerLimit}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Gather Limit:</span>
                <span class="detail-value">${loc.gatherLimit}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Players Here:</span>
                <span class="detail-value">${tile.players.length > 0 ? tile.players.map(id => `P${id}`).join(', ') : 'None'}</span>
            </div>
        `;
    }

    function updateUI() {
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        
        // Update header
        document.getElementById('currentPlayerName').textContent = currentPlayer.name;
        document.getElementById('currentPlayerName').style.color = currentPlayer.color;
        document.getElementById('currentAP').textContent = currentPlayer.ap;
        document.getElementById('turnNumber').textContent = gameState.turnNumber;
        
        // Update movement buttons
        updateMovementButtons();
        
        // Update gather info
        updateGatherInfo();
        
        // Update basket
        updateBasket();
        
        // Update all players list
        updatePlayersList();
        
        // Show current tile info
        const posKey = `${currentPlayer.position.q},${currentPlayer.position.r}`;
        showTileInfo(posKey);
    }

    function updateMovementButtons() {
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        const canMove = currentPlayer.ap >= 1;
        
        Object.keys(HEX_DIRECTIONS).forEach(dir => {
            const btn = document.getElementById(`move${dir.toUpperCase()}`);
            if (!btn) return;
            
            const newPos = {
                q: currentPlayer.position.q + HEX_DIRECTIONS[dir].q,
                r: currentPlayer.position.r + HEX_DIRECTIONS[dir].r
            };
            const newPosKey = `${newPos.q},${newPos.r}`;
            const targetTile = gameState.hexMap[newPosKey];
            
            const canMoveTo = canMove && targetTile && !targetTile.impassable && canEnterTile(targetTile);
            btn.disabled = !canMoveTo;
        });
    }

    function canEnterTile(tile) {
        const limitStr = tile.location.playerLimit;
        const match = limitStr.match(/\d+/);
        if (!match) return true;
        
        const limit = parseInt(match[0]);
        return tile.players.length < limit;
    }

    function updateGatherInfo() {
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        const posKey = `${currentPlayer.position.q},${currentPlayer.position.r}`;
        const currentTile = gameState.hexMap[posKey];
        
        const limitStr = currentTile.location.gatherLimit;
        const match = limitStr.match(/\d+/);
        const gatherLimit = match ? parseInt(match[0]) : 0;
        
        const playerGatherCount = currentTile.gatherCount[currentPlayer.id] || 0;
        
        document.getElementById('gatherCount').textContent = playerGatherCount;
        document.getElementById('gatherLimit').textContent = gatherLimit;
        
        const gatherBtn = document.getElementById('gatherBtn');
        const canGather = currentPlayer.ap >= 2 && playerGatherCount < gatherLimit && currentPlayer.basket.length < 8;
        gatherBtn.disabled = !canGather;
    }

    function updateBasket() {
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        const container = document.getElementById('basketGrid');
        const count = document.getElementById('basketCount');
        
        count.textContent = currentPlayer.basket.length;
        
        container.innerHTML = '';
        
        // Show existing items
        currentPlayer.basket.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'basket-item';
            itemDiv.innerHTML = `
                <button class="discard-btn" onclick="gameModule.discardItem(${index})">×</button>
                <div class="basket-item-name">${item.name}</div>
                <div class="basket-item-element element ${item.element}">${item.element}</div>
            `;
            container.appendChild(itemDiv);
        });
        
        // Show empty slots
        for (let i = currentPlayer.basket.length; i < 8; i++) {
            const emptySlot = document.createElement('div');
            emptySlot.className = 'basket-item';
            emptySlot.style.background = '#f8f9fa';
            emptySlot.style.border = '2px dashed #ccc';
            emptySlot.innerHTML = '<div style="color: #999;">Empty</div>';
            container.appendChild(emptySlot);
        }
    }

    function updatePlayersList() {
        const container = document.getElementById('allPlayersInfo');
        container.innerHTML = '';
        
        gameState.players.forEach((player, index) => {
            const card = document.createElement('div');
            card.className = 'player-card';
            if (index === gameState.currentPlayerIndex) {
                card.classList.add('active');
            }
            
            const posKey = `${player.position.q},${player.position.r}`;
            const tile = gameState.hexMap[posKey];
            
            card.innerHTML = `
                <div class="player-name" style="color: ${player.color};">${player.name}</div>
                <div class="player-stats">
                    <span>AP: ${player.ap}</span>
                    <span>Basket: ${player.basket.length}/8</span>
                    <span>At: ${tile.location.zoneName}</span>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    // ========================================================================
    // Game Actions
    // ========================================================================
    function move(direction) {
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        
        if (currentPlayer.ap < 1) {
            showToast('Not enough AP to move!', 'danger');
            return;
        }
        
        const newPos = {
            q: currentPlayer.position.q + HEX_DIRECTIONS[direction].q,
            r: currentPlayer.position.r + HEX_DIRECTIONS[direction].r
        };
        const newPosKey = `${newPos.q},${newPos.r}`;
        const targetTile = gameState.hexMap[newPosKey];
        
        if (!targetTile) {
            showToast('Cannot move out of bounds!', 'danger');
            return;
        }
        
        if (targetTile.impassable) {
            showToast('Cannot move to impassable terrain!', 'danger');
            return;
        }
        
        if (!canEnterTile(targetTile)) {
            showToast('This location has reached its player limit!', 'danger');
            return;
        }
        
        // Remove player from old position
        const oldPosKey = `${currentPlayer.position.q},${currentPlayer.position.r}`;
        const oldTile = gameState.hexMap[oldPosKey];
        oldTile.players = oldTile.players.filter(id => id !== currentPlayer.id);
        
        // Add player to new position
        currentPlayer.position = newPos;
        targetTile.players.push(currentPlayer.id);
        
        // Deduct AP
        currentPlayer.ap -= 1;
        
        renderGame();
        updateUI();
        showToast(`Moved ${direction.toUpperCase()}! (1 AP)`, 'success');
    }

    function gatherResources() {
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        
        if (currentPlayer.ap < 2) {
            showToast('Not enough AP to gather! (Need 2 AP)', 'danger');
            return;
        }
        
        if (currentPlayer.basket.length >= 8) {
            showToast('Basket is full! Discard items first.', 'danger');
            return;
        }
        
        const posKey = `${currentPlayer.position.q},${currentPlayer.position.r}`;
        const currentTile = gameState.hexMap[posKey];
        
        const limitStr = currentTile.location.gatherLimit;
        const match = limitStr.match(/\d+/);
        const gatherLimit = match ? parseInt(match[0]) : 0;
        
        const playerGatherCount = currentTile.gatherCount[currentPlayer.id] || 0;
        
        if (playerGatherCount >= gatherLimit) {
            showToast('You have reached the gather limit for this location!', 'danger');
            return;
        }
        
        // Get random ingredient (placeholder - draws from ingredients)
        const ingredient = getRandomIngredient();
        
        if (ingredient) {
            currentPlayer.basket.push(ingredient);
            currentPlayer.ap -= 2;
            
            // Increment gather count
            if (!currentTile.gatherCount[currentPlayer.id]) {
                currentTile.gatherCount[currentPlayer.id] = 0;
            }
            currentTile.gatherCount[currentPlayer.id]++;
            
            updateUI();
            showToast(`Gathered ${ingredient.name}! (2 AP)`, 'success');
        } else {
            showToast('No ingredients available!', 'warning');
        }
    }

    function getRandomIngredient() {
        // Get ingredients from ingredientsModule
        const saved = localStorage.getItem('craftingIngredients');
        if (!saved) return null;
        
        const ingredients = JSON.parse(saved);
        if (ingredients.length === 0) return null;
        
        const randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
        const elements = ['fire', 'water', 'earth', 'wind'];
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        
        const nameMap = {
            'fire': randomIngredient.fireName,
            'water': randomIngredient.waterName,
            'earth': randomIngredient.earthName,
            'wind': randomIngredient.windName
        };
        
        return {
            name: nameMap[randomElement],
            element: randomElement,
            size: randomIngredient.size,
            cost: randomIngredient.cost
        };
    }

    function discardItem(index) {
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        
        if (confirm(`Discard ${currentPlayer.basket[index].name}?`)) {
            currentPlayer.basket.splice(index, 1);
            updateUI();
            showToast('Item discarded!', 'warning');
        }
    }

    function endTurn() {
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        
        // Reset gather count for current player when leaving a tile
        const posKey = `${currentPlayer.position.q},${currentPlayer.position.r}`;
        const currentTile = gameState.hexMap[posKey];
        
        // Move to next player
        gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
        
        // If we're back to player 1, increment turn number
        if (gameState.currentPlayerIndex === 0) {
            gameState.turnNumber++;
        }
        
        // Reset AP for new player
        const nextPlayer = gameState.players[gameState.currentPlayerIndex];
        nextPlayer.ap = gameState.maxAP;
        
        // Reset gather count for the new player at their current position
        const nextPosKey = `${nextPlayer.position.q},${nextPlayer.position.r}`;
        const nextTile = gameState.hexMap[nextPosKey];
        if (nextTile.gatherCount[nextPlayer.id]) {
            nextTile.gatherCount[nextPlayer.id] = 0;
        }
        
        updateUI();
        renderGame();
        showToast(`${nextPlayer.name}'s turn!`, 'info');
    }

    // ========================================================================
    // Public API
    // ========================================================================
    return {
        init,
        openSetup,
        closeSetup,
        startNewGame,
        resetGame,
        move,
        gatherResources,
        discardItem,
        endTurn
    };
})();
