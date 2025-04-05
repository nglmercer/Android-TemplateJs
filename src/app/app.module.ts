// src/app/app.module.js
// Importaciones necesarias de Angular Core y Browser
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Importa tu Componente Raíz (también debe estar en .js)
import { AppComponent } from './app.component';

// --- ¡ADVERTENCIA IMPORTANTE SOBRE DECORADORES EN JS! ---
// Angular usa intensivamente decoradores (@NgModule, @Component).
// Escribir `@NgModule` directamente en un archivo .js PUEDE O NO FUNCIONAR
// dependiendo de si tu configuración de Vite/Babel está procesando
// correctamente esta sintaxis en archivos JavaScript.
// TypeScript es la forma estándar y recomendada porque maneja esto nativamente.
// Si esto no funciona, necesitarías configurar Babel con
// '@babel/plugin-proposal-decorators' y '@babel/plugin-proposal-class-properties'.

// Definición del Módulo Raíz usando el decorador @NgModule
// (Asumiendo que la configuración de tu build lo procesa)
@NgModule({
  // Componentes que pertenecen a este módulo
  declarations: [
    AppComponent
    // Otros componentes de este módulo irían aquí
  ],
  // Otros módulos de Angular o de terceros que este módulo necesita
  imports: [
    BrowserModule // Necesario para aplicaciones que corren en el navegador
    // FormsModule, RouterModule, etc., si los necesitas
  ],
  // Servicios que este módulo provee (si los hubiera)
  providers: [],
  // El componente principal que Angular debe arrancar
  bootstrap: [AppComponent],
  // ¡Esencial para permitir elementos HTML personalizados (tus Lit Elements)!
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
  // El cuerpo de la clase puede estar vacío si no necesitas lógica específica aquí
  constructor() {
    console.log('AppModule instanciado (JS Version)');
  }
}

// Nota: No hay tipos, interfaces, ni modificadores de acceso (public/private).
// La estructura se mantiene por la metadata dentro del objeto @NgModule.