if (!customElements.get("eventbuddy-events")) {
  customElements.define("eventbuddy-events", window.EventView);
}

if (!customElements.get("eventbuddy-event-list")) {
  customElements.define("eventbuddy-event-list", window.EventListView);
}

if (!customElements.get("eventbuddy-event-item")) {
  customElements.define("eventbuddy-event-item", window.EventItemView);
}

if (!customElements.get("eventbuddy-event-editor")) {
  customElements.define("eventbuddy-event-editor", window.EventEditorView);
}

const eventElement = document.querySelector("eventbuddy-events");
const model = new window.EventModel();
const controller = new window.EventController(model, eventElement);

model.loadFromUrl("../.json/settings.json")
  .catch(() => {})
  .finally(() => {
    controller.init();
  });
