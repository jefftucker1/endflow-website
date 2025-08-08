"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    personalization: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('endflow-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        const parsedConsent = JSON.parse(consent);
        setPreferences(parsedConsent);
        // Initialize tracking based on stored preferences
        initializeTracking(parsedConsent);
      } catch {
        setShowBanner(true);
      }
    }
  }, []);

  const initializeTracking = (prefs: ConsentPreferences) => {
    // Enable/disable tracking based on consent
    if (typeof window !== 'undefined') {
      // Analytics consent
      if (prefs.analytics && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
      
      // Marketing consent
      if (prefs.marketing) {
        if ((window as any).fbq) {
          (window as any).fbq('consent', 'grant');
        }
        if ((window as any).twq) {
          (window as any).twq('config', process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID);
        }
      }
    }
  };

  const saveConsent = (prefs: ConsentPreferences) => {
    localStorage.setItem('endflow-consent', JSON.stringify(prefs));
    localStorage.setItem('endflow-consent-date', new Date().toISOString());
    setPreferences(prefs);
    initializeTracking(prefs);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
    };
    saveConsent(allAccepted);
  };

  const acceptNecessaryOnly = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
    };
    saveConsent(necessaryOnly);
  };

  const handlePreferenceChange = (key: keyof ConsentPreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <Card className="mx-auto max-w-4xl border-2 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">We use cookies to enhance your experience</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We use cookies and similar technologies to analyze website traffic, 
                    personalize content, and provide social media features. This helps us 
                    improve our service and your experience.
                  </p>
                  
                  {showPreferences && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 space-y-3 border-t pt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Necessary</div>
                            <div className="text-xs text-muted-foreground">Required for basic functionality</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={preferences.necessary}
                            disabled
                            className="rounded"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Analytics</div>
                            <div className="text-xs text-muted-foreground">Help us improve our service</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={() => handlePreferenceChange('analytics')}
                            className="rounded"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Marketing</div>
                            <div className="text-xs text-muted-foreground">Personalized ads and content</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={preferences.marketing}
                            onChange={() => handlePreferenceChange('marketing')}
                            className="rounded"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Personalization</div>
                            <div className="text-xs text-muted-foreground">Customized experience</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={preferences.personalization}
                            onChange={() => handlePreferenceChange('personalization')}
                            className="rounded"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <Button onClick={acceptAll} size="sm">
                      Accept All
                    </Button>
                    
                    <Button onClick={acceptNecessaryOnly} variant="outline" size="sm">
                      Necessary Only
                    </Button>
                    
                    {!showPreferences ? (
                      <Button 
                        onClick={() => setShowPreferences(true)} 
                        variant="ghost" 
                        size="sm"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Preferences
                      </Button>
                    ) : (
                      <Button onClick={savePreferences} variant="ghost" size="sm">
                        Save Preferences
                      </Button>
                    )}
                    
                    <div className="text-xs text-muted-foreground">
                      Read our{' '}
                      <a href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a href="/cookies" className="text-primary hover:underline">
                        Cookie Policy
                      </a>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowBanner(false)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}