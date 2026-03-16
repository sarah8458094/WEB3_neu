class EventEditorView extends HTMLElement {
  connectedCallback() {
    this.ensureElements();
  }

  ensureElements() {
    if (!this.querySelector(".events-page__panel")) {
      this.innerHTML = `
        <div class="events-page__panel">
          <h2 class="events-page__panel-title" id="editor-heading" data-new-text="Neues Event" data-edit-text="Event bearbeiten">Neues Event</h2>
          <form class="events-page__form">
            <label class="events-page__label" for="title">Titel</label>
            <input class="events-page__input" id="title" type="text" required />

            <label class="events-page__label" for="description">Beschreibung</label>
            <textarea class="events-page__textarea" id="description" required></textarea>

            <div class="events-page__form-actions">
              <button class="events-page__button" type="submit">Event speichern</button>
              <button class="events-page__button events-page__button--danger" id="delete-event" type="button" disabled>Event loeschen</button>
            </div>
          </form>
        </div>
      `;
    }

    this.cacheElements();
  }

  cacheElements() {
    this.form = this.querySelector("form");
    this.deleteButton = this.querySelector("#delete-event");
    this.heading = this.querySelector("#editor-heading");
    this.titleInput = this.querySelector("#title");
    this.descriptionInput = this.querySelector("#description");
  }

  bindSaveEvent(handler) {
    if (!this.form) {
      this.ensureElements();
    }

    if (!this.form) return;
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      handler(this.getFormData());
    });
  }

  bindDeleteEvent(handler) {
    if (!this.deleteButton) {
      this.ensureElements();
    }

    if (!this.deleteButton) return;
    this.deleteButton.addEventListener("click", handler);
  }

  getFormData() {
    if (!this.titleInput || !this.descriptionInput) {
      this.ensureElements();
    }

    if (!this.titleInput || !this.descriptionInput) {
      return { title: "", description: "" };
    }

    return {
      title: this.titleInput.value.trim(),
      description: this.descriptionInput.value.trim()
    };
  }

  setFormData({ title, description }) {
    if (!this.titleInput || !this.descriptionInput) {
      this.ensureElements();
    }

    if (!this.titleInput || !this.descriptionInput) return;
    this.titleInput.value = title;
    this.descriptionInput.value = description;
  }

  setHeading(isEditMode) {
    if (!this.heading) {
      this.ensureElements();
    }

    if (!this.heading) return;
    const newText = this.heading.dataset.newText || "Neues Event";
    const editText = this.heading.dataset.editText || "Event bearbeiten";
    this.heading.textContent = isEditMode ? editText : newText;
  }

  setDeleteEnabled(enabled) {
    if (!this.deleteButton) {
      this.ensureElements();
    }

    if (!this.deleteButton) return;
    this.deleteButton.disabled = !enabled;
  }
}

window.EventEditorView = EventEditorView;
