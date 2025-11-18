# 🔍 Cómo Obtener GOOGLE_PROJECT_ID y GOOGLE_CLIENT_ID

## 📄 Opción 1: Del Archivo JSON (MÁS FÁCIL)

Cuando creas un Service Account en Google Cloud Console, descargas un archivo JSON. **Todos los valores están ahí**.

### Paso 1: Abre el archivo JSON

El archivo se descarga automáticamente cuando creas el Service Account. Busca un archivo que se llame algo como:
- `tu-proyecto-123456-abc123.json`
- O el nombre que le diste al Service Account

### Paso 2: Abre el archivo con un editor de texto

Puedes abrirlo con:
- Bloc de notas (Notepad)
- Visual Studio Code
- Cualquier editor de texto

### Paso 3: Busca estos campos

El archivo se ve así:

```json
{
  "type": "service_account",
  "project_id": "mi-proyecto-123456",                    ← ESTO ES GOOGLE_PROJECT_ID
  "private_key_id": "abc123def456...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "mi-service@mi-proyecto.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",                  ← ESTO ES GOOGLE_CLIENT_ID
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

**Mapeo directo:**
- `"project_id"` → `GOOGLE_PROJECT_ID`
- `"client_id"` → `GOOGLE_CLIENT_ID`

---

## 🌐 Opción 2: Desde Google Cloud Console

Si no tienes el archivo JSON o quieres verificar:

### Para GOOGLE_PROJECT_ID:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. En la parte superior, donde dice el nombre del proyecto, haz clic
3. Se abre un menú con todos tus proyectos
4. El **Project ID** aparece debajo del nombre del proyecto
   - Ejemplo: 
     - Nombre: "Mi Proyecto Legal"
     - Project ID: `mi-proyecto-123456` ← Este es el que necesitas

### Para GOOGLE_CLIENT_ID:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Ve a **"APIs & Services"** > **"Credentials"**
3. En la sección **"Service Accounts"**, encuentra tu Service Account
4. Haz clic en el Service Account
5. Ve a la pestaña **"Keys"**
6. Si ya tienes una clave creada, verás el **Client ID** en la lista
7. Si no tienes clave, crea una nueva (Add Key > Create new key > JSON)
8. El Client ID también está en el archivo JSON que descargas

---

## 📋 Resumen Visual

```
Archivo JSON del Service Account
│
├── "project_id": "mi-proyecto-123456"          → GOOGLE_PROJECT_ID
├── "client_id": "123456789012345678901"       → GOOGLE_CLIENT_ID
├── "client_email": "mi-service@..."           → GOOGLE_SERVICE_ACCOUNT_EMAIL
└── "private_key": "-----BEGIN..."             → GOOGLE_PRIVATE_KEY
```

---

## ✅ Ejemplo Real

Si tu archivo JSON tiene esto:

```json
{
  "project_id": "estudio-bustos-roque-123456",
  "client_id": "987654321098765432109",
  ...
}
```

Entonces en tu `.env.local` pondrías:

```env
GOOGLE_PROJECT_ID=estudio-bustos-roque-123456
GOOGLE_CLIENT_ID=987654321098765432109
```

---

## 🆘 ¿No tienes el archivo JSON?

Si no tienes el archivo JSON, necesitas crear un Service Account:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** > **Credentials**
3. **Create Credentials** > **Service Account**
4. Completa el formulario
5. En la pestaña **Keys**, haz clic en **Add Key** > **Create new key**
6. Selecciona **JSON**
7. Se descargará el archivo con todos los valores

---

## 💡 Tip

**La forma más fácil es usar el archivo JSON** porque tiene todos los valores que necesitas en un solo lugar:
- ✅ `project_id` → GOOGLE_PROJECT_ID
- ✅ `client_id` → GOOGLE_CLIENT_ID  
- ✅ `client_email` → GOOGLE_SERVICE_ACCOUNT_EMAIL
- ✅ `private_key` → GOOGLE_PRIVATE_KEY

Solo falta `GOOGLE_SHEET_ID` que lo obtienes de la URL de tu hoja.

