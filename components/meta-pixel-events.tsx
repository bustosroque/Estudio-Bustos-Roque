"use client";

// Declarar tipos para Meta Pixel
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

/**
 * Utilidades para trackear eventos estándar del Meta Pixel
 * Documentación: https://developers.facebook.com/docs/meta-pixel/reference
 */

/**
 * Trackea cuando se añade información de pago
 */
export const trackAddPaymentInfo = (params?: {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "AddPaymentInfo", params || {});
  }
};

/**
 * Trackea cuando se añade un artículo al carrito
 */
export const trackAddToCart = (params?: {
  value?: number;
  currency?: string;
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "AddToCart", params || {});
  }
};

/**
 * Trackea cuando se completa un registro
 */
export const trackCompleteRegistration = (params?: {
  value?: number;
  currency?: string;
  content_name?: string;
  status?: boolean;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "CompleteRegistration", params || {});
  }
};

/**
 * Trackea cuando hay contacto (WhatsApp, email, teléfono, etc.)
 */
export const trackContact = (params?: {
  content_name?: string;
  content_category?: string;
  method?: string; // 'whatsapp', 'email', 'phone', 'form'
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact", params || {});
  }
};

/**
 * Trackea cuando se inicia un proceso de checkout/pago
 */
export const trackInitiateCheckout = (params?: {
  value?: number;
  currency?: string;
  content_name?: string;
  content_ids?: string[];
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "InitiateCheckout", params || {});
  }
};

/**
 * Trackea cuando se genera un lead (formulario enviado, solicitud de información)
 */
export const trackLead = (params?: {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  source?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", params || {});
  }
};

/**
 * Trackea una compra completada
 */
export const trackPurchase = (params: {
  value: number;
  currency: string;
  content_name?: string;
  content_ids?: string[];
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Purchase", params);
  }
};

/**
 * Trackea cuando se programa una cita
 */
export const trackSchedule = (params?: {
  content_name?: string;
  content_category?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Schedule", params || {});
  }
};

/**
 * Trackea una búsqueda realizada
 */
export const trackSearch = (params?: {
  search_string?: string;
  content_category?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Search", params || {});
  }
};

/**
 * Trackea cuando se inicia una prueba gratuita
 */
export const trackStartTrial = (params?: {
  value?: string;
  currency?: string;
  predicted_ltv?: string;
  content_name?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "StartTrial", params || {});
  }
};

/**
 * Trackea cuando se envía una solicitud
 */
export const trackSubmitApplication = (params?: {
  content_name?: string;
  content_category?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "SubmitApplication", params || {});
  }
};

/**
 * Trackea cuando se inicia una suscripción
 */
export const trackSubscribe = (params?: {
  value?: string;
  currency?: string;
  predicted_ltv?: string;
  content_name?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Subscribe", params || {});
  }
};

/**
 * Trackea cuando se visualiza contenido específico
 */
export const trackViewContent = (params?: {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", params || {});
  }
};

/**
 * Trackea una donación
 */
export const trackDonate = (params?: {
  value?: number;
  currency?: string;
  content_name?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Donate", params || {});
  }
};

/**
 * Trackea cuando se encuentra una ubicación
 */
export const trackFindLocation = (params?: {
  content_name?: string;
  content_category?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "FindLocation", params || {});
  }
};

