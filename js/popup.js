$(document).ready(function () {
  "use strict";

  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var telInput = document.getElementById("tel");

  var autoPopupTimer; // Variable to store the timer for the auto popup
  // Function to show a popup
  function showPopup(popupId) {
    $.magnificPopup.open({
      items: {
        src: popupId,
      },
      type: "inline",
      removalDelay: 350,
      callbacks: {
        open: function () {
          $("body").css("overflow", "hidden"); // Prevent background scrolling
          $("body").css("position", "fixed"); // Fix the body position
          $(".sticky-header.fixed").css("padding-right", "1.7rem");
        },
        close: function () {
          $("body").css("overflow", "auto"); // Restore background scrolling
          $("body").css("position", "static"); // Restore body position
          $(".sticky-header.fixed").css("padding-right", "0");
        },
      },
    });
  }
  // Show newsletter popup after 5 seconds
  autoPopupTimer = setTimeout(function () {
    var mpInstance = $.magnificPopup.instance;
    if (mpInstance.isOpen) {
      mpInstance.close();
    }
    showPopup("#newsletter-popup-form");
  }, 10000);

  // Event listener for clicking on the offer tag
  $(document).on("click", "#offer_tag", function (e) {
    e.preventDefault(); // Prevent the default action of the link
    clearTimeout(autoPopupTimer); // Clear the auto popup timer
    showPopup("#offer-popup"); // Show the offer popup
  });
  // Form submission handling for the auto popup
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      var name = nameInput.value.trim();
      var email = emailInput.value.trim();
      var tel = telInput.value.trim();
      var client_id = "wc_PtOOTFabQTEBrbf66aBw"; // Replace with your user ID
      if (name === "" || email === "" || tel === "") {
        alert("Name, Email, and Mobile Number are required fields.");
        return;
      }
      var message = `Tel: ${tel}\n\n Message: A message from your website visitor`;
      var payload = {
        client_id: client_id,
        name: name,
        email: email,
        tel: tel,
        message: message,
      };
      fetch("https://chatbot.wexorai.com/clientmessagef3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
      })
        .then(function (response) {
          if (response.ok) {
            alert(
              "Offer message sent successfully! Our team will connect with you shortly."
            );
            $.magnificPopup.close();
            // Reset form fields except name, email, and tel
            nameInput.value = "";
            emailInput.value = "";
            telInput.value = "";
          } else {
            throw new Error("Failed to send message.");
          }
        })
        .catch(function (error) {
          alert("An error occurred: " + error.message);
        });
    });
  // Form submission handling for the button click popup
  document
    .getElementById("contactFormButton")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      var name = document.getElementById("nameButton").value.trim();
      var email = document.getElementById("emailButton").value.trim();
      var tel = document.getElementById("telButton").value.trim();
      var client_id = "wc_PtOOTFabQTEBrbf66aBw"; // Replace with your user ID

      if (name === "" || email === "" || tel === "") {
        alert("Name, Email, and Mobile Number are required fields.");
        return;
      }
      var message = `Tel: ${tel}\n\n Message: A message from your website visitor`;
      var payload = {
        client_id: client_id,
        name: name,
        email: email,
        tel: tel,
        message: message,
      };
      fetch("https://chatbot.wexorai.com/clientmessagef3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
      })
        .then(function (response) {
          if (response.ok) {
            alert(
              "Offer message sent successfully! Our team will connect with you shortly."
            );
            $.magnificPopup.close();
            // Reset form fields except name, email, and tel
            document.getElementById("nameButton").value = "";
            document.getElementById("emailButton").value = "";
            document.getElementById("telButton").value = "";
          } else {
            throw new Error("Failed to send message.");
          }
        })
        .catch(function (error) {
          alert("An error occurred: " + error.message);
        });
    });
});
