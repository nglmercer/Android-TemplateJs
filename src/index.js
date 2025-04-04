class MyElement extends HTMLElement {
  connectedCallback() {
    const textContent = `<h1>Hello, Vanilla JavaScript!</h1>`;
    this.innerHTML = textContent + JSON.stringify(window.location);
  }
}
customElements.define('my-element', MyElement);
