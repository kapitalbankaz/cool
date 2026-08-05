// ===== COOL FOOD — App Logic =====
'use strict';

// ===== STATE =====
const state = {
  currentPage: 'home',
  prevPage: 'home',
  scrollPositions: {},
  cart: [],
  cartOpen: false,
  mobileMenuOpen: false
};

// ===== PAGE NAVIGATION =====
function showPage(page) {
  // Save current scroll position
  state.scrollPositions[state.currentPage] = window.scrollY;

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById(page + '-page');
  if (!target) return;

  state.prevPage = state.currentPage;
  state.currentPage = page;

  target.classList.add('active');
  closeMobileMenu();

  // Restore scroll position or go to top
  const savedPos = state.scrollPositions[page];
  if (savedPos !== undefined) {
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedPos, behavior: 'instant' });
    });
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function goBack() {
  // Save scroll of current sub-page
  state.scrollPositions[state.currentPage] = window.scrollY;
  showPage(state.prevPage || 'home');
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  state.mobileMenuOpen = !state.mobileMenuOpen;
  const nav = document.getElementById('mobile-nav');
  nav.classList.toggle('open', state.mobileMenuOpen);
}

function closeMobileMenu() {
  state.mobileMenuOpen = false;
  document.getElementById('mobile-nav').classList.remove('open');
}

// ===== MENU TAB SWITCHING =====
function switchMenuTab(category, btn) {
  // Deactivate all tabs and sections
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.menu-section').forEach(s => s.classList.remove('active'));

  // Activate clicked tab and its section
  btn.classList.add('active');
  const section = document.getElementById('section-' + category);
  if (section) {
    section.classList.add('active');
    // Scroll to top of menu content
    const wrapper = document.querySelector('.menu-sections-wrapper');
    if (wrapper) wrapper.scrollTop = 0;
    window.scrollTo({ top: document.querySelector('.menu-tabs').offsetTop - 64, behavior: 'smooth' });
  }
}

// ===== RENDER MENU =====
function renderMenuCard(item) {
  const hasImage = item.image;
  const imgHtml = hasImage
    ? `<img class="menu-card-img" src="${item.image}" alt="${item.name}" loading="lazy" />`
    : `<div class="menu-card-img-placeholder">${item.emoji}</div>`;

  return `
    <article class="menu-card" onclick="openProductModal('${item.id}')" role="button" tabindex="0"
      onkeydown="if(event.key==='Enter')openProductModal('${item.id}')"
      aria-label="${item.name} - ${item.price.toFixed(2)} ₼">
      ${imgHtml}
      <div class="menu-card-body">
        <h3 class="menu-card-name">${item.name}</h3>
        <p class="menu-card-desc">${item.desc}</p>
        <div class="menu-card-footer">
          <span class="menu-card-price">${item.price.toFixed(2)} ₼</span>
          <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${item.id}')"
            aria-label="${item.name} səbətə əlavə et">+</button>
        </div>
      </div>
    </article>
  `;
}

function renderListCard(item) {
  return `
    <article class="menu-list-card" onclick="openProductModal('${item.id}')" role="button" tabindex="0"
      onkeydown="if(event.key==='Enter')openProductModal('${item.id}')"
      aria-label="${item.name} - ${item.price.toFixed(2)} ₼">
      <div class="menu-list-card-info">
        <div class="name">${item.emoji} ${item.name}</div>
        <div class="price">${item.price.toFixed(2)} ₼</div>
      </div>
      <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${item.id}')"
        aria-label="${item.name} səbətə əlavə et">+</button>
    </article>
  `;
}

function buildMenuGrids() {
  // Grid categories (with images)
  const gridCategories = ['hotdog', 'qelyanalt', 'burger', 'sorba'];
  gridCategories.forEach(cat => {
    const el = document.getElementById('grid-' + cat);
    if (el && MENU_DATA[cat]) {
      el.innerHTML = MENU_DATA[cat].map(renderMenuCard).join('');
    }
  });

  // List categories (no images)
  const listCategories = ['soyuq', 'isti', 'extra'];
  listCategories.forEach(cat => {
    const el = document.getElementById('grid-' + cat);
    if (el && MENU_DATA[cat]) {
      el.innerHTML = MENU_DATA[cat].map(renderListCard).join('');
    }
  });
}

// ===== GET ITEM BY ID =====
function getItemById(id) {
  for (const cat of Object.values(MENU_DATA)) {
    const found = cat.find(item => item.id === id);
    if (found) return found;
  }
  return null;
}

// ===== PRODUCT MODAL =====
function openProductModal(itemId) {
  const item = getItemById(itemId);
  if (!item) return;

  const imgHtml = item.image
    ? `<img class="product-modal-img" src="${item.image}" alt="${item.name}" />`
    : `<div class="product-modal-img-placeholder">${item.emoji}</div>`;

  document.getElementById('product-modal-inner').innerHTML = `
    ${imgHtml}
    <div class="product-modal-body">
      <p style="font-size:0.82rem;font-weight:700;color:var(--orange);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">${item.category}</p>
      <h2 class="product-modal-name">${item.name}</h2>
      <p class="product-modal-desc">${item.desc}</p>
      <p class="product-modal-price">${item.price.toFixed(2)} ₼</p>
      <div class="product-modal-actions">
        <button class="modal-add-btn" onclick="addToCart('${item.id}'); closeProductModal(null,true)">
          + Səbətə Əlavə Et
        </button>
      </div>
    </div>
  `;

  document.getElementById('product-modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal(e, force) {
  if (force || (e && e.target === document.getElementById('product-modal-overlay'))) {
    document.getElementById('product-modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ===== CART =====
function addToCart(itemId) {
  const item = getItemById(itemId);
  if (!item) return;

  const existing = state.cart.find(c => c.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...item, qty: 1 });
  }

  updateCartUI();
  showToast('✅ ' + item.name + ' səbətə əlavə edildi!', 'success');
}

function removeFromCart(itemId) {
  state.cart = state.cart.filter(c => c.id !== itemId);
  updateCartUI();
}

function changeQty(itemId, delta) {
  const item = state.cart.find(c => c.id === itemId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(itemId);
  } else {
    updateCartUI();
  }
}

function updateCartUI() {
  const totalItems = state.cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = state.cart.reduce((s, c) => s + c.price * c.qty, 0);

  // Badge
  const badge = document.getElementById('cart-badge');
  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.classList.add('show');
  } else {
    badge.classList.remove('show');
  }

  // Cart items
  const cartItemsEl = document.getElementById('cart-items');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartFooterEl = document.getElementById('cart-footer');

  if (state.cart.length === 0) {
    cartEmptyEl.style.display = 'block';
    cartFooterEl.style.display = 'none';
    cartItemsEl.innerHTML = '';
    cartItemsEl.appendChild(cartEmptyEl);
    return;
  }

  cartEmptyEl.style.display = 'none';
  cartFooterEl.style.display = 'block';

  cartItemsEl.innerHTML = state.cart.map(item => {
    const iconHtml = item.image
      ? `<img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" />`
      : item.emoji;

    return `
      <div class="cart-item">
        <div class="cart-item-icon">${iconHtml}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${(item.price * item.qty).toFixed(2)} ₼</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty('${item.id}', -1)" aria-label="Azalt">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}', 1)" aria-label="Artır">+</button>
          <button class="cart-remove" onclick="removeFromCart('${item.id}')" aria-label="Sil">🗑</button>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('cart-total-amount').textContent = totalPrice.toFixed(2) + ' ₼';
}

function toggleCart() {
  state.cartOpen = !state.cartOpen;
  document.getElementById('cart-panel').classList.toggle('open', state.cartOpen);
  document.getElementById('cart-overlay').classList.toggle('open', state.cartOpen);
  document.body.style.overflow = state.cartOpen ? 'hidden' : '';
}

function placeOrder() {
  if (state.cart.length === 0) return;

  let msg = '🍔 *COOL FOOD — YENİ SİFARİŞ*\n\n';
  msg += '━━━━━━━━━━━━━━━━━━\n';
  msg += '📦 *Sifariş edilən məhsullar:*\n\n';

  state.cart.forEach((item, i) => {
    msg += `${i + 1}. ${item.name}\n`;
    msg += `   Miqdar: ${item.qty} ədəd\n`;
    msg += `   Qiymət: ${(item.price * item.qty).toFixed(2)} ₼\n\n`;
  });

  const total = state.cart.reduce((s, c) => s + c.price * c.qty, 0);
  msg += '━━━━━━━━━━━━━━━━━━\n';
  msg += `💰 *CƏMİ: ${total.toFixed(2)} ₼*\n`;
  msg += '━━━━━━━━━━━━━━━━━━\n\n';
  msg += '⏰ Sifariş vaxtı: ' + new Date().toLocaleString('az-AZ');

  const encodedMsg = encodeURIComponent(msg);
  const phone = '994559406018';
  window.open('https://wa.me/' + phone + '?text=' + encodedMsg, '_blank');
}

// ===== RESERVATION =====
function submitReservation(e) {
  e.preventDefault();

  const name = document.getElementById('res-name').value.trim();
  const phone = document.getElementById('res-phone').value.trim();
  const date = document.getElementById('res-date').value;
  const time = document.getElementById('res-time').value;
  const persons = document.getElementById('res-persons').value;
  const note = document.getElementById('res-note').value.trim();

  if (!name || !phone || !date || !time || !persons) {
    showToast('⚠️ Zəhmət olmasa bütün məcburi sahələri doldurun!');
    return;
  }

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('az-AZ', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  let msg = '📅 *COOL FOOD — MASA REZERVASİYASI*\n\n';
  msg += '━━━━━━━━━━━━━━━━━━\n';
  msg += `👤 *Ad:* ${name}\n`;
  msg += `📞 *Telefon:* ${phone}\n`;
  msg += `📅 *Tarix:* ${formattedDate}\n`;
  msg += `🕐 *Saat:* ${time}\n`;
  msg += `👥 *Nəfər sayı:* ${persons}\n`;
  if (note) msg += `📝 *Qeyd:* ${note}\n`;
  msg += '━━━━━━━━━━━━━━━━━━\n';
  msg += '⏰ Göndərilmə vaxtı: ' + new Date().toLocaleString('az-AZ');

  const encodedMsg = encodeURIComponent(msg);
  const waPhone = '994559406018';
  window.open('https://wa.me/' + waPhone + '?text=' + encodedMsg, '_blank');

  showToast('✅ Rezervasiya WhatsApp-a göndərildi!', 'success');
  document.getElementById('reservation-form').reset();
}

// ===== FAQ =====
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(f => {
    f.classList.remove('open');
    f.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  });

  // Open clicked if it was closed
  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

// ===== VACANCIES =====
function buildVacanciesGrid() {
  const grid = document.getElementById('vacancies-grid');
  if (!grid) return;

  grid.innerHTML = VACANCIES_DATA.map(v => `
    <article class="vacancy-card" onclick="openVacancyModal('${v.id}')" role="button" tabindex="0"
      onkeydown="if(event.key==='Enter')openVacancyModal('${v.id}')"
      aria-label="${v.title} vakansiyası">
      <div class="vacancy-tag">${v.tag}</div>
      <h3 class="vacancy-title">${v.title}</h3>
      <p class="vacancy-desc">${v.desc}</p>
      <div class="vacancy-info">
        <span class="vacancy-badge">🏢 ${v.dept}</span>
        <span class="vacancy-badge">📍 ${v.location}</span>
        <span class="vacancy-badge">🕐 ${v.schedule}</span>
      </div>
      <button class="vacancy-apply-btn" onclick="event.stopPropagation(); applyVacancy('${v.id}')">
        💬 Müraciət Et
      </button>
    </article>
  `).join('');
}

function openVacancyModal(id) {
  const v = VACANCIES_DATA.find(x => x.id === id);
  if (!v) return;

  document.getElementById('vacancy-modal-inner').innerHTML = `
    <div class="vacancy-modal-header">
      <div class="vacancy-tag" style="margin-bottom:12px;">${v.tag}</div>
      <h2>${v.title}</h2>
      <p>${v.dept} · ${v.location} · ${v.schedule}</p>
    </div>
    <div class="vacancy-modal-body">
      <div class="vacancy-modal-section">
        <h4>📋 Haqqında</h4>
        <p style="font-size:0.95rem;color:var(--gray);line-height:1.7;">${v.desc}</p>
      </div>
      <div class="vacancy-modal-section">
        <h4>✅ Tələblər</h4>
        <ul>${v.requirements.map(r => `<li>${r}</li>`).join('')}</ul>
      </div>
      <div class="vacancy-modal-section">
        <h4>📌 Vəzifələr</h4>
        <ul>${v.duties.map(d => `<li>${d}</li>`).join('')}</ul>
      </div>
      <div class="vacancy-modal-section">
        <h4>💰 Maaş</h4>
        <p style="font-size:0.95rem;color:var(--gray);">${v.salary}</p>
      </div>
      <button class="vacancy-apply-btn" style="width:100%;margin-top:8px;" onclick="applyVacancy('${v.id}')">
        💬 WhatsApp ilə Müraciət Et
      </button>
    </div>
  `;

  document.getElementById('vacancy-modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVacancyModal(e, force) {
  if (force || (e && e.target === document.getElementById('vacancy-modal-overlay'))) {
    document.getElementById('vacancy-modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }
}

function applyVacancy(id) {
  const v = VACANCIES_DATA.find(x => x.id === id);
  if (!v) return;

  let msg = '💼 *COOL FOOD — VAKANSİYA MÜRACİƏTİ*\n\n';
  msg += '━━━━━━━━━━━━━━━━━━\n';
  msg += `🏢 *Vəzifə:* ${v.title}\n`;
  msg += `📍 *Departament:* ${v.dept}\n`;
  msg += `🕐 *Rejim:* ${v.schedule}\n`;
  msg += '━━━━━━━━━━━━━━━━━━\n\n';
  msg += 'Salam, bu vakansiyaya müraciət etmək istəyirəm. Məlumatlarımı göndərirəm.';

  const encoded = encodeURIComponent(msg);
  window.open('https://wa.me/994559406018?text=' + encoded, '_blank');
}

// ===== LIGHTBOX =====
function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== TOAST =====
let toastTimer = null;
function showToast(msg, type) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast show' + (type ? ' ' + type : '');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Close modals/panels in order
    if (document.getElementById('lightbox').classList.contains('open')) {
      closeLightbox();
    } else if (document.getElementById('product-modal-overlay').classList.contains('open')) {
      closeProductModal(null, true);
    } else if (document.getElementById('vacancy-modal-overlay').classList.contains('open')) {
      closeVacancyModal(null, true);
    } else if (state.cartOpen) {
      toggleCart();
    }
  }
});

// Set minimum date for reservation
function setMinDate() {
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
  buildMenuGrids();
  buildVacanciesGrid();
  updateCartUI();
  setMinDate();
});
