// season-info.js
import { LitElement, html, css } from 'lit';

class SeasonInfo extends LitElement {
  static properties = {
    season: { type: Number },
    episodes: { type: Number },
  };

  static styles = css`
    :host {
      display: block; /* Ensures the component takes up block space */
      background-color: rgba(0, 0, 0, 0.3);
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 20px;
      font-size: 1.3rem;
      font-weight: bold;
      color: white; /* Added color as it was inherited before */
      font-family: 'Arial', sans-serif; /* Added font-family */
    }
  `;

  constructor() {
    super();
    this.season = 1; // Default value
    this.episodes = 0; // Default value
  }

  render() {
    return html`
      ${this.season} Temporada - ${this.episodes} Capítulos
    `;
  }
}

customElements.define('season-info', SeasonInfo);
// category-buttons.js

class CategoryButtons extends LitElement {
  static properties = {
    categories: { type: Array },
  };

  static styles = css`
    :host {
       display: block; /* Ensures the component takes up block space */
       margin-bottom: 20px;
       font-family: 'Arial', sans-serif; /* Added font-family */
    }
    .category-container {
      display: flex;
      gap: 10px;
      color: white; /* Added color */
    }

    .category-title {
        font-size: 1.5rem;
        font-weight: bold;
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
  `;

  constructor() {
    super();
    this.categories = [];
  }

  // Method to dispatch the event
  dispatchCategoryEvent(category) {
    const event = new CustomEvent('category-selected', {
      detail: { category: category },
      bubbles: true, // Allows the event to bubble up the DOM tree
      composed: true // Allows the event to cross shadow DOM boundaries
    });
    this.dispatchEvent(event);
    console.log(`Category selected (from category-buttons): ${category}`);
  }

  render() {
    // Check if categories array is valid and has items
    if (!Array.isArray(this.categories) || this.categories.length === 0) {
        return html`<div class="category-container"><p>No categories available.</p></div>`;
    }

    return html`
      <div class="category-container">
        <strong class="category-title">Generos:</strong>
        ${this.categories.map(category => html`
          <button
            class="category-button"
            @click=${() => this.dispatchCategoryEvent(category)}
          >
            ${category}
          </button>
        `)}
      </div>
    `;
  }
}

customElements.define('category-buttons', CategoryButtons);


class PosterInfo extends LitElement {
  static properties = {
    title: { type: String },
    genre: { type: String }, // Note: genre property might be redundant now with categories
    synopsis: { type: String },
    season: { type: Number },
    episodes: { type: Number },
    // category: { type: String }, // This might be less relevant if using categories array
    posterUrl: { type: String }, // Not used in the provided template snippet, but kept
    characters: { type: Array }, // Not used in the provided template snippet, but kept
    categories: { type: Array }
  };

  // --- REMOVED STYLES ---
  // Removed styles for .season-info, .category-container, .category-button
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
      max-width: 1200px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
    }

    /* ... (keep other existing styles like floating-element, header, content, info, synopsis, watch-button, media queries, rating etc.) ... */
    .floating-element {
      position: absolute;
      background: rgba(255, 82, 119, 0.2);
      border-radius: 50%;
      filter: blur(4px);
      z-index: 0;
      animation: float 15s infinite ease-in-out;
    }

    .float-1 { width: 150px; height: 150px; top: -50px; left: 10%; animation-delay: 0s; }
    .float-2 { width: 100px; height: 100px; bottom: 20%; right: 5%; background: rgba(255, 204, 0, 0.15); animation-delay: 5s; }
    .float-3 { width: 80px; height: 80px; top: 40%; left: 5%; background: rgba(101, 84, 192, 0.2); animation-delay: 7s; }

    @keyframes float {
      0% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(15px, -15px) rotate(5deg); }
      50% { transform: translate(0, 10px) rotate(0deg); }
      75% { transform: translate(-15px, -5px) rotate(-5deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }

    .header { text-align: center; margin-bottom: 20px; position: relative; z-index: 1; }
    .header h1 { font-size: 2.5rem; margin: 0; text-shadow: 0 0 10px rgba(255, 82, 119, 0.5); }
    .content { display: flex; flex-direction: row; align-items: flex-start; position: relative; z-index: 1; }
    .info { flex: 3; }
    .genre { font-size: 1.2rem; margin-bottom: 10px; } /* Keep if still used */

    .synopsis {
      font-size: 1.1rem;
      line-height: 1.6;
      text-align: center;
      hyphens:manual;
      letter-spacing: 1px;
      margin-bottom: 20px;
      background: rgba(0, 0, 0, 0.2);
      padding: 15px;
      border-radius: 8px;
    }

    .watch-button {
      position: absolute; top: 79px; right: -10px; background-color: #ffcc00;
      color: #2b0a3d; padding: 8px 16px; border-radius: 4px 0 0 4px; text-decoration: none;
      font-weight: bold; font-size: 1rem; text-align: center; cursor: pointer;
      transform: rotate(45deg); transform-origin: top right; box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.3);
      z-index: 2;
    }
    .watch-button:hover { background-color: #ffd700; }
    .watch-button::after { content: ''; position: absolute; right: 0; bottom: -10px; width: 10px; height: 10px; background-color: #b38f00; border-top-right-radius: 2px; }

    @media (max-width: 768px) {
      .content { flex-direction: column-reverse; }
      .header h1 { font-size: 2rem; }
      .synopsis { font-size: 1rem; }
      .watch-button { top: 68px; right: -34px; }
      .watch-button::after { display: none; }
    }

    .rating {
      position: absolute; top: 20px; left: 20px; background-color: rgba(0, 0, 0, 0.7);
      color: #ffcc00; font-size: 1.2rem; font-weight: bold; padding: 8px 12px;
      border-radius: 50%; z-index: 2; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
  `;

  constructor() {
    super();
    this.title = 'Sakamoto Days';
    this.genre = 'Comedia, Fantasía, Musical, Oscuro, Drama';
    this.synopsis = 'SAKAMOTO DAYS es una serie de manga escrita e ilustrada por Yuto Suzuki...';
    this.season = 1;
    this.episodes = 8;
    // this.category = 'Fantasía'; // Less relevant now
    this.posterUrl = '...';
    this.characters = [/* ... */];
    this.categories = ['Fantasía', 'Comedia', 'Musical', 'Drama', 'Oscuro'];
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
              <!-- Assuming synopsis-component is correctly defined/imported -->
              <synopsis-component
                text="${this.synopsis}"
                max-height="360"
                font-size="1.04rem"
              >
              </synopsis-component>
            </div>

            <!-- Use the new season-info component -->
            <!-- Pass properties using .property syntax for non-string types -->

          </div>

          <!-- Poster Image section if it exists -->
          <!-- <div class="poster"> -->
          <!--   <img src="${this.posterUrl}" alt="${this.title} Poster"> -->
          <!-- </div> -->
        </div>
      </div>
    `;
  }
}
/*          <category-buttons
                .categories=${this.categories}
                @category-selected=${this._handleCategorySelected}
            ></category-buttons>
            */
           /*            <season-info
                .season=${this.season}
                .episodes=${this.episodes}
            ></season-info>*/
customElements.define('poster-info', PosterInfo);
export { PosterInfo }; // Optional: Export if using modules