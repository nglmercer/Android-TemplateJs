import { LitElement, html, css } from 'lit';

class SynopsisComponent extends LitElement {
  static properties = {
    text: { type: String },
    maxHeight: { type: Number, attribute: 'max-height' },
    fontSize: { type: String, attribute: 'font-size' },
    isExpanded: { type: Boolean, state: true },
    _needsTruncation: { type: Boolean, state: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }
    .synopsis-container {
      position: relative;
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
    }
    .synopsis-text {
      margin: 0;
      padding: 0;
      line-height: 1.5;
    }
    .toggle-text {
      cursor: pointer;
      margin-top: 5px;
      font-weight: bold;
      display: inline-block;
    }
    .toggle-text.show-more {
      color: #007bff;
    }
    .toggle-text.show-more:hover {
      color: #0056b3;
      text-decoration: underline;
    }
    .toggle-text.show-less {
      color: #dc3545;
    }
    .toggle-text.show-less:hover {
      color: #a71d2a;
      text-decoration: underline;
    }
  `;

  constructor() {
    super();
    this.text = '';
    this.maxHeight = 100;
    this.fontSize = '1.1em';
    this.isExpanded = false;
    this._needsTruncation = false;
    this._checkIfTruncationNeeded = this._checkIfTruncationNeeded.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._checkIfTruncationNeeded);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._checkIfTruncationNeeded);
    super.disconnectedCallback();
  }

  firstUpdated(changedProperties) {
    this._checkIfTruncationNeeded();
  }

  updated(changedProperties) {
    if (changedProperties.has('text') || changedProperties.has('maxHeight')) {
      this._checkIfTruncationNeeded();
    }
  }

  _checkIfTruncationNeeded() {
    requestAnimationFrame(() => {
      const textElement = this.shadowRoot.querySelector('.synopsis-text');
      if (!textElement) return;

      const container = this.shadowRoot.querySelector('.synopsis-container');
      const originalMaxHeight = container.style.maxHeight;
      container.style.maxHeight = 'none';

      const scrollHeight = textElement.scrollHeight;
      if (!this.isExpanded) {
        container.style.maxHeight = originalMaxHeight || `${this.maxHeight}px`;
      }

      const needsTruncation = scrollHeight > this.maxHeight + 2;
      if (this._needsTruncation !== needsTruncation) {
        this._needsTruncation = needsTruncation;
      }
      if (!needsTruncation && this.isExpanded) {
        this.isExpanded = false;
      }
    });
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  _handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleExpand();
    }
  }

  render() {
    const showAction = (this._needsTruncation && !this.isExpanded) || this.isExpanded;
    const actionText = this.isExpanded ? 'Ver menos' : 'Ver más';

    return html`
      <div
        class="synopsis-container"
        style="max-height: ${this.isExpanded || !this._needsTruncation ? 'none' : `${this.maxHeight}px`}"
      >
        <p class="synopsis-text" style="font-size: ${this.fontSize}">
          ${this.text}
        </p>
      </div>
      ${showAction
        ? html`
            <span
              class="toggle-text ${this.isExpanded ? 'show-less' : 'show-more'}"
              role="button"
              tabindex="0"
              @click=${this.toggleExpand}
              @keydown=${this._handleKeydown}
            >
              ${actionText}
            </span>
          `
        : ''}
    `;
  }
}

customElements.define('synopsis-component', SynopsisComponent);
export { SynopsisComponent };