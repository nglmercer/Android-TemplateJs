// src/app/app.component.ts (o .js)
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Importa CommonModule
import '../components/login-element.js';


@Component({
  selector: 'app-root',
  standalone: true, // <--- ASEGÚRATE QUE ESTÉ PRESENTE
  imports: [
      CommonModule // <--- Añade CommonModule a los imports del componente
  ],
  // Usamos una plantilla inline para simplicidad en JS
  template: `
    <login-element (login-attempt)="handleLoginAttempt($event)"></login-element>

    <div *ngIf="loginFeedback"> <!-- Necesitarías CommonModule para *ngIf -->
      <p style="margin-top: 15px; font-weight: bold;">Feedback de Angular: {{ loginFeedback }}</p>
    </div>
  `,
  // Estilos inline opcionales
  styles: [`
    h1 {
      color: darkcyan;
    }
    login-element {
      display: block; /* Asegura que tome espacio */
    }
  `],
  // ¡Esencial para que Angular no se queje de <login-element>!
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  // Propiedades de la clase
  title;
  loginFeedback; // Para mostrar un mensaje desde Angular

  constructor() {
    this.title = 'Mi App Vite con Angular (JS) y Lit (JS)';
    this.loginFeedback = '';
    console.log('AppComponent (JS) instanciado');
  }

  // Método para manejar el evento del componente Lit
  handleLoginAttempt(event: CustomEvent<{ username: string; password: string }>) {    // El objeto 'event' es un CustomEvent disparado por Lit.
    // Los datos vienen en la propiedad 'detail'.
    const credentials = event.detail;

    console.log('AppComponent (JS) recibió login-attempt:', credentials);

    // Aquí puedes hacer lo que necesites con las credenciales en Angular
    // Por ejemplo, llamar a un servicio de autenticación
    if (credentials && credentials.username) {
      this.loginFeedback = `Intento de login recibido para: ${credentials.username}`;
      // Simular una llamada a servicio
      // authService.login(credentials.username, credentials.password);
    } else {
      this.loginFeedback = 'Evento de login recibido, pero sin datos.';
    }

    // Podrías querer limpiar el mensaje después de un tiempo
    setTimeout(() => { this.loginFeedback = ''; }, 5000);
  }
}

// Nota: Para usar directivas como *ngIf, necesitarías importar CommonModule
// en tu AppModule (si usas módulos) o importar CommonModule en el array
// 'imports' del @Component si AppComponent fuera Standalone (lo cual es
// más complejo de configurar manualmente en JS). Para este ejemplo simple,
// he añadido el div pero ten en cuenta esa dependencia.