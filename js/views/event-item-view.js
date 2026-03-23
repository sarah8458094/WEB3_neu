export class EventItemView extends HTMLElement {
  //änderung sofort bescheid geben
  static get observedAttributes() {
    return ["event-id", "title", "description", "active"];
  }

  #button;
  #titleEl;
  #descriptionEl;

  connectedCallback() {
    this.render();
  }

  //anzeige aktualisiert sich automatisch (sobald  setAttribute("title", "Neuer Name") aufgerufen)
  attributeChangedCallback() {
    this.render();
  }

  render() {
    //Grundgerüst
    if (!this.querySelector("button")) {
      this.innerHTML = this.template();
    }

    this.#button = this.querySelector("button");
    this.#titleEl = this.querySelector(".events-page__event-item-title");
    this.#descriptionEl = this.querySelector(".events-page__event-item-description");

    //Daten aus Attributen
    const id = this.getAttribute("event-id");
    const title = this.getAttribute("title") || "";
    const description = this.getAttribute("description") || "";
    const isActive = this.getAttribute("active") === "true";

    if (!this.#button || !this.#titleEl || !this.#descriptionEl) return;

    //Daten ins HTML schreiben
    this.#button.dataset.eventId = id ?? "";
    this.#titleEl.textContent = title;
    this.#descriptionEl.textContent = description;
    this.#button.classList.toggle("events-page__event-item--active", isActive);
  }

  template() {
    return `
      <button class="events-page__event-item" type="button">
        <strong class="events-page__event-item-title"></strong>
        <span class="events-page__event-item-description"></span>
      </button>
    `;
  }
}


  customElements.define("eventbuddy-event-item", EventItemView);

