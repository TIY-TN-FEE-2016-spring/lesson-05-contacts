export default class ContactView {
  constructor(data, application) {
    this.data = data;
    this.application = application;

    this.element = document.createElement(`li`);
    this.element.classList.add(`contacts__item`);
    this.element.innerHTML = `
      <span class="first"></span>, <span class="last"></span> <button class="remove">X</button>
    `;

    this.element.querySelector(`.remove`).addEventListener(`click`, () => {
      this.remove();
    });

    this.render();
  }

  remove() {
    fetch(`http://tiny-tn.herokuapp.com/collections/contacts/${this.data._id}`, {
      method: `delete`,
      headers: {
        Accept: `application/json`,
        'Content-Type': `application/json`,
      },
    }).then((res) => res.json())
    .then((data) => {
      this.application.remove(this.data);
    });
  }

  render() {
    this.element.querySelector(`.first`).innerText = this.data.first;
    this.element.querySelector(`.last`).innerText = this.data.last;
  }
}
