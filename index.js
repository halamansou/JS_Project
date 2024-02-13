// // /////////////////////////////////start slider//////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;
  showSlides();

  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    setTimeout(showSlides, 800);
  }
});
// // /////////////////////////////////end slider//////////////////////////////////

/////////////////////////// button to go up ///////////////////////////////////////////////

let mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

////////////////////////////home////////////////////////

let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;
let totalProducts = parseInt(localStorage.getItem("totalProducts")) || 0;
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const renderCart = () => {
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((cartItem, index) => {
    const cartItemElement = document.createElement("li");
    cartItemElement.classList.add("cartItem");

    const priceText = cartItem.price ? `$${cartItem.price.toFixed(2)}` : ''; 
    cartItemElement.textContent = `${cartItem.name} - ${priceText}`;

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash", "deleteIcon");
    deleteIcon.setAttribute("data-index", index); 
    deleteIcon.addEventListener("click", handleDelete); 

    cartItemElement.appendChild(deleteIcon);

    cartItemsContainer.appendChild(cartItemElement);
    deleteIcon.style.color = "red";
    deleteIcon.style.marginLeft = "100px";
  });

  document.getElementById(
    "totalPrice"
  ).textContent = `Total: $${totalPrice.toFixed(2)}`;
  document.getElementById("totalProducts").textContent = totalProducts;
};

const handleDelete = (event) => {
  const index = event.target.getAttribute("data-index"); 
  const deletedItem = cartItems.splice(index, 1)[0]; 
  totalPrice -= deletedItem.price; 
  totalProducts--; 
  localStorage.setItem("cartItems", JSON.stringify(cartItems)); 
  localStorage.setItem("totalPrice", totalPrice); 
  localStorage.setItem("totalProducts", totalProducts);
  renderCart();
};

const createProductCard = (product) => {
  return `
    <div class="col-md-3">
      <div class="card">
        <img src="${product.image}" class="card-img" alt="${product.name} Image">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price: $${product.price}</p>
          <button class="addToCartButton" onclick="addToCart('${product.name}', ${product.price})">🛒</button>
        </div>
      </div>
    </div>
  `;
};

const renderProducts = async () => {
  try {
    const response = await fetch("http://localhost:8000/products");
    const products = await response.json();

    const productsContainer = document.getElementById("productsContainer");
    const productCards = products.map((product) => createProductCard(product));
    productsContainer.innerHTML = productCards.join("");

    renderCart();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

window.addToCart = function (productName, productPrice) {
  const cartItem = { name: productName, price: productPrice }; 
  cartItems.push(cartItem); 
  totalPrice += productPrice; 
  totalProducts++;
  localStorage.setItem("cartItems", JSON.stringify(cartItems)); 
  localStorage.setItem("totalPrice", totalPrice);
  localStorage.setItem("totalProducts", totalProducts); 
  renderCart(); 
};

document.addEventListener("DOMContentLoaded", renderProducts);

document.addEventListener("DOMContentLoaded", () => {
  const cartButton = document.getElementById("cartButton");
  cartButton.addEventListener("click", () => {
    window.location.href = "./bill.html";
  });
});
///////////////
window.addToCart = function (productName, productPrice) {
  const cartItem = { name: productName, price: productPrice }; 
  cartItems.push(cartItem); 
  totalPrice += productPrice; 
  totalProducts++;
  localStorage.setItem("cartItems", JSON.stringify(cartItems)); 
  localStorage.setItem("totalProducts", totalProducts); 
  renderCart();
  updateUI();
};

const hasItemsInSelection = () => {
  return totalProducts > 0;
};


const updateUI = () => {
  const updateConfirmOrderButton = () => {
    const confirmOrderContainer = document.getElementById("confirmOrderContainer");
    if (hasItemsInSelection()) {
      confirmOrderContainer.style.display = "block";
    } else {
      confirmOrderContainer.style.display = "none";
    }
  };
  updateConfirmOrderButton(); 
};

const handleDeleteCartItem = (event) => {
  const index = event.target.getAttribute("data-index"); 
  const deletedItem = cartItems.splice(index, 1)[0]; 
  totalPrice -= deletedItem.price; 
  totalProducts--; 
  localStorage.setItem("cartItems", JSON.stringify(cartItems)); 
  localStorage.setItem("totalPrice", totalPrice); 
  localStorage.setItem("totalProducts", totalProducts); 
  renderCart(); 
  updateUI(); 


const resetSelection = () => {
  cartItems = [];
  totalPrice = 0;
  totalProducts = 0;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalPrice", totalPrice);
  localStorage.setItem("totalProducts", totalProducts);
  renderCart(); 
  updateConfirmOrderButton(); 
};


const confirmOrder = () => {
  resetSelection(); 
  alert("Order confirmed!"); 


updateUI();
