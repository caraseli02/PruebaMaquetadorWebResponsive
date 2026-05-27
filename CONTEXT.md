# Prueba Acceso DUX (Responsive Home Page)

Esta aplicación representa la implementación de una página de inicio responsiva y accesible para la prueba de acceso DUX, diseñada a partir de pantallas de Figma para escritorio, tablet y móvil. Su propósito es servir de escaparate principal para los usuarios, integrando navegación, secciones de impacto visual, búsqueda interactiva mediante filtros y visualización de tarjetas de contenido.

## Language

### Core Components

**Header**:
El componente de navegación superior y de marca de la página, que contiene la identidad visual y enlaces clave de navegación.
_Avoid_: Navbar, Navigation Bar, Top Bar

**Hero**:
La sección principal de impacto visual superior que comunica la proposición de valor central y el lema del portal. Incluye imagen de fondo, CTAs, controles de slider y estado activo del carrusel.
_Avoid_: Jumbotron, Banner, Welcome Section

**SearchBar**:
El organismo de búsqueda principal que combina campos de destino, fechas, viajeros, CTA de búsqueda y resumen visual de la consulta. En la home se superpone al Hero mediante un modificador explícito, pero como organismo standalone no debe depender de ese offset.
_Avoid_: Filter Panel, Toolbar, Form Row

**Filter Panel**:
El componente interactivo que permite al usuario segmentar o filtrar los elementos mostrados en la cuadrícula de tarjetas, adaptando su comportamiento e interfaz según el tamaño de la pantalla (sidebar en escritorio/tablet, modal en móvil).
_Avoid_: Filters, Search Bar, Filter Modal

**Cards Grid**:
El contenedor principal estructurado que muestra la colección de tarjetas de contenido (**Circuitos**) de forma responsiva y adaptativa. En desktop usa tarjetas de referencia `360 x 404`; las alturas y footers deben mantenerse alineados por fila.
_Avoid_: Item Feed, Product List, Content Grid

**Card**:
El componente visual individual de información que representa y visualiza un **Circuito** del catálogo, compuesto por imagen, etiquetas, título y descripción. Este componente es flexible por diseño, adaptando sus estilos internos (paddings, tipografía, disposición de elementos) mediante Container Queries según el ancho de la celda en la que se renderiza.
_Avoid_: Item, Product Card, Content Box

**Circuito / Circuito de Viaje**:
La entidad central de negocio del catálogo que representa una ruta de viaje planificada, con un itinerario, precio base, impuestos, categoría y actividades asociadas.
_Avoid_: Item, Producto, Tarjeta de Datos, Entrada de Feed

**Footer**:
El componente de cierre inferior de la página, que consolida la información institucional, enlaces de navegación secundarios y el bloque de contacto.
_Avoid_: Bottom Bar, Footer Section

**PricingPopover**:
El componente molecular flotante de posicionamiento absoluto que se despliega dinámicamente para mostrar el desglose estimado del coste de un **Circuito de Viaje** (Base, Impuestos y Gastos de gestión).
_Avoid_: Price Breakdown, Price Tooltip, Desglose flotante, Detalle de precio

**BookingDialog**:
El componente de interacción modal nativo accesible que permite al usuario ingresar sus datos personales y de contacto para formalizar una solicitud de reserva sobre un **Circuito** específico.
_Avoid_: Checkout Form, Modal de Pago, Formulario de Reserva, Checkout Modal

## Ejemplo de Diálogo

**Desarrollador**: "Tenemos lista la página de inicio. El usuario puede usar la **SearchBar** para definir su búsqueda inicial (por destino, fecha y número de viajeros) y luego afinar los resultados con el **Filter Panel** lateral."

**Experto de Negocio**: "¡Excelente! ¿Qué pasa cuando los resultados cambian en la grilla?"

**Desarrollador**: "El **Cards Grid** renderiza la lista de **Circuitos** actualizados. Si un viajero quiere saber el desglose estimado del costo de un **Circuito de Viaje**, puede pulsar en 'Ver desglose' para abrir el **PricingPopover**."

**Experto de Negocio**: "Perfecto. Y si decide reservar, ¿cómo se formaliza?"

**Desarrollador**: "Al hacer clic en 'Reservar' en la tarjeta del **Circuito**, abrimos el **BookingDialog**, que es un modal nativo donde ingresa sus datos y completa la solicitud de reserva."


