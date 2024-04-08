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
  }, 3000); // 5000 milliseconds = 5 seconds
  // Function to show the offer popup
  function showOfferPopup() {
    $.magnificPopup.open({
      items: {
        src: "#offer-popup",
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

  // Event listener for clicking on the offer tag
  $(document).on("click", "#offer_tag", function (e) {
    e.preventDefault(); // Prevent the default action of the link
    showOfferPopup(); // Show the offer popup
  });

  // Form submission handling
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      // Get form values
      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var tel = document.getElementById("tel").value.trim();
      var client_id = "wexorai"; // Replace with your user ID

      // Check if name, email, and tel fields are not empty
      if (name === "" || email === "" || tel === "") {
        alert("Name, Email, and Mobile Number are required fields.");
        return; // Exit the function if any of the required fields are empty
      }

      // Duplicate tel value into message
      var message = `Tel: ${tel}\n\n Message:`;

      // Send JSON request using Fetch API
      var payload = {
        client_id: client_id,
        name: name,
        email: email,
        tel: tel,
        message: message, // Only tel is appended to the message
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
            gtag('event', 'conversion', { 'send_to': 'AW-11467448022/8iw9CM7iv6QZENa9jdwq' });
            // Reset form fields except name, email, and tel
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";
          } else {
            throw new Error("Failed to send message.");
          }
        })
        .catch(function (error) {
          alert("An error occurred: " + error.message);
        });

      // Reset form fields except name, email, and tel
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
    });
});
