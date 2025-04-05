// Using Lit for Web Components

// AnimeCard.js
import { LitElement, html, css } from 'lit';

export class AnimeCard extends LitElement {
  static properties = {
    title: { type: String },
    seasons: { type: Number },
    imageUrl: { type: String },
    data: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      background-color: #3b1066;
      border-radius: 10px;
      overflow: hidden;
    }
    
    .anime-card {
      position: relative;
    }
    
    img {
      width: 100%;
      display: block;
    }
    
    .anime-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
    }
    
    .logo-container {
      display: flex;
      flex-direction: column;
      backdrop-filter: blur(4px);
      border-radius: 10px;
      padding: 10px 15px;
      background-color: rgba(0, 0, 0, 0.6)
    }
    
    h2 {
      font-size: 24px;
      font-weight: bold;
      margin: 0;
      color: white;
    }
    
    p {
      font-size: 14px;
      opacity: 0.8;
      margin: 5px 0 0 0;
      color: white;
    }
    
    button {
      background-color: #ffcc00;
      color: black;
      border: none;
      padding: 8px 20px;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
      font-size: 16px;
      transition: transform 0.2s, opacity 0.2s;
    }
    
    button:hover {
      transform: scale(1.05);
      opacity: 0.9;
    }
  `;

  constructor() {
    super();
    this.title = 'DRAGON BALL';
    this.seasons = 2;
    this.imageUrl = 'https://i.ibb.co/t4sRKp4/dragon-ball-daima-opening.jpg';
    this.data = {
      title: this.title,
      seasons: this.seasons,
      imageUrl: this.imageUrl
    }
  }

  render() {
    return html`
      <div class="anime-card">
        <img src="${this.imageUrl}" alt="${this.title}">
        <div class="anime-info">
          <div class="logo-container">
            <h2>${this.title}</h2>
            <p>${this.seasons} Temporada(s)</p>
          </div>
          <button @click=${this._handleClick}>¡VER AHORA!</button>
        </div>
      </div>
    `;
  }

  _handleClick() {
    this.dispatchEvent(new CustomEvent('watch-anime', {
      detail: { data: this.data },
      bubbles: true,
      composed: true
    }));
  }

}

customElements.define('anime-card', AnimeCard);

// AdminPanel.js

export class AdminPanel extends LitElement {
  static properties = {
    adminMessage: { type: String },
    welcomeMessage: { type: String },
    isInEmission: { type: Boolean }
  };

  static styles = css`
        @font-face {
      font-family: 'nexa-black';
      src: url('/src/assets/Nexa-Heavy.ttf') format('truetype');
    }
    :host {
      display: grid;
      justify-content: center;
      align-items: center;
      background-color: #280d3f;
      border-radius: 10px;
      padding: 20px;
      color: white;
      text-align: center;
      font-family: 'nexa-black', sans-serif
    }
    
    div {
      font-size: 1em;
      font-weight: 900;
      margin-bottom: 15px;
      text-transform:uppercase;
      font-family: 'nexa-black', sans-serif;
      letter-spacing: -0.5px; /* Reduce el espacio entre letras */
    }
    
    p {
      font-size: 16px;
      opacity: 0.9;
      line-height: 1.4;
    }
    .nexa-black {
      font-family: 'nexa-black', sans-serif;
    }
    @media (max-width: 1200px) {
      h2 {
        font-size: 0.8em;
      }
      p {
        font-size: 14px;
      }
    }
    @media (max-width: 768px) {
      p {
        display: none;
      }
    }
  `;

  constructor() {
    super();
    this.adminMessage = `Gracias por ser parte de KOINIMA ${this.getUserdata().apodoUsuario}!!`;
    // 'GRACIAS POR SER PARTE DE KOINIMA ADMIN!!';
    this.welcomeMessage = '¡Disfruta de tu contenido favorito sin interrupciones!';
  }
  getUserdata() {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      return userData;
    } else {
      return {"idUsuario":608,"apodoUsuario":"memelser","correoUsuario":"nglmercer@gmail.com","rolUsuario":1,"nsfwUsuario":true,"fechaCreacion":"2025-03-21 22:36:12","apicode":null,"fechaNacimiento":null,"nombres":null,"apellidos":null,"state":null,"country":0,"phone":null,"preRegistrado":1,"creadorContenido":0,"anticipado":0,"fotoPerfilUsuario":null,"plan":{"idPlan":4,"nombrePlan":"Koiniclub","precioCentavos":450,"meses":1,"tipo":2},"idUltimaTransaccion":131,"fechaUltimaTransaccion":null,"nombreRol":"Usuario"}
    }
  }
  render() {
    return html`

      <div class="nexa-black">${this.adminMessage}</div>
      <p>${this.welcomeMessage}</p>
    `;
  }
}

customElements.define('admin-panel', AdminPanel);

