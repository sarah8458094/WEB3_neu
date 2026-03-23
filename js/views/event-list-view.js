import "./event-item-view.js";

export class EventListView extends HTMLElement {
  #newButton;
  #list;
  #emptyState;

  //aufgerufen sobald Element im HTML erscheint
  connectedCallback() {
    this.render();
  }

  render() {
    //verhindert doppeltes zeichnen
    if (!this.querySelector(".events-page__panel")) {
      this.innerHTML = this.template();
    }

    this.#cacheElements(); //sucht buttons und listen im HTML
    this.#bindEvents(); //fügt klick funktionen hinzu
  }

  #cacheElements() {
    //Elemente in variablen speichern
    this.#newButton = this.querySelector("#new-event");
    this.#list = this.querySelector("#event-list");
    this.#emptyState = this.querySelector("#empty-state");
  }

  #bindEvents() {
    //klick auf neues event
    if (this.#newButton) {
      this.#newButton.addEventListener("click", () => {
        //event nach oben schicken
        this.dispatchEvent(new CustomEvent("create-new", { bubbles: true }));
      });
    }

    //klick auf event in liste
    if (this.#list) {
      this.#list.addEventListener("click", (event) => {
        //welcher button?
        const button = event.target.closest("button[data-event-id]");
        if (!button) return;

        //event xy ausgewählt
        this.dispatchEvent(new CustomEvent("select-event", {
          bubbles: true,
          detail: { eventId: Number(button.dataset.eventId) } //id mitschicken
        }));
      });
    }
  }

  renderEventList(events, selectedEventId) {
    if (!this.#list || !this.#emptyState) {
      this.render();
    }

    if (!this.#list || !this.#emptyState) return;
    //alte einträge entfernen
    this.#list.querySelectorAll("eventbuddy-event-item").forEach((item) => item.remove());

    //wenn kein event...zeige leer text
    if (events.length === 0) {
      this.#emptyState.hidden = false;
      return;
    }

    this.#emptyState.hidden = true;

    //für jedes Event ein neues eventbuddy-event-item
    events.forEach((event) => {
      const item = document.createElement("eventbuddy-event-item");
      item.setAttribute("event-id", String(event.id));
      item.setAttribute("title", event.title);
      item.setAttribute("description", event.description);
      item.setAttribute("active", event.id === selectedEventId ? "true" : "false");
      this.#list.appendChild(item);
    });
  }

  template() {
    return `
      <div class="events-page__panel">
        <h2 class="events-page__panel-title">Event</h2>
        <div class="events-page__actions">
          <button class="events-page__button" id="new-event" type="button">Neues Event</button>
        </div>
        <div class="events-page__event-list" id="event-list">
          <p class="events-page__empty" id="empty-state">Noch keine Events vorhanden.</p>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("eventbuddy-event-list")) {
  customElements.define("eventbuddy-event-list", EventListView);
}
