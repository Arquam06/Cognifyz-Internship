document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    let isDark = false;
    let rotation = 0;

    toggleBtn.addEventListener('click', () => {
        isDark = !isDark;
        rotation += 360; // Add full rotation each click
        
        // Toggle the class for theme
        if (isDark) {
            body.classList.add('dark-theme');
            toggleBtn.textContent = 'Switch to Light Mode';
            
            // Wait for half the transition to swap the icon seamlessly if preferred, 
            // but immediate swap with CSS transform is also good:
            themeIcon.textContent = '🌙';
        } else {
            body.classList.remove('dark-theme');
            toggleBtn.textContent = 'Switch to Dark Mode';
            themeIcon.textContent = '☀️';
        }
        
        // Apply rotation
        themeIcon.parentNode.style.transform = `rotate(${rotation}deg)`;
    });
});
