import { LitElement, html, css } from 'lit';

class MediaPlayerControls extends LitElement {
  // Define properties for the component
  static properties = {
    title: { type: String },
    chapter: { type: Number },
    playCount: { type: Number },
    likes: { type: Number },
    dislikes: { type: Number }
  };

  // Initialize default values
  constructor() {
    super();
    this.title = 'IZURE SAIKYOU NO RENKINJUTSUHI: IZURE SAIKYOU NO RENKINJUTSUHI?';
    this.chapter = 10;
    this.playCount = 5;
    this.likes = 1;
    this.dislikes = 0;
  }

  // Define styles for the component
  static styles = css`
    :host {
      display: block;
      background-color: #2b1a3b;
      color: white;
      padding: 16px;
      font-family: Arial, sans-serif;
      border-radius: 8px;
    }
    .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #1a0f2b;
      border-radius: 4px;
      margin-bottom: 16px;
      padding: 1rem;
    }
    .nav-button {
      background: none;
      border: none;
      color: white;
      font-size: 4rem;
      font-weight:800;
      cursor: pointer;
    }
    .nav-button:hover {
      opacity: 0.8;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .chapter {
      font-size: 14px;
      margin-bottom: 4px;
    }
    .play-count {
      font-size: 14px;
      margin-bottom: 8px;
    }
    .buttons {
      display: flex;
      gap: 16px;
    }
    .action-button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
    }
    .action-button:hover {
      opacity: 0.8;
    }
  `;

  // Emit custom event for Previous button
  _handlePrevious() {
    this.dispatchEvent(new CustomEvent('switch', {
      detail: { action: 'previous' },
      bubbles: true,
      composed: true
    }));
  }

  // Emit custom event for Menu button
  _handleMenu() {
    this.dispatchEvent(new CustomEvent('switch', {
      detail: { action: 'menu' },
      bubbles: true,
      composed: true
    }));
  }

  // Emit custom event for Next button
  _handleNext() {
    this.dispatchEvent(new CustomEvent('switch', {
      detail: { action: 'next' },
      bubbles: true,
      composed: true
    }));
  }

  // Emit custom event for Like button and update counter
  _handleLike() {
    this.likes += 1;
    this.dispatchEvent(new CustomEvent('switch', {
      detail: { action: 'like', value: this.likes },
      bubbles: true,
      composed: true
    }));
    this.requestUpdate();
  }

  // Emit custom event for Dislike button and update counter
  _handleDislike() {
    this.dislikes += 1;
    this.dispatchEvent(new CustomEvent('switch', {
      detail: { action: 'dislike', value: this.dislikes },
      bubbles: true,
      composed: true
    }));
    this.requestUpdate();
  }

  // Render the component
  render() {
    return html`
      <div class="nav-bar">
        <button class="nav-button" @click=${this._handlePrevious}>←</button>
        <button class="nav-button" @click=${this._handleMenu}>≡</button>
        <button class="nav-button" @click=${this._handleNext}>→</button>
      </div>
      <div class="title">${this.title}</div>
      <div class="chapter">Capítulo: ${this.chapter}</div>
      <div class="play-count">${this.playCount} Reproducciones</div>
      <div class="buttons">
        <button class="action-button" @click=${this._handleLike}>
          👍 ${this.likes}
        </button>
        <button class="action-button" @click=${this._handleDislike}>
          👎 ${this.dislikes}
        </button>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('media-controls', MediaPlayerControls);