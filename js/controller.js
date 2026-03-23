import { model } from "./model.js";

class EventController {
  constructor() {
    this.model = model;
    this.view = document.querySelector("eventbuddy-events"); //sucht haupt view
  }

  init() {
    //nachrichten von view
    this.view.addEventListener("create-new", () => this.handleCreateNew());
    this.view.addEventListener("save-event", (event) => this.handleSave(event.detail));
    this.view.addEventListener("delete-event", () => this.handleDelete());
    this.view.addEventListener("select-event", (event) => this.handleSelect(event.detail.eventId));

    //nachrichten von model
    this.model.addEventListener("events-changed", () => this.render());
    //erstmaliges zeichnen beim start
    this.render();
  }

  handleCreateNew() {
    this.model.setSelectedEventId(null);
    this.view.resetEditor(); // Postbote: "View, mach dich leer!"
    this.render();
  }

  handleSelect(eventId) {
    const event = this.model.getEventById(eventId);
    if (!event) return;

    this.model.setSelectedEventId(eventId);
    //Daten von Model in Editor
    this.view.setFormData(event); // Reicht das Event-Objekt einfach durch
    this.render();
  }

  handleSave(formData) {
    if (!formData.title || !formData.description) {
      return;
    }

    const selectedEventId = this.model.getSelectedEventId();
    if (selectedEventId === null) {
      //neues event anlegen
      const event = this.model.createEvent(formData);
      this.model.setSelectedEventId(event.id); //neues element als ausgewählt markieren
    } else {
      //bestehendes aktualisieren
      this.model.updateEvent(selectedEventId, formData);
    }

    this.render();
  }

  handleDelete() {
    const id = this.model.getSelectedEventId();
    if (id === null) return;

    this.model.deleteEvent(id); // Befehl ans Model
    this.model.setSelectedEventId(null); // Auswahl im Model löschen
    this.view.resetEditor(); // View aufräumen
    this.render();
  }

  render() {
    const selectedId = this.model.getSelectedEventId();
    this.view.setHeading(selectedId !== null);
    this.view.setDeleteEnabled(selectedId !== null);
    this.view.renderEventList(this.model.getEvents(), selectedId);
  }
}

export const controller = new EventController();
