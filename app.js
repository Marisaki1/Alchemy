// ============================================================================
// CRAFTING RECIPE MANAGER - Main JavaScript Application
// Version 2.1 - With CSV Import Support
// ============================================================================

// ============================================================================
// Default Recipes Database - Complete list with all 45 recipes
// ============================================================================
const defaultRecipes = [
    { item: "Potion", elements: [{element: "water", amount: 1}, {element: "wind", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Iron Boots", elements: [{element: "earth", amount: 2}, {element: "fire", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Coffee", elements: [{element: "water", amount: 1}, {element: "fire", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Thread", elements: [{element: "earth", amount: 1}, {element: "wind", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Biscuit", elements: [{element: "earth", amount: 1}, {element: "water", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Leggings", elements: [{element: "wind", amount: 1}, {element: "fire", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Cloth", elements: [{element: "wind", amount: 1}, {element: "fire", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Plant", elements: [{element: "earth", amount: 1}, {element: "wind", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Fluid", elements: [{element: "wind", amount: 1}, {element: "water", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Neutralizer", elements: [{element: "earth", amount: 1}, {element: "fire", amount: 1}, {element: "water", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Coal", elements: [{element: "earth", amount: 1}, {element: "fire", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Garland", elements: [{element: "wind", amount: 1}, {element: "water", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Flour", elements: [{element: "water", amount: 1}, {element: "earth", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Bomb", elements: [{element: "fire", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Staff", elements: [{element: "earth", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Bow", elements: [{element: "wind", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Scissor", elements: [{element: "fire", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Mystery Box", elements: [{element: "earth", amount: 1}, {element: "wind", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Crystal", elements: [{element: "water", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Fish net", elements: [{element: "wind", amount: 1}, {element: "water", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Mirror", elements: [{element: "water", amount: 1}, {element: "fire", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Cookies", elements: [{element: "water", amount: 1}, {element: "fire", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Pickaxe", elements: [{element: "earth", amount: 1}, {element: "wind", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Shard", elements: [{element: "wind", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Crossbow", elements: [{element: "wind", amount: 1}, {element: "earth", amount: 1}], tier: 3, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Sword", elements: [{element: "earth", amount: 1}, {element: "fire", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Brooch", elements: [{element: "earth", amount: 1}, {element: "fire", amount: 1}, {element: "water", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Steel plate", elements: [{element: "earth", amount: 1}, {element: "fire", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Hammer", elements: [{element: "earth", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Explorer's Backpack", elements: [{element: "wind", amount: 1}], tier: 3, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Chair", elements: [{element: "water", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Mask", elements: [{element: "wind", amount: 1}, {element: "earth", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Pants", elements: [{element: "water", amount: 1}, {element: "wind", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Tent", elements: [{element: "earth", amount: 1}, {element: "water", amount: 1}], tier: 3, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Training Weights", elements: [{element: "earth", amount: 1}, {element: "fire", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Anvil", elements: [{element: "fire", amount: 1}, {element: "wind", amount: 1}], tier: 3, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Runestone", elements: [{element: "water", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Pedestal", elements: [{element: "fire", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Earrings", elements: [{element: "earth", amount: 1}, {element: "fire", amount: 1}, {element: "water", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Slingshot", elements: [{element: "wind", amount: 1}, {element: "earth", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Leather", elements: [{element: "earth", amount: 1}, {element: "fire", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Apron", elements: [{element: "water", amount: 1}, {element: "wind", amount: 1}], tier: 2, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Diamond Fragment", elements: [{element: "earth", amount: 1}], tier: 1, shape: [0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Wings", elements: [{element: "wind", amount: 1}], tier: 3, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] },
    { item: "Philosopher Stone", elements: [{element: "earth", amount: 1}, {element: "fire", amount: 1}, {element: "water", amount: 1}, {element: "wind", amount: 1}], tier: 3, shape: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], effects: ["", "", ""] }
];

// ============================================================================
// Global Variables
// ============================================================================
let recipes = [];
let currentShape = [];
let pieChart = null;
let currentFilteredRecipes = [];

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get grid size based on tier
 * @param {number} tier - The tier level (1, 2, or 3)
 * @returns {number} Grid size (3, 4, or 5)
 */
function getGridSize(tier) {
    return tier === 1 ? 3 : tier === 2 ? 4 : 5;
}

/**
 * Load recipes from localStorage or use defaults
 */
function loadRecipes() {
    const saved = localStorage.getItem('craftingRecipes');
    recipes = saved ? JSON.parse(saved) : [...defaultRecipes];
    renderAll();
}

/**
 * Save recipes to localStorage
 */
function saveToLocalStorage() {
    localStorage.setItem('craftingRecipes', JSON.stringify(recipes));
}

/**
 * Render all components
 */
function renderAll() {
    applyFilters();
    updateStats();
    renderPieChart();
}

// ============================================================================
// Shape Grid Functions
// ============================================================================

/**
 * Create a visual shape grid display
 * @param {Array} shape - Array of 0s and 1s representing the shape
 * @param {number} tier - Tier level
 * @returns {HTMLElement} Grid element
 */
function createShapeGrid(shape, tier) {
    const size = getGridSize(tier);
    const grid = document.createElement('div');
    grid.className = 'shape-grid';
    grid.style.gridTemplateColumns = `repeat(${size}, 16px)`;
    
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'shape-cell';
        if (shape[i] === 1) {
            cell.classList.add('filled');
        }
        grid.appendChild(cell);
    }
    
    return grid;
}

/**
 * Update the shape editor grid when tier changes
 */
function updateShapeGrid() {
    const tier = parseInt(document.getElementById('itemTier').value);
    const size = getGridSize(tier);
    const totalCells = size * size;
    
    if (currentShape.length !== totalCells) {
        currentShape = new Array(totalCells).fill(0);
    }
    
    renderShapeEditor(size);
}

/**
 * Render the shape editor in the modal
 * @param {number} size - Grid size
 */
function renderShapeEditor(size) {
    const grid = document.getElementById('shapeEditorGrid');
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 40px)`;
    
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'shape-editor-cell';
        if (currentShape[i] === 1) {
            cell.classList.add('active');
        }
        cell.onclick = () => toggleShapeCell(i);
        grid.appendChild(cell);
    }
}

/**
 * Toggle a shape cell on/off
 * @param {number} index - Cell index
 */
function toggleShapeCell(index) {
    currentShape[index] = currentShape[index] === 1 ? 0 : 1;
    const cells = document.querySelectorAll('.shape-editor-cell');
    cells[index].classList.toggle('active');
}

/**
 * Clear all shape cells
 */
function clearShape() {
    currentShape = currentShape.map(() => 0);
    document.querySelectorAll('.shape-editor-cell').forEach(cell => {
        cell.classList.remove('active');
    });
    showToast('Shape pattern cleared!', 'warning');
}

// ============================================================================
// Filtering and Sorting Functions
// ============================================================================

/**
 * Get currently selected filters and sort options
 * @returns {Object} Filter and sort configuration
 */
function getFilterConfig() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sortBy = document.getElementById('sortSelect').value;
    const tierFilter = document.getElementById('tierFilter').value;
    const effectsFilter = document.getElementById('effectsFilter').value;
    const elementCountFilter = document.getElementById('elementCountFilter').value;
    
    // Get selected element filters
    const elementFilters = [];
    if (document.getElementById('filterEarth').checked) elementFilters.push('earth');
    if (document.getElementById('filterFire').checked) elementFilters.push('fire');
    if (document.getElementById('filterWater').checked) elementFilters.push('water');
    if (document.getElementById('filterWind').checked) elementFilters.push('wind');
    
    return {
        searchTerm,
        sortBy,
        tierFilter,
        effectsFilter,
        elementCountFilter,
        elementFilters
    };
}

/**
 * Filter recipes based on current filter configuration
 * @param {Array} recipesToFilter - Recipes to filter
 * @param {Object} config - Filter configuration
 * @returns {Array} Filtered recipes
 */
function filterRecipes(recipesToFilter, config) {
    return recipesToFilter.filter(recipe => {
        // Search filter
        if (config.searchTerm) {
            const matchesSearch = 
                recipe.item.toLowerCase().includes(config.searchTerm) ||
                recipe.elements.some(e => e.element.toLowerCase().includes(config.searchTerm)) ||
                `tier ${recipe.tier}`.includes(config.searchTerm) ||
                (recipe.effects && recipe.effects.some(ef => ef.toLowerCase().includes(config.searchTerm)));
            
            if (!matchesSearch) return false;
        }
        
        // Tier filter
        if (config.tierFilter !== 'all') {
            if (recipe.tier !== parseInt(config.tierFilter)) return false;
        }
        
        // Element filters (recipe must contain at least one of the selected elements)
        if (config.elementFilters.length > 0) {
            const hasSelectedElement = recipe.elements.some(e => 
                config.elementFilters.includes(e.element)
            );
            if (!hasSelectedElement) return false;
        }
        
        // Effects filter
        if (config.effectsFilter !== 'all') {
            const hasEffects = recipe.effects && recipe.effects.some(e => e.trim() !== '');
            if (config.effectsFilter === 'with-effects' && !hasEffects) return false;
            if (config.effectsFilter === 'no-effects' && hasEffects) return false;
        }
        
        // Element count filter
        if (config.elementCountFilter !== 'all') {
            const elementCount = recipe.elements.length;
            if (elementCount !== parseInt(config.elementCountFilter)) return false;
        }
        
        return true;
    });
}

/**
 * Sort recipes based on sort configuration
 * @param {Array} recipesToSort - Recipes to sort
 * @param {string} sortBy - Sort option
 * @returns {Array} Sorted recipes
 */
function sortRecipes(recipesToSort, sortBy) {
    const sorted = [...recipesToSort];
    
    switch(sortBy) {
        case 'name-asc':
            sorted.sort((a, b) => a.item.localeCompare(b.item));
            break;
        case 'name-desc':
            sorted.sort((a, b) => b.item.localeCompare(a.item));
            break;
        case 'tier-asc':
            sorted.sort((a, b) => a.tier - b.tier);
            break;
        case 'tier-desc':
            sorted.sort((a, b) => b.tier - a.tier);
            break;
        case 'elements-asc':
            sorted.sort((a, b) => a.elements.length - b.elements.length);
            break;
        case 'elements-desc':
            sorted.sort((a, b) => b.elements.length - a.elements.length);
            break;
    }
    
    return sorted;
}

/**
 * Apply all filters and sorting, then render recipes
 */
function applyFilters() {
    const config = getFilterConfig();
    let filteredRecipes = filterRecipes(recipes, config);
    filteredRecipes = sortRecipes(filteredRecipes, config.sortBy);
    
    // Store filtered recipes globally for counter
    currentFilteredRecipes = filteredRecipes;
    
    renderRecipesTable(filteredRecipes);
    updateFilterStatus(filteredRecipes.length);
    updateCounter(); // Update counter when filters change
}

/**
 * Clear all filters and reset to defaults
 */
function clearFilters() {
    // Clear search
    document.getElementById('searchInput').value = '';
    
    // Reset sort
    document.getElementById('sortSelect').value = 'name-asc';
    
    // Reset tier filter
    document.getElementById('tierFilter').value = 'all';
    
    // Reset effects filter
    document.getElementById('effectsFilter').value = 'all';
    
    // Reset element count filter
    document.getElementById('elementCountFilter').value = 'all';
    
    // Uncheck all element filters
    document.getElementById('filterEarth').checked = false;
    document.getElementById('filterFire').checked = false;
    document.getElementById('filterWater').checked = false;
    document.getElementById('filterWind').checked = false;
    
    // Uncheck counter filter checkbox
    const counterCheckbox = document.getElementById('counterFilterCheckbox');
    if (counterCheckbox) {
        counterCheckbox.checked = false;
    }
    
    applyFilters();
    showToast('All filters cleared!', 'info');
}

/**
 * Update the filter status display
 * @param {number} filteredCount - Number of filtered recipes
 */
function updateFilterStatus(filteredCount) {
    document.getElementById('filteredCount').textContent = filteredCount;
    document.getElementById('totalCount').textContent = recipes.length;
}

// ============================================================================
// Recipe Rendering Functions
// ============================================================================

/**
 * Render the recipes table with filtered and sorted data
 * @param {Array} recipesToRender - Recipes to display
 */
function renderRecipesTable(recipesToRender) {
    const container = document.getElementById('recipeTableContainer');

    if (recipesToRender.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 60px;">🔍</div>
                <h3>No recipes found</h3>
                <p>Try adjusting your filters or search criteria</p>
            </div>
        `;
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th style="width: 15%;">Item</th>
                    <th style="width: 8%;">Tier</th>
                    <th style="width: 15%;">Elements</th>
                    <th style="width: 15%;">Recipe</th>
                    <th style="width: 20%;">Effects</th>
                    <th style="width: 10%;">Shape</th>
                    <th style="width: 12%;">Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    recipesToRender.forEach((recipe) => {
        const actualIndex = recipes.findIndex(r => r === recipe);
        const elementsHtml = recipe.elements
            .map(e => `<span class="element ${e.element}">${e.element}</span>`)
            .join('');
        
        const recipeText = recipe.elements
            .map(e => `${e.element} x${e.amount}`)
            .join(' + ');
        
        const effectsHtml = recipe.effects && recipe.effects.filter(e => e.trim()).length > 0 
            ? `<ul class="effects-list">${recipe.effects.filter(e => e.trim()).map(e => `<li>${e}</li>`).join('')}</ul>`
            : '<span style="color: #999; font-size: 12px;">No effects</span>';
        
        const shapeGridHtml = createShapeGrid(recipe.shape, recipe.tier).outerHTML;
        
        html += `
            <tr>
                <td><strong>${recipe.item}</strong></td>
                <td><span class="tier-badge tier-${recipe.tier}">Tier ${recipe.tier}</span></td>
                <td>${elementsHtml}</td>
                <td style="font-size: 13px;">${recipeText}</td>
                <td>${effectsHtml}</td>
                <td>${shapeGridHtml}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-info btn-sm" onclick="editRecipe(${actualIndex})">
                            ✏️
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteRecipe(${actualIndex})">
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

/**
 * Render the element combination counter
 */
function renderCounter(recipesToAnalyze = recipes) {
    const counterMap = {};
    
    recipesToAnalyze.forEach(recipe => {
        const combo = recipe.elements.map(e => e.element).slice().sort().join(' + ');
        counterMap[combo] = (counterMap[combo] || 0) + 1;
    });

    const sortedCombos = Object.entries(counterMap).sort((a, b) => b[1] - a[1]);
    const container = document.getElementById('counterGrid');
    
    // Update counter stats
    const counterRecipeCount = document.getElementById('counterRecipeCount');
    if (counterRecipeCount) {
        counterRecipeCount.textContent = recipesToAnalyze.length;
    }
    
    // Show empty state if no combinations
    if (sortedCombos.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div style="font-size: 50px;">📊</div>
                <h3>No element combinations found</h3>
                <p>No recipes match your current filters</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = sortedCombos.map(([combo, count]) => `
        <div class="counter-card">
            <div class="counter-combo">${combo}</div>
            <div class="counter-count">${count} recipe${count > 1 ? 's' : ''}</div>
        </div>
    `).join('');
}

/**
 * Update statistics display
 */
function updateStats() {
    const tier1 = recipes.filter(r => r.tier === 1).length;
    const tier2 = recipes.filter(r => r.tier === 2).length;
    const tier3 = recipes.filter(r => r.tier === 3).length;

    document.getElementById('totalRecipes').textContent = recipes.length;
    document.getElementById('tier1Count').textContent = tier1;
    document.getElementById('tier2Count').textContent = tier2;
    document.getElementById('tier3Count').textContent = tier3;
}

/**
 * Render the pie chart showing tier distribution
 */
function renderPieChart() {
    const tier1 = recipes.filter(r => r.tier === 1).length;
    const tier2 = recipes.filter(r => r.tier === 2).length;
    const tier3 = recipes.filter(r => r.tier === 3).length;

    const canvas = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;
    
    const total = tier1 + tier2 + tier3;
    if (total === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#999';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('No recipes yet', canvas.width / 2, canvas.height / 2);
        return;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    
    const colors = ['#28a745', '#ffc107', '#dc3545'];
    const data = [tier1, tier2, tier3];
    const labels = ['Tier 1', 'Tier 2', 'Tier 3'];
    
    let currentAngle = -Math.PI / 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw pie slices
    data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw percentage text
        if (value > 0) {
            const percentage = ((value / total) * 100).toFixed(1);
            const textAngle = currentAngle + sliceAngle / 2;
            const textX = centerX + Math.cos(textAngle) * (radius * 0.7);
            const textY = centerY + Math.sin(textAngle) * (radius * 0.7);
            
            ctx.fillStyle = 'white';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(percentage + '%', textX, textY);
        }
        
        currentAngle += sliceAngle;
    });
    
    // Draw legend
    let legendY = 240;
    labels.forEach((label, index) => {
        ctx.fillStyle = colors[index];
        ctx.fillRect(20, legendY, 15, 15);
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`${label}: ${data[index]}`, 40, legendY + 11);
        legendY += 20;
    });
}

// ============================================================================
// Modal Functions
// ============================================================================

/**
 * Open the add recipe modal
 */
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Add New Recipe';
    document.getElementById('recipeForm').reset();
    document.getElementById('editIndex').value = '-1';
    document.getElementById('itemTier').value = '1';
    
    // Reset element checkboxes and amounts
    document.querySelectorAll('.checkbox-label').forEach(label => {
        label.classList.remove('checked');
        const checkbox = label.querySelector('input[type="checkbox"]');
        const amountInput = label.querySelector('input[type="number"]');
        if (checkbox) checkbox.checked = false;
        if (amountInput) {
            amountInput.disabled = true;
            amountInput.value = 1;
        }
    });
    
    // Reset effects
    document.getElementById('effect1').value = '';
    document.getElementById('effect2').value = '';
    document.getElementById('effect3').value = '';
    
    currentShape = new Array(9).fill(0);
    updateShapeGrid();
    
    document.getElementById('recipeModal').style.display = 'block';
}

/**
 * Edit an existing recipe
 * @param {number} index - Recipe index
 */
function editRecipe(index) {
    const recipe = recipes[index];
    document.getElementById('modalTitle').textContent = 'Edit Recipe';
    document.getElementById('itemName').value = recipe.item;
    document.getElementById('itemTier').value = recipe.tier;
    document.getElementById('editIndex').value = index;
    
    // Reset all checkboxes first
    document.querySelectorAll('.checkbox-label').forEach(label => {
        const checkbox = label.querySelector('input[type="checkbox"]');
        const amountInput = label.querySelector('input[type="number"]');
        if (checkbox) checkbox.checked = false;
        label.classList.remove('checked');
        if (amountInput) {
            amountInput.disabled = true;
            amountInput.value = 1;
        }
    });
    
    // Set element checkboxes and amounts
    recipe.elements.forEach(el => {
        const checkbox = document.querySelector(`input[name="elements"][value="${el.element}"]`);
        if (checkbox) {
            checkbox.checked = true;
            const label = checkbox.parentElement;
            label.classList.add('checked');
            const amountInput = document.getElementById(`${el.element}Amount`);
            if (amountInput) {
                amountInput.disabled = false;
                amountInput.value = el.amount;
            }
        }
    });
    
    // Set effects
    if (recipe.effects) {
        document.getElementById('effect1').value = recipe.effects[0] || '';
        document.getElementById('effect2').value = recipe.effects[1] || '';
        document.getElementById('effect3').value = recipe.effects[2] || '';
    }
    
    currentShape = [...recipe.shape];
    updateShapeGrid();
    
    document.getElementById('recipeModal').style.display = 'block';
}

/**
 * Delete a recipe
 * @param {number} index - Recipe index
 */
function deleteRecipe(index) {
    if (confirm(`Are you sure you want to delete "${recipes[index].item}"?`)) {
        recipes.splice(index, 1);
        saveToLocalStorage();
        renderAll();
        showToast('Recipe deleted successfully!', 'danger');
    }
}

/**
 * Close the modal
 */
function closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}

/**
 * Toggle element checkbox and enable/disable amount input
 * @param {HTMLInputElement} checkbox - The checkbox element
 */
function toggleElementCheckbox(checkbox) {
    const label = checkbox.parentElement;
    const amountInput = label.querySelector('input[type="number"]');
    
    if (checkbox.checked) {
        label.classList.add('checked');
        if (amountInput) amountInput.disabled = false;
    } else {
        label.classList.remove('checked');
        if (amountInput) amountInput.disabled = true;
    }
}

/**
 * Save recipe (add or update)
 * @param {Event} event - Form submit event
 */
function saveRecipe(event) {
    event.preventDefault();
    
    const itemName = document.getElementById('itemName').value.trim();
    const tier = parseInt(document.getElementById('itemTier').value);
    
    const elements = [];
    document.querySelectorAll('input[name="elements"]:checked').forEach(checkbox => {
        const element = checkbox.value;
        const amountInput = document.getElementById(`${element}Amount`);
        const amount = amountInput ? parseInt(amountInput.value) || 1 : 1;
        elements.push({ element, amount });
    });
    
    if (elements.length === 0) {
        alert('Please select at least one element!');
        return;
    }

    const effects = [
        document.getElementById('effect1').value.trim(),
        document.getElementById('effect2').value.trim(),
        document.getElementById('effect3').value.trim()
    ];

    const editIndex = parseInt(document.getElementById('editIndex').value);
    const recipe = {
        item: itemName,
        elements: elements,
        tier: tier,
        shape: [...currentShape],
        effects: effects
    };

    if (editIndex >= 0) {
        recipes[editIndex] = recipe;
        showToast('Recipe updated successfully!');
    } else {
        recipes.push(recipe);
        showToast('Recipe added successfully!');
    }

    saveToLocalStorage();
    renderAll();
    closeModal();
}

// ============================================================================
// Export/Import Functions
// ============================================================================

/**
 * Download recipes as CSV
 */
function downloadRecipesCSV() {
    let csv = 'Item,Tier,Elements,Recipe,Effect 1,Effect 2,Effect 3,Shape\n';
    recipes.forEach(recipe => {
        const elements = recipe.elements.map(e => e.element).join(' ');
        const recipeText = recipe.elements.map(e => `${e.element} x${e.amount}`).join(' + ');
        const shapeText = recipe.shape.join('');
        const effects = recipe.effects ? recipe.effects.map(e => `"${e}"`).join(',') : '"","",""';
        csv += `"${recipe.item}",${recipe.tier},"${elements}","${recipeText}",${effects},"${shapeText}"\n`;
    });
    downloadCSV(csv, 'crafting_recipes.csv');
    showToast('Recipes CSV downloaded!');
}

/**
 * Download counter data as CSV
 */
function downloadCounterCSV() {
    const counterMap = {};
    recipes.forEach(recipe => {
        const combo = recipe.elements.map(e => e.element).slice().sort().join(' + ');
        counterMap[combo] = (counterMap[combo] || 0) + 1;
    });

    const sortedCombos = Object.entries(counterMap).sort((a, b) => b[1] - a[1]);
    
    let csv = 'Element Combination,Count\n';
    sortedCombos.forEach(([combo, count]) => {
        csv += `"${combo}",${count}\n`;
    });
    
    downloadCSV(csv, 'element_combination_counter.csv');
    showToast('Counter CSV downloaded!');
}

/**
 * Download CSV file
 * @param {string} content - CSV content
 * @param {string} filename - File name
 */
function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Import data from CSV file
 */
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const csvContent = event.target.result;
                const importedRecipes = parseCSV(csvContent);
                
                if (importedRecipes.length > 0) {
                    if (confirm(`Found ${importedRecipes.length} recipes. This will replace all current recipes. Continue?`)) {
                        recipes = importedRecipes;
                        saveToLocalStorage();
                        renderAll();
                        showToast(`Successfully imported ${importedRecipes.length} recipes!`);
                    }
                } else {
                    alert('No valid recipes found in CSV file!');
                }
            } catch (error) {
                alert('Error reading file: ' + error.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

/**
 * Parse CSV content into recipe objects
 * @param {string} csvContent - The CSV file content
 * @returns {Array} Array of recipe objects
 */
function parseCSV(csvContent) {
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    // Skip header line
    if (lines.length < 2) {
        throw new Error('CSV file is empty or invalid');
    }
    
    const recipes = [];
    
    // Process each line (skip header at index 0)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        try {
            const recipe = parseCSVLine(line);
            if (recipe) {
                recipes.push(recipe);
            }
        } catch (error) {
            console.warn(`Skipping line ${i + 1}: ${error.message}`);
        }
    }
    
    return recipes;
}

/**
 * Parse a single CSV line into a recipe object
 * @param {string} line - CSV line
 * @returns {Object|null} Recipe object or null if invalid
 */
function parseCSVLine(line) {
    // Parse CSV with quoted fields
    const fields = [];
    let currentField = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            fields.push(currentField);
            currentField = '';
        } else {
            currentField += char;
        }
    }
    fields.push(currentField); // Add last field
    
    // Expected format: Item,Tier,Elements,Recipe,Effect 1,Effect 2,Effect 3,Shape
    if (fields.length < 8) {
        throw new Error('Invalid CSV format - not enough columns');
    }
    
    const itemName = fields[0].trim();
    const tier = parseInt(fields[1].trim());
    const recipeText = fields[3].trim(); // e.g., "earth x2 + fire x1"
    const effect1 = fields[4].trim();
    const effect2 = fields[5].trim();
    const effect3 = fields[6].trim();
    const shapeText = fields[7].trim();
    
    // Validate required fields
    if (!itemName || !tier || !recipeText) {
        throw new Error('Missing required fields');
    }
    
    // Parse elements from recipe text (e.g., "earth x2 + fire x1")
    const elements = [];
    const elementParts = recipeText.split('+').map(s => s.trim());
    
    for (const part of elementParts) {
        const match = part.match(/(\w+)\s*x(\d+)/i);
        if (match) {
            const element = match[1].toLowerCase();
            const amount = parseInt(match[2]);
            
            // Validate element type
            if (['earth', 'fire', 'water', 'wind'].includes(element)) {
                elements.push({ element, amount });
            }
        }
    }
    
    if (elements.length === 0) {
        throw new Error('No valid elements found');
    }
    
    // Parse shape (should be a string of 0s and 1s)
    const gridSize = tier === 1 ? 9 : tier === 2 ? 16 : 25;
    let shape = new Array(gridSize).fill(0);
    
    if (shapeText) {
        for (let i = 0; i < Math.min(shapeText.length, gridSize); i++) {
            shape[i] = shapeText[i] === '1' ? 1 : 0;
        }
    }
    
    // Create recipe object
    return {
        item: itemName,
        tier: tier,
        elements: elements,
        effects: [effect1, effect2, effect3],
        shape: shape
    };
}

/**
 * Reset data to default recipes
 */
function resetData() {
    if (confirm('This will reset all recipes to default. Continue?')) {
        recipes = [...defaultRecipes];
        saveToLocalStorage();
        renderAll();
        showToast('Data reset to default!', 'warning');
    }
}

// ============================================================================
// UI Helper Functions
// ============================================================================

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Toast type (success, danger, warning, info)
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    
    const colors = {
        'success': '#28a745',
        'danger': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8'
    };
    
    toast.style.background = colors[type] || colors['success'];
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// ============================================================================
// Update counter based on checkbox state
// ============================================================================
/**
 * Update the element combination counter based on checkbox state
 */
function updateCounter() {
    const checkbox = document.getElementById('counterFilterCheckbox');
    const useFilteredRecipes = checkbox && checkbox.checked;
    
    if (useFilteredRecipes) {
        renderCounter(currentFilteredRecipes);
    } else {
        renderCounter(recipes);
    }
}

// ============================================================================
// Event Listeners
// ============================================================================

/**
 * Close modal when clicking outside
 */
window.onclick = function(event) {
    const modal = document.getElementById('recipeModal');
    if (event.target === modal) {
        closeModal();
    }
}

// ============================================================================
// Initialize Application
// ============================================================================

// Load recipes when page loads
loadRecipes();