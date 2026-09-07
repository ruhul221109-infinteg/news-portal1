/* =========================================
   DARK / LIGHT MODE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    if (themeToggle && themeIcon) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {

                themeIcon.classList.remove("bi-moon-fill");
                themeIcon.classList.add("bi-sun-fill");

            } else {

                themeIcon.classList.remove("bi-sun-fill");
                themeIcon.classList.add("bi-moon-fill");

            }

        });

    }
});


/* =========================================
   INTERVIEW CAROUSEL
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const interviewTrack =
        document.querySelector(".interview-track");

    const interviewCards =
        document.querySelectorAll(".interview-card");

    const interviewPrev =
        document.querySelector(".interview-prev");

    const interviewNext =
        document.querySelector(".interview-next");

    const interviewIndicators =
        document.querySelectorAll(
            ".interview-indicators .indicator"
        );

    if (
        !interviewTrack ||
        interviewCards.length === 0
    ) {
        return;
    }

    let interviewIndex = 0;


    function getInterviewMoveAmount() {

        const card = interviewCards[0];

        if (!card) {
            return 0;
        }

        const style =
            window.getComputedStyle(card);

        const marginRight =
            parseFloat(style.marginRight) || 0;

        return card.offsetWidth + marginRight;
    }


    function getInterviewVisibleCards() {

        const carousel =
            document.querySelector(
                ".interview-carousel"
            );

        if (!carousel) {
            return 1;
        }

        const moveAmount =
            getInterviewMoveAmount();

        if (moveAmount <= 0) {
            return 1;
        }

        return Math.max(
            1,
            Math.floor(
                carousel.offsetWidth /
                moveAmount
            )
        );
    }


    function getInterviewMaxIndex() {

        const visibleCards =
            getInterviewVisibleCards();

        return Math.max(
            0,
            interviewCards.length -
            visibleCards
        );
    }


    function updateInterview() {

        const moveAmount =
            getInterviewMoveAmount();

        interviewTrack.style.transform =
            `translateX(-${interviewIndex * moveAmount}px)`;


        /* Indicators */

        interviewIndicators.forEach(
            function (indicator) {

                indicator.classList.remove(
                    "active"
                );

            }
        );


        if (interviewIndicators.length > 0) {

            const indicatorIndex =
                interviewIndex > 0 ? 1 : 0;

            if (
                interviewIndicators[
                    indicatorIndex
                ]
            ) {

                interviewIndicators[
                    indicatorIndex
                ].classList.add("active");

            }

        }

    }


    if (interviewNext) {

        interviewNext.addEventListener(
            "click",
            function () {

                const maxIndex =
                    getInterviewMaxIndex();

                if (
                    interviewIndex <
                    maxIndex
                ) {

                    interviewIndex++;

                } else {

                    interviewIndex = 0;

                }

                updateInterview();

            }
        );

    }


    if (interviewPrev) {

        interviewPrev.addEventListener(
            "click",
            function () {

                const maxIndex =
                    getInterviewMaxIndex();

                if (interviewIndex > 0) {

                    interviewIndex--;

                } else {

                    interviewIndex = maxIndex;

                }

                updateInterview();

            }
        );

    }


    interviewIndicators.forEach(
        function (indicator, index) {

            indicator.addEventListener(
                "click",
                function () {

                    const maxIndex =
                        getInterviewMaxIndex();

                    if (index === 0) {

                        interviewIndex = 0;

                    } else {

                        interviewIndex =
                            Math.min(
                                1,
                                maxIndex
                            );

                    }

                    updateInterview();

                }
            );

        }
    );


    window.addEventListener(
        "resize",
        function () {

            const maxIndex =
                getInterviewMaxIndex();

            if (
                interviewIndex >
                maxIndex
            ) {

                interviewIndex =
                    maxIndex;

            }

            updateInterview();

        }
    );


    updateInterview();

});

// science tech

document.addEventListener("DOMContentLoaded", function () {

    const track =
        document.getElementById("techCarouselTrack");

    const cards =
        document.querySelectorAll(".tech-news-card");

    const prevBtn =
        document.getElementById("techPrevBtn");

    const nextBtn =
        document.getElementById("techNextBtn");

    const dotsBox =
        document.getElementById("techCarouselDots");


    if (
        !track ||
        cards.length === 0 ||
        !prevBtn ||
        !nextBtn ||
        !dotsBox
    ) {
        return;
    }


    let currentIndex = 0;

    let autoSlide;


    function getVisibleCards() {

        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 900) {
            return 2;
        }

        return 4;
    }


    function getMaxIndex() {

        return Math.max(
            0,
            cards.length - getVisibleCards()
        );

    }


    function getMoveAmount() {

        const card = cards[0];

        const gap = 18;

        return card.offsetWidth + gap;

    }


    function createDots() {

        dotsBox.innerHTML = "";

        const maxIndex =
            getMaxIndex();


        for (
            let i = 0;
            i <= maxIndex;
            i++
        ) {

            const dot =
                document.createElement("button");

            dot.type = "button";

            dot.className =
                "tech-carousel-dot";


            if (i === currentIndex) {

                dot.classList.add("active");

            }


            dot.addEventListener(
                "click",
                function () {

                    currentIndex = i;

                    updateCarousel();

                    restartAutoSlide();

                }
            );


            dotsBox.appendChild(dot);

        }

    }


    function updateDots() {

        const dots =
            dotsBox.querySelectorAll(
                ".tech-carousel-dot"
            );


        dots.forEach(
            function (dot, index) {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            }
        );

    }


    function updateCarousel() {

        const moveAmount =
            getMoveAmount();


        track.style.transform =
            "translateX(-" +
            (currentIndex * moveAmount) +
            "px";


        updateDots();

    }


    function nextSlide() {

        const maxIndex =
            getMaxIndex();


        if (currentIndex < maxIndex) {

            currentIndex++;

        } else {

            currentIndex = 0;

        }


        updateCarousel();

    }


    function previousSlide() {

        const maxIndex =
            getMaxIndex();


        if (currentIndex > 0) {

            currentIndex--;

        } else {

            currentIndex = maxIndex;

        }


        updateCarousel();

    }


    nextBtn.addEventListener(
        "click",
        function () {

            nextSlide();

            restartAutoSlide();

        }
    );


    prevBtn.addEventListener(
        "click",
        function () {

            previousSlide();

            restartAutoSlide();

        }
    );


    function startAutoSlide() {

        clearInterval(autoSlide);


        autoSlide =
            setInterval(
                function () {

                    nextSlide();

                },
                4000
            );

    }


    function restartAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();

    }


    window.addEventListener(
        "resize",
        function () {

            const maxIndex =
                getMaxIndex();


            if (
                currentIndex > maxIndex
            ) {

                currentIndex = maxIndex;

            }


            createDots();

            updateCarousel();

        }
    );


    createDots();

    updateCarousel();

    startAutoSlide();

});




// photo


document.addEventListener("DOMContentLoaded", function () {

    const track =
        document.getElementById("photoTrack");

    const cards =
        document.querySelectorAll(".photo-card");

    const prevBtn =
        document.getElementById("photoPrev");

    const nextBtn =
        document.getElementById("photoNext");

    const dotsBox =
        document.getElementById("photoDots");


    if (
        !track ||
        cards.length === 0 ||
        !prevBtn ||
        !nextBtn ||
        !dotsBox
    ) {
        return;
    }


    let currentIndex = 0;

    let autoSlide;


    /* =========================
       Visible Cards
    ========================== */

    function getVisibleCards() {

        if (window.innerWidth <= 600) {
            return 1;
        }

        return 2;
    }


    /* =========================
       Maximum Index
    ========================== */

    function getMaxIndex() {

        return Math.max(
            0,
            cards.length - getVisibleCards()
        );

    }


    /* =========================
       Card Movement
    ========================== */

    function getMoveAmount() {

        const card =
            cards[0];

        const gap = 16;

        return card.offsetWidth + gap;

    }


    /* =========================
       Create Dots
    ========================== */

    function createDots() {

        dotsBox.innerHTML = "";

        const maxIndex =
            getMaxIndex();


        for (
            let i = 0;
            i <= maxIndex;
            i++
        ) {

            const dot =
                document.createElement("button");


            dot.type = "button";

            dot.className =
                "photo-dot";


            if (i === currentIndex) {

                dot.classList.add("active");

            }


            dot.addEventListener(
                "click",
                function () {

                    currentIndex = i;

                    updateCarousel();

                    restartAutoSlide();

                }
            );


            dotsBox.appendChild(dot);

        }

    }


    /* =========================
       Update Dots
    ========================== */

    function updateDots() {

        const dots =
            dotsBox.querySelectorAll(
                ".photo-dot"
            );


        dots.forEach(
            function (dot, index) {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            }
        );

    }


    /* =========================
       Update Carousel
    ========================== */

    function updateCarousel() {

        const moveAmount =
            getMoveAmount();


        track.style.transform =
            "translateX(-" +
            (currentIndex * moveAmount) +
            "px)";


        updateDots();

    }


    /* =========================
       Next
    ========================== */

    function nextSlide() {

        const maxIndex =
            getMaxIndex();


        if (currentIndex < maxIndex) {

            currentIndex++;

        } else {

            currentIndex = 0;

        }


        updateCarousel();

    }


    /* =========================
       Previous
    ========================== */

    function previousSlide() {

        const maxIndex =
            getMaxIndex();


        if (currentIndex > 0) {

            currentIndex--;

        } else {

            currentIndex = maxIndex;

        }


        updateCarousel();

    }


    /* =========================
       Buttons
    ========================== */

    nextBtn.addEventListener(
        "click",
        function () {

            nextSlide();

            restartAutoSlide();

        }
    );


    prevBtn.addEventListener(
        "click",
        function () {

            previousSlide();

            restartAutoSlide();

        }
    );


    /* =========================
       Auto Slide
    ========================== */

    function startAutoSlide() {

        clearInterval(autoSlide);


        autoSlide =
            setInterval(
                function () {

                    nextSlide();

                },
                4000
            );

    }


    function restartAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();

    }


    /* =========================
       Resize
    ========================== */

    window.addEventListener(
        "resize",
        function () {

            const maxIndex =
                getMaxIndex();


            if (
                currentIndex > maxIndex
            ) {

                currentIndex = maxIndex;

            }


            createDots();

            updateCarousel();

        }
    );


    /* =========================
       Start
    ========================== */

    createDots();

    updateCarousel();

    startAutoSlide();

});


document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("mainNavbar");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 80) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

});




// sports



const track = document.getElementById("track");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const dots = document.querySelectorAll(".dot");

let current = 0;
let timer;

function getStep() {
    const card = document.querySelector(".card");

    if (!card) return 304;

    const gap = parseInt(
        getComputedStyle(track).gap
    ) || 24;

    return card.offsetWidth + gap;
}

function slideTo(index) {

    const cards = document.querySelectorAll(".card");

    const maxIndex = Math.max(
        0,
        cards.length - Math.floor(
            document.querySelector(".carousel-window").offsetWidth /
            getStep()
        )
    );

    current = Math.max(0, Math.min(index, maxIndex));

    track.style.transform =
        `translateX(-${current * getStep()}px)`;

    dots.forEach(dot => dot.classList.remove("active"));

    dots[current % dots.length].classList.add("active");
}

function nextSlide() {

    const cards = document.querySelectorAll(".card");

    const visibleCards = Math.floor(
        document.querySelector(".carousel-window").offsetWidth /
        getStep()
    );

    const maxIndex = cards.length - visibleCards;

    if (current >= maxIndex) {
        current = 0;
    } else {
        current++;
    }

    slideTo(current);
}

function prevSlide() {

    if (current <= 0) {
        current = document.querySelectorAll(".card").length - 4;
    } else {
        current--;
    }

    slideTo(current);
}


/* Buttons */

next.addEventListener("click", () => {
    nextSlide();
    restartAutoSlide();
});

prev.addEventListener("click", () => {
    prevSlide();
    restartAutoSlide();
});


/* Dots */

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        slideTo(index);
        restartAutoSlide();
    });
});


/* Auto slide */

function startAutoSlide() {
    timer = setInterval(() => {
        nextSlide();
    }, 3500);
}

function restartAutoSlide() {
    clearInterval(timer);
    startAutoSlide();
}


/* Pause on hover */

const carousel = document.querySelector(".carousel-wrapper");

carousel.addEventListener("mouseenter", () => {
    clearInterval(timer);
});

carousel.addEventListener("mouseleave", () => {
    startAutoSlide();
});


/* Start */

startAutoSlide();


/* Responsive resize */

window.addEventListener("resize", () => {
    slideTo(current);
});


// football


document.addEventListener("DOMContentLoaded", function () {

    const track = document.getElementById("sliderTrack");
    const slides = document.querySelectorAll(".slide");

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const dotsContainer = document.getElementById("dots");

    let currentPage = 0;
    let autoSlide;


    /* =========================
       VISIBLE CARD COUNT
    ========================= */

    function getVisibleCards() {

        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 900) {
            return 2;
        }

        return 3;
    }


    /* =========================
       TOTAL PAGES
    ========================= */

    function getTotalPages() {

        return Math.ceil(
            slides.length / getVisibleCards()
        );
    }


    /* =========================
       CREATE DOTS
    ========================= */

    function createDots() {

        dotsContainer.innerHTML = "";

        const totalPages = getTotalPages();

        for (let i = 0; i < totalPages; i++) {

            const dot = document.createElement("button");

            dot.className = "dot";

            dot.setAttribute("aria-label", "Go to slide " + (i + 1));

            if (i === currentPage) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", function () {

                currentPage = i;

                updateCarousel();

                restartAutoSlide();

            });

            dotsContainer.appendChild(dot);
        }
    }


    /* =========================
       MOVE CAROUSEL
    ========================= */

    function updateCarousel() {

        const visibleCards = getVisibleCards();

        const slide = slides[0];

        const slideWidth =
            slide.getBoundingClientRect().width;

        const gap = 23;

        const move =
            currentPage *
            visibleCards *
            (slideWidth + gap);

        track.style.transform =
            `translateX(-${move}px)`;


        /* Active dot */

        const dots =
            dotsContainer.querySelectorAll(".dot");

        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentPage
            );

        });
    }


    /* =========================
       NEXT
    ========================= */

    function nextSlide() {

        const totalPages = getTotalPages();

        currentPage++;

        if (currentPage >= totalPages) {
            currentPage = 0;
        }

        updateCarousel();
    }


    /* =========================
       PREVIOUS
    ========================= */

    function previousSlide() {

        const totalPages = getTotalPages();

        currentPage--;

        if (currentPage < 0) {
            currentPage = totalPages - 1;
        }

        updateCarousel();
    }


    /* =========================
       AUTO SLIDE
       3.5 SECOND
    ========================= */

    function startAutoSlide() {

        autoSlide = setInterval(function () {

            nextSlide();

        }, 3500);
    }


    /* =========================
       RESTART TIMER
    ========================= */

    function restartAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();
    }


    /* =========================
       BUTTON CLICK
    ========================= */

    nextBtn.addEventListener("click", function () {

        nextSlide();

        restartAutoSlide();
    });


    prevBtn.addEventListener("click", function () {

        previousSlide();

        restartAutoSlide();
    });


    /* =========================
       PAUSE ON HOVER
    ========================= */

    const sliderWrapper =
        document.querySelector(".slider-wrapper");

    sliderWrapper.addEventListener("mouseenter", function () {

        clearInterval(autoSlide);

    });


    sliderWrapper.addEventListener("mouseleave", function () {

        startAutoSlide();

    });


    /* =========================
       RESIZE
    ========================= */

    window.addEventListener("resize", function () {

        currentPage = 0;

        createDots();

        updateCarousel();

    });


    /* =========================
       INITIALIZE
    ========================= */

    createDots();

    updateCarousel();

    startAutoSlide();

});




// detail paoar code

function goToDetails(id) {
            window.location.href = `demoH.html?id=${id}`;
        }

        // newsData.json ফাইল থেকে ডাটা এনে কার্ড তৈরি করা
      fetch('demo.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('news-container');
        data.forEach(item => {
            container.innerHTML += `
                <div class="news-card" onclick="goToDetails('${item.id}')">
                    <img src="${item.image}" alt="${item.title}">
                    <h3>${item.title}</h3>
                </div>
            `;
        });
    });