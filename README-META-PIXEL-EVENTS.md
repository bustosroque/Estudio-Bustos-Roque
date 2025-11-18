# Eventos Estándar del Meta Pixel - Implementación Completa

Este documento describe todos los eventos estándar del Meta Pixel que han sido implementados en el sitio web del Estudio Jurídico Bustos & Roque.

## 📊 Eventos Implementados

### 1. **ViewContent** (Visualización de Contenido)
**Descripción:** Se dispara cuando un usuario visita una página importante.

**Implementado en:**
- ✅ `app/page.tsx` - Homepage principal
- ✅ `app/obrasociales-leads/page.tsx` - Landing de obras sociales

**Código:**
```typescript
trackViewContent({
  content_name: "Nombre de la página",
  content_category: "Legal Services",
});
```

---

### 2. **Contact** (Contacto)
**Descripción:** Se dispara cuando hay contacto por WhatsApp, email, teléfono o formulario.

**Implementado en:**
- ✅ `app/page.tsx` - Clicks en WhatsApp y envío de formulario de contacto
- ✅ `app/obrasociales-leads/page.tsx` - Clicks en WhatsApp
- ✅ `components/booking-form.tsx` - Envío de consulta inicial

**Código:**
```typescript
trackContact({
  content_name: "WhatsApp Click - Homepage",
  method: "whatsapp", // o "form", "email", "phone"
  content_category: "Contact",
});
```

---

### 3. **Lead** (Lead Generado)
**Descripción:** Se dispara cuando se genera un lead (formulario enviado, solicitud de información).

**Implementado en:**
- ✅ `components/lead-form.tsx` - Cuando se completa el formulario de obras sociales
- ✅ `app/obrasociales-leads/page.tsx` - Clicks en WhatsApp (también genera Lead)

**Código:**
```typescript
trackLead({
  content_name: "Obra Social Lead Form",
  content_category: "Tipo de problema",
  source: "form_submit",
});
```

---

### 4. **CompleteRegistration** (Registro Completado)
**Descripción:** Se dispara cuando se completa un registro o formulario exitosamente.

**Implementado en:**
- ✅ `components/lead-form.tsx` - Cuando se envía el formulario de obras sociales exitosamente

**Código:**
```typescript
trackCompleteRegistration({
  content_name: "Obra Social Lead Form",
  status: true,
});
```

---

### 5. **Schedule** (Cita Programada)
**Descripción:** Se dispara cuando se programa una cita o consulta.

**Implementado en:**
- ✅ `components/booking-form.tsx` - Cuando se confirma una reserva de consulta legal

**Código:**
```typescript
trackSchedule({
  content_name: "Consulta Legal Reservada",
  content_category: "Tipo de consulta",
});
```

---

## 📁 Archivos Creados/Modificados

### Nuevos Archivos:
1. **`components/meta-pixel-events.tsx`**
   - Contiene todas las funciones para trackear eventos estándar
   - Funciones disponibles para todos los eventos estándar de Meta

### Archivos Modificados:
1. **`app/layout.tsx`**
   - Meta Pixel base instalado con ID: `1590427399065580`
   - Incluye noscript tag para usuarios sin JavaScript

2. **`app/page.tsx`**
   - ViewContent al cargar la página
   - Contact en clicks de WhatsApp
   - Contact en envío de formulario

3. **`app/obrasociales-leads/page.tsx`**
   - ViewContent al cargar
   - Contact + Lead en clicks de WhatsApp
   - CompleteRegistration cuando el formulario se completa exitosamente

4. **`components/lead-form.tsx`**
   - Lead cuando se envía el formulario
   - CompleteRegistration cuando se completa exitosamente

5. **`components/booking-form.tsx`**
   - Schedule cuando se reserva una consulta
   - Contact cuando se envía consulta inicial

---

## 🎯 Eventos Disponibles (No Implementados Aún)

Los siguientes eventos están disponibles en `meta-pixel-events.tsx` pero no se han implementado aún. Puedes agregarlos cuando los necesites:

- `trackAddPaymentInfo` - Información de pago añadida
- `trackAddToCart` - Artículo añadido al carrito
- `trackAddToWishlist` - Artículo añadido a lista de deseos
- `trackInitiateCheckout` - Inicio de proceso de pago
- `trackPurchase` - Compra completada
- `trackSearch` - Búsqueda realizada
- `trackStartTrial` - Inicio de prueba gratuita
- `trackSubmitApplication` - Solicitud enviada
- `trackSubscribe` - Suscripción iniciada
- `trackDonate` - Donación realizada
- `trackFindLocation` - Búsqueda de ubicación

---

## 🔍 Verificación

Para verificar que los eventos se están trackeando correctamente:

1. **Instala Meta Pixel Helper** (extensión de Chrome)
   - Visita: https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc

2. **Abre las DevTools** del navegador
   - Presiona F12
   - Ve a la pestaña "Console"
   - Busca mensajes de `fbq`

3. **Prueba los eventos:**
   - Visita la homepage → Deberías ver `ViewContent`
   - Haz click en WhatsApp → Deberías ver `Contact` y `Lead`
   - Completa el formulario de obras sociales → Deberías ver `Lead` y `CompleteRegistration`
   - Reserva una consulta → Deberías ver `Schedule`

---

## 📝 Notas Importantes

1. **El Meta Pixel base** se carga automáticamente en todas las páginas desde `app/layout.tsx`

2. **Los eventos estándar** son los recomendados por Meta para optimización de campañas y creación de audiencias

3. **Todos los eventos** incluyen parámetros relevantes como `content_name`, `content_category`, etc.

4. **Los eventos se trackean** tanto en Meta Pixel como en Google Analytics (donde aplica)

---

## 🚀 Próximos Pasos

Si quieres agregar más eventos:

1. Importa la función necesaria desde `@/components/meta-pixel-events`
2. Llámala en el momento apropiado (click, submit, etc.)
3. Pasa los parámetros relevantes

Ejemplo:
```typescript
import { trackSearch } from "@/components/meta-pixel-events";

// Cuando el usuario busca algo
trackSearch({
  search_string: "amparo de salud",
  content_category: "Legal Services",
});
```

---

**Última actualización:** Noviembre 2025

