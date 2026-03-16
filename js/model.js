class EventModel {
  constructor() {
    this.events = [];
  }

  async loadFromUrl(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load events: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Invalid events payload");
    }

    this.events = data.map((event) => ({
      id: Number(event.id),
      title: String(event.title ?? ""),
      description: String(event.description ?? "")
    })).filter((event) => event.title && event.description);
  }

  getEvents() {
    return [...this.events];
  }

  getEventById(id) {
    return this.events.find((event) => event.id === id) || null;
  }

  createEvent({ title, description }) {
    const event = {
      id: Date.now(),
      title,
      description
    };

    this.events.unshift(event);
    return event;
  }

  updateEvent(id, { title, description }) {
    const index = this.events.findIndex((event) => event.id === id);
    if (index < 0) return null;

    this.events[index] = {
      ...this.events[index],
      title,
      description
    };

    return this.events[index];
  }

  deleteEvent(id) {
    const index = this.events.findIndex((event) => event.id === id);
    if (index < 0) return false;

    this.events.splice(index, 1);
    return true;
  }

}

window.EventModel = EventModel;
