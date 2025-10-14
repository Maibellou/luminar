// Funcionalidad de tabs para servicios
document.addEventListener('DOMContentLoaded', function() {
    // Tabs de servicios
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-ocre', 'text-white');
                btn.classList.add('bg-gray-700', 'hover:bg-gray-600');
            });
            
            tabPanels.forEach(panel => panel.classList.add('hidden'));
            
            button.classList.add('active', 'bg-ocre', 'text-white');
            button.classList.remove('bg-gray-700', 'hover:bg-gray-600');
            
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) targetPanel.classList.remove('hidden');
        });
    });

    // Scroll suave para navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({ top: targetSection.offsetTop - headerHeight, behavior: 'smooth' });
            }
        });
    });

    window.scrollToContact = function() {
        const contactSection = document.querySelector('#contacto');
        if (contactSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            window.scrollTo({ top: contactSection.offsetTop - headerHeight, behavior: 'smooth' });
        }
    };

    // Manejo del formulario con FormSubmit
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.setAttribute('action', 'https://formsubmit.co/tuemail@dominio.com');
        contactForm.innerHTML += `
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_subject" value="Nuevo pedido de cotización desde la web">
        `;
        contactForm.addEventListener('submit', function() {
            showNotification("**¡Gracias por tu consulta!**<br>Nos pondremos en contacto a la brevedad.");
        });
    }

    // Navegación móvil
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
    if (hamburger && navMenu) hamburger.addEventListener('click', openMobileMenu);
    if (closeMenu) closeMenu.addEventListener('click', closeMobileMenu);
    document.querySelectorAll('ul li a').forEach(link => {
        link.addEventListener('click', () => { if (window.innerWidth < 768) closeMobileMenu(); });
    });

    // Animaciones de scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate-fade-in'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.benefit-card, .service-content, .about-content').forEach(el => observer.observe(el));

    // Header con efecto de scroll
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) header.classList.add('transform', '-translate-y-full');
        else header.classList.remove('transform', '-translate-y-full');
        lastScrollTop = scrollTop;
    });

    // Validación de teléfono para WhatsApp
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^\d+\s\-]/g, '');
            if (value && !value.startsWith('+')) {
                if (value.startsWith('0')) value = '+54' + value.substring(1);
                else value = '+54' + value;
            }
            e.target.value = value;
        });
    }

    document.querySelectorAll('.benefit-card').forEach(card => {
        card.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-5px)'; });
        card.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0)'; });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { img.src = img.dataset.src; img.classList.remove('lazy'); observer.unobserve(img); } });
        });
        observer.observe(img);
    });
});

// NOTIFICACIONES FLOTANTES
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white border border-green-500 bg-black/80 z-50 shadow-lg text-sm`;
    notification.innerHTML = `<strong>¡Gracias por tu consulta!</strong><br>Nos pondremos en contacto a la brevedad.`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
}