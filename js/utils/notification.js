let toastTimeout;

export function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    
    if (!toast) return;
    
    toast.textContent = message;
    
    const colors = {
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    toast.style.background = colors[type] || colors.success;
    toast.style.display = 'block';
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        hideToast();
    }, 3000);
}

export function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.style.display = 'none';
    }
}