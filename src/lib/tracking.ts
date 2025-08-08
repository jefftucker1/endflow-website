"use client";

// Tracking event interface
export interface TrackingEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  custom_parameters?: Record<string, any>;
}

// UTM parameters interface
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

// Capture and store UTM parameters
export function captureUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
  };

  // Store in localStorage for attribution
  if (Object.values(utmParams).some(v => v)) {
    localStorage.setItem('endflow_utm', JSON.stringify(utmParams));
  }

  return utmParams;
}

// Get stored UTM parameters
export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem('endflow_utm');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Google Analytics 4 tracking
export function trackGA4(event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).gtag && typeof (window as any).gtag === 'function') {
    try {
      const utmParams = getStoredUTMParams();
      
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameters: {
          ...event.custom_parameters,
          ...utmParams,
        },
      });
    } catch (error) {
      console.warn('GA4 tracking error:', error);
    }
  }
}

// Facebook/Meta Pixel tracking
export function trackFacebookPixel(event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).fbq && typeof (window as any).fbq === 'function') {
    try {
      const utmParams = getStoredUTMParams();
      
      (window as any).fbq('track', event.action, {
        category: event.category,
        label: event.label,
        value: event.value,
        ...utmParams,
        ...event.custom_parameters,
      });
    } catch (error) {
      console.warn('Facebook Pixel tracking error:', error);
    }
  }
}

// LinkedIn Insight Tag tracking
export function trackLinkedIn(event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).lintrk && typeof (window as any).lintrk === 'function') {
    try {
      const utmParams = getStoredUTMParams();
      
      (window as any).lintrk('track', {
        conversion_id: event.action,
        ...utmParams,
        ...event.custom_parameters,
      });
    } catch (error) {
      console.warn('LinkedIn tracking error:', error);
    }
  }
}

// X (Twitter) Pixel tracking
export function trackTwitter(event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).twq && typeof (window as any).twq === 'function') {
    try {
      const utmParams = getStoredUTMParams();
      
      (window as any).twq('track', event.action, {
        value: event.value,
        ...utmParams,
        ...event.custom_parameters,
      });
    } catch (error) {
      console.warn('Twitter tracking error:', error);
    }
  }
}

// Reddit Pixel tracking
export function trackReddit(event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).rdt && typeof (window as any).rdt === 'function') {
    try {
      const utmParams = getStoredUTMParams();
      
      (window as any).rdt('track', event.action, {
        value: event.value,
        ...utmParams,
        ...event.custom_parameters,
      });
    } catch (error) {
      console.warn('Reddit tracking error:', error);
    }
  }
}

// Product Hunt tracking
export function trackProductHunt(event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).ph && typeof (window as any).ph === 'function') {
    try {
      const utmParams = getStoredUTMParams();
      
      (window as any).ph('track', event.action, {
        category: event.category,
        label: event.label,
        value: event.value,
        ...utmParams,
        ...event.custom_parameters,
      });
    } catch (error) {
      console.warn('Product Hunt tracking error:', error);
    }
  }
}

// RB2B tracking
export function trackRB2B(event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any).rb2b && typeof (window as any).rb2b.track === 'function') {
    try {
      const utmParams = getStoredUTMParams();
      
      (window as any).rb2b.track(event.action, {
        category: event.category,
        label: event.label,
        value: event.value,
        ...utmParams,
        ...event.custom_parameters,
      });
    } catch (error) {
      console.warn('RB2B tracking error:', error);
    }
  }
}

// HubSpot tracking
export function trackHubSpot(event: TrackingEvent) {
  if (typeof window !== 'undefined' && (window as any)._hsq && Array.isArray((window as any)._hsq)) {
    try {
      const utmParams = getStoredUTMParams();
      
      (window as any)._hsq.push(['trackEvent', {
        id: event.action,
        value: event.value,
        ...utmParams,
        ...event.custom_parameters,
      }]);
    } catch (error) {
      console.warn('HubSpot tracking error:', error);
    }
  }
}

// Master tracking function - fires to all platforms
export function trackEvent(event: TrackingEvent) {
  console.log('Tracking event:', event);
  
  // Track to all platforms
  trackGA4(event);
  trackFacebookPixel(event);
  trackLinkedIn(event);
  trackTwitter(event);
  trackReddit(event);
  trackProductHunt(event);
  trackRB2B(event);
  trackHubSpot(event);
}

// Common tracking events
export const trackingEvents = {
  // Page views
  pageView: (page: string) => trackEvent({
    action: 'page_view',
    category: 'engagement',
    label: page,
    ...getStoredUTMParams(),
  }),

  // Signup flow
  signupStarted: () => trackEvent({
    action: 'signup_started',
    category: 'conversion',
    label: 'signup_form',
  }),

  signupCompleted: (credits: number) => trackEvent({
    action: 'signup_completed',
    category: 'conversion',
    label: 'account_created',
    value: credits,
  }),

  creditsClaimedClaimed: (credits: number) => trackEvent({
    action: 'credits_claimed',
    category: 'conversion',
    label: 'free_credits',
    value: credits,
  }),

  // Demo and product interest
  demoRequested: () => trackEvent({
    action: 'demo_requested',
    category: 'engagement',
    label: 'watch_demo',
  }),

  demoCompleted: () => trackEvent({
    action: 'demo_completed',
    category: 'engagement',
    label: 'demo_finished',
  }),

  // Product usage
  firstSearchPerformed: (query: string) => trackEvent({
    action: 'first_search_performed',
    category: 'product',
    label: 'initial_usage',
    custom_parameters: { search_query: query },
  }),

  exportCompleted: (format: 'csv' | 'webhook' | 'clay') => trackEvent({
    action: 'export_completed',
    category: 'product',
    label: format,
  }),

  // Content engagement
  blogPostViewed: (title: string) => trackEvent({
    action: 'blog_post_viewed',
    category: 'content',
    label: title,
  }),

  pricingPageViewed: () => trackEvent({
    action: 'pricing_page_viewed',
    category: 'engagement',
    label: 'pricing_interest',
  }),

  // Contact and support
  contactFormSubmitted: () => trackEvent({
    action: 'contact_form_submitted',
    category: 'engagement',
    label: 'support_request',
  }),
};