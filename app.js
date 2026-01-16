// ============================================================================
// CRAFTING RECIPE MANAGER - Main JavaScript Application
// ============================================================================

// Default Recipes Database - Complete list with all 45 recipes
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
    renderRecipes();
    renderCounter();
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
// Recipe Rendering Functions
// ============================================================================

/**
 * Render the recipes table
 */
function renderRecipes() {
    const container = document.getElementById('recipeTableContainer');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    const filteredRecipes = recipes.filter(r => 
        r.item.toLowerCase().includes(searchTerm) ||
        r.elements.some(e => e.element.toLowerCase().includes(searchTerm)) ||
        `tier ${r.tier}`.includes(searchTerm) ||
        (r.effects && r.effects.some(ef => ef.toLowerCase().includes(searchTerm)))
    );

    if (filteredRecipes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 60px;">🔍</div>
                <h3>No recipes found</h3>
                <p>Try adjusting your search or add a new recipe</p>
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

    filteredRecipes.forEach((recipe, index) => {
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
function renderCounter() {
    const counterMap = {};
    
    recipes.forEach(recipe => {
        const combo = recipe.elements.map(e => e.element).slice().sort().join(' + ');
        counterMap[combo] = (counterMap[combo] || 0) + 1;
    });

    const sortedCombos = Object.entries(counterMap).sort((a, b) => b[1] - a[1]);
    const container = document.getElementById('counterGrid');
    
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
 * Import data from JSON file
 */
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (Array.isArray(data) && data.every(r => r.item && r.elements && r.tier && r.shape)) {
                    if (confirm('This will replace all current recipes. Continue?')) {
                        recipes = data;
                        saveToLocalStorage();
                        renderAll();
                        showToast('Data imported successfully!');
                    }
                } else {
                    alert('Invalid file format!');
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
// Search/Filter Functions
// ============================================================================

/**
 * Filter recipes based on search input
 */
function filterRecipes() {
    renderRecipes();
}

// ============================================================================
// UI Helper Functions
// ============================================================================

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Toast type (success, danger, warning)
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = type === 'danger' ? '#dc3545' : 
                             type === 'warning' ? '#ffc107' : '#28a745';
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
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