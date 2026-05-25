# Prueba Acceso DUX (Responsive Home Page)

Esta aplicación representa la implementación de una página de inicio responsiva y accesible para la prueba de acceso DUX, diseñada a partir de pantallas de Figma para escritorio, tablet y móvil. Su propósito es servir de escaparate principal para los usuarios, integrando navegación, secciones de impacto visual, búsqueda interactiva mediante filtros y visualización de tarjetas de contenido.

## Language

### Core Components

**Header**:
El componente de navegación superior y de marca de la página, que contiene la identidad visual y enlaces clave de navegación.
_Avoid_: Navbar, Navigation Bar, Top Bar

**Hero**:
La sección principal de impacto visual superior que comunica la proposición de valor central y el lema del portal.
_Avoid_: Jumbotron, Banner, Welcome Section

**Filter Panel**:
El componente interactivo que permite al usuario segmentar o filtrar los elementos mostrados en la cuadrícula de tarjetas, adaptando su comportamiento e interfaz según el tamaño de la pantalla (sidebar en escritorio/tablet, modal en móvil).
_Avoid_: Filters, Search Bar, Filter Modal

**Cards Grid**:
El contenedor principal estructurado que muestra la colección de tarjetas de contenido de forma responsiva y adaptativa.
_Avoid_: Item Feed, Product List, Content Grid

**Card**:
El componente individual de información visual que representa un elemento del catálogo, compuesto por imagen, etiquetas, título y descripción. Este componente es flexible por diseño, adaptando sus estilos internos (paddings, tipografía, disposición de elementos) mediante Container Queries según el ancho del celda en la que se renderiza.
_Avoid_: Item, Product Card, Content Box

**Footer**:
La sección de cierre inferior del sitio que incluye enlaces institucionales, datos de contacto, copyright e identidad visual secundaria.
_Avoid_: Bottom Bar, Footer Section
