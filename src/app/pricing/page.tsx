"use client";

"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Star, Zap, Users, Crown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    credits: "500",
    description: "Perfect for trying Endflow",
    features: [
      "500 credits per month",
      "Basic job search",
      "CSV export",
      "Email support"
    ],
    limitations: [
      "No integrations",
      "No contact enrichment",
      "No team features"
    ],
    cta: "Start Free",
    ctaVariant: "outline" as const,
    popular: false,
    icon: Star,
    color: "text-gray-600",
    monthlyPrice: 0,
    annualPrice: 0
  },
  {
    name: "Essential",
    price: "$99.99",
    period: "per month",
    credits: "10,000",
    description: "Perfect for getting started",
    features: [
      "10,000 credits per month",
      "$0.0100 per credit",
      "Monthly rollover credits",
      "Team organization (up to 5 members)",
      "Basic integrations",
      "Email support"
    ],
    limitations: [],
    cta: "Start Essential Plan",
    ctaVariant: "outline" as const,
    popular: true,
    icon: Zap,
    color: "text-blue-600",
    monthlyPrice: 99.99,
    annualPrice: 959.90
  },
  {
    name: "Growth",
    price: "$179.99",
    period: "per month",
    credits: "20,000",
    description: "For growing teams",
    features: [
      "20,000 credits per month",
      "$0.0090 per credit",
      "Monthly rollover credits",
      "Team organization (up to 5 members)",
      "Advanced integrations",
      "Priority support"
    ],
    limitations: [],
    cta: "Start Growth Plan",
    ctaVariant: "default" as const,
    popular: false,
    icon: Users,
    color: "text-purple-600",
    monthlyPrice: 179.99,
    annualPrice: 1727.90
  }
];



export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState("exa");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const getPlanPrice = (plan: any) => {
    if (plan.name === "Free") return "$0";
    const price = isAnnual ? (plan.annualPrice / 12) : plan.monthlyPrice;
    return `$${price.toFixed(2)}`;
  };

  const getPlanPeriod = (plan: any) => {
    if (plan.name === "Free") return "forever";
    return "per month";
  };

  const competitors = [
    {
      id: "exa",
      name: "Exa.ai",
      logo: "/images/exa.jpeg",
      description: "General search platform",
      price: "$399/month",
      costPerCredit: "$0.061",
      dataQuality: "95% accuracy",
      dataSources: "2 sources",
      creditsRollOver: false,
      gtmFeatures: "Send to Clay",
      jobsData: "None",
      leadEnrichment: "Public emails only",
      weaknesses: ["4x more expensive", "6x higher cost per credit", "No jobs data", "Limited to public emails", "Only 2 data sources"]
    },
    {
      id: "clay",
      name: "Clay",
      logo: "/images/clay.jpeg",
      description: "Data enrichment platform",
      price: "$349/month",
      costPerCredit: "$0.03",
      dataQuality: "40% accuracy",
      dataSources: "Aggregated",
      creditsRollOver: true,
      gtmFeatures: "EXTENSIVE",
      jobsData: "LinkedIn only",
      leadEnrichment: "Full enrichment",
      weaknesses: ["3.5x more expensive", "3x higher cost per credit", "40% data accuracy", "LinkedIn jobs only"]
    },
    {
      id: "leadmagic",
      name: "LeadMagic",
      logo: "/images/leadmagic.jpeg",
      description: "Lead generation platform",
      price: "$149/month",
      costPerCredit: "$0.01",
      dataQuality: "80%",
      dataSources: "Careers pages only",
      creditsRollOver: true,
      gtmFeatures: "None",
      jobsData: "1 source",
      leadEnrichment: "Email, Phone",
      weaknesses: ["1.5x more expensive", "Same cost per credit", "Limited GTM features", "Single source data"]
    },
    {
      id: "apollo",
      name: "Apollo",
      logo: "/images/apollo.png",
      description: "Sales intelligence platform",
      price: "$99/month",
      costPerCredit: "$0.02",
      dataQuality: "70%",
      dataSources: "LinkedIn",
      creditsRollOver: false,
      gtmFeatures: "Sales only",
      jobsData: "Poor",
      leadEnrichment: "❌ No enrichment",
      weaknesses: ["2x higher cost per credit", "Poor jobs data", "No lead enrichment or routing", "Sales-focused only"]
    },
    {
      id: "zoominfo",
      name: "ZoomInfo",
      logo: "/images/zoominfo.jpeg",
      description: "Enterprise B2B data",
      price: "$14,995/year",
      costPerCredit: "$0.045",
      dataQuality: "85%",
      dataSources: "1",
      creditsRollOver: false,
      gtmFeatures: "Enterprise only",
      jobsData: "Limited",
      leadEnrichment: "❌ No enrichment",
      weaknesses: ["Enterprise pricing", "4.5x higher cost per credit", "No lead enrichment or routing", "Limited jobs data"]
    }
  ];

  const selectedComp = competitors.find(c => c.id === selectedCompetitor);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 to-muted/20 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Simple, Transparent{" "}
              <span className="text-primary">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start at $99.99/month with 10,000 credits. Scale up as you grow. 
              <span className="text-primary font-semibold"> 75% cheaper than Exa.ai</span> with better features.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Toggle */}
      <div className="py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center space-x-6"
          >
            <span className={`text-lg font-semibold ${!isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="flex items-center space-x-2">
              <span className={`text-lg font-semibold ${isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  Save 20%
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-background rounded-2xl border-2 p-8 ${
                  plan.popular 
                    ? 'border-primary shadow-lg scale-105' 
                    : 'border-border hover:border-primary/50 transition-colors'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4`}>
                    <plan.icon className={`w-6 h-6 ${plan.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-4xl font-bold">{getPlanPrice(plan)}</div>
                    <div className="text-muted-foreground">{getPlanPeriod(plan)}</div>
                    {isAnnual && plan.name !== "Free" && (
                      <div className="text-sm text-green-600 font-medium mt-1">
                        Save ${(plan.monthlyPrice - (plan.annualPrice / 12)).toFixed(2)}/month
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    <div className="text-2xl font-bold text-primary">{plan.credits}</div>
                    <div className="text-sm text-muted-foreground">credits per month</div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    What's included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <li key={limitationIndex} className="flex items-start space-x-3">
                        <div className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5">×</div>
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/signup" className="block">
                  <Button 
                    variant={plan.ctaVariant} 
                    size="lg" 
                    className="w-full"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Upgrade Options Slider */}


      {/* Interactive Provider Comparison Section */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Compare Endflow vs. the Competition
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                See how Endflow stacks up against your current tools
              </p>

              {/* Competitor Selection */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {competitors.map((competitor) => (
                  <button
                    key={competitor.id}
                    onClick={() => setSelectedCompetitor(competitor.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                      selectedCompetitor === competitor.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-background text-muted-foreground border border-border hover:border-primary/50'
                    }`}
                  >
                    <img 
                      src={competitor.logo} 
                      alt={competitor.name}
                      className="w-5 h-5 mr-2 rounded-sm object-contain"
                    />
                    {competitor.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Endflow Column */}
              <motion.div
                key="endflow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-background rounded-2xl p-8 border-2 border-primary shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                    <img 
                      src="/images/endflow_icon.svg" 
                      alt="Endflow"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Endflow</h3>
                    <p className="text-muted-foreground">GTM-focused data platform</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Starting Price:</span>
                    <span className="font-bold text-primary">$99.99/month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Cost per Credit:</span>
                    <span className="font-bold text-primary">$0.0100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Data Quality:</span>
                    <span className="font-bold text-green-600">✅ 95%+ accuracy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Data Sources:</span>
                    <span className="font-bold text-green-600">✅ 25+ sources</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Jobs Data:</span>
                    <span className="font-bold text-green-600">✅ 25M+ active jobs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Credits Roll Over:</span>
                    <span className="font-bold text-green-600">✅ Yes</span>
                  </div>

                </div>
              </motion.div>

              {/* Selected Competitor Column */}
              <motion.div
                key={selectedCompetitor}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-background rounded-2xl p-8 border border-border"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                    <img 
                      src={selectedComp?.logo} 
                      alt={selectedComp?.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedComp?.name}</h3>
                    <p className="text-muted-foreground">{selectedComp?.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Starting Price:</span>
                    <span className="font-bold text-muted-foreground">{selectedComp?.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Cost per Credit:</span>
                    <span className="font-bold text-muted-foreground">{selectedComp?.costPerCredit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Data Quality:</span>
                    <span className={`font-bold ${selectedComp?.dataQuality === "95% accuracy" ? "text-green-600" : selectedComp?.dataQuality === "80%" ? "text-yellow-600" : "text-red-600"}`}>
                      {selectedComp?.dataQuality === "95% accuracy" ? "✅" : selectedComp?.dataQuality === "80%" ? "⚠️" : "❌"} {selectedComp?.dataQuality}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Data Sources:</span>
                    <span className="font-bold text-red-600">❌ {selectedComp?.dataSources}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Jobs Data:</span>
                    <span className="font-bold text-red-600">❌ {selectedComp?.jobsData}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Credits Roll Over:</span>
                    <span className={`font-bold ${selectedComp?.creditsRollOver ? "text-green-600" : "text-red-600"}`}>
                      {selectedComp?.creditsRollOver ? "✅ Yes" : "❌ No"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>



            <div className="text-center">
              <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
                <h3 className="text-2xl font-bold mb-4">Endflow: The Clear Choice</h3>
                <p className="text-muted-foreground mb-6">
                  Better data quality, lower costs, and GTM-specific features that actually work. 
                  Stop paying premium prices for dirty data and limited functionality.
                </p>
                <Link href="/signup">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Start Free - 500 Credits
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>



      {/* FAQ Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  question: "What are credits used for?",
                  answer: "Credits are consumed when you search for jobs, companies, or people. Each result costs 1 credit. For example, a search returning 500 results uses 500 credits."
                },
                {
                  question: "Do credits roll over?",
                  answer: "Yes! All paid plans include monthly credit rollover. Unused credits from this month are available next month. Free trial credits do not roll over."
                },
                {
                  question: "Can I upgrade or downgrade anytime?",
                  answer: "Yes, you can change your plan at any time. When upgrading, you'll get prorated credits for the new plan. When downgrading, changes take effect at your next billing cycle."
                },
                {
                  question: "What's the difference between Free and Essential?",
                  answer: "Free is a one-time trial with 500 credits. Essential is a monthly subscription with 10,000 credits, integrations, team features, and credit rollover. Free credits don't roll over."
                },
                {
                  question: "Do you offer annual discounts?",
                  answer: "Yes! Pay annually and get 20% off monthly billing."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-border rounded-lg">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <div className={`transform transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-background/80 mb-8">
              Join thousands of GTM professionals who trust Endflow to build perfect lists in minutes.
            </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                    Start Free - 500 Credits
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                    Contact Sales
                  </Button>
                </Link>
              </div>
              <div className="mt-6 text-sm text-background/70">
                500 free credits • No credit card required • Upgrade anytime
              </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}