# 📝 Variables de Entorno Necesarias para Google Sheets

## ✅ Variables OBLIGATORIAS

Necesitas estas **5 variables** en tu archivo `.env.local`:

### 1. `GOOGLE_SERVICE_ACCOUNT_EMAIL`
**¿Qué es?** El email del Service Account de Google Cloud.

**¿Dónde lo encuentro?** 
- En el archivo JSON que descargaste del Service Account
- Busca el campo `"client_email"`
- Ejemplo: `estudio-bustos@mi-proyecto-123456.iam.gserviceaccount.com`

**Formato:**
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=estudio-bustos@mi-proyecto-123456.iam.gserviceaccount.com
```

---

### 2. `GOOGLE_PRIVATE_KEY`
**¿Qué es?** La clave privada del Service Account.

**¿Dónde lo encuentro?**
- En el mismo archivo JSON
- Busca el campo `"private_key"`
- Es una cadena larga que empieza con `-----BEGIN PRIVATE KEY-----`

**Formato IMPORTANTE:**
```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**⚠️ ATENCIÓN:**
- Debe estar entre comillas dobles `"`
- Los `\n` deben estar literalmente (no son saltos de línea reales)
- Copia TODO el private_key del JSON, incluyendo `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`

---

### 3. `GOOGLE_PROJECT_ID`
**¿Qué es?** El ID de tu proyecto en Google Cloud.

**¿Dónde lo encuentro?**
- ✅ **MÁS FÁCIL:** En el archivo JSON del Service Account, campo `"project_id"`
- O en Google Cloud Console, en la parte superior donde dice el nombre del proyecto

**Ejemplo del JSON:**
```json
{
  "project_id": "mi-proyecto-123456",  ← Este valor
  ...
}
```

**Formato:**
```env
GOOGLE_PROJECT_ID=mi-proyecto-123456
```

---

### 4. `GOOGLE_CLIENT_ID`
**¿Qué es?** El Client ID del Service Account.

**¿Dónde lo encuentro?**
- ✅ **MÁS FÁCIL:** En el archivo JSON del Service Account, campo `"client_id"`
- O en Google Cloud Console > APIs & Services > Credentials > Service Accounts > Tu Service Account > Keys

**Ejemplo del JSON:**
```json
{
  "client_id": "123456789012345678901",  ← Este valor
  ...
}
```

**Formato:**
```env
GOOGLE_CLIENT_ID=123456789012345678901
```

**💡 IMPORTANTE:** Ambos valores (`project_id` y `client_id`) están en el mismo archivo JSON que descargaste cuando creaste el Service Account.

---

### 5. `GOOGLE_SHEET_ID`
**¿Qué es?** El ID de tu hoja de Google Sheets.

**¿Dónde lo encuentro?**
1. Abre tu hoja de Google Sheets
2. Mira la URL en el navegador
3. La URL se ve así: `https://docs.google.com/spreadsheets/d/1ABC123xyz456DEF789/edit`
4. El ID es la parte entre `/d/` y `/edit`
5. En este ejemplo sería: `1ABC123xyz456DEF789`

**Formato:**
```env
GOOGLE_SHEET_ID=1ABC123xyz456DEF789
```

---

## 📋 Ejemplo Completo de .env.local

```env
# ============================================
# GOOGLE SHEETS - Configuración
# ============================================

# Email del Service Account (del archivo JSON, campo "client_email")
GOOGLE_SERVICE_ACCOUNT_EMAIL=estudio-bustos@mi-proyecto-123456.iam.gserviceaccount.com

# Private Key (del archivo JSON, campo "private_key")
# IMPORTANTE: Mantén las comillas y los \n
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7v8K9xY3Z...\n-----END PRIVATE KEY-----\n"

# Project ID (del archivo JSON, campo "project_id")
GOOGLE_PROJECT_ID=mi-proyecto-123456

# Client ID (del archivo JSON, campo "client_id")
GOOGLE_CLIENT_ID=123456789012345678901

# ID de tu hoja de Google Sheets (de la URL)
GOOGLE_SHEET_ID=1ABC123xyz456DEF789
```

---

## 🔍 Cómo Obtener los Valores del Archivo JSON

Cuando descargas el archivo JSON del Service Account, se ve así:

```json
{
  "type": "service_account",
  "project_id": "mi-proyecto-123456",           ← GOOGLE_PROJECT_ID
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",  ← GOOGLE_PRIVATE_KEY
  "client_email": "estudio-bustos@mi-proyecto-123456.iam.gserviceaccount.com",  ← GOOGLE_SERVICE_ACCOUNT_EMAIL
  "client_id": "123456789012345678901",          ← GOOGLE_CLIENT_ID
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

**Mapeo:**
- `project_id` → `GOOGLE_PROJECT_ID`
- `private_key` → `GOOGLE_PRIVATE_KEY`
- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `client_id` → `GOOGLE_CLIENT_ID`
- `GOOGLE_SHEET_ID` → Lo obtienes de la URL de tu hoja

---

## ✅ Checklist de Verificación

Antes de probar, verifica que tienes:

- [ ] `GOOGLE_SERVICE_ACCOUNT_EMAIL` - Email del Service Account
- [ ] `GOOGLE_PRIVATE_KEY` - Clave privada completa (con comillas y \n)
- [ ] `GOOGLE_PROJECT_ID` - ID del proyecto
- [ ] `GOOGLE_CLIENT_ID` - Client ID del Service Account
- [ ] `GOOGLE_SHEET_ID` - ID de tu hoja de Google Sheets
- [ ] La hoja está compartida con el email del Service Account
- [ ] El Service Account tiene permisos de "Editor" en la hoja

---

## 🚨 Errores Comunes

### Error: "Google Sheets not configured"
- **Causa:** Faltan variables de entorno
- **Solución:** Verifica que todas las 5 variables estén en `.env.local`

### Error: "Permission denied"
- **Causa:** La hoja no está compartida con el Service Account
- **Solución:** Comparte la hoja con el email de `GOOGLE_SERVICE_ACCOUNT_EMAIL`

### Error: "Sheet ID not configured"
- **Causa:** `GOOGLE_SHEET_ID` está vacío o incorrecto
- **Solución:** Verifica que el ID sea correcto (de la URL de la hoja)

### Los datos no aparecen
- **Causa:** El ID de la hoja es incorrecto o no tiene permisos
- **Solución:** Verifica el ID y los permisos de la hoja

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:
1. Revisa los logs del servidor (consola donde corre `npm run dev`)
2. Busca mensajes que empiecen con `✅` (éxito) o `❌` (error)
3. Verifica que todas las variables estén correctamente configuradas

