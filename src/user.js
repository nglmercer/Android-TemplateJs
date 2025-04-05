// main.js
import { UserProfile } from './components/UserProfile.js';

// Sample user data matching your provided structure
const userData = {
  "idUsuario": 608,
  "apodoUsuario": "memelser",
  "correoUsuario": "nglmercer@gmail.com",
  "rolUsuario": 1,
  "nsfwUsuario": false,
  "fechaCreacion": "2025-03-21 22:36:12",
  "apicode": null,
  "fechaNacimiento": null,
  "nombres": null,
  "apellidos": null,
  "state": null,
  "country": 0,
  "phone": null,
  "preRegistrado": 1,
  "creadorContenido": 0,
  "anticipado": 0,
  "fotoPerfilUsuario": null,
  "plan": {
    "idPlan": 4,
    "nombrePlan": "Koiniclub",
    "precioCentavos": 450,
    "meses": 1,
    "tipo": 2
  },
  "idUltimaTransaccion": 131,
  "fechaUltimaTransaccion": null,
  "nombreRol": "Usuario"
};

// Initialize the component when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const profileElement = document.querySelector('user-profile');
  
  if (profileElement) {
    profileElement.user = userData;
    
    // Listen for component events
    profileElement.addEventListener('cancel-plan', (e) => {
      console.log('Cancel plan for user ID:', e.detail.userId);
      // Handle cancel plan logic
    });
    
    profileElement.addEventListener('update-info', (e) => {
      console.log('Update info for user ID:', e.detail.userId);
      // Handle update info logic
    });
    
    profileElement.addEventListener('change-password', (e) => {
      console.log('Change password for user ID:', e.detail.userId);
      // Handle password change logic
    });
  }
});