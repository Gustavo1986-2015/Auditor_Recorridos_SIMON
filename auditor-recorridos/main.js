const { app, BrowserWindow, dialog } = require('electron');

// ═══════════════════════════════════════════════════════
// LÍNEA QUE CAMBIÁS: pegá acá tu URL de GitHub Raw
// ═══════════════════════════════════════════════════════
const LICENCIA_URL = 'https://raw.githubusercontent.com/TU_USUARIO/licencias-auditor/main/licencia.json';

// ═══════════════════════════════════════════════════════
// SI NO HAY INTERNET: true = deja abrir / false = bloquea
// ═══════════════════════════════════════════════════════
const PERMITIR_SIN_INTERNET = true;


async function verificarLicencia() {
  try {
    const response = await fetch(LICENCIA_URL, { cache: 'no-store' });
    const data = await response.json();
    return data.estado === 'activo';
  } catch {
    return PERMITIR_SIN_INTERNET;
  }
}

async function createWindow() {
  const autorizado = await verificarLicencia();

  if (!autorizado) {
    dialog.showErrorBox(
      'Acceso no autorizado',
      'Esta version ha sido desactivada.\nContacta al administrador para mas informacion.'
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

  win.loadFile('public/GPS_Auditor_G.html');
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});