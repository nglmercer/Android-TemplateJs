import { LitElement, html, css } from 'lit';
import Isotipo from '/src/assets/Isotipo White.png';
export class ResponsiveNavbar extends LitElement {
  static properties = {
    opened: { type: Boolean, reflect: true },
    menuItems: { type: Array },
    selectedIndex: { type: Number, reflect: true }
  };

  constructor() {
    super();
    this.opened = false;
    this.selectedIndex = -1; // No item selected by default
    this.menuItems = [
      { icon: 'fa-home', text: 'Inicio', url: '#' },
      { icon: 'fa-search', text: 'Buscar', url: '#' },
      { icon: 'fa-bookmark', text: 'Marcadores', url: '#' },
      { icon: 'fa-history', text: 'Historial', url: '#' },
      { icon: 'fa-user', text: 'Cuenta', url: '#' },
      { icon: 'fa-sign-out-alt', text: 'Logout', url: '#' }
    ];
    
    // Cargar Font Awesome
    this._loadFontAwesome();
  }

  _loadFontAwesome() {
    // Verificar si Font Awesome ya está cargado
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const fontAwesomeLink = document.createElement('link');
      fontAwesomeLink.rel = 'stylesheet';
      fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
      document.head.appendChild(fontAwesomeLink);
    }
  }

  static styles = css`
    :host {
      --primary-color: #2e0d4a;
      --primary-color-light: #3a1860;
      --secondary-color: #ffffff;
      --text-color: #ffffff;
      --selected-color: #6b2fa8;
      --transition-speed: 0.3s;
      --sidebar-width: 5rem;
      --sidebar-expanded-width: 16rem;
      --mobile-navbar-height: 4rem;
    }

    .navbar {
      position: fixed;
      background-color: var(--primary-color);
      transition: all var(--transition-speed) ease;
      z-index: 1000;
    }

    /* Desktop Sidebar */
    @media only screen and (min-width: 768px) {
      .navbar {
        top: 0;
        left: 0;
        width: var(--sidebar-width);
        height: 100vh;
        flex-direction: column;
      }

      .navbar:hover,
      .navbar[opened] {
        width: var(--sidebar-expanded-width);
      }

      .navbar-nav {
        flex-direction: column;
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        list-style: none;
      }

      .hamburger {
        display: none;
      }
    }

    /* Mobile Navbar */
    @media only screen and (max-width: 767px) {
      .navbar {
        top: 0;
        left: 0;
        width: 100%;
        height: var(--mobile-navbar-height);
        flex-direction: column;
      }

      .navbar[opened] .navbar-nav {
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
      }

      .navbar-nav {
        position: fixed;
        top: var(--mobile-navbar-height);
        width: 100%;
        transform: translateY(-100%);
        opacity: 0;
        transition: all var(--transition-speed) ease;
        display: flex;
        flex-direction: column;
        background-color: var(--primary-color);
        padding: 0;
        margin: 0;
        list-style: none;
        pointer-events: none;
      }

      .hamburger {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 2rem;
        height: 2rem;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        z-index: 10;
      }

      .hamburger span {
        width: 2rem;
        height: 0.25rem;
        background: var(--text-color);
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;
      }

      .mobile-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0 1rem;
      }

      .navbar[opened] .hamburger span:first-child {
        transform: rotate(45deg);
      }

      .navbar[opened] .hamburger span:nth-child(2) {
        opacity: 0;
      }

      .navbar[opened] .hamburger span:nth-child(3) {
        transform: rotate(-45deg);
      }
    }
    img {
      width: 100%;
      height: 100%;
      max-height: 2rem;
      max-width: 2rem;
    }
    .nav-item {
      width: 100%;
    }

    .nav-link {
      display: flex;
      align-items: center;
      height: 3rem;
      color: var(--text-color);
      text-decoration: none;
      transition: var(--transition-speed);
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

    .nav-link:hover {
      background-color: var(--primary-color-light);
    }

    .nav-link.selected {
      background-color: var(--selected-color);
      position: relative;
    }
    
    .nav-link.selected::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background-color: var(--secondary-color);
    }

    .link-icon {
      font-size: 1.5rem;
      width: 2rem;
      min-width: 2rem;
      text-align: center;
    }

    .link-text {
      margin-left: 1rem;
      display: none;
      transition: opacity var(--transition-speed);
      white-space: nowrap;
    }

    @media only screen and (min-width: 768px) {
      .navbar:hover .link-text,
      .navbar[opened] .link-text {
        display: inline;
        opacity: 1;
      }
    }

    @media only screen and (max-width: 767px) {
      .link-text {
        display: inline;
      }
    }

    .nav-logo {
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      color: var(--text-color);
      background: var(--primary-color);
      font-size: 1.5rem;
      letter-spacing: 0.3ch;
      width: 100%;
      margin-bottom: 1rem;
    }

    .logo-text {
      display: none;
      transition: var(--transition-speed);
    }

    @media only screen and (min-width: 768px) {
      .navbar:hover .logo-text,
      .navbar[opened] .logo-text {
        display: inline;
      }
    }

    @media only screen and (max-width: 767px) {
      .logo-text {
        display: inline;
      }

      .nav-logo {
        margin-bottom: 0;
      }
    }
  `;

  toggleNav() {
    this.opened = !this.opened;
  }

  selectItem(index, item) {
    this.selectedIndex = index;
    
    // Dispatch custom event with the item data
    const event = new CustomEvent('item-selected', {
      detail: {
        index: index,
        item: item
      },
      bubbles: true,
      composed: true
    });
    
    this.dispatchEvent(event);
  }

  // Allow keyboard navigation for accessibility
  handleKeyDown(event, index, item) {
    // Select item when Enter or Space is pressed
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectItem(index, item);
    }
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
      <nav class="navbar" ?opened=${this.opened}>
        <div class="mobile-controls">
          <div class="nav-logo">
            <span class="logo-icon"><img src="${Isotipo}" alt="Logo"></span>
            <span class="logo-text">koinima</span>
          </div>
          <button class="hamburger" @click=${this.toggleNav} aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <ul class="navbar-nav">
          ${this.menuItems.map(
            (item, index) => html`
              <li class="nav-item">
                <div 
                  class="nav-link ${index === this.selectedIndex ? 'selected' : ''}" 
                  @click=${() => this.selectItem(index, item)}
                  @keydown=${(e) => this.handleKeyDown(e, index, item)}
                  tabindex="0"
                  role="button"
                  aria-selected=${index === this.selectedIndex}
                >
                  <span class="link-icon"><i class="fas ${item.icon}"></i></span>
                  <span class="link-text">${item.text}</span>
                </div>
              </li>
            `
          )}
        </ul>
      </nav>
    `;
  }
}

customElements.define('responsive-navbar', ResponsiveNavbar);