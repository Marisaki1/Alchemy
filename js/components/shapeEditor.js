let currentShape = [];

export function getGridSize(tier) {
    return tier === 1 ? 3 : tier === 2 ? 4 : 5;
}

export function initShapeEditor(tier, initialShape = null) {
    const size = getGridSize(tier);
    const totalCells = size * size;
    
    if (initialShape && initialShape.length === totalCells) {
        currentShape = [...initialShape];
    } else {
        currentShape = new Array(totalCells).fill(0);
    }
    
    renderShapeEditor(size);
}

export function updateShapeGrid(tier) {
    const size = getGridSize(tier);
    const totalCells = size * size;
    
    if (currentShape.length !== totalCells) {
        currentShape = new Array(totalCells).fill(0);
    }
    
    renderShapeEditor(size);
}

export function renderShapeEditor(size) {
    const grid = document.getElementById('shapeEditorGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 40px)`;
    
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'shape-editor-cell';
        if (currentShape[i] === 1) {
            cell.classList.add('active');
        }
        cell.onclick = () => toggleShapeCell(i);
        grid.appendChild(cell);
    }
}

export function toggleShapeCell(index) {
    currentShape[index] = currentShape[index] === 1 ? 0 : 1;
    const cells = document.querySelectorAll('.shape-editor-cell');
    if (cells[index]) {
        cells[index].classList.toggle('active');
    }
}

export function clearShape() {
    currentShape = currentShape.map(() => 0);
    document.querySelectorAll('.shape-editor-cell').forEach(cell => {
        cell.classList.remove('active');
    });
}

export function getCurrentShape() {
    return [...currentShape];
}

export function setCurrentShape(shape) {
    currentShape = [...shape];
}