"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/logo";

export function CTABanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("cta-banner-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("cta-banner-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="relative bg-primary text-primary-foreground"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-3 relative">
              <div className="flex items-center space-x-3">
                <span className="text-lg">🎁</span>
                <p className="text-sm font-medium text-center">
                  <span className="hidden sm:inline">🎉 Launch Special: </span>
                  Get 10,000 free credits ($100 value) when you sign up today!
                </p>
                <Link href="/signup">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-primary hover:text-primary ml-4"
                  >
                    Claim Now
                  </Button>
                </Link>
              </div>
              <button
                onClick={handleDismiss}
                className="absolute right-0 p-1 hover:bg-primary-foreground/20 rounded"
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Dismiss</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}