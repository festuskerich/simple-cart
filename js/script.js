let ShoppingCart = (function ($) {
  "use strict";

  // Cahce necesarry DOM Elements
  let productsEl = document.querySelector(".products"),
    cartEl = document.querySelector(".shopping-cart-list"),
    productQuantityEl = document.querySelector(".product-quantity"),
    emptyCartEl = document.querySelector(".empty-cart-btn"),
    cartCheckoutEl = document.querySelector(".cart-checkout"),
    cartNext = document.querySelector(".cart-next"),
    totalPriceEl = document.querySelector(".total-price");

  // Fake JSON data array here should be API call
  let products = [
    {
      id: 0,
      name: "iPhone 13",
      discount: 0.9,
      description: "iPhone 13 features a cinema standard wide color gamut, displaying colors just as filmmakers intended.",
      imageUrl: "./img/iphone-13.jpg",
      price: 1199
    },
    {
      id: 1,
      name: "iPhone 13 Pro Max",
      discount: 0.9,
      description: "Apple iPhone 13 Pro Max ; CPU, Hexa-core (2x3.22 GHz Avalanche + 4xX.X GHz Blizzard) ; GPU, Apple GPU (5-core graphics) ; Memory, Card slot ; Internal, 128GB 6GB",
      imageUrl: "./img/iphone-pro-max.jpg",
      price: 1999,
    },
    {
      id: 2,
      name: "Macbook Air",
      discount: 0.9,
      description: "The M1 chip and macOS Monterey work together to make the entire system snappier. MacBook Air wakes instantly from sleep",
      imageUrl: "./img/macbook-air.jpg",
      price: 1499
    },
    {
      id: 3,
      name: "Macbook",
      discount: 0.9,
      description: "The MacBook Air was among the first of Apple's Macs to make the transition to Apple silicon.",
      imageUrl: "./img/macbook.jpg",
      price: 999
    },
    {
      id: 4,
      name: "iPad 11inch",
      discount: 0.9,
      description: "The iPad is Apple's most affordable and most popular tablet, and the ninth-generation model features the A13 Bionic chip.",
      imageUrl: "./img/ipad.jpg",
      price: 599
    },
    {
      id: 5,
      name: "iPad Mini",
      discount: 0.9,
      description: "iPad is Apple's most affordable and most popular tablet, and the ninth-generation model features the A13 Bionic chip.",
      imageUrl: "./img/ipad-mini.jpg",
      price: 499
    }
  ],
    productsInCart = [];

  // Pretty much self explanatory function. NOTE: Here I have used template strings (ES6 Feature)
  let generateProductList = function () {
    products.forEach(function (item) {
      let productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = `<div class="product-image">
                                <img src="${item.imageUrl}" alt="${item.name}">
                             </div>
                             <div class="product-name"><span>Product:</span> ${item.name}</div>
                             <div class="product-description"><span>Description:</span> ${item.description}</div>
                             <div class="product-price"><span>Discount:</span> ${item.discount * 100}% for three or more items</div>
                             <div class="product-price"><span>Price:</span> ${item.price} $</div>
                             <div class="product-add-to-cart">
                               <a href="#0" class="button add-to-cart" data-id=${item.id}>Add to Cart</a>
                             </div>
                          </div>
`;

      productsEl.appendChild(productEl);
    });
  }

  // Like one before and I have also used ES6 template strings
  let generateCartList = function () {

    cartEl.innerHTML = "";

    productsInCart.forEach(function (item) {
      let li = document.createElement("li");
      if (item.quantity > 2) {
        li.innerHTML = `${item.quantity} ${item.product.name} - $${item.product.price * item.quantity * item.product.discount}`;
        cartEl.appendChild(li);
      } else {
        li.innerHTML = `${item.quantity} ${item.product.name} - $${item.product.price * item.quantity}`;
        cartEl.appendChild(li);
      }
    });

    productQuantityEl.innerHTML = productsInCart.length;

    generateCartButtons()
  }


  // Function that generates Empty Cart and Checkout buttons based on condition that checks if productsInCart array is empty
  let generateCartButtons = function () {
    if (productsInCart.length > 0) {
      emptyCartEl.style.display = "block";
      cartCheckoutEl.style.display = "block"
      totalPriceEl.innerHTML = "$ " + calculateTotalPrice();
    } else {
      emptyCartEl.style.display = "none";
      cartCheckoutEl.style.display = "none";
    }
  }

  // Setting up listeners for click event on all products and Empty Cart button as well
  let setupListeners = function () {
    productsEl.addEventListener("click", function (event) {
      let el = event.target;
      if (el.classList.contains("add-to-cart")) {
        let elId = el.dataset.id;
        addToCart(elId);
      }
    });

    emptyCartEl.addEventListener("click", function (event) {
      if (confirm("Are you sure?")) {
        productsInCart = [];
      }
      generateCartList();
    });
    cartCheckoutEl.addEventListener("click", function (event) {
      openForm()
      generateCartList();
    });
    cartNext.addEventListener("click", function (event) {
      let email = document.getElementById('email').value;
      let phone = document.getElementById('phone').value;
      fetch("../MailProcessor.php ", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({
          email:email,
          phone:phone,
          cart:productsInCart
        })
      }).then(res => {
        console.log("Request complete! response:", res);
        window.location.href = '../payment.html';
      }).catch(err => {
        console.error(err);
        window.location.href = '../payment.html';
    });
    })
  }

  // Adds new items or updates existing one in productsInCart array
  let addToCart = function (id) {
    let obj = products[id];
    if (productsInCart.length === 0 || productFound(obj.id) === undefined) {
      productsInCart.push({ product: obj, quantity: 1 });
    } else {
      productsInCart.forEach(function (item) {
        if (item.product.id === obj.id) {
          item.quantity++;
        }
      });
    }
    generateCartList();
  }


  // This function checks if project is already in productsInCart array
  let productFound = function (productId) {
    return productsInCart.find(function (item) {
      return item.product.id === productId;
    });
  }

  let calculateTotalPrice = function () {
    return productsInCart.reduce(function (total, item) {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  // This functon starts the whole application
  let init = function () {
    generateProductList();
    setupListeners();
  }

  // Exposes just init function to public, everything else is private
  return {
    init: init
  };

  // I have included jQuery although I haven't used it
})(jQuery);

ShoppingCart.init();