const DEFAULT_EVENTS_URL = "../.json/settings.json";

class EventModel extends EventTarget {
  #events;
  #selectedEventId;

  constructor() {
    super();
    this.#events = [];
    this.#selectedEventId = null;
    this.loadFromUrl(DEFAULT_EVENTS_URL).catch(() => {}); //falls fehler...weiter mit leerer liste
  }

  async loadFromUrl(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load events: ${response.status}`);
    }

    const data = await response.json(); //text in java-script objekte
    if (!Array.isArray(data)) {
      throw new Error("Invalid events payload");
    }

    // Daten bereinigen: Nur vollständige Events mit ID, Titel und Beschreibung behalten
    this.#events = data.map((event) => ({
      id: Number(event.id),
      title: String(event.title ?? ""),
      description: String(event.description ?? "")
    })).filter((event) => event.title && event.description);
    // benachrichtigt die App, dass neue Daten da sind
    this.#emitChange();
  }

  // returns eine Kopie der aktuellen Event-Liste
  getEvents() {
    return [...this.#events];
  }

  getSelectedEventId() {
    return this.#selectedEventId;
  }

  setSelectedEventId(id) {
    this.#selectedEventId = id === null ? null : Number(id);
  }

  //sucht ein event anhand der ID
  getEventById(id) {
    return this.#events.find((event) => event.id === id) || null;
  }

  //neues event erstellen und oben anfügen
  createEvent({ title, description }) {
    const event = {
      id: Date.now(), //eindeutige ID über Zeitstempel
      title,
      description
    };

    this.#events.unshift(event); //vorne in Liste einfügen
    this.#emitChange();
    return event;
  }

  //bestehendes Event aktualisieren
  updateEvent(id, { title, description }) {
    //sucht position(index) vom event
    const index = this.#events.findIndex((event) => event.id === id);
    if (index < 0) return null;

    //bestehende objekt mit neue Daten überschreiben
    this.#events[index] = {
      ...this.#events[index],
      title,
      description
    };

    this.#emitChange();
    return this.#events[index];
  }

  deleteEvent(id) {
    const index = this.#events.findIndex((event) => event.id === id);
    if (index < 0) return false;

    this.#events.splice(index, 1); //entfernt element aus index
    if (this.#selectedEventId === id) {
      this.#selectedEventId = null;
    }
    this.#emitChange();
    return true;
  }

  #emitChange() {
    this.dispatchEvent(new CustomEvent("events-changed"));
  }
}

//exportiert eine instanz...damit überall die selben Daten genutzt werden
export const model = new EventModel();
