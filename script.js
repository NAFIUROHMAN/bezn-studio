document.addEventListener('DOMContentLoaded', function() {
    const whatsappNumber = '6285198643588';
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        });
    }

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            portfolioCards.forEach(card => {
                card.style.display = (category === 'all' || card.getAttribute('data-category') === category) ? 'block' : 'none';
            });
        });
    });

    if (filterButtons.length > 0) filterButtons[0].click();

    // Video preview & Modal untuk setiap thumbnail
    document.querySelectorAll('.portfolio-card').forEach(card => {
        const thumbnail = card.querySelector('.thumbnail');
        const video = card.querySelector('video');
        const modal = card.querySelector('.video-modal');
        const closeBtn = modal ? modal.querySelector('.close-btn') : null;

        if (thumbnail && video) {
            thumbnail.addEventListener('mouseenter', () => video.play());
            thumbnail.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
            thumbnail.addEventListener('click', () => {
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    video.play();
                }
            });
        }

        if (closeBtn && modal && video) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                video.pause();
                video.currentTime = 0;
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    video.pause();
                    video.currentTime = 0;
                }
            });
        }
    });

    // View Details
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.portfolio-card');
            const category = card.getAttribute('data-category');

            if (category === 'videography') {
                const modal = card.querySelector('.video-modal');
                const video = modal.querySelector('video');
                if (modal && video) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    video.play();
                }
            } else {
                alert('Detail proyek akan ditampilkan di sini');
            }
        });
    });

    // Slider Package
    const sliderContainer = document.querySelector('.packages-slider-container');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    function goToSlide(index) {
        const card = document.querySelector('.package-card');
        if (!card) return;

        const cardWidth = card.offsetWidth + 32;
        sliderContainer.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
        sliderDots.forEach(dot => dot.classList.remove('active'));
        if (sliderDots[index]) sliderDots[index].classList.add('active');
        currentSlide = index;
    }

    if (sliderDots.length > 0) {
        sliderDots[0].classList.add('active');
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        setInterval(() => {
            currentSlide = (currentSlide + 1) % sliderDots.length;
            goToSlide(currentSlide);
        }, 5000);
    }

    // Modal Package Logic
    const modal = document.getElementById('package-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalFeatures = document.getElementById('modal-features');
    const modalCta = document.getElementById('modal-cta');
    const closeModal = document.querySelector('.close-modal');

    document.querySelectorAll('.package-cta').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.package-card');
            const title = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;
            const features = card.querySelectorAll('.package-features li');

            modalTitle.textContent = title;
            modalPrice.textContent = price;
            modalFeatures.innerHTML = '';

            features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature.textContent;
                modalFeatures.appendChild(li);
            });

            const whatsappMessage = `Halo Bezn Studio, saya tertarik dengan paket *${title}* (${price}) dan ingin tahu lebih lanjut`;
            modalCta.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Contact Form via WhatsApp
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            const whatsappMessage = `Halo Bezn Studio,\n\nSaya ${name} ingin berkonsultasi tentang:\n\n${message}\n\nKontak saya:\nEmail: ${email}\nTelepon: ${phone}`;
            window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        });
    }

    // Update semua link WhatsApp
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        const newHref = link.href.replace(/wa\.me\/\d+/, `wa.me/${whatsappNumber}`);
        link.href = newHref;
    });

    // Scroll Animation
    function animateOnScroll() {
        document.querySelectorAll('.fade-in, .slide-up').forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            if (elementPosition < window.innerHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    setTimeout(() => {
        document.querySelectorAll('.portfolio-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('visible');
        });
    }, 500);
});

// Create Modal
const modalHTML = `
    <div id="package-modal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3 id="modal-title">Package Title</h3>
            <div id="modal-price" class="modal-price">Rp0</div>
            <ul id="modal-features" class="modal-features"></ul>
            <a id="modal-cta" href="#" class="modal-cta">Konsultasi via WhatsApp</a>
        </div>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', modalHTML);
