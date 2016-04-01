import ContactFormView from 'form-view';
import ContactView from 'item-view';

export default class ApplicationView {
  constructor(element) {
    this.contactListEl = element.querySelector(`.contacts`);
    this.form = element.querySelector(`.contact-form`);
    this.attachForm();

    fetch(`http://tiny-tn.herokuapp.com/collections/contacts`)
      .then(res => res.json())
      .then((data) => {
        this.data = data;

        this.render();
      });
  }

  addContact(contact) {
    this.data = [...this.data, contact];

    this.render();
  }

  remove(contact) {
    this.data = this.data.filter((item) => {
      return item._id !== contact._id;
    });

    this.render();
  }

  attachForm() {
    this.formView = new ContactFormView(this.form, this);
  }

  render() {
    this.contactListEl.innerHTML = ``;

    this.data.forEach((item) => {
      const itemView = new ContactView(item, this);

      this.contactListEl.appendChild(itemView.element);
    });
  }
}
