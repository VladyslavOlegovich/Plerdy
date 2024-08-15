new Swiper(".mySwiper", {
  slidesPerView: "auto",

  spaceBetween: 17,
  loop: true,
  //   autoHeight: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".custom-next",
    prevEl: ".custom-prev",
  },
  breakpoints: {
    360: {
      pagination: {
        el: ".pagination-wrapper .swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
    },
    460: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});
//----------------------modal select-------------------------------------------------------
$(".code-list .item").click(function () {
  $(".phone-mask").val($(this).data("mask"));
  $(".phone-input-wrapper__active img").attr("src", $(this).data("flag"));
  $(".code-list").fadeOut("fast");
});

$(".phone-input-wrapper__active").click(function () {
  $(this).closest(".phone-input-wrapper").find(".code-list").fadeIn("fast");
});

// Список масок для різних країн
let masks = {
  UA: "+38",
  IS: "+354",
  FI: "+358",
};

function applyMask(countryCode) {
  let mask = masks[countryCode] || "";
  if (mask) {
    $(".phone-mask").val(mask);
    $(".phone-input-wrapper__active img").attr(
      "src",
      `flag/${countryCode.toLowerCase()}.jpg`
    );
  } else {
    $(".phone-mask").mask(masks["UA"]);
    $(".phone-input-wrapper__active img").attr(
      "src",
      `flag/${countryCode.toLowerCase()}.jpg`
    );
  }
}

// Визначаємо країну користувача
fetch("https://ipapi.co/json/")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    applyMask(data.country_code);
  })
  .catch(function (error) {
    console.error("Error while fetching country: ", error);
  });
$(document).mouseup(function (e) {
  let container = $(".code-list");
  if (!$(e.target).hasClass("code-list")) {
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.fadeOut("fast");
    }
  }
});

//------------------------------------------validation---------------------------------------------------
$(document).ready(function () {
  $("#contactForm").on("submit", function (event) {
    event.preventDefault();

    let nameInput = $("#nameInput");
    if (nameInput.val().trim() === "") {
      nameInput.addClass("is-invalid");
      nameInput.siblings(".error-message").show();
    } else {
      nameInput.removeClass("is-invalid");
      nameInput.siblings(".error-message").hide();
    }

    let phoneInput = $("#phoneInput");
    if (phoneInput.val().trim() === "") {
      phoneInput.addClass("is-invalid");
      phoneInput.siblings(".error-message").show();
    } else {
      phoneInput.removeClass("is-invalid");
      phoneInput.siblings(".error-message").hide();
    }

    if (nameInput.val().trim() !== "" && phoneInput.val().trim() !== "") {
    }
  });

  $("#nameInput, #phoneInput").on("input", function () {
    $(this).removeClass("is-invalid");
    $(this).siblings(".error-message").hide();
  });
});
