// ============================================================================
// CRAFTING RECIPE MANAGER - Main Application
// Handles tab navigation and shared utilities
// ============================================================================

// ============================================================================
// Tab Management
// ============================================================================

/**
 * Initialize tab navigation
 */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            switchTab(tabName);
        });
    });
}

/**
 * Switch to a specific tab
 * @param {string} tabName - Name of the tab to switch to
 */
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(`${tabName}-tab`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to selected button
    const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    
    // Store active tab in localStorage
    localStorage.setItem('activeTab', tabName);
}

// ============================================================================
// Shared Utility Functions
// ============================================================================

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Toast type (success, danger, warning, info)
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    
    const colors = {
        'success': '#28a745',
        'danger': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8'
    };
    
    toast.style.background = colors[type] || colors['success'];
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
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
    URL.revokeObjectURL(url);
}

/**
 * Parse CSV content into array of objects
 * @param {string} csvContent - CSV file content
 * @returns {Array} Array of row objects
 */
function parseCSVToObjects(csvContent) {
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
        throw new Error('CSV file is empty or invalid');
    }
    
    // Parse header
    const headers = parseCSVRow(lines[0]);
    const data = [];
    
    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVRow(lines[i]);
        const row = {};
        
        headers.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        
        data.push(row);
    }
    
    return data;
}

/**
 * Parse a single CSV row handling quoted fields
 * @param {string} line - CSV line
 * @returns {Array} Array of field values
 */
function parseCSVRow(line) {
    const fields = [];
    let currentField = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                // Handle escaped quote
                currentField += '"';
                i++; // Skip next quote
            } else {
                // Toggle quote mode
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            fields.push(currentField.trim());
            currentField = '';
        } else {
            currentField += char;
        }
    }
    
    fields.push(currentField.trim());
    return fields;
}

/**
 * Convert objects to CSV format
 * @param {Array} data - Array of objects
 * @param {Array} headers - Array of header names
 * @returns {string} CSV content
 */
function objectsToCSV(data, headers) {
    let csv = headers.map(h => `"${h}"`).join(',') + '\n';
    
    data.forEach(row => {
        const values = headers.map(header => {
            const value = row[header] || '';
            // Escape quotes and wrap in quotes if contains comma, quote, or newline
            if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return `"${value}"`;
        });
        csv += values.join(',') + '\n';
    });
    
    return csv;
}

// ============================================================================
// Modal Management
// ============================================================================

/**
 * Close modal when clicking outside
 */
window.onclick = function(event) {
    const recipeModal = document.getElementById('recipeModal');
    const locationModal = document.getElementById('locationModal');
    
    if (event.target === recipeModal) {
        recipesModule.closeModal();
    }
    
    if (event.target === locationModal) {
        locationsModule.closeModal();
    }
}

// ============================================================================
// Initialize Application
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize tabs
    initializeTabs();
    
    // Restore last active tab
    const lastActiveTab = localStorage.getItem('activeTab') || 'recipes';
    switchTab(lastActiveTab);
    
    // Initialize all modules
    recipesModule.init();
    locationsModule.init();
    ingredientsModule.init();
});
