# Prompt para continuar el rediseño en otro entorno

Estoy trabajando en un sitio estático multipágina para **Va!** (app de delivery local del Valle de Punilla, Córdoba, Argentina).

## Contexto del repo
Archivos principales:
- `index.html`
- `como_funciona.html`
- `comercios.html`
- `cadeteria.html`
- `clientes.html`
- `preguntas_frecuentes.html`
- `contacto.html`

Ya hubo un cambio previo que unificó solo `header/nav`, pero ese diseño **no gustó**. Ahora se requiere un **rediseño integral**.

## Objetivo principal
Recrear la web con línea artística similar a la referencia visual compartida (estilo “Foodeli”), pero **sin Foodeli** y con identidad **Va!**.

## Requisitos clave
1. Rediseñar las **7 páginas**; empezar por `index.html` como base visual para luego replicar coherencia en las demás.
2. Réplica visual fuerte del diseño de referencia (enfoque **desktop-first**), eliminando el diseño anterior.
3. Mantener branding Va!:
   - Nombre/logo: **Va!**
   - Frases de marca, por ejemplo: **“¿Lo pedís? Va!”**
   - Identidad local de Punilla.
4. Mantener todas las páginas conectadas con un header moderno, limpio y consistente (sin rastro Foodeli).
5. Mantener textos actuales de cada página (sin reescritura de copy, salvo ajustes mínimos de maquetación).
6. Se pueden reemplazar imágenes y usar placeholders, pero en `index.html` mantener la imagen de referencia compartida como hero.
7. Prioridad: desktop, luego tablet/mobile.
8. Incluir microinteracciones: hovers, transiciones y animaciones suaves.
9. Mantener implementación con **Tailwind** (sin migrar stack).

## Archivos de referencia esperados
Debe existir carpeta `Referencias/` con:
- `web_page_va.txt` (CSS/código de página de referencia)
- varios `.css` auxiliares
- `app.txt` (o equivalente como `App.tsx`) para consistencia visual/estructural

## Secuencia de trabajo requerida
1. Verificar estructura del repo y presencia física de `Referencias/`.
2. Inspeccionar `web_page_va.txt`, CSS asociados y `app.txt`/`App.tsx`.
3. Rediseñar `index.html` completo:
   - hero con imagen de referencia compartida
   - header final enlazado a las 7 páginas
   - estilo visual adaptado a marca Va!
4. Usar `index.html` como patrón y rediseñar las otras 6 páginas, manteniendo sus textos.
5. Commit + PR con resumen claro de:
   - decisiones visuales
   - alcance por página
   - interacciones agregadas

## Decisiones ya confirmadas por el usuario (no volver a preguntar)
- Sí, rehacer todo el sitio.
- Sí, comenzar por `index.html` y usarlo como plantilla.
- Quiere réplica visual fuerte de la referencia.
- Mantener branding Va! y eliminar todo rastro Foodeli.
- Mantener textos actuales.
- Se pueden usar placeholders, pero conservar imagen de referencia en hero de `index.html`.
- Priorizar desktop.
- Incluir efectos.
- Seguir con Tailwind.
- Header nuevo conectado entre páginas.

## Bloqueo explícito
Si `Referencias/` **no aparece**:
- solicitar ruta exacta real o que se suba/commitee correctamente,
- **no avanzar con implementación final** hasta tener esos archivos.
