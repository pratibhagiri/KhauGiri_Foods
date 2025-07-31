const categories = [
      { id: "sandwich", name: "Sandwich", price: 50 },
      { id: "momo", name: "Momos", price: 40 },
      { id: "wrap", name: "Wraps", price: 60 },
      { id: "roll", name: "Rolls", price: 55 },
      { id: "chaat", name: "Chaats", price: 45 },
      { id: "paratha", name: "Parathas", price: 70 },
      { id: "shake", name: "Shakes", price: 80 },
      { id: "beverage", name: "Beverages", price: 30 }
    ];

    const cart = {};

    function renderMenu() {
      const container = document.getElementById("menuContainer");
      container.innerHTML = "";
      categories.forEach(cat => {
        const row = document.createElement("div");
        row.className = "mb-4";

        row.innerHTML = `
          <h4>${cat.name}</h4>
          <div class="d-flex overflow-auto" id="${cat.id}-carousel">
            ${Array.from({ length: 10 }).map((_, i) => `
              <div class="food-card">
                <p>${cat.name} ${i + 1}<br>₹${cat.price}</p>
                <div class="quantity">
                  <button onclick="decrease('${cat.id + i}')">-</button>
                  <span id="${cat.id + i}">0</span>
                  <button onclick="increase('${cat.id + i}')">+</button>
                </div>
              </div>
            `).join("")}
          </div>
        `;
        container.appendChild(row);
      });
    }

    function increase(id) {
      cart[id] = (cart[id] || 0) + 1;
      document.getElementById(id).textContent = cart[id];
      updateTotal();
    }

    function decrease(id) {
      if (cart[id]) {
        cart[id]--;
        document.getElementById(id).textContent = cart[id];
        updateTotal();
      }
    }

    function updateTotal() {
      let total = 0;
      let cartList = "";

      Object.keys(cart).forEach(id => {
        if (cart[id] > 0) {
          const cat = categories.find(c => id.startsWith(c.id));
          if (cat) {
            const name = `${cat.name} ${parseInt(id.replace(cat.id, '')) + 1}`;
            const amount = cat.price * cart[id];
            cartList += `<p>${name} x ${cart[id]} = ₹${amount}</p>`;
            total += amount;
          }
        }
      });

      document.getElementById('cartItems').innerHTML = cartList || "<p>Your cart is empty.</p>";
      document.getElementById('totalAmount').textContent = `Total: ₹${total}`;
    }

    document.getElementById("viewCartBtn").addEventListener("click", () => {
      const modal = new bootstrap.Modal(document.getElementById("cartModal"));
      modal.show();
    });

    document.getElementById("whatsappBtn").addEventListener("click", function (e) {
      e.preventDefault();
      const whatsappNumber = "919403201043";
      let message = "🛒 *New Order from Khaugiri Foods*:\n\n";
      let total = 0;
      let hasItems = false;

      Object.keys(cart).forEach(id => {
        if (cart[id] > 0) {
          const cat = categories.find(c => id.startsWith(c.id));
          if (cat) {
            const index = parseInt(id.replace(cat.id, '')) + 1;
            const name = `${cat.name} ${index}`;
            const amount = cat.price * cart[id];
            message += `• ${name} x ${cart[id]} = ₹${amount}\n`;
            total += amount;
            hasItems = true;
          }
        }
      });

      if (!hasItems) {
        alert("Your cart is empty!");
        return;
      }

      message += `\n💰 *Total: ₹${total}*\n\n📦 Please confirm your order.`;
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    });

    window.onload = renderMenu;
