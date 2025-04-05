// src/main.angular.js
// Este archivo es el punto de entrada específico para Angular.

// 1. Importa el compilador JIT (necesario para esta configuración manual)
import '@angular/compiler';

// 2. Importa la función para arrancar componentes STANDALONE
import { bootstrapApplication } from '@angular/platform-browser'; // <--- CAMBIO IMPORTANTE

// 3. Importa DIRECTAMENTE tu componente standalone raíz
import { AppComponent } from './app/app.component'; // Ajusta la ruta si es necesaria (probablemente .ts si usas TS)

// --- Ya NO necesitas importar AppModule ---
// import { AppModule } from './app/app.module.ts';
// --- Ya NO necesitas importar platformBrowserDynamic ---
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// 4. Llama a la función de arranque para componentes standalone
console.log('[main.angular.js] Intentando arrancar Angular con bootstrapApplication...');

bootstrapApplication(AppComponent, { // <--- CAMBIO IMPORTANTE: Usa bootstrapApplication
    providers: [
      // Aquí puedes añadir providers globales si los necesitas en el futuro.
      // Por ejemplo, para configurar el router: provideRouter(...)
      // Para configurar HttpClient: provideHttpClient()
      // Por ahora, puede estar vacío.
    ]
})
  .then(ref => {
    // Opcional: Guardar la referencia para HMR
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;

    console.log('[main.angular.js] ¡Aplicación Angular (standalone) arrancada exitosamente!');
  })
  .catch(err => {
    // Captura y muestra errores durante el arranque
    console.error('[main.angular.js] ERROR al arrancar Angular (standalone):', err);
  });

// --- Ya NO necesitas la llamada a platformBrowserDynamic().bootstrapModule(...) ---