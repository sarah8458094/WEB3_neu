import "./event-list-view.js";
import "./event-editor-view.js";

export class EventView extends HTMLElement {
  #listView;
  #editorView;

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.querySelector(".events-page")) {
      this.innerHTML = this.template();
    }

    this.#listView = this.querySelector("eventbuddy-event-list");
    this.#editorView = this.querySelector("eventbuddy-event-editor");
  }

  setFormData(formData) {
    if (!this.#editorView) {
      this.render();
    }

    if (!this.#editorView) return;
    this.#editorView.setFormData(formData);
  }

  resetEditor() {
    if (!this.#editorView) {
      this.render(); // Falls der Editor noch nicht im DOM ist, erst rendern
    }

    if (!this.#editorView) return;
    this.#editorView.reset(); // Ruft die neue reset() Methode im Editor auf
  }

  setHeading(isEditMode) {
    if (!this.#editorView) {
      this.render();
    }

    if (!this.#editorView) return;
    this.#editorView.setHeading(isEditMode);
  }

  setDeleteEnabled(enabled) {
    if (!this.#editorView) {
      this.render();
    }

    if (!this.#editorView) return;
    this.#editorView.setDeleteEnabled(enabled);
  }

  renderEventList(events, selectedEventId) {
    if (!this.#listView) {
      this.render();
    }

    if (!this.#listView) return;
    this.#listView.renderEventList(events, selectedEventId);
  }

  template() {
    return `
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
}

if (!customElements.get("eventbuddy-events")) {
  customElements.define("eventbuddy-events", EventView);
}
