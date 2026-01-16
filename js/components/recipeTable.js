import { getGridSize } from './shapeEditor.js';

export function createShapeGrid(shape, tier) {
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

export function formatElements(elements) {
    return elements
        .map(e => `<span class="element ${e}">${e}</span>`)
        .join('');
}

export function createActionButtons(index, onEdit, onDelete) {
    return `
        <div class="action-buttons">
            <button class="btn btn-info btn-sm" data-action="edit" data-index="${index}">
                ✏️ Edit
            </button>
            <button class="btn btn-danger btn-sm" data-action="delete" data-index="${index}">
                🗑️
            </button>
        </div>
    `;
}

export function renderRecipeTable(recipes, filteredRecipes, onEdit, onDelete) {
    const container = document.getElementById('recipeTableContainer');
    
    if (!container) return;
    
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
                    <th style="width: 20%;">Item</th>
                    <th style="width: 10%;">Tier</th>
                    <th style="width: 25%;">Elements</th>
                    <th style="width: 15%;">Recipe</th>
                    <th style="width: 15%;">Shape</th>
                    <th style="width: 15%;">Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    filteredRecipes.forEach((recipe) => {
        const actualIndex = recipes.findIndex(r => r === recipe);
        const elementsHtml = formatElements(recipe.elements);
        const shapeGridHtml = createShapeGrid(recipe.shape, recipe.tier).outerHTML;
        
        html += `
            <tr>
                <td><strong>${recipe.item}</strong></td>
                <td><span class="tier-badge tier-${recipe.tier}">Tier ${recipe.tier}</span></td>
                <td>${elementsHtml}</td>
                <td>${recipe.elements.join(' + ')}</td>
                <td>${shapeGridHtml}</td>
                <td>${createActionButtons(actualIndex)}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
    
    // Attach event listeners
    container.querySelectorAll('[data-action="edit"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            onEdit(index);
        });
    });
    
    container.querySelectorAll('[data-action="delete"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            onDelete(index);
        });
    });
}