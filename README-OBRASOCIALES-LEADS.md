# Landing Page para Obras Sociales - Meta Ads

Landing page completa y optimizada para convertir leads desde campañas de Meta Ads. Diseñada específicamente para captar clientes potenciales del estudio jurídico especializado en amparos de salud.

## 📍 Ubicación

La landing page está disponible en: `/obrasociales-leads`

## 🎯 Características

- ✅ **Hero ultra persuasivo** con CTAs claros
- ✅ **Formulario inteligente multi-paso** (5 pasos)
- ✅ **Sección de problemas frecuentes** con cards interactivas
- ✅ **FAQ completo** con 8 preguntas relevantes
- ✅ **Prueba social** con testimonios y logos de obras sociales
- ✅ **CTA final** con llamada a la acción fuerte
- ✅ **Botón flotante de WhatsApp** para mobile
- ✅ **Meta Pixel integrado** con eventos de conversión
- ✅ **Google Analytics** tracking
- ✅ **Envío de leads a Telegram** automático
- ✅ **Diseño responsive y mobile-first**
- ✅ **SEO optimizado**

## 🔧 Configuración

### Variables de Entorno

Crea o actualiza tu archivo `.env.local` con las siguientes variables:

```env
# Meta Pixel (Facebook)
NEXT_PUBLIC_META_PIXEL_ID=tu_pixel_id_aqui

# Telegram (opcional - para recibir leads)
TELEGRAM_BOT_TOKEN=tu_bot_token
TELEGRAM_CHAT_ID=tu_chat_id

# Google Analytics (opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Configurar Meta Pixel

1. Ve a [Facebook Business Manager](https://business.facebook.com/)
2. Crea un nuevo Pixel o usa uno existente
3. Copia el Pixel ID
4. Agrégalo a `NEXT_PUBLIC_META_PIXEL_ID` en `.env.local`

### Configurar Telegram (Opcional)

Para recibir los leads directamente en Telegram:

1. Crea un bot con [@BotFather](https://t.me/botfather) en Telegram
2. Obtén el token del bot
3. Obtén tu Chat ID (puedes usar [@userinfobot](https://t.me/userinfobot))
4. Agrega ambos valores a `.env.local`

**Nota:** Si no configuras Telegram, los leads se guardarán en los logs de la consola del servidor.

## 📊 Eventos de Meta Pixel

La landing page trackea los siguientes eventos:

- **ViewContent**: Al cargar la página
- **Lead**: Al hacer clic en WhatsApp o completar el formulario
- **CompleteRegistration**: Al completar el formulario exitosamente

## 🎨 Estructura de la Landing

### 1. Hero Section
- Título principal
- Subtítulo con valor
- Sellos de confianza (15 años, respuesta rápida, casos resueltos)
- Dos CTAs principales (WhatsApp y Formulario)

### 2. Sección de Autoridad
- Presentación del estudio
- Credenciales y experiencia

### 3. Problemas Frecuentes
- 10 cards con diferentes tipos de problemas
- Cada card tiene un CTA a "Consultar"

### 4. Formulario Multi-paso
- **Paso 1**: Tipo de problema
- **Paso 2**: Obra social/prepaga
- **Paso 3**: Nivel de urgencia
- **Paso 4**: Descripción breve
- **Paso 5**: Datos de contacto

### 5. FAQ
- 8 preguntas frecuentes con respuestas detalladas
- Usa componente Accordion de shadcn/ui

### 6. Prueba Social
- 3 testimonios ficticios (reemplazar con reales)
- Logos de obras sociales conocidas

### 7. CTA Final
- Fondo oscuro
- Mensaje de urgencia
- Botón grande de acción

## 📱 Funcionalidades

### Formulario Inteligente

El formulario incluye:
- Validación en cada paso
- Barra de progreso visual
- Navegación hacia adelante/atrás
- Mensaje de éxito con CTA a WhatsApp
- Tracking de conversiones

### Botón Flotante de WhatsApp

- Visible en todas las páginas
- Fijo en la esquina inferior derecha
- Optimizado para mobile
- Trackea clicks con Meta Pixel

## 🚀 Uso en Campañas de Meta Ads

### URL de Destino

```
https://tudominio.com/obrasociales-leads
```

### Parámetros UTM Recomendados

```
?utm_source=facebook&utm_medium=cpc&utm_campaign=obras_sociales_leads&utm_content=version_a
```

Los parámetros UTM se capturan automáticamente y se incluyen en los leads enviados a Telegram.

### Objetivos de Conversión

Configura estos eventos como objetivos de conversión en Meta Ads:

1. **Lead**: Cuando el usuario completa el formulario
2. **CompleteRegistration**: Confirmación de envío exitoso
3. **ViewContent**: Visualización de la página

## 📝 Personalización

### Reemplazar Testimonios

Edita el array `testimonios` en `app/obrasociales-leads/page.tsx`:

```typescript
const testimonios = [
  {
    nombre: "Nombre Real",
    texto: "Testimonio real del cliente",
    rating: 5,
  },
  // ...
];
```

### Agregar Obras Sociales

Edita el array `obrasSocialesLogos` en `app/obrasociales-leads/page.tsx`.

### Modificar Tipos de Problema

Edita el array `TIPOS_PROBLEMA` en `components/lead-form.tsx`.

## 🔍 Testing

### Verificar Meta Pixel

1. Instala la extensión [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) en Chrome
2. Visita la landing page
3. Verifica que el pixel se cargue correctamente
4. Completa el formulario y verifica que se disparen los eventos

### Verificar Telegram

1. Completa el formulario
2. Verifica que recibas el mensaje en Telegram
3. Si no está configurado, verifica los logs del servidor

## 📈 Optimización

### Performance

- Imágenes optimizadas con Next.js Image
- Lazy loading de componentes
- Scripts cargados con `afterInteractive`
- CSS optimizado con Tailwind

### Conversión

- Formulario corto y guiado
- Múltiples puntos de contacto (WhatsApp + Formulario)
- Urgencia y escasez en los mensajes
- Prueba social visible
- FAQ para resolver objeciones

## 🛠️ Troubleshooting

### El formulario no envía

1. Verifica que la API route `/api/leads` esté funcionando
2. Revisa los logs del servidor
3. Verifica la consola del navegador para errores

### Meta Pixel no funciona

1. Verifica que `NEXT_PUBLIC_META_PIXEL_ID` esté configurado
2. Usa Meta Pixel Helper para diagnosticar
3. Verifica que el script se esté cargando en el HTML

### Telegram no recibe mensajes

1. Verifica que `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` estén configurados
2. Asegúrate de que el bot tenga permisos para enviar mensajes
3. Verifica que el Chat ID sea correcto

## 📞 Soporte

Para cualquier duda o problema, contacta al equipo de desarrollo.

---

**Última actualización:** Enero 2025

