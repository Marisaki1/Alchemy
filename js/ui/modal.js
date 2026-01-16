import { initShapeEditor, updateShapeGrid, clearShape, getCurrentShape, setCurrentShape } from '../components/shapeEditor.js';

export function openAddModal() {
    const modal = document.getElementById('recipeModal');
    const form = document.getElementById('recipeForm');
    const title = document.getElementById('modalTitle');
    const editIndex = document.getElementById('editIndex');
    
    if (!modal || !form) return;
    
    title.textContent = 'Add New Recipe';
    form.reset();
    editIndex.value = '-1';
    
    document.getElementById('itemTier').value = '1';
    
    document.querySelectorAll('.checkbox-label').forEach(label => {
        label.classList.remove('checked');
        const checkbox = label.querySelector('input');
        if (checkbox) checkbox.checked = false;
    });
    
    initShapeEditor(1);
    
    modal.style.display = 'block';
}

export function openEditModal(recipe, index) {
    const modal = document.getElementById('recipeModal');
    const title = document.getElementById('modalTitle');
    const itemName = document.getElementById('itemName');
    const itemTier = document.getElementById('itemTier');
    const editIndex = document.getElementById('editIndex');
    
    if (!modal) return;
    
    title.textContent = 'Edit Recipe';
    itemName.value = recipe.item;
    itemTier.value = recipe.tier;
    editIndex.value = index;
    
    document.querySelectorAll('.checkbox-label').forEach(label => {
        const checkbox = label.querySelector('input');
        if (!checkbox) return;
        
        const isChecked = recipe.elements.includes(checkbox.value);
        checkbox.checked = isChecked;
        if (isChecked) {
            label.classList.add('checked');
        } else {
            label.classList.remove('checked');
        }
    });
    
    setCurrentShape(recipe.shape);
    updateShapeGrid(recipe.tier);
    
    modal.style.display = 'block';
}

export function closeModal() {
    const modal = document.getElementById('recipeModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

export function toggleCheckbox(label) {
    const checkbox = label.querySelector('input');
    if (!checkbox) return;
    
    checkbox.checked = !checkbox.checked;
    label.classList.toggle('checked', checkbox.checked);
}

export function getFormData() {
    const itemName = document.getElementById('itemName').value.trim();
    const tier = parseInt(document.getElementById('itemTier').value);
    const editIndex = parseInt(document.getElementById('editIndex').value);
    
    const checkedElements = Array.from(document.querySelectorAll('input[name="elements"]:checked'))
        .map(cb => cb.value);
    
    const shape = getCurrentShape();
    
    return {
        itemName,
        tier,
        elements: checkedElements,
        shape,
        editIndex
    };
}

export function setupModalEventListeners(onTierChange, onClearShape) {
    const tierSelect = document.getElementById('itemTier');
    const clearBtn = document.getElementById('clearShapeBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelModalBtn');
    
    if (tierSelect) {
        tierSelect.addEventListener('change', () => {
            const tier = parseInt(tierSelect.value);
            onTierChange(tier);
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', onClearShape);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    // Checkbox labels
    document.querySelectorAll('.checkbox-label').forEach(label => {
        label.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT') {
                toggleCheckbox(label);
            }
        });
    });
    
    // Close on backdrop click
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('recipeModal');
        if (event.target === modal) {
            closeModal();
        }
    });
}