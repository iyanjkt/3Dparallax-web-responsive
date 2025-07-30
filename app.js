const parallax_el = document.querySelectorAll('.parallax');
const main = document.querySelector('main')

function startParallax() {
    parallax_el.forEach((e) => {
        e
    })

    let xValue = 0, yValue = 0;

    let rotateDegree = 0;

    function update(cursorPosition) {
        parallax_el.forEach((el) => {
            let speedX = el.dataset.speedx;
            let speedY = el.dataset.speedy;
            let speedZ = el.dataset.speedz;
            let rotateSpeed = el.dataset.rotation;
            el.style.transition = '0.45s cubic-bezier(0.2, 0.49, 0.32, 0.99'

            let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
            let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

            el.style.transform = `translateX(calc(-50% + ${-xValue * speedX}px)) translateY(calc(-50% + ${yValue * speedY}px)) perspective(2300px) translateZ(${zValue * speedZ}px) rotateY(${rotateDegree * rotateSpeed}deg)`
        })
    }

    update(0)

    window.addEventListener('mousemove', (e) => {
        xValue = e.clientX - window.innerWidth / 2;
        yValue = e.clientY - window.innerHeight / 2;

        rotateDegree = xValue / (window.innerWidth / 2)

        update(e.clientX)

    })
}

function setMainHeight() {
    // Tentukan rasio aspek yang diinginkan untuk 'main'
    // Misalnya, di layar lebar, rasio 16:9 (0.5625) atau 16:10 (0.625) umum.
    // Di layar sempit (mobile), mungkin 4:3 (0.75) atau lebih tinggi untuk konten vertikal.
    const aspectRatioWide = 0.6; // Misalnya 16:10 atau mendekati
    const aspectRatioNarrow = 1; // Rasio tinggi 1.6x lebar untuk mobile

    if (window.innerWidth > 640) {
        // Untuk layar lebar, atur tinggi main berdasarkan rasio aspek lebar layar
        main.style.height = `${window.innerWidth * aspectRatioWide}px`;
    } else {
        // Untuk layar sempit (mobile), atur tinggi main berdasarkan rasio aspek sempit
        main.style.height = '100vh';
    }
    // Set minHeight agar tidak terlalu kecil di layar sangat sempit jika diperlukan
    // main.style.minHeight = '500px';
}

// Panggil fungsi saat load dan resize
setMainHeight(); // Panggil saat halaman dimuat
window.addEventListener('resize', setMainHeight); // Panggil saat ukuran jendela berubah


/* ꘏꘏꘏꘏꘏꘏꘏꘏꘏ GSAP ANIMATION ꘏꘏꘏꘏꘏꘏꘏꘏꘏ */

// let timeline = gsap.timeline({
//     onComplete: startParallax
// });

// Array.from(parallax_el)
//     .filter((el) => !el.classList.contains("text"))
//     .forEach(el => {
//         timeline.from(
//             el,
//             {
//                 duration: 3.5,
//                 top: `${el.dataset.distance - el.offsetHeight / 2}px`,
//                 ease: "power3.out"
//             },
//             "<"
//         )
//     });

// timeline.from(".text h1", {
//     y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top,
//     duration: 2,
//     ease: "power2.out"
// }, 2.5
// ).from(".text h2", {
//     y: -150,
//     opacity: 0,
//     duration: 1.5,
//     ease: "power2.out"
// }, 3
// ).from(".hide", {
//     opacity: 0,
//     duration: 1.5
// }, 3
// )
