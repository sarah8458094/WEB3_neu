class EventView extends HTMLElement {
  connectedCallback() {
    this.ensureElements();
  }

  ensureElements() {
    if (!this.querySelector(".events-page")) {
      this.innerHTML = `
        <section class="events-page">
          <header class="events-page__header">
            <h1 class="events-page__brand">EventBuddy</h1>
            <p class="events-page__subtitle">Events anlegen und durch Anklicken bearbeiten.</p>
          </header>

          <section class="events-page__content">
            <eventbuddy-event-list></eventbuddy-event-list>
            <eventbuddy-event-editor></eventbuddy-event-editor>
          </section>
        </section>
      `;
    }

    this.cacheElements();
  }

  cacheElements() {
    this.listView = this.querySelector("eventbuddy-event-list");
    this.editorView = this.querySelector("eventbuddy-event-editor");
  }

  bindCreateNew(handler) {
    if (!this.listView) {
      this.ensureElements();
    }

    if (!this.listView) return;
    this.listView.bindCreateNew(handler);
  }

  bindSaveEvent(handler) {
    if (!this.editorView) {
      this.ensureElements();
    }

    if (!this.editorView) return;
    this.editorView.bindSaveEvent(handler);
  }

  bindDeleteEvent(handler) {
    if (!this.editorView) {
      this.ensureElements();
    }

    if (!this.editorView) return;
    this.editorView.bindDeleteEvent(handler);
  }

  bindSelectEvent(handler) {
    if (!this.listView) {
      this.ensureElements();
    }

    if (!this.listView) return;
    this.listView.bindSelectEvent(handler);
  }

  getFormData() {
    if (!this.editorView) {
      this.ensureElements();
    }

    if (!this.editorView) {
      return { title: "", description: "" };
    }

    return this.editorView.getFormData();
  }

  setFormData(formData) {
    if (!this.editorView) {
      this.ensureElements();
    }

    if (!this.editorView) return;
    this.editorView.setFormData(formData);
  }

  setHeading(isEditMode) {
    if (!this.editorView) {
      this.ensureElements();
    }

    if (!this.editorView) return;
    this.editorView.setHeading(isEditMode);
  }

  setDeleteEnabled(enabled) {
    if (!this.editorView) {
      this.ensureElements();
    }

    if (!this.editorView) return;
    this.editorView.setDeleteEnabled(enabled);
  }

  renderEventList(events, selectedEventId) {
    if (!this.listView) {
      this.ensureElements();
    }

    if (!this.listView) return;
    this.listView.renderEventList(events, selectedEventId);
  }
}

window.EventView = EventView;
