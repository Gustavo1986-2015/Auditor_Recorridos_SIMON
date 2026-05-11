# Auditor de Recorridos

Herramienta de análisis y visualización de trazas GPS para flotas vehiculares.
Desarrollada por **Gustavo D. Gómez — 2026**

---

## ¿Qué hace?

Toma un Excel con datos GPS de un vehículo y genera un mapa interactivo con:

- Ruta coloreada por velocidad (detenido / lento / normal / rápido / exceso)
- Detección automática de paradas
- Alertas de exceso de velocidad
- Distancia GPS (Haversine) y distancia vial real (Routing Map)
- Reproducción del recorrido punto a punto
- Filtros por categoría de velocidad en el mapa
- Exportación a GeoJSON y KML
- Link directo a Google Maps desde cada punto

---

## Estructura del proyecto

```
auditor-recorridos/
├── main.js                   ← Entrada Electron + validación de licencia
├── package.json              ← Configuración del proyecto
├── .gitignore                ← Excluye node_modules/ y dist/
└── public/
    └── GPS_Auditor_G.html    ← App completa (HTML + CSS + JS)
```

---

## Requisitos

- Node.js LTS — https://nodejs.org
- Conexión a internet para compilar (descarga Electron ~144MB)

---

## Instalación

```powershell
npm install --save-dev electron electron-builder
```

---

## Uso en desarrollo

```powershell
npm start
```

Abre la app directamente en ventana Electron sin compilar.

---

## Compilar .exe

```powershell
npm run build
```

Genera: `dist/Auditor de Recorridos 1.0.0.exe`

Ese archivo es standalone — se distribuye solo, sin instalación.

---

## Control de licencia

La app valida al iniciar contra un archivo remoto en GitHub.

**Archivo de control:** `licencia.json` en repositorio privado

| Estado | Contenido |
|---|---|
| Activo | `{"estado":"activo"}` |
| Bloqueado | `{"estado":"bloqueado"}` |

Para bloquear todos los ejecutables distribuidos: editá `licencia.json` en GitHub y cambiá `activo` por `bloqueado`. El cambio aplica en el próximo inicio de cualquier instancia.

La URL de validación se configura en `main.js`:

```javascript
const LICENCIA_URL = 'https://raw.githubusercontent.com/TU_USUARIO/licencias-auditor/main/licencia.json';
```

---

## Recompilar tras cambios

1. Modificá `public/GPS_Auditor_G.html`
2. Ejecutá `npm run build`
3. Distribuí el nuevo `.exe` desde `dist/`

---

## .gitignore

```
node_modules/
dist/
```
