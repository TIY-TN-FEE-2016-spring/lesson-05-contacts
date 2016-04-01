import ContactFormView from 'form-view';
import ContactView from 'item-view';

export default class ApplicationView {
  /**
   * Sets up a new instance of an ApplicationView
   * @param  Element element Element that should be attached to
   */
  constructor(element) {
    // Store the "contacts" list for later
    this.contactListEl = element.querySelector(`.contacts`);
    // Store the form element for use later
    this.formEl = element.querySelector(`.contact-form`);

    this.attachForm();

    // Get starting data for the app
    fetch(`http://tiny-tn.herokuapp.com/collections/contacts`)
      .then(res => res.json())
      .then((data) => {
        // Set the data based on returned results from the API
        this.data = data;

        this.render();
      });
  }

  /**
   * Updates the list of contacts with a new item on the end
   *
   * @param POJO contact Contact to add to the list of contacts
   */
  addContact(contact) {
    // Create a new array with the list of existing items and the new contact at the end
    this.data = [...this.data, contact];

    // Rerender the list
    this.render();
  }

  /**
   * Updates the array of data removing an item by it's id
   *
   * @param  POJO contact Contact to be removed from the list
   */
  remove(contact) {
    // Filter out any items that have the same _id as the 'contact'
    this.data = this.data.filter((item) => {
      return item._id !== contact._id;
    });

    this.render();
  }

  /**
   * Setup a ContactFormView instance to handle form submissions
   */
  attachForm() {
    this.formView = new ContactFormView(this.formEl, this);
  }

  render() {
    this.contactListEl.innerHTML = ``;

    this.data.forEach((item) => {
      const itemView = new ContactView(item, this);

      this.contactListEl.appendChild(itemView.element);
    });
  }
}
