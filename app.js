const API_URL = "https://fakestoreapi.com/products";
const PER_PAGE = 8; // Reducido para que la paginación se note con 20 productos

const state = { items: [], filtered: [], page: 1 };

const $search = document.getElementById("search");
const $region = document.getElementById("region"); // Usado ahora para categoría
const $status = document.getElementById("status");
const $results = document.getElementById("results");
const $pager = document.getElementById("pager");
const $pageInfo = document.getElementById("pageInfo");
const $prev = document.getElementById("prev");
const $next = document.getElementById("next");

// ---------- Estados de la interfaz ----------
function showStatus(message, type = "info", retry = false) {
  $status.className = type;
  $status.textContent = message;
  if (retry) {
    const btn = document.createElement("button");
    btn.textContent = "Reintentar";
    btn.addEventListener("click", loadData);
    $status.append(" ", btn);
  }
}

function clearStatus() {
  $status.className = "";
  $status.textContent = "";
}

// ---------- Consumo de la API ----------
async function loadData() {
  $results.innerHTML = "";
  $pager.hidden = true;
  showStatus("Cargando productos...", "loading");

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`El servidor respondió con el código ${response.status}`);
    }
    const data = await response.json();
    
    // Ordenar alfabéticamente por el título del producto
    state.items = data.sort((a, b) => a.title.localeCompare(b.title));
    
    clearStatus();
    applyFilters();
  } catch (error) {
    console.error(error);
    showStatus(
      "No se pudieron cargar los datos. Revisa tu conexión e inténtalo de nuevo.",
      "error",
      true
    );
  }
}

// ---------- Búsqueda, filtro y paginación ----------
function applyFilters() {
  const text = $search.value.trim().toLowerCase();
  const category = $region.value;

  state.filtered = state.items.filter((item) =>
    item.title.toLowerCase().includes(text) &&
    (category === "" || item.category === category)
  );
  
  state.page = 1;
  render();
}

function render() {
  $results.innerHTML = "";

  if (state.filtered.length === 0) {
    $pager.hidden = true;
    showStatus("No se encontraron productos con esos criterios.", "empty");
    return;
  }
  clearStatus();

  const totalPages = Math.ceil(state.filtered.length / PER_PAGE);
  const start = (state.page - 1) * PER_PAGE;
  const pageItems = state.filtered.slice(start, start + PER_PAGE);

  pageItems.forEach((item) => $results.appendChild(createCard(item)));

  $pager.hidden = false;
  $pageInfo.textContent = `Página ${state.page} de ${totalPages} (${state.filtered.length} productos)`;
  $prev.disabled = state.page === 1;
  $next.disabled = state.page === totalPages;
}

// ---------- Componente creado dinámicamente ----------
function createCard(item) {
  const card = document.createElement("article");
  card.className = "card";

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.title;
  img.loading = "lazy";
  // Ajuste de estilo inline rápido para que las imágenes de productos se vean bien
  img.style.objectFit = "contain"; 
  img.style.padding = "10px";

  const title = document.createElement("h2");
  title.textContent = item.title;
  // Truncar el texto si es muy largo
  title.style.whiteSpace = "nowrap";
  title.style.overflow = "hidden";
  title.style.textOverflow = "ellipsis";

  const info = document.createElement("p");
  info.innerHTML = "";
  [
    ["Categoría", item.category],
    ["Precio", `$${item.price.toFixed(2)}`],
    ["Reseñas", `${item.rating.rate} ⭐ (${item.rating.count})`]
  ].forEach(([label, value]) => {
    const line = document.createElement("span");
    line.textContent = `${label}: ${value}`;
    info.appendChild(line);
  });

  card.append(img, title, info);
  return card;
}

// ---------- Eventos ----------
$search.addEventListener("input", applyFilters);
$region.addEventListener("change", applyFilters);
$prev.addEventListener("click", () => { state.page--; render(); window.scrollTo(0, 0); });
$next.addEventListener("click", () => { state.page++; render(); window.scrollTo(0, 0); });

// Iniciar
loadData();