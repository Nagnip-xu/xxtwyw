document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navContainer = document.querySelector('.nav-container');

    hamburger.addEventListener('click', function() {
        navContainer.classList.toggle('nav-open');
    });

    // ... 其他代码保持不变 ...
}); 