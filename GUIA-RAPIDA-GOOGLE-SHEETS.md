# 🚀 Guía Rápida: Configurar Google Sheets para Leads

## Resumen en 5 Pasos

### 1️⃣ Habilitar Google Sheets API
- Ve a [Google Cloud Console](https://console.cloud.google.com/)
- APIs & Services > Library > Busca "Google Sheets API" > Enable

### 2️⃣ Obtener Credenciales (si no las tienes)
- APIs & Services > Credentials > Create Credentials > Service Account
- Descarga el archivo JSON

### 3️⃣ Crear Hoja de Google Sheets
- Ve a [Google Sheets](https://sheets.google.com)
- Crea una hoja nueva
- **Comparte** la hoja con el email del Service Account (del JSON, campo `client_email`)
- Dale permisos de **"Editor"**

### 4️⃣ Obtener el ID de la Hoja
- Mira la URL: `https://docs.google.com/spreadsheets/d/ID_AQUI/edit`
- Copia el `ID_AQUI` (la parte larga entre `/d/` y `/edit`)

### 5️⃣ Configurar .env.local
```env
# Si ya tienes estas variables para Google Calendar, solo agrega GOOGLE_SHEET_ID
GOOGLE_SERVICE_ACCOUNT_EMAIL=email-del-json@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=tu-proyecto-id
GOOGLE_CLIENT_ID=tu-client-id
GOOGLE_SHEET_ID=ID_DE_TU_HOJA_AQUI
```

## ✅ Listo!

Reinicia el servidor y prueba el formulario. Los leads aparecerán automáticamente en tu hoja.

**Para más detalles, lee:** `README-GOOGLE-SHEETS.md`

