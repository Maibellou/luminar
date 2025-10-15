// Funcionalidad de tabs para servicios
document.addEventListener('DOMContentLoaded', function () {
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
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({ top: targetSection.offsetTop - headerHeight, behavior: 'smooth' });
            }
        });
    });

    window.scrollToContact = function () {
        const contactSection = document.querySelector('#contacto');
        if (contactSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            window.scrollTo({ top: contactSection.offsetTop - headerHeight, behavior: 'smooth' });
        }
    };

    // NOTIFICACIONES FLOTANTES CON COLORES
    function showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white border ${isError ? 'border-red-500' : 'border-green-500'
            } ${isError ? 'bg-red-600/80' : 'bg-black/80'} z-50 shadow-lg text-sm`;
        notification.innerHTML = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 4000);
    }

    // FORMULARIO CON FETCH A FORMSUBMIT
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {

        // Crear campos ocultos de FormSubmit
        const hiddenSubject = document.createElement('input');
        hiddenSubject.type = 'hidden';
        hiddenSubject.name = '_subject';

        const hiddenCaptcha = document.createElement('input');
        hiddenCaptcha.type = 'hidden';
        hiddenCaptcha.name = '_captcha';
        hiddenCaptcha.value = 'false';

        const hiddenTemplate = document.createElement('input');
        hiddenTemplate.type = 'hidden';
        hiddenTemplate.name = '_template';
        hiddenTemplate.value = 'table';

        // Honeypot para evitar bots
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = '_honey';
        honeypot.style.display = 'none';
        honeypot.tabIndex = -1;
        honeypot.autocomplete = 'off';

        // Agregamos los campos al formulario
        contactForm.appendChild(hiddenSubject);
        contactForm.appendChild(hiddenCaptcha);
        contactForm.appendChild(hiddenTemplate);
        contactForm.appendChild(honeypot);

        // Interceptar envío
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Evitar envío si honeypot está lleno (bot)
            if (honeypot.value !== "") {
                console.warn("Bot detectado, se canceló el envío.");
                return;
            }

            // Subject dinámico con nombre del usuario
            const nombre = document.getElementById('nombre').value;
            hiddenSubject.value = `Nuevo pedido de cotización desde la web - ${nombre}`;

            const formData = new FormData(contactForm);

            fetch('https://formsubmit.co/72a3e5261b88b9ad512856a1b225fc25', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === 'true' || data.success === true) {
                        showNotification("<strong>¡Gracias por tu consulta!</strong><br>Nos pondremos en contacto a la brevedad.");
                        contactForm.reset();
                    } else {
                        showNotification("Ocurrió un error al enviar el formulario. Intenta nuevamente.", true);
                    }
                })
                .catch(err => {
                    showNotification("Error. Intenta nuevamente.", true);
                    console.error(err);
                });
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
        telefonoInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/[^\d+\s\-]/g, '');
            if (value && !value.startsWith('+')) {
                if (value.startsWith('0')) value = '+54' + value.substring(1);
                else value = '+54' + value;
            }
            e.target.value = value;
        });
    }

    document.querySelectorAll('.benefit-card').forEach(card => {
        card.addEventListener('mouseenter', function () { this.style.transform = 'translateY(-5px)'; });
        card.addEventListener('mouseleave', function () { this.style.transform = 'translateY(0)'; });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { img.src = img.dataset.src; img.classList.remove('lazy'); observer.unobserve(img); } });
        });
        observer.observe(img);
    });
});

