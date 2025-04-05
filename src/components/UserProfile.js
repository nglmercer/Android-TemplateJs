import { LitElement, html, css } from 'lit';

export class UserProfile extends LitElement {
  static get properties() {
    return {
      user: { type: Object },
      showNsfw: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: 'Arial', sans-serif;
      }

      .user-profile {
        background-color: #2d0a42;
        color: white;
        border-radius: 16px;
        padding: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 1000px;
        margin: 0 auto;
        gap: 20px; /* Espacio entre secciones */
      }

      .profile-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        min-width: 0; /* Evita desbordamiento */
      }

      .profile-avatar {
        width: 200px;
        height: 200px;
        background-color: #150521;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        overflow: hidden;
      }

      .profile-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .avatar-placeholder {
        font-size: 60px;
        color: white;
      }

      .username {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
        word-break: break-word; /* Evita desbordamiento de texto largo */
      }

      .plan-info {
        font-size: 16px;
        margin-bottom: 20px;
        text-align: center;
      }

      .action-button {
        background-color: #842424;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        text-transform: uppercase;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .action-button:hover {
        background-color: #a53030;
      }

      .profile-right {
        flex: 1;
        padding: 20px;
        min-width: 0; /* Evita desbordamiento */
      }

      .user-data-section {
        background-color: #3a1255;
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 20px;
      }

      .section-title {
        font-size: 28px;
        margin-bottom: 20px;
      }

      .data-field {
        margin-bottom: 15px;
      }

      .field-label {
        font-size: 16px;
        margin-bottom: 5px;
      }

      .field-value {
        background-color: #3a1255;
        border-radius: 5px;
        padding: 10px;
        font-size: 16px;
        word-break: break-word; /* Evita desbordamiento */
      }

      .nsfw-toggle {
        background-color: #4c9e5a;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        width: 100%;
        text-align: center;
        transition: background-color 0.3s;
      }

      .nsfw-toggle:hover {
        background-color: #5bb969;
      }

      .nsfw-info {
        font-size: 14px;
        text-align: center;
        margin-top: 5px;
      }

      .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
      }

      .secondary-button {
        background-color: #9e8e00;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-weight: bold;
        cursor: pointer;
        text-align: center;
        transition: background-color 0.3s;
      }

      .secondary-button:hover {
        background-color: #bfab0d;
      }

      .upload-section {
        position: relative;
        margin-top: 20px;
        width: 100%;
        text-align: center;
      }

      .upload-label {
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px;
        font-size: 14px;
        cursor: pointer;
        display: inline-block;
      }

      #upload-avatar {
        display: none;
      }

      /* Media Queries para Responsividad */
      @media (max-width: 768px) {
        .user-profile {
          flex-direction: column;
          padding: 15px;
        }

        .profile-left,
        .profile-right {
          width: 100%;
          padding: 10px;
        }

        .profile-avatar {
          width: 150px;
          height: 150px;
        }

        .avatar-placeholder {
          font-size: 50px;
        }

        .username {
          font-size: 20px;
        }

        .plan-info {
          font-size: 14px;
        }

        .section-title {
          font-size: 24px;
        }

        .action-button,
        .secondary-button,
        .nsfw-toggle {
          padding: 8px 16px;
        }
      }

      @media (max-width: 480px) {
        .profile-avatar {
          width: 120px;
          height: 120px;
        }

        .avatar-placeholder {
          font-size: 40px;
        }

        .username {
          font-size: 18px;
        }

        .section-title {
          font-size: 20px;
        }
      }
    `;
  }

  constructor() {
    super();
    this.user = {};
    this.showNsfw = false;
  }

  toggleNsfw() {
    this.showNsfw = !this.showNsfw;
    // Opcional: Sincronizar con el servidor aquí si es necesario
  }

  cancelPlan() {
    this.dispatchEvent(
      new CustomEvent('cancel-plan', {
        bubbles: true,
        composed: true,
        detail: { userId: this.user.idUsuario },
      })
    );
  }

  updateInfo() {
    this.dispatchEvent(
      new CustomEvent('update-info', {
        bubbles: true,
        composed: true,
        detail: { userId: this.user.idUsuario },
      })
    );
  }

  changePassword() {
    this.dispatchEvent(
      new CustomEvent('change-password', {
        bubbles: true,
        composed: true,
        detail: { userId: this.user.idUsuario },
      })
    );
  }

  getInitials() {
    if (!this.user.apodoUsuario) return 'U';
    const words = this.user.apodoUsuario.trim().split(' ');
    return words
      .slice(0, 2) // Toma las primeras dos palabras
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }

  formatDate(dateString) {
    if (!dateString) return 'No disponible';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Fecha inválida';
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return 'Error al formatear';
    }
  }

  uploadAvatar(event) {
    const file = event.target.files[0];
    if (file) {
      // Aquí puedes implementar la lógica para subir la imagen al servidor
      console.log('Subiendo avatar:', file);
      // Ejemplo: Actualizar la foto de perfil localmente
      const reader = new FileReader();
      reader.onload = () => {
        this.user = { ...this.user, fotoPerfilUsuario: reader.result };
        this.requestUpdate();
      };
      reader.readAsDataURL(file);
    }
  }

  render() {
    return html`
      <div class="user-profile">
        <div class="profile-left">
          <div class="profile-avatar">
            ${this.user.fotoPerfilUsuario
              ? html`<img src="${this.user.fotoPerfilUsuario}" alt="Foto de perfil de ${this.user.apodoUsuario || 'Usuario'}">`
              : html`<div class="avatar-placeholder">${this.getInitials()}</div>`}
          </div>
          <div class="upload-section">
            <input type="file" id="upload-avatar" @change=${this.uploadAvatar} accept="image/*">
            <label for="upload-avatar" class="upload-label">Subir Nueva</label>
          </div>
          <div class="username">${this.user.apodoUsuario || 'Usuario'}</div>
          <div class="plan-info">Plan: ${this.user.plan?.nombrePlan || 'Sin plan'}</div>
          <button class="action-button" @click=${this.cancelPlan} aria-label="Cancelar plan">CANCELAR PLAN</button>
        </div>

        <div class="profile-right">
          <div class="user-data-section">
            <div class="section-title">Tus datos:</div>

            <div class="data-field">
              <div class="field-label">Nombre de usuario</div>
              <div class="field-value">${this.user.apodoUsuario || ''}</div>
            </div>

            <div class="data-field">
              <div class="field-label">Correo</div>
              <div class="field-value">${this.user.correoUsuario || ''}</div>
            </div>

            <div class="data-field">
              <div class="field-label">Contenido +18 (NSFW)</div>
              <button
                class="nsfw-toggle"
                @click=${this.toggleNsfw}
                aria-label="Alternar contenido NSFW"
              >
                ${this.showNsfw ? 'SÍ' : 'Presionalo para habilitarlo.'}
              </button>
              <div class="nsfw-info">Estado actual: ${this.user.nsfwUsuario ? 'Habilitado' : 'Deshabilitado'}</div>
            </div>
          </div>

          <div class="action-buttons">
            <button class="secondary-button" @click=${this.updateInfo} aria-label="Actualizar información">Actualizar Información</button>
            <button class="secondary-button" @click=${this.changePassword} aria-label="Cambiar contraseña">Cambiar Contraseña</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('user-profile', UserProfile);