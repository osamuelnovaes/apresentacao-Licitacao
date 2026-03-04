document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Determine current filter from URL
    let currentPath = window.location.pathname;
    let currentFilter = 'all'; // default

    const filterMap = {
        'trafego-pago': 'trafego',
        'social-media': 'social',
        'edicao-de-video': 'video',
        'identidade-visual': 'id-visual',
        'design-de-arte': 'arte',
        'landing-page': 'landing-page',
        'crm': 'crm',
        'sistemas': 'sistema',
        'automacao-com-ia': 'ia',
        'estrategia-de-marketing': 'marketing',
        'home': 'all'
    };

    for (const [path, filter] of Object.entries(filterMap)) {
        if (currentPath.endsWith(path) || currentPath.endsWith(path + ".html")) {
            currentFilter = filter;
            break;
        }
    }

    // Update active class on links
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Apply filter logic
    portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        let shouldShow = false;

        if (currentFilter === 'all') {
            // Na aba Todos mostra tudo, menos os carrosseis e as listas de videos reais
            const isCarousel = item.classList.contains('carousel-wrapper');
            const isRealVideo = item.classList.contains('video-wrapper') && category === 'video';
            shouldShow = !isCarousel && !isRealVideo;
        } else {
            if (currentFilter === category) {
                if (category === 'id-visual') {
                    // Na aba Identidade Visual mostra apenas os carrosseis e esconde os cards simples
                    shouldShow = item.classList.contains('carousel-wrapper');
                } else if (category === 'video') {
                    // Na aba de Video mostra apenas os videos reais e oculta o card basico
                    shouldShow = item.classList.contains('video-wrapper');
                } else {
                    shouldShow = true;
                }
            }
        }

        if (shouldShow) {
            item.classList.remove('hide');
            item.style.animation = 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        } else {
            item.classList.add('hide');
        }
    });

    // Switch to Identity Visual when clicking standard cards
    const idVisualCards = document.querySelectorAll('.id-visual-card');
    idVisualCards.forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = 'identidade-visual';
        });
    });

    // Switch to Video editing when clicking standard video card
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = 'edicao-de-video';
        });
    });

    // Video Lightbox Logic
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    videoWrappers.forEach(wrapper => {
        wrapper.style.cursor = 'pointer';
        wrapper.addEventListener('click', () => {
            const videoSrc = wrapper.querySelector('video').src;

            // Create modal overlay
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            modal.style.zIndex = '999999';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.cursor = 'pointer';

            // Create video element
            const video = document.createElement('video');
            video.src = videoSrc;
            video.controls = true;
            video.autoplay = true;
            video.style.maxWidth = '90%';
            video.style.maxHeight = '90%';
            video.style.borderRadius = '8px';
            video.style.cursor = 'default';
            video.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';

            // Prevent exact video clicks from closing modal
            video.addEventListener('click', (e) => e.stopPropagation());

            modal.appendChild(video);

            // Create close button
            const closeBtn = document.createElement('div');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '40px';
            closeBtn.style.color = '#fff';
            closeBtn.style.fontSize = '40px';
            closeBtn.style.fontWeight = 'bold';
            modal.appendChild(closeBtn);

            // Remove on click
            modal.addEventListener('click', () => {
                document.body.removeChild(modal);
            });

            document.body.appendChild(modal);
        });
    });

    // Initialize Swiper for Identidade Visual
    const swiperElements = document.querySelectorAll('.id-visual-swiper');
    swiperElements.forEach(element => {
        new Swiper(element, {
            slidesPerView: 1,
            spaceBetween: 20,
            grabCursor: true,
            loop: false,
            pagination: {
                el: element.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: element.querySelector('.swiper-button-next'),
                prevEl: element.querySelector('.swiper-button-prev'),
            }
        });
    });
});

// Add dynamic keyframes to head for the script to use
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
document.head.appendChild(style);
