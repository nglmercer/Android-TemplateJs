// anime-carousel.js
import { LitElement, html, css } from 'lit';

export class AnimeCarousel extends LitElement {
  static properties = {
    animes: { type: Array },
    hasMoreLeft: { type: Boolean, reflect: true },
    hasMoreRight: { type: Boolean, reflect: true }
  };
  
  // Variables para el control de arrastre
  _isDragging = false;
  _startX = 0;
  _scrollLeft = 0;

  constructor() {
    super();
    // Default anime data
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragMove = this._onDragMove.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
    this._scrollCarouselLeft = this._scrollCarouselLeft.bind(this);
    this._scrollCarouselRight = this._scrollCarouselRight.bind(this);
    this._checkScrollSpace = this._checkScrollSpace.bind(this);
    
    // Inicializar propiedades de desplazamiento
    this.hasMoreLeft = false;
    this.hasMoreRight = true;
    this.animes = [
      {
        title: 'Around 40 Otoko no Isekai Tsuuhan',
        altTitle: 'Around 40 Otoko no Isekai Tsuuhan',
        imageUrl: 'https://i.ibb.co/DPb7hTfn/03.jpg',
        episodes: '1 - 10',
        languages: 'japones',
        status: '¡En emision!'
      },
      {
        title: 'Ameku Takao no Suiri Karte',
        altTitle: 'Ameku Takao no Suiri Karte',
        imageUrl: 'https://i.ibb.co/nNybn7f0/03.png',
        episodes: '1 - 9',
        languages: 'japones',
        status: '¡En emision!'
      },
      {
        title: 'Magic Maker: Isekai Mahou no Tsukurikata',
        altTitle: 'Magic Maker: Isekai Mahou no Tsukurikata',
        imageUrl: 'https://i.ibb.co/bZNLGYx/3.jpg',
        episodes: '1 - 10',
        languages: 'japones, español',
        status: '¡En emision!'
      },
      {
        title: 'Ao no Hako',
        altTitle: 'Ao no Hako',
        imageUrl: 'https://i.ibb.co/5h4b4Bpr/02.png',
        episodes: '1 - 20',
        languages: 'español',
        status: '¡En emision!'
      }
    ];
  }

  static styles = css`
      @font-face {
      font-family: 'nexa-black';
      src: url('/src/assets/Nexa-Heavy.ttf') format('truetype');
    }
    :host {
      --primary-color: #2e0d4a;
      --prim-color: #280d3f;
      --primary-color-light: #3a1860;
      --secondary-color: #ffffff;
      --accent-color: #592ac2;
      --text-color: #ffffff;
      --status-upcoming: #808080; /* Color gris para próximamente */
      --status-finished: #87CEEB; /* Color celeste para finalizado */
      font-family: 'nexa-black', sans-serif;
    }
    .nexa-black {
      font-family: 'nexa-black', sans-serif;
    }
    .carousel-container {
      display: flex;
      align-items: center;
      width: 100%;
      overflow: hidden;
      position: relative;
      max-width: min(100dvw, 100%);
      justify-content: center;
    }

    .nav-button {
      align-items: center;
      cursor: pointer;
      border-radius: 1rem;
      padding: 1rem;
      padding-inline-end: 2rem;
      user-select: none;
      font-family: 'montserrat-light';
      z-index: 10;
      position: relative;
      background-color: var(--prim-color);
    }

    .nav-button-inner {
        border-radius: 1rem;
        height: 10rem;
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 32px;
        text-align: center;
        user-select: none;
        border-radius: 3px;
        font-family: nexa-black;
        text-transform: uppercase;
        background-color: var(--primary-color);
    }

    .anime-cards {
      display: flex;
      overflow-x: hidden;
      scroll-behavior: smooth;
      margin-inline: 1rem;
      user-select: none;
      cursor: grab;
      position: relative;
      margin-inline: auto;
    }
    
    .anime-cards:active {
      cursor: grabbing;
    }
    
    /* Movidos los fade-left y fade-right dentro de anime-cards */
    .fade-left, .fade-right {
      position: absolute;
      top: 0;
      bottom: 0;
      height: 100%;
      width: 3rem;
      pointer-events: auto;
      z-index: 5;
      border-radius: 10px;
    }
    
    .fade-left {
      left: 0 ;
      background: linear-gradient(to right, var(--primary-color) 0%, transparent 100%);
    }
    
    .fade-right {
      right: 0;
      background: linear-gradient(to left, var(--primary-color) 0%, transparent 100%);
    }

    .anime-card {
      cursor: pointer;
      width: 15vw;
      max-width: 12rem;
      min-width: 12rem;
      margin: 20px 8px 0 ;
      position: relative;
      display: block;
      font-family: 'montserrat-light';
      user-select: none;
    }

    .status-badge {
      position: absolute;
      left: 0;
      right: 0;
      top: -15px;
      z-index: 4;
      display: flex;
      justify-content: center;
      border-radius: 5px;
      color: var(--text-color);
      font-weight: 700;
      font-family: 'nexa-black';
      margin: 0;
      user-select: none;
    }

    .status-badge-inner {
      background-color: var(--accent-color);
      padding: 5px 15px;
      rotate: -3deg;
      position: absolute;
      border-radius: 3px;
      text-transform: uppercase;
      margin: 0 5px 5px 0;
      user-select: none;
      font-size: 1.3rem;
    }
    
    .status-badge-inner[data-status='proximamente'] {
      background-color: var(--status-upcoming);
    }
    
    .status-badge-inner[data-status='finalizado'] {
      background-color: var(--status-finished);
    }

    .anime-image {
      position: relative;
      border-radius: 10px;
      width: 100%;
      height: 7rem;
      background-size: cover;
      margin: 0;
      user-select: none;
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
      font-family: 'nexa-black';
      margin: 0 5px 5px 0;
      user-select: none;
    }

    .episode-text {
      font-size: 15px;
      padding: 5px 10px;
      font-family: 'montserrat-light';
      margin: 0;
      user-select: none;
    }

    .anime-title {
      font-family: 'nexa-bold';
      margin: 10px 0 0 10px;
      font-size: 18px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: none;
    }

    .anime-languages {
      font-family: 'nexa-black';
      margin: 2px 0 0 10px;
      font-size: 12px;
      color: var(--text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: none;
    }
  `;

  _scrollCarouselLeft() {
    const container = this.shadowRoot.querySelector('.anime-cards');
    if (container && this.animes && this.animes.length > 0) {
      container.scrollBy({ left: -410, behavior: 'smooth' });
      // Actualizar el estado de desplazamiento después de la animación
      setTimeout(() => this._checkScrollSpace(), 500);
    }
  }

  _scrollCarouselRight() {
    const container = this.shadowRoot.querySelector('.anime-cards');
    if (container && this.animes && this.animes.length > 0) {
      container.scrollBy({ left: 410, behavior: 'smooth' });
      // Actualizar el estado de desplazamiento después de la animación
      setTimeout(() => this._checkScrollSpace(), 500);
    }
  }
  
  /**
   * Verifica si hay más espacio para desplazar hacia la izquierda o derecha
   * @returns {Object} Un objeto con propiedades hasMoreLeft y hasMoreRight
   */
  _checkScrollSpace() {
    const container = this.shadowRoot.querySelector('.anime-cards');
    if (!container) {
      this.hasMoreLeft = false;
      this.hasMoreRight = false;
      return { hasMoreLeft: false, hasMoreRight: false };
    }
    
    // Calcular si hay más contenido a la izquierda o derecha
    this.hasMoreLeft = container.scrollLeft > 0;
    this.hasMoreRight = container.scrollLeft < (container.scrollWidth - container.clientWidth);
    
    // Opcional: Despachar un evento con esta información
    const event = new CustomEvent('scroll-space-changed', {
      detail: { hasMoreLeft: this.hasMoreLeft, hasMoreRight: this.hasMoreRight },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
    
    return { hasMoreLeft: this.hasMoreLeft, hasMoreRight: this.hasMoreRight };
  }
  
  // Métodos para el arrastre (drag)
  _onDragStart(e) {
    const container = this.shadowRoot.querySelector('.anime-cards');
    this._isDragging = true;
    this._startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    this._scrollLeft = container.scrollLeft;
    
    // Cambiar el cursor durante el arrastre
    container.style.cursor = 'grabbing';
  }
  
  _onDragMove(e) {
    if (!this._isDragging) return;
    e.preventDefault();
    
    const container = this.shadowRoot.querySelector('.anime-cards');
    const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const walk = (x - this._startX) * 2; // Multiplicador para ajustar la velocidad
    container.scrollLeft = this._scrollLeft - walk;
  }
  
  _onDragEnd() {
    this._isDragging = false;
    const container = this.shadowRoot.querySelector('.anime-cards');
    container.style.cursor = 'grab';
    
    // Verificar espacio de desplazamiento después de arrastrar
    this._checkScrollSpace();
  }
  
  _handleAnimeClick(anime) {
    // Despachar un evento personalizado con la información del anime
    const event = new CustomEvent('anime-selected', {
      detail: anime,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
  
  firstUpdated() {
    // Agregar event listeners para el arrastre
    const container = this.shadowRoot.querySelector('.anime-cards');
    
    if (container && this.animes && this.animes.length > 0) {
      // Eventos de mouse
      container.addEventListener('mousedown', this._onDragStart);
      window.addEventListener('mousemove', this._onDragMove);
      window.addEventListener('mouseup', this._onDragEnd);
      
      // Eventos táctiles
      container.addEventListener('touchstart', this._onDragStart);
      window.addEventListener('touchmove', this._onDragMove);
      window.addEventListener('touchend', this._onDragEnd);
      
      // Verificar espacio de desplazamiento inicial
      setTimeout(() => this._checkScrollSpace(), 500);
      
      // Agregar evento de scroll para actualizar el estado de los botones
      container.addEventListener('scroll', () => {
        this._checkScrollSpace();
      });
    }
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    
    // Eliminar event listeners al desmontar el componente
    const container = this.shadowRoot?.querySelector('.anime-cards');
    if (container) {
      container.removeEventListener('mousedown', this._onDragStart);
      window.removeEventListener('mousemove', this._onDragMove);
      window.removeEventListener('mouseup', this._onDragEnd);
      
      container.removeEventListener('touchstart', this._onDragStart);
      window.removeEventListener('touchmove', this._onDragMove);
      window.removeEventListener('touchend', this._onDragEnd);
    }
  }

  render() {
    this._checkScrollSpace();
    const containStatus=(anime)=>{
        if (!anime.status) return "¡En emision!";
        if (typeof anime.status !== 'string') return anime.status;
        const tolowercaseanime = anime.status?.toLowerCase();
        if (tolowercaseanime.includes("finalizado")) {
            return "finalizado";
        } else if (tolowercaseanime.includes("proximamente") || tolowercaseanime.includes("próximamente")) {
            return "proximamente";
        } else {
            return "¡En emision!";
        }
    }
    return html`
      <div class="carousel-container">
          
          <div class="fade-left" style="${this.hasMoreLeft ? '' : 'opacity: 0; pointer-events: none;'}">
              <div class="nav-button" @click=${this._scrollCarouselLeft}>
                <div class="nav-button-inner">❮</div>
              </div>
        </div>
        <div class="fade-right" style="${this.hasMoreRight ? '' : 'opacity: 0; pointer-events: none;'}">
        <div class="nav-button" @click=${this._scrollCarouselRight}>
          <div class="nav-button-inner">❯</div>
        </div>
        </div>
        <div class="anime-cards">
          <!-- Movidos los elementos de difuminado dentro de anime-cards -->
          
          ${this.animes && this.animes.length > 0 ? this.animes.map(anime => html`
            <div class="anime-card" tabindex="0" @click=${() => this._handleAnimeClick(anime)}>
              <div class="status-badge">
                <div class="status-badge-inner nexa-black" data-status="${containStatus(anime)}">${anime.status}</div>
              </div>
              
              <div class="anime-image" style="background-image: url('${anime.imageUrl}');">
                <div class="episode-badge">
                  <span class="episode-text">${anime.episodes}</span>
                </div>
              </div>
              
              <div class="anime-title"  >${anime.title} </div>
              <div class="anime-languages">${anime.languages}</div>
            </div>
          `) : html`<div>No hay animes disponibles</div>`}
        </div>
        

      </div>
    `;
  }
  
}

customElements.define('anime-carousel', AnimeCarousel);