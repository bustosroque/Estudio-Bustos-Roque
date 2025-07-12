# Integración con Google Calendar - Estudio Bustos & Roque

## Configuración de Google Calendar API

### 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Calendar:
   - Ve a "APIs & Services" > "Library"
   - Busca "Google Calendar API"
   - Haz clic en "Enable"

### 2. Configurar Credenciales

1. Ve a "APIs & Services" > "Credentials"
2. Haz clic en "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configura la aplicación:
   - Tipo: "Web application"
   - Nombre: "Estudio Bustos & Roque - Booking System"
   - URIs autorizados: `http://localhost:3000` (desarrollo) y tu dominio de producción
   - URIs de redirección: `http://localhost:3000/api/auth/callback/google`

### 3. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
# Google Calendar API Configuration
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google

# Calendar ID del estudio (puede ser 'primary' para el calendario principal)
GOOGLE_CALENDAR_ID=primary

# Email del estudio para recibir notificaciones
STUDIO_EMAIL=estudiojuridicobustosroque@gmail.com

# Configuración de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Instalar Dependencias

```bash
npm install googleapis @google-cloud/local-auth
```

### 5. Configurar Autenticación

El sistema actual está configurado para simular la integración. Para la integración completa:

1. **Autenticación con Service Account** (Recomendado para producción):
   - Crea una Service Account en Google Cloud Console
   - Descarga el archivo JSON de credenciales
   - Comparte el calendario con el email de la Service Account

2. **Autenticación OAuth2** (Para desarrollo):
   - Configura el flujo de OAuth2 para usuarios individuales

### 6. Implementación Completa

Para activar la integración real, descomenta y configura el código en `app/api/booking/route.ts`:

```typescript
import { google } from 'googleapis';

// Configurar autenticación
const auth = new google.auth.GoogleAuth({
  keyFile: 'path/to/service-account.json', // Para Service Account
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });

// En la función POST:
const response = await calendar.events.insert({
  calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
  resource: event,
  conferenceDataVersion: 1,
  sendUpdates: 'all'
});
```

## Características del Sistema de Reservas

### ✅ Funcionalidades Implementadas

- **Formulario de 3 pasos** con validación progresiva
- **Selección automática de abogado** según tipo de consulta
- **Calendario interactivo** con fechas disponibles
- **Horarios predefinidos** (9:00-11:30 y 14:00-16:30)
- **Modalidad presencial o llamada**
- **Validación de fechas** (no fines de semana, no fechas pasadas)
- **Diseño responsivo** que coincide con el sitio web
- **Integración con Google Calendar** (preparada)

### 🎨 Diseño y UX

- **Consistente** con el diseño existente del sitio
- **Colores**: Verde oscuro (#153F35) y amarillo (#D4AF37)
- **Tipografía**: Serif para títulos, sans-serif para contenido
- **Efectos**: Glassmorphism, animaciones suaves, hover effects
- **Responsive**: Optimizado para móvil, tablet y desktop

### 📅 Tipos de Consulta y Asignación

| Tipo de Consulta | Abogado Asignado | Descripción |
|------------------|------------------|-------------|
| Amparos de Salud | Diego Bustos | Protección de derechos en salud |
| Derecho Penal | Diego Bustos | Defensa en procesos penales |
| Derecho Civil | José Roque | Contratos, sucesiones, daños |
| Accidentes y ART | Diego Bustos | Reclamos por accidentes |
| Derecho Tributario | José Roque | Asesoramiento fiscal |
| Derecho Laboral | José Roque | Relaciones laborales |

### 🔔 Notificaciones y Recordatorios

- **Email de confirmación** automático al cliente
- **Recordatorio 24 horas** antes de la consulta
- **Recordatorio 30 minutos** antes de la consulta
- **Notificación al estudio** con todos los detalles

### 🚀 Próximos Pasos

1. **Configurar Google Calendar API** siguiendo las instrucciones arriba
2. **Implementar envío de emails** (puedes usar SendGrid, Resend, etc.)
3. **Agregar validación de disponibilidad** en tiempo real
4. **Implementar cancelación/modificación** de consultas
5. **Agregar dashboard** para administrar consultas

### 📱 Uso del Sistema

1. El cliente hace clic en "Reservar Consulta"
2. Completa sus datos personales y selecciona modalidad
3. Elige el tipo de consulta (se asigna automáticamente el abogado)
4. Selecciona fecha y hora disponibles
5. Confirma la reserva
6. Recibe confirmación por email y se agrega al calendario del estudio

¡El sistema está listo para usar! Solo necesitas configurar las credenciales de Google Calendar para la integración completa. 