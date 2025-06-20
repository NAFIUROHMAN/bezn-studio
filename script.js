        // Scroll Animation
        document.addEventListener('DOMContentLoaded', function() {
            const scrollElements = document.querySelectorAll('[data-scroll]');

            const elementInView = (el, dividend = 1) => {
                const elementTop = el.getBoundingClientRect().top;
                return (
                    elementTop <=
                    (window.innerHeight || document.documentElement.clientHeight) / dividend
                );
            };

            const displayScrollElement = (element) => {
                element.classList.add('is-visible');
            };

            const handleScrollAnimation = () => {
                scrollElements.forEach((el) => {
                    if (elementInView(el, 1.25)) {
                        displayScrollElement(el);
                    }
                });
            };

            window.addEventListener('scroll', handleScrollAnimation);
            handleScrollAnimation(); // Initial check on load
        });

        // Mobile Menu Toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Mobile Submenu Toggle
        document.querySelectorAll('#mobile-menu button').forEach(button => {
            button.addEventListener('click', function() {
                const submenu = this.nextElementSibling;
                submenu.classList.toggle('hidden');
            });
        });

        // Contact Form to WhatsApp
        function sendToWhatsApp(event) {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            const whatsappMessage = `Halo, saya ingin bertanya:\\n\\nNama: ${name}\\nEmail: ${email}\\nNo. Telepon: ${phone}\\nKeperluan: ${message}`;
            const whatsappUrl = `https://wa.me/6285189643588?text=${encodeURIComponent(whatsappMessage)}`;

            window.open(whatsappUrl, '_blank');

            // Show success popup
            const successPopup = document.getElementById('success-popup');
            successPopup.classList.remove('hidden');

            // Optionally hide the popup after some time
            setTimeout(() => {
                successPopup.classList.add('hidden');
                document.getElementById('contact-form').reset(); // Clear form
            }, 3000); // Hide after 3 seconds
        }

        // Swiper Initializations
            document.addEventListener('DOMContentLoaded', function() {
        // Enhanced Swiper initialization with better defaults
        new Swiper('.packages-slider', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            grabCursor: true,
            centeredSlides: false,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: '.swiper-pagination.packages-dots',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1.5,
                    centeredSlides: true
                },
                768: {
                    slidesPerView: 2,
                    centeredSlides: false
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 32
                }
            },
            a11y: {
                prevSlideMessage: 'Paket sebelumnya',
                nextSlideMessage: 'Paket berikutnya',
                paginationBulletMessage: 'Beralih ke paket {{index}}'
            }
        });
    });

     // Initialize Swiper for packages slider
     const packagesSwiper = new Swiper('.packages-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });

    // FAQ toggle functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            answer.classList.toggle('hidden');
            icon.classList.toggle('transform');
            icon.classList.toggle('rotate-180');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg');
            header.classList.add('py-3');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('shadow-lg');
            header.classList.remove('py-3');
            header.classList.add('py-4');
        }
    });
