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
})