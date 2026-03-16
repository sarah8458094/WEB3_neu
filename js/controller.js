class EventController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.selectedEventId = null;
  }

  init() {
    this.view.bindCreateNew(() => this.handleCreateNew());
    this.view.bindSaveEvent((formData) => this.handleSave(formData));
    this.view.bindDeleteEvent(() => this.handleDelete());
    this.view.bindSelectEvent((eventId) => this.handleSelect(eventId));

    this.render();
  }

  handleCreateNew() {
    this.selectedEventId = null;
    this.view.setFormData({ title: "", description: "" });
    this.render();
  }

  handleSelect(eventId) {
    const event = this.model.getEventById(eventId);
    if (!event) return;

    this.selectedEventId = eventId;
    this.view.setFormData({
      title: event.title,
      description: event.description
    });

    this.render();
  }

  handleSave(formData) {
    if (!formData.title || !formData.description) {
      return;
    }

    if (this.selectedEventId === null) {
      const event = this.model.createEvent(formData);
      this.selectedEventId = event.id;
    } else {
      this.model.updateEvent(this.selectedEventId, formData);
    }

    this.render();
  }

  handleDelete() {
    if (this.selectedEventId === null) {
      return;
    }

    const deleted = this.model.deleteEvent(this.selectedEventId);
    if (!deleted) {
      return;
    }

    this.selectedEventId = null;
    this.view.setFormData({ title: "", description: "" });
    this.render();
  }

  render() {
    const isEditMode = this.selectedEventId !== null;
    this.view.setHeading(isEditMode);
    this.view.setDeleteEnabled(isEditMode);
    this.view.renderEventList(this.model.getEvents(), this.selectedEventId);
  }
}

window.EventController = EventController;
