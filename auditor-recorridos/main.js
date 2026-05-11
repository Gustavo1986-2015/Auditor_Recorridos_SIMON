const { app, BrowserWindow, dialog } = require('electron');
const https = require('https');

const LICENCIA_URL = 'https://raw.githubusercontent.com/Gustavo1986-2015/Auditor_Recorridos_SIMON/main/auditor-recorridos/licencia.json';
const PERMITIR_SIN_INTERNET = false;

function httpGet(url) {
  return new Promise((resolve, reject) => {
    // Timestamp rompe el cache del CDN en cada consulta
    const urlFresh = url + '?t=' + Date.now();
    const req = https.get(urlFresh, {
      headers: {
        'Cache-Control': 'no-cache, no-store',
        'Pragma': 'no-cache'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return httpGet(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(6000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function verificarLicencia() {
  try {
    const data = await httpGet(LICENCIA_URL);
    const json = JSON.parse(data);
    return json.estado === 'activo';
  } catch (err) {
    console.log('Error licencia:', err.message);
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