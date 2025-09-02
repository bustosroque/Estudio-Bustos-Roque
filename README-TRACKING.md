# Configuración de Tracking - Landing Page Pensiones por Discapacidad

## 📊 Tracking Implementado

La landing page `/pension-discapacidad` incluye tracking completo para:

- **Google Analytics 4**
- **Meta Pixel (Facebook)**
- **UTM Parameters**
- **Eventos de conversión**

## 🔧 Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# WhatsApp Business Number (para tracking)
NEXT_PUBLIC_WHATSAPP_NUMBER=5493513199098
```

### 2. Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva propiedad o usa una existente
3. Obtén tu Measurement ID (formato: G-XXXXXXXXXX)
4. Agrégalo a `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### 3. Meta Pixel

1. Ve a [Facebook Business Manager](https://business.facebook.com/)
2. Crea un nuevo Pixel o usa uno existente
3. Obtén tu Pixel ID
4. Agrégalo a `NEXT_PUBLIC_META_PIXEL_ID`

## 📈 Eventos Trackeados

### Eventos Automáticos
- **Page View**: Se registra automáticamente al cargar la página
- **UTM Parameters**: Se capturan y almacenan automáticamente

### Eventos de Interacción
- **WhatsApp Click**: Cuando el usuario hace clic en cualquier botón de WhatsApp
- **Form Submit**: Cuando se envía el formulario de contacto
- **Button Click**: Clicks en botones específicos

### Fuentes de Tracking
- `hero_cta`: Botón principal del hero
- `floating_button`: Botón flotante de WhatsApp
- `form_submit`: Envío del formulario

## 🎯 UTM Parameters Soportados

La landing page acepta y trackea estos parámetros UTM:

- `utm_source`: Fuente del tráfico (ej: google, facebook, instagram)
- `utm_medium`: Medio (ej: cpc, social, email)
- `utm_campaign`: Nombre de la campaña
- `utm_term`: Término de búsqueda (para Google Ads)
- `utm_content`: Contenido específico (para A/B testing)

### Ejemplo de URL con UTM:
```
https://tudominio.com/pension-discapacidad?utm_source=google&utm_medium=cpc&utm_campaign=pensiones_discapacidad&utm_term=pension+discapacidad+suspendida
```

## 📱 WhatsApp Integration

### Mensaje Prellenado del Formulario
Cuando el usuario completa el formulario, se genera automáticamente:

```
Hola, soy [NOMBRE] de [LOCALIDAD]. 
Mi pensión fue suspendida por: [SUSPENSIÓN]. 
Tel: [TEL]. 
Necesito asesoramiento.
```

### Mensaje del Botón Directo
```
Hola, me gustaría consultar sobre mi pensión por discapacidad suspendida.
```

## 🔍 Verificación del Tracking

### Google Analytics
1. Ve a tu propiedad de GA4
2. Navega a "Eventos" en tiempo real
3. Visita la landing page
4. Deberías ver los eventos registrándose

### Meta Pixel Helper
1. Instala la extensión "Meta Pixel Helper" en Chrome
2. Visita la landing page
3. Verifica que el pixel se esté cargando correctamente

### Console del Navegador
Abre las herramientas de desarrollador y verifica que no hay errores en la consola relacionados con el tracking.

## 📊 Métricas Importantes

### Conversiones a Trackear
- **WhatsApp Clicks**: Interés inicial
- **Form Submissions**: Conversión principal
- **Time on Page**: Engagement
- **Bounce Rate**: Calidad del tráfico

### Segmentación Recomendada
- Por fuente de tráfico (UTM source)
- Por campaña (UTM campaign)
- Por dispositivo (móvil vs desktop)
- Por ubicación geográfica

## 🚀 Optimización

### A/B Testing
Usa `utm_content` para probar diferentes versiones:
- `utm_content=version_a`
- `utm_content=version_b`

### Retargeting
Configura audiencias en Facebook Ads basadas en:
- Visitantes de la landing page
- Usuarios que hicieron clic en WhatsApp
- Usuarios que completaron el formulario

## 🛠️ Troubleshooting

### El tracking no funciona
1. Verifica que las variables de entorno estén configuradas
2. Asegúrate de que los IDs sean correctos
3. Revisa la consola del navegador por errores

### Los eventos no aparecen en GA4
1. Los eventos pueden tardar hasta 24 horas en aparecer en los reportes
2. Usa "Tiempo real" para verificar inmediatamente
3. Verifica que el Measurement ID sea correcto

### Meta Pixel no carga
1. Verifica que el Pixel ID sea correcto
2. Usa Meta Pixel Helper para diagnosticar
3. Revisa que no haya bloqueadores de anuncios activos

## 📞 Soporte

Para problemas técnicos o configuraciones adicionales, contacta al equipo de desarrollo.
