const { app, BrowserWindow, dialog } = require('electron');
const https = require('https');

// ═══════════════════════════════════════════════════════
// LÍNEA QUE CAMBIÁS: pegá acá tu URL de GitHub Raw
// ═══════════════════════════════════════════════════════
const LICENCIA_URL = 'https://raw.githubusercontent.com/Gustavo1986-2015/Auditor_Recorridos_SIMON/refs/heads/main/auditor-recorridos/licencia.json';

// ═══════════════════════════════════════════════════════
// SI NO HAY INTERNET: true = deja abrir / false = bloquea
// ═══════════════════════════════════════════════════════
const PERMITIR_SIN_INTERNET = true;


function verificarLicencia() {
  return new Promise((resolve) => {
    const req = https.get(LICENCIA_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.estado === 'activo');
        } catch {
          resolve(PERMITIR_SIN_INTERNET);
        }
      });
    });
    req.on('error', () => resolve(PERMITIR_SIN_INTERNET));
    req.setTimeout(5000, () => { req.destroy(); resolve(PERMITIR_SIN_INTERNET); });
  });
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
