// Tunggu sampai HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // HAMBURGER MENU
    // =============================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
        });

        // Close when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('mobile-open');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('mobile-open');
            }
        });
    }


    // Portfolio rendering
    const container = document.getElementById('portfolio-container');
    if (!portfolios || portfolios.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: var(--text-muted);">Belum ada portofolio yang ditambahkan.</p>';
    } else {
        window.openPortfolioModal = function (index) {
            const item = portfolios[index];
            const modal = document.getElementById('portfolioModal');

            // Populate data
            document.getElementById('modalTitle').textContent = item.title;
            document.getElementById('modalCategory').textContent = item.category;
            document.getElementById('modalDesc').textContent = item.description;

            const videoText = document.getElementById('modalVideoText');
            if (item.videoIntro) {
                videoText.textContent = item.videoIntro;
                videoText.style.display = 'block';
            } else {
                videoText.textContent = '';
                videoText.style.display = 'none';
            }

            const videoContainer = document.getElementById('modalVideoContainer');

            // Support videos if item.videos is an array
            if (Array.isArray(item.videos) && item.videos.length > 0) {
                videoContainer.innerHTML = item.videos.map(vidItem => {
                    let vidUrl = '';
                    let isLandscape = false;

                    // Support both string URL and object {url: '', orientation: ''}
                    if (typeof vidItem === 'object' && vidItem !== null) {
                        vidUrl = vidItem.url;
                        isLandscape = (vidItem.orientation === 'landscape');
                    } else {
                        vidUrl = vidItem;
                    }

                    // Cek apkah link video adalah youtube
                    if (vidUrl.includes('youtube.com') || vidUrl.includes('youtu.be')) {
                        // Memastikan link berupa /embed/ (walaupun di data.js sudah kita set)
                        const embedUrl = vidUrl.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/');
                        return `<iframe src="${embedUrl}?rel=0" class="modal-video ${isLandscape ? 'landscape' : ''}" style="border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                    }
                    return `<video src="${vidUrl}" class="modal-video ${isLandscape ? 'landscape' : ''}" controls playsinline></video>`;
                }).join('');

                videoContainer.style.display = 'grid';
                if (item.videoOrientation === 'landscape') {
                    videoContainer.classList.add('landscape');
                } else {
                    videoContainer.classList.remove('landscape');
                }
            } else {
                videoContainer.innerHTML = '';
                videoContainer.style.display = 'none';
            }

            const imageContainer = document.getElementById('modalImageContainer');
            // Support multiple images if detailImage is an array
            if (Array.isArray(item.detailImage) && item.detailImage.length > 0) {
                imageContainer.innerHTML = item.detailImage.map(img => `<img src="${img}" alt="${item.title}" class="modal-image" style="margin-bottom: 2rem; width: 100%; border-radius: 12px; object-fit: cover;">`).join('');
            } else {
                const modalImgSrc = item.detailImage || item.image;
                if (modalImgSrc) {
                    imageContainer.innerHTML = `<img src="${modalImgSrc}" alt="${item.title}" class="modal-image">`;
                } else {
                    imageContainer.innerHTML = `<div style="width:100%; height:200px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.05); border-radius:12px; margin-bottom:2rem;"><i class='bx ${item.icon}' style="font-size:4rem; color:rgba(255,255,255,0.2);"></i></div>`;
                }
            }

            const linkBtn = document.getElementById('modalLink');
            if (item.link && item.link !== "#") {
                linkBtn.style.display = 'inline-flex';
                linkBtn.href = item.link;
            } else {
                linkBtn.style.display = 'none';
            }

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent bg scroll
        };

        const closeBtn = document.getElementById('modalClose');
        const modal = document.getElementById('portfolioModal');

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';

            // Stop videos when modal closes
            const videoContainer = document.getElementById('modalVideoContainer');
            if (videoContainer) videoContainer.innerHTML = '';
        }

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        portfolios.forEach((item, index) => {
            const imageContent = item.image
                ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
                : `<i class='bx ${item.icon}'></i>`;
            const cardHTML = `
                <article class="card" data-category="${item.category}" data-aos="fade-up" data-aos-delay="${(index % 3) * 150}" onclick="openPortfolioModal(${index})" style="cursor:pointer">
                    <div class="card-image-wrap">${imageContent}</div>
                    <div class="card-category">${item.category}</div>
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-desc">${item.description}</p>
                    <div class="card-link">
                        Lihat Detail <i class='bx bx-right-arrow-alt'></i>
                    </div>
                </article>
            `;
            container.innerHTML += cardHTML;
        });
    }

    // AOS Init
    AOS.init({ once: true, offset: 80, duration: 1000, easing: 'ease-out-cubic' });

    // =============================================
    // PORTFOLIO FILTER
    // =============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const cards = document.querySelectorAll('#portfolio-container .card');
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // =============================================
    // CLICK TO TOGGLE DETAILS (for mobile / touch)
    // =============================================
    document.querySelectorAll('.p-list li').forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all open items
            document.querySelectorAll('.p-list li').forEach(i => i.classList.remove('active'));
            // Toggle the clicked one
            if (!isActive) item.classList.add('active');
        });
    });

    // =============================================
    // ID CARD PHYSICS
    // - SVG rope drawn from top anchor → card center
    // - Card translates + rotates based on drag
    // - Card can be dragged freely to screen edge
    // - Springs back when released
    // =============================================
    const hookEl = document.querySelector('.id-card-hook');
    const ropePath = document.querySelector('.rope-path');
    const cardEl = document.querySelector('.id-card');

    if (!hookEl || !ropePath || !cardEl) return;

    const REST_HEIGHT = 200; // matches .id-card { top: 200px }

    let isDragging = false;
    let posX = 0, posY = 0;
    let velX = 0, velY = 0;
    let startMX = 0, startMY = 0;
    let rafId = null;

    const SPRING = 0.10;
    const DAMPING = 0.74;

    function updateRope(dx, dy) {
        const cx = hookEl.offsetWidth / 2;
        const ax = cx, ay = -4;
        const ex = cx + dx;
        const ey = REST_HEIGHT + dy;
        const c1x = cx;
        const c1y = ey * 0.45;
        const c2x = ex;
        const c2y = ey * 0.65;
        ropePath.setAttribute('d', `M ${ax} ${ay} C ${c1x} ${c1y} ${c2x} ${c2y} ${ex} ${ey}`);
        // Position the round bottom cap circle at the endpoint
        const endCap = document.querySelector('.rope-end-cap');
        if (endCap) { endCap.setAttribute('cx', ex); endCap.setAttribute('cy', ey); }
    }

    function applyTransform(dx, dy) {
        // Tilt: rotate clockwise when pulled right, counter-clockwise when left
        const tilt = -dx * 0.08;
        cardEl.style.transform =
            `translateX(calc(-50% + ${dx}px)) translateY(${dy}px) rotate(${tilt}deg)`;
        updateRope(dx, dy);
    }

    function springBack() {
        if (isDragging) return;
        velX += -SPRING * posX;
        velY += -SPRING * posY;
        velX *= DAMPING;
        velY *= DAMPING;
        posX += velX;
        posY += velY;

        applyTransform(posX, posY);

        if (Math.abs(posX) > 0.3 || Math.abs(posY) > 0.3 ||
            Math.abs(velX) > 0.3 || Math.abs(velY) > 0.3) {
            rafId = requestAnimationFrame(springBack);
        } else {
            posX = posY = velX = velY = 0;
            applyTransform(0, 0);
        }
    }

    const getPos = (e) => e.touches
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
        : { x: e.clientX, y: e.clientY };

    updateRope(0, 0);

    const onStart = (e) => {
        isDragging = true;
        cancelAnimationFrame(rafId);
        const { x, y } = getPos(e);
        startMX = x - posX;
        startMY = y - posY;
        cardEl.style.cursor = 'grabbing';
        e.preventDefault();
    };

    const onMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const { x, y } = getPos(e);
        posX = x - startMX;
        posY = y - startMY;

        // Soft elastic resistance only at extreme distances
        const dist = Math.sqrt(posX * posX + posY * posY);
        const softLimit = window.innerWidth * 0.45; // almost full screen
        if (dist > softLimit) {
            const ratio = softLimit / dist;
            posX *= ratio;
            posY *= ratio;
        }

        applyTransform(posX, posY);
    };

    const onEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        cardEl.style.cursor = 'grab';
        velX = posX * 0.1;
        velY = posY * 0.1;
        rafId = requestAnimationFrame(springBack);
    };

    cardEl.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    cardEl.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    cardEl.style.cursor = 'grab';
});
