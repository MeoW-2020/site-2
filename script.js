document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.product-card, .certificate');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('load', function () {
        const animatedElements = document.querySelectorAll('.product-card, .certificate');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.5s, transform 0.5s';
        });

        animateOnScroll();
    });

    window.addEventListener('scroll', animateOnScroll);

    const certificates = document.querySelectorAll('.certificate');
    const modal = document.createElement('div');
    modal.className = 'modal';

    const modalContent = document.createElement('img');
    modalContent.className = 'modal-content';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';

    modal.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    certificates.forEach(cert => {
        cert.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            modalContent.src = imgSrc;
            modal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
});