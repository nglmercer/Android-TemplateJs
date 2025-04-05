// Archivo: search-filter.js
import { LitElement, html, css } from 'lit';
/* const objectFilter = [
  {
      "label": "Catergorias",//categoriasCatalogo
      "value": [],
      "options": [
      {"label":"Accion","value":1 }]
  
  },
  {
      "label": "Tipos",//tiposCatalogo
      "value": [],
      "options": [
      {"label":"Anime","value":1 },
      {"label":"Pelicula","value":2 },
      {"label":"Especial","value":3 }
    ]
  },
  {
      "label": "Estados",//estadosCatalogo
      "value": [],
      "options": [
      {"label":"En emision","value":1 },
      {"label":"Finalizado","value":2 },
      {"label":"Próximamente","value":3 }]
  }
  ] */
// First, create the dropdown filter selector component
export class FilterSelector extends LitElement {
  static properties = {
    label: { type: String },
    options: { type: Array },
    selectedValues: { type: Array },
    isOpen: { type: Boolean },
    position: { type: Object }
  };

  static styles = css`
    :host {
      --color-primary: #6A40A7;
      --color-secondary: #4FC3F7;
      --color-dark: #242736;
      --color-light: #F7F9FC;
      --color-accent: #9575CD;
      --color-background: #2e0d4a;
      --color-theme: #1a0933;
      --color-text: #333;
      --border-radius: 4px;
      --shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      
      display: block;
      width: 100%;
    }

    .filter-group {
      position: relative;
      border: 1px solid var(--color-primary);
      border-radius: var(--border-radius);
      padding: 10px;
      background-color: var(--color-theme);
      cursor: pointer;
      margin-bottom: 8px;
    }

    .filter-group-header {
      font-weight: 600;
      color: var(--color-light);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    }

    .filter-group-header svg {
      transition: transform 0.3s ease;
    }

    .filter-group-header svg.open {
      transform: rotate(180deg);
    }

    .dropdown-menu {
      position: fixed;
      background-color: var(--color-theme);
      border: 1px solid var(--color-primary);
      border-radius: var(--border-radius);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      width: 250px;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: max-height 0.3s ease, opacity 0.3s ease;
      padding: 0;
    }

    .dropdown-menu.open {
      max-height: 300px;
      opacity: 1;
      padding: 10px;
      overflow-y: auto;
    }

    .checkbox-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .checkbox-item {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      margin-right: 10px;
    }

    .checkbox-input {
      margin-right: 5px;
      cursor: pointer;
    }

    .checkbox-label {
      font-size: 14px;
      color: var(--color-light);
      cursor: pointer;
    }

    .chip-container {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 8px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      background-color: var(--color-secondary);
      color: var(--color-dark);
      padding: 3px 8px;
      border-radius: 16px;
      font-size: 12px;
      gap: 5px;
    }

    .chip-remove {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background-color: rgba(0,0,0,0.1);
      border-radius: 50%;
    }
  `;

  constructor() {
    super();
    this.label = '';
    this.options = [];
    this.selectedValues = [];
    this.isOpen = false;
    this.position = { top: 0, left: 0 };
    this._clickOutsideHandler = this._handleClickOutside.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._clickOutsideHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._clickOutsideHandler);
  }

  render() {
    // Find selected option labels for display
    const selectedLabels = this.options
      .filter(option => this.selectedValues.includes(option.value))
      .map(option => option.label);

    return html`
      <div class="filter-group" @click="${this._toggleOpen}">
        <div class="filter-group-header">
          <span>${this.label}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="${this.isOpen ? 'open' : ''}">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        
        ${selectedLabels.length > 0 ? html`
          <div class="chip-container">
            ${selectedLabels.map(label => html`
              <span class="chip">
                ${label}
                <span class="chip-remove" @click="${(e) => this._removeFilter(e, label)}">×</span>
              </span>
            `)}
          </div>
        ` : ''}
      </div>

      <div class="dropdown-menu ${this.isOpen ? 'open' : ''}" 
           style="top: ${this.position.top}px; left: ${this.position.left}px;">
        <div class="checkbox-container">
          ${this.options.map(option => html`
            <div class="checkbox-item">
              <input 
                type="checkbox" 
                id="${this.label}-${option.value}" 
                class="checkbox-input"
                .checked="${this.selectedValues.includes(option.value)}"
                @change="${(e) => this._handleCheckboxChange(e, option.value)}"
                @click="${(e) => e.stopPropagation()}"
              >
              <label for="${this.label}-${option.value}" class="checkbox-label" @click="${(e) => e.stopPropagation()}">
                ${option.label}
              </label>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  _toggleOpen(e) {
    if (this.isOpen) {
      this.close();
    } else {
      // Tell other selectors to close before opening this one
      this.dispatchEvent(new CustomEvent('selector-opening', {
        bubbles: true,
        composed: true,
        detail: { id: this.label }
      }));
      
      // Calculate position near the click
      const rect = e.currentTarget.getBoundingClientRect();
      this.position = {
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX
      };
      
      this.isOpen = true;
    }
    e.stopPropagation(); // Prevent bubbling up to document
  }

  close() {
    this.isOpen = false;
  }

  _handleClickOutside(e) {
    if (this.isOpen) {
      const path = e.composedPath();
      const isOutside = !path.includes(this.shadowRoot.querySelector('.filter-group')) && 
                        !path.includes(this.shadowRoot.querySelector('.dropdown-menu'));
      
      if (isOutside) {
        this.close();
      }
    }
  }

  _handleCheckboxChange(e, value) {
    const isChecked = e.target.checked;
    
    if (isChecked) {
      // Add value if checked
      this.selectedValues = [...this.selectedValues, value];
    } else {
      // Remove value if unchecked
      this.selectedValues = this.selectedValues.filter(v => v !== value);
    }
    
    // Notify parent component about changes
    this._notifyChange();
  }

  _removeFilter(e, label) {
    e.stopPropagation(); // Don't toggle open/close when removing

    // Find value for the label
    const option = this.options.find(opt => opt.label === label);
    if (option) {
      this.selectedValues = this.selectedValues.filter(v => v !== option.value);
      this._notifyChange();
    }
  }

  _notifyChange() {
    this.dispatchEvent(new CustomEvent('filter-change', {
      detail: {
        filterLabel: this.label,
        selectedValues: this.selectedValues
      },
      bubbles: true,
      composed: true
    }));
  }

  // Method to clear all selections
  clearSelections() {
    this.selectedValues = [];
    this._notifyChange();
  }
}
export class SearchFilter extends LitElement {
  static properties = {
    filters: { type: Array },
    selectedFilters: { type: Object },
    ordenes: { type: Array },
    filtroOrden: { type: String },
    searchQuery: { type: String },
    showFilters: { type: Boolean },
    currentOpenSelector: { type: String }
  };

  static styles = css`
  :host {
    --color-primary: #6A40A7;
    --color-secondary: #4FC3F7;
    --color-dark: #242736;
    --color-light: #F7F9FC;
    --color-accent: #9575CD;
    --color-background: #2e0d4a;
    --color-theme: #1a0933;
    --color-text: #333;
    --border-radius: 6px; /* Slightly increased for softer look */
    --shadow: 0 4px 15px rgba(0, 0, 0, 0.15); /* More pronounced shadow */
    --transition-base: all 0.25s ease-in-out;
    
    display: block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 20px; /* Slightly more padding */
    color: var(--color-text);
  }

  .search-filter-container {
    background: linear-gradient(135deg, var(--color-background), var(--color-theme)); /* Added gradient */
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    padding: 20px;
    color: var(--color-light);
    display: flex;
    flex-direction: column;
    gap: 15px; /* Increased gap for better spacing */
  }

  .search-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative; /* Added for better positioning control */
  }

  .input-container {
    position: relative;
    width: 100%;
  }

  .search-input {
    width: 100%;
    padding: 12px 48px 12px 16px; /* Adjusted padding for better balance */
    border: 2px solid var(--color-secondary);
    border-radius: var(--border-radius);
    background-color: rgba(255, 255, 255, 0.05); /* Slightly transparent */
    color: var(--color-light);
    font-size: 16px; /* Increased for better readability */
    transition: var(--transition-base);
    box-sizing: border-box;
  }

  .search-input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 8px rgba(106, 64, 167, 0.3); /* More prominent focus state */
    background-color: rgba(255, 255, 255, 0.1);
  }

  .search-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-accent);
    transition: var(--transition-base);
  }

  .search-input:focus + .search-icon {
    color: var(--color-primary); /* Changes icon color on input focus */
  }

  .filter-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .filter-button {
    padding: 12px 24px;
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: var(--transition-base);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-transform: uppercase;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .filter-button:hover {
    background-color: var(--color-accent);
    transform: translateY(-2px); /* Subtle lift effect */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .filter-button:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .clear-all {
    font-size: 13px;
    color: var(--color-light);
    cursor: pointer;
    transition: var(--transition-base);
    align-self: flex-end;
    opacity: 0.8;
    position: absolute;

  }

  .clear-all:hover {
    color: var(--color-secondary);
    opacity: 1;
    text-decoration: none; /* Removed underline on hover for cleaner look */
  }

  .filters-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* Wider columns */
    gap: 20px;
    margin-top: 10px;
    transition: var(--transition-base);
    max-height: 1000px;
    overflow: hidden;
  }

  .filters-container.hidden {
    opacity: 0;
    max-height: 0;
    margin-top: 0;
  }

  .order-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .order-label {
    font-weight: 700;
    color: var(--color-light);
    font-size: 1rem;
    text-transform: uppercase;
  }

  .order-select {
    padding: 10px 16px;
    border: 1px solid var(--color-primary);
    border-radius: var(--border-radius);
    background-color: var(--color-theme);
    color: var(--color-light);
    font-size: 14px;
    cursor: pointer;
    min-width: 140px; /* Slightly wider */
    transition: var(--transition-base);
    appearance: none; /* Removes default styling */
    background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>'); /* Custom dropdown arrow */
    background-position: right 8px center;
    background-repeat: no-repeat;
  }

  .order-select:hover {
    border-color: var(--color-accent);
    background-color: var(--color-primary);
  }

  @media (max-width: 768px) {
    .search-filter-container {
      padding: 15px;
    }

    .filter-button {
      width: 100%;
      padding: 12px;
    }

    .filters-container {
      grid-template-columns: 1fr; /* Single column on mobile */
    }
  }
`;

  constructor() {
    super();
    // Estructura de filtros
    this.filters = [
      {
        "label": "Categorías",
        "value": [],
        "options": [
          {"label": "Acción", "value": 1}
        ]
      },
      {
        "label": "Tipos",
        "value": [],
        "options": [
          {"label": "Anime", "value": 1},
          {"label": "Película", "value": 2},
          {"label": "Especial", "value": 3}
        ]
      },
      {
        "label": "Estados",
        "value": [],
        "options": [
          {"label": "En emisión", "value": 1},
          {"label": "Finalizado", "value": 2},
          {"label": "Próximamente", "value": 3}
        ]
      }
    ];
    
    // Opciones de ordenamiento
    this.ordenes = ['Por Defecto', 'Más recientes', 'Más valorados', 'Alfabético'];
    
    // Inicializamos los filtros seleccionados como arrays vacíos
    this.selectedFilters = {};
    this.filters.forEach(filter => {
      this.selectedFilters[filter.label] = [];
    });
    
    this.filtroOrden = 'Por Defecto';
    this.searchQuery = '';
    this.showFilters = false;
    this.currentOpenSelector = null;
  }

  firstUpdated() {
    // Store references to filter-selector components for later use
    this.filterSelectors = {};
    this.filters.forEach(filter => {
      const selector = this.shadowRoot.querySelector(`filter-selector[data-label="${filter.label}"]`);
      if (selector) {
        this.filterSelectors[filter.label] = selector;
      }
    });
    
    // Add event listener for selector-opening events
    this.shadowRoot.addEventListener('selector-opening', this._handleSelectorOpening.bind(this));
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClickOutside.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside.bind(this));
    
    if (this.shadowRoot) {
      this.shadowRoot.removeEventListener('selector-opening', this._handleSelectorOpening.bind(this));
    }
  }

  render() {
    return html`
      <div class="search-filter-container">
        <div class="search-box">
            <div class="input-container">
              <input 
                type="text" 
                class="search-input" 
                placeholder="Buscar..." 
                .value="${this.searchQuery}"
                @input="${this._handleSearchInput}"
                @keyup="${this._handleKeyUp}"
                @focus="${this._handleSearchFocus}"
                @click="${this._handleSearchClick}"
              >
              <span class="search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
            </div>
            <div class="filter-container">
          <button class="filter-button" @click="${this._filtrar}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filtrar
        </button>
        </div>
        </div>

        <div class="filters-container ${this.showFilters ? '' : 'hidden'}">
          ${this.filters.map(filterGroup => html`
            <filter-selector
              data-label="${filterGroup.label}"
              .label="${filterGroup.label}"
              .options="${filterGroup.options}"
              .selectedValues="${this.selectedFilters[filterGroup.label] || []}"
              @filter-change="${this._handleFilterChange}"
            ></filter-selector>
          `)}

          <div class="order-section">
            <span class="order-label">Orden:</span>
            <select class="order-select" @change="${this._handleOrdenChange}">
              ${this.ordenes.map(orden => html`
                <option value="${orden}" ?selected="${this.filtroOrden === orden}">${orden}</option>
              `)}
            </select>
          </div>
          <span class="clear-all" @click="${this._clearAllFilters}">Limpiar todos los filtros</span>

        </div>
        
      </div>
    `;
  }

  _handleSelectorOpening(e) {
    const openingId = e.detail.id;
    
    // Close any currently open selector if it's not the one being opened
    if (this.currentOpenSelector && this.currentOpenSelector !== openingId) {
      const selectorToClose = this.filterSelectors[this.currentOpenSelector];
      if (selectorToClose) {
        selectorToClose.close();
      }
    }
    
    // Update the current open selector
    this.currentOpenSelector = openingId;
  }

  _handleFilterChange(e) {
    const { filterLabel, selectedValues } = e.detail;
    this.selectedFilters[filterLabel] = selectedValues;
    this.requestUpdate();
  }

  _clearAllFilters() {
    // Reset all selected filters to empty arrays
    Object.keys(this.selectedFilters).forEach(key => {
      this.selectedFilters[key] = [];
    });
    
    // Update all filter-selector components
    this.filters.forEach(filter => {
      const selector = this.shadowRoot.querySelector(`filter-selector[data-label="${filter.label}"]`);
      if (selector) {
        selector.selectedValues = [];
      }
    });
    
    // Close any open selector
    if (this.currentOpenSelector && this.filterSelectors[this.currentOpenSelector]) {
      this.filterSelectors[this.currentOpenSelector].close();
      this.currentOpenSelector = null;
    }
    
    this.requestUpdate();
  }

  _handleOrdenChange(e) {
    this.filtroOrden = e.target.value;
  }

  _handleSearchInput(e) {
    this.searchQuery = e.target.value;
  }

  _handleKeyUp(e) {
    if (e.key === 'Enter') {
      this._filtrar();
    }
  }

  _handleSearchFocus() {
    this.showFilters = true;
  }

  _handleSearchClick(e) {
    e.stopPropagation();
    this.showFilters = true;
  }

  _handleClickOutside(e) {
    const path = e.composedPath();
    if (!path.includes(this.shadowRoot.querySelector('.search-filter-container'))) {
      this.showFilters = false;
      
      // Also close any open selector
      if (this.currentOpenSelector && this.filterSelectors[this.currentOpenSelector]) {
        this.filterSelectors[this.currentOpenSelector].close();
        this.currentOpenSelector = null;
      }
    }
  }

  _filtrar() {
    // Close any open selector before applying filters
    if (this.currentOpenSelector && this.filterSelectors[this.currentOpenSelector]) {
      this.filterSelectors[this.currentOpenSelector].close();
      this.currentOpenSelector = null;
    }
    
    // Creamos un objeto con los filtros actuales
    const filtros = {
      categorias: this.selectedFilters['Categorías'] || [],
      tipos: this.selectedFilters['Tipos'] || [],
      estados: this.selectedFilters['Estados'] || [],
      orden: this.filtroOrden,
      busqueda: this.searchQuery
    };
    
    // Disparamos un evento personalizado con los filtros
    this.dispatchEvent(new CustomEvent('filtrar', {
      detail: filtros,
      bubbles: true,
      composed: true
    }));
    
    console.log('Filtros aplicados:', filtros);
  }
  
  // Método para actualizar los filtros desde fuera del componente
  updateFilters(objectFilter) {
    if (Array.isArray(objectFilter)) {
      this.filters = objectFilter;
      
      // Reiniciamos los filtros seleccionados
      this.selectedFilters = {};
      objectFilter.forEach(filter => {
        this.selectedFilters[filter.label] = [];
      });
      
      this.requestUpdate();
    }
  }
}

// Definimos los elementos personalizados
customElements.define('filter-selector', FilterSelector);
customElements.define('search-filter', SearchFilter);