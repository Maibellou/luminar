// Funcionalidad de tabs para servicios
document.addEventListener('DOMContentLoaded', function() {
    // Tabs de servicios
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remover clases activas
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-ocre', 'text-white');
                btn.classList.add('bg-gray-700', 'hover:bg-gray-600');
            });
            
            tabPanels.forEach(panel => {
                panel.classList.add('hidden');
            });
            
            // Activar tab seleccionado
            button.classList.add('active', 'bg-ocre', 'text-white');
            button.classList.remove('bg-gray-700', 'hover:bg-gray-600');
            
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }
        });
    });

    // Scroll suave para navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Función para scroll al contacto
    window.scrollToContact = function() {
        const contactSection = document.querySelector('#contacto');
        if (contactSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validación básica
            if (!data.nombre || !data.whatsapp || !data.zona || !data['tipo-instalacion']) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Simular envío (aquí puedes integrar con tu backend)
            console.log('Datos del formulario:', data);
            
            // Mostrar mensaje de éxito
            alert('¡Gracias por tu consulta! Nos pondremos en contacto contigo pronto.');
            
            // Limpiar formulario
            this.reset();
        });
    }

    // Navegación móvil (hamburger menu)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('ul');
    const closeMenu = document.querySelector('.close-menu');
    
    function openMobileMenu() {
        navMenu.classList.add('flex', 'flex-col', 'fixed', 'inset-0', 'bg-black', 'p-4', 'space-y-8', 'items-center', 'justify-center', 'z-40');
        navMenu.classList.remove('hidden', 'space-x-8');
        closeMenu.classList.remove('hidden');
        hamburger.classList.add('hidden');
    }
    
    function closeMobileMenu() {
        navMenu.classList.remove('flex', 'flex-col', 'fixed', 'inset-0', 'bg-black', 'p-4', 'space-y-8', 'items-center', 'justify-center', 'z-40');
        navMenu.classList.add('hidden', 'space-x-8');
        closeMenu.classList.add('hidden');
        hamburger.classList.remove('hidden');
    }
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', openMobileMenu);
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    // Cerrar menú al hacer clic en un enlace
    const mobileNavLinks = document.querySelectorAll('ul li a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) { // Solo en mobile
                closeMobileMenu();
            }
        });
    });

    // Animación de scroll para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.benefit-card, .service-content, .about-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Header con efecto de scroll
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll hacia abajo
            header.classList.add('transform', '-translate-y-full');
        } else {
            // Scroll hacia arriba
            header.classList.remove('transform', '-translate-y-full');
        }
        
        lastScrollTop = scrollTop;
    });

    // Validación de teléfono para WhatsApp
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function(e) {
            // Remover caracteres no numéricos excepto +, espacios y guiones
            let value = e.target.value.replace(/[^\d+\s\-]/g, '');
            
            // Asegurar que comience con +54 si no tiene código de país
            if (value && !value.startsWith('+')) {
                if (value.startsWith('0')) {
                    value = '+54' + value.substring(1);
                } else if (value.startsWith('9')) {
                    value = '+54' + value;
                } else {
                    value = '+54' + value;
                }
            }
            
            e.target.value = value;
        });
    }

    // Efecto hover en las tarjetas de beneficios
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Lazy loading para imágenes (cuando las agregues)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Función para formatear números de teléfono
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.startsWith('54')) {
            value = '+' + value;
        } else if (value.startsWith('9')) {
            value = '+54' + value;
        } else if (value.startsWith('0')) {
            value = '+54' + value.substring(1);
        } else {
            value = '+54' + value;
        }
    }
    
    input.value = value;
}

// Función para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
} 