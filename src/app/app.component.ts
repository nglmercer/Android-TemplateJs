// src/app/app.component.ts
import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Quita Renderer2
import { CommonModule } from '@angular/common';
import '../lit/login-element.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <login-element
      (login-attempt)="handleLoginAttempt($event)"
      (form-focusin)="handleFormFocusIn()"
      (form-focusout)="handleFormFocusOut()"
      (navigate-request)="handleNavigationRequest($event)"
      (login-success)="handleLoginSuccess($event)"
      (loading-state)="handleLoadingState($event)">
    </login-element>
    <!-- Resto del template -->
    <div *ngIf="loginFeedback">...</div>
    <div *ngIf="isLoading">...</div>
  `,
  styles: [`...`],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Mi App Vite con Angular (JS) y Lit (JS)';
  loginFeedback = '';
  isLoading = false;

  // Ya NO inyectamos Renderer2
  constructor() {
    console.log('AppComponent (TS) instanciado');
  }

  ngOnInit() {
    console.log('AppComponent (TS) inicializado');
  }

  ngOnDestroy(): void {
    // Limpia las clases del body si el componente se destruye
    document.body.classList.remove('form-focused');
  }

  handleFormFocusIn() {
    // Usamos directamente document.body.classList
    document.body.classList.add('form-focused');
  }

  handleFormFocusOut() {
    // Usamos directamente document.body.classList
    document.body.classList.remove('form-focused');
  }

  // ... resto de los métodos (handleLoginAttempt, etc.) sin cambios ...
  handleLoginAttempt(event: CustomEvent) { /* ... */ }
  handleLoginSuccess(event: CustomEvent) { /* ... */ }
  handleNavigationRequest(event: CustomEvent) { /* ... */ }
  handleLoadingState(event: CustomEvent) { /* ... */ }
}