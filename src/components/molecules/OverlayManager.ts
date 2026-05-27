/**
 * Módulo Profundo: OverlayManager
 * Centraliza el control de overlays (popovers flotantes absolutos y diálogos modales nativos).
 * Gestiona el bloqueo de scroll de fondo, la captura de clics fuera del contenedor y el posicionamiento.
 */
export class OverlayManager {
  private static activePopover: HTMLElement | null = null;
  private static activeAnchor: HTMLElement | null = null;
  private static popoverOutsideClickListener: ((e: MouseEvent) => void) | null = null;
  private static popoverEscapeListener: ((e: KeyboardEvent) => void) | null = null;

  /**
   * Abre un popover flotante posicionado de forma absoluta relativo a un elemento ancla.
   * Cierra automáticamente cualquier popover activo previo y limpia sus listeners correspondientes.
   */
  public static openPopover(
    popover: HTMLElement,
    anchor: HTMLElement,
    onClose?: () => void
  ): void {
    this.closePopover();

    anchor.setAttribute("aria-expanded", "true");

    const isMobile = window.innerWidth < 768;

    popover.style.display = "block";

    if (isMobile) {
      popover.style.position = "";
      popover.style.top = "";
      popover.style.left = "";
      document.body.classList.add("no-scroll");
    } else {
      popover.style.position = "absolute";

      // Medir dimensiones del popover y el ancla
      const popoverWidth = popover.offsetWidth || 280;
      const popoverHeight = popover.offsetHeight || 280;
      const rect = anchor.getBoundingClientRect();

      // Posicionamiento Vertical con Clamping y Axis-Flipping
      let top: number;
      if (rect.bottom + popoverHeight + 8 <= window.innerHeight || rect.top - popoverHeight - 8 < 0) {
        // Suficiente espacio abajo, o no hay espacio arriba tampoco: posicionar abajo
        top = rect.bottom + 8;
      } else {
        // Escasez de espacio abajo pero hay espacio arriba: posicionar arriba
        top = rect.top - popoverHeight - 8;
      }

      // Posicionamiento Horizontal con Clamping
      let left = rect.left;
      if (left + popoverWidth > window.innerWidth) {
        // Si desborda por la derecha, alinear bordes derechos
        left = rect.right - popoverWidth;
      }
      // Clamp horizontal para mantener el popover siempre en el viewport (8px de padding)
      left = Math.max(8, Math.min(left, window.innerWidth - popoverWidth - 8));

      // Convertir coordenadas del viewport a coordenadas de página
      popover.style.top = `${top + window.scrollY}px`;
      popover.style.left = `${left + window.scrollX}px`;
    }

    // Guardar referencia activa y rotar el chevron
    this.activePopover = popover;
    this.activeAnchor = anchor;
    this.activeAnchor.classList.add("bottom-bar-circuit-card__details--active");

    // Escucha de clic exterior para auto-cierre
    const outsideClick = (e: MouseEvent) => {
      if (
        this.activePopover &&
        !this.activePopover.contains(e.target as Node) &&
        !anchor.contains(e.target as Node)
      ) {
        this.closePopover();
        onClose?.();
      }
    };

    // Cierre mediante teclado (Escape)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && this.activePopover) {
        this.closePopover();
        onClose?.();
      }
    };

    // Añadir el listener en el siguiente ciclo de eventos para evitar capturar el click de trigger original
    this.popoverOutsideClickListener = outsideClick;
    // We attach the keydown listener directly to the document since it's safe to run immediately
    document.addEventListener("keydown", onKeyDown);
    
    // Almacenamos el listener de teclado en una propiedad estática para poder removerlo luego
    OverlayManager.popoverEscapeListener = onKeyDown;

    setTimeout(() => {
      document.addEventListener("click", outsideClick);
    }, 0);
  }

  /**
   * Cierra el popover flotante activo si está visible en pantalla y restaura el chevron.
   */
  public static closePopover(): void {
    if (this.activePopover) {
      this.activePopover.style.display = "none";
      this.activePopover = null;
    }
    document.body.classList.remove("no-scroll");
    if (this.activeAnchor) {
      this.activeAnchor.classList.remove("bottom-bar-circuit-card__details--active");
      this.activeAnchor.setAttribute("aria-expanded", "false");
      this.activeAnchor.focus();
      this.activeAnchor = null;
    }
    if (this.popoverOutsideClickListener) {
      document.removeEventListener("click", this.popoverOutsideClickListener);
      this.popoverOutsideClickListener = null;
    }
    if (OverlayManager.popoverEscapeListener) {
      document.removeEventListener("keydown", OverlayManager.popoverEscapeListener);
      OverlayManager.popoverEscapeListener = null;
    }
  }

  /**
   * Abre un elemento <dialog> nativo de HTML5 de forma accesible.
   * Garantiza la aplicación de bloqueo de scroll de fondo de forma segura.
   */
  public static openModal(dialog: HTMLDialogElement, onOpen?: () => void): void {
    dialog.showModal();
    document.body.classList.add("no-scroll");
    onOpen?.();

    const handleClose = () => {
      document.body.classList.remove("no-scroll");
      dialog.removeEventListener("close", handleClose);
    };
    dialog.addEventListener("close", handleClose);
  }

  /**
   * Cierra un modal <dialog> nativo y restablece el estado del scroll en el cuerpo de la página.
   */
  public static closeModal(dialog: HTMLDialogElement): void {
    dialog.close();
    document.body.classList.remove("no-scroll");
  }
}
