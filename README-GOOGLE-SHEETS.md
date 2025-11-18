# Integración con Google Sheets - Leads Automáticos

Esta guía te explica paso a paso cómo configurar Google Sheets para recibir automáticamente todos los leads del formulario de obras sociales.

## 📋 Requisitos Previos

1. Una cuenta de Google (Gmail)
2. Acceso a Google Cloud Console
3. Un proyecto de Google Cloud (puede ser el mismo que usas para Google Calendar)

---

## 🚀 Paso 1: Habilitar Google Sheets API

### 1.1. Ir a Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto (o crea uno nuevo si no tienes)

### 1.2. Habilitar la API

1. En el menú lateral, ve a **"APIs & Services"** > **"Library"**
2. Busca **"Google Sheets API"**
3. Haz clic en **"Enable"** (Habilitar)

---

## 🔑 Paso 2: Configurar Service Account

### 2.1. Crear Service Account (si no lo tienes)

Si ya tienes un Service Account para Google Calendar, puedes usar el mismo. Si no:

1. Ve a **"APIs & Services"** > **"Credentials"**
2. Haz clic en **"Create Credentials"** > **"Service Account"**
3. Completa:
   - **Name**: `Estudio Bustos & Roque - Sheets Service`
   - **Description**: `Service account para Google Sheets`
4. Haz clic en **"Create and Continue"**
5. En **"Grant this service account access to project"**:
   - Selecciona rol: **"Editor"**
   - Haz clic en **"Continue"**
6. Haz clic en **"Done"**

### 2.2. Generar Credenciales JSON

1. En la lista de Service Accounts, haz clic en el que acabas de crear (o el que ya tenías)
2. Ve a la pestaña **"Keys"**
3. Haz clic en **"Add Key"** > **"Create new key"**
4. Selecciona **"JSON"**
5. Haz clic en **"Create"**
6. Se descargará un archivo JSON - **GUÁRDALO SEGURO** (no lo subas a GitHub)

---

## 📊 Paso 3: Crear la Hoja de Google Sheets

### 3.1. Crear Nueva Hoja

1. Ve a [Google Sheets](https://sheets.google.com)
2. Haz clic en **"Blank"** (Hoja en blanco)
3. Nombra la hoja (ej: "Leads Obras Sociales")

### 3.2. Compartir con el Service Account

1. En tu hoja de Google Sheets, haz clic en **"Share"** (Compartir) - botón azul arriba a la derecha
2. En el campo de email, pega el **email del Service Account** (lo encuentras en el archivo JSON descargado, campo `client_email`)
   - Ejemplo: `estudio-bustos-roque@tu-proyecto.iam.gserviceaccount.com`
3. Dale permisos de **"Editor"**
4. **IMPORTANTE**: Desmarca la casilla "Notify people" (No notificar)
5. Haz clic en **"Share"**

### 3.3. Obtener el ID de la Hoja

1. Mira la URL de tu hoja de Google Sheets
2. El ID es la parte larga entre `/d/` y `/edit`
   - Ejemplo: `https://docs.google.com/spreadsheets/d/1ABC123xyz.../edit`
   - El ID sería: `1ABC123xyz...`
3. **Copia este ID** - lo necesitarás para la configuración

---

## ⚙️ Paso 4: Configurar Variables de Entorno

### 4.1. Abrir el archivo JSON descargado

Abre el archivo JSON que descargaste del Service Account. Debería verse así:

```json
{
  "type": "service_account",
  "project_id": "tu-proyecto-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "tu-service-account@tu-proyecto.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

### 4.2. Agregar a .env.local

Abre o crea el archivo `.env.local` en la raíz de tu proyecto y agrega estas **5 variables**:

```env
# ============================================
# GOOGLE SHEETS - Variables de Entorno
# ============================================

# 1. Email del Service Account (del archivo JSON, campo "client_email")
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@tu-proyecto.iam.gserviceaccount.com

# 2. Private Key (del archivo JSON, campo "private_key")
# ⚠️ IMPORTANTE: Mantén las comillas dobles y los \n literalmente
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_PRIVATE_KEY_COMPLETA_AQUI\n-----END PRIVATE KEY-----\n"

# 3. Project ID (del archivo JSON, campo "project_id")
GOOGLE_PROJECT_ID=tu-proyecto-id

# 4. Client ID (del archivo JSON, campo "client_id")
GOOGLE_CLIENT_ID=tu-client-id

# 5. ID de tu hoja de Google Sheets (de la URL, entre /d/ y /edit)
GOOGLE_SHEET_ID=1ABC123xyz...
```

**📝 Nota:** Si ya tienes las primeras 4 variables configuradas para Google Calendar, solo necesitas agregar `GOOGLE_SHEET_ID`.

### 4.3. ¿Dónde encuentro cada valor?

**Del archivo JSON del Service Account:**
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` → Campo `"client_email"`
- `GOOGLE_PRIVATE_KEY` → Campo `"private_key"` (copia completo, con `-----BEGIN...` y `-----END...`)
- `GOOGLE_PROJECT_ID` → Campo `"project_id"`
- `GOOGLE_CLIENT_ID` → Campo `"client_id"`

**De la URL de tu hoja de Google Sheets:**
- `GOOGLE_SHEET_ID` → URL: `https://docs.google.com/spreadsheets/d/ID_AQUI/edit`
  - El ID es la parte entre `/d/` y `/edit`

### 4.4. Formato de GOOGLE_PRIVATE_KEY

**MUY IMPORTANTE**: La `GOOGLE_PRIVATE_KEY` debe estar exactamente así:

```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**Reglas:**
- ✅ Debe estar entre comillas dobles `"`
- ✅ Los `\n` deben estar literalmente (no son saltos de línea reales)
- ✅ Copia TODO el private_key del archivo JSON
- ✅ Incluye `-----BEGIN PRIVATE KEY-----` al inicio
- ✅ Incluye `-----END PRIVATE KEY-----` al final

**❌ NO hagas esto:**
```env
# MAL - Sin comillas
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...

# MAL - Con saltos de línea reales
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----"
```

**✅ Haz esto:**
```env
# BIEN - Todo en una línea, con \n y comillas
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**💡 Tip:** Copia el valor del campo `"private_key"` del JSON tal cual está, y ponlo entre comillas dobles.

---

## ✅ Paso 5: Verificar la Configuración

### 5.1. Reiniciar el servidor

```bash
# Detén el servidor (Ctrl+C) y reinícialo
npm run dev
```

### 5.2. Probar el formulario

1. Ve a tu landing page de obras sociales
2. Completa el formulario con datos de prueba
3. Envía el formulario
4. Ve a tu hoja de Google Sheets
5. Deberías ver una nueva fila con los datos del lead

---

## 📊 Estructura de la Hoja

La hoja se creará automáticamente con estas columnas:

| Columna | Descripción |
|---------|-------------|
| Fecha y Hora | Timestamp del lead |
| Nombre | Nombre completo |
| Teléfono | Teléfono de contacto |
| Email | Email (opcional) |
| Tipo de Problema | Tipo de problema seleccionado |
| Obra Social/Prepaga | Obra social seleccionada |
| Urgencia | Nivel de urgencia |
| Descripción | Descripción del problema |
| UTM Source | Fuente del tráfico |
| UTM Medium | Medio del tráfico |
| UTM Campaign | Campaña |
| UTM Term | Término |
| UTM Content | Contenido |
| IP | Dirección IP del usuario |

---

## 🔧 Solución de Problemas

### Error: "Google Sheets not configured"

- Verifica que todas las variables de entorno estén en `.env.local`
- Reinicia el servidor después de agregar las variables

### Error: "Sheet ID not configured"

- Verifica que `GOOGLE_SHEET_ID` tenga el ID correcto de tu hoja
- El ID es la parte larga de la URL entre `/d/` y `/edit`

### Error: "Permission denied"

- Verifica que compartiste la hoja con el email del Service Account
- El email debe tener permisos de **"Editor"**
- El email del Service Account está en `GOOGLE_SERVICE_ACCOUNT_EMAIL`

### Error: "API not enabled"

- Ve a Google Cloud Console
- Verifica que "Google Sheets API" esté habilitada
- Espera unos minutos después de habilitarla

### Los datos no aparecen en la hoja

1. Verifica los logs del servidor (consola donde corre `npm run dev`)
2. Busca mensajes que empiecen con `✅` o `❌`
3. Verifica que la hoja tenga permisos correctos
4. Verifica que el ID de la hoja sea correcto

---

## 🔒 Seguridad

**IMPORTANTE**: 

- ❌ **NUNCA** subas el archivo `.env.local` a GitHub
- ❌ **NUNCA** subas el archivo JSON del Service Account a GitHub
- ✅ Agrega `.env.local` a `.gitignore`
- ✅ Si usas Vercel/Netlify, agrega las variables de entorno en el panel de configuración

---

## 📝 Notas Adicionales

1. **La hoja se crea automáticamente**: Si la hoja "Leads" no existe, se creará automáticamente con los headers
2. **Múltiples hojas**: Puedes tener múltiples hojas en el mismo spreadsheet, cada una con diferentes datos
3. **Formato automático**: Los headers se formatean automáticamente (negrita y color)
4. **Backup**: Los leads también se envían a Telegram (si está configurado) como backup

---

## 🎯 Próximos Pasos

Una vez configurado, cada vez que alguien complete el formulario de obras sociales:

1. ✅ Se guardará automáticamente en Google Sheets
2. ✅ Se enviará a Telegram (si está configurado)
3. ✅ Se trackeará en Meta Pixel como Lead
4. ✅ Tendrás todos los datos organizados en una hoja de cálculo

---

**¿Necesitas ayuda?** Revisa los logs del servidor para ver mensajes de error específicos.

