import "./BookingDialog.css";
import { createButton } from "../atoms/Button";
import { OverlayManager } from "./OverlayManager";
import type { CardData } from "../../types";

export type BookingDialogController = {
  dialog: HTMLDialogElement;
  show: (card: CardData) => void;
};

const createFormField = ({
  id,
  label,
  type,
  placeholder,
  error,
  pattern,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  error: string;
  pattern?: string;
}): HTMLElement => {
  const field = document.createElement("div");
  field.className = "booking-form-field";

  const labelEl = document.createElement("label");
  labelEl.htmlFor = id;
  labelEl.textContent = label;

  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.required = true;
  input.placeholder = placeholder;
  input.className = "booking-input";
  if (pattern) {
    input.pattern = pattern;
  }

  const errorEl = document.createElement("span");
  errorEl.className = "booking-error-msg";
  errorEl.setAttribute("aria-live", "polite");
  errorEl.textContent = error;

  field.append(labelEl, input, errorEl);
  return field;
};

const createSummary = (card: CardData): HTMLElement => {
  const summary = document.createElement("div");
  summary.className = "booking-dialog__summary";

  const title = document.createElement("h4");
  title.textContent = card.title;

  const meta = document.createElement("p");
  meta.textContent = `${card.location}, ${card.region} · ${card.durationDays} días`;

  const price = document.createElement("p");
  price.className = "booking-dialog__price";
  const strong = document.createElement("strong");
  strong.textContent = card.price;
  price.append("Precio por persona: ", strong);

  summary.append(title, meta, price);
  return summary;
};

const createForm = (): HTMLFormElement => {
  const form = document.createElement("form");
  form.className = "booking-dialog__form";
  form.noValidate = true;

  form.append(
    createFormField({
      id: "booking-name",
      label: "Nombre completo",
      type: "text",
      placeholder: "Tu nombre...",
      pattern: ".*\\S.*",
      error: "Por favor, introduce tu nombre completo.",
    }),
    createFormField({
      id: "booking-email",
      label: "Correo electrónico",
      type: "email",
      placeholder: "Tu correo...",
      error: "Por favor, introduce un correo electrónico válido.",
    }),
    createFormField({
      id: "booking-phone",
      label: "Teléfono de contacto",
      type: "tel",
      placeholder: "Tu teléfono...",
      pattern: "[0-9\\s\\+\\-\\(\\)]{9,}",
      error: "Por favor, introduce un teléfono válido (mínimo 9 dígitos).",
    })
  );

  const actions = document.createElement("div");
  actions.className = "booking-actions";

  const submit = createButton({
    label: "Confirmar Reserva",
    variant: "orange",
    size: "lg",
  });
  submit.type = "submit";
  submit.classList.add("booking-submit-btn");

  const cancel = createButton({
    label: "Cancelar",
    variant: "outline",
    size: "lg",
  });
  cancel.type = "button";
  cancel.classList.add("booking-cancel-btn");

  actions.append(submit, cancel);
  form.append(actions);

  return form;
};

const createSuccessState = (card: CardData, onClose: () => void): HTMLElement => {
  const success = document.createElement("div");
  success.className = "booking-dialog__success-state";

  const icon = document.createElement("div");
  icon.className = "booking-dialog__success-icon";
  icon.textContent = "✓";

  const title = document.createElement("h3");
  title.className = "booking-dialog__success-title";
  title.textContent = "¡Reserva Solicitada!";

  const message = document.createElement("p");
  message.className = "booking-dialog__success-message";
  const trip = document.createElement("strong");
  trip.textContent = card.title;
  message.append("Tu solicitud para ", trip, " ha sido registrada con éxito. Nos pondremos en contacto contigo en breve.");

  const close = createButton({
    label: "Entendido",
    variant: "plum",
    size: "lg",
  });
  close.type = "button";
  close.classList.add("booking-success-close-btn");
  close.addEventListener("click", onClose);

  success.append(icon, title, message, close);
  return success;
};

export const createBookingDialog = (): BookingDialogController => {
  const dialog = document.createElement("dialog");
  dialog.className = "booking-dialog";

  const closeDialog = () => {
    OverlayManager.closeModal(dialog);
  };

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeDialog();
    }
  });

  const show = (card: CardData) => {
    const content = document.createElement("div");
    content.className = "booking-dialog__content";

    const header = document.createElement("div");
    header.className = "booking-dialog__header";

    const title = document.createElement("h3");
    title.className = "booking-dialog__title";
    title.textContent = "Reserva tu Aventura";

    const close = document.createElement("button");
    close.className = "booking-dialog__close";
    close.type = "button";
    close.setAttribute("aria-label", "Cerrar modal");
    close.textContent = "×";
    close.addEventListener("click", closeDialog);

    header.append(title, close);

    const body = document.createElement("div");
    body.className = "booking-dialog__body";

    const form = createForm();
    const cancel = form.querySelector(".booking-cancel-btn");
    cancel?.addEventListener("click", closeDialog);

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("booking-dialog__form--submitted");
        const firstInvalid = form.querySelector(":invalid") as HTMLInputElement | null;
        firstInvalid?.focus();
        return;
      }

      body.replaceChildren(createSuccessState(card, closeDialog));
    });

    body.append(createSummary(card), form);
    content.append(header, body);
    dialog.replaceChildren(content);

    OverlayManager.openModal(dialog);
  };

  return { dialog, show };
};
