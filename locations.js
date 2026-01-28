// ============================================================================
// LOCATIONS MODULE - Location Management
// ============================================================================

const locationsModule = (function() {
    // ========================================================================
    // Default Locations Database - Based on CSV data
    // ========================================================================
    const defaultLocations = [
        { category: "SAFE", zoneName: "Falls", primaryElements: "Water", gatherAction: "Draw 2 Water, keep 1", specialAction: "Draw 2 card from the Water deck", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Windy Fields", primaryElements: "Wind", gatherAction: "Draw 2 Wind, keep 1", specialAction: "Draw 2 card from the Wind deck", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Cave", primaryElements: "Earth", gatherAction: "Draw 2 Earth, keep 1", specialAction: "Draw 2 card from the Earth deck", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Mountain", primaryElements: "Fire", gatherAction: "Draw 2 Fire, keep 1", specialAction: "Draw 2 card from the Fire deck", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Crossroads Market", primaryElements: "Special", gatherAction: "Draw 1 from any single element deck", specialAction: "Force trade with another player 1:1", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Dusk Sea", primaryElements: "Fire + Water", gatherAction: "Draw 1 Fire + 1 Water, keep 1", specialAction: "Gain 2 AP for Gathering next turn", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Forest", primaryElements: "Earth + Wind", gatherAction: "Draw 1 Earth + 1 Wind, keep 1", specialAction: "Alchemy only costs 1 AP on your next turn", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Marshlands", primaryElements: "Water + Earth", gatherAction: "Draw 1 Water + 1 Earth, keep 1", specialAction: "Draw 1 card from any top of the discard pile", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Emberwood", primaryElements: "Fire + Earth", gatherAction: "Draw 1 Fire + 1 Earth, keep 1", specialAction: "Force Trade 1 recipe with another player", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Dessert", primaryElements: "Wind + Fire", gatherAction: "Draw 1 Wind + 1 Fire, keep 1", specialAction: "Block a basic zone until the start of your next turn", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Whitemist", primaryElements: "Water + Wind", gatherAction: "Draw 1 Water + 1 Wind, keep 1", specialAction: "Discard 1 recipe, Reveal 3 recipes and pick 1 and discard the remaining", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Bazaar", primaryElements: "Special", gatherAction: "No gathering", specialAction: "Force trade with another player 1:1", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Town Archive", primaryElements: "Special", gatherAction: "No gathering", specialAction: "Purify: Discard 2 same elemental ingredients, search the deck and draw it", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Artisan's Guild", primaryElements: "Special", gatherAction: "No gathering", specialAction: "Mimicry: Perform the Special Action of a tile an opponent is located.", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        { category: "SAFE", zoneName: "Shrine of Elements", primaryElements: "Special", gatherAction: "No gathering", specialAction: "Bounty: Specify and Request upto 3 ingredients. Players who give ingredients to you gain 1 AP for each ingredient", penalty: "None", playerLimit: "Max 3", gatherLimit: "Max 1" },
        
        { category: "MEDIUM", zoneName: "Geothermal Springs", primaryElements: "Fire + Water", gatherAction: "Draw 2 Fire + 2 Water, keep 3", specialAction: "Gain 2 AP for movement next turn", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "MEDIUM", zoneName: "Windswept Canyon", primaryElements: "Earth + Wind", gatherAction: "Draw 2 Earth + 2 Wind, keep 3", specialAction: "Move another player for up to 2 tiles", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "MEDIUM", zoneName: "Misty Wetlands", primaryElements: "Water + Earth", gatherAction: "Draw 2 Water + 2 Earth, keep 3", specialAction: "Players closest to you loses 2 random ingredient", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "MEDIUM", zoneName: "Ruins", primaryElements: "Fire + Earth", gatherAction: "Draw 2 Fire + 2 Earth, keep 3", specialAction: "Block a Zone until the start of your next turn", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "MEDIUM", zoneName: "Salamander's Nest", primaryElements: "Wind + Fire", gatherAction: "Draw 2 Wind + 2 Fire, keep 3", specialAction: "Gain 2 AP for movement next turn", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "MEDIUM", zoneName: "Flooded Ruins", primaryElements: "Water + Wind", gatherAction: "Draw 2 Water + 2 Wind, keep 3", specialAction: "Block a basic Zone until the start of your next turn", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "MEDIUM", zoneName: "Twilight Grove", primaryElements: "All", gatherAction: "Draw 1 of each element (4), keep all 4", specialAction: "Everyone reveals their hand", penalty: "Give one ingredient to another player", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "MEDIUM", zoneName: "Night's Domain", primaryElements: "All", gatherAction: "Draw 2 from any 2 elements (4), keep all 4", specialAction: "See the cards of a selected player, take 1 ingredient if it matches the element or the shape of 1 of your ingredients", penalty: "Give one ingredient to another player", playerLimit: "Max 1", gatherLimit: "Max 1" },
        
        { category: "ELITE", zoneName: "The Infernal Core", primaryElements: "Fire", gatherAction: "Draw 4 Fire + 2 Earth + 2 Wind, keep 6", specialAction: "Select and search one of the deck and get upto 2 resource", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "ELITE", zoneName: "The Drowned Sepulcher", primaryElements: "Water", gatherAction: "Draw 4 Water + 2 Earth + 2 Wind, keep 6", specialAction: "Select and search one of the deck and get upto 2 resource", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "ELITE", zoneName: "The Titan's Rest", primaryElements: "Earth", gatherAction: "Draw 4 Earth + 2 Fire + 2 Water, keep 6", specialAction: "Select and search one of the deck and get upto 2 resource", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "ELITE", zoneName: "The Stormbreak Summit", primaryElements: "Wind", gatherAction: "Draw 4 Wind + 2 Water + 2 Fire, keep 6", specialAction: "Select and search one of the deck and get upto 2 resource", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "ELITE", zoneName: "The Primordial Cauldron", primaryElements: "Fire+Water+Earth", gatherAction: "Draw 3 Fire + 3 Water + 3 Earth, keep 6", specialAction: "Repeat your last gather action", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "ELITE", zoneName: "Utopia", primaryElements: "All", gatherAction: "Draw 8 (any distribution), keep 6", specialAction: "Trigger the Special Action of 2 non-elite tiles", penalty: "Pay 2 AP on your next turn", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "ELITE", zoneName: "Vault of Forbidden Lore", primaryElements: "Special", gatherAction: "No gathering", specialAction: "Search and learn up to two recipes from the deck", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" },
        { category: "ELITE", zoneName: "The King's Reserve", primaryElements: "Special", gatherAction: "No gathering", specialAction: "Draw 4 from any element and keep all 4", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" },
        
        { category: "START", zoneName: "Home", primaryElements: "", gatherAction: "", specialAction: "Put all ingredients from your basket to your container", penalty: "None", playerLimit: "Max 1", gatherLimit: "Max 1" }
    ];

    // ========================================================================
    // Module State
    // ========================================================================
    let locations = [];
    let currentFilteredLocations = [];

    // ========================================================================
    // Utility Functions
    // ========================================================================
    function loadLocations() {
        const saved = localStorage.getItem('craftingLocations');
        locations = saved ? JSON.parse(saved) : [...defaultLocations];
        renderAll();
    }

    function saveToLocalStorage() {
        localStorage.setItem('craftingLocations', JSON.stringify(locations));
    }

    function renderAll() {
        applyFilters();
        updateStats();
        renderPieChart();
    }

    // ========================================================================
    // Filtering and Sorting Functions
    // ========================================================================
    function getFilterConfig() {
        const searchInput = document.getElementById('locationSearchInput');
        const sortSelect = document.getElementById('locationSortSelect');
        const categoryFilter = document.getElementById('categoryFilter');
        
        return {
            searchTerm: searchInput ? searchInput.value.toLowerCase() : '',
            sortBy: sortSelect ? sortSelect.value : 'name-asc',
            categoryFilter: categoryFilter ? categoryFilter.value : 'all'
        };
    }

    function filterLocations(locationsToFilter, config) {
        return locationsToFilter.filter(location => {
            if (config.searchTerm) {
                const matchesSearch = 
                    location.zoneName.toLowerCase().includes(config.searchTerm) ||
                    location.category.toLowerCase().includes(config.searchTerm) ||
                    location.primaryElements.toLowerCase().includes(config.searchTerm) ||
                    location.gatherAction.toLowerCase().includes(config.searchTerm) ||
                    location.specialAction.toLowerCase().includes(config.searchTerm);
                
                if (!matchesSearch) return false;
            }
            
            if (config.categoryFilter !== 'all') {
                if (location.category !== config.categoryFilter) return false;
            }
            
            return true;
        });
    }

    function sortLocations(locationsToSort, sortBy) {
        const sorted = [...locationsToSort];
        
        switch(sortBy) {
            case 'name-asc':
                sorted.sort((a, b) => a.zoneName.localeCompare(b.zoneName));
                break;
            case 'name-desc':
                sorted.sort((a, b) => b.zoneName.localeCompare(a.zoneName));
                break;
            case 'category-asc':
                sorted.sort((a, b) => a.category.localeCompare(b.category));
                break;
        }
        
        return sorted;
    }

    function applyFilters() {
        const config = getFilterConfig();
        let filteredLocations = filterLocations(locations, config);
        filteredLocations = sortLocations(filteredLocations, config.sortBy);
        
        currentFilteredLocations = filteredLocations;
        
        renderLocationsTable(filteredLocations);
        updateFilterStatus(filteredLocations.length);
    }

    function clearFilters() {
        const searchInput = document.getElementById('locationSearchInput');
        const sortSelect = document.getElementById('locationSortSelect');
        const categoryFilter = document.getElementById('categoryFilter');
        
        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'name-asc';
        if (categoryFilter) categoryFilter.value = 'all';
        
        applyFilters();
        showToast('All filters cleared!', 'info');
    }

    function updateFilterStatus(filteredCount) {
        const filteredCountEl = document.getElementById('locationFilteredCount');
        const totalCountEl = document.getElementById('locationTotalCount');
        
        if (filteredCountEl) filteredCountEl.textContent = filteredCount;
        if (totalCountEl) totalCountEl.textContent = locations.length;
    }

    // ========================================================================
    // Rendering Functions
    // ========================================================================
    function renderLocationsTable(locationsToRender) {
        const container = document.getElementById('locationTableContainer');
        if (!container) return;

        if (locationsToRender.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div style="font-size: 60px;">🔍</div>
                    <h3>No locations found</h3>
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
                            <th style="width: 10%;">Category</th>
                            <th style="width: 15%;">Zone Name</th>
                            <th style="width: 12%;">Primary Elements</th>
                            <th style="width: 18%;">Gather Action</th>
                            <th style="width: 20%;">Special / Study Action</th>
                            <th style="width: 8%;">Penalty</th>
                            <th style="width: 8%;">Player Limit</th>
                            <th style="width: 8%;">Gather Limit</th>
                            <th style="width: 8%;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        locationsToRender.forEach((location) => {
            const actualIndex = locations.findIndex(l => l === location);
            
            html += `
                <tr>
                    <td><span class="category-badge category-${location.category.toLowerCase()}">${location.category}</span></td>
                    <td><strong>${location.zoneName}</strong></td>
                    <td>${location.primaryElements}</td>
                    <td style="font-size: 13px;">${location.gatherAction}</td>
                    <td style="font-size: 13px;">${location.specialAction}</td>
                    <td style="font-size: 13px;">${location.penalty}</td>
                    <td>${location.playerLimit}</td>
                    <td>${location.gatherLimit}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-info btn-sm" onclick="locationsModule.editLocation(${actualIndex})">
                                ✏️
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="locationsModule.deleteLocation(${actualIndex})">
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
        const safeCount = locations.filter(l => l.category === 'SAFE').length;
        const mediumCount = locations.filter(l => l.category === 'MEDIUM').length;
        const eliteCount = locations.filter(l => l.category === 'ELITE').length;

        const totalEl = document.getElementById('totalLocations');
        const safeEl = document.getElementById('safeCount');
        const mediumEl = document.getElementById('mediumCount');
        const eliteEl = document.getElementById('eliteCount');

        if (totalEl) totalEl.textContent = locations.length;
        if (safeEl) safeEl.textContent = safeCount;
        if (mediumEl) mediumEl.textContent = mediumCount;
        if (eliteEl) eliteEl.textContent = eliteCount;
    }

    function renderPieChart() {
        const safeCount = locations.filter(l => l.category === 'SAFE').length;
        const mediumCount = locations.filter(l => l.category === 'MEDIUM').length;
        const eliteCount = locations.filter(l => l.category === 'ELITE').length;

        const canvas = document.getElementById('locationPieChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        canvas.width = 300;
        canvas.height = 300;
        
        const total = safeCount + mediumCount + eliteCount;
        if (total === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#999';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('No locations yet', canvas.width / 2, canvas.height / 2);
            return;
        }

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100;
        
        const colors = ['#28a745', '#ffc107', '#dc3545'];
        const data = [safeCount, mediumCount, eliteCount];
        const labels = ['Safe', 'Medium', 'Elite'];
        
        let currentAngle = -Math.PI / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
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
        document.getElementById('locationModalTitle').textContent = 'Add New Location';
        document.getElementById('locationForm').reset();
        document.getElementById('locationEditIndex').value = '-1';
        document.getElementById('locationModal').style.display = 'block';
    }

    function editLocation(index) {
        const location = locations[index];
        document.getElementById('locationModalTitle').textContent = 'Edit Location';
        document.getElementById('locationCategory').value = location.category;
        document.getElementById('zoneName').value = location.zoneName;
        document.getElementById('primaryElements').value = location.primaryElements;
        document.getElementById('gatherAction').value = location.gatherAction;
        document.getElementById('specialAction').value = location.specialAction;
        document.getElementById('penalty').value = location.penalty;
        document.getElementById('playerLimit').value = location.playerLimit;
        document.getElementById('gatherLimit').value = location.gatherLimit;
        document.getElementById('locationEditIndex').value = index;
        
        document.getElementById('locationModal').style.display = 'block';
    }

    function deleteLocation(index) {
        if (confirm(`Are you sure you want to delete "${locations[index].zoneName}"?`)) {
            locations.splice(index, 1);
            saveToLocalStorage();
            renderAll();
            showToast('Location deleted successfully!', 'danger');
        }
    }

    function closeModal() {
        document.getElementById('locationModal').style.display = 'none';
    }

    function saveLocation(event) {
        event.preventDefault();
        
        const editIndex = parseInt(document.getElementById('locationEditIndex').value);
        const location = {
            category: document.getElementById('locationCategory').value,
            zoneName: document.getElementById('zoneName').value.trim(),
            primaryElements: document.getElementById('primaryElements').value.trim(),
            gatherAction: document.getElementById('gatherAction').value.trim(),
            specialAction: document.getElementById('specialAction').value.trim(),
            penalty: document.getElementById('penalty').value.trim(),
            playerLimit: document.getElementById('playerLimit').value.trim(),
            gatherLimit: document.getElementById('gatherLimit').value.trim()
        };

        if (editIndex >= 0) {
            locations[editIndex] = location;
            showToast('Location updated successfully!');
        } else {
            locations.push(location);
            showToast('Location added successfully!');
        }

        saveToLocalStorage();
        renderAll();
        closeModal();
    }

    // ========================================================================
    // Export/Import Functions
    // ========================================================================
    function exportCSV() {
        const headers = ['Category', 'Zone Name', 'Primary Elements', 'Gather Action', 'Special / Study Action', 'Penalty', 'Player Limit', 'Gather Limit'];
        const csv = objectsToCSV(locations.map(l => ({
            'Category': l.category,
            'Zone Name': l.zoneName,
            'Primary Elements': l.primaryElements,
            'Gather Action': l.gatherAction,
            'Special / Study Action': l.specialAction,
            'Penalty': l.penalty,
            'Player Limit': l.playerLimit,
            'Gather Limit': l.gatherLimit
        })), headers);
        
        downloadCSV(csv, 'crafting_locations.csv');
        showToast('Locations CSV downloaded!');
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
                    
                    const importedLocations = data.map(row => ({
                        category: row.Category || '',
                        zoneName: row['Zone Name'] || '',
                        primaryElements: row['Primary Elements'] || '',
                        gatherAction: row['Gather Action'] || '',
                        specialAction: row['Special / Study Action'] || '',
                        penalty: row.Penalty || '',
                        playerLimit: row['Player Limit'] || '',
                        gatherLimit: row['Gather Limit'] || ''
                    }));
                    
                    if (importedLocations.length > 0) {
                        if (confirm(`Found ${importedLocations.length} locations. This will replace all current locations. Continue?`)) {
                            locations = importedLocations;
                            saveToLocalStorage();
                            renderAll();
                            showToast(`Successfully imported ${importedLocations.length} locations!`);
                        }
                    } else {
                        alert('No valid locations found in CSV file!');
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
        if (confirm('This will reset all locations to default. Continue?')) {
            locations = [...defaultLocations];
            saveToLocalStorage();
            renderAll();
            showToast('Data reset to default!', 'warning');
        }
    }

    // ========================================================================
    // Public API
    // ========================================================================
    return {
        init: loadLocations,
        openAddModal,
        editLocation,
        deleteLocation,
        closeModal,
        saveLocation,
        applyFilters,
        clearFilters,
        exportCSV,
        importData,
        resetData
    };
})();
