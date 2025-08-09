"use client";

import { useEffect } from 'react';
import Script from 'next/script';
import { captureUTMParams, trackingEvents } from '@/lib/tracking';

export function TrackingScripts() {
  useEffect(() => {
    // Capture UTM parameters on page load
    captureUTMParams();
    
    // Track page view
    trackingEvents.pageView(window.location.pathname);
  }, []);

  return (
    <>
      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PTFRDGS3');
        `}
      </Script>

      {/* Note: All tracking tags are now managed through Google Tag Manager */}
      {/* Individual tags have been removed to prevent conflicts */}
      {/* Configure your tags in GTM at: https://tagmanager.google.com */}
    </>
  );
}