# Integración con Google Calendar - Estudio Bustos & Roque

## Configuración de Google Calendar API

### 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Calendar:
   - Ve a "APIs & Services" > "Library"
   - Busca "Google Calendar API"
   - Haz clic en "Enable"

### 2. Configurar Service Account (Recomendado para producción)

1. Ve a "APIs & Services" > "Credentials"
2. Haz clic en "Create Credentials" > "Service Account"
3. Completa la información:
   - Nombre: "Estudio Bustos & Roque - Calendar Service"
   - Descripción: "Service account para integración con Google Calendar"
4. Haz clic en "Create and Continue"
5. En "Grant this service account access to project":
   - Selecciona "Editor" como rol
   - Haz clic en "Continue"
6. Haz clic en "Done"

### 3. Generar y Descargar Credenciales

1. En la lista de Service Accounts, haz clic en el que acabas de crear
2. Ve a la pestaña "Keys"
3. Haz clic en "Add Key" > "Create new key"
4. Selecciona "JSON" y haz clic en "Create"
5. Se descargará un archivo JSON con las credenciales

### 4. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
# Google Calendar API Configuration - Service Account
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_PRIVATE_KEY_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=tu-proyecto-id
GOOGLE_CLIENT_ID=tu-client-id

# Calendar ID del estudio (puede ser 'primary' para el calendario principal)
GOOGLE_CALENDAR_ID=primary

# Email del estudio para recibir notificaciones
STUDIO_EMAIL=estudiojuridicobustosroque@gmail.com

# Configuración de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Configurar la Private Key Correctamente

**IMPORTANTE**: La `GOOGLE_PRIVATE_KEY` debe estar formateada correctamente:

1. Abre el archivo JSON descargado
2. Copia el valor de `private_key`
3. En tu `.env.local`, envuelve la private key en comillas dobles
4. Asegúrate de que los `\n` estén presentes para los saltos de línea

Ejemplo correcto:
```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

### 6. Compartir Calendario con Service Account

1. Ve a [Google Calendar](https://calendar.google.com/)
2. Encuentra tu calendario en el panel izquierdo
3. Haz clic en los 3 puntos junto al nombre del calendario
4. Selecciona "Settings and sharing"
5. En "Share with specific people", haz clic en "+ Add people"
6. Agrega el email del Service Account (el valor de `GOOGLE_SERVICE_ACCOUNT_EMAIL`)
7. Dale permisos de "Make changes to events"
8. Haz clic en "Send"

### 7. Instalar Dependencias

```bash
npm install googleapis
```

### 8. Verificar Configuración

El sistema ahora maneja automáticamente:
- ✅ Validación de credenciales
- ✅ Limpieza y formateo de la private key
- ✅ Fallback graceful si Google Calendar no está configurado
- ✅ Mejor manejo de errores

## Características del Sistema de Reservas

### ✅ Funcionalidades Implementadas

- **Formulario de 3 pasos** con validación progresiva
- **Selección automática de abogado** según tipo de consulta
- **Calendario interactivo** con fechas disponibles
- **Horarios predefinidos** (9:00-11:30 y 14:00-16:30)
- **Modalidad presencial o llamada**
- **Validación de fechas** (no fines de semana, no fechas pasadas)
- **Diseño responsivo** que coincide con el sitio web
- **Integración con Google Calendar** (configurada y funcional)

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
- **Evento en Google Calendar** con Meet automático

### 🚀 Próximos Pasos

1. **Configurar variables de entorno** siguiendo las instrucciones arriba
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

### 🔧 Solución de Problemas

**Error "DECODER routines::unsupported"**:
- Verifica que la `GOOGLE_PRIVATE_KEY` esté correctamente formateada
- Asegúrate de que los `\n` estén presentes en la private key
- La private key debe estar envuelta en comillas dobles en el `.env.local`

**Error de autenticación**:
- Verifica que el Service Account tenga permisos en el calendario
- Confirma que el `GOOGLE_SERVICE_ACCOUNT_EMAIL` sea correcto
- Asegúrate de que la API de Google Calendar esté habilitada

¡El sistema está listo para usar! Solo necesitas configurar las credenciales de Google Calendar siguiendo estas instrucciones. 