import { getElementCombinationCounter } from '../services/recipeservice.js';

export function renderCounterGrid(recipes) {
    const container = document.getElementById('counterGrid');
    
    if (!container) return;
    
    const sortedCombos = getElementCombinationCounter(recipes);
    
    container.innerHTML = sortedCombos.map(([combo, count]) => `
        <div class="counter-card">
            <div class="counter-combo">${combo}</div>
            <div class="counter-count">${count} recipe${count > 1 ? 's' : ''}</div>
        </div>
    `).join('');
}