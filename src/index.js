import Application from 'application';

export default function() {
  // Creates a new instance of the application view and attaches it to the "body" element
  new Application(document.querySelector(`body`));
}
