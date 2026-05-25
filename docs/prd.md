# Product Requirement Document (PRD) - Prueba Acceso DUX

## Problem Statement

El equipo de desarrollo y diseño requiere una implementación de alta fidelidad, responsiva, accesible y perfectamente estructurada de la página de inicio (Home Page) del portal DUX, basada en diseños de Figma que cubren resoluciones de escritorio, tablet (grande y pequeña) y móvil. Actualmente, la base del proyecto está configurada en Vite + TypeScript + Storybook, pero no se ha iniciado la maquetación visual ni la lógica interactiva. Es indispensable garantizar que la interfaz se adapte con fluidez a resoluciones intermedias, cumpla con estándares de accesibilidad nativos y permita realizar filtrados dinámicos de contenido en el lado del cliente sin depender de una base de datos o servidor API externo.

## Solution

Desarrollar la Home Page responsive utilizando HTML semántico y CSS Puro modular (BEM y Custom Properties coubicadas por componente), integrando un panel de filtros interactivo en el cliente escrito en TypeScript y configurando un sistema de historias en Storybook para validar cada átomo, molécula y organismo del sistema de diseño de forma aislada. El comportamiento móvil de los filtros utilizará la etiqueta nativa `<dialog>` para proporcionar una accesibilidad nativa inmejorable.

## User Stories

1. **Navegación Adaptable**: Como usuario multidispositivo, quiero un encabezado (`Header`) que se adapte visualmente a mi pantalla (menú hamburguesa táctil en móvil y barra expandida en escritorio), para poder navegar cómodamente por el portal sin importar mi dispositivo.
2. **Impacto Inicial**: Como visitante nuevo, quiero ver una sección de héroe (`Hero`) clara y nítida con la propuesta de valor de DUX, para comprender inmediatamente el propósito del portal.
3. **Búsqueda Dinámica**: Como usuario que busca contenido específico, quiero poder escribir en un campo de búsqueda en el `Filter Panel`, para que el listado de tarjetas (`Cards Grid`) se actualice en tiempo real mostrando únicamente los elementos que coincidan con mi búsqueda.
4. **Filtrado por Categorías**: Como usuario que explora el catálogo, quiero poder marcar y desmarcar casillas de filtros (tags/categorías) en el `Filter Panel`, para segmentar dinámicamente las tarjetas del grid según mis temas de interés.
5. **Panel Flotante en Móvil**: Como usuario móvil, quiero un botón flotante visible para abrir los filtros, de modo que el `Filter Panel` se despliegue en un modal de pantalla completa fácil de usar en pantallas pequeñas.
6. **Cierre Sencillo del Panel**: Como usuario móvil que terminó de seleccionar filtros, quiero poder cerrar el modal pulsando un botón de cerrar, tocando la tecla `Escape` o haciendo clic fuera del modal, para volver con facilidad al listado de resultados.
7. **Cuadrícula Elástica**: Como usuario con una pantalla de tamaño intermedio (por ejemplo, tablets o pantallas plegables), quiero que las tarjetas (`Card`) se ensanchen o encojan fluidamente y reorganicen sus columnas (1, 2, 3 o 4 columnas), para evitar que aparezcan espacios vacíos extraños o desalineaciones en el grid.
8. **Diseño de Tarjetas Adaptativo**: Como usuario que explora tarjetas con diferentes anchos, quiero que la disposición interna de cada `Card` (tamaño de fuente, paddings y relación de aspecto de la imagen) se autoajuste de forma proporcional a su contenedor mediante container queries, para garantizar la máxima legibilidad del contenido.
9. **Navegación Accesible por Teclado**: Como usuario que navega únicamente con teclado, quiero desplazarme por todos los enlaces, botones y entradas de filtro usando la tecla `Tab` con un indicador de foco altamente visible (`:focus-visible`), para poder controlar toda la interfaz sin necesidad de usar un ratón.
10. **Lectura Guiada**: Como usuario invidente que utiliza un lector de pantalla, quiero que el sitio web esté estructurado con marcas HTML5 semánticas y atributos ARIA correctos, para recibir descripciones claras de las secciones y el número total de tarjetas disponibles en el catálogo.

## Implementation Decisions

### Estructura de Módulos y Arquitectura
- **Componentes Modulares (Colocados)**: Estructuraremos la interfaz en componentes dentro de `src/components/` divididos en `atoms`, `molecules` y `organisms`. Cada componente tendrá su archivo de TypeScript (`.ts`), su CSS específico (`.css`) y su historia (`.stories.ts`) colocados en la misma carpeta para garantizar aislamiento y evitar CSS huérfano.
- **CSS Puro DRY (Custom Properties)**: Utilizaremos CSS nativo aprovechando las variables declaradas en `src/styles/tokens.css` (colores, tipografías, sombras y radios de borde de Figma). No se utilizarán utilidades duplicadas ni preprocesadores adicionales para mantener el peso del bundle por debajo de 5KB gzipped.
- **Container Queries**: Para las `Card` individuales del grid, utilizaremos `@container (min-width: ...px)` para definir su responsive en base al ancho de su celda contenedora en lugar del viewport global.

### Estado y Datos
- **Tipado estricto**: Definiremos la interfaz `CardData` en TypeScript para tipar con rigor toda la información de cada tarjeta (título, descripción, tags, imagen, etc.).
- **Datos Mock localizados**: El listado de contenido se almacenará en `src/data/cards.ts` como un array estático de objetos que cumplen con `CardData`.
- **Mediador de Estado Centralizado**: `src/main.ts` actuará como mediador de estado. Recibirá los cambios aplicados en el `Filter Panel`, ejecutará la lógica de filtrado de datos en TypeScript y coordinará el re-renderizado del `Cards Grid`.

### Accesibilidad (a11y)
- **Filtros nativos en Móvil**: Usaremos el elemento HTML `<dialog>` para el panel modal en móvil. Su apertura mediante `.showModal()` garantizará nativamente el atrapado de foco (focus trap), el cierre automático con `Esc` y el bloqueo de scroll de fondo.
- **Focus visible**: Usaremos el selector CSS `:focus-visible` para aplicar un anillo de foco vibrante (color de marca `--color-orange-500`) únicamente a los usuarios que navegan con teclado.

## Testing Decisions

### Criterios de Calidad de Pruebas
Las pruebas deben enfocarse en el comportamiento externo y la interacción del usuario, evitando validar detalles de implementación interna.

### Módulos a Testear y Metodología
1. **Validación Visual de Componentes (Storybook)**:
   - Crearemos historias en Storybook para cada estado de los componentes (`Button`, `Card`, `FilterPanel`, `Header`, `Footer`).
   - Configuraremos viewports específicos en las historias para simular y validar las resoluciones de `390px`, `744px`, `1023px` y `1440px`.
2. **Pruebas de Accesibilidad Automatizadas**:
   - Utilizaremos el addon de accesibilidad `@storybook/addon-a11y` integrado en la suite de desarrollo para auditar contrastes, etiquetas ARIA y semántica.
3. **Plan de Testeo Manual del `<dialog>` de Filtros**:
   - **Verificación de Foco**: Validar mediante teclado (`Tab` y `Shift + Tab`) que el foco permanece estrictamente atrapado dentro del modal cuando está abierto.
   - **Verificación de Cierre**: Confirmar que pulsar la tecla `Escape` cierra el diálogo de inmediato.
   - **Verificación de Scroll**: Comprobar visualmente que no existe scroll en el fondo mientras el modal está activo.

## Out of Scope

- Integración con base de datos, CMS o endpoints de backend.
- Autenticación o registro de usuarios.
- Pasarela de pagos o carrito de compras.
- Enrutamiento multipágina (solo se implementa la página de inicio).
- Frameworks pesados de JS (React, Vue, Angular) o librerías de UI complejas.

## Further Notes

- **Alineación con la Identidad DUX**: Las imágenes y vectores utilizados se extraerán de manera directa del lienzo de Figma (`Frame 2017.svg`) para asegurar una reproducción fidedigna de la paleta de colores cromática (escala naranja de acento y escala ciruela/púrpura de contraste) y de la tipografía corporativa Outfit/Inter.
