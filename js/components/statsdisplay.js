import { calculateStats } from '../services/recipeservice.js';

export function updateStats(recipes) {
    const stats = calculateStats(recipes);
    
    const totalEl = document.getElementById('totalRecipes');
    const uniqueEl = document.getElementById('uniqueCombos');
    const mostCommonEl = document.getElementById('mostCommon');
    
    if (totalEl) totalEl.textContent = stats.total;
    if (uniqueEl) uniqueEl.textContent = stats.uniqueCombos;
    if (mostCommonEl) mostCommonEl.textContent = stats.mostCommon;
}