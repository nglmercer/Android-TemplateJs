import { LitElement, html, css } from 'lit';

export class Poster extends LitElement {
  static properties = {
    title: { type: String },
    genre: { type: String },
    synopsis: { type: String },
    season: { type: Number },
    episodes: { type: Number },
    category: { type: String },
    posterUrl: { type: String },
    characters: { type: Array },
    categories: { type: Array },
    ID: { type: Number }
  };

  static styles = css`
    :host {
      display: block;
      font-family: 'Arial', sans-serif;
      position: relative;
    }
    
    .container {
      display: flex;
      flex-direction: column;
      background: linear-gradient(to bottom, #2b0a3d, #461866);
      color: white;
      padding: 20px;
      border-radius: 8px;
      max-width: min(100dvw, 100%);
      margin: 0 auto;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
    }
    
    .floating-element {
      position: absolute;
      background: rgba(255, 82, 119, 0.2);
      border-radius: 50%;
      filter: blur(4px);
      z-index: 0;
      animation: float 15s infinite ease-in-out;
    }
    
    .float-1 {
      width: 150px;
      height: 150px;
      top: -50px;
      left: 10%;
      animation-delay: 0s;
    }
    
    .float-2 {
      width: 100px;
      height: 100px;
      bottom: 20%;
      right: 5%;
      background: rgba(255, 204, 0, 0.15);
      animation-delay: 5s;
    }
    
    .float-3 {
      width: 80px;
      height: 80px;
      top: 40%;
      left: 5%;
      background: rgba(101, 84, 192, 0.2);
      animation-delay: 7s;
    }
    
    @keyframes float {
      0% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(15px, -15px) rotate(5deg); }
      50% { transform: translate(0, 10px) rotate(0deg); }
      75% { transform: translate(-15px, -5px) rotate(-5deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }
    
    .header {
      text-align: center;
      margin-bottom: 20px;
      position: relative;
      z-index: 1;
    }
    
    .header h1 {
      font-size: 2.5rem;
      margin: 0;
      text-shadow: 0 0 10px rgba(255, 82, 119, 0.5);
    }
    
    .content {
      display: flex;
      flex-direction: row;
      gap: 20px;
      align-items: flex-start;
      position: relative;
      z-index: 1;
    }
    
    .info {
      flex: 3;
    }
    
    .poster-container {
      flex: 2;
      max-width: 400px;
      align-self: center;
      position: relative;
    }
    
    .poster {
      width: 100%;
      border-radius: 12px;
      transition: transform 0.3s ease;
    }
    
    .poster-container:hover .poster {
      transform: scale(1.02);
    }
    
    .genre {
      font-size: 1.2rem;
      margin-bottom: 10px;
    }
    
    .synopsis {
      font-size: 1.1rem;
      line-height: 1.6;
      text-align: center;
      hyphens:manual; /* Habilita el soporte de líneas en blanco */
      letter-spacing: 1px; /* Ajusta este valor según sea necesario */
      margin-bottom: 20px;
      background: rgba(0, 0, 0, 0.2);
      padding: 15px;
      border-radius: 8px;
    }
    
    .season-info {
      background-color: rgba(0, 0, 0, 0.3);
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 20px;
      font-size: 1.3rem;
      font-weight: bold;
    }
    
    .category-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      margin-bottom: 20px;
    }
    
    .category-button {
      background-color: rgba(255, 82, 119, 0.3);
      border: 1px solid #ff5277;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }
    
    .category-button:hover {
      background-color: rgba(255, 82, 119, 0.6);
      transform: translateY(-2px);
    }
    
    .watch-button {
      position: absolute;
      top: 79px;
      right: -10px;
      background-color: #ffcc00;
      color: #2b0a3d;
      padding: 8px 16px;
      border-radius: 4px 0 0 4px;
      text-decoration: none;
      font-weight: bold;
      font-size: 1rem;
      text-align: center;
      cursor: pointer;
      transform: rotate(45deg);
      transform-origin: top right;
      box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.3);
      z-index: 2;
    }
    
    .watch-button:hover {
      background-color: #ffd700;
    }
    
    .watch-button::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: -10px;
      width: 10px;
      height: 10px;
      background-color: #b38f00;
      border-top-right-radius: 2px;
    }
    
    @media (max-width: 768px) {
      .content {
        flex-direction: column-reverse;
      }
      
      .poster-container {
        max-width: 300px;
        margin-bottom: 20px;
      }
      
      .header h1 {
        font-size: 2rem;
      }
      
      .synopsis {
        font-size: 1rem;
      }
      
      .watch-button {
        top: 68px;
        right: -34px;
      }
      
      .watch-button::after {
        display: none;
      }
    }
    
    .rating {
      position: absolute;
      top: 20px;
      left: 20px;
      background-color: rgba(0, 0, 0, 0.7);
      color: #ffcc00;
      font-size: 1.2rem;
      font-weight: bold;
      padding: 8px 12px;
      border-radius: 50%;
      z-index: 2;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
  `;

  constructor() {
    super();
    this.title = 'Sakamoto Days';
    this.genre = 'Comedia, Fantasía, Musical, Oscuro, Drama';
    this.synopsis = 'SAKAMOTO DAYS es una serie de manga escrita e ilustrada por Yuto Suzuki. Comenzó su publicación en la revista Shōnen Jump de Shūeisha el 21 de noviembre de 2020. Una adaptación de la serie de televisión de anime producida por TMS Entertainment se estrenó el 11 de enero de 2025.​ Wikipedia';
    this.season = 1;
    this.episodes = 8;
    this.category = 'Fantasía';
    this.posterUrl = 'https://i.ibb.co//HDCQD3gQ//taro-sakamoto-in-the-anime-trailer-and-in-the-sakamoto-days-manga.png';
    this.characters = [
      { name: 'Sakamoto', description: 'Sakamoto is a young man who is obsessed with the idea of becoming a superhero. He is a fan of superheroes and dreams of one day becoming a hero. He is also a big fan of anime and enjoys watching it with his friends.' },
      // Add more characters here
    ];  
    this.categories = ['Fantasía', 'Comedia', 'Musical', 'Drama', 'Oscuro'];
  }

  dispatchCategoryEvent(category) {
    const event = new CustomEvent('category-selected', {
      detail: { category: category },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
    console.log(`Category selected: ${category}`);
  }

  renderCategoryButtons() {
    return html`
      <div class="category-container">
          <strong style="font-size: 1.5rem;">Generos:</strong>
        ${this.categories.map(category => html`
          <button class="category-button" @click=${() => this.dispatchCategoryEvent(category)}>
            ${category}
          </button>
        `)}
      </div>
    `;
  }
  renderPosterImage() {
    return html`
      <div class="poster-container" @click=${() => this.dispatchPosterEvent()}>
        <div class="rating">8.9</div>
        <img class="poster" src="${this.posterUrl}" alt="Poster de ${this.title}" onerror="this.onerror=null; this.src='https://pic.re/image';">
        <a class="watch-button" @click=${() => this.dispatchPosterEvent()}>Ver Capítulo 1</a>
      </div>
    `;
  }
  dispatchPosterEvent() {
    const data = this.getProperties();
    const event = new CustomEvent('poster-clicked', {
      detail: data,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  //  console.log(`Poster clicked:`,data, this.getProperties());
  }
  getProperties() {
    // Accede a las claves (nombres) de las propiedades declaradas estáticamente
    const declaredPropertyNames = Object.keys(this.constructor.properties);
    console.log("declaredPropertyNames",declaredPropertyNames);
    const allProperties = {};
    declaredPropertyNames.forEach(propName => {
      allProperties[propName] = this[propName];
    });
    return allProperties;
  }
  render() {
    return html`
      <div class="container">
        <!-- Floating elements -->
        <div class="floating-element float-1"></div>
        <div class="floating-element float-2"></div>
        <div class="floating-element float-3"></div>
        
        
        <div class="content">
            <div class="info">
              <div class="header">
                <h1>${this.title}</h1>
              </div>
            
            <div class="synopsis">
              <strong>Sinopsis:</strong> ${this.synopsis}
            </div>
            
            <div class="season-info">
              ${this.season} Temporada - ${this.episodes} Capítulos
            </div>
            
            ${this.renderCategoryButtons()}
          </div>
          
          ${this.renderPosterImage()}
        </div>
      </div>
    `;
  }
}

customElements.define('poster-card', Poster);