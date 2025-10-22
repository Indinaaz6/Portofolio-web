function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    const button = document.getElementById('darkModeToggle');
    if (isDarkMode) {
        button.innerHTML = '<i class="bi bi-sun"></i>';
        button.title = 'Light Mode';
    } else {
        button.innerHTML = '<i class="bi bi-moon"></i>';
        button.title = 'Dark Mode';
    }
}

function initializeDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const button = document.getElementById('darkModeToggle');
        button.innerHTML = '<i class="bi bi-sun"></i>';
        button.title = 'Light Mode';
    }
}

function validateForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    resetFormErrors();
    
    let isValid = true;
    
    if (name === '') {
        showError('name', 'Nama lengkap harus diisi');
        isValid = false;
    }
    
    if (email === '') {
        showError('email', 'Email harus diisi');
        isValid = false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Format email tidak valid');
            isValid = false;
        }
    }
    
    if (subject === '') {
        showError('subject', 'Subjek harus diisi');
        isValid = false;
    }
    
    if (message === '') {
        showError('message', 'Pesan harus diisi');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Pesan minimal 10 karakter');
        isValid = false;
    }
    
    if (isValid) {
        const submitButton = document.querySelector('#contactForm button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Mengirim...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Pesan berhasil dikirim! Terima kasih telah menghubungi saya.');
            document.getElementById('contactForm').reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
    
    return false;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.mb-3') || field.closest('.col-md-6');
    
    field.classList.add('is-invalid');
    
    let errorElement = formGroup.querySelector('.invalid-feedback');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function resetFormErrors() {
    const errorFields = document.querySelectorAll('.is-invalid');
    errorFields.forEach(field => {
        field.classList.remove('is-invalid');
    });
    
    const errorMessages = document.querySelectorAll('.invalid-feedback');
    errorMessages.forEach(message => {
        message.remove();
    });
}

function filterProjects(category) {
    const projects = document.querySelectorAll('.project-item');
    let visibleCount = 0;
    
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
            visibleCount++;
            
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 100 * visibleCount);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
    
    document.querySelectorAll('#projectFilter .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Update active nav link
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
}

function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(52, 58, 64, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initializeDarkMode();
    
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    
    document.getElementById('contactForm').addEventListener('submit', validateForm);
    
    document.querySelectorAll('#projectFilter .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterProjects(this.dataset.filter);
        });
    });
    
    initializeSmoothScroll();
    
    initializeAnimations();
    
    initializeNavbarScroll();
    
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.remove('loading');
        });
        img.addEventListener('error', function() {
            this.alt = 'Gambar tidak dapat dimuat';
            this.classList.remove('loading');
        });
        
        if (!img.complete) {
            img.classList.add('loading');
        }
    });
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.toggleDarkMode = toggleDarkMode;
window.filterProjects = filterProjects;