$(document).ready(function () {
  "use strict";

  // Function to show the newsletter popup
  function showNewsletterPopup() {
    $.magnificPopup.open({
      items: {
        src: "#newsletter-popup-form",
      },
      type: "inline",
      removalDelay: 350,
      callbacks: {
        open: function () {
          $("body").css("overflow-x", "visible");
          $(".sticky-header.fixed").css("padding-right", "1.7rem");
        },
        close: function () {
          $("body").css("overflow-x", "hidden");
          $(".sticky-header.fixed").css("padding-right", "0");
        },
      },
    });
  }

  // Show newsletter popup after 5 seconds
  setTimeout(function () {
    var mpInstance = $.magnificPopup.instance;
    if (mpInstance.isOpen) {
      mpInstance.close();
    }

    showNewsletterPopup();
  }, 2000); // 5000 milliseconds = 5 seconds
});
