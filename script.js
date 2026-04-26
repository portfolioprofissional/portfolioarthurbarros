// alterna o estado de selecao de cada opcao
function selecionarItem(elemento) {
    elemento.classList.toggle('selecionado');
}

// envia o pedido de patrocinio para o WhatsApp
function confirmarPatrocinio(tipo = 'financeiro') {
    const telefone = "5585981752012"; // COLOQUE O WHATSAPP DO ATLETA AQUI
    let mensagem = '';

    if (tipo === 'colaborativo') {
        mensagem = encodeURIComponent('Ola, gostaria de oferecer meu servico para apoiar o atleta Arthur nessa caminhada!');
        window.open(`https://wa.me/${telefone}?text=${mensagem}`, '_blank');
        return;
    }

    const selecionados = document.querySelectorAll('.opcao-item.selecionado');
    const itens = [];
    
    selecionados.forEach(item => {
        itens.push(item.innerText);
    });

    if (itens.length === 0) {
        alert("Por favor, selecione ao menos um item para incentivar!");
        return;
    }

    mensagem = encodeURIComponent(`Ola, Quero incentivar o atleta com: ${itens.join(', ')} e participar dessa estrada de sucesso.`);
    window.open(`https://wa.me/${telefone}?text=${mensagem}`, '_blank');
}

let mediaItems = [];
let currentMediaIndex = 0;

// alterna o estado de selecao de cada opcao
function selecionarItem(elemento) {
    elemento.classList.toggle('selecionado');
}

// envia o pedido de patrocinio para o WhatsApp
function confirmarPatrocinio(tipo = 'financeiro') {
    const telefone = "5585981752012"; // COLOQUE O WHATSAPP DO ATLETA AQUI
    let mensagem = '';

    if (tipo === 'colaborativo') {
        mensagem = encodeURIComponent('Ola, gostaria de oferecer meu servico para apoiar o atleta Arthur nessa caminhada!');
        window.open(`https://wa.me/${telefone}?text=${mensagem}`, '_blank');
        return;
    }

    const selecionados = document.querySelectorAll('.opcao-item.selecionado');
    const itens = [];
    
    selecionados.forEach(item => {
        itens.push(item.innerText);
    });

    if (itens.length === 0) {
        alert("Por favor, selecione ao menos um item para incentivar!");
        return;
    }

    mensagem = encodeURIComponent(`Ola, Quero incentivar o atleta com: ${itens.join(', ')} e participar dessa estrada de sucesso.`);
    window.open(`https://wa.me/${telefone}?text=${mensagem}`, '_blank');
}

function openMediaLightbox(index) {
    currentMediaIndex = index;
    renderMediaLightbox();
    const lightbox = document.getElementById('media-lightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function renderMediaLightbox() {
    const item = mediaItems[currentMediaIndex];
    if (!item) return;

    document.querySelectorAll('video').forEach((video) => {
        video.pause();
    });

    const inner = document.getElementById('media-lightbox-inner');
    const titleElement = document.getElementById('media-lightbox-title');
    inner.innerHTML = '';
    titleElement.textContent = item.dataset.title || '';

    if (item.dataset.type === 'photo') {
        const img = document.createElement('img');
        img.src = item.dataset.src;
        img.alt = item.dataset.title || 'Foto';
        inner.appendChild(img);
    } else {
        const video = document.createElement('video');
        video.src = item.dataset.src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.muted = false;
        video.style.width = '100%';
        video.style.maxHeight = '90vh';
        video.addEventListener('ended', () => video.pause());
        inner.appendChild(video);
    }
}

function fecharMediaLightbox(event) {
    if (event.target.id === 'media-lightbox' || event.target.classList.contains('lightbox-close')) {
        const lightbox = document.getElementById('media-lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function prevMedia(event) {
    event.stopPropagation();
    currentMediaIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
    renderMediaLightbox();
}

function nextMedia(event) {
    event.stopPropagation();
    currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
    renderMediaLightbox();
}

function initSliderDrag(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    slider.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        isDown = true;
        startX = event.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.setPointerCapture(event.pointerId);
    });

    slider.addEventListener('pointermove', (event) => {
        if (!isDown) return;
        event.preventDefault();
        const x = event.pageX - slider.offsetLeft;
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk;
    });

    ['pointerup', 'pointercancel', 'pointerleave'].forEach(evt => {
        slider.addEventListener(evt, () => {
            isDown = false;
        });
    });
}

function initGalleryDrag() {
    const gallery = document.getElementById('galeria-slider');
    if (!gallery) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let moved = false;

    gallery.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        isDown = true;
        moved = false;
        startX = event.pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
        gallery.setPointerCapture(event.pointerId);
    });

    gallery.addEventListener('pointermove', (event) => {
        if (!isDown) return;
        event.preventDefault();
        const x = event.pageX - gallery.offsetLeft;
        const walk = x - startX;
        if (Math.abs(walk) > 8) {
            moved = true;
        }
        gallery.scrollLeft = scrollLeft - walk;
    });

    ['pointerup', 'pointercancel', 'pointerleave'].forEach(evt => {
        gallery.addEventListener(evt, () => {
            isDown = false;
        });
    });

    document.querySelectorAll('.foto-item').forEach(item => {
        item.addEventListener('click', (event) => {
            if (moved) return;
            openMediaLightbox(parseInt(item.dataset.index, 10));
        });
    });
}

function initMediaItems() {
    mediaItems = Array.from(document.querySelectorAll('.media-item'));

    mediaItems.forEach((item, index) => {
        item.dataset.index = index;

        if (item.dataset.type === 'video') {
            item.addEventListener('click', () => openMediaLightbox(index));
        }
    });
}

function initCarouselDrag() {
    const carousel = document.getElementById('carrossel-container');
    if (!carousel) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    carousel.addEventListener('pointerdown', (event) => {
        if (event.target.closest('a')) return;
        event.preventDefault();
        isDown = true;
        startX = event.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.setPointerCapture(event.pointerId);
    });

    carousel.addEventListener('pointermove', (event) => {
        if (!isDown) return;
        event.preventDefault();
        const x = event.pageX - carousel.offsetLeft;
        const walk = x - startX;
        carousel.scrollLeft = scrollLeft - walk;
    });

    ['pointerup', 'pointercancel', 'pointerleave'].forEach(evt => {
        carousel.addEventListener(evt, () => {
            isDown = false;
        });
    });

    setInterval(() => {
        if (isDown || carousel.matches(':hover')) return;
        carousel.scrollLeft += 0.45;
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 2) {
            carousel.scrollLeft = 0;
        }
    }, 18);
}

function initMediaLightboxInputs() {
    const overlay = document.getElementById('media-lightbox');
    const inner = document.getElementById('media-lightbox-inner');
    let pointerStartX = 0;
    let pointerEndX = 0;

    window.addEventListener('keydown', (event) => {
        if (!overlay.classList.contains('active')) return;

        if (event.key === 'Escape') {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (event.key === 'ArrowLeft') {
            prevMedia(event);
        }

        if (event.key === 'ArrowRight') {
            nextMedia(event);
        }
    });

    inner.addEventListener('pointerdown', (event) => {
        pointerStartX = event.pageX;
    });

    inner.addEventListener('pointerup', (event) => {
        pointerEndX = event.pageX;
        const distance = pointerEndX - pointerStartX;

        if (Math.abs(distance) > 40) {
            if (distance < 0) {
                nextMedia(event);
            } else {
                prevMedia(event);
            }
        }
    });
}

function initBeltParallax() {
    const belt = document.querySelector('.faixa');
    const knot = document.querySelector('.no-faixa');
    if (!belt || !knot) return;

    let ticking = false;

    const updateBelt = () => {
        const scrolled = window.scrollY;
        const maxMove = 40;
        const moveY = Math.min(scrolled * 0.14, maxMove);
        const rotate = Math.sin(scrolled / 300) * 3;

        belt.style.transform = `translateX(-50%) translateY(${moveY}px) rotate(${rotate}deg)`;
        knot.style.transform = `translate(-50%, -50%) rotate(${rotate / 2}deg)`;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateBelt);
            ticking = true;
        }
    });

    window.addEventListener('resize', updateBelt);
    updateBelt();
}

window.addEventListener('DOMContentLoaded', () => {
    initMediaItems();
    initGalleryDrag();
    initSliderDrag('videos-slider');
    initCarouselDrag();
    initMediaLightboxInputs();
    initBeltParallax();
});
