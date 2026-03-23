export class EventEditorView extends HTMLElement {
  #form;
  #deleteButton;
  #heading;
  #titleInput;
  #descriptionInput;

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.querySelector(".events-page__panel")) {
      this.innerHTML = this.template();
    }

    this.#cacheElements();
    this.#bindEvents();
  }

  #cacheElements() {
    this.#form = this.querySelector("form");
    this.#deleteButton = this.querySelector("#delete-event");
    this.#heading = this.querySelector("#editor-heading");
    this.#titleInput = this.querySelector("#title");
    this.#descriptionInput = this.querySelector("#description");
  }

  #bindEvents() {
    if (this.#form) {
      this.#form.addEventListener("submit", (event) => {
        event.preventDefault(); //seite nicht neuladen
        //an controller schicken
        this.dispatchEvent(new CustomEvent("save-event", {
          bubbles: true,
          detail: this.getFormData() //Titel und Beschreibung aus input
        }));
      });
    }

    if (this.#deleteButton) {
      this.#deleteButton.addEventListener("click", () => {
        const shouldDelete = window.confirm("Möchtest du dieses Event wirklich löschen?");
        if (shouldDelete) {
          this.dispatchEvent(new CustomEvent("delete-event", {bubbles: true}));
        }
      });
    }
  }

  reset() {
    this.setFormData({ title: "", description: "" });
  }

  //daten aus view
  getFormData() {
    //Einagbefelder da?
    if (!this.#titleInput || !this.#descriptionInput) {
      this.render(); //falls nicht...aufbauen!
    }

    if (!this.#titleInput || !this.#descriptionInput) {
      return { title: "", description: "" };
    }

    //rückgabe als sauberes objekt
    return {
      title: this.#titleInput.value.trim(), //value holt wert aus eingabefeld
      description: this.#descriptionInput.value.trim()
    };
  }

  //daten ins view
  setFormData({ title, description }) {
    if (!this.#titleInput || !this.#descriptionInput) {
      this.render();
    }

    if (!this.#titleInput || !this.#descriptionInput) return;
    this.#titleInput.value = title;
    this.#descriptionInput.value = description;
  }

  setHeading(isEditMode) {
    if (!this.#heading) {
      this.render();
    }

    if (!this.#heading) return;
    //nutzt data attribute aus html
    const newText = this.#heading.dataset.newText || "Neues Event";
    const editText = this.#heading.dataset.editText || "Event bearbeiten";
    //ändert überschrift
    this.#heading.textContent = isEditMode ? editText : newText;
  }

  setDeleteEnabled(enabled) {
    if (!this.#deleteButton) {
      this.render();
    }

    if (!this.#deleteButton) return;
    this.#deleteButton.disabled = !enabled;
  }

  template() {
    return `
      <div class="events-page__panel">
        <h2 class="events-page__panel-title" id="editor-heading" data-new-text="Neues Event" data-edit-text="Event bearbeiten">Neues Event</h2>
        <form class="events-page__form">
          <label class="events-page__label" for="title">Titel</label>
          <input class="events-page__input" id="title" type="text" required />

          <label class="events-page__label" for="description">Beschreibung</label>
          <textarea class="events-page__textarea" id="description" required></textarea>

          <div class="events-page__form-actions">
            <button class="events-page__button" type="submit">Event speichern</button>
            <button class="events-page__button events-page__button--danger" id="delete-event" type="button" disabled>Event löschen</button>
          </div>
        </form>
      </div>
    `;
  }
}

if (!customElements.get("eventbuddy-event-editor")) {
  customElements.define("eventbuddy-event-editor", EventEditorView);
}
