// anime-grid.js
import { LitElement, html, css } from 'lit';
import '../assets/fonts.css';

export class AnimeGrid extends LitElement {
  static properties = {
    animes: { type: Array },
    columns: { type: Number },
    minWidth: { type: String }
  };

  constructor() {
    super();
    this.animes = [];
    this.columns = 5; // Número de columnas por defecto
    this.minWidth = '150px'; // Ancho mínimo por defecto
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(fontAwesomeLink);
  }

  static styles = css`
    :host {
      --primary-color: #2e0d4a;
      --primary-color-light: #3a1860;
      --secondary-color: #ffffff;
      --accent-color: #592ac2;
      --text-color: #ffffff;
      --status-upcoming: #808080; /* Color gris para próximamente */
      --status-finished: #87CEEB; /* Color celeste para finalizado */
      --status-airing: var(--accent-color); /* Color para en emisión */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: block;
      width: 100%;
      --min-width: 150px;
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 240px));
      gap: 20px;
      padding: 20px;
      width: 100%;
    }

    .anime-card {
      cursor: pointer;
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: var(--primary-color);
      border-radius: 10px;
      overflow: hidden;
      transition: transform 0.3s ease;
      user-select: none;
      max-height: 24rem;
      max-width: 18rem;
      justify-content: start; /* Alinea los elementos al inicio */
    }

    .anime-card:hover {
      transform: translateY(-5px);
    }

    .anime-image {
      position: relative;
      width: 100%;
      aspect-ratio: 2/3;
      background-size: cover;
      background-position: center;
      margin: 0;
      user-select: none;
      border-radius: 10px;
      overflow: hidden;
      transition: transform 0.3s ease;
    }
    
    .anime-card:hover .anime-image {
      transform: scale(1.05);
    }
    
    .play-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 3rem;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 2;
    }
    
    .anime-card:hover .play-icon {
      opacity: 1;
    }
    
    /* Overlay oscuro al hacer hover */
    .anime-image::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }
    
    .anime-card:hover .anime-image::after {
      opacity: 1;
    }

    .episode-badge {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: rgba(40, 13, 63, 0.706);
      padding: 5px 0;
      border-radius: 5px;
      color: var(--text-color);
      font-weight: 700;
      font-family: 'nexa-black', sans-serif;
      margin: 0 5px 5px 0;
      user-select: none;
    }

    .episode-text {
      font-size: 15px;
      padding: 5px 10px;
      font-family: 'montserrat-light', sans-serif;
      margin: 0;
      user-select: none;
    }

    .anime-info {
      padding: 10px;
    }

    .anime-title {
      font-family: 'nexa-bold', sans-serif;
      margin: 0 0 5px 0;
      font-size: 18px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: none;
    }

    .anime-languages {
      font-family: 'nexa-black', sans-serif;
      margin: 0;
      font-size: 12px;
      color: var(--text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: none;
    }

    /* Media queries para ajustar el tamaño de las tarjetas */
    @media (max-width: 1200px) {
      .grid-container {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }
    }

    @media (max-width: 768px) {
      .grid-container {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      }
    }

    @media (max-width: 480px) {
      .grid-container {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 10px;
        padding: 10px;
      }

      .anime-title {
        font-size: 14px;
      }

      .anime-languages {
        font-size: 10px;
      }
    }
  `;

  _handleAnimeClick(anime) {
    // Despachar un evento personalizado con la información del anime
    const event = new CustomEvent('anime-selected', {
      detail: anime,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  updated(changedProperties) {
    if (changedProperties.has('minWidth') || changedProperties.has('columns')) {
      this.updateStyles();
    }
  }

  updateStyles() {
    // Actualizar el estilo CSS personalizado para el grid
    this.style.setProperty('--min-width', this.minWidth);
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
      <div class="grid-container">
        ${this.animes && this.animes.length > 0 ? this.animes.map(anime => html`
          <div class="anime-card" tabindex="0" @click=${() => this._handleAnimeClick(anime)}>

            
            <div class="anime-image" style="background-image: url('${anime.imageUrl}');">
              <i class="far fa-play-circle play-icon"></i>
              <div class="episode-badge">
                <span class="episode-text">${anime.episodes}</span>
              </div>
            </div>
            
            <div class="anime-info">
              <div class="anime-title">${anime.title}</div>
              <div class="anime-languages">${anime.languages}</div>
            </div>
          </div>
        `) : html`<div>No hay animes disponibles</div>`}
      </div>
    `;
  }
}

customElements.define('anime-grid', AnimeGrid);
/*
styles not used:
    .status-badge {
      position: absolute;
      left: 0;
      right: 0;
      top: -15px;
      z-index: 10;
      display: flex;
      justify-content: center;
      border-radius: 5px;
      color: var(--text-color);
      font-weight: 700;
      font-family: 'nexa-black', sans-serif;
      margin: 0;
      user-select: none;
    }

    .status-badge-inner {
      background-color: var(--status-airing);
      padding: 5px 15px;
      rotate: -3deg;
      position: absolute;
      border-radius: 3px;
      text-transform: uppercase;
      font-family: 'nexa-black', sans-serif;
      margin: 0 5px 5px 0;
      user-select: none;
    }
    
    .status-badge-inner[data-status='próximamente'] {
      background-color: var(--status-upcoming);
    }
    
    .status-badge-inner[data-status='finalizado'] {
      background-color: var(--status-finished);
    }
*/