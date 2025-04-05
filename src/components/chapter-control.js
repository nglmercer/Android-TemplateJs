import { LitElement, html, css } from 'lit';

class ChapterControl extends LitElement {
  // Definimos las propiedades que el componente aceptará
  static get properties() {
    return {
      showTitle: { type: String },      // Título del programa (ej. "Solo Leveling")
      seasonTitle: { type: String },    // Título de la temporada (ej. "Season 1")
      currentChapter: { type: Number }, // Capítulo actual
      totalChapters: { type: Number },  // Total de capítulos
      views: { type: Number },          // Número de reproducciones
      likes: { type: Number },          // Cantidad de "me gusta"
      dislikes: { type: Number }        // Cantidad de "no me gusta"
    };
  }

  // Estilos CSS del componente
  static get styles() {
    return css`
      :host {
        --background-color: #663399; /* Púrpura oscuro de fondo */
        --nav-background: #552288;   /* Púrpura más oscuro para la barra de navegación */
        --text-color: white;         /* Color del texto */
        --icon-color: white;         /* Color de los iconos */
        --button-background: transparent; /* Fondo de los botones */
        --button-color: white;       /* Color de los botones */
      }
      .navigation-bar {
        display: flex;
        justify-content: space-between;
        background-color: var(--nav-background);
        padding: 10px;
      }
      .navigation-bar button {
        background-color: var(--button-background);
        color: var(--button-color);
        border: none;
        font-size: 1.5em;
        cursor: pointer;
      }
      .main-info {
        background-color: var(--background-color);
        color: var(--text-color);
        padding: 20px;
        text-align: center;
      }
      .main-info h1 {
        font-size: 2em;
      }
      .main-info p {
        font-size: 1.2em;
      }
      .interaction-buttons {
        display: flex;
        justify-content: center;
        background-color: var(--background-color);
        padding: 10px;
      }
      .interaction-buttons button {
        background-color: var(--button-background);
        color: var(--button-color);
        border: none;
        font-size: 1.5em;
        margin: 0 10px;
        cursor: pointer;
      }
    `;
  }

  // Plantilla HTML del componente
  render() {
    return html`
      <div class="navigation-bar">
        <div class="left">
          <button class="close" @click="${this._onCloseClick}">X</button>
        </div>
        <div class="center">
          <button class="menu" @click="${this._onMenuClick}">☰</button>
        </div>
        <div class="right">
          <button class="previous" ?disabled="${this.currentChapter === 1}" @click="${this._onPreviousClick}">←</button>
          <button class="next" ?disabled="${this.currentChapter === this.totalChapters}" @click="${this._onNextClick}">→</button>
        </div>
      </div>
      <div class="main-info">
        <h1><strong>${this.showTitle}</strong>: ${this.seasonTitle}</h1>
        <p>Capítulo: <strong>${this.currentChapter}</strong></p>
        <p>${this.views} Reproducciones</p>
      </div>
      <div class="interaction-buttons">
        <button class="like" @click="${this._onLikeClick}">👍 ${this.likes}</button>
        <button class="dislike" @click="${this._onDislikeClick}">👎 ${this.dislikes}</button>
      </div>
    `;
  }

  // Manejadores de eventos
  _onCloseClick() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  _onMenuClick() {
    this.dispatchEvent(new CustomEvent('open-menu'));
  }

  _onPreviousClick() {
    if (this.currentChapter > 1) {
      this.dispatchEvent(new CustomEvent('chapter-change', { detail: { direction: 'previous' } }));
    }
  }

  _onNextClick() {
    if (this.currentChapter < this.totalChapters) {
      this.dispatchEvent(new CustomEvent('chapter-change', { detail: { direction: 'next' } }));
    }
  }

  _onLikeClick() {
    this.dispatchEvent(new CustomEvent('like'));
  }

  _onDislikeClick() {
    this.dispatchEvent(new CustomEvent('dislike'));
  }
}

// Registramos el componente
customElements.define('chapter-control', ChapterControl);