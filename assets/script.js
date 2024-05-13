if (
  top.location.pathname.includes("/services.html") ||
  top.location.pathname.includes("/index.html")
) {
  $(function () {
    // Cards Data
    const dataCards = [
      {
        id: 1,
        image: "assets/img/product1.png",
        title:
          "Gigabyte GeForce GTX 1650 Eagle 4G OC GDDR6 128-bit LHR Gaming Graphics Card",
        subheading: "Graphics Processing GeForce® GTX 1650 Core Clock",
        description:
          "Powered by the NVIDIA Turing architecture and GeForce Experience, the GeForce GTX 1650 features 4GB of GDDR6 memory with a 128-bit memory interface. The WINDFORCE 2X cooling system features alternate spinning 80mm fans with unique blade design. The core clock is 1710 MHz.",
        price: 5000,
        priceOffer: 4399,
        isExist: true,
        productCode: "H410M-APRO",
      },
      {
        id: 2,
        image: "assets/img/product2.png",
        title: "HyperX Alloy Origins Tenkeyless RGB Mechanical Keyboard",
        subheading:
          "HyperX Alloy Origins Mechanical Tenkeyless Gaming Keyboard with RGB Lighting",
        description:
          "It is a compact and sturdy keyboard that features mechanical switches designed to provide gamers with the best blend of style, performance, and reliability. These mechanical switches have exposed LEDs for stunning lighting with a balanced actuation force and travel distance for a high level of responsiveness and accuracy. Alloy Origins is built with a solid aluminum body that keeps it rigid and stable when the action demands it, and lets you choose from three different tilt levels. Its sleek and compact design leaves more room for mouse movement and also features a detachable USB Type-C cable for improved portability.",
        price: 1280,
        isExist: true,
        productCode: "AS13C-RAWQ",
      },
      {
        id: 3,
        image: "assets/img/product3.png",
        title: "HyperX Cloud Stinger™ 2.4GHz Wireless PS4 Audio",
        subheading: "2.4GHz wireless connection and durable pads",
        description:
          "HyperX Cloud Stinger™ headphones are officially licensed PS4 headphones that are ideal for gamers looking for comfort, superior sound quality, and added convenience. They are lightweight and feature HyperX's signature memory foam, which delivers a legendary level of comfort during marathon gaming sessions. Their 90-degree rotating earcups can rest comfortably around your neck during breaks.",
        price: 1348,
        priceOffer: 765,
        isExist: false,
        productCode: "43REQ-TYI1",
      },
      {
        id: 4,
        image: "assets/img/product4.png",
        title: "GIGABYTE UD Series for Ryzen™ 3rd Gen & Radeon™ Graphics",
        subheading:
          "Supports AMD 3rd Gen Ryzen™ and 3rd Gen Ryzen™ with Radeon™ Graphics",
        description:
          "GIGABYTE UD Series motherboards use a pure digital 5+3 phase PWM + Low RDS(on) MOSFET design to support AMD Ryzen™ 3rd Gen CPUs by delivering incredible accuracy in power delivery to the most power-sensitive components and the system itself, as well as providing enhanced system performance and maximum hardware scalability.",
        price: 2699,
        isExist: false,
        productCode: "TYUT7-FNTG",
      },
    ];
    // Load cards when document load
    loadCards($(".cards .containerCards"), dataCards);

    // Load quick details modal on click
    $(".card_ .quickDetails").click(function () {
      let id = $(this).data("id");
      let info = dataCards.find((prod) => prod.id == id);
      showDetails(info);
    });

    $(".card_ .innerProd .actions .button").click(function () {
      let id = $(this).closest(".card_").find(".quickDetails").data("id");
      let info = dataCards.find((prod) => prod.id == id);
      showDetails(info);
    });

    // Add/Remove from cart
    $(document).on(
      "click",
      ".component_toCartQuantity .toCartButton",
      function () {
        const button = $(this);
        toCartQuantity(
          button,
          button.hasClass("more")
            ? "add"
            : button.hasClass("less")
            ? "remove"
            : null
        );
      }
    );

    // Favorites toggle
    $(document).on("click", ".aFavs", function () {
      $(this).toggleClass("isFav");
    });

    // Image Zoom toggle
    $(document).on("click", ".quickInfoModal .zoomWatch", function () {
      var areaimage = $(this).parent();
      zoomImg(areaimage);
    });

    // Close quick info modal
    $(document).keydown(function (e) {
      if ($(".quickInfoModal").length && e.keyCode === 27) {
        $(".quickInfoModal").fadeOut(function () {
          $(this).remove();
        });
      }
    });

    // Load Card template
    function loadCards(containerCards, data) {
      data.map((card) => {
        let cardClass = "card_";
        if (!card.priceOffer) cardClass += " offer";
        if (!card.isExist) cardClass += " out";
        containerCards.append(`
          <div class="${cardClass}">
            <div class="innerProd">
              <div class="imgWrapper">
                <div class="quickDetails" data-id="${card.id}">
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                      <path d="M39.049 39.049L56 56"></path>
                      <circle cx="27" cy="27" r="17"></circle>
                    </svg>
                  </div>
                  <p>View Info</p>
                </div>
                <div class="imgProd" style="background-image: url(${
                  card.image
                });"></div>
              </div>
              <a class="info" href="#">
                <p class="prodName">${card.title}</p>
                <p class="prodDesc">${card.subheading}</p>
                <div class="prices">
                  <p class="price">${card.priceOffer || card.price}</p>
                  <div>
                    ${
                      card.priceOffer
                        ? `<p class="priceOriginal">${card.price}</p>`
                        : ""
                    }
                    <p class="stock ${!card.isExist ? "out" : ""}">${
          card.isExist ? "In stock" : "Out of stock"
        }</p>
                  </div>
                </div>
              </a>
              <div class="actions">
                <div class="button">View Info</div>
                <div class="row-buttons">
                  <div class="checkBox">
                    <input type="checkbox">
                    <div class="icon"></div>
                    <p class="checkBoxLabel">Compare</p>
                  </div>
                  <div class="aFavs favorites">
                    <div class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                        <path d="M47 5c-6.5 0-12.9 4.2-15 10-2.1-5.8-8.5-10-15-10A15 15 0 0 0 2 20c0 13 11 26 30 39 19-13 30-26 30-39A15 15 0 0 0 47 5z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`);
      });
    }

    // Load quick info modal template
    function showDetails(data) {
      const {
        productCode,
        description,
        isExist,
        image,
        title,
        price,
        priceOffer,
      } = data;
      if (!$(".quickInfoModal").length) {
        $("body").append(`
          <div class="quickInfoModal">
            <div class="closeModal"></div>
            <div class="modalContainer">
              <div class="topContent">
                <div class="imageContainer zoom_section">
                  <div class="zoom_launcher zoomWatch" title="Zoom image">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                      <path d="M2.002 40h22v22h-22z"></path>
                      <path d="M2 28V2h60v60H36"></path>
                      <path d="M30 34l22-22m-16 0h16v16"></path>
                    </svg>
                  </div>
                  <div class="zoom_imgOrigin wrapperImg">
                    <div class="zoom_imgSource image" style="background-image: url(${image});"></div>
                  </div>
                </div>
                <div class="text">
                  <div class="wrapper">
                    <p class="title">${title}</p>
                    <div class="prices">
                      <p class="price">${priceOffer || price}</p>
                      ${priceOffer ? `<p class="priceOffer">${price}</p>` : ""}
                    </div>
                    <p class="stock ${isExist ? "" : "out"} bold">${
          isExist ? "Available in store and ready to ship" : "Out of stock"
        }</p>
                    <p class="productCode"><span class="bold">Product Code: </span>${productCode}</p>
                    <div class="actions">
                      <div class="component_toCartQuantity ${
                        !isExist ? "disabled" : ""
                      }">
                        <div class="toCartButton less disabled"></div>
                        <div class="toCartQuantity">1</div>
                        <div class="toCartButton more"></div>
                      </div>
                      <div id="calculate" class="buttonTextIcon ${
                        !isExist ? "disabled" : ""
                      }">
                        <label class="labelButton">Add to cart</label>
                        <div class="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                            <path d="M2 6h10l10 40h32l8-24H16"></path>
                            <circle cx="23" cy="54" r="4"></circle>
                            <circle cx="49" cy="54" r="4"></circle>
                          </svg>
                        </div>
                      </div>
                      <div class="aFavs buttonIcon">
                        <div class="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                            <path d="M47 5c-6.5 0-12.9 4.2-15 10-2.1-5.8-8.5-10-15-10A15 15 0 0 0 2 20c0 13 11 26 30 39 19-13 30-26 30-39A15 15 0 0 0 47 5z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p class="description">${description}</p>
                    <a class="button" href="#">View full information</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `);
      }
      $(".quickInfoModal").fadeIn().css("display", "flex");
      $(".quickInfoModal .closeModal").click(function () {
        $(this)
          .parent()
          .fadeOut(function () {
            $(this).remove();
          });
      });
    }

    // Change product quantity (+/-) if not out of stock
    /*const quantityCart=*/ function toCartQuantity(button, operation) {
      const container = button.parents(".component_toCartQuantity");
      const quantity = container.find(".toCartQuantity");
      let animationType = "normal";
      if (operation == "remove") {
        if (parseInt(quantity.text()) == 1) return false;
        if (parseInt(quantity.text() - 1) == 1) {
          button.addClass("disabled");
        }
        animationType = "reverse";
        quantity.text(parseInt(quantity.text()) - 1);
      } else if (operation == "add") {
        button.siblings(".toCartButton.disabled").removeClass("disabled");
        quantity.text(parseInt(quantity.text()) + 1);
      } else {
        console.log("Type of operation (total / remainder) is obligatory");
        return false;
      }
      quantity.addClass(
        animationType == "reverse" ? "animation-reverse" : "animation"
      );
      quantity.one("animationend", function () {
        quantity.removeClass(
          animationType == "reverse" ? "animation-reverse" : "animation"
        );
      });
    }

    // Zoom image
    function zoomImg(zoomArea, scale = 3) {
      if ($(window).width() > 768) {
        zoomArea.find(".zoom_launcher").fadeOut("fast");
        const image = zoomArea.find(".zoom_imgOrigin");
        const urlimage =
          zoomArea.find(".zoom_imgSource")[0].style.backgroundImage;
        const dimentions = {
          image: { width: image.outerWidth(), height: image.outerHeight() },
          magnifier: {
            width: image.outerWidth() / scale,
            height: image.outerHeight() / scale,
          },
        };
        const initialContent = {
          backgroundImage: urlimage,
          backgroundSize: parseInt(image.css("padding"))
            ? `calc(100% - (${(parseInt(image.css("padding")) / 2) * scale}px))`
            : "contain",
          transform: `scale(${scale}) translateX(${
            dimentions.image.width / scale
          }px) translateY(${dimentions.image.height / scale}px)`,
        };
        image.append(`<div class="zoom_icon"></div>`);
        zoomArea.append(
          `<div class="zoom_imgAlt zoomImg"><div class="zoom"></div></div>`
        );
        const scaleArea = zoomArea.children(".zoom_imgAlt");
        const zoom = scaleArea.children(".zoom");
        const magnifier = image.children(".zoom_icon");
        scaleArea.fadeIn();
        zoom.css(initialContent);
        magnifier.css(dimentions.magnifier);
        image.mousemove(function (e) {
          let moveToMagnifier = { x: e.pageX, y: e.pageY };
          let imageCenter = {
            x: image.offset().left + dimentions.image.width / 2,
            y: image.offset().top + dimentions.image.height / 2,
          };
          let magnifierPosition = {
            x: imageCenter.x - moveToMagnifier.x,
            y: imageCenter.y - moveToMagnifier.y,
          };
          let magnifierTransform = {
            x:
              moveToMagnifier.x -
              dimentions.magnifier.width / 2 -
              image.offset().left,
            y:
              moveToMagnifier.y -
              dimentions.magnifier.height / 2 -
              image.offset().top,
          };
          var transformZoom = `scale(${scale}) translateX(${magnifierPosition.x}px) translateY(${magnifierPosition.y}px)`;
          zoom.css("transform", transformZoom);
          magnifier.css(
            "transform",
            `translateX(${magnifierTransform.x}px) translateY(${magnifierTransform.y}px)`
          );
        });
        image.mouseout(function () {
          magnifier.remove();
          zoomArea.find(".zoom_launcher").fadeIn("fast");
          scaleArea.fadeOut("fast", function () {
            scaleArea.remove();
          });
        });
      } else {
        console.warn("Zoom feature only available on PCs.");
      }
    }

    $(document).on("click", "#calculate", function () {
      sessionStorage.setItem(
        "productQuantity",
        $(this).parents(".wrapper").find(".toCartQuantity").text()
      );
      sessionStorage.setItem(
        "productPrice",
        $(this).parents(".wrapper").find(".price").text()
      );
      window.location.href = "cart.html";
    });
  });
}

if (top.location.pathname.includes("/cart.html")) {
  function isValidVisaCardNumber(VisaCardNumber) {
    VisaCardNumber = VisaCardNumber.replace(/\s/g, "");

    let regex = /^4[0-9]{12}(?:[0-9]{3})?$/;

    return regex.test(VisaCardNumber);
  }

  $(function () {
    const productQuantity = parseInt(sessionStorage.getItem("productQuantity"));
    const productPrice = parseInt(sessionStorage.getItem("productPrice"));
    $("#totalPrice").val("$" + productQuantity * productPrice);

    $("#calculate").on("click", function () {
      let visaInput = $("#visaNumber");
      let visaNumber = visaInput.val();

      if (isValidVisaCardNumber(visaNumber)) {
        visaInput.removeClass("is-invalid");
        alert("Thanks for buying from us!");
        window.location.href = "index.html";
      } else {
        visaInput.addClass("is-invalid");
      }
    });
  });
}
