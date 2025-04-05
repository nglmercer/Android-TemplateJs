
import { LitElement, html, css } from 'lit';
// Necesario si haces llamadas fetch o usas Swal
import Swal from 'sweetalert2';
// NO necesitas importar nada de @angular/core, router, etc.

export class LoginLitElement extends LitElement {

  // 1. Definir propiedades reactivas (reemplaza @Input, @State, y variables de clase)
  static properties = {
    // Para almacenar los valores de los inputs
    _usuario: { state: true }, // state: true indica estado interno
    _clave: { state: true },

    // Para mostrar mensajes de error/feedback
    message: { state: true },

    // Para controlar el estado de envío (equivalente a 'enviar')
    _isSending: { state: true },

    // Si necesitas pasar la URL de la API o configuración desde afuera (opcional)
    // apiLoginUrl: { type: String }
  };

  // 2. Constructor para inicializar propiedades
  constructor() {
    super();
    this._usuario = '';
    this._clave = '';
    this.message = '';
    this._isSending = false;
    // this.apiLoginUrl = '/usuario/sesion'; // URL por defecto o pásala como atributo/propiedad /// usuario/sesion

    // Reemplazo de la lógica de ngOnInit para verificar token (ejecutado una vez al conectar)
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
        console.log('Usuario ya logueado, emitiendo evento para navegar a /');
        // En lugar de this.router.navigate, emitimos un evento
        this.dispatchEvent(new CustomEvent('navigate-request', {
            detail: { path: '/' },
            bubbles: true,
            composed: true
        }));
    }

    // La lógica de queryParams es más compleja de replicar aquí sin acceso directo
    // al router. Se podría pasar el 'next' como propiedad si es necesario.
    // this._nextUrl = obtenerNextUrlDeAlgunaManera();
  }

  // 3. Definir los estilos CSS encapsulados
  static styles = css`
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
      background-color: #1a0929; /* Color de fondo aproximado del video/imagen */
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
        /* background: rgba(0, 0, 0, 0.5); /* Opcional: un overlay oscuro */
    }

    .divContenidoLogin {
  background-color: #38124f; /* Un morado oscuro similar al de la imagen */
  color: white; /* Texto blanco por defecto dentro del div */
  

  clip-path: polygon(0% 100%, 75% 100%, 100% 70%, 75% 0%, 0% 0%);
  
  /* --- Dimensiones y centrado del contenido --- */
  max-width: min(100%,600px);
  width: 100%;       /* Ancho relativo para responsividad */
  height: max(100%, 100dvh);
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

    /* --- Media Queries --- */
    @media (min-width: 701px) {
        .formLogin .divCenter > div { /* Contenedor de inputs */
            width: 70%;
        }
        .headerLogin{
            display: flex;
        }
        /* .divContenidoLogin{ width: 40%; } /* Puede ser muy restrictivo */
        .contentForm{
             /* height: 80vh; */
        }
        .mensajePrincipalLogin{
            width: 80%; font-size: 1.8em; /* Reducido un poco */
        }
        .formLogin input[type="text"],
        .formLogin input[type="password"] { font-size: 1.4em; } /* Reducido */
        .formLogin button { font-size: 1.4em; width: 30%;}
         .soloTelefono { display: none; } /* Oculta en desktop */
    }

    @media  (max-width: 700px) {
        .formLogin .divCenter > div { /* Contenedor de inputs */
            width: 85%; /* Un poco más ancho en móvil */
        }
        .headerLogin{
            display: none;
        }
         :host { /* Fondo sólido en móvil si no hay imagen */
             background-color: #1f0c33;
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

  // 4. Método Render para generar el HTML
  render() {
    return html`
      <div class="divTodoComponent">
        <!-- Imagen de fondo (fuera del body100 para estar detrás) -->
        <img class="imagenVideo" src="/src/assets/videos/wallpaper_login_2.gif" alt="Fondo animado"  onerror="this.onerror=null; this.src='https://i.ibb.co/MD10cq7/wallpaper-login-ezgif-com-video-to-gif-converter-2.gif';"/>

        <div class="body100">
          <div class="divContenidoLogin">
            <div class="medium-div absolute" style="top: 10%; left: 450px; transform: rotate(65deg)"><div class="star"></div></div>
            <div class="large-div absolute" style="top: 40%; left: 50px; transform: rotate(65deg)"><div class="star"></div></div>
            <div class="smoll-div absolute" style="top: 90%; left: 200px; transform: rotate(65deg)"><div class="star"></div></div>
            <div class="soloTelefono">
              <br><br>
              <div class="center">
                <img src="/src/assets/images/Logo White.png" class="imagenLogoLoginLetras" alt="Logo Koinima"/>
                <br><br>
                <img src="/src/assets/images/Deku.png" class="imagenPrincipalLogin" alt="Personaje Anime" onerror="this.onerror=null; this.src='https://pic.re/image';"/>
              </div>
            </div>

            <div class="contentForm">
              <div style="width: 100%;">
                <br><br>
                <div style="display: flex; align-items: center; justify-content: center; text-align: center;">
                  <p class="mensajePrincipalLogin">¡Sumérgete y diviértete en un diverso mundo junto a tus animes favoritos!</p>
                </div>
                <br><br>

                <form class="formLogin" @submit=${(e) => e.preventDefault()}> <!-- Previene submit real del form -->
                  <div class="divCenter">
                    <div>
                      <!-- Input de Usuario -->
                      <input
                        type="text"
                        placeholder="Correo electrónico"
                        .value=${this._usuario}
                        @input=${this._handleUsuarioInput}
                        ?disabled=${this._isSending}
                        required>

                      <!-- Input de Contraseña -->
                      <input
                        type="password"
                        placeholder="Contraseña"
                        .value=${this._clave}
                        @input=${this._handleClaveInput}
                        ?disabled=${this._isSending}
                        required>
                    </div>
                  </div>

                  <!-- Mensaje de error -->
                  <div class="error-message">
                     ${this.message ? html`<p>${this.message}</p>` : ''}
                  </div>
                  <br>

                  <!-- Botón de Entrar -->
                  <div class="center" style="width: 100%;">
                    <button @click=${this._iniciarSesion} ?disabled=${this._isSending}>
                      ${this._isSending ? 'Enviando...' : 'Entrar'}
                    </button>
                  </div>
                  <br>

                  <!-- Enlace de Registro -->
                  <div class="center" style="width: 100%;">
                    <p>¡Soy nuevo!, <a href="#" @click=${this._navegarARegistro}>Registrarse</a></p>
                  </div>
                </form>
              </div>
            </div>

            <div class="soloTelefono">
              <br><br>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  // 5. Métodos de la clase (lógica)

  // Actualiza estado interno cuando cambia el input de usuario
  _handleUsuarioInput(event) {
    this._usuario = event.target.value;
  }

  // Actualiza estado interno cuando cambia el input de clave
  _handleClaveInput(event) {
    this._clave = event.target.value;
  }

  // Emite evento para navegar a registro
  _navegarARegistro(event) {
    event.preventDefault(); // Previene navegación real del link '#'
    console.log('Solicitando navegación a /registro');
    this.dispatchEvent(new CustomEvent('navigate-request', {
      detail: { path: '/registro' },
      bubbles: true,
      composed: true
    }));
  }

  // Lógica de iniciar sesión (adaptada de Angular)
  async _iniciarSesion() { // Usamos async/await para fetch
    this.message = ""; // Limpia mensaje previo
    this._dispatchLoadingState(true); // Emitir evento de carga inicio
    this._isSending = true; // Deshabilita botón/inputs

    // --- Validación ---
    try {
      if (!this._usuario || !this._clave) {
        this.message = "Todos los campos son requeridos.";
        this._isSending = false;
        this._dispatchLoadingState(false);
        return; // Detiene ejecución
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

      // --- Llamada API (Simulada con fetch) ---
      // ¡Asegúrate de que la URL '/usuario/sesion' sea correcta!
      const apiEndpoint = /*this.apiLoginUrl ||*/ 'https://api.koinima.com/usuario/sesion'; // Usa prop o valor fijo

      console.log('Enviando credenciales a:', apiEndpoint);

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuarioUsuario: this._usuario, // Asegúrate que coincidan con el backend
          claveUsuario: this._clave
        }),
      });

      const result = await response.json(); // Intenta parsear JSON siempre

      if (!response.ok) {
        // Error desde el backend (usa mensaje de la API si existe)
        this.message = result.message || `Error ${response.status}: ${response.statusText}`;
        // Opcional: Mostrar Swal de error
        // Swal.fire(...)
      } else {
        // ¡Éxito!
        console.log('Login exitoso:', result);
        window.location.href = "/";
        localStorage.setItem("user", JSON.stringify(result.data));
        localStorage.setItem("token", result.token);

        // Mostrar SweetAlert de éxito
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: result.message || '¡Sesión iniciada!', // Usa mensaje de API o genérico
          showConfirmButton: false,
          timer: 2000
        });

        // Emitir evento de login exitoso con datos del usuario y token
         this.dispatchEvent(new CustomEvent('login-success', {
            detail: { user: result.data, token: result.token },
            bubbles: true, composed: true
         }));

        // Emitir evento para navegación post-login
        // (Aquí simplificado, la lógica de queryParams.next necesitaría pasarse como prop)
        this.dispatchEvent(new CustomEvent('navigate-request', {
            detail: { path: '/' }, // O this._nextUrl si se pasó como propiedad
            bubbles: true, composed: true
        }));

        // Podrías recargar la página como hacía antes, aunque es menos SPA-friendly
        // setTimeout(() => window.location.reload(), 2100);
      }

    } catch (error) {
      // Error de red o al parsear JSON
      console.error('Error en iniciarSesion:', error);
      this.message = "Ocurrió un error de red o respuesta inesperada.";
       // Opcional: Mostrar Swal de error genérico
       /*Swal.fire({
            position: 'center', icon: 'error',
            title: "Error de conexión", showConfirmButton: false, timer: 2000
       });*/
    } finally {
      // Se ejecuta siempre, haya error o no
      this._isSending = false; // Rehabilita botón/inputs
      this._dispatchLoadingState(false); // Emitir evento de carga fin
    }
  }

  // Helper para emitir evento de estado de carga
  _dispatchLoadingState(isLoading) {
      this.dispatchEvent(new CustomEvent('loading-state', {
          detail: { loading: isLoading },
          bubbles: true,
          composed: true
      }));
  }

}

// 6. Registrar el Custom Element en el navegador
customElements.define('login-element', LoginLitElement);