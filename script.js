document.addEventListener('DOMContentLoaded', function() {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    // Fungsi untuk memfilter portofolio
    function filterPortfolio(category) {
        portfolioCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Event listener untuk tombol filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus class active dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Tambahkan class active ke tombol yang diklik
            button.classList.add('active');
            
            // Dapatkan kategori yang dipilih
            const selectedCategory = button.getAttribute('data-category');
            
            // Filter portofolio
            filterPortfolio(selectedCategory);
        });
    });
    
    // Tampilkan semua portofolio secara default
    filterPortfolio('all');
});

    const portfolioSwiper = new Swiper('.portfolio-slider', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                centeredSlides: false,
            }
        }
    });

    // Mobile filter functionality
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const filterValue = this.value;
            const allSlides = document.querySelectorAll('.portfolio-slide');
            
            allSlides.forEach(slide => {
                if (filterValue === 'all' || slide.getAttribute('data-category') === filterValue) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
            });
            
            // Update swiper after filtering
            portfolioSwiper.update();
        });
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.portfolio-section, .packages-section, .contact-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const sections = document.querySelectorAll('.portfolio-section, .packages-section, .contact-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            
            // Show confirmation
            alert(`Terima kasih ${name}! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Optimize touch targets for mobile
    const touchElements = document.querySelectorAll('a, button, input, .portfolio-card');
    touchElements.forEach(el => {
        el.style.minHeight = '44px';
        el.style.minWidth = '44px';
    });