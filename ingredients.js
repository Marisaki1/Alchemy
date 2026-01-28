// ============================================================================
// INGREDIENTS MODULE - Ingredient Management
// ============================================================================

const ingredientsModule = (function() {
    // ========================================================================
    // Default Ingredients Database - Based on provided data
    // ========================================================================
    const defaultIngredients = [
        // Small ingredients (1×1 Square) - 10 per deck, cost 1
        { size: "Small", shape: [0,1,0,0,0,0,0,0,0], qty: 10, cost: 1, fireName: "Oil", waterName: "Bucket of Water", earthName: "Herb", windName: "Jar of Clean Air" },
        
        // Small ingredients (2×1 / 1×2) - 5 per deck, cost 2
        { size: "Small", shape: [1,1,0,0,0,0,0,0,0], qty: 5, cost: 2, fireName: "Tinder", waterName: "Milk", earthName: "Moss", windName: "Dust" },
        
        // Small ingredients (Diagonal 1×2) - 5 per deck, cost 2
        { size: "Small", shape: [1,0,0,0,1,0,0,0,0], qty: 5, cost: 2, fireName: "Kerosene", waterName: "Fish", earthName: "Resin", windName: "Feather" },
        
        // Medium ingredients (Diagonal 1×3) - 4 per deck, cost 3
        { size: "Medium", shape: [1,0,0,0,1,0,0,0,1], qty: 4, cost: 3, fireName: "Thermite", waterName: "Eel", earthName: "Ivy Vine", windName: "Eucalyptus" },
        
        // Medium ingredients (3x1 / 1x3) - 4 per deck, cost 3
        { size: "Medium", shape: [1,1,1,0,0,0,0,0,0], qty: 4, cost: 3, fireName: "Charred Log", waterName: "Conch Shell", earthName: "Compost", windName: "Bamboo" },
        
        // Medium ingredients (small L-shape) - 4 per deck, cost 4
        { size: "Medium", shape: [1,0,0,1,0,0,1,1,0], qty: 4, cost: 4, fireName: "Jalapeno", waterName: "Coral", earthName: "Amber", windName: "Bug" },
        
        // Large ingredients (small T-Shape) - 0 per deck, cost 4
        { size: "Large", shape: [1,1,1,0,1,0,0,0,0], qty: 0, cost: 4, fireName: "Volcanic Ash", waterName: "Lotus", earthName: "Truffle", windName: "Butterfly" },
        
        // Large ingredients (2×2 Square) - 4 per deck, cost 4
        { size: "Large", shape: [1,1,0,1,1,0,0,0,0], qty: 4, cost: 4, fireName: "Coal", waterName: "Ice Cube", earthName: "Ore", windName: "Egg" },
        
        // Huge ingredients (T-Shape) - 0 per deck, cost 5
        { size: "Huge", shape: [1,1,1,0,1,0,0,1,0], qty: 0, cost: 5, fireName: "Gunpowder", waterName: "Algae", earthName: "Crystal", windName: "Dandelion" },
        
        // Large ingredients (L-Shape) - 4 per deck, cost 4
        { size: "Large", shape: [1,0,0,1,0,0,1,1,1], qty: 4, cost: 4, fireName: "Lava", waterName: "Jelly", earthName: "Scrap Metal", windName: "Talons" }
    ];

    // ========================================================================
    // Module State
    // ========================================================================
    let ingredients = [];
    let currentShape = new Array(9).fill(0); // Always 3x3
    let currentFilteredIngredients = [];

    // ========================================================================
    // Utility Functions
    // ========================================================================
    function loadIngredients() {
        const saved = localStorage.getItem('craftingIngredients');
        ingredients = saved ? JSON.parse(saved) : [...defaultIngredients];
        renderAll();
    }

    function saveToLocalStorage() {
        localStorage.setItem('craftingIngredients', JSON.stringify(ingredients));
    }

    function renderAll() {
        applyFilters();
        updateStats();
        renderPieChart();
    }

    // ========================================================================
    // Shape Grid Functions (Always 3x3)
    // ========================================================================
    function createShapeGrid(shape) {
        const grid = document.createElement('div');
        grid.className = 'shape-grid';
        grid.style.gridTemplateColumns = 'repeat(3, 16px)';
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'shape-cell';
            if (shape[i] === 1) {
                cell.classList.add('filled');
            }
            grid.appendChild(cell);
        }
        
        return grid;
    }

    function renderShapeEditor() {
        const grid = document.getElementById('ingredientShapeEditorGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = 'repeat(3, 40px)';
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'shape-editor-cell';
            if (currentShape[i] === 1) {
                cell.classList.add('active');
            }
            cell.onclick = () => toggleShapeCell(i);
            grid.appendChild(cell);
        }
    }

    function toggleShapeCell(index) {
        currentShape[index] = currentShape[index] === 1 ? 0 : 1;
        const cells = document.querySelectorAll('#ingredientShapeEditorGrid .shape-editor-cell');
        if (cells[index]) {
            cells[index].classList.toggle('active');
        }
    }

    function clearShape() {
        currentShape = new Array(9).fill(0);
        document.querySelectorAll('#ingredientShapeEditorGrid .shape-editor-cell').forEach(cell => {
            cell.classList.remove('active');
        });
        showToast('Shape pattern cleared!', 'warning');
    }

    // ========================================================================
    // Filtering and Sorting Functions
    // ========================================================================
    function getFilterConfig() {
        const searchInput = document.getElementById('ingredientSearchInput');
        const sortSelect = document.getElementById('ingredientSortSelect');
        const sizeFilter = document.getElementById('sizeFilter');
        const elementTypeFilter = document.getElementById('elementTypeFilter');
        
        return {
            searchTerm: searchInput ? searchInput.value.toLowerCase() : '',
            sortBy: sortSelect ? sortSelect.value : 'name-asc',
            sizeFilter: sizeFilter ? sizeFilter.value : 'all',
            elementTypeFilter: elementTypeFilter ? elementTypeFilter.value : 'all'
        };
    }

    function filterIngredients(ingredientsToFilter, config) {
        return ingredientsToFilter.filter(ingredient => {
            if (config.searchTerm) {
                const matchesSearch = 
                    ingredient.fireName.toLowerCase().includes(config.searchTerm) ||
                    ingredient.waterName.toLowerCase().includes(config.searchTerm) ||
                    ingredient.earthName.toLowerCase().includes(config.searchTerm) ||
                    ingredient.windName.toLowerCase().includes(config.searchTerm) ||
                    ingredient.size.toLowerCase().includes(config.searchTerm);
                
                if (!matchesSearch) return false;
            }
            
            if (config.sizeFilter !== 'all') {
                if (ingredient.size !== config.sizeFilter) return false;
            }
            
            return true;
        });
    }

    function sortIngredients(ingredientsToSort, sortBy) {
        const sorted = [...ingredientsToSort];
        
        const sizeOrder = { 'Small': 1, 'Medium': 2, 'Large': 3, 'Huge': 4 };
        
        switch(sortBy) {
            case 'name-asc':
                sorted.sort((a, b) => a.fireName.localeCompare(b.fireName));
                break;
            case 'name-desc':
                sorted.sort((a, b) => b.fireName.localeCompare(a.fireName));
                break;
            case 'size-asc':
                sorted.sort((a, b) => sizeOrder[a.size] - sizeOrder[b.size]);
                break;
            case 'cost-asc':
                sorted.sort((a, b) => a.cost - b.cost);
                break;
            case 'cost-desc':
                sorted.sort((a, b) => b.cost - a.cost);
                break;
        }
        
        return sorted;
    }

    function applyFilters() {
        const config = getFilterConfig();
        let filteredIngredients = filterIngredients(ingredients, config);
        filteredIngredients = sortIngredients(filteredIngredients, config.sortBy);
        
        currentFilteredIngredients = filteredIngredients;
        
        renderIngredientsTable(filteredIngredients);
        updateFilterStatus(filteredIngredients.length);
    }

    function clearFilters() {
        const searchInput = document.getElementById('ingredientSearchInput');
        const sortSelect = document.getElementById('ingredientSortSelect');
        const sizeFilter = document.getElementById('sizeFilter');
        const elementTypeFilter = document.getElementById('elementTypeFilter');
        
        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'name-asc';
        if (sizeFilter) sizeFilter.value = 'all';
        if (elementTypeFilter) elementTypeFilter.value = 'all';
        
        applyFilters();
        showToast('All filters cleared!', 'info');
    }

    function updateFilterStatus(filteredCount) {
        const filteredCountEl = document.getElementById('ingredientFilteredCount');
        const totalCountEl = document.getElementById('ingredientTotalCount');
        
        if (filteredCountEl) filteredCountEl.textContent = filteredCount;
        if (totalCountEl) totalCountEl.textContent = ingredients.length;
    }

    // ========================================================================
    // Rendering Functions
    // ========================================================================
    function renderIngredientsTable(ingredientsToRender) {
        const container = document.getElementById('ingredientTableContainer');
        if (!container) return;

        if (ingredientsToRender.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div style="font-size: 60px;">🔍</div>
                    <h3>No ingredients found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                </div>
            `;
            return;
        }

        let html = `
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <tr>
                            <th style="width: 10%;">Size</th>
                            <th style="width: 8%;">Shape</th>
                            <th style="width: 8%;">Qty/Deck</th>
                            <th style="width: 8%;">Cost</th>
                            <th style="width: 16%;">🔥 Fire Name</th>
                            <th style="width: 16%;">💧 Water Name</th>
                            <th style="width: 16%;">🌍 Earth Name</th>
                            <th style="width: 16%;">💨 Wind Name</th>
                            <th style="width: 10%;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        ingredientsToRender.forEach((ingredient) => {
            const actualIndex = ingredients.findIndex(i => i === ingredient);
            const shapeGridHtml = createShapeGrid(ingredient.shape).outerHTML;
            
            // Create size badge
            const sizeBadgeClass = ingredient.size === 'Small' ? 'tier-1' : 
                                 ingredient.size === 'Medium' ? 'tier-2' : 
                                 ingredient.size === 'Large' ? 'tier-3' : 'category-elite';
            
            html += `
                <tr>
                    <td><span class="tier-badge ${sizeBadgeClass}">${ingredient.size}</span></td>
                    <td>${shapeGridHtml}</td>
                    <td><strong>${ingredient.qty}</strong></td>
                    <td><strong>${ingredient.cost}</strong></td>
                    <td><span class="element fire">${ingredient.fireName}</span></td>
                    <td><span class="element water">${ingredient.waterName}</span></td>
                    <td><span class="element earth">${ingredient.earthName}</span></td>
                    <td><span class="element wind">${ingredient.windName}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-info btn-sm" onclick="ingredientsModule.editIngredient(${actualIndex})">
                                ✏️
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="ingredientsModule.deleteIngredient(${actualIndex})">
                                🗑️
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });

        html += '</tbody></table></div>';
        container.innerHTML = html;
    }

    function updateStats() {
        // Count unique elements (based on first ingredient that has each element)
        const fireCount = ingredients.length;
        const waterCount = ingredients.length;
        const earthCount = ingredients.length;
        const windCount = ingredients.length;

        const totalEl = document.getElementById('totalIngredients');
        const fireEl = document.getElementById('fireIngCount');
        const waterEl = document.getElementById('waterIngCount');
        const earthEl = document.getElementById('earthIngCount');
        const windEl = document.getElementById('windIngCount');

        if (totalEl) totalEl.textContent = ingredients.length;
        if (fireEl) fireEl.textContent = fireCount;
        if (waterEl) waterEl.textContent = waterCount;
        if (earthEl) earthEl.textContent = earthCount;
        if (windEl) windEl.textContent = windCount;
    }

    function renderPieChart() {
        const smallCount = ingredients.filter(i => i.size === 'Small').length;
        const mediumCount = ingredients.filter(i => i.size === 'Medium').length;
        const largeCount = ingredients.filter(i => i.size === 'Large').length;
        const hugeCount = ingredients.filter(i => i.size === 'Huge').length;

        const canvas = document.getElementById('ingredientPieChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        canvas.width = 300;
        canvas.height = 300;
        
        const total = smallCount + mediumCount + largeCount + hugeCount;
        if (total === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#999';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('No ingredients yet', canvas.width / 2, canvas.height / 2);
            return;
        }

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100;
        
        const colors = ['#28a745', '#ffc107', '#dc3545', '#6c757d'];
        const data = [smallCount, mediumCount, largeCount, hugeCount];
        const labels = ['Small', 'Medium', 'Large', 'Huge'];
        
        let currentAngle = -Math.PI / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        data.forEach((value, index) => {
            if (value === 0) return;
            
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
        
        let legendY = 240;
        labels.forEach((label, index) => {
            if (data[index] === 0) return;
            ctx.fillStyle = colors[index];
            ctx.fillRect(20, legendY, 15, 15);
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`${label}: ${data[index]}`, 40, legendY + 11);
            legendY += 20;
        });
    }

    // ========================================================================
    // Modal Functions
    // ========================================================================
    function openAddModal() {
        document.getElementById('ingredientModalTitle').textContent = 'Add New Ingredient';
        document.getElementById('ingredientForm').reset();
        document.getElementById('ingredientEditIndex').value = '-1';
        
        currentShape = new Array(9).fill(0);
        renderShapeEditor();
        
        document.getElementById('ingredientModal').style.display = 'block';
    }

    function editIngredient(index) {
        const ingredient = ingredients[index];
        document.getElementById('ingredientModalTitle').textContent = 'Edit Ingredient';
        document.getElementById('ingredientSize').value = ingredient.size;
        document.getElementById('ingredientQty').value = ingredient.qty;
        document.getElementById('ingredientCost').value = ingredient.cost;
        document.getElementById('fireName').value = ingredient.fireName;
        document.getElementById('waterName').value = ingredient.waterName;
        document.getElementById('earthName').value = ingredient.earthName;
        document.getElementById('windName').value = ingredient.windName;
        document.getElementById('ingredientEditIndex').value = index;
        
        currentShape = [...ingredient.shape];
        renderShapeEditor();
        
        document.getElementById('ingredientModal').style.display = 'block';
    }

    function deleteIngredient(index) {
        const ingName = ingredients[index].fireName; // Use fire name as representative
        if (confirm(`Are you sure you want to delete "${ingName}" ingredient set?`)) {
            ingredients.splice(index, 1);
            saveToLocalStorage();
            renderAll();
            showToast('Ingredient deleted successfully!', 'danger');
        }
    }

    function closeModal() {
        document.getElementById('ingredientModal').style.display = 'none';
    }

    function saveIngredient(event) {
        event.preventDefault();
        
        const editIndex = parseInt(document.getElementById('ingredientEditIndex').value);
        const ingredient = {
            size: document.getElementById('ingredientSize').value,
            shape: [...currentShape],
            qty: parseInt(document.getElementById('ingredientQty').value),
            cost: parseInt(document.getElementById('ingredientCost').value),
            fireName: document.getElementById('fireName').value.trim(),
            waterName: document.getElementById('waterName').value.trim(),
            earthName: document.getElementById('earthName').value.trim(),
            windName: document.getElementById('windName').value.trim()
        };

        if (editIndex >= 0) {
            ingredients[editIndex] = ingredient;
            showToast('Ingredient updated successfully!');
        } else {
            ingredients.push(ingredient);
            showToast('Ingredient added successfully!');
        }

        saveToLocalStorage();
        renderAll();
        closeModal();
    }

    // ========================================================================
    // Export/Import Functions
    // ========================================================================
    function exportCSV() {
        const headers = ['Size', 'Shape', 'Qty per Deck', 'Cost Structure', 'Fire Name', 'Water Name', 'Earth Name', 'Wind Name'];
        const csv = objectsToCSV(ingredients.map(i => ({
            'Size': i.size,
            'Shape': i.shape.join(''),
            'Qty per Deck': i.qty,
            'Cost Structure': i.cost,
            'Fire Name': i.fireName,
            'Water Name': i.waterName,
            'Earth Name': i.earthName,
            'Wind Name': i.windName
        })), headers);
        
        downloadCSV(csv, 'crafting_ingredients.csv');
        showToast('Ingredients CSV downloaded!');
    }

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
                    const data = parseCSVToObjects(csvContent);
                    
                    const importedIngredients = data.map(row => {
                        const shapeText = row.Shape || '';
                        let shape = new Array(9).fill(0);
                        for (let i = 0; i < Math.min(shapeText.length, 9); i++) {
                            shape[i] = shapeText[i] === '1' ? 1 : 0;
                        }
                        
                        return {
                            size: row.Size || '',
                            shape: shape,
                            qty: parseInt(row['Qty per Deck']) || 0,
                            cost: parseInt(row['Cost Structure']) || 1,
                            fireName: row['Fire Name'] || '',
                            waterName: row['Water Name'] || '',
                            earthName: row['Earth Name'] || '',
                            windName: row['Wind Name'] || ''
                        };
                    });
                    
                    if (importedIngredients.length > 0) {
                        if (confirm(`Found ${importedIngredients.length} ingredients. This will replace all current ingredients. Continue?`)) {
                            ingredients = importedIngredients;
                            saveToLocalStorage();
                            renderAll();
                            showToast(`Successfully imported ${importedIngredients.length} ingredients!`);
                        }
                    } else {
                        alert('No valid ingredients found in CSV file!');
                    }
                } catch (error) {
                    alert('Error reading file: ' + error.message);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    function resetData() {
        if (confirm('This will reset all ingredients to default. Continue?')) {
            ingredients = [...defaultIngredients];
            saveToLocalStorage();
            renderAll();
            showToast('Data reset to default!', 'warning');
        }
    }

    // ========================================================================
    // Public API
    // ========================================================================
    return {
        init: loadIngredients,
        openAddModal,
        editIngredient,
        deleteIngredient,
        closeModal,
        saveIngredient,
        clearShape,
        toggleShapeCell,
        applyFilters,
        clearFilters,
        exportCSV,
        importData,
        resetData
    };
})();
