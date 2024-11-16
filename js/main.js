document.addEventListener("DOMContentLoaded", () => {
    const clipText = document.querySelectorAll(".person__descr");
    const video = document.querySelector('.video video');
    const videoSection = document.querySelector(".video");
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
        // Получаем элемент (секции)
        const section = videoSection;

        // Получаем его положение и размеры относительно окна
        const rect = section.getBoundingClientRect();

        // Вычисляем центр секции относительно окна
        const sectionCenter = rect.top + scrollY + rect.height / 2;

        console.log(sectionCenter);

        // Получаем текущую прокрутку окна
        const currentScroll = scrollY;

        // Вычисляем значение прокрутки относительно центра секции
        const scrollToSectionCenter = sectionCenter - currentScroll;

        video.style.transform = `translateY(-${scrollToSectionCenter * 0.3}px)`;
    });

    // modalVideo

    modalVideoOpenBtn.addEventListener("click", () => { openVideoModal(modalVideo) });
    modalVideoCloseBtn.addEventListener("click", () => { closeVideoModal(modalVideo) })

    modalVideo.addEventListener("click", (e) => {
        if (e.target === modalVideo) {
            closeVideoModal(modalVideo);
        }
    });

    // gallery slider   
    const slider = document.querySelector('.gallery__items');
    let isHovered = false;
    let isDragging = false;
    let isClicked = true;
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
        isDragging = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.classList.add('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        isClicked = false;
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk; // Прокрутка в зависимости от движения мыши
    });

    slider.addEventListener('mouseup', () => {
        isDragging = false;
        slider.classList.remove('active');
        setTimeout(() => {
            isClicked = true;
        }, 10)
    });

    slider.addEventListener('mouseleave', () => {
        isHovered = true;
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

    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    const closeModal = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Получаем все изображения
    const images = slider.querySelectorAll('img');
    let currentIndex = -1;

    // Функция для открытия модального окна с изображением
    function openModal(index) {
        currentIndex = index;
        const img = images[currentIndex];
        modal.style.display = "block";
        modalImg.setAttribute("src", img.getAttribute("src"))
        captionText.innerHTML = img.alt;
    }

    // Функция для закрытия модального окна
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Открытие модального окна при клике на изображение в слайдере
    slider.addEventListener('click', (e) => {
        if (e.target && e.target.tagName === 'IMG' && isClicked === true) {
            const clickedIndex = [...images].indexOf(e.target);
            openModal(clickedIndex);
        }
    });

    slider.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault(); // Отменяем действие клика при перетаскивании
        }
    });

    // Навигация по изображениям с помощью кнопок
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            openModal(currentIndex - 1);
        } else {
            openModal(images.length - 1); // Переход к последнему изображению
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            openModal(currentIndex + 1);
        } else {
            openModal(0); // Переход к первому изображению
        }
    });

    // Закрытие модального окна при клике вне изображения
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

})