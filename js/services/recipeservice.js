export function addRecipe(recipes, recipe) {
    recipes.push(recipe);
    return recipes;
}

export function updateRecipe(recipes, index, recipe) {
    if (index >= 0 && index < recipes.length) {
        recipes[index] = recipe;
    }
    return recipes;
}

export function deleteRecipe(recipes, index) {
    if (index >= 0 && index < recipes.length) {
        recipes.splice(index, 1);
    }
    return recipes;
}

export function filterRecipes(recipes, searchTerm) {
    const term = searchTerm.toLowerCase();
    return recipes.filter(r => 
        r.item.toLowerCase().includes(term) ||
        r.elements.some(e => e.toLowerCase().includes(term)) ||
        `tier ${r.tier}`.includes(term)
    );
}

export function calculateStats(recipes) {
    const total = recipes.length;
    
    const counterMap = {};
    recipes.forEach(recipe => {
        const combo = recipe.elements.slice().sort().join(' + ');
        counterMap[combo] = (counterMap[combo] || 0) + 1;
    });
    
    const uniqueCombos = Object.keys(counterMap).length;
    const mostCommon = Object.entries(counterMap).sort((a, b) => b[1] - a[1])[0];
    
    return {
        total,
        uniqueCombos,
        mostCommon: mostCommon ? mostCommon[0] : '-'
    };
}

export function getElementCombinationCounter(recipes) {
    const counterMap = {};
    
    recipes.forEach(recipe => {
        const combo = recipe.elements.slice().sort().join(' + ');
        counterMap[combo] = (counterMap[combo] || 0) + 1;
    });
    
    return Object.entries(counterMap).sort((a, b) => b[1] - a[1]);
}