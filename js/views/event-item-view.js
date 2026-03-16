class EventItemView extends HTMLElement {
  constructor() {
    super();
    this.template = `
      <button class="events-page__event-item" type="button">
        <strong class="events-page__event-item-title"></strong>
        <span class="events-page__event-item-description"></span>
      </button>
    `;
  }

  static get observedAttributes() {
    return ["event-id", "title", "description", "active"];
  }

  connectedCallback() {
    this.ensureElements();
    this.render();
  }

  attributeChangedCallback() {
    if (!this.button) {
      this.ensureElements();
    }

    this.render();
  }

  ensureElements() {
    const button = this.querySelector("button");

    if (button) {
      this.button = button;
      this.titleEl = button.querySelector(".events-page__event-item-title");
      this.descriptionEl = button.querySelector(".events-page__event-item-description");
      return;
    }

    this.innerHTML = this.template;
    this.cacheElements();
  }

  cacheElements() {
    this.button = this.querySelector("button");
    this.titleEl = this.querySelector(".events-page__event-item-title");
    this.descriptionEl = this.querySelector(".events-page__event-item-description");
  }

  render() {
    if (!this.button || !this.titleEl || !this.descriptionEl) {
      this.ensureElements();
    }

    const id = this.getAttribute("event-id");
    const title = this.getAttribute("title") || "";
    const description = this.getAttribute("description") || "";
    const isActive = this.getAttribute("active") === "true";

    this.button.dataset.eventId = id ?? "";
    this.titleEl.textContent = title;
    this.descriptionEl.textContent = description;
    this.button.classList.toggle("events-page__event-item--active", isActive);
  }
}

window.EventItemView = EventItemView;
