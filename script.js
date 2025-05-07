document.addEventListener('DOMContentLoaded', function() {
    // Scroll Animation
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    const elementInView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Initialize scroll animations on load
    handleScrollAnimation();
    
    // Mission Slider
    const missionSlides = document.querySelector('.mission-slides');
    const missionDots = document.querySelectorAll('.mission-dot');
    let currentMissionSlide = 0;
    
    function showMissionSlide(index) {
        missionSlides.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots
        missionDots.forEach(dot => dot.classList.remove('active'));
        missionDots[index].classList.add('active');
        
        currentMissionSlide = index;
    }
    
    // Mission dot click event
    missionDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showMissionSlide(index);
        });
    });
    
    // Auto slide mission
    let missionInterval = setInterval(() => {
        currentMissionSlide = (currentMissionSlide + 1) % missionDots.length;
        showMissionSlide(currentMissionSlide);
    }, 5000);
    
    // Pause on hover
    const missionSlider = document.querySelector('.mission-slider');
    missionSlider.addEventListener('mouseenter', () => {
        clearInterval(missionInterval);
    });
    
    missionSlider.addEventListener('mouseleave', () => {
        missionInterval = setInterval(() => {
            currentMissionSlide = (currentMissionSlide + 1) % missionDots.length;
            showMissionSlide(currentMissionSlide);
        }, 5000);
    });
    
    // Packages Slider
    const packagesSlides = document.querySelector('.packages-slides');
    const packageSlides = document.querySelectorAll('.package-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    
    // Create dots
    packageSlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dots .slider-dot');
    
    function goToSlide(index) {
        packagesSlides.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % packageSlides.length;
        goToSlide(currentSlide);
    });
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + packageSlides.length) % packageSlides.length;
        goToSlide(currentSlide);
    });
    
    // Auto slide packages
    let packagesInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % packageSlides.length;
        goToSlide(currentSlide);
    }, 6000);
    
    // Pause on hover
    const packagesSlider = document.querySelector('.packages-slider');
    packagesSlider.addEventListener('mouseenter', () => {
        clearInterval(packagesInterval);
    });
    
    packagesSlider.addEventListener('mouseleave', () => {
        packagesInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % packageSlides.length;
            goToSlide(currentSlide);
        }, 6000);
    });
    
    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    // Tampilkan semua card secara default saat halaman dimuat
    window.addEventListener('DOMContentLoaded', () => {
        portfolioCards.forEach(card => {
            card.style.display = 'block';
            card.classList.add('visible');
        });
        
        // Aktifkan tombol 'all' secara default
        document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            
            portfolioCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 50);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Video Modal Functionality
    const videoModal = document.querySelector('.video-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalVideo = videoModal.querySelector('video');
    const videoTitle = videoModal.querySelector('.video-title');
    const videoClient = videoModal.querySelector('.video-client');
    const videoDesc = videoModal.querySelector('.video-description');
    
    // Play video when clicking thumbnail
    document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const video = this.querySelector('video');
            const videoSrc = video.querySelector('source').src;
            
            modalVideo.querySelector('source').src = videoSrc;
            modalVideo.load();
            
            const cardInfo = this.closest('.portfolio-card').querySelector('.card-info');
            videoTitle.textContent = cardInfo.querySelector('h3').textContent;
            videoClient.textContent = cardInfo.querySelector('p').textContent;
            
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Auto play video when modal opens
            modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
        });
    });
    
    // View Details button for image projects
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.portfolio-card');
            
            if (card.querySelector('.card-image img')) {
                // For image projects
                const imgSrc = card.querySelector('.card-image img').src;
                
                videoModal.querySelector('.video-container').innerHTML = `
                    <img src="${imgSrc}" alt="Project Image" style="width:100%; border-radius:10px 10px 0 0">
                `;
                
                videoTitle.textContent = card.querySelector('.card-info h3').textContent;
                videoClient.textContent = card.querySelector('.card-info p').textContent;
                videoDesc.textContent = "Hadapi tantangan digital dengan solusi tepat! Klik tombol di bawah untuk konsultasi gratis dan temukan paket yang sesuai kebutuhan bisnismu.";
                
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        videoModal.classList.remove('active');
        modalVideo.pause();
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            modalVideo.pause();
            document.body.style.overflow = 'auto';
        }
    });
    
    // Header scroll effect
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled')
        }
    });

    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown){
        scrollDown.addEventListener('click', function(){
            window.scrollTo({top: window.innerHeight, behavior: 'smooth'});
        });
    }
    
    // WhatsApp Form Submission
    const contactForm = document.getElementById('contact-form');
    
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Format WhatsApp message
        const whatsappMessage = `Halo BEZN STUDIO, saya ${name}.\n\nEmail: ${email}\nNomor Telepon: ${phone}\n\nPesan: ${message}`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Replace with your WhatsApp number (format: country code + number without 0 or +)
        const whatsappNumber = "6285189643588"; // Contoh: 628 untuk Indonesia diikuti nomor
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Show success popup with checkmark animation
        const successPopup = document.getElementById('success-popup');
        if (successPopup) {
            successPopup.style.display = 'flex';
            
            // Hide popup after 2 seconds and then open WhatsApp
            setTimeout(() => {
                successPopup.style.display = 'none';
                window.open(whatsappUrl, '_blank');
            }, 2000);
        } else {
            // If no popup, open WhatsApp immediately
            window.open(whatsappUrl, '_blank');
        }
        
        // Reset form
        this.reset();
        
        // Remove focus from all inputs
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.blur();
        });
    });
}

const elements = document.querySelectorAll('[data-scroll="fade-in"]');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    
    // Popup functionality
    const closePopup = document.querySelector('.close-popup');
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            const successPopup = document.getElementById('success-popup');
            if (successPopup) {
                successPopup.style.display = 'none';
            }
        });
    }
    
    // Close popup when clicking outside
    window.addEventListener('click', function(event) {
        const popup = document.getElementById('success-popup');
        if (popup && event.target === popup) {
            popup.style.display = 'none';
        }
    });
    
    // Smooth scrolling for anchor links
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
    
    // Scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});

