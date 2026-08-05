// ===== COOL FOOD — App Logic =====
'use strict';

// ===== STATE =====
const state = {
  currentPage: 'home',
  prevPage: 'home',
  cart: [],
  cartOpen: false,
  mobileMenuOpen: false
};

// ===== PAGE NAVIGATION =====
function showPage(page) {
  const current = document.getElementById(state.currentPage + '-page');
  const target = document.getElementById(page + '-page');
  if (!target || page === state.currentPage) return;

  if (current) current.classList.remove('active');

  state.prevPage = state.currentPage;
  state.currentPage = page;

  target.classList.add('active');
  closeMobileMenu();
  window.scrollTo(0, 0);
}

function goBack() {
  showPage(state.prevPage || 'home');
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  state.mobileMenuOpen = !state.mobileMenuOpen;
  document.getElementById('mobile-nav').classList.toggle('open', state.mobileMenuOpen);
}

function closeMobileMenu() {
  if (!state.mobileMenuOpen) return;
  state.mobileMenuOpen = false;
  document.getElementById('mobile-nav').classList.remove('open');
}

// ===== MENU TAB SWITCHING =====
function switchMenuTab(category, btn) {
  const tabs = document.querySelectorAll('.menu-tab');
  const sections = document.querySelectorAll('.menu-section');

  tabs.forEach(t => t.classList.remove('active'));
  sections.forEach(s => s.classList.remove('active'));

  btn.classList.add('active');
  const section = document.getElementById('section-' + category);
  if (section) {
    section.classList.add('active');
    const tabsEl = document.querySelector('.menu-tabs');
    if (tabsEl) {
      const offset = tabsEl.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }
}

// ===== RENDER MENU =====
function renderMenuCard(item) {
  const imgHtml = item.image
    ? `<img class="menu-card-img" src="${item.image}" alt="${item.name}" loading="lazy" width="260" height="180" />`
    : `<div class="menu-card-img-placeholder">${item.emoji}</div>`;

  return `<article class="menu-card" onclick="openProductModal('${item.id}')" role="button" tabindex="0"
    onkeydown="if(event.key==='Enter')openProductModal('${item.id}')"
    aria-label="${item.name} - ${item.price.toFixed(2)} ₼">
    ${imgHtml}
    <div class="menu-card-body">
      <h3 class="menu-card-name">${item.name}</h3>
      <p class="menu-card-desc">${item.desc}</p>
      <div class="menu-card-footer">
        <span class="menu-card-price">${item.price.toFixed(2)} ₼</span>
        <button class="add-to-cart-btn" onclick="event.stopPropagation();addToCart('${item.id}')"
          aria-label="${item.name} səbətə əlavə et">+</button>
      </div>
    </div>
  </article>`;
}

function renderListCard(item) {
  return `<article class="menu-list-card" onclick="openProductModal('${item.id}')" role="button" tabindex="0"
    onkeydown="if(event.key==='Enter')openProductModal('${item.id}')"
    aria-label="${item.name} - ${item.price.toFixed(2)} ₼">
    <div class="menu-list-card-info">
      <div class="name">${item.emoji} ${item.name}</div>
      <div class="price">${item.price.toFixed(2)} ₼</div>
    </div>
    <button class="add-to-cart-btn" onclick="event.stopPropagation();addToCart('${item.id}')"
      aria-label="${item.name} səbətə əlavə et">+</button>
  </article>`;
}

function buildMenuGrids() {
  const gridCategories = ['hotdog', 'qelyanalt', 'burger', 'sorba'];
  const listCategories = ['soyuq', 'isti', 'extra'];

  const fragment = document.createDocumentFragment();

  gridCategories.forEach(cat => {
    const el = document.getElementById('grid-' + cat);
    if (el && MENU_DATA[cat]) {
      el.innerHTML = MENU_DATA[cat].map(renderMenuCard).join('');
    }
  });

  listCategories.forEach(cat => {
    const el = document.getElementById('grid-' + cat);
    if (el && MENU_DATA[cat]) {
      el.innerHTML = MENU_DATA[cat].map(renderListCard).join('');
    }
  });
}

// ===== GET ITEM BY ID =====
function getItemById(id) {
  const cats = Object.values(MENU_DATA);
  for (let i = 0; i < cats.length; i++) {
    const found = cats[i].find(item => item.id === id);
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
      <p style="font-size:.82rem;font-weight:700;color:var(--orange);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">${item.category}</p>
      <h2 class="product-modal-name">${item.name}</h2>
      <p class="product-modal-desc">${item.desc}</p>
      <p class="product-modal-price">${item.price.toFixed(2)} ₼</p>
      <div class="product-modal-actions">
        <button class="modal-add-btn" onclick="addToCart('${item.id}');closeProductModal(null,true)">
          + Səbətə Əlavə Et
        </button>
      </div>
    </div>`;

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
  if (item.qty <= 0) removeFromCart(itemId);
  else updateCartUI();
}

function updateCartUI() {
  const totalItems = state.cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = state.cart.reduce((s, c) => s + c.price * c.qty, 0);

  // Desktop badge
  const badge = document.getElementById('cart-badge');
  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.classList.add('show');
  } else {
    badge.classList.remove('show');
  }

  // Mobile badge
  const badgeMobile = document.getElementById('cart-badge-mobile');
  if (badgeMobile) {
    if (totalItems > 0) {
      badgeMobile.textContent = totalItems;
      badgeMobile.classList.add('show');
    } else {
      badgeMobile.classList.remove('show');
    }
  }

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
      ? `<img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" loading="lazy" />`
      : item.emoji;

    return `<div class="cart-item">
      <div class="cart-item-icon">${iconHtml}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${(item.price * item.qty).toFixed(2)} ₼</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty('${item.id}',-1)" aria-label="Azalt">−</button>
        <span class="qty-display">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.id}',1)" aria-label="Artır">+</button>
        <button class="cart-remove" onclick="removeFromCart('${item.id}')" aria-label="Sil">🗑</button>
      </div>
    </div>`;
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
    msg += `${i + 1}. ${item.name}\n   Miqdar: ${item.qty} ədəd\n   Qiymət: ${(item.price * item.qty).toFixed(2)} ₼\n\n`;
  });

  const total = state.cart.reduce((s, c) => s + c.price * c.qty, 0);
  msg += '━━━━━━━━━━━━━━━━━━\n';
  msg += `💰 *CƏMİ: ${total.toFixed(2)} ₼*\n`;
  msg += '━━━━━━━━━━━━━━━━━━\n\n';
  msg += '⏰ Sifariş vaxtı: ' + new Date().toLocaleString('az-AZ');

  window.open('https://wa.me/994559406018?text=' + encodeURIComponent(msg), '_blank');
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

  const formattedDate = new Date(date).toLocaleDateString('az-AZ', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  let msg = '📅 *COOL FOOD — MASA REZERVASİYASI*\n\n';
  msg += '━━━━━━━━━━━━━━━━━━\n';
  msg += `👤 *Ad:* ${name}\n📞 *Telefon:* ${phone}\n📅 *Tarix:* ${formattedDate}\n🕐 *Saat:* ${time}\n👥 *Nəfər sayı:* ${persons}\n`;
  if (note) msg += `📝 *Qeyd:* ${note}\n`;
  msg += '━━━━━━━━━━━━━━━━━━\n';
  msg += '⏰ Göndərilmə vaxtı: ' + new Date().toLocaleString('az-AZ');

  window.open('https://wa.me/994559406018?text=' + encodeURIComponent(msg), '_blank');
  showToast('✅ Rezervasiya WhatsApp-a göndərildi!', 'success');
  document.getElementById('reservation-form').reset();
}

// ===== FAQ =====
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item.open').forEach(f => {
    f.classList.remove('open');
    f.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  });

  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

// ===== VACANCIES =====
function buildVacanciesGrid() {
  const grid = document.getElementById('vacancies-grid');
  if (!grid || !VACANCIES_DATA) return;

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
      <button class="vacancy-apply-btn" onclick="event.stopPropagation();applyVacancy('${v.id}')">
        💬 Müraciət Et
      </button>
    </article>`).join('');
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
        <p style="font-size:.95rem;color:var(--gray);line-height:1.7;">${v.desc}</p>
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
        <p style="font-size:.95rem;color:var(--gray);">${v.salary}</p>
      </div>
      <button class="vacancy-apply-btn" style="width:100%;margin-top:8px;" onclick="applyVacancy('${v.id}')">
        💬 WhatsApp ilə Müraciət Et
      </button>
    </div>`;

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
  msg += `🏢 *Vəzifə:* ${v.title}\n📍 *Departament:* ${v.dept}\n🕐 *Rejim:* ${v.schedule}\n`;
  msg += '━━━━━━━━━━━━━━━━━━\n\n';
  msg += 'Salam, bu vakansiyaya müraciət etmək istəyirəm. Məlumatlarımı göndərirəm.';

  window.open('https://wa.me/994559406018?text=' + encodeURIComponent(msg), '_blank');
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
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Escape') return;
  if (document.getElementById('lightbox').classList.contains('open')) {
    closeLightbox();
  } else if (document.getElementById('product-modal-overlay').classList.contains('open')) {
    closeProductModal(null, true);
  } else if (document.getElementById('vacancy-modal-overlay').classList.contains('open')) {
    closeVacancyModal(null, true);
  } else if (state.cartOpen) {
    toggleCart();
  }
}, { passive: true });

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
  // Set min date for reservation
  const dateInput = document.getElementById('res-date');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  buildMenuGrids();
  buildVacanciesGrid();
  updateCartUI();
}, { once: true });
