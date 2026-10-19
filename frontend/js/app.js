// =============================================================================
// M&E SWEETS — app.js (Frontend Cliente)
// Configurador interactivo, auth, pedidos
// =============================================================================

const API_BASE = 'https://mesweets-backend.onrender.com/api';

// ─── Estado global del configurador ──────────────────────────────────────────
let config = {
  tipo_postre_id:  null, tipo_nombre: '',
  base_id:         1,    base_nombre: 'Torta Húmeda Tres Leches Artesanal', precio_base: 2.00,
  cobertura_id:    null, cob_nombre: '',    precio_cob: 0,
  licor_id:        null, licor_nombre: 'Sin Alcohol', precio_licor: 0,
  sin_alcohol:     true,
  fruta_id:        4,    fruta_nombre: 'Sin Fruta',   precio_fruta: 0,
  porciones:       4,
  empaque:         'individual',
  precio_base_x_p: 2.00,  // se carga del backend
  max_porciones:   64,
  min_porciones:   1,
};

let currentStep = 1;
const TOTAL_STEPS = 6;

// ─── SESIÓN ───────────────────────────────────────────────────────────────────
let session = JSON.parse(localStorage.getItem('mesweets_session') || 'null');

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  updateNavUI();
  await loadConfig();
  await loadTipos();
  await loadBases();
  await loadLicores();
  await loadCoberturas();
  await loadFrutas();
  updateSummary();
  updateEmpaqueHint();
  updateStepUI();
});

// ─── CONFIGURACIÓN DEL SISTEMA ────────────────────────────────────────────────
async function loadConfig() {
  try {
    const r = await fetch(`${API_BASE}/catalogo/config`);
    if (r.ok) {
      const d = await r.json();
      if (d.precio_base_por_porcion) config.precio_base_x_p = parseFloat(d.precio_base_por_porcion);
      if (d.max_porciones_pedido)    config.max_porciones   = parseInt(d.max_porciones_pedido);
      if (d.min_porciones_pedido)    config.min_porciones   = parseInt(d.min_porciones_pedido);
      const maxP = document.getElementById('max-porciones');
      if (maxP) maxP.textContent = config.max_porciones;
      config.porciones = Math.max(config.min_porciones, Math.min(4, config.max_porciones));
      const porcDisp = document.getElementById('porciones-display');
      if (porcDisp) porcDisp.textContent = config.porciones;

      // Actualizar teléfono de contacto y enlace directo a WhatsApp
      if (d.telefono_contacto) {
        const telEl = document.getElementById('footer-telefono');
        if (telEl) {
          telEl.textContent = d.telefono_contacto;
          telEl.href = `tel:${d.telefono_contacto.replace(/\s+/g, '')}`;
        }
        const waLink = document.getElementById('footer-whatsapp-link');
        if (waLink) {
          const numDigits = d.telefono_contacto.replace(/\D/g, '');
          waLink.href = `https://wa.me/${numDigits}`;
        }
      }

      // Actualizar correo de contacto
      if (d.email_contacto) {
        const mailEl = document.getElementById('footer-email');
        if (mailEl) {
          mailEl.textContent = d.email_contacto;
          mailEl.href = `mailto:${d.email_contacto}`;
        }
      }

      // Actualizar enlace a Instagram
      if (d.instagram_url) {
        const igLink = document.getElementById('footer-instagram-link');
        if (igLink) igLink.href = d.instagram_url;
      }
    }
  } catch(e) { console.warn('Config backend no disponible, usando valores por defecto'); }
}

// ─── LOADERS DE CATÁLOGO ──────────────────────────────────────────────────────
async function loadTipos() {
  try {
    const r   = await fetch(`${API_BASE}/catalogo/tipos-postre`);
    const data = r.ok ? await r.json() : [];
    // Priorizar Porciones Individuales primero si existe
    data.sort((a, b) => {
      if (a.nombre.includes('Porciones')) return -1;
      if (b.nombre.includes('Porciones')) return 1;
      return 0;
    });
    const icons = { 'Torta Completa':'🎂','Porciones Individuales':'🍮','Cupcakes Premium':'🧁','Shots de Postre':'🥛' };
    const grid = document.getElementById('tipos-grid');
    grid.innerHTML = '';
    data.forEach(t => {
      const icon = icons[t.nombre] || '🍰';
      grid.innerHTML += `
        <div class="option-card" data-id="${t.id}" onclick="selectOption(this,'tipo',${t.id},'${escHtml(t.nombre)}',0)">
          <div class="option-icon">${icon}</div>
          <div class="option-name">${escHtml(t.nombre)}</div>
          <div class="option-price" style="font-size:11px;line-height:1.4">${escHtml(t.descripcion || '')}</div>
        </div>`;
    });
    // Auto-seleccionar primero
    if (data.length) grid.querySelector('.option-card').click();
  } catch(e) {
    document.getElementById('tipos-grid').innerHTML =
      '<p style="color:var(--color-gray-400);font-size:var(--font-size-sm)">No disponible (backend desconectado)</p>';
  }
}

async function loadBases() {
  try {
    const r    = await fetch(`${API_BASE}/catalogo/bases`);
    const data = r.ok ? await r.json() : [];
    if (data.length > 0) {
      const b = data[0];
      config.base_id = parseInt(b.id) || 1;
      config.base_nombre = b.nombre || 'Torta Húmeda Tres Leches Artesanal';
      config.precio_base = parseFloat(b.precio_venta_sugerido) || 2.00;
      const sumBase = document.getElementById('sum-base');
      if (sumBase) sumBase.textContent = config.base_nombre;
    }
  } catch(e) { console.error('loadBases', e); }
}

async function loadFrutas() {
  try {
    const r    = await fetch(`${API_BASE}/catalogo/frutas`);
    const data = r.ok ? await r.json() : [];
    const grid = document.getElementById('frutas-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const icons = {
      'Fresa':'🍓','Fresas':'🍓','Piña':'🍍','Durazno':'🍑',
      'Manzana':'🍏','Manzanas':'🍏','Apple':'🍏',
      'Kiwi':'🥝','Plátano':'🍌','Banano':'🍌','Banana':'🍌',
      'Mora':'🫐','Moras':'🫐','Arándano':'🫐','Arándanos':'🫐','Blueberry':'🫐',
      'Cereza':'🍒','Cerezas':'🍒','Mango':'🥭','Uva':'🍇','Uvas':'🍇',
      'Coco':'🥥','Maracuyá':'🍈','Limón':'🍋','Naranja':'🍊','Sin Fruta':'🚫'
    };
    data.forEach(f => {
      const pFruta = parseFloat(f.precio_venta_sugerido) || 0;
      const precioTxt = pFruta > 0 ? `+$${pFruta.toFixed(2)}/p.` : '✓ Fruta incluida';
      let icon = f.imagen_url && f.imagen_url.trim() ? f.imagen_url.trim() : '';
      if (!icon) {
        for (const [k, v] of Object.entries(icons)) {
          if (f.nombre.toLowerCase().includes(k.toLowerCase())) { icon = v; break; }
        }
      }
      if (!icon) icon = '🍓';
      const isImgUrl = icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('/') || icon.startsWith('data:');
      const iconHtml = isImgUrl 
        ? `<div class="option-icon" style="display:flex;align-items:center;justify-content:center"><img src="${escHtml(icon)}" alt="${escHtml(f.nombre)}" style="width:36px;height:36px;object-fit:cover;border-radius:6px"></div>`
        : `<div class="option-icon">${icon}</div>`;

      const isSelected = (config.fruta_id == f.id) || (!config.fruta_id && f.id == 4);
      grid.innerHTML += `
        <div class="option-card ${isSelected ? 'selected' : ''}" data-fruta-id="${f.id}" data-precio="${pFruta}"
             onclick="selectOption(this,'fruta',${f.id},'${escHtml(f.nombre)}',${pFruta})">
          ${iconHtml}
          <div class="option-name">${escHtml(f.nombre)}</div>
          <div class="option-price" style="font-weight:600;color:var(--color-terracotta)">${precioTxt}</div>
          <div class="option-stock">${escHtml(f.descripcion || '')}</div>
        </div>`;
    });
    if (!config.fruta_id && data.length) {
      const defCard = grid.querySelector('[data-fruta-id="4"]') || grid.querySelector('.option-card');
      if (defCard) defCard.click();
    }
  } catch(e) { console.error('loadFrutas', e); }
}

async function loadCoberturas() {
  try {
    const r    = await fetch(`${API_BASE}/catalogo/coberturas`);
    const data = r.ok ? await r.json() : [];
    const grid = document.getElementById('coberturas-grid');
    const icons = {'Manjar':'🍯','Chocolate Blanco':'⬜','Leche Condensada':'🥛','Vainilla':'🌼','Coco':'🥥','Ganache':'🍫'};
    grid.innerHTML = '';
    data.forEach(c => {
      const stock = parseFloat(c.stock_gramos) || 0;
      const gxp   = parseFloat(c.gramos_por_porcion) || 30;
      const porcDisp = Math.floor(stock / gxp);
      const agotado  = porcDisp === 0 ? 'stock-agotado' : '';
      const icon = Object.keys(icons).find(k => c.nombre.includes(k)) ? icons[Object.keys(icons).find(k => c.nombre.includes(k))] : '🎂';
      const pCob = parseFloat(c.precio_venta_sugerido) || 0;
      const precioCobTxt = pCob > 0 ? `+$${pCob.toFixed(2)}/p.` : '✓ Cobertura incluida';
      grid.innerHTML += `
        <div class="option-card ${agotado}" data-id="${c.id}" data-precio="${pCob}"
             onclick="selectOption(this,'cobertura',${c.id},'${escHtml(c.nombre)}',${pCob})">
          <div class="option-icon">${icon}</div>
          <div class="option-name">${escHtml(c.nombre)}</div>
          <div class="option-price" style="color:var(--color-terracotta);font-weight:600">${precioCobTxt}</div>
          <div class="option-stock">${porcDisp > 0 ? '~'+porcDisp+' porciones disp.' : 'Sin stock'}</div>
        </div>`;
    });
  } catch(e) { console.error('loadCoberturas', e); }
}

async function loadLicores() {
  try {
    const r    = await fetch(`${API_BASE}/catalogo/licores`);
    const data = r.ok ? await r.json() : [];
    const grid = document.getElementById('licores-grid');
    // mantener "Sin Alcohol" al inicio
    const sinAlcohol = grid.querySelector('[data-licor-id="0"]');
    grid.innerHTML = '';
    if (sinAlcohol) grid.appendChild(sinAlcohol);
    const icons = {'Ron Saborizado':'🥃','Crema Whisky':'🥛','Rompope':'🥛','Licor Café':'☕','Ron':'🥃'};
    data.forEach(l => {
      const stock   = parseFloat(l.stock_ml) || 0;
      const mxp     = parseFloat(l.ml_por_porcion) || 25;
      const porcDisp= Math.floor(stock / mxp);
      const agotado = porcDisp === 0 ? 'stock-agotado' : '';
      const precio  = parseFloat(l.recargo_porcion != null ? l.recargo_porcion : 0);
      const icon    = icons[l.tipo] || (l.nombre.includes('Coco') ? '🥥' : (l.nombre.includes('Maracuyá') ? '🍈' : '🍾'));
      const precioTxt = precio > 0 ? `+$${precio.toFixed(2)}/p.` : '✓ Sin recargo ($2.00)';
      grid.innerHTML += `
        <div class="option-card ${agotado}" data-licor-id="${l.id}" data-precio="${precio.toFixed(2)}"
             onclick="selectOption(this,'licor',${l.id},'${escHtml(l.nombre)}',${precio.toFixed(2)})">
          <div class="option-icon">${icon}</div>
          <div class="option-name">${escHtml(l.nombre)}</div>
          <div class="option-price" style="font-weight:600">${precioTxt} • ${parseInt(mxp)}ml</div>
          <div class="option-stock">${porcDisp > 0 ? '~'+porcDisp+' porciones disp.' : 'Sin stock'}</div>
        </div>`;
    });
  } catch(e) { console.error('loadLicores', e); }
}

// ─── SELECCIÓN DE OPCIONES ────────────────────────────────────────────────────
function selectOption(el, tipo, id, nombre, precio) {
  // Desmarcar todos en el mismo grid
  const parent = el.parentElement;
  parent.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  precio = parseFloat(precio) || 0;

  switch(tipo) {
    case 'tipo':
      config.tipo_postre_id = id; config.tipo_nombre = nombre;
      document.getElementById('sum-tipo').textContent = nombre;
      const esTorta = nombre.toLowerCase().includes('torta');
      if (esTorta) {
        config.min_porciones = 8;
        if (config.porciones < 8) {
          config.porciones = 8;
        }
        config.empaque = 'torta_completa';
        selectEmpaque('torta_completa', false);
      } else {
        config.min_porciones = 1;
        if (config.empaque === 'torta_completa' && config.porciones <= 8) {
          config.porciones = 4;
        }
        config.empaque = 'individual';
        selectEmpaque('individual', false);
      }
      document.getElementById('porciones-display').textContent = config.porciones;
      document.getElementById('sum-porciones').textContent = config.porciones + ' porciones';
      updateEmpaqueHint();
      break;
    case 'base':
      config.base_id = id; config.base_nombre = nombre; config.precio_base = precio;
      document.getElementById('sum-base').textContent = nombre;
      break;
    case 'cobertura':
      config.cobertura_id = id; config.cob_nombre = nombre; config.precio_cob = precio;
      document.getElementById('sum-cobertura').textContent = nombre;
      break;
    case 'licor':
      config.licor_id     = id === 0 ? null : id;
      config.sin_alcohol  = id === 0;
      config.licor_nombre = nombre;
      config.precio_licor = id === 0 ? 0 : precio;
      document.getElementById('sum-licor').textContent = nombre;
      break;
    case 'fruta':
      config.fruta_id     = id;
      config.fruta_nombre = nombre;
      config.precio_fruta = precio;
      if (document.getElementById('sum-fruta')) {
        document.getElementById('sum-fruta').textContent = nombre;
      }
      break;
  }
  updateSummary();
}

// ─── SELECCIÓN DE EMPAQUE ─────────────────────────────────────────────────────
function selectEmpaque(tipo, userTriggered = true) {
  const ind = document.getElementById('empaque-individual');
  const tor = document.getElementById('empaque-torta_completa');

  if (tipo === 'torta_completa') {
    if (config.porciones < 8) {
      config.porciones = 8;
      document.getElementById('porciones-display').textContent = config.porciones;
      document.getElementById('sum-porciones').textContent = config.porciones + ' porciones';
      if (userTriggered) {
        showToast('🎂 Una torta completa rinde mínimo 8 porciones. Cantidad ajustada a 8.', 'info', 3000);
      }
    }
    config.empaque = 'torta_completa';
  } else {
    config.empaque = 'individual';
  }

  if (ind) ind.classList.toggle('selected', config.empaque === 'individual');
  if (tor) tor.classList.toggle('selected', config.empaque === 'torta_completa');
  updateEmpaqueHint();
  updateSummary();
  if (config.base_id && config.cobertura_id) verificarStock();
}
window.selectEmpaque = selectEmpaque;

// ─── CONTROL DE PORCIONES ─────────────────────────────────────────────────────
function changePorciones(delta) {
  let nuevo = config.porciones + delta;
  const esTipoTorta = (config.tipo_nombre || '').toLowerCase().includes('torta');
  const minPermitido = (config.empaque === 'torta_completa' && esTipoTorta) ? 8 : config.min_porciones;

  if (nuevo < minPermitido) {
    if (config.empaque === 'torta_completa' && esTipoTorta) {
      showToast('🎂 La Torta Completa requiere mínimo 8 porciones.', 'info', 2500);
    }
    return;
  }

  // Si tiene seleccionada "torta_completa" pero es tipo porciones individuales y baja de 8:
  if (config.empaque === 'torta_completa' && nuevo < 8) {
    config.empaque = 'individual';
    const ind = document.getElementById('empaque-individual');
    const tor = document.getElementById('empaque-torta_completa');
    if (ind) ind.classList.add('selected');
    if (tor) tor.classList.remove('selected');
    showToast('📦 Para menos de 8 porciones se entrega en envases individuales.', 'info', 3000);
  }

  nuevo = Math.min(config.max_porciones, nuevo);
  config.porciones = nuevo;
  document.getElementById('porciones-display').textContent = nuevo;
  document.getElementById('sum-porciones').textContent = nuevo + ' porciones';

  updateEmpaqueHint();
  updateSummary();
  if (config.base_id && config.cobertura_id) verificarStock();
}

function updateEmpaqueHint() {
  const hintEl = document.getElementById('empaque-hint');
  if (!hintEl) return;

  if (config.porciones >= 8) {
    hintEl.style.display = 'flex';
    hintEl.innerHTML = `✨ <strong>Tienes ${config.porciones} porciones:</strong> Puedes elegir si prefieres recibirlas por separado en <em>Envases individuales</em> o unificadas como una <em>Torta completa</em> en caja especial.`;
  } else {
    hintEl.style.display = 'flex';
    hintEl.innerHTML = `ℹ️ <strong>Tienes ${config.porciones} porciones:</strong> En envases individuales. Si prefieres una <strong>Torta Completa</strong>, selecciónala y se ajustará automáticamente a 8 porciones (el tamaño estándar para torta entera).`;
  }
}
window.updateEmpaqueHint = updateEmpaqueHint;

// ─── VERIFICAR STOCK EN TIEMPO REAL ──────────────────────────────────────────
let stockTimer = null;
async function verificarStock() {
  clearTimeout(stockTimer);
  stockTimer = setTimeout(async () => {
    if (!config.base_id || !config.cobertura_id) return;
    try {
      const r = await fetch(`${API_BASE}/catalogo/verificar-stock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base_id:      config.base_id || 1,
          cobertura_id: config.cobertura_id,
          licor_id:     config.licor_id || 0,
          fruta_id:     config.fruta_id || 4,
          porciones:    config.porciones
        })
      });
      const d = await r.json();
      const alert = document.getElementById('stock-alert-porciones');
      const alertText = document.getElementById('stock-alert-text');
      if (!d.disponible) {
        const msg = d.detalles.map(x => `${x.item}`).join(', ');
        alertText.textContent = 'Stock insuficiente: ' + msg;
        alert.classList.add('show');
      } else {
        alert.classList.remove('show');
      }
    } catch(e) { /* silencioso */ }
  }, 500);
}

// ─── CÁLCULO DE PRECIO ────────────────────────────────────────────────────────
function calcTotal() {
  const baseUnitario = config.precio_base > 0 ? config.precio_base : 2.00;
  const unitario = baseUnitario + (config.precio_cob || 0) + (config.precio_licor || 0) + (config.precio_fruta || 0);
  return unitario * config.porciones;
}

function updateSummary() {
  const total = calcTotal();
  document.getElementById('sum-total').textContent = '$' + total.toFixed(2);
  document.getElementById('sum-porciones').textContent = config.porciones + ' porciones';
  document.getElementById('sum-empaque').textContent =
    config.empaque === 'torta_completa' ? 'Torta completa' : 'Individual';

  const baseUnitario = config.precio_base > 0 ? config.precio_base : 2.00;
  const unitario = baseUnitario + (config.precio_cob || 0) + (config.precio_licor || 0) + (config.precio_fruta || 0);
  const detalle = `$${unitario.toFixed(2)}/porción × ${config.porciones}`;
  document.getElementById('sum-detalle').textContent = detalle;

  // Animación de precio
  const totalEl = document.getElementById('sum-total');
  totalEl.style.transform = 'scale(1.05)';
  setTimeout(() => { totalEl.style.transform = 'scale(1)'; }, 200);
}

// ─── NAVEGACIÓN DE PASOS ──────────────────────────────────────────────────────
function updateStepUI() {
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const panel = document.getElementById(`panel-${i}`);
    const ind   = document.getElementById(`step-ind-${i}`);
    if (!panel || !ind) continue;
    panel.style.display = i === currentStep ? 'block' : 'none';
    ind.className = 'step ' + (i === currentStep ? 'active' : (i < currentStep ? 'done' : ''));
    if (i < TOTAL_STEPS) {
      const line = document.getElementById(`line-${i}`);
      if (line) line.className = 'step-line ' + (i < currentStep ? 'done' : '');
    }
  }
  document.getElementById('btn-prev').style.display  = currentStep > 1 ? 'inline-flex' : 'none';
  document.getElementById('btn-next').style.display  = currentStep < TOTAL_STEPS ? 'inline-flex' : 'none';
  document.getElementById('btn-confirm').style.display = currentStep === TOTAL_STEPS ? 'inline-flex' : 'none';

  // Rellenar resumen final en paso 6
  if (currentStep === TOTAL_STEPS) buildResumenFinal();
}

function nextStep() {
  if (!validateStep(currentStep)) return;
  if (currentStep < TOTAL_STEPS) {
    currentStep++;
    updateStepUI();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStepUI();
  }
}

function validateStep(step) {
  switch(step) {
    case 1:
      if (!config.tipo_postre_id) { showToast('Selecciona el formato de tu postre', 'error'); return false; }
      return true;
    case 2:
      // Licor siempre tiene opción seleccionada (por defecto Sin Alcohol)
      return true;
    case 3:
      if (!config.cobertura_id) { showToast('Selecciona una cobertura gourmet', 'error'); return false; }
      return true;
    case 4:
      // Fruta (por defecto Sin Fruta)
      if (!config.fruta_id) { showToast('Selecciona tu opción de fruta', 'error'); return false; }
      return true;
    case 5:
      if (config.porciones < config.min_porciones) { showToast('Mínimo ' + config.min_porciones + ' porción', 'error'); return false; }
      return true;
    default: return true;
  }
}

function buildResumenFinal() {
  const el = document.getElementById('resumen-final');
  const total = calcTotal();
  el.innerHTML = `
    <h4 style="font-family:var(--font-display);margin-bottom:var(--space-4);color:var(--color-chocolate)">📋 Resumen del Pedido</h4>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);font-size:var(--font-size-sm)">
      <div><span style="color:var(--color-gray-600)">Formato:</span> <strong>${escHtml(config.tipo_nombre)}</strong></div>
      <div><span style="color:var(--color-gray-600)">Base:</span> <strong>${escHtml(config.base_nombre)}</strong></div>
      <div><span style="color:var(--color-gray-600)">Licor:</span> <strong>${escHtml(config.licor_nombre)}</strong></div>
      <div><span style="color:var(--color-gray-600)">Cobertura:</span> <strong>${escHtml(config.cob_nombre)}</strong></div>
      <div><span style="color:var(--color-gray-600)">Fruta:</span> <strong>${escHtml(config.fruta_nombre || 'Sin fruta')}</strong></div>
      <div><span style="color:var(--color-gray-600)">Porciones:</span> <strong>${config.porciones}</strong></div>
      <div><span style="color:var(--color-gray-600)">Empaque:</span> <strong>${config.empaque === 'torta_completa' ? 'Torta Completa' : 'Individual'}</strong></div>
    </div>
    <div style="margin-top:var(--space-4);padding-top:var(--space-4);border-top:1px solid var(--color-gray-200);display:flex;justify-content:space-between;align-items:center">
      <span style="font-weight:600;color:var(--color-gray-800)">Total estimado:</span>
      <span style="font-family:var(--font-display);font-size:var(--font-size-2xl);color:var(--color-terracotta);font-weight:700">$${total.toFixed(2)}</span>
    </div>
    <p style="margin-top:var(--space-2);font-size:11px;color:var(--color-gray-400)">
      + $3.50 delivery. El pago se coordina por WhatsApp tras confirmar.
    </p>`;

  // Prellenar dirección del usuario
  if (session?.direccion) {
    document.getElementById('direccion-entrega').value = session.direccion || '';
  }
}

// ─── CONFIRMAR PEDIDO ─────────────────────────────────────────────────────────
async function confirmarPedido() {
  if (!session) {
    showToast('Debes iniciar sesión para hacer un pedido', 'error');
    openAuthModal('login');
    return;
  }

  const direccion = document.getElementById('direccion-entrega').value.trim();
  const notas     = document.getElementById('notas-pedido').value.trim();

  if (!direccion) {
    showToast('Ingresa tu dirección de entrega', 'error');
    return;
  }

  const btn = document.getElementById('btn-confirm');
  btn.disabled = true;
  btn.textContent = 'Procesando...';

  try {
    const body = {
      tipo_postre_id:  config.tipo_postre_id,
      base_id:         config.base_id || 1,
      cobertura_id:    config.cobertura_id,
      licor_id:        config.licor_id,
      fruta_id:        config.fruta_id || 4,
      porciones:       config.porciones,
      sin_alcohol:     config.sin_alcohol,
      tipo_empaque:    config.empaque,
      direccion_entrega: direccion,
      notas_cliente:   notas
    };

    const r = await fetch(`${API_BASE}/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token}`
      },
      body: JSON.stringify(body)
    });

    const d = await r.json();

    if (r.ok) {
      showToast(`🎉 ¡Pedido #${d.pedido_id} creado! Te contactaremos por WhatsApp.`, 'success');
      // Reset configurador
      setTimeout(() => {
        currentStep = 1;
        config.base_id = config.cobertura_id = config.licor_id = null;
        config.porciones = 4;
        updateStepUI();
        updateSummary();
        irA('#mis-pedidos');
        loadMisPedidos();
      }, 2000);
    } else {
      showToast(d.error || 'Error al crear el pedido', 'error');
    }
  } catch(e) {
    showToast('Error de conexión con el servidor', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = '🍰 Confirmar Pedido';
  }
}

// ─── MIS PEDIDOS ──────────────────────────────────────────────────────────────
function showMisPedidos() {
  const sec = document.getElementById('mis-pedidos');
  if (!sec) return;
  sec.style.display = 'block';
  irA('#mis-pedidos');
  loadMisPedidos();
}
window.showMisPedidos = showMisPedidos;

function hacerPrimerPedido() {
  const misPed = document.getElementById('mis-pedidos');
  if (misPed) misPed.style.display = 'none';
  currentStep = 1;
  updateStepUI();
  irA('#configurador');
}
window.hacerPrimerPedido = hacerPrimerPedido;

async function loadMisPedidos() {
  if (!session) return;
  const container = document.getElementById('pedidos-lista');
  container.innerHTML = '<div class="flex-center" style="min-height:120px"><div class="spinner"></div></div>';

  try {
    const r = await fetch(`${API_BASE}/pedidos/mis-pedidos`, {
      headers: { 'Authorization': `Bearer ${session.token}` }
    });
    const data = r.ok ? await r.json() : [];

    if (!data.length) {
      container.innerHTML = `
        <div style="text-align:center;padding:var(--space-12);color:var(--color-gray-400)">
          <div style="font-size:3.5rem;margin-bottom:var(--space-4)">🍰</div>
          <p style="color:var(--color-chocolate);font-size:var(--font-size-lg);font-weight:700;margin-bottom:var(--space-2)">
            Aún no tienes pedidos
          </p>
          <p style="color:var(--color-gray-600);font-size:var(--font-size-sm);margin-bottom:var(--space-6)">
            ¡Personaliza tu postre ideal con bizcocho, cobertura y toque de licor artesanal!
          </p>
          <button class="btn btn-gold btn-lg" style="box-shadow:var(--shadow-md);cursor:pointer;" onclick="hacerPrimerPedido()">
            🍰 Hacer mi primer pedido
          </button>
        </div>`;
      return;
    }

    const estadoColors = {
      pendiente:       '#856404',      en_preparacion: '#004085',
      en_camino:       '#155724',      entregado:       '#155724',
      cancelado:       '#721c24'
    };
    const estadoBg = {
      pendiente:       '#FFF3CD',      en_preparacion: '#CCE5FF',
      en_camino:       '#D4EDDA',      entregado:       '#D4EDDA',
      cancelado:       '#F8D7DA'
    };
    const estadoLabel = {
      pendiente:       'Pendiente',    en_preparacion: 'En Preparación',
      en_camino:       'En Camino',    entregado:       'Entregado',
      cancelado:       'Cancelado'
    };

    container.innerHTML = data.map(p => `
      <div class="pedido-item">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:var(--space-3)">
          <div>
            <div style="font-weight:700;color:var(--color-chocolate);font-size:var(--font-size-lg)">
              Pedido #${p.pedido_id}
            </div>
            <div style="font-size:var(--font-size-sm);color:var(--color-gray-600);margin-top:2px">
              ${new Date(p.fecha_pedido).toLocaleDateString('es-ES', {day:'2-digit',month:'long',year:'numeric'})}
            </div>
          </div>
          <span style="background:${estadoBg[p.estado]||'#eee'};color:${estadoColors[p.estado]||'#333'};
                       padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600">
            ${estadoLabel[p.estado] || p.estado}
          </span>
        </div>
        <div style="margin-top:var(--space-4);display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:var(--space-3)">
          ${p.tipo_postre ? `<div><span style="font-size:11px;color:var(--color-gray-400);display:block">TIPO</span><strong style="font-size:var(--font-size-sm)">${escHtml(p.tipo_postre)}</strong></div>` : ''}
          ${p.base        ? `<div><span style="font-size:11px;color:var(--color-gray-400);display:block">BASE</span><strong style="font-size:var(--font-size-sm)">${escHtml(p.base)}</strong></div>` : ''}
          ${p.cobertura   ? `<div><span style="font-size:11px;color:var(--color-gray-400);display:block">COBERTURA</span><strong style="font-size:var(--font-size-sm)">${escHtml(p.cobertura)}</strong></div>` : ''}
          ${p.licor       ? `<div><span style="font-size:11px;color:var(--color-gray-400);display:block">LICOR</span><strong style="font-size:var(--font-size-sm)">${escHtml(p.licor)}</strong></div>` : ''}
          <div><span style="font-size:11px;color:var(--color-gray-400);display:block">PORCIONES</span><strong style="font-size:var(--font-size-sm)">${p.porciones}</strong></div>
        </div>
        <div style="margin-top:var(--space-4);display:flex;justify-content:flex-end;align-items:center">
          <span style="font-family:var(--font-display);font-size:var(--font-size-xl);font-weight:700;color:var(--color-terracotta)">
            $${parseFloat(p.precio_total||0).toFixed(2)}
          </span>
        </div>
      </div>`).join('');
  } catch(e) {
    container.innerHTML = '<p style="color:var(--color-danger)">Error cargando pedidos</p>';
  }
}

// ─── AUTENTICACIÓN ────────────────────────────────────────────────────────────
function openAuthModal(tab) {
  document.getElementById('modal-auth').classList.add('active');
  switchAuthTab(tab || 'login');
}
function closeAuthModal() {
  document.getElementById('modal-auth').classList.remove('active');
}

function switchAuthTab(tab) {
  document.getElementById('form-login').style.display   = tab === 'login'    ? 'block' : 'none';
  document.getElementById('form-registro').style.display = tab === 'registro' ? 'block' : 'none';
  document.getElementById('tab-login').className    = 'auth-tab ' + (tab === 'login'    ? 'active' : '');
  document.getElementById('tab-registro').className = 'auth-tab ' + (tab === 'registro' ? 'active' : '');
  document.getElementById('modal-auth-title').textContent =
    tab === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta';
}

async function doLogin() {
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl    = document.getElementById('login-error');
  errEl.style.display = 'none';

  if (!email || !password) {
    errEl.textContent = 'Completa todos los campos';
    errEl.style.display = 'flex'; return;
  }

  try {
    const r = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const d = await r.json();

    if (!r.ok) {
      errEl.textContent = d.error || 'Error de inicio de sesión';
      errEl.style.display = 'flex'; return;
    }

    // Admin redirige al dashboard
    if (d.rol_id == 1) {
      localStorage.setItem('mesweets_session', JSON.stringify(d));
      window.location.href = 'admin.html';
      return;
    }

    session = d;
    localStorage.setItem('mesweets_session', JSON.stringify(d));
    closeAuthModal();
    updateNavUI();
    showToast(`¡Bienvenida/o, ${d.nombre}! 🍰`, 'success');
  } catch(e) {
    errEl.textContent = 'Error de conexión. Verifica el backend.';
    errEl.style.display = 'flex';
  }
}

async function doRegistro() {
  const nombre    = document.getElementById('reg-nombre').value.trim();
  const apellido  = document.getElementById('reg-apellido').value.trim();
  const email     = document.getElementById('reg-email').value.trim();
  const password  = document.getElementById('reg-password').value;
  const telefono  = document.getElementById('reg-telefono').value.trim();
  const nacimiento= document.getElementById('reg-nacimiento').value;
  const direccion = document.getElementById('reg-direccion').value.trim();
  const errEl     = document.getElementById('reg-error');
  errEl.style.display = 'none';

  // Validación de edad en frontend
  if (nacimiento) {
    const hoy  = new Date();
    const nac  = new Date(nacimiento);
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    if (edad < 18) {
      errEl.textContent = '🔞 Eres menor de edad. No puedes registrarte en M&E SWEETS.';
      errEl.style.display = 'flex'; return;
    }
  }

  try {
    const r = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, email, password, telefono,
                             fecha_nacimiento: nacimiento, direccion_entrega: direccion })
    });
    const d = await r.json();

    if (!r.ok) {
      errEl.textContent = d.error || 'Error en el registro';
      errEl.style.display = 'flex'; return;
    }

    showToast('¡Cuenta creada! Ahora inicia sesión.', 'success');
    switchAuthTab('login');
    document.getElementById('login-email').value = email;
  } catch(e) {
    errEl.textContent = 'Error de conexión. Verifica el backend.';
    errEl.style.display = 'flex';
  }
}

function logout() {
  if (session) {
    fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${session.token}` }
    }).catch(() => {});
  }
  session = null;
  localStorage.removeItem('mesweets_session');
  updateNavUI();
  document.getElementById('mis-pedidos').style.display = 'none';
  showToast('Sesión cerrada', 'info');
}

function updateNavUI() {
  const actionsEl = document.getElementById('nav-actions');
  const userEl    = document.getElementById('nav-user');
  const userNameEl= document.getElementById('nav-user-name');
  const misPedEl  = document.getElementById('nav-mis-pedidos');

  if (session) {
    actionsEl.style.display = 'none';
    userEl.style.display    = 'flex';
    userNameEl.textContent  = `Hola, ${session.nombre}`;
    if (misPedEl) misPedEl.style.display = 'block';
  } else {
    actionsEl.style.display = 'flex';
    userEl.style.display    = 'none';
    if (misPedEl) misPedEl.style.display = 'none';
  }
}

// Cerrar modal al hacer clic fuera
document.getElementById('modal-auth').addEventListener('click', function(e) {
  if (e.target === this) closeAuthModal();
});

// ─── TOAST ────────────────────────────────────────────────────────────────────
function showToast(msg, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  const icons = { success: '✅', error: '❌', info: '🍰' };
  toast.className = `toast toast-${type === 'error' ? 'error' : type === 'success' ? 'success' : 'info'}`;
  toast.innerHTML = `<span>${icons[type] || '•'}</span><span>${escHtml(msg)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// ─── ESCAPE HTML ──────────────────────────────────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── DESPLAZAMIENTO SUAVE CON OFFSET DE HEADER ────────────────────────────────
function irA(sel) {
  const el = document.querySelector(sel);
  if (!el) return;
  const headerOffset = 75;
  const elementPosition = el.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}
window.irA = irA;
window.scrollToSection = irA;

