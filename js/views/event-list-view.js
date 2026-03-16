class EventListView extends HTMLElement {
  connectedCallback() {
    this.ensureElements();
  }

  ensureElements() {
    if (!this.querySelector(".events-page__panel")) {
      this.innerHTML = `
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

    this.cacheElements();
  }

  cacheElements() {
    this.newButton = this.querySelector("#new-event");
    this.list = this.querySelector("#event-list");
    this.emptyState = this.querySelector("#empty-state");
  }

  bindCreateNew(handler) {
    if (!this.newButton) {
      this.ensureElements();
    }

    if (!this.newButton) return;
    this.newButton.addEventListener("click", handler);
  }

  bindSelectEvent(handler) {
    if (!this.list) {
      this.ensureElements();
    }

    if (!this.list) return;
    this.list.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-event-id]");
      if (!button) return;

      handler(Number(button.dataset.eventId));
    });
  }

  renderEventList(events, selectedEventId) {
    if (!this.list || !this.emptyState) {
      this.ensureElements();
    }

    if (!this.list || !this.emptyState) return;
    this.list.querySelectorAll("eventbuddy-event-item").forEach((item) => item.remove());

    if (events.length === 0) {
      this.emptyState.hidden = false;
      return;
    }

    this.emptyState.hidden = true;

    events.forEach((event) => {
      const item = document.createElement("eventbuddy-event-item");
      item.setAttribute("event-id", String(event.id));
      item.setAttribute("title", event.title);
      item.setAttribute("description", event.description);
      item.setAttribute("active", event.id === selectedEventId ? "true" : "false");
      this.list.appendChild(item);
    });
  }
}

window.EventListView = EventListView;
