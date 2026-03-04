document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                // Reset animation styles for smooth transition re-triggering
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow to restart animation

                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hide');
                    item.style.animation = 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                } else {
                    item.classList.add('hide');
                }
            });
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
