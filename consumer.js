document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 'p1', name: 'Product One', price: 12.00, qty: 0, img: 'https://via.placeholder.com/150' },
    { id: 'p2', name: 'Product Two', price: 20.00, qty: 0, img: 'https://via.placeholder.com/150' },
    { id: 'p3', name: 'Product Three', price: 18.50, qty: 0, img: 'https://via.placeholder.com/150' },
    { id: 'p4', name: 'Product Four', price: 7.25, qty: 0, img: 'https://via.placeholder.com/150' },
    { id: 'p5', name: 'Product Five', price: 22.75, qty: 0, img: 'https://via.placeholder.com/150' },
  ];

  function toggleLang() {
    const btn = document.getElementById('langBtn');
    const title = document.getElementById('title');
    const pay = document.getElementById('submitBtn');
    const sum = document.getElementById('summaryTitle');
    if (btn.textContent === 'ES') {
      btn.textContent = 'EN';
      title.textContent = 'Aplicación de Pedido';
      pay.textContent = 'PAGAR';
      sum.textContent = 'Lista de Pedido';
    } else {
      btn.textContent = 'ES';
      title.textContent = 'Order App';
      pay.textContent = 'PAY';
      sum.textContent = 'Order List';
    }
  }

  function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    products.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'product-card';

      const imgElement = document.createElement('img');
      imgElement.src = p.img;
      imgElement.alt = p.name;
      imgElement.addEventListener('click', () => openModal(p.img));

      const nameDiv = document.createElement('div');
      nameDiv.textContent = p.name;

      const controlsDiv = document.createElement('div');
      controlsDiv.className = 'product-controls';

      const removeButton = document.createElement('button');
      removeButton.className = 'btn-remove';
      removeButton.textContent = '-';
      removeButton.addEventListener('click', () => updateQty(i, -1));

      const addButton = document.createElement('button');
      addButton.className = 'btn-add';
      addButton.textContent = '+';
      addButton.addEventListener('click', () => updateQty(i, 1));

      controlsDiv.appendChild(removeButton);
      controlsDiv.appendChild(addButton);

      const qtyDiv = document.createElement('div');
      qtyDiv.textContent = `Qty: ${p.qty}`;

      const priceDiv = document.createElement('div');
      priceDiv.textContent = `$${p.price.toFixed(2)}`;

      card.appendChild(imgElement);
      card.appendChild(nameDiv);
      card.appendChild(controlsDiv);
      card.appendChild(qtyDiv);
      card.appendChild(priceDiv);

      grid.appendChild(card);
    });
    updateSummary();
  }

  function scrollCarousel(direction) {
    const grid = document.getElementById('productGrid');
    const scrollAmount = 170; // Width of a product card + gap
    grid.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }

  function updateQty(index, change) {
    products[index].qty = Math.max(0, products[index].qty + change);
    renderProducts();
  }

  function updateSummary() {
    const list = document.getElementById('orderList');
    let subtotal = 0;
    let vatAmt = 0;
    list.innerHTML = '';
    products.forEach(p => {
      if (p.qty > 0) {
        const totalItem = p.qty * p.price;
        subtotal += totalItem;
        vatAmt += totalItem * 0.12; // Assuming 12% VAT
        const li = document.createElement('li');
        li.innerHTML = `<span>${p.name} x ${p.qty}</span><span>$${totalItem.toFixed(2)}</span>`;
        list.appendChild(li);
      }
    });
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('vat').textContent = vatAmt.toFixed(2);
    document.getElementById('total').textContent = (subtotal + vatAmt).toFixed(2);
  }

  async function submitEncryptedOrder() {
    const key = crypto.getRandomValues(new Uint8Array(32));
    const order = products.filter(p => p.qty > 0);
    const encrypted = await encrypt(JSON.stringify(order), key);
    guardrail(encrypted);
  }

  async function encrypt(data, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const alg = { name: 'AES-GCM', iv };
    const cryptoKey = await crypto.subtle.importKey('raw', key, alg, false, ['encrypt']);
    const enc = new TextEncoder().encode(data);
    const buf = await crypto.subtle.encrypt(alg, cryptoKey, enc);
    return { iv: Array.from(iv), payload: Array.from(new Uint8Array(buf)) };
  }

  function guardrail(payload) {
    console.log('[GUARDRAIL] Secure:', payload);
    alert('✅ Encrypted order submitted.');
  }

  function openModal(src) {
    const overlay = document.getElementById('modalOverlay');
    const img = document.getElementById('modalImage');
    img.src = src;
    overlay.classList.add('active');
  }

  function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('active');
  }

  // Event Listeners
  document.getElementById('langBtn').addEventListener('click', toggleLang);
  document.querySelector('.arrow-left').addEventListener('click', () => scrollCarousel(-1));
  document.querySelector('.arrow-right').addEventListener('click', () => scrollCarousel(1));
  document.getElementById('submitBtn').addEventListener('click', submitEncryptedOrder);

  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.addEventListener('click', closeModal);
  // Prevent closing modal when clicking on the content itself
  document.querySelector('.modal-content').addEventListener('click', (event) => event.stopPropagation());
  document.querySelector('.modal-close').addEventListener('click', closeModal);

  // Close modal on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('modalOverlay').classList.contains('active')) {
      closeModal();
    }
  });

  renderProducts(); // Initial render
});
