export function generateRecipesCSV(recipes) {
    let csv = 'Item,Tier,Elements,Recipe,Shape\n';
    recipes.forEach(recipe => {
        const elements = recipe.elements.join(' ');
        const recipeText = recipe.elements.join(' + ');
        const shapeText = recipe.shape.join('');
        csv += `"${recipe.item}",${recipe.tier},"${elements}","${recipeText}","${shapeText}"\n`;
    });
    return csv;
}

export function generateCounterCSV(recipes) {
    const counterMap = {};
    recipes.forEach(recipe => {
        const combo = recipe.elements.slice().sort().join(' + ');
        counterMap[combo] = (counterMap[combo] || 0) + 1;
    });

    const sortedCombos = Object.entries(counterMap).sort((a, b) => b[1] - a[1]);
    
    let csv = 'Element Combination,Count\n';
    sortedCombos.forEach(([combo, count]) => {
        csv += `"${combo}",${count}\n`;
    });
    
    return csv;
}

export function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}