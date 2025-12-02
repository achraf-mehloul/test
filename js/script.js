document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    });

    const menuBtn = document.querySelector('#menu-btn');
    const navbar = document.querySelector('.navbar');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });

    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('fa-times');
            navbar.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            const tabId = btn.getAttribute('data-tab');

            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    const statsSection = document.querySelector('.stats');
    const counters = document.querySelectorAll('.counter');
    let started = false;

    window.addEventListener('scroll', () => {
        if (window.scrollY >= statsSection.offsetTop - 400) {
            if (!started) {
                counters.forEach(counter => startCount(counter));
                started = true;
            }
        }
    });

    function startCount(el) {
        const target = +el.getAttribute('data-count');
        const count = +el.innerText;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        let current = count;
        
        const timer = setInterval(() => {
            current += increment;
            el.innerText = Math.floor(current);
            
            if (current >= target) {
                el.innerText = target;
                clearInterval(timer);
            }
        }, 16);
    }

    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('confirmationModal');
    const closeModal = document.querySelector('.close-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            this.reset();
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            this.reset();
        });
    }
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const yyyy = tomorrow.getFullYear();
        
        const minDate = `${yyyy}-${mm}-${dd}`;
        dateInput.setAttribute('min', minDate);
    }

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});