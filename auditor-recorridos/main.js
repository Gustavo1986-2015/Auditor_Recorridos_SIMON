const { app, BrowserWindow, dialog } = require('electron');
const https = require('https');

// ═══════════════════════════════════════════════════════
// URL sin refs/heads/ — formato correcto para raw
// ═══════════════════════════════════════════════════════
const LICENCIA_URL = 'https://raw.githubusercontent.com/Gustavo1986-2015/Auditor_Recorridos_SIMON/main/auditor-recorridos/licencia.json';

// ═══════════════════════════════════════════════════════
// false = si no hay internet, bloquea (más seguro)
// true  = si no hay internet, deja pasar
// ═══════════════════════════════════════════════════════
const PERMITIR_SIN_INTERNET = false;


function httpGet(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      // Sigue redirects automáticamente
      if (res.statusCode === 301 || res.statusCode === 302) {
        return httpGet(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(5000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function verificarLicencia() {
  try {
    const data = await httpGet(LICENCIA_URL);
    const json = JSON.parse(data);
    return json.estado === 'activo';
  } catch (err) {
    console.log('Error verificando licencia:', err.message);
    return PERMITIR_SIN_INTERNET;
  }
}

async function createWindow() {
  const autorizado = await verificarLicencia();

  if (!autorizado) {
    dialog.showErrorBox(
      'Acceso no autorizado',
      'Esta version ha sido desactivada.\nContacta al administrador.'
    );
    app.quit();
    return;
  }

  const win = new BrowserWindow({
    width: 1600,
    height: 1000,
    autoHideMenuBar: true,
    title: 'Auditor de Recorridos'
  });

  win.loadFile('public/GPS_Auditor_H.html');
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});