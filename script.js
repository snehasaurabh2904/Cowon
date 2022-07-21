console.log("working");
function myFunction() {
  var a = document.getElementById("mais");
  console.log(a);
  if (a.style.display == "none") {
    // console.log(a.style.display);
    a.style.display = "block";
    // console.log(a.style.display);
  } else {
    a.style.display = "none";
  }
}

// $(document).ready(function () {
//   $(window).scroll(function () {
//     var scroll = $(window).scrollTop();
//     if (scroll > 10) {
//       $("#nav").css("background", "#9491915f");
//     } else {
//       $(".black").css("background", "black");
//     }
//   });
// });

// var preload = document.getElementById("preloader");
// function preloader() {
//   preload.style.display = "none";
//   console.log(preload);
// }

const nav = document.querySelector(".fullnav");
const navHeight = nav.getBoundingClientRect().height;

const initialCoords = nav.getBoundingClientRect();

//NOTE__: Below methods by window.scrollY is not recommended bcz it slows down the apps as it fires again and again

window.addEventListener("scroll", function () {
  if (window.scrollY > navHeight) nav.classList.add("color__set");
  else nav.classList.remove("color__set");
});
