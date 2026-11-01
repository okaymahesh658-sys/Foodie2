const foods = [
  {name:"Chicken Dum Biryani",price:250,type:"Non-Veg",category:"Biryani",image:"https://images.unsplash.com/photo-1563379091339-03246963d96c",desc:"Authentic aromatic chicken biryani"},
  {name:"Mutton Biryani",price:320,type:"Non-Veg",category:"Biryani",image:"https://images.unsplash.com/photo-1633945274405-b6c8069047b0",desc:"Rich and delicious mutton biryani"},
  {name:"Veg Biryani",price:180,type:"Veg",category:"Biryani",image:"https://images.unsplash.com/photo-1589302168068-964664d93dc0",desc:"Fresh vegetables and fragrant rice"},
  {name:"Paneer Biryani",price:210,type:"Veg",category:"Biryani",image:"https://images.unsplash.com/photo-1596797038530-2c107229654b",desc:"Special paneer and basmati rice"},
  {name:"Chicken 65",price:220,type:"Non-Veg",category:"Starters",image:"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",desc:"Crispy spicy chicken starter"},
  {name:"Chicken Lollipop",price:240,type:"Non-Veg",category:"Starters",image:"https://images.unsplash.com/photo-1562967914-608f82629710",desc:"Crispy and spicy chicken lollipop"},
  {name:"Paneer Tikka",price:190,type:"Veg",category:"Starters",image:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8",desc:"Smoky grilled paneer cubes"},
  {name:"Veg Manchurian",price:160,type:"Veg",category:"Starters",image:"https://images.unsplash.com/photo-1601050690597-df0568f70950",desc:"Delicious Indo-Chinese special"},
  {name:"Butter Chicken",price:280,type:"Non-Veg",category:"Main Course",image:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",desc:"Creamy traditional butter chicken"},
  {name:"Paneer Butter Masala",price:200,type:"Veg",category:"Main Course",image:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7",desc:"Rich paneer in creamy tomato gravy"},
  {name:"Chicken Fried Rice",price:180,type:"Non-Veg",category:"Rice & Noodles",image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b",desc:"Wok tossed chicken fried rice"},
  {name:"Veg Fried Rice",price:150,type:"Veg",category:"Rice & Noodles",image:"https://images.unsplash.com/photo-1512058564366-18510be2db19",desc:"Fresh vegetables and fried rice"},
  {name:"Cheese Pizza",price:220,type:"Veg",category:"Fast Food",image:"https://images.unsplash.com/photo-1513104890138-7c749659a591",desc:"Loaded cheese and fresh toppings"},
  {name:"Chicken Burger",price:170,type:"Non-Veg",category:"Fast Food",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd",desc:"Juicy chicken burger"},
  {name:"Fresh Fruit Juice",price:90,type:"Veg",category:"Drinks",image:"https://images.unsplash.com/photo-1544145945-f90425340c7e",desc:"Refreshing fresh fruit juice"},
  {name:"Chocolate Ice Cream",price:100,type:"Veg",category:"Desserts",image:"https://images.unsplash.com/photo-1563805042-7684c019e1cb",desc:"Delicious creamy dessert"}
];

let currentFilter = "All";
let cart = [];

function renderMenu() {
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = foods.filter(food =>
    (currentFilter === "All" || food.type === currentFilter) &&
    (food.name.toLowerCase().includes(search) ||
     food.category.toLowerCase().includes(search))
  );

  document.getElementById("food-list").innerHTML =
    filtered.length ? filtered.map((food) => `
      <article class="food-card">
        <img src="${food.image}" alt="${food.name}" loading="lazy">
        <div class="food-info">
          <h3>${food.type === "Veg" ? "🟢" : "🔴"} ${food.name}</h3>
          <p>${food.desc}</p>
          <div class="food-bottom">
            <span class="price">₹${food.price}</span>
            <button class="add-btn"
              onclick="addToCart('${food.name}',${food.price})">
              + Add
            </button>
          </div>
        </div>
      </article>
    `).join("") :
    "<p>No food items found. Try another search.</p>";
}

function setFilter(type, button) {
  currentFilter = type;
  document.querySelectorAll(".filter").forEach(btn =>
    btn.classList.remove("active")
  );
  button.classList.add("active");
  renderMenu();
}

function addToCart(name, price) {
  const item = cart.find(food => food.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({name, price, quantity:1});
  }

  updateCart();
}

function updateCart() {
  const count = cart.reduce((sum,item)=>sum+item.quantity,0);
  const total = cart.reduce((sum,item)=>sum+item.price*item.quantity,0);

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = total;

  document.getElementById("cart-items").innerHTML =
    cart.length ? cart.map((item,index)=>`
      <div class="cart-row">
        <div>
          <b>${item.name}</b>
          <p>₹${item.price} × ${item.quantity}</p>
        </div>
        <div>
          <button onclick="changeQuantity(${index},-1)">−</button>
          ${item.quantity}
          <button onclick="changeQuantity(${index},1)">+</button>
        </div>
      </div>
    `).join("") : "<p>Your cart is empty.</p>";
}

function changeQuantity(index,change) {
  cart[index].quantity += change;
  if(cart[index].quantity <= 0) cart.splice(index,1);
  updateCart();
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("open");
}

function openLogin() {
  document.getElementById("login-modal").classList.add("show");
}

function closeLogin() {
  document.getElementById("login-modal").classList.remove("show");
}

let signupMode = false;

function switchAuth(event) {
  event.preventDefault();
  signupMode = !signupMode;

  document.getElementById("auth-title").textContent =
    signupMode ? "Create Account" : "Welcome Back!";

  document.getElementById("auth-subtitle").textContent =
    signupMode ? "Join Foodie Restaurant today." : "Login to enjoy your favourite food.";

  document.getElementById("signup-name").classList.toggle("hidden",!signupMode);

  document.querySelector(".submit-btn").textContent =
    signupMode ? "Create Account" : "Login";

  document.getElementById("switch-label").textContent =
    signupMode ? "Already have an account?" : "Don't have an account?";

  document.querySelector(".switch-text a").textContent =
    signupMode ? "Login" : "Sign Up";

  document.getElementById("auth-message").textContent = "";
}

function authenticate() {
  const email = document.getElementById("customer-email").value.trim();
  const password = document.getElementById("customer-password").value;
  const message = document.getElementById("auth-message");

  if(!email || !password || !email.includes("@")) {
    message.textContent = "Please enter a valid email and password.";
    message.style.color = "red";
    return;
  }

  if(signupMode) {
    const name = document.getElementById("customer-name").value.trim();

    if(!name) {
      message.textContent = "Please enter your name.";
      message.style.color = "red";
      return;
    }

    // Demo only: save profile, never save the password.
    localStorage.setItem("foodieProfile",JSON.stringify({name,email}));

    message.textContent = "Demo account created successfully!";
  } else {
    const profile = JSON.parse(localStorage.getItem("foodieProfile") || "null");

    if(!profile || profile.email !== email) {
      message.textContent = "Demo login: create an account first using Sign Up.";
      message.style.color = "red";
      return;
    }

    message.textContent = "Welcome back, " + profile.name + "!";
  }

  message.style.color = "green";
}

function checkout() {
  if(cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const order = cart.map(item =>
    `${item.name} x ${item.quantity} = ₹${item.price*item.quantity}`
  ).join("\n");

  const total = cart.reduce((sum,item)=>sum+item.price*item.quantity,0);

  alert("Your order summary:\n\n"+order+"\n\nTotal: ₹"+total+
    "\n\nThis is a demo checkout. Contact the restaurant to confirm your order.");
}

renderMenu();
updateCart();
