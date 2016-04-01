export default class ContactFormView {
  constructor(element, application) {
    this.element = element;
    this.application = application;

    this.element.addEventListener(`submit`, (ev) => {
      // Stop the browser from reloading
      ev.preventDefault();

      const formData = {
        first: this.element.querySelector(`.contact-form__first`).value,
        last: this.element.querySelector(`.contact-form__last`).value,
      };

      fetch(`http://tiny-tn.herokuapp.com/collections/contacts`, {
        method: `post`,
        headers: {
          Accept: `application/json`,
          'Content-Type': `application/json`,
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json())
      .then((data) => {
        this.element.querySelector(`.contact-form__first`).value = ``;
        this.element.querySelector(`.contact-form__last`).value = ``;

        // Inform the application that a new contact exists in the list
        this.application.addContact(data);
      });
    });
  }
}
