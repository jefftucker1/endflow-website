"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface IntegrationsFlowAnimationProps {
  className?: string;
}

const integrations = [
  { name: 'Clay', logo: '/images/clay.jpeg', description: 'CRM & Lead Management' },
  { name: 'n8n', logo: '/images/n8n.jpeg', description: 'Workflow Automation' },
  { name: 'Make', logo: '/images/make.jpeg', description: 'Integration Platform' },
  { name: 'Zapier', logo: '/images/zapier.jpeg', description: 'App Connections' }
];

export function IntegrationsFlowAnimation({ className = "" }: IntegrationsFlowAnimationProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>


      {/* Webhook Info */}
      <div className="mb-8 text-center">
        <div className="bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
          <h4 className="font-semibold mb-2 text-sm">Live Data Fed to Webhooks</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Send live job matches, company updates, and lead data directly to your webhook endpoint
          </p>
          <code className="bg-background px-2 py-1 rounded text-xs font-mono">
            POST https://your-webhook.com/endflow-data
          </code>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Connection Line */}
              <div className="absolute top-1/2 left-1/2 w-px h-8 bg-gradient-to-b from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Integration Card */}
              <motion.div
                className="bg-white rounded-lg px-4 py-2 shadow-sm border border-border hover:shadow-lg transition-all duration-300 text-center group-hover:scale-105"
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="mb-2 flex justify-center">
                  <motion.img
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    className="w-16 h-16 object-contain"
                    animate={isLoading ? { 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={isLoading ? {
                      rotate: { duration: 1, repeat: 2, ease: "easeInOut" },
                      scale: { duration: 0.5, repeat: 4, ease: "easeInOut" }
                    } : {}}
                  />
                </div>
                <motion.h4 
                  className="font-semibold text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isLoading ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  {integration.name}
                </motion.h4>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 