"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

const roadmapData = [
  {
    id: "jobs",
    title: "Jobs Data",
    status: "live",
    icon: "💼",
    launchDate: "Live Now",
    description: "The world's most comprehensive jobs database with real-time verification",
    features: [
      { name: "25M+ Active Jobs", status: "completed" },
      { name: "1.5M+ Monthly New Jobs", status: "completed" },
      { name: "95% Accuracy Rate", status: "completed" },
      { name: "Real-time Verification", status: "completed" },
      { name: "Natural Language Search", status: "completed" },
      { name: "Advanced Filters & Boolean", status: "completed" },
    ],
    metrics: {
      coverage: "98%",
      accuracy: "95%",
      sources: "15+",
      updates: "Real-time"
    },
    benefits: [
      "Find companies actively hiring for roles you serve",
      "Target prospects during peak buying moments",
      "Get alerts for new relevant job postings",
      "Build perfect prospect lists in seconds"
    ]
  },
  {
    id: "companies",
    title: "Companies Data",
    status: "upcoming",
    icon: "🏢",
    launchDate: "Aug 17, 2024",
    description: "Complete company intelligence with technographics, funding & growth signals",
    features: [
      { name: "2M+ Company Profiles", status: "inProgress" },
      { name: "Tech Stack Detection", status: "inProgress" },
      { name: "Funding Data Integration", status: "pending" },
      { name: "Growth Signals Analysis", status: "pending" },
      { name: "Industry Classification", status: "completed" },
      { name: "Company Size Tracking", status: "completed" }
    ],
    metrics: {
      coverage: "2M+",
      accuracy: "92%",
      sources: "10+",
      updates: "Daily"
    },
    benefits: [
      "Identify high-growth companies early",
      "Filter by tech stack & tools used",
      "Track funding rounds & acquisitions",
      "Monitor company growth signals"
    ]
  },
  {
    id: "people",
    title: "People Data",
    status: "upcoming",
    icon: "👥",
    launchDate: "Aug 24, 2024",
    description: "Decision maker profiles with verified contact data & enrichment",
    features: [
      { name: "50M+ Decision Makers", status: "pending" },
      { name: "Email Verification", status: "pending" },
      { name: "Phone Number Enrichment", status: "pending" },
      { name: "Role Classification", status: "inProgress" },
      { name: "Seniority Detection", status: "inProgress" },
      { name: "Department Mapping", status: "completed" }
    ],
    metrics: {
      coverage: "50M+",
      accuracy: "98%",
      sources: "8+",
      updates: "Weekly"
    },
    benefits: [
      "Find & verify decision maker contacts",
      "Get direct phone & email access",
      "Map company org structures",
      "Track role changes & promotions"
    ]
  },
  {
    id: "signals",
    title: "Signals Data",
    status: "upcoming",
    icon: "📡",
    launchDate: "Sep 1, 2024",
    description: "Real-time monitoring of social posts, job changes & market signals",
    features: [
      { name: "50K+ Daily Job Changes", status: "pending" },
      { name: "Social Media Monitoring", status: "pending" },
      { name: "Market Signal Analysis", status: "pending" },
      { name: "Custom Alert Rules", status: "pending" },
      { name: "Webhook Integrations", status: "pending" },
      { name: "API Access", status: "pending" }
    ],
    metrics: {
      coverage: "1M+/day",
      accuracy: "90%",
      sources: "12+",
      updates: "Real-time"
    },
    benefits: [
      "Track job changes in real-time",
      "Monitor social buying signals",
      "Get instant market intelligence",
      "Automate prospect monitoring"
    ]
  }
];

export default function RoadmapPage() {
  const [selectedProduct, setSelectedProduct] = useState(roadmapData[0].id);
  const selectedData = roadmapData.find(p => p.id === selectedProduct) || roadmapData[0];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/0" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                <Star className="w-4 h-4 mr-2" />
                The Future of GTM Data
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-8">
                Building the Ultimate{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  GTM Intelligence
                </span>{" "}
                Platform
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                From jobs to companies, people to real-time signals - we're creating the most comprehensive data platform for GTM teams.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <div className="flex items-center text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>No credit card required</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Navigation */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between space-x-4 overflow-x-auto pb-4">
              {roadmapData.map((product, index) => (
                <motion.button
                  key={product.id}
                  onClick={() => setSelectedProduct(product.id)}
                  className={`relative flex-1 min-w-[200px] group ${
                    selectedProduct === product.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`
                    p-6 rounded-xl border transition-all duration-300
                    ${selectedProduct === product.id 
                      ? 'bg-primary border-primary shadow-lg shadow-primary/20' 
                      : 'bg-card border-border hover:border-primary/50'}
                  `}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl">{product.icon}</span>
                      <div className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${product.status === 'live' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-yellow-500/10 text-yellow-500'}
                      `}>
                        {product.status === 'live' ? 'Live Now' : product.launchDate}
                      </div>
                    </div>
                    
                    <h3 className={`text-lg font-bold mb-2 ${
                      selectedProduct === product.id ? 'text-primary-foreground' : 'text-foreground'
                    }`}>
                      {product.title}
                    </h3>
                    
                    <p className={`text-sm ${
                      selectedProduct === product.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {product.description}
                    </p>

                    {index < roadmapData.length - 1 && (
                      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                        <div className="w-8 h-[2px] bg-border"></div>
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed View */}
      <section className="py-20 sm:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              key={selectedProduct}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Features Column */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-xl p-8 border border-border h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{selectedData.icon}</div>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedData.title}</h2>
                        <p className="text-muted-foreground">{selectedData.description}</p>
                      </div>
                    </div>
                    <div className={`
                      px-4 py-2 rounded-full text-sm font-medium
                      ${selectedData.status === 'live' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-yellow-500/10 text-yellow-500'}
                    `}>
                      {selectedData.status === 'live' ? 'Live Now' : selectedData.launchDate}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedData.features.map((feature, index) => (
                      <motion.div
                        key={feature.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`
                          p-4 rounded-lg border
                          ${feature.status === 'completed'
                            ? 'bg-green-500/5 border-green-500/20'
                            : feature.status === 'inProgress'
                            ? 'bg-yellow-500/5 border-yellow-500/20'
                            : 'bg-muted/30 border-border'}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{feature.name}</span>
                          <div className={`
                            text-xs px-2 py-1 rounded-full
                            ${feature.status === 'completed'
                              ? 'bg-green-500/10 text-green-500'
                              : feature.status === 'inProgress'
                              ? 'bg-yellow-500/10 text-yellow-500'
                              : 'bg-muted text-muted-foreground'}
                          `}>
                            {feature.status === 'completed' 
                              ? 'Live' 
                              : feature.status === 'inProgress'
                              ? 'In Progress'
                              : 'Coming Soon'}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics & Benefits Column */}
              <div className="space-y-8">
                {/* Metrics Card */}
                <div className="bg-card rounded-xl p-8 border border-border">
                  <h3 className="text-lg font-bold mb-6">Key Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground">Coverage</div>
                      <div className="text-xl font-bold text-primary">{selectedData.metrics.coverage}</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                      <div className="text-xl font-bold text-primary">{selectedData.metrics.accuracy}</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground">Sources</div>
                      <div className="text-xl font-bold text-primary">{selectedData.metrics.sources}</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground">Updates</div>
                      <div className="text-xl font-bold text-primary">{selectedData.metrics.updates}</div>
                    </div>
                  </div>
                </div>

                {/* Benefits Card */}
                <div className="bg-card rounded-xl p-8 border border-border">
                  <h3 className="text-lg font-bold mb-6">Key Benefits</h3>
                  <div className="space-y-4">
                    {selectedData.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-primary rounded-xl p-8 text-primary-foreground">
                  <h3 className="text-lg font-bold mb-4">Ready to get started?</h3>
                  <p className="text-primary-foreground/80 mb-6">
                    Join the waitlist and be first to access new data types as they launch.
                  </p>
                  <Link href="/signup">
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="w-full text-lg"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}