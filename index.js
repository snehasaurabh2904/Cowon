// const nav = document.querySelector('.header');
const nav = document.querySelector(".fullnav");

const slider = document.querySelector(".slider");
// const navScroll = document.querySelector('.header__magic');
const navScroll = document.querySelector(".magic_nav");

////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////..............SLIDER..................///////////////////////////////////

const sliders = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  let maxSlide = slides.length;

  const slider = document.querySelector(".slider");
  //slider.style.transform = 'scale(.2) translateX(-1200px)';
  //slider.style.overflow = 'visible';

  //slides.forEach((s,i) => (s.style.transform = `translateX(${100*i}%)`));

  // 1. slide at 0%
  // 2. slide at 100%
  // 3. slide at 200%
  // 4. slide at 300%

  ///////////FUNCTIONS
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"> </button>`
      );
    });
  };

  const activateDot = function (slide) {
    dotContainer.childNodes.forEach((ch) =>
      ch.classList.remove("dots__dot--active")
    );
    //e.target.classList.add('dots__dot--active');
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //Previous Slide
  const prevSlide = function () {
    if (curSlide == 0) curSlide = maxSlide - 1;
    else curSlide--;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // -----> INITIAL CONDITIONS <------
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0); // for begning to keep one dot in ACTIVE STATE
  };
  init();

  // EVENT HANDLERS
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    e.key === "ArrowLeft" && prevSlide(); //short circuiting
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const [slide] = e.target.dataset.slide;
      activateDot(slide);
      //console.log(slide);
      goToSlide(slide);
    }
  });
};

sliders();

////////////////////////////----->Implementing Sticky Nav-Bar<------////////////////////////////////
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entries[0]);

  // if (!entry.isIntersecting) navScroll.classList.remove("header__display");
  if (!entries[0].isIntersecting) navScroll.classList.remove("header__display");
  else navScroll.classList.add("header__display");

  // if (!entry.isIntersecting) nav.classList.add('sticky');
  // else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(slider);

////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////---------------->REVEAL SECTION<----------------/////////////////////////////////

const allSections = document.querySelectorAll(".section");
allSections.forEach((el) => el.classList.add("section--hidden"));

const revealSection = function (entries, observer) {
  const [entry] = entries;

  //yaha pr usshi section ko visible krna hai jiss section ko intersect kr rahe h hum
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((el) => sectionObserver.observe(el));

//////////////REVEALING precaution section Images on Scroll/////////////

const PrecauImages = document.querySelectorAll(".points");
const PointsHeight = document
  .querySelector(".points")
  .getBoundingClientRect().height;

PrecauImages.forEach((ele) => {
  const img = ele.querySelector(".point__img");
  console.log(img);
  const num = ele.dataset.key;
  console.log(num);

  img.classList.remove(
    `${Number.parseInt(num) % 2 == 0 ? "anime__right" : "anime__left"}`
  );
});

//console.log(PrecauImages);

const revealSectionImages = function (entries, observer) {
  const [entry] = entries;

  //yaha pr usshi section ko visible krna hai jiss section ko intersect kr rahe h hum
  if (!entry.isIntersecting) return;
  //console.log(entry.target);

  // if(entry.target.querySelector('.point__img').classList.contains('anime__left'))
  // entry.target.querySelector('.point__img').classList.remove('anime__left');
  const img = entry.target.querySelector(".point__img");
  if (Number.parseInt(entry.target.dataset.key) % 2 == 0)
    img.classList.add("anime__right");
  else img.classList.add("anime__left");

  observer.unobserve(entry.target);
};

const sectionObserverImages = new IntersectionObserver(revealSectionImages, {
  root: null,
  threshold: 0.2,
  // rootMargin: `${PointsHeight}px`
});

PrecauImages.forEach((el) => sectionObserverImages.observe(el));
