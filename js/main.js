const clipText = document.querySelectorAll(".person__descr");
const video = document.querySelector('.video video');
const modalVideoOpenBtn = document.querySelector(".video__play");
const modalVideoCloseBtn = document.querySelector(".modal-video__close");
const modalVideo = document.querySelector(".modal-video");

function openVideoModal(modal) {
    const modalVideo = modal.querySelector("video");

    document.body.style.overflowY = "hidden";
    modal.classList.add("show");
    modalVideo.play();
}

function closeVideoModal(modal) {
    const modalVideo = modal.querySelector("video");

    document.body.style.overflowY = "auto";
    modal.classList.remove("show");
    modalVideo.pause();
}

clipText.forEach(el => {
    el.addEventListener("click", (e) => {
        if (el.classList.contains('active')) {
            el.style.maxHeight = null;
            el.classList.remove('active');
        } else {
            el.style.maxHeight = el.scrollHeight + 'px';
            el.classList.add('active');
        }
    })
});

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    video.style.transform = `translateY(-${scrollPosition * 0.3}px)`;
});

// modalVideo

modalVideoOpenBtn.addEventListener("click", () => { openVideoModal(modalVideo) });
modalVideoCloseBtn.addEventListener("click", () => {closeVideoModal(modalVideo)})

modalVideo.addEventListener("click", (e) => {
    if (e.target === modalVideo) {
        closeVideoModal(modalVideo);
    }
});

// gallery slider   
const slider = document.querySelector('.gallery__items');
let isHovered = false;
let isDragging = false;
let startX, scrollLeft;

// Динамическое добавление элементов из HTML
function appendImages() {
    const images = slider.querySelectorAll('img');
    images.forEach(img => {
        const clone = img.cloneNode(true);
        slider.appendChild(clone); // Добавляем копию в конец
    });
}

function prependImages() {
    const images = slider.querySelectorAll('img');
    [...images].reverse().forEach(img => {
        const clone = img.cloneNode(true);
        slider.prepend(clone); // Добавляем копию в начало
    });
}

// Проверка границ и добавление элементов
function checkInfiniteScroll() {
    const buffer = 300; // Зона приближения к границе

    if (slider.scrollLeft < buffer) {
        prependImages();
        slider.scrollLeft += slider.scrollWidth / 2; // Корректируем позицию
    } else if (slider.scrollLeft + slider.offsetWidth > slider.scrollWidth - buffer) {
        appendImages();
    }
}

// Автоматическая прокрутка
function autoScroll() {
    if (!isHovered && !isDragging) {
        slider.scrollLeft += 1; // Прокрутка вправо
        checkInfiniteScroll();
    }
}

// Реализация перетаскивания мышью
slider.addEventListener('mousedown', (e) => {
    isHovered = true;
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.classList.add('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk; // Прокрутка в зависимости от движения мыши
});

slider.addEventListener('mouseup', () => {
    isDragging = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseleave', () => {
    isHovered = false;
});

// Инициализация
appendImages();
appendImages(); // Добавляем элементы заранее
setInterval(autoScroll, 20); // Настройка скорости автоскролла