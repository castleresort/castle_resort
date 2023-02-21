document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector("#header");
  if (selectHeader) {
    document.addEventListener("scroll", () => {
      window.scrollY > 100
        ? selectHeader.classList.add("sticked")
        : selectHeader.classList.remove("sticked");
    });
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll("#navbar a");

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navbarlinksActive);
  document.addEventListener("scroll", navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector(".mobile-nav-show");
  const mobileNavHide = document.querySelector(".mobile-nav-hide");

  document.querySelectorAll(".mobile-nav-toggle").forEach(el => {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      mobileNavToogle();
    });
  });

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavShow.classList.toggle("d-none");
    mobileNavHide.classList.toggle("d-none");
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navbar a").forEach(navbarlink => {
    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll(".navbar .dropdown > a");

  navDropdowns.forEach(el => {
    el.addEventListener("click", function (event) {
      if (document.querySelector(".mobile-nav-active")) {
        event.preventDefault();
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("dropdown-active");

        let dropDownIndicator = this.querySelector(".dropdown-indicator");
        dropDownIndicator.classList.toggle("bi-chevron-up");
        dropDownIndicator.classList.toggle("bi-chevron-down");
      }
    });
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    };
    window.addEventListener("load", togglescrollTop);
    document.addEventListener("scroll", togglescrollTop);
    scrollTop.addEventListener(
      "click",
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    );
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox"
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper(".slides-1", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper(".slides-3", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3
      }
    }
  });

  /**
   * Gallery Slider
   */
  new Swiper(".gallery-slider", {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener("load", () => {
    aos_init();
  });


  // fetch data from api
 // local http://127.0.0.1:5500/assets/js/foods_api.txt
 // online https://raw.githubusercontent.com/samih93/assets/main/foods_api.txt
  fetch("assets/js/foods_api.txt")
    .then(result => {
      let mydata = result.json();
      // console.log(mydata);
      return mydata;
    })
    .then(function (data) {

      // ! getting logo 
      var mylogo = data["logo"];
      if(mylogo.trim()=="")
      document.querySelector('img.mylogo').remove();
      else
      document.querySelector('img.mylogo').src =mylogo;



      //! getting menu link items
      var menu = data["menu"];
      var menu_items = "";
      menu.forEach(function (e) {
        menu_items +=
          `<li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" data-name="${e}">
            <h4>${e[0].toUpperCase()}${e.substring(1)}</h4>
          </a>
        </li>`;

      });
      // assign menu
      document.querySelector("ul.nav").innerHTML = menu_items;


      //! getting foods
      var foods = data["foods"];
      var foodItems = "";
      foods.forEach(function (e) {
        foodItems += `
        <div class="col-lg-4 col-md-6 menu-item d-flex flex-column  align-items-center ${e.category
          }" data-item-name="${e.name}">
        <a href="${e.image}" data-gallery="images-gallery" class="glightbox mb-2"><img  src="${e.image}"
            class="menu-img img-fluid" alt=""></a>
        <h4>${e.name}</h4>
        <p class="ingredients">
          ${e.description}
        </p>
        <p class="price">
          $${e.price}
        </p>
      </div>
        `;
      });
      // assign foods
      document.querySelector(".items_container").innerHTML = foodItems;


      // ! gettings events
      var events = data["events"];
      var event_items = "";

      // ! if no event yet so we remove it
      if (events.length == 0) {
        document.querySelector('section#events').remove()
      }
      else {
        events.forEach(function (e) {
          event_items += `<div class="swiper-slide event-item d-flex flex-column justify-content-end"
          style="background-image: url(${e.image})">
          <h3>${e.title}</h3>
          <div class="price align-self-start">$${e.price}</div>
          <p class="description">
            ${e.description}
          </p>
        </div>`;
        });
        // assign events
        document.querySelector("#events .swiper-wrapper").innerHTML = event_items;
      }

      // ! getting chefs
      var chefs = data["chefs"];
      var chef_items = "";
      if (chefs.length == 0) {
        document.querySelector('section#chefs').remove();

      }
      else {
        chefs.forEach(function (e) {
          chef_items += `
          <div class="col-lg-4 col-md-6  d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
              <div class="chef-member">
                <div class="member-img">
                  <img src="${e.image}" class="img-fluid" alt="">
                  <div class="social">
                    <a href="${e.facebook}"><i class="bi bi-facebook"></i></a>
                    <a href="${e.instagram}"><i class="bi bi-instagram"></i></a>
                  </div>
                </div>
                <div class="member-info">
                  <h4>${e.name}</h4>
                  <span>${e.rank}</span>
                  <p>${e.description}</p>
                </div>
              </div>
            </div>`;
        });
        // assign chefs
        document.querySelector("section#chefs div.row").innerHTML = chef_items;

      }


      // //! getting gallery

      var gallery = data["gallery"];
      var gallery_items = "";
      if (gallery.length == 0) {
        document.querySelector('section#gallery').remove();
      }
      else {
        var index = 1;
        gallery.forEach(function (e) {
          gallery_items += `<div class="swiper-slide" data-swiper-slide-index="${index - 1}" aria-label=${index}>
                                <a class='glightbox' data-gallery='images-gallery' href=${e}>
                                  <img src=${e} class="img-fluid" alt="">
                                </a>
                             </div>`;
          index++;
        });
        document.querySelector("section#gallery .swiper-wrapper").innerHTML = gallery_items;

      }

      // ! getting contact us Data
      var contactus = data["contactUs"];
      //! check if link of map exist
      console.log(contactus.mapLink);
      if(contactus.mapLink.trim()=="")
      {
        document.querySelector('div.map').innerHTML="";
      }
      else
      {
        document.querySelector('iframe').src=contactus.mapLink;

      }

      document.querySelector('p.ourAddress').innerHTML=contactus.address;
      document.querySelector('p.ourEmail').innerHTML=contactus.email;
      document.querySelector('p.ourPhone').innerHTML=contactus.phone;
      document.querySelector('.ourOpeningHours').innerHTML=contactus.openingHours;


      //! getting social media links
      var socailLinks =data["followUs"];

      //! check if twitter link available
      if(socailLinks.twitter.trim()=="")
      {
        document.querySelector('.social-links .twitter').remove();
      }
      else
      {
        document.querySelector('.social-links .twitter').href = socailLinks.twitter;
      }

      //! check if facebook link available
      if(socailLinks.facebook.trim()=="")
      {
          document.querySelector('.social-links .facebook').remove();
      }
     else
      {
            document.querySelector('.social-links .facebook').href = socailLinks.facebook;
      }


        //! check if instagram link available
        if(socailLinks.instagram.trim()=="")
        {
            document.querySelector('.social-links .instagram').remove();
        }
       else
        {
              document.querySelector('.social-links .instagram').href = socailLinks.instagram;
        }

        //! check if linkedIn link available
         if(socailLinks.linkedin.trim()=="")
         {
             document.querySelector('.social-links .linkedin').remove();
         }
        else
          {
                 document.querySelector('.social-links .linkedin').href = socailLinks.linkedin;
          }
  




    }).then(function (value) {
      var links = document.querySelectorAll(".nav-link");

      var menu_items = document.querySelectorAll(".items_container .menu-item");
      console.log(menu_items.length);

      links.forEach(function (e) {
        e.addEventListener("click", function () {
          var category = e.getAttribute("data-name");

          switch (category) {
            case "appetizers":
              menu_items.forEach(function (e) {
                if (!e.classList.contains("appetizers")) {
                  e.classList.add("d-none");
                } else {
                  e.classList.remove("d-none");
                }
              });
              break;
            case "sandwiches":
              menu_items.forEach(function (e) {
                if (!e.classList.contains("sandwiches")) e.classList.add("d-none");
                else {
                  e.classList.remove("d-none");
                }
              });
              break;
            case "plates":
              menu_items.forEach(function (e) {
                if (!e.classList.contains("plates")) e.classList.add("d-none");
                else {
                  e.classList.remove("d-none");
                }
              });
              break;
            // all
            default:
              menu_items.forEach(function (e) {
                e.classList.remove("d-none");
              });
              break;
          }
        });
      });

    });


    var input = document.querySelector('.my-input');
    // ! on press enter close keybord
    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        input.blur();

      }
    });

   
    

  



});


function filterResult(element) {
  var menu_items = document.querySelectorAll(".items_container .menu-item");

  if (element == null || element.value.trim() == "") {
    menu_items.forEach(function (e) {
      e.classList.remove("d-none");
    });
  } else {
    menu_items.forEach(function (e) {
      if (
        !e
          .getAttribute("data-item-name")
          .toString()
          .toLowerCase()
          .includes(element.value.trim().toLowerCase())
      ) {
        e.classList.add("d-none");
      } else {
        e.classList.remove("d-none");
      }
    });
  }
}

function check(element)
{
  console.log(element);
}
