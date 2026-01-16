import { defaultRecipes } from './config/defaultrecipes.js';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storage.js';
import { generateRecipesCSV, generateCounterCSV, downloadCSV } from './utils/csvexport.js';
import { showToast } from './utils/notifications.js';
import { addRecipe, updateRecipe, deleteRecipe, filterRecipes } from './services/recipeservice.js';
import { updateShapeGrid, clearShape } from './components/shapeEditor.js';
import { renderRecipeTable } from './components/recipeTable.js';
import { renderCounterGrid } from './components/counterGrid.js';
import { updateStats } from './components/statsdisplay.js';
import { openAddModal, openEditModal, closeModal, getFormData, setupModalEventListeners } from './ui/modal.js';

let recipes = [];

function init() {
    recipes = loadFromLocalStorage() || [...defaultRecipes];
    renderAll();
    setupEventListeners();
}

function renderAll() {
    const searchTerm = document.getElementById('searchInput')?.value || '';
    const filtered = filterRecipes(recipes, searchTerm);
    
    renderRecipeTable(recipes, filtered, handleEdit, handleDelete);
    renderCounterGrid(recipes);
    updateStats(recipes);
}

function setupEventListeners() {
    // Toolbar buttons
    const addBtn = document.getElementById('addRecipeBtn');
    const exportRecipesBtn = document.getElementById('exportRecipesBtn');
    const exportCounterBtn = document.getElementById('exportCounterBtn');
    const importBtn = document.getElementById('importDataBtn');
    const resetBtn = document.getElementById('resetDataBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (addBtn) addBtn.addEventListener('click', openAddModal);
    if (exportRecipesBtn) exportRecipesBtn.addEventListener('click', handleExportRecipes);
    if (exportCounterBtn) exportCounterBtn.addEventListener('click', handleExportCounter);
    if (importBtn) importBtn.addEventListener('click', handleImport);
    if (resetBtn) resetBtn.addEventListener('click', handleReset);
    if (searchInput) searchInput.addEventListener('input', renderAll);
    
    // Modal form
    const form = document.getElementById('recipeForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Modal event listeners
    setupModalEventListeners(
        (tier) => updateShapeGrid(tier),
        () => {
            clearShape();
            showToast('Shape pattern cleared!', 'warning');
        }
    );
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = getFormData();
    
    if (formData.elements.length === 0) {
        alert('Please select at least one element!');
        return;
    }
    
    const recipe = {
        item: formData.itemName,
        elements: formData.elements,
        tier: formData.tier,
        shape: formData.shape
    };
    
    if (formData.editIndex >= 0) {
        recipes = updateRecipe(recipes, formData.editIndex, recipe);
        showToast('Recipe updated successfully!');
    } else {
        recipes = addRecipe(recipes, recipe);
        showToast('Recipe added successfully!');
    }
    
    saveToLocalStorage(recipes);
    renderAll();
    closeModal();
}

function handleEdit(index) {
    openEditModal(recipes[index], index);
}

function handleDelete(index) {
    if (confirm(`Are you sure you want to delete "${recipes[index].item}"?`)) {
        recipes = deleteRecipe(recipes, index);
        saveToLocalStorage(recipes);
        renderAll();
        showToast('Recipe deleted successfully!', 'danger');
    }
}

function handleExportRecipes() {
    const csv = generateRecipesCSV(recipes);
    downloadCSV(csv, 'crafting_recipes.csv');
    showToast('Recipes CSV downloaded!');
}

function handleExportCounter() {
    const csv = generateCounterCSV(recipes);
    downloadCSV(csv, 'element_combination_counter.csv');
    showToast('Counter CSV downloaded!');
}

function handleImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (Array.isArray(data) && data.every(r => r.item && r.elements && r.tier && r.shape)) {
                    if (confirm('This will replace all current recipes. Continue?')) {
                        recipes = data;
                        saveToLocalStorage(recipes);
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

function handleReset() {
    if (confirm('This will reset all recipes to default. Continue?')) {
        recipes = [...defaultRecipes];
        saveToLocalStorage(recipes);
        renderAll();
        showToast('Data reset to default!', 'warning');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', init);