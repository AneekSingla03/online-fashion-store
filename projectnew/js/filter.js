/* ============================================================
   StyleHub — filter.js
   Product filtering, sorting, search logic
   ============================================================ */

let filterState = {
  cat: 'all', sub: '', search: '', sort: 'popular',
  minPrice: 0, maxPrice: 15000,
};

function applyFilters() {
  let list = [...PRODUCTS];

  // Category
  if (filterState.cat !== 'all') list = list.filter(p => p.cat === filterState.cat);

  // Subcategory
  if (filterState.sub) list = list.filter(p => p.sub === filterState.sub);

  // Search
  if (filterState.search) {
    const q = filterState.search.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sub.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q)
    );
  }

  // Price range
  list = list.filter(p => p.price >= filterState.minPrice && p.price <= filterState.maxPrice);

  // Sort
  switch (filterState.sort) {
    case 'price-low': list.sort((a, b) => a.price - b.price); break;
    case 'price-high': list.sort((a, b) => b.price - a.price); break;
    case 'discount': list.sort((a, b) => (b.old - b.price) / b.old - (a.old - a.price) / a.old); break;
    case 'newest': list.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0)); break;
    default: list.sort((a, b) => b.reviews - a.reviews); break; // popular
  }

  return list;
}

function renderFilteredProducts(containerId = 'product-grid') {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = applyFilters();

  // Update count label
  const countEl = document.getElementById('product-count');
  if (countEl) countEl.textContent = `Showing ${list.length} product${list.length !== 1 ? 's' : ''}`;

  if (!list.length) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <div class="empty-state-icon">🔍</div>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search term.</p>
        <button class="btn btn-primary" onclick="resetFilters()">Reset Filters</button>
      </div>`;
    return;
  }
  container.innerHTML = list.map(p => productCardHTML(p)).join('');
}

function setCategory(cat) {
  filterState.cat = cat;
  filterState.sub = '';
  renderFilteredProducts();
  renderFilterChips();
  updateActiveFilterBtn(cat);
}

function setSub(sub) {
  filterState.sub = filterState.sub === sub ? '' : sub;
  renderFilteredProducts();
}

function setSearch(q) {
  filterState.search = q;
  renderFilteredProducts();
}

function setSort(val) {
  filterState.sort = val;
  renderFilteredProducts();
}

function resetFilters() {
  filterState = { cat: 'all', sub: '', search: '', sort: 'popular', minPrice: 0, maxPrice: 15000 };
  const searchEl = document.getElementById('filter-search');
  if (searchEl) searchEl.value = '';
  const sortEl = document.getElementById('sort-select');
  if (sortEl) sortEl.value = 'popular';
  renderFilteredProducts();
  renderFilterChips();
  updateActiveFilterBtn('all');
}

function updateActiveFilterBtn(cat) {
  document.querySelectorAll('[data-cat-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.catBtn === cat);
  });
}

/* ── FILTER CHIPS BASED ON CATEGORY ── */
const SUB_CATEGORIES = {
  all: ['All', 'Dresses', 'Shirts', 'Tops', 'Sarees', 'Ethnic', 'Sports', 'Kids'],
  women: ['All', 'Dresses', 'Tops', 'Bottoms', 'Sarees', 'Skirts', 'Ethnic Tops'],
  men: ['All', 'Shirts', 'T-Shirts', 'Trousers', 'Ethnic', 'Jackets', 'Polo'],
  kids: ['All', 'Baby (0-2y)', 'Toddler', 'School', 'Festive'],
  ethnic: ['All', 'Sarees', 'Men Ethnic', 'Women Ethnic', 'Suits'],
  sports: ['All', 'Activewear', 'Yoga', 'Hoodies', 'Shorts'],
};

console.log(SUB_CATEGORIES.men[3]);

function renderFilterChips(containerId = 'filter-chips') {
  const container = document.getElementById(containerId);
  if (!container) return;
  const chips = SUB_CATEGORIES[filterState.cat] || SUB_CATEGORIES.all;
  container.innerHTML = chips.map(c =>
    `<button class="filter-chip${filterState.sub === c || (c === 'All' && !filterState.sub) ? ' active' : ''}"
      onclick="setSub('${c === 'All' ? '' : c}')">${c}</button>`
  ).join('');
}

/* ── PARSE URL PARAMS AND INIT ── */
function initFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('cat')) filterState.cat = params.get('cat');
  if (params.get('q')) filterState.search = params.get('q');
  if (params.get('sort')) filterState.sort = params.get('sort');
  const searchEl = document.getElementById('filter-search');
  if (searchEl && filterState.search) searchEl.value = filterState.search;
  const sortEl = document.getElementById('sort-select');
  if (sortEl) sortEl.value = filterState.sort;
  renderFilteredProducts();
  renderFilterChips();
  updateActiveFilterBtn(filterState.cat);
}






















