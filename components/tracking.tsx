"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Google Analytics tracking
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

interface TrackingProps {
  pageName: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export function TrackingProvider({ 
  pageName, 
  utmSource, 
  utmMedium, 
  utmCampaign, 
  utmTerm, 
  utmContent 
}: TrackingProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract UTM parameters from URL
    const urlUtmSource = searchParams.get('utm_source') || utmSource;
    const urlUtmMedium = searchParams.get('utm_medium') || utmMedium;
    const urlUtmCampaign = searchParams.get('utm_campaign') || utmCampaign;
    const urlUtmTerm = searchParams.get('utm_term') || utmTerm;
    const urlUtmContent = searchParams.get('utm_content') || utmContent;

    // Google Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: pageName,
        page_location: window.location.href,
        custom_map: {
          'custom_parameter_1': 'utm_source',
          'custom_parameter_2': 'utm_medium',
          'custom_parameter_3': 'utm_campaign',
          'custom_parameter_4': 'utm_term',
          'custom_parameter_5': 'utm_content'
        }
      });

      // Track page view with UTM parameters
      window.gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
        utm_source: urlUtmSource,
        utm_medium: urlUtmMedium,
        utm_campaign: urlUtmCampaign,
        utm_term: urlUtmTerm,
        utm_content: urlUtmContent
      });
    }

    // Meta Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView', {
        content_name: pageName,
        utm_source: urlUtmSource,
        utm_medium: urlUtmMedium,
        utm_campaign: urlUtmCampaign,
        utm_term: urlUtmTerm,
        utm_content: urlUtmContent
      });
    }

    // Store UTM parameters in localStorage for conversion tracking
    if (urlUtmSource || urlUtmMedium || urlUtmCampaign || urlUtmTerm || urlUtmContent) {
      const utmData = {
        utm_source: urlUtmSource,
        utm_medium: urlUtmMedium,
        utm_campaign: urlUtmCampaign,
        utm_term: urlUtmTerm,
        utm_content: urlUtmContent,
        timestamp: Date.now()
      };
      localStorage.setItem('utm_parameters', JSON.stringify(utmData));
    }
  }, [pageName, utmSource, utmMedium, utmCampaign, utmTerm, utmContent, searchParams]);

  return null;
}

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }

    // Meta Pixel
    if (window.fbq) {
      window.fbq('track', eventName, parameters);
    }
  }
};

export const trackWhatsAppClick = (source: string, utmData?: Record<string, string>) => {
  const eventData = {
    event_category: 'engagement',
    event_label: 'whatsapp_click',
    source: source,
    ...utmData
  };

  trackEvent('whatsapp_click', eventData);
};

export const trackFormSubmit = (formType: string, utmData?: Record<string, string>) => {
  const eventData = {
    event_category: 'conversion',
    event_label: 'form_submit',
    form_type: formType,
    ...utmData
  };

  trackEvent('form_submit', eventData);
};

export const trackButtonClick = (buttonName: string, section: string, utmData?: Record<string, string>) => {
  const eventData = {
    event_category: 'engagement',
    event_label: 'button_click',
    button_name: buttonName,
    section: section,
    ...utmData
  };

  trackEvent('button_click', eventData);
};

// Function to get stored UTM parameters
export const getStoredUtmParameters = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('utm_parameters');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored UTM parameters:', error);
      }
    }
  }
  return null;
};
