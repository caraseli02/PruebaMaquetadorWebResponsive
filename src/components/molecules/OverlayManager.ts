/**
 * Módulo Profundo: OverlayManager
 * Centraliza el control de overlays (popovers flotantes absolutos y diálogos modales nativos).
 * Gestiona el bloqueo de scroll de fondo, la captura de clics fuera del contenedor y el posicionamiento.
 */
export class OverlayManager {
  private static activePopover: HTMLElement | null = null;
  private static popoverOutsideClickListener: ((e: MouseEvent) => void) | null = null;

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

    popover.style.display = "block";
    popover.style.position = "absolute";

    // Calcular posición óptima debajo del elemento de ancla
    const rect = anchor.getBoundingClientRect();
    popover.style.top = `${rect.bottom + window.scrollY + 8}px`;
    popover.style.left = `${Math.min(rect.left + window.scrollX, window.innerWidth - 300)}px`;

    this.activePopover = popover;

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

    // Añadir el listener en el siguiente ciclo de eventos para evitar capturar el click de trigger original
    this.popoverOutsideClickListener = outsideClick;
    setTimeout(() => {
      document.addEventListener("click", outsideClick);
    }, 0);
  }

  /**
   * Cierra el popover flotante activo si está visible en pantalla.
   */
  public static closePopover(): void {
    if (this.activePopover) {
      this.activePopover.style.display = "none";
      this.activePopover = null;
    }
    if (this.popoverOutsideClickListener) {
      document.removeEventListener("click", this.popoverOutsideClickListener);
      this.popoverOutsideClickListener = null;
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
