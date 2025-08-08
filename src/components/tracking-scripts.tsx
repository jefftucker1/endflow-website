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
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>

      {/* Facebook/Meta Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* LinkedIn Insight Tag */}
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "${process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
        `}
      </Script>

      {/* X (Twitter) Pixel */}
      <Script id="twitter-pixel" strategy="afterInteractive">
        {`
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
          },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          twq('config','${process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID}');
        `}
      </Script>

      {/* Reddit Pixel */}
      <Script id="reddit-pixel" strategy="afterInteractive">
        {`
          !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
          rdt('init','${process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID}');
          rdt('track', 'PageVisit');
        `}
      </Script>

      {/* Product Hunt Pixel */}
      <Script id="producthunt-pixel" strategy="afterInteractive">
        {`
          window.ph = window.ph || [];
          window.ph.push = function() {
            var args = Array.prototype.slice.call(arguments);
            window.ph.queue = window.ph.queue || [];
            window.ph.queue.push(args);
          };
          window.ph('init', '${process.env.NEXT_PUBLIC_PRODUCTHUNT_PIXEL_ID}');
          window.ph('track', 'PageView');
        `}
      </Script>

      {/* RB2B Pixel */}
      <Script id="rb2b-pixel" strategy="afterInteractive">
        {`
          window.rb2b = window.rb2b || [];
          window.rb2b.push = function() {
            var args = Array.prototype.slice.call(arguments);
            window.rb2b.queue = window.rb2b.queue || [];
            window.rb2b.queue.push(args);
          };
          (function() {
            var script = document.createElement('script');
            script.src = 'https://api.rb2b.com/pixel.js';
            script.async = true;
            document.head.appendChild(script);
          })();
          window.rb2b('init', '${process.env.NEXT_PUBLIC_RB2B_PIXEL_ID}');
          window.rb2b('track', 'PageView');
        `}
      </Script>

      {/* HubSpot Tracking Code */}
      <Script id="hubspot-tracking" strategy="afterInteractive">
        {`
          var _hsq = _hsq || [];
          _hsq.push(['setContentType', 'standard-page']);
          (function(d,s,i,r) {
            if (d.getElementById(i)){return;}
            var n = d.createElement(s),e = d.getElementsByTagName(s)[0];
            n.id=i;n.src='//js.hs-analytics.net/analytics/'+(Math.ceil(new Date()/r)*r)+'/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}.js';
            e.parentNode.insertBefore(n, e);
          })(document, "script", "hs-analytics", 300000);
        `}
      </Script>

      {/* Noscript fallbacks */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}