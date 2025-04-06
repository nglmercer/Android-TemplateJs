// src/lit/login-element.js
import { LitElement, html, css } from 'lit';
import Swal from 'sweetalert2';

export class LoginLitElement extends LitElement {

  static properties = {
    _usuario: { state: true },
    _clave: { state: true },
    message: { state: true },
    _isSending: { state: true },
    // apiLoginUrl: { type: String } // Keep if needed externally
  };

  constructor() {
    super();
    this._usuario = '';
    this._clave = '';
    this.message = '';
    this._isSending = false;
    // this.apiLoginUrl = '/usuario/sesion';

    if (localStorage.getItem("token") && localStorage.getItem("user")) {
        console.log('Usuario ya logueado, emitiendo evento para navegar a /');
        this.dispatchEvent(new CustomEvent('navigate-request', {
            detail: { path: '/' },
            bubbles: true,
            composed: true
        }));
    }
  }

  static styles = css`
    /* === TODOS TUS ESTILOS CSS VAN AQUÍ === */
    /* (No los repito aquí por brevedad, pero asegúrate de que estén todos) */
    .star {
      font-weight: 700;
      border-radius: 0.2rem;
      content: '+'; /* Necesario para que el pseudo-elemento se muestre */
      height: 100%;
      width: 100%;
      /* top y left se definen inline en el HTML para cada estrella */
    }

    /* Usamos un pseudo-elemento para crear la barra horizontal de la cruz */
    .star::before {
      font-weight: 700;
      content: '+'; /* Necesario para que el pseudo-elemento se muestre */
      border-radius: 0.2rem;
      height: 100%;
      width: 100%;
      /* Centrar la barra horizontal sobre la vertical */
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); /* Truco para centrar perfectamente */
    }
    .relative { position: relative !important; }
    .absolute { position: absolute !important; }
      /* === Pega TODO el CSS del archivo login-default.component.css aquí === */
      :host {
        display: block; /* Asegura que el componente tome espacio */
        height: 100%;
        width: 100%;
        color: white; /* Asumiendo color base del componente Angular */
        position: relative; /* Para el posicionamiento absoluto interno */
        font-family: sans-serif; /* Añade una fuente base */
      }
      .smoll-div {
        width: 0.5rem;
        height: 0.5rem;
        font-size: 2rem;
      }
      .medium-div {
        width: 2rem;
        height: 2rem;
        font-size: 6rem;
      }
      .large-div {
        width: 4rem;
        height: 4rem;
        font-size: 10rem;
      }
      .divTodoComponent {
          position: absolute; /* Relativo al :host */
          height: 100%;
          width: 100%;
          overflow: hidden; /* Para contener la imagen/video */
      }

      .body100 {
          position: absolute;
          z-index: 3001;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%; /* Ajustado a 100% */
          display: flex; /* Para centrar el contenido */
          align-items: center;
          overflow: auto;
          /* background: rgba(0, 0, 0, 0.5); /* Opcional: un overlay oscuro */
      }

      .divContenidoLogin {
        background-color: #38124f; /* Un morado oscuro similar al de la imagen */
        color: white; /* Texto blanco por defecto dentro del div */


        clip-path: polygon(0% 100%, 75% 100%, 100% 70%, 75% 0%, 0% 0%);

        /* --- Dimensiones y centrado del contenido --- */
        max-width: min(100%,600px);
        width: 100%;       /* Ancho relativo para responsividad */
        display: flex;
        flex-direction: column;
        align-items: center; /* Centra los elementos hijos horizontalmente */

        box-sizing: border-box; /* Asegura que padding no aumente el tamaño total */
        border-radius: 8px; /* Bordes ligeramente redondeados (clip-path puede afectar cómo se ve) */
        text-align: center; /* Centra el texto por defecto */
        justify-content: center;
        transition: all 0.5s;
      }

      .headerLogin {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80%;
          height: 10vh; /* Usar vh puede ser inconsistente, considera min-height */
          min-height: 50px;
      }
      .headerLogin h2 {
          margin: 20px;
          cursor: pointer; /* Hacerlos parecer clickables si lo son */
      }

      .soloTelefono {
          /* Se maneja por media queries */
      }

      .center {
          display: flex;
          flex-direction: column; /* Para apilar imágenes */
          align-items: center;
          justify-content: center;
          text-align: center; /* Asegura centrado de texto */
          width: 100%; /* Ocupa el ancho disponible */
      }

      .imagenLogoLoginLetras {
          /* Se maneja por media queries */
          max-width: 250px; /* Límite razonable */
          width: 60%;
          height: auto; /* Mantiene proporción */
          object-fit: contain;
      }

      .imagenPrincipalLogin {
           /* Se maneja por media queries */
          max-width: 300px; /* Límite razonable */
          width: 80%;
          height: auto; /* Mantiene proporción */
          object-fit: contain;
          margin-top: 20px; /* Espacio */
      }


      .contentForm {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          /* height: 80vh; */ /* Evitar alturas fijas grandes */
          margin-top: 30px; /* Espacio */
      }
      .contentForm > div { /* El div interno */
           width: 100%;
           max-width: max(500px, 90%)
      }

      .mensajePrincipalLogin {
          /* width: 60%; */ /* Se maneja por media queries */
          text-align: center;
          /* font-size: 2em; */ /* Se maneja por media queries */
          line-height: 1.4;
          max-width: 90%; /* Evita que sea demasiado ancho */
          margin: 0 auto; /* Centrado */
      }

      .formLogin {
          width: 100%; /* Ocupa el contenedor */
          display: flex;
          flex-direction: column;
          align-items: center;
      }

      .formLogin .divCenter > div { /* El div que contiene los inputs */
         width: 100%; /* Ocupa el 70%/80% definido en media queries */
         max-width: 350px; /* Límite razonable */
      }

      .divCenter {
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          position: relative;
      }

      .formLogin input[type="text"],
      .formLogin input[type="password"] {
          display: block; /* Asegura que ocupe el ancho */
          width: 100% !important; /* Forzar ancho */
          margin: 10px 0;
          background: #280D3F !important; /* Fondo oscuro */
          border: none; /* Sin borde por defecto */
          border-radius: 5px;
          padding: 12px 15px; /* Padding interno */
          box-sizing: border-box; /* Incluye padding en el width */
          color: white !important;
          text-align: center;
          /* font-size: 1.6em; */ /* Se maneja por media queries */
          outline: none; /* Quita outline al hacer focus */
      }
       .formLogin input[type="text"]::placeholder,
       .formLogin input[type="password"]::placeholder {
           color: rgba(236, 236, 236, 0.692);
           opacity: 1;
       }
      /* Quitar estilos sobrantes de input */
      /*input:focus { outline: none; }
      input { background: rgb(236, 140, 30) !important; ... } */


      .formLogin button {
          /* width: 30%; */ /* Se maneja por media queries */
          background: #bb9517;
          color: white;
          border: none;
          padding: 10px 20px; /* Ajusta padding */
          border-radius: 3px;
          font-weight: bold;
          cursor: pointer;
          min-width: 100px; /* Ancho mínimo */
          /* font-size: 1.6em; */ /* Se maneja por media queries */
          transition: background-color 0.2s ease; /* Transición suave */
      }
       .formLogin button:hover {
           background: #a38315; /* Un poco más oscuro al pasar el mouse */
       }


      .formLogin p {
          width: 100%;
          text-align: center;
      }
      .formLogin a {
          color: white;
          font-weight: bolder;
          cursor: pointer;
          text-decoration: underline; /* Indicar que es un enlace */
      }

      .error-message { /* Clase para el mensaje de error */
           color: rgb(255, 36, 36);
           text-align: center;
           width: 100%;
           font-weight: bolder;
           margin-top: 10px;
           min-height: 1.2em; /* Evita saltos de layout */
      }


      .imagenVideo {
          user-select: none;
          position: absolute;
          height: 100%;
          width: 100%; /* Cubre todo */
          top: 0;
          /* right: 0; */ /* Left 0 es más común */
          left: 0;
          z-index: 3000;
          object-fit: cover; /* Cubre el espacio manteniendo aspecto */
          object-position: center; /* Centra la imagen */
      }

      @media  (max-width: 700px) {
          .formLogin .divCenter > div { /* Contenedor de inputs */
              width: 85%; /* Un poco más ancho en móvil */
          }
          .headerLogin{
              display: none;
          }

          .imagenPrincipalLogin{
              width: 70vw; /* Relativo al viewport */
              height: auto;
              max-width: 250px; /* Límite */
          }
          .imagenLogoLoginLetras{
              width: 50vw;
              height: auto;
               max-width: 200px;
          }
          .mensajePrincipalLogin{
              width: 95%; font-size: 1.1em;
          }
           .formLogin input[type="text"],
           .formLogin input[type="password"] { font-size: 1.1em; padding: 10px 12px; }
           .formLogin button { font-size: 1.1em; width: 50%; padding: 12px 15px; } /* Botón más grande */
           .soloTelefono { display: block; } /* Muestra en móvil */
           .soloTelefono .center { /* Ajustes específicos si son necesarios */ }
           .divContenidoLogin {
            background-color: transparent;
            backdrop-filter: blur(4px);

           } /* Casi todo el ancho clip-path: none;*/
      }
      /* Estilos placeholder originales */
      /* ::placeholder ... ::-ms-input-placeholder ... input[value] ... */
      /* Estos selectores globales no funcionan bien dentro de Shadow DOM. */
      /* La estilización de placeholder se hizo directamente en el selector del input */

      /* Estilos button originales */
      /* button { background: rgb(255, 255, 255); ... } */
      /* Sobreescrito por los estilos más específicos del formLogin */
  `;

  render() {
    return html`
      <div class="divTodoComponent">

        <div class="body100">
          <div class="divContenidoLogin">
            <div class="medium-div absolute star" style="top: 10%; left: 85%; transform: rotate(65deg);"><div class=""></div></div>
            <div class="large-div absolute star" style="top: 40%; left: 5%; transform: rotate(15deg);"><div class=""></div></div>
            <div class="smoll-div absolute star" style="top: 80%; left: 60%; transform: rotate(-30deg);"><div class=""></div></div>

            <div class="soloTelefono">
              <div class="center">
                <img src="/assets/images/Logo White.png" class="imagenLogoLoginLetras" alt="Logo Koinima"/>
                <br><br>
                <img src="/assets/images/Deku.png" class="imagenPrincipalLogin" alt="Personaje Anime" onerror="this.onerror=null; this.src='https://pic.re/image';"/>
              </div>
            </div>

            <div class="contentForm">
              <div style="width: 100%;">
                <div style="display: flex; align-items: center; justify-content: center; text-align: center;">
                  <p class="mensajePrincipalLogin">¡Sumérgete y diviértete en un diverso mundo junto a tus animes favoritos!</p>
                </div>
                <br>

                <form
                  class="formLogin"
                  @submit=${(e) => e.preventDefault()}
                  @focusin=${this._handleFormFocusIn} 
                  @focusout=${this._handleFormFocusOut} 
                >
                  <div class="divCenter">
                    <div>
                      <input
                        type="text"
                        placeholder="Correo electrónico"
                        .value=${this._usuario}
                        @input=${this._handleUsuarioInput}
                        ?disabled=${this._isSending}
                        required>

                      <input
                        type="password"
                        placeholder="Contraseña"
                        .value=${this._clave}
                        @input=${this._handleClaveInput}
                        ?disabled=${this._isSending}
                        required>
                    </div>
                  </div>

                  <div class="error-message">
                     ${this.message ? html`<p>${this.message}</p>` : ''}
                  </div>
                  <br>

                  <div class="center" style="width: 100%;">
                    <button @click=${this._iniciarSesion} ?disabled=${this._isSending}>
                      ${this._isSending ? 'Enviando...' : 'Entrar'}
                    </button>
                  </div>
                  <br>

                  <div class="center" style="width: 100%;">
                    <p>¡Soy nuevo!, <a href="#" @click=${this._navegarARegistro}>Registrarse</a></p>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  // --- NUEVOS MANEJADORES DE EVENTOS ---

  _handleFormFocusIn(event) {
  //  console.log('Form focusin detectado en:', event.target); // Para depuración
    // Emitir un evento personalizado cuando el formulario o uno de sus hijos recibe foco
    this.dispatchEvent(new CustomEvent('form-focusin', {
      bubbles: true,  // Permitir que el evento suba por el DOM
      composed: true // Permitir que el evento cruce los límites del Shadow DOM
    }));
  }

  _handleFormFocusOut(event) {
    
    // Verificamos si el foco se movió a un elemento *fuera* del componente.
    // relatedTarget es el elemento que recibe el foco.
    // Si relatedTarget es null o no está contenido dentro del shadowRoot de este componente,
    // significa que el foco ha salido del formulario y sus elementos internos.
    const relatedTarget = event.relatedTarget;
    if (!relatedTarget || !this.shadowRoot.contains(relatedTarget)) {
    //  console.log('Form focusout detectado en:', event.target); // Para depuración
        // Emitir un evento personalizado cuando el foco sale del formulario (hacia afuera)
        this.dispatchEvent(new CustomEvent('form-focusout', {
            bubbles: true,  // Permitir que el evento suba por el DOM
            composed: true // Permitir que el evento cruce los límites del Shadow DOM
        }));
    } else {
        console.log('Focus se movió a otro elemento dentro del componente del formulario.');
    }
  }


  // --- MÉTODOS EXISTENTES ---

  _handleUsuarioInput(event) {
    this._usuario = event.target.value;
    this.message = ''; // Clear error on input
  }

  _handleClaveInput(event) {
    this._clave = event.target.value;
    this.message = ''; // Clear error on input
  }

  // El método _handleFormSubmit que tenías en @onclick no es necesario aquí
  // para el propósito de detectar el foco. Lo he eliminado y he puesto
  // los listeners @focusin y @focusout directamente en el <form>.
  // Si _handleFormSubmit tenía otra función, habría que reevaluarla.

  _navegarARegistro(event) {
    event.preventDefault();
    console.log('Solicitando navegación a /registro');
    this.dispatchEvent(new CustomEvent('navigate-request', {
      detail: { path: '/registro' },
      bubbles: true,
      composed: true
    }));
  }

  async _iniciarSesion() {
    // ... (tu lógica de inicio de sesión permanece igual) ...
    this.message = "";
    this._isSending = true;
    this._dispatchLoadingState(true);

    try {
      if (!this._usuario || !this._clave) {
        this.message = "Todos los campos son requeridos.";
        this._isSending = false;
        this._dispatchLoadingState(false);
        return;
      }
      if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this._usuario))) {
        this.message = "El correo no es valido.";
        this._isSending = false;
        this._dispatchLoadingState(false);
        return;
      }
      if (this._clave.length < 6) {
        this.message = "La contraseña debe tener 6 digitos o más.";
        this._isSending = false;
        this._dispatchLoadingState(false);
        return;
      }

      const apiEndpoint = /*this.apiLoginUrl ||*/ 'https://api.koinima.com/usuario/sesion';
      console.log('Enviando credenciales a:', apiEndpoint);

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioUsuario: this._usuario,
          claveUsuario: this._clave
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        this.message = result.message || `Error ${response.status}: ${response.statusText}`;
        // Consider showing Swal error here if preferred
        // Swal.fire({ icon: 'error', title: 'Error', text: this.message });
      } else {
        console.log('Login exitoso:', result);
        localStorage.setItem("user", JSON.stringify(result.data));
        localStorage.setItem("token", result.token);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: result.message || '¡Sesión iniciada!',
          showConfirmButton: false,
          timer: 1500 // Slightly shorter timer
        });

         this.dispatchEvent(new CustomEvent('login-success', {
            detail: { user: result.data, token: result.token },
            bubbles: true, composed: true
         }));

        // Instead of reload, rely on Ionic's navigation handling the event
        this.dispatchEvent(new CustomEvent('navigate-request', {
            detail: { path: '/', replace: true }, // Use replace to avoid back button going to login
            bubbles: true, composed: true
        }));

        // Optional: If navigate-request doesn't work reliably in your setup,
        // you might fall back to location change, but try events first.
         setTimeout(() => { window.location.href = "/"; }, 1600);

      }

    } catch (error) {
      console.error('Error en iniciarSesion:', error);
      this.message = "Ocurrió un error de red o respuesta inesperada.";
       /*Swal.fire({
            position: 'center', icon: 'error',
            title: "Error de conexión", text: "No se pudo comunicar con el servidor.",
            showConfirmButton: true // Allow dismissal
       });*/
    } finally {
      this._isSending = false;
      this._dispatchLoadingState(false);
    }
  }

  _dispatchLoadingState(isLoading) {
      this.dispatchEvent(new CustomEvent('loading-state', {
          detail: { loading: isLoading },
          bubbles: true,
          composed: true
      }));
  }
}
if (customElements.get('login-element') === undefined ) {
    customElements.define('login-element', LoginLitElement);
}
