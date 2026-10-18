// =============================================================================
// M&E SWEETS — admin.js (Panel Administrador)
// =============================================================================

const API = 'https://mesweets-backend.onrender.com/api';
let adminSession = JSON.parse(localStorage.getItem('mesweets_session') || 'null');
let currentPage  = 'dashboard';

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (adminSession && adminSession.rol_id == 1) {
    showAdminUI();
  }
  // Si el usuario ya está logueado, mostrar layout directamente
});

// ─── LOGIN ADMIN ──────────────────────────────────────────────────────────────
async function doAdminLogin() {
  const email    = document.getElementById('admin-email').value.trim();
  const password = document.getElementById('admin-pass').value;
  const errEl    = document.getElementById('login-admin-error');
  errEl.style.display = 'none';

  if (!email || !password) {
    errEl.textContent = 'Completa todos los campos';
    errEl.style.display = 'flex'; return;
  }

  try {
    const r = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const d = await r.json();

    if (!r.ok) {
      errEl.textContent = d.error || 'Credenciales incorrectas';
      errEl.style.display = 'flex'; return;
    }

    if (d.rol_id != 1) {
      errEl.textContent = 'Acceso solo para administradores';
      errEl.style.display = 'flex'; return;
    }

    adminSession = d;
    localStorage.setItem('mesweets_session', JSON.stringify(d));
    showAdminUI();
  } catch(e) {
    errEl.textContent = 'Error de conexión con el servidor';
    errEl.style.display = 'flex';
  }
}

function showAdminUI() {
  document.getElementById('login-overlay').style.display = 'none';
  document.getElementById('admin-layout').style.display  = 'flex';
  document.getElementById('admin-name-display').textContent =
    adminSession?.nombre ? `Admin: ${adminSession.nombre}` : '';
  loadDashboard();
}

function adminLogout() {
  if (adminSession) {
    fetch(`${API}/auth/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminSession.token}` }
    }).catch(() => {});
  }
  localStorage.removeItem('mesweets_session');
  adminSession = null;
  document.getElementById('login-overlay').style.display = 'flex';
  document.getElementById('admin-layout').style.display  = 'none';
}

// ─── NAVEGACIÓN DE PÁGINAS ────────────────────────────────────────────────────
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById(`page-${page}`).classList.add('active');
  document.getElementById(`nav-${page}`)?.classList.add('active');
  document.getElementById('page-title').textContent = pageTitles[page] || page;
  currentPage = page;

  // Cerrar sidebar en móvil
  document.getElementById('sidebar').classList.remove('open');

  // Cargar datos de la página
  switch(page) {
    case 'dashboard':    loadDashboard();       break;
    case 'pedidos':      loadPedidosAdmin();    break;
    case 'ingredientes': loadIngredientes();    break;
    case 'licores':      loadLicores();         break;
    case 'productos':    loadProductos();       break;
    case 'movimientos':  loadMovimientos();     break;
    case 'clientes':     loadClientes();        break;
    case 'reportes':     loadReportes();        break;
    case 'configuracion': loadConfiguracion();  break;
  }
}

const pageTitles = {
  dashboard:'Dashboard', pedidos:'Pedidos', ingredientes:'Ingredientes',
  licores:'Licores', productos:'Bases & Coberturas', movimientos:'Historial Inventario',
  clientes:'Clientes', reportes:'Reportes', configuracion:'Configuración del Sistema'
};

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ─── HELPER API ───────────────────────────────────────────────────────────────
let isHandlingExpiration = false;
function handleSessionExpired() {
  if (isHandlingExpiration) return;
  isHandlingExpiration = true;
  localStorage.removeItem('mesweets_session');
  adminSession = null;
  const overlay = document.getElementById('login-overlay');
  const layout  = document.getElementById('admin-layout');
  const errEl   = document.getElementById('login-admin-error');
  if (overlay && layout) {
    overlay.style.display = 'flex';
    layout.style.display  = 'none';
    if (errEl) {
      errEl.textContent = 'Tu sesión ha expirado o se renovó. Por favor ingresa tu contraseña nuevamente.';
      errEl.style.display = 'flex';
    }
  }
  setTimeout(() => { isHandlingExpiration = false; }, 1500);
}

async function apiGet(endpoint) {
  const r = await fetch(`${API}${endpoint}`, {
    headers: { 'Authorization': `Bearer ${adminSession?.token}` }
  });
  if (r.status === 401 || r.status === 403) {
    handleSessionExpired();
    throw new Error('Sesión expirada. Por favor ingresa de nuevo.');
  }
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

async function apiPost(endpoint, body) {
  const r = await fetch(`${API}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminSession?.token}` },
    body: JSON.stringify(body)
  });
  if (r.status === 401 || r.status === 403) {
    handleSessionExpired();
    return { ok: false, data: { error: 'Sesión expirada' } };
  }
  return { ok: r.ok, data: await r.json() };
}

async function apiPut(endpoint, body) {
  const r = await fetch(`${API}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminSession?.token}` },
    body: JSON.stringify(body)
  });
  if (r.status === 401 || r.status === 403) {
    handleSessionExpired();
    return { ok: false, data: { error: 'Sesión expirada' } };
  }
  return { ok: r.ok, data: await r.json() };
}

async function apiDelete(endpoint) {
  const r = await fetch(`${API}${endpoint}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${adminSession?.token}` }
  });
  if (r.status === 401 || r.status === 403) {
    handleSessionExpired();
    return { ok: false, data: { error: 'Sesión expirada' } };
  }
  return { ok: r.ok, data: await r.json() };
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
async function loadDashboard() {
  // Cargar pedidos recientes
  loadPedidosRecientes();
  // Cargar alertas de stock
  loadAlertasStock();
  // Cargar estadísticas
  loadStats();
  // Cargar gráfico ingresos
  loadChartIngresos();
}

async function loadStats() {
  try {
    const [pedidosRes, clientesRes, criticosRes] = await Promise.allSettled([
      apiGet('/admin/pedidos'),
      apiGet('/admin/clientes'),
      apiGet('/admin/reportes/insumos-criticos')
    ]);

    const pedidos  = pedidosRes.status  === 'fulfilled' && Array.isArray(pedidosRes.value) ? pedidosRes.value : [];
    const clientes = clientesRes.status === 'fulfilled' && Array.isArray(clientesRes.value) ? clientesRes.value : [];
    const criticos = criticosRes.status === 'fulfilled' && criticosRes.value ? criticosRes.value : { ingredientes:[], licores:[] };

    // Fecha local real (evita desfase UTC en Ecuador UTC-5)
    const _now = new Date();
    const hoy = `${_now.getFullYear()}-${String(_now.getMonth() + 1).padStart(2, '0')}-${String(_now.getDate()).padStart(2, '0')}`;
    const pedidosHoy = pedidos.filter(p => p.fecha_pedido?.startsWith(hoy));
    const ingresosHoy = pedidosHoy
      .filter(p => p.estado !== 'cancelado')
      .reduce((s, p) => s + parseFloat(p.precio_total||0), 0);
    const pendientes = pedidos.filter(p => p.estado === 'pendiente');

    if (document.getElementById('stat-pedidos-hoy')) {
      document.getElementById('stat-pedidos-hoy').textContent  = pedidosHoy.length;
    }
    if (document.getElementById('stat-ingresos-hoy')) {
      document.getElementById('stat-ingresos-hoy').textContent = '$' + ingresosHoy.toFixed(2);
    }
    if (document.getElementById('stat-clientes')) {
      document.getElementById('stat-clientes').textContent     = clientes.length;
    }

    const totalAlertas = (criticos.ingredientes?.length || 0) + (criticos.licores?.length || 0);
    if (document.getElementById('stat-alertas')) {
      document.getElementById('stat-alertas').textContent = totalAlertas;
    }

    // Badge pedidos pendientes
    if (document.getElementById('badge-pedidos')) {
      document.getElementById('badge-pedidos').textContent = pendientes.length;
    }
  } catch(e) { console.error('loadStats', e); }
}

async function loadPedidosRecientes() {
  const el = document.getElementById('pedidos-recientes-list');
  try {
    const data = await apiGet('/admin/pedidos');
    const recientes = data.slice(0, 5);
    const estadoColor = { pendiente:'#FFF3CD',en_preparacion:'#CCE5FF',en_camino:'#D4EDDA',entregado:'#D4EDDA',cancelado:'#F8D7DA' };
    const estadoTxt   = { pendiente:'#856404',en_preparacion:'#004085',en_camino:'#155724',entregado:'#155724',cancelado:'#721c24' };
    el.innerHTML = recientes.map(p => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-3) 0;border-bottom:1px solid var(--color-gray-100)">
        <div>
          <div style="font-weight:600;font-size:var(--font-size-sm)">#${p.id} — ${escH(p.cliente)}</div>
          <div style="font-size:11px;color:var(--color-gray-400)">${p.porciones} porc. • ${escH(p.base||'—')}</div>
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-2)">
          <span style="font-weight:700;font-size:var(--font-size-sm);color:var(--color-terracotta)">$${parseFloat(p.precio_total||0).toFixed(2)}</span>
          <span style="background:${estadoColor[p.estado]||'#eee'};color:${estadoTxt[p.estado]||'#333'};padding:2px 8px;border-radius:12px;font-size:10px;font-weight:600">
            ${p.estado}
          </span>
        </div>
      </div>`).join('') || '<p style="color:var(--color-gray-400);font-size:var(--font-size-sm)">Sin pedidos recientes</p>';
  } catch(e) { el.innerHTML = '<p style="color:var(--color-danger)">Error cargando</p>'; }
}

async function loadAlertasStock() {
  const el = document.getElementById('alertas-stock-list');
  try {
    const d = await apiGet('/admin/reportes/insumos-criticos');
    const items = [...(d.ingredientes||[]), ...(d.licores||[])];
    if (!items.length) {
      el.innerHTML = `
        <div style="text-align:center;padding:var(--space-6);color:var(--color-gray-500)">
          <div style="font-size:24px;margin-bottom:6px">✨</div>
          <div style="font-weight:600;color:var(--color-chocolate)">¡Todo el stock en niveles óptimos!</div>
          <p style="font-size:12px;margin-top:4px">No hay ingredientes ni licores por debajo del mínimo.</p>
        </div>`;
      return;
    }
    let html = '';
    items.slice(0, 8).forEach(item => {
      const stock = parseFloat(item.stock_actual != null ? item.stock_actual : item.stock_ml) || 0;
      const min   = parseFloat(item.stock_minimo != null ? item.stock_minimo : item.stock_minimo_ml) || 0;
      const es_sin = stock === 0;
      html += `
        <div class="alerta-stock-row ${es_sin ? 'alerta-sin-stock' : ''}">
          <div>
            <strong style="font-size:var(--font-size-sm)">${escH(item.nombre)}</strong>
            <div style="font-size:11px">${es_sin ? '⛔ Sin stock' : '⚠️ Stock bajo'} (${escH(item.proveedor || 'Local')})</div>
          </div>
          <div style="text-align:right;font-size:var(--font-size-sm)">
            <div style="font-weight:700">${stock} ${item.unidad_medida || 'ml'}</div>
            <div style="font-size:10px;color:var(--color-gray-600)">mín: ${min}</div>
          </div>
        </div>`;
    });
    el.innerHTML = html;
  } catch(e) { el.innerHTML = '<p style="color:var(--color-gray-500);font-size:var(--font-size-sm);padding:var(--space-4)">No se pudieron cargar las alertas.</p>'; }
}

async function loadChartIngresos() {
  const chartEl  = document.getElementById('chart-ingresos');
  const labelsEl = document.getElementById('chart-labels');
  try {
    const data = await apiGet('/admin/reportes/ingresos?periodo=dia');
    const last7 = data.slice(0, 7).reverse();
    if (!last7.length) { chartEl.innerHTML = '<p style="color:var(--color-gray-400)">Sin datos</p>'; return; }

    const max = Math.max(...last7.map(d => parseFloat(d.ingresos||0)));
    chartEl.innerHTML = last7.map(d => {
      const h = max > 0 ? Math.max(4, (parseFloat(d.ingresos||0) / max) * 100) : 4;
      return `<div class="mini-bar" style="height:${h}%" title="$${parseFloat(d.ingresos).toFixed(2)}"></div>`;
    }).join('');

    labelsEl.style.cssText = 'display:flex;gap:6px;font-size:9px;color:var(--color-gray-400)';
    labelsEl.innerHTML = last7.map(d => {
      let fecha = '—';
      if (d.periodo) {
        const parts = String(d.periodo).split('T')[0].split('-');
        fecha = parts.length === 3 ? `${parts[2]}/${parts[1]}` : d.periodo;
      }
      return `<div style="flex:1;text-align:center">${fecha}</div>`;
    }).join('');
  } catch(e) { chartEl.innerHTML = '<p style="color:var(--color-gray-400);font-size:var(--font-size-sm)">Gráfico no disponible</p>'; }
}

// ─── PEDIDOS ──────────────────────────────────────────────────────────────────
async function loadPedidosAdmin() {
  const estado = document.getElementById('filtro-estado')?.value || '';
  const fecha  = document.getElementById('filtro-fecha')?.value  || '';
  const tbody  = document.getElementById('tabla-pedidos');
  tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:40px"><div class="spinner" style="margin:auto"></div></td></tr>';

  try {
    let url = '/admin/pedidos';
    const params = [];
    if (estado) params.push(`estado=${estado}`);
    if (fecha)  params.push(`fecha=${fecha}`);
    if (params.length) url += '?' + params.join('&');

    const data = await apiGet(url);
    const estadoColor = { pendiente:'#856404',en_preparacion:'#004085',en_camino:'#155724',entregado:'#155724',cancelado:'#721c24' };
    const estadoBg    = { pendiente:'#FFF3CD',en_preparacion:'#CCE5FF',en_camino:'#D4EDDA',entregado:'#D4EDDA',cancelado:'#F8D7DA' };

    tbody.innerHTML = data.map(p => {
      const esTorta = (p.tipo_postre || '').toLowerCase().includes('torta') || p.tipo_empaque === 'torta_completa';
      const formatoIcon = esTorta ? '🎂' : ((p.tipo_postre || '').toLowerCase().includes('cupcake') ? '🧁' : ((p.tipo_postre || '').toLowerCase().includes('shot') ? '🍮' : '📦'));
      const formatoTxt = esTorta ? 'Torta Completa' : (p.tipo_postre || 'Porciones');
      const empaqueTxt = p.tipo_empaque === 'torta_completa' ? 'Caja de Torta' : 'Envases ind.';
      const empaqueBadgeBg = p.tipo_empaque === 'torta_completa' ? 'var(--color-dorado-pale)' : 'var(--color-gray-100)';
      
      const licorBadge = p.licor 
        ? `<div style="font-weight:600;color:var(--color-terracotta);font-size:12px">🥃 ${escH(p.licor)}</div>` 
        : `<span style="color:var(--color-gray-400);font-size:11px">🚫 Sin alcohol</span>`;

      const frutaBadge = (p.fruta && p.fruta !== 'Sin fruta') 
        ? `<div style="font-weight:600;color:#2E7D32;font-size:12px">🍓 ${escH(p.fruta)}</div>` 
        : `<span style="color:var(--color-gray-400);font-size:11px">Sin fruta</span>`;

      const direccionTxt = p.direccion_entrega 
        ? `<div style="font-size:11px;color:var(--color-gray-700);line-height:1.3" title="${escH(p.direccion_entrega)}">📍 ${escH(p.direccion_entrega)}</div>` 
        : `<span style="font-size:11px;color:var(--color-gray-400)">Retiro local</span>`;

      const notasTxt = p.notas_cliente 
        ? `<div style="font-size:10px;color:var(--color-terracotta);font-style:italic;margin-top:2px" title="${escH(p.notas_cliente)}">💬 "${escH(p.notas_cliente)}"</div>` 
        : '';

      return `
      <tr>
        <td><strong>#${p.id}</strong></td>
        <td>
          <div style="font-weight:600;color:var(--color-chocolate)">${escH(p.cliente)}</div>
          <div style="font-size:11px;color:var(--color-gray-500)">✉️ ${escH(p.cliente_email)}</div>
          ${p.cliente_telefono ? `<div style="font-size:11px;color:var(--color-gray-600)">📞 ${escH(p.cliente_telefono)}</div>` : ''}
        </td>
        <td>
          <div style="font-weight:600;font-size:12px">${formatoIcon} ${escH(formatoTxt)}</div>
          <span style="font-size:10px;display:inline-block;padding:1px 7px;border-radius:10px;background:${empaqueBadgeBg};color:var(--color-chocolate);font-weight:600;margin-top:2px">
            ${empaqueTxt}
          </span>
        </td>
        <td>
          <div style="font-weight:600;font-size:12px;color:var(--color-chocolate)">🍰 Tres Leches</div>
          <div style="font-size:10px;color:var(--color-gray-500)">Artesanal Húmeda</div>
        </td>
        <td>
          <div style="font-weight:500;font-size:12px">🍯 ${escH(p.cobertura||'—')}</div>
        </td>
        <td>${licorBadge}</td>
        <td>${frutaBadge}</td>
        <td>
          ${direccionTxt}
          ${notasTxt}
        </td>
        <td style="text-align:center;font-weight:700;font-size:13px">${p.porciones}</td>
        <td style="font-weight:700;color:var(--color-terracotta);font-size:13px">$${parseFloat(p.precio_total||0).toFixed(2)}</td>
        <td style="text-align:center">
          <span style="background:${estadoBg[p.estado]||'#eee'};color:${estadoColor[p.estado]||'#333'};
                       padding:3px 9px;border-radius:12px;font-size:11px;font-weight:600;white-space:nowrap;display:inline-block">
            ${p.estado}
          </span>
        </td>
        <td style="font-size:11px;color:var(--color-gray-600);white-space:nowrap">${formatFecha(p.fecha_pedido)}</td>
        <td class="col-acciones">
          <div style="display:flex;gap:4px;justify-content:center;align-items:center">
            <button class="btn btn-sm btn-ghost" title="Ver detalle completo" style="padding:4px 7px;font-size:11px" onclick="verDetallePedido(${p.id})">👁 Ver</button>
            <button class="btn btn-sm btn-outline" title="Cambiar estado" style="padding:4px 7px;font-size:11px;border-color:var(--color-gray-300)" onclick="openEstadoPedido(${p.id},'${p.estado}')">✏️</button>
            <button class="btn btn-sm btn-gold" title="Generar orden producción taller" style="padding:4px 7px;font-size:11px" onclick="generarOrdenProd(${p.id})">🏭</button>
          </div>
        </td>
      </tr>`;
    }).join('') || '<tr><td colspan="13" style="text-align:center;color:var(--color-gray-400)">No hay pedidos</td></tr>';
  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="13" style="color:var(--color-danger)">${e.message}</td></tr>`;
  }
}

async function verDetallePedido(id) {
  const modal = document.getElementById('modal-detalle-pedido');
  const body  = document.getElementById('modal-dp-body');
  document.getElementById('modal-dp-title').textContent = `Detalle Pedido #${id}`;
  body.innerHTML = '<div class="flex-center"><div class="spinner"></div></div>';
  modal.classList.add('active');

  try {
    const p = await apiGet(`/pedidos/${id}`);
    const estadoColor = { pendiente:'#856404',en_preparacion:'#004085',en_camino:'#155724',entregado:'#155724',cancelado:'#721c24' };
    const estadoBg    = { pendiente:'#FFF3CD',en_preparacion:'#CCE5FF',en_camino:'#D4EDDA',entregado:'#D4EDDA',cancelado:'#F8D7DA' };

    body.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-bottom:var(--space-4)">
        <div>
          <div style="font-size:11px;color:var(--color-gray-400);margin-bottom:4px">CLIENTE &amp; CONTACTO</div>
          <strong style="font-size:15px;color:var(--color-chocolate)">${escH(p.cliente)}</strong><br>
          <span style="font-size:var(--font-size-sm)">✉️ ${escH(p.cliente_email)}</span><br>
          <span style="font-size:var(--font-size-sm)">📞 ${escH(p.cliente_telefono||'Sin teléfono registrado')}</span>
        </div>
        <div>
          <div style="font-size:11px;color:var(--color-gray-400);margin-bottom:4px">PEDIDO &amp; ESTADO</div>
          <strong style="font-size:15px">#${p.pedido_id}</strong>
          <span style="background:${estadoBg[p.estado]||'#eee'};color:${estadoColor[p.estado]||'#333'};padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;margin-left:8px">${p.estado}</span><br>
          <span style="font-size:var(--font-size-sm);color:var(--color-gray-600)">📅 ${formatFecha(p.fecha_pedido)}</span><br>
          <span style="font-size:11px;color:${p.stock_reservado ? '#2E7D32' : 'var(--color-gray-500)'}">
            ${p.stock_reservado ? '✓ Insumos descontados de inventario' : '⏳ Insumos pendientes de descuento (al cambiar a En Preparación)'}
          </span>
        </div>
      </div>
      <div style="background:var(--color-gray-50);border-radius:var(--radius-md);padding:var(--space-4);margin-bottom:var(--space-4);border:1px solid var(--color-gray-200)">
        <div style="font-size:11px;font-weight:700;color:var(--color-chocolate);margin-bottom:6px">DIRECCIÓN DE ENTREGA &amp; NOTAS</div>
        <div style="font-size:13px;color:var(--color-gray-800);margin-bottom:4px">
          📍 <strong>Dirección:</strong> ${escH(p.direccion_entrega || 'Retiro en local / Sin dirección especificada')}
        </div>
        ${p.notas_cliente ? `<div style="font-size:12px;color:var(--color-terracotta);font-style:italic">💬 <strong>Notas del cliente:</strong> "${escH(p.notas_cliente)}"</div>` : ''}
        ${p.notas_admin ? `<div style="font-size:12px;color:var(--color-chocolate);margin-top:4px">📝 <strong>Notas internas admin:</strong> ${escH(p.notas_admin)}</div>` : ''}
      </div>
      <div style="background:var(--color-gray-50);border-radius:var(--radius-md);padding:var(--space-4);margin-bottom:var(--space-4)">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);font-size:var(--font-size-sm)">
          <div><span style="color:var(--color-gray-400)">Formato:</span> <strong>${escH(p.tipo_postre||'—')}</strong></div>
          <div><span style="color:var(--color-gray-400)">Empaque:</span> <strong>${p.tipo_empaque === 'torta_completa' ? '🎂 Torta Completa en Caja' : '📦 Envases individuales'}</strong></div>
          <div><span style="color:var(--color-gray-400)">Base:</span> <strong>${escH(p.base||'—')}</strong></div>
          <div><span style="color:var(--color-gray-400)">Cobertura:</span> <strong>${escH(p.cobertura||'—')}</strong></div>
          <div><span style="color:var(--color-gray-400)">Licor:</span> <strong>${p.licor ? escH(p.licor) : 'Sin alcohol'}</strong></div>
          <div><span style="color:var(--color-gray-400)">Fruta:</span> <strong>${p.fruta ? escH(p.fruta) : 'Sin fruta'}</strong></div>
          <div><span style="color:var(--color-gray-400)">Porciones:</span> <strong>${p.porciones} porciones</strong></div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;background:var(--color-dorado-pale);padding:var(--space-4);border-radius:var(--radius-md)">
        <span style="font-weight:600">Total a Pagar</span>
        <span style="font-family:var(--font-display);font-size:var(--font-size-2xl);color:var(--color-terracotta);font-weight:700">
          $${parseFloat(p.precio_total||0).toFixed(2)}
        </span>
      </div>`;
  } catch(e) {
    body.innerHTML = `<p style="color:var(--color-danger)">${e.message}</p>`;
  }
}

function openEstadoPedido(id, estadoActual) {
  document.getElementById('ep-pedido-id').value = id;
  document.getElementById('ep-nuevo-estado').value = estadoActual;
  document.getElementById('ep-notas').value = '';
  openModal('modal-estado-pedido');
}

async function saveEstadoPedido() {
  const id    = document.getElementById('ep-pedido-id').value;
  const estado = document.getElementById('ep-nuevo-estado').value;
  const notas  = document.getElementById('ep-notas').value;
  const { ok, data } = await apiPut(`/admin/pedidos/${id}/estado`, { estado, notas });
  if (ok) {
    showToast('Estado actualizado', 'success');
    closeModal('modal-estado-pedido');
    loadPedidosAdmin();
  } else {
    showToast(data.error || 'Error', 'error');
  }
}

async function generarOrdenProd(id) {
  if (!confirm(`¿Generar orden de producción para pedido #${id}?`)) return;
  try {
    const { ok, data } = await apiPost(`/admin/pedidos/${id}/orden-produccion`, {});
    if (ok) {
      showToast(`Orden #${data.op_id} generada. Estado actualizado a En Preparación.`, 'success');
      verDetalleOrden(data);
      loadPedidosAdmin();
    } else {
      showToast(data.error || 'Error', 'error');
    }
  } catch(e) { showToast('Error: ' + e.message, 'error'); }
}

function verDetalleOrden(data) {
  const modal = document.getElementById('modal-detalle-pedido');
  const body  = document.getElementById('modal-dp-body');
  document.getElementById('modal-dp-title').textContent = `Orden de Producción #${data.op_id}`;
  const op = data.orden || {};
  const det = (typeof op.detalles_json === 'object') ? op.detalles_json : {};
  body.innerHTML = `
    <div class="op-card">
      <div class="op-header">
        <div>
          <h3 style="font-family:var(--font-display);color:var(--color-chocolate)">🏭 Ficha de Producción</h3>
          <p style="font-size:var(--font-size-sm);color:var(--color-gray-600)">Orden #${data.op_id} — Pedido #${op.pedido_id||''}</p>
        </div>
        <span class="badge badge-warning">${op.estado||'pendiente'}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);font-size:var(--font-size-sm);margin-bottom:var(--space-4)">
        <div><strong>Tipo:</strong> ${escH(det.tipo_postre||'—')}</div>
        <div><strong>Base:</strong> ${escH(det.base||'—')}</div>
        <div><strong>Cobertura:</strong> ${escH(det.cobertura||'—')}</div>
        <div><strong>Licor:</strong> ${escH(det.licor||'Sin alcohol')}</div>
        <div><strong>Porciones:</strong> ${det.porciones||0}</div>
        <div><strong>ml licor total:</strong> ${det.ml_licor_total||0} ml</div>
        <div><strong>ml por porción:</strong> ${det.ml_licor_porcion||0} ml</div>
      </div>
      <div style="background:var(--color-info-bg);border-radius:var(--radius-md);padding:var(--space-4);font-size:var(--font-size-sm)">
        <strong>🔬 Técnica:</strong> ${escH(det.tecnica||op.tecnica_impreg||'—')}
      </div>
      ${det.ingredientes ? `
      <div style="margin-top:var(--space-4)">
        <strong style="font-size:var(--font-size-sm)">📋 Ingredientes requeridos:</strong>
        <div class="op-ingredientes">
          ${det.ingredientes.map(i => `
            <div class="op-ingr-item">
              ${escH(i.nombre)}: <strong>${i.cantidad_g||i.cantidad_ml||i.cantidad_unidad} ${i.cantidad_g?'g':i.cantidad_ml?'ml':'u'}</strong>
            </div>`).join('')}
        </div>
      </div>` : ''}
    </div>`;
  modal.classList.add('active');
}

// ─── INGREDIENTES ─────────────────────────────────────────────────────────────
let allIngredientes = [];

async function loadIngredientes() {
  const tbody = document.getElementById('tabla-ingredientes');
  tbody.innerHTML = '<tr><td colspan="10" style="text-align:center"><div class="spinner" style="margin:auto;margin-top:20px"></div></td></tr>';
  try {
    const data = await apiGet('/admin/ingredientes');
    allIngredientes = data || [];
    const query = document.getElementById('buscar-ingrediente')?.value || '';
    filtrarIngredientes(query);
  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="10" style="color:var(--color-danger)">${e.message}</td></tr>`;
  }
}

function renderTablaIngredientes(lista) {
  const tbody = document.getElementById('tabla-ingredientes');
  const contador = document.getElementById('contador-ingredientes');
  if (contador) {
    contador.textContent = `${lista.length} de ${allIngredientes.length} ingredientes`;
  }
  const estadoClass = { NORMAL:'badge-success', STOCK_BAJO:'badge-warning', SIN_STOCK:'badge-danger' };

  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:var(--space-8);color:var(--color-gray-400)">🔍 No se encontraron ingredientes que coincidan con la búsqueda</td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(i => `
    <tr>
      <td><strong>${escH(i.nombre)}</strong></td>
      <td>${i.unidad_medida}</td>
      <td style="font-weight:600">${parseFloat(i.stock_actual||0).toFixed(1)}</td>
      <td>${parseFloat(i.stock_minimo||0).toFixed(1)}</td>
      <td><span class="badge ${estadoClass[i.estado_stock]||'badge-info'}">${i.estado_stock||'—'}</span></td>
      <td>$${parseFloat(i.precio_unitario||0).toFixed(4)}</td>
      <td style="font-size:11px">${i.fecha_caducidad||'—'}</td>
      <td style="font-size:11px">${escH(i.lote||'—')}</td>
      <td style="font-size:11px">${escH(i.proveedor_nombre||'—')}</td>
      <td>
        <div style="display:flex;gap:4px">
          <button class="btn btn-sm btn-ghost" onclick="editIngrediente(${JSON.stringify(i).replace(/"/g,'&quot;')})">✏️</button>
          <button class="btn btn-sm btn-ghost" style="color:var(--color-danger)" onclick="deleteIngrediente(${i.id},'${escH(i.nombre)}')">🗑</button>
        </div>
      </td>
    </tr>`).join('');
}

function filtrarIngredientes(query) {
  const q = (query || '').toLowerCase().trim();
  const btnLimpiar = document.getElementById('btn-limpiar-ingr');
  if (btnLimpiar) btnLimpiar.style.display = q ? 'block' : 'none';

  if (!q) {
    renderTablaIngredientes(allIngredientes);
    return;
  }

  const filtrados = allIngredientes.filter(i =>
    (i.nombre || '').toLowerCase().includes(q) ||
    (i.lote || '').toLowerCase().includes(q) ||
    (i.proveedor_nombre || '').toLowerCase().includes(q) ||
    (i.unidad_medida || '').toLowerCase().includes(q) ||
    (i.estado_stock || '').toLowerCase().includes(q)
  );
  renderTablaIngredientes(filtrados);
}
window.filtrarIngredientes = filtrarIngredientes;

function limpiarBusquedaIngredientes() {
  const input = document.getElementById('buscar-ingrediente');
  if (input) input.value = '';
  filtrarIngredientes('');
}
window.limpiarBusquedaIngredientes = limpiarBusquedaIngredientes;

function openModalIngrediente(data) {
  clearForm(['ingr-id','ingr-nombre','ingr-precio','ingr-stock','ingr-stock-min',
             'ingr-f-ingreso','ingr-f-cad','ingr-lote','ingr-notas']);
  document.getElementById('ingr-unidad').value = 'g';
  document.getElementById('modal-ingr-title').textContent = 'Nuevo Ingrediente';
  openModal('modal-ingrediente');
}

function editIngrediente(i) {
  document.getElementById('ingr-id').value        = i.id;
  document.getElementById('ingr-nombre').value    = i.nombre || '';
  document.getElementById('ingr-unidad').value    = i.unidad_medida || 'g';
  document.getElementById('ingr-precio').value    = i.precio_unitario || '';
  document.getElementById('ingr-stock').value     = i.stock_actual || '';
  document.getElementById('ingr-stock-min').value = i.stock_minimo || '';
  document.getElementById('ingr-f-ingreso').value = i.fecha_ingreso || '';
  document.getElementById('ingr-f-cad').value     = i.fecha_caducidad || '';
  document.getElementById('ingr-lote').value      = i.lote || '';
  document.getElementById('ingr-notas').value     = i.notas || '';
  document.getElementById('modal-ingr-title').textContent = 'Editar Ingrediente';
  openModal('modal-ingrediente');
}

async function saveIngrediente() {
  const id     = document.getElementById('ingr-id').value;
  const nombre = document.getElementById('ingr-nombre').value.trim();
  if (!nombre) { showToast('El nombre es requerido', 'error'); return; }

  const body = {
    nombre,
    unidad_medida:    document.getElementById('ingr-unidad').value,
    precio_unitario:  parseFloat(document.getElementById('ingr-precio').value) || 0,
    stock_actual:     parseFloat(document.getElementById('ingr-stock').value) || 0,
    stock_minimo:     parseFloat(document.getElementById('ingr-stock-min').value) || 0,
    fecha_ingreso:    document.getElementById('ingr-f-ingreso').value || null,
    fecha_caducidad:  document.getElementById('ingr-f-cad').value || null,
    lote:             document.getElementById('ingr-lote').value || '',
    notas:            document.getElementById('ingr-notas').value || ''
  };

  const { ok, data } = id
    ? await apiPut(`/admin/ingredientes/${id}`, body)
    : await apiPost('/admin/ingredientes', body);

  if (ok) {
    showToast(id ? 'Ingrediente actualizado' : 'Ingrediente creado', 'success');
    closeModal('modal-ingrediente');
    loadIngredientes();
  } else {
    showToast(data.error || 'Error al guardar', 'error');
  }
}

async function deleteIngrediente(id, nombre) {
  if (!confirm(`¿Desactivar ingrediente "${nombre}"?`)) return;
  const { ok, data } = await apiDelete(`/admin/ingredientes/${id}`);
  if (ok) { showToast('Ingrediente desactivado', 'success'); loadIngredientes(); }
  else showToast(data.error || 'Error', 'error');
}

// ─── LICORES ──────────────────────────────────────────────────────────────────
let allLicores = [];

async function loadLicores() {
  const tbody = document.getElementById('tabla-licores');
  tbody.innerHTML = '<tr><td colspan="9" style="text-align:center"><div class="spinner" style="margin:auto;margin-top:20px"></div></td></tr>';
  try {
    const data = await apiGet('/admin/licores');
    allLicores = data || [];
    const query = document.getElementById('buscar-licor')?.value || '';
    filtrarLicores(query);
  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="9" style="color:var(--color-danger)">${e.message}</td></tr>`;
  }
}

function renderTablaLicores(lista) {
  const tbody = document.getElementById('tabla-licores');
  const contador = document.getElementById('contador-licores');
  if (contador) {
    contador.textContent = `${lista.length} de ${allLicores.length} licores`;
  }
  const estadoClass = { NORMAL:'badge-success', STOCK_BAJO:'badge-warning', SIN_STOCK:'badge-danger' };

  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:var(--space-8);color:var(--color-gray-400)">🔍 No se encontraron licores que coincidan con la búsqueda</td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(l => `
    <tr>
      <td><strong>${escH(l.nombre)}</strong></td>
      <td>${escH(l.tipo)}</td>
      <td>${parseFloat(l.grado_alcoholico||0).toFixed(1)}%</td>
      <td style="font-weight:600">${parseFloat(l.stock_ml||0).toFixed(0)} ml</td>
      <td>${parseFloat(l.stock_minimo_ml||0).toFixed(0)} ml</td>
      <td>${l.porciones_disponibles || 0}</td>
      <td><span class="badge ${estadoClass[l.estado_stock]||'badge-info'}">${l.estado_stock||'—'}</span></td>
      <td>$${parseFloat(l.precio_botella_750ml||0).toFixed(2)}</td>
      <td>
        <div style="display:flex;gap:4px">
          <button class="btn btn-sm btn-ghost" onclick="editLicor(${JSON.stringify(l).replace(/"/g,'&quot;')})">✏️</button>
          <button class="btn btn-sm btn-ghost" style="color:var(--color-danger)" onclick="deleteLicor(${l.id},'${escH(l.nombre)}')">🗑</button>
        </div>
      </td>
    </tr>`).join('');
}

function filtrarLicores(query) {
  const q = (query || '').toLowerCase().trim();
  const btnLimpiar = document.getElementById('btn-limpiar-licor');
  if (btnLimpiar) btnLimpiar.style.display = q ? 'block' : 'none';

  if (!q) {
    renderTablaLicores(allLicores);
    return;
  }

  const filtrados = allLicores.filter(l =>
    (l.nombre || '').toLowerCase().includes(q) ||
    (l.tipo || '').toLowerCase().includes(q) ||
    (l.estado_stock || '').toLowerCase().includes(q)
  );
  renderTablaLicores(filtrados);
}
window.filtrarLicores = filtrarLicores;

function limpiarBusquedaLicores() {
  const input = document.getElementById('buscar-licor');
  if (input) input.value = '';
  filtrarLicores('');
}
window.limpiarBusquedaLicores = limpiarBusquedaLicores;

function openModalLicor() { clearForm(['licor-id','licor-nombre','licor-tipo','licor-grado','licor-stock','licor-stock-min','licor-precio']); openModal('modal-licor'); }
function editLicor(l) {
  document.getElementById('licor-id').value          = l.id;
  document.getElementById('licor-nombre').value      = l.nombre;
  document.getElementById('licor-tipo').value        = l.tipo;
  document.getElementById('licor-grado').value       = l.grado_alcoholico;
  document.getElementById('licor-stock').value       = l.stock_ml;
  document.getElementById('licor-stock-min').value   = l.stock_minimo_ml;
  document.getElementById('licor-precio').value      = l.precio_botella_750ml;
  document.getElementById('licor-ml-porcion').value  = l.ml_por_porcion;
  document.getElementById('modal-licor-title').textContent = 'Editar Licor';
  openModal('modal-licor');
}

async function saveLicor() {
  const id = document.getElementById('licor-id').value;
  const body = {
    nombre:               document.getElementById('licor-nombre').value.trim(),
    tipo:                 document.getElementById('licor-tipo').value.trim(),
    grado_alcoholico:     parseFloat(document.getElementById('licor-grado').value)||0,
    stock_ml:             parseFloat(document.getElementById('licor-stock').value)||0,
    stock_minimo_ml:      parseFloat(document.getElementById('licor-stock-min').value)||0,
    precio_botella_750ml: parseFloat(document.getElementById('licor-precio').value)||0,
    ml_por_porcion:       parseFloat(document.getElementById('licor-ml-porcion').value)||10,
  };
  const { ok, data } = id ? await apiPut(`/admin/licores/${id}`, body) : await apiPost('/admin/licores', body);
  if (ok) { showToast(id ? 'Licor actualizado' : 'Licor creado', 'success'); closeModal('modal-licor'); loadLicores(); }
  else showToast(data.error || 'Error', 'error');
}

async function deleteLicor(id, nombre) {
  if (!confirm(`¿Desactivar licor "${nombre}"?`)) return;
  const { ok } = await apiDelete(`/admin/licores/${id}`);
  if (ok) { showToast('Licor desactivado', 'success'); loadLicores(); }
}

// ─── BASES Y COBERTURAS ───────────────────────────────────────────────────────
async function loadProductos() {
  await Promise.all([loadBases(), loadCoberturas()]);
}

async function loadBases() {
  const tbody = document.getElementById('tabla-bases');
  try {
    const data = await apiGet('/admin/bases');
    tbody.innerHTML = data.map(b => `
      <tr>
        <td><strong>${escH(b.nombre)}</strong></td>
        <td style="font-weight:600">${b.stock_porciones}</td>
        <td>$${parseFloat(b.precio_venta_sugerido||0).toFixed(2)}</td>
        <td>${b.activo=='1'?'<span class="badge badge-success">Activo</span>':'<span class="badge badge-danger">Inactivo</span>'}</td>
        <td>
          <button class="btn btn-sm btn-ghost" onclick="editBase(${JSON.stringify(b).replace(/"/g,'&quot;')})">✏️</button>
        </td>
      </tr>`).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--color-gray-400)">Sin bases</td></tr>';
  } catch(e) { tbody.innerHTML = `<tr><td colspan="5">${e.message}</td></tr>`; }
}

async function loadCoberturas() {
  const tbody = document.getElementById('tabla-coberturas');
  try {
    const data = await apiGet('/admin/coberturas');
    tbody.innerHTML = data.map(c => `
      <tr>
        <td><strong>${escH(c.nombre)}</strong></td>
        <td style="font-weight:600">${parseFloat(c.stock_gramos||0).toFixed(0)} g</td>
        <td>$${parseFloat(c.precio_venta_sugerido||0).toFixed(2)}</td>
        <td>${c.activo=='1'?'<span class="badge badge-success">Activo</span>':'<span class="badge badge-danger">Inactivo</span>'}</td>
        <td>
          <button class="btn btn-sm btn-ghost" onclick="editCobertura(${JSON.stringify(c).replace(/"/g,'&quot;')})">✏️</button>
        </td>
      </tr>`).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--color-gray-400)">Sin coberturas</td></tr>';
  } catch(e) { tbody.innerHTML = `<tr><td colspan="5">${e.message}</td></tr>`; }
}

function openModalBase() { clearForm(['base-id','base-nombre','base-desc','base-costo','base-pvp','base-stock']); openModal('modal-base'); }
function editBase(b) {
  document.getElementById('base-id').value    = b.id;
  document.getElementById('base-nombre').value = b.nombre;
  document.getElementById('base-desc').value  = b.descripcion||'';
  document.getElementById('base-costo').value = b.costo_base;
  document.getElementById('base-pvp').value   = b.precio_venta_sugerido;
  document.getElementById('base-stock').value = b.stock_porciones;
  document.getElementById('modal-base-title').textContent = 'Editar Base';
  openModal('modal-base');
}
async function saveBase() {
  const id = document.getElementById('base-id').value;
  const body = {
    nombre:                document.getElementById('base-nombre').value.trim(),
    descripcion:           document.getElementById('base-desc').value,
    costo_base:            parseFloat(document.getElementById('base-costo').value)||0,
    precio_venta_sugerido: parseFloat(document.getElementById('base-pvp').value)||0,
    stock_porciones:       parseInt(document.getElementById('base-stock').value)||0,
    activo: 1
  };
  const { ok, data } = id ? await apiPut(`/admin/bases/${id}`, body) : await apiPost('/admin/bases', body);
  if (ok) { showToast('Base guardada', 'success'); closeModal('modal-base'); loadProductos(); }
  else showToast(data.error||'Error', 'error');
}

function openModalCobertura() { clearForm(['cob-id','cob-nombre','cob-desc','cob-costo','cob-pvp','cob-stock']); openModal('modal-cobertura'); }
function editCobertura(c) {
  document.getElementById('cob-id').value    = c.id;
  document.getElementById('cob-nombre').value = c.nombre;
  document.getElementById('cob-desc').value  = c.descripcion||'';
  document.getElementById('cob-costo').value = c.costo_base;
  document.getElementById('cob-pvp').value   = c.precio_venta_sugerido;
  document.getElementById('cob-stock').value = c.stock_gramos;
  document.getElementById('cob-gxp').value   = c.gramos_por_porcion;
  document.getElementById('modal-cob-title').textContent = 'Editar Cobertura';
  openModal('modal-cobertura');
}
async function saveCobertura() {
  const id = document.getElementById('cob-id').value;
  const body = {
    nombre:                document.getElementById('cob-nombre').value.trim(),
    descripcion:           document.getElementById('cob-desc').value,
    costo_base:            parseFloat(document.getElementById('cob-costo').value)||0,
    precio_venta_sugerido: parseFloat(document.getElementById('cob-pvp').value)||0,
    stock_gramos:          parseFloat(document.getElementById('cob-stock').value)||0,
    gramos_por_porcion:    parseFloat(document.getElementById('cob-gxp').value)||30,
    activo: 1
  };
  const { ok, data } = id ? await apiPut(`/admin/coberturas/${id}`, body) : await apiPost('/admin/coberturas', body);
  if (ok) { showToast('Cobertura guardada', 'success'); closeModal('modal-cobertura'); loadProductos(); }
  else showToast(data.error||'Error', 'error');
}

// ─── MOVIMIENTOS ──────────────────────────────────────────────────────────────
async function loadMovimientos() {
  const tbody = document.getElementById('tabla-movimientos');
  tbody.innerHTML = '<tr><td colspan="10" style="text-align:center"><div class="spinner" style="margin:auto;margin-top:20px"></div></td></tr>';
  try {
    const data = await apiGet('/admin/inventario/movimientos');
    const movColors = { entrada:'badge-success', salida:'badge-danger', ajuste:'badge-info', merma:'badge-warning', devolucion:'badge-gold' };
    tbody.innerHTML = data.map(m => `
      <tr>
        <td style="font-size:11px">${formatFecha(m.creado_en)}</td>
        <td>${m.tipo_recurso}</td>
        <td style="font-size:11px">#${m.recurso_id}</td>
        <td><span class="badge ${movColors[m.tipo_movimiento]||'badge-info'}">${m.tipo_movimiento}</span></td>
        <td style="font-weight:600">${parseFloat(m.cantidad||0).toFixed(2)}</td>
        <td>${parseFloat(m.cantidad_antes||0).toFixed(2)}</td>
        <td>${parseFloat(m.cantidad_despues||0).toFixed(2)}</td>
        <td>${m.pedido_id ? '#'+m.pedido_id : '—'}</td>
        <td style="font-size:11px">${escH(m.usuario_nombre||'—')}</td>
        <td style="font-size:11px;max-width:200px">${escH(m.motivo||'')}</td>
      </tr>`).join('') || '<tr><td colspan="10" style="text-align:center;color:var(--color-gray-400)">Sin movimientos</td></tr>';
  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="10" style="color:var(--color-danger)">${e.message}</td></tr>`;
  }
}

// ─── CLIENTES ─────────────────────────────────────────────────────────────────
async function loadClientes() {
  const tbody = document.getElementById('tabla-clientes');
  tbody.innerHTML = '<tr><td colspan="8" style="text-align:center"><div class="spinner" style="margin:auto;margin-top:20px"></div></td></tr>';
  try {
    const data = await apiGet('/admin/clientes');
    tbody.innerHTML = data.map(c => `
      <tr>
        <td><strong>${escH(c.nombre)} ${escH(c.apellido)}</strong></td>
        <td>${escH(c.email)}</td>
        <td>${escH(c.telefono||'—')}</td>
        <td style="font-size:11px">${c.fecha_nacimiento||'—'}</td>
        <td style="text-align:center;font-weight:600">${c.total_pedidos||0}</td>
        <td style="font-size:11px">${formatFecha(c.creado_en)}</td>
        <td>${c.activo=='1'?'<span class="badge badge-success">Activo</span>':'<span class="badge badge-danger">Inactivo</span>'}</td>
        <td>
          <div style="display:flex;gap:4px">
            <button class="btn btn-sm btn-ghost" onclick="verPedidosCliente(${c.id},'${escH(c.nombre+' '+c.apellido)}')">📦</button>
            <button class="btn btn-sm btn-ghost" style="color:${c.activo=='1'?'var(--color-danger)':'var(--color-success)'}"
                    onclick="toggleCliente(${c.id})">
              ${c.activo=='1'?'🚫':'✅'}
            </button>
          </div>
        </td>
      </tr>`).join('') || '<tr><td colspan="8" style="text-align:center;color:var(--color-gray-400)">Sin clientes</td></tr>';
  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="8" style="color:var(--color-danger)">${e.message}</td></tr>`;
  }
}

async function toggleCliente(id) {
  const { ok } = await apiPut(`/admin/clientes/${id}/toggle-activo`, {});
  if (ok) { showToast('Estado del cliente actualizado', 'success'); loadClientes(); }
}

async function verPedidosCliente(id, nombre) {
  const modal = document.getElementById('modal-detalle-pedido');
  const body  = document.getElementById('modal-dp-body');
  document.getElementById('modal-dp-title').textContent = `Pedidos de ${nombre}`;
  body.innerHTML = '<div class="flex-center"><div class="spinner"></div></div>';
  modal.classList.add('active');
  try {
    const data = await apiGet(`/admin/clientes/${id}/pedidos`);
    body.innerHTML = data.length ? data.map(p => `
      <div style="border-bottom:1px solid var(--color-gray-100);padding:var(--space-4) 0;display:flex;justify-content:space-between">
        <div>
          <div style="font-weight:600">#${p.pedido_id} — ${formatFecha(p.fecha_pedido)}</div>
          <div style="font-size:11px;color:var(--color-gray-400)">${p.base||'—'} + ${p.cobertura||'—'} × ${p.porciones}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700;color:var(--color-terracotta)">$${parseFloat(p.precio_total||0).toFixed(2)}</div>
          <div style="font-size:11px">${p.estado}</div>
        </div>
      </div>`).join('') : '<p style="color:var(--color-gray-400)">Sin pedidos</p>';
  } catch(e) { body.innerHTML = `<p>${e.message}</p>`; }
}

// ─── REPORTES ────────────────────────────────────────────────────────────────
async function loadReportes() {
  await Promise.all([loadRepCoberturas(), loadRepLicores(), loadRepCriticos(), loadReporteIngresos()]);
}

async function loadRepCoberturas() {
  const el = document.getElementById('rep-coberturas');
  try {
    const data = await apiGet('/admin/reportes/ventas-cobertura');
    el.innerHTML = data.map((r, i) => `
      <div style="margin-bottom:var(--space-3)">
        <div style="display:flex;justify-content:space-between;font-size:var(--font-size-sm);margin-bottom:4px">
          <span>${escH(r.cobertura)}</span>
          <strong>$${parseFloat(r.ingreso_total||0).toFixed(2)}</strong>
        </div>
        <div style="background:var(--color-gray-100);border-radius:4px;height:6px;overflow:hidden">
          <div style="height:100%;border-radius:4px;background:linear-gradient(90deg,var(--color-terracotta),var(--color-dorado));
                      width:${data[0]?.ingreso_total > 0 ? (parseFloat(r.ingreso_total||0)/parseFloat(data[0].ingreso_total)*100).toFixed(0) : 0}%">
          </div>
        </div>
        <div style="font-size:10px;color:var(--color-gray-400)">
          ${r.total_pedidos} pedidos • ${r.total_porciones} porciones
        </div>
      </div>`).join('') || '<p style="color:var(--color-gray-400)">Sin datos</p>';
  } catch(e) { el.innerHTML = `<p>${e.message}</p>`; }
}

async function loadRepLicores() {
  const el = document.getElementById('rep-licores');
  try {
    const data = await apiGet('/admin/reportes/ventas-licor');
    el.innerHTML = data.map(r => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-2) 0;
                  border-bottom:1px solid var(--color-gray-100);font-size:var(--font-size-sm)">
        <div>
          <div style="font-weight:600">${escH(r.licor)}</div>
          <div style="font-size:10px;color:var(--color-gray-400)">${r.total_pedidos} pedidos</div>
        </div>
        <strong style="color:var(--color-terracotta)">$${parseFloat(r.ingreso_total||0).toFixed(2)}</strong>
      </div>`).join('') || '<p style="color:var(--color-gray-400)">Sin datos</p>';
  } catch(e) { el.innerHTML = `<p>${e.message}</p>`; }
}

async function loadRepCriticos() {
  const el = document.getElementById('rep-criticos');
  try {
    const d = await apiGet('/admin/reportes/insumos-criticos');
    const all = [...(d.ingredientes||[]), ...(d.licores||[])];
    el.innerHTML = all.length ? all.map(i => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-2) 0;
                  border-bottom:1px solid var(--color-gray-100);font-size:var(--font-size-sm)">
        <div>
          <div style="font-weight:600">${escH(i.nombre)}</div>
          <span class="badge ${i.estado_stock==='SIN_STOCK'?'badge-danger':'badge-warning'}" style="font-size:9px">
            ${i.estado_stock}
          </span>
        </div>
        <div style="text-align:right;font-size:11px">
          Stock: ${i.stock_actual||i.stock_ml||0}
        </div>
      </div>`).join('')
      : '<p style="color:var(--color-success);font-size:var(--font-size-sm)">✅ Todo en orden</p>';
  } catch(e) { el.innerHTML = `<p>${e.message}</p>`; }
}

async function loadReporteIngresos() {
  const periodo = document.getElementById('periodo-select')?.value || 'mes';
  const tbody   = document.getElementById('tabla-ingresos');
  try {
    const data = await apiGet(`/admin/reportes/ingresos?periodo=${periodo}`);
    tbody.innerHTML = data.map(r => `
      <tr>
        <td style="font-weight:600">${r.periodo}</td>
        <td>${r.num_pedidos}</td>
        <td>${r.total_porciones}</td>
        <td style="font-weight:700;color:var(--color-terracotta)">$${parseFloat(r.ingresos||0).toFixed(2)}</td>
      </tr>`).join('') || '<tr><td colspan="4" style="text-align:center;color:var(--color-gray-400)">Sin datos</td></tr>';
  } catch(e) { tbody.innerHTML = `<tr><td colspan="4" style="color:var(--color-danger)">${e.message}</td></tr>`; }
}

// ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────
let configData = {};
async function loadConfiguracion() {
  const form = document.getElementById('config-form');
  try {
    const data = await apiGet('/admin/configuracion');
    configData = {};
    const editableKeys = [
      'precio_base_por_porcion','costo_operativo_porcion','max_porciones_pedido',
      'min_porciones_pedido','tiempo_preparacion_horas','costo_delivery',
      'nombre_negocio','slogan_negocio','telefono_contacto','email_contacto',
      'edad_minima_alcohol','instagram_url','nota_alcohol_dosificacion','delivery_disponible'
    ];
    data.forEach(c => { configData[c.clave] = c.valor; });
    form.innerHTML = data.filter(c => editableKeys.includes(c.clave)).map(c => `
      <div class="form-group">
        <label class="form-label">${escH(c.descripcion || c.clave)}</label>
        <input type="${c.tipo_dato==='numero'?'number':'text'}" id="cfg-${escH(c.clave)}"
               class="form-control" value="${escH(c.valor)}"
               step="${c.tipo_dato==='numero'?'0.01':''}">
      </div>`).join('');
    // Descripción extra
    form.innerHTML += `
      <div style="grid-column:1/-1">
        <div class="alert alert-info">
          ℹ️ Los cambios en configuración afectan el cálculo de precios y reglas del sistema en tiempo real.
        </div>
      </div>`;
  } catch(e) { form.innerHTML = `<p style="color:var(--color-danger)">${e.message}</p>`; }
}

async function saveConfig() {
  const body = {};
  Object.keys(configData).forEach(clave => {
    const el = document.getElementById(`cfg-${clave}`);
    if (el) body[clave] = el.value;
  });
  const { ok, data } = await apiPut('/admin/configuracion', body);
  if (ok) showToast('Configuración guardada', 'success');
  else showToast(data.error || 'Error', 'error');
}

// ─── HELPERS MODALES ──────────────────────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  const inp = document.getElementById(id).querySelector('input[type="hidden"]');
  if (inp) inp.value = '';
}

function clearForm(ids) { ids.forEach(id => { const el=document.getElementById(id); if(el) el.value=''; }); }

// Cerrar modales al hacer click fuera
document.querySelectorAll('.modal-backdrop').forEach(el => {
  el.addEventListener('click', function(e) { if(e.target===this) closeModal(this.id); });
});

// ─── TOAST ────────────────────────────────────────────────────────────────────
function showToast(msg, type='info', duration=3500) {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  const icons = { success:'✅', error:'❌', info:'ℹ️' };
  t.className = `toast toast-${type==='error'?'error':type==='success'?'success':'info'}`;
  t.innerHTML = `<span>${icons[type]||'•'}</span><span>${escH(msg)}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.classList.add('leaving'); setTimeout(()=>t.remove(),400); }, duration);
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function escH(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function formatFecha(str) {
  if (!str) return '—';
  try { return new Date(str).toLocaleDateString('es-ES',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}); }
  catch(e) { return str; }
}
