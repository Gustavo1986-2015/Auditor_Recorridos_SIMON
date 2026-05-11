# Auditor de Recorridos — ¿Para qué sirve y cómo se usa?

Es una herramienta que toma un Excel con datos GPS de un vehículo y los convierte en un mapa interactivo. La idea es poder revisar un recorrido con detalle: ver exactamente por dónde fue el vehículo, a qué velocidad, dónde se detuvo y por cuánto tiempo, si hubo excesos de velocidad, y cuántos kilómetros recorrió realmente. Todo sin instalar nada, directamente desde el navegador.

---

## Cómo se usa

**1. Cargar el archivo**
Arrastrá el Excel al panel izquierdo o hacé clic para buscarlo. Acepta .xlsx, .xls y .csv. No importa cómo se llame el archivo.

**2. Mapear las columnas**
El sistema detecta automáticamente las columnas de fecha, latitud, longitud y velocidad basándose en los nombres de las columnas. Si tu Excel tiene nombres distintos (o en otro idioma), seleccionás la columna correcta desde el desplegable. Las columnas auto-detectadas aparecen con el badge "AUTO".

**3. Configurar los umbrales**
Tres ajustes simples antes de procesar:
- *Velocidad mínima promedio*: filtra los tramos de baja velocidad (paradas, semáforos) del cálculo del promedio.
- *Parada mínima*: cuántos minutos quieto cuenta como una parada real.
- *Alerta velocidad máxima*: a partir de qué velocidad se marca como exceso.

**4. Procesar**
Un clic en "Procesar" y listo. El mapa se dibuja con la ruta coloreada tramo por tramo según la velocidad.

---

## Qué muestra el mapa

La ruta cambia de color según la velocidad de cada tramo:

| Color | Categoría | Rango |
|---|---|---|
| 🔴 Rojo | Detenido | 0 – 5 km/h |
| 🟡 Amarillo | Lento | 5 – 30 km/h |
| 🟢 Verde | Normal | 30 – 80 km/h |
| 🔵 Azul | Rápido | 80 – límite configurado |
| 🟠 Naranja | Exceso | Por encima del límite |

Las **flechas de sentido** muestran la dirección en que se recorrió cada tramo. El marcador **verde** es el punto de inicio y el **rojo** es el punto de fin.

Las **paradas** aparecen en rosa con el tiempo que duró cada una. Las **alertas de velocidad** aparecen en naranja. Haciendo clic en cualquier punto del mapa se abre una tarjeta con fecha, hora, velocidad, y un link directo a Google Maps para ubicar ese punto exacto.

---

## Filtros de mapa

En la leyenda de la derecha, cada categoría es un filtro. Haciendo clic en cualquier ítem (Detenido, Lento, Normal, Rápido, Paradas, Alertas, Sentido) ese tipo de capa se oculta del mapa. Un clic de nuevo lo muestra. Sirve para enfocarse en lo que importa en cada análisis: por ejemplo, ocultar los tramos normales y ver solo los excesos.

---

## Distancias

El sistema calcula dos distancias:

- **Distancia GPS**: suma la distancia en línea recta entre cada par de puntos consecutivos. Es instantánea y no necesita internet. Puede diferir del recorrido real porque no considera las curvas de las calles.
- **Distancia Vial**: usa Routing Map para ajustar la traza a la red vial real y calcular la distancia por camino. Es la más precisa. Necesita conexión a internet y tarda unos segundos.

---

## Reproducción del recorrido

La barra en la parte inferior permite reproducir el recorrido punto por punto, ver la velocidad en cada instante y controlar qué tan rápido avanza la reproducción (1×, 5×, 20×, 50×). El punto cyan que se mueve es la posición del vehículo en ese momento.

---

## Exportar

Una vez procesado el recorrido, podés exportarlo como **GeoJSON** o **KML**. Ambos formatos son compatibles con Google Earth, uMap, QGIS y otras plataformas de mapas. Las paradas se exportan como puntos individuales con su duración y horario.

---

*Desarrollado por Gustavo D. Gómez — 2026*
