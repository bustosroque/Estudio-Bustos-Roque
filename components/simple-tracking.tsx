"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Simple tracking component that doesn't interfere with rendering
export function SimpleTracking() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract UTM parameters from URL
    const urlUtmSource = searchParams.get('utm_source');
    const urlUtmMedium = searchParams.get('utm_medium');
    const urlUtmCampaign = searchParams.get('utm_campaign');
    const urlUtmTerm = searchParams.get('utm_term');
    const urlUtmContent = searchParams.get('utm_content');

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

    // Google Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Pension Discapacidad Landing',
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
        content_name: 'Pension Discapacidad Landing',
        utm_source: urlUtmSource,
        utm_medium: urlUtmMedium,
        utm_campaign: urlUtmCampaign,
        utm_term: urlUtmTerm,
        utm_content: urlUtmContent
      });
    }
  }, [searchParams]);

  return null;
}
