"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Zap, 
  Shield, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  Search, 
  Users, 
  Download,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/feature-card";
import { ChatMockup } from "@/components/chat-mockup";
import { IntegrationsFlowAnimation } from "@/components/integrations-flow-animation";
import { trackingEvents } from "@/lib/tracking";

const valuePropositions = [
  {
    icon: Zap,
    title: "Lightning-Fast List Building",
    description: "Build targeted lists in minutes, not hours. Natural language queries get exact matches every time.",
  },
  {
    icon: Shield,
    title: "Real-Time Intelligence", 
    description: "Know if jobs are still active with our verification agent. Set up continuous feeds for new matches.",
  },
  {
    icon: Globe,
    title: "Seamless Integrations",
    description: "Export to Clay, webhooks, or download CSV. Enrich with contacts, emails, and decision makers.",
  },
];

const features = [
  "Natural language job searches",
  "Active job verification with AI agent", 
  "Contact finding (hiring managers, HR leaders)",
  "Email & phone enrichment",
  "Clay integration & CSV export",
  "Continuous feed setup",
];

const steps = [
  {
    step: "01",
    title: "Ask in Plain English",
    description: "\"Find all remote React developer jobs posted this week\"",
    icon: Search,
  },
  {
    step: "02", 
    title: "Get Perfect Matches",
    description: "AI searches and verifies active postings across all job boards",
    icon: CheckCircle,
  },
  {
    step: "03",
    title: "Enrich & Export", 
    description: "Add hiring managers, emails, send to your tools",
    icon: Download,
  },
];

const rotatingPrompts = [
  {
    company: "🤖 AI Agent Company",
    scenario: "Targeting companies hiring customer service reps",
    prompt: "Find companies hiring 10+ customer service reps in the last 30 days",
    result: "1,247 companies actively hiring CS reps",
    useCase: "Perfect for chatbot replacement pitches"
  },
  {
    company: "💻 Developer Tools Startup", 
    scenario: "Finding companies scaling engineering teams",
    prompt: "Find companies hiring 5+ DevOps engineers with Kubernetes experience",
    result: "892 companies building cloud infrastructure",
    useCase: "Ideal for CI/CD platform sales"
  },
  {
    company: "💰 Lead Generation Agency",
    scenario: "Building prospect lists for HR tech clients",
    prompt: "Find companies hiring 3+ recruiters with 100+ employees",
    result: "2,156 companies expanding HR teams",
    useCase: "Perfect for ATS and recruitment tool sales"
  },
  {
    company: "🏢 Executive Search Firm",
    scenario: "Finding companies with leadership gaps",
    prompt: "Find companies hiring multiple C-level roles in the last 60 days",
    result: "156 companies with leadership transitions",
    useCase: "Ideal for executive placement opportunities"
  },
  {
    company: "📊 Investment Research Firm",
    scenario: "Tracking portfolio company growth",
    prompt: "Find companies in Series B+ stage hiring 20+ engineers",
    result: "89 high-growth startups scaling engineering",
    useCase: "Perfect for growth indicator analysis"
  },
  {
    company: "🎯 System Integrator",
    scenario: "Finding Salesforce implementation opportunities",
    prompt: "Find companies hiring Salesforce admins and developers",
    result: "1,034 companies building Salesforce teams",
    useCase: "Ideal for implementation service sales"
  },
  {
    company: "🔒 Cybersecurity Company",
    scenario: "Targeting companies with security hiring needs",
    prompt: "Find companies hiring security engineers in regulated industries",
    result: "567 companies strengthening security posture",
    useCase: "Perfect for compliance and security tool sales"
  },
  {
    company: "📈 Marketing Agency",
    scenario: "Finding companies with growth marketing needs",
    prompt: "Find companies hiring growth marketers and data analysts",
    result: "1,892 companies investing in growth marketing",
    useCase: "Ideal for marketing service and tool sales"
  },
  {
    company: "🏥 Healthcare Tech Company",
    scenario: "Targeting healthcare organizations modernizing IT",
    prompt: "Find hospitals hiring IT professionals for EHR implementations",
    result: "234 healthcare organizations upgrading systems",
    useCase: "Perfect for health tech solution sales"
  },
  {
    company: "🎓 Corporate Training Provider",
    scenario: "Finding companies with upskilling needs",
    prompt: "Find companies hiring for AI/ML roles without existing data science teams",
    result: "445 companies building their first AI capabilities",
    useCase: "Ideal for AI training and upskilling services"
  }
];



export default function Home() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showResults, setShowResults] = useState(false);

  // Type out the current prompt
  useEffect(() => {
    const currentPrompt = rotatingPrompts[currentPromptIndex].prompt;
    setTypedText("");
    setIsTyping(true);
    setShowResults(false);
    
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < currentPrompt.length) {
        setTypedText(currentPrompt.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
        
        // Show results after typing is complete
        setTimeout(() => {
          setShowResults(true);
        }, 500);
      }
    }, 50); // Type speed

    return () => clearInterval(typeInterval);
  }, [currentPromptIndex]);

  // Move to next prompt after showing results
  useEffect(() => {
    if (showResults) {
      const timer = setTimeout(() => {
        setCurrentPromptIndex((prev) => (prev + 1) % rotatingPrompts.length);
      }, 3000); // Show results for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showResults]);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden bg-background py-12 sm:py-16 min-h-[calc(100vh-4rem)] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:pr-6"
              >
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Stop Building Lists.{" "}
                  <span className="text-primary">Start Building Pipeline.</span>
                </h1>
                <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg lg:text-xl">
                  Turn hiring signals into revenue opportunities with AI that finds prospects, enriches contacts, and feeds your tools automatically.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="text-base px-6 py-3">
                      Start Free - Get 10,000 Credits
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="text-base"
                    onClick={() => trackingEvents.demoRequested()}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </div>
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <CheckCircle className="mr-2 h-3 w-3 text-primary" />
                  No credit card required • 10,000 free credits • $100 value
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:pl-6"
              >
                <ChatMockup />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Data Launch Section */}
      <section className="py-20 sm:py-32 bg-foreground text-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-transparent to-foreground" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-bold mb-8 shadow-lg shadow-primary/25"
              >
                🚀 JUST LAUNCHED - WORLD'S BEST JOBS DATABASE
              </motion.div>
              
              <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-background via-background/90 to-background/80 bg-clip-text text-transparent">
                Jobs Search is{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Live</span>
              </h2>
              
              <p className="text-xl leading-8 text-background/80 sm:text-2xl max-w-4xl mx-auto mb-8">
                The most advanced jobs intelligence platform for GTM teams. Search <span className="font-bold text-primary">25M+ jobs</span> with natural language and discover <span className="font-bold text-primary">1.5M+ new opportunities</span> every month.
              </p>
              
              {/* Key Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-8 text-sm text-background/70"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span>25M+ Active Jobs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <span>1.5M+ Monthly Additions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{animationDelay: '1s'}}></div>
                  <span>95% Accuracy Rate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{animationDelay: '1.5s'}}></div>
                  <span>&lt;2s Response Time</span>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <h3 className="text-2xl font-bold mb-6">
                Ready to experience the future of job data?
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                    Start Free - Get 10,000 Credits
                  </Button>
                </Link>
                <div className="text-background/70 text-sm">
                  No credit card • Instant access • $100 value
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chat Interface Showcase */}
      <section className="py-20 sm:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
                Real <span className="text-primary">Use Cases</span> from Our Users
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how companies are using Endflow to find perfect prospects and drive revenue
              </p>
            </div>

            {/* Chat Interface */}
            <div className="bg-background rounded-2xl p-6 sm:p-8 border border-border shadow-lg">
              {/* Chat Input */}
              <div className="relative mb-6">
                <div className="flex items-center space-x-3 bg-muted/50 rounded-xl p-4 border border-border">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-sm">✨</span>
                  </div>
                  <div className="flex-1 min-h-[24px] flex items-center">
                    {isTyping ? (
                      <span className="text-foreground">
                        {typedText}
                        <span className="animate-pulse">|</span>
                      </span>
                    ) : (
                      <span className="text-foreground">{typedText}</span>
                    )}
                  </div>
                  <button className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Results Display */}
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">{rotatingPrompts[currentPromptIndex].company}</h4>
                      <p className="text-sm text-green-600">{rotatingPrompts[currentPromptIndex].scenario}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-700 mb-2">
                    {rotatingPrompts[currentPromptIndex].result}
                  </div>
                  <p className="text-sm text-green-600">
                    {rotatingPrompts[currentPromptIndex].useCase}
                  </p>
                </motion.div>
              )}

              {/* Progress */}
              <div className="flex justify-center mt-6">
                <div className="flex space-x-1">
                  {rotatingPrompts.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentPromptIndex ? 'bg-primary scale-125' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* Integrations Section */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">


                        {/* Integrations Flow Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8"
            >
              <IntegrationsFlowAnimation 
                autoPlay={true}
                onPulseComplete={() => {
                  // Optional: Add any callback logic here
                }}
              />
            </motion.div>




          </div>
        </div>
      </section>



      {/* Roadmap Teaser */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg text-muted-foreground">Coming Soon</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Build Any List in Seconds with{" "}
                <span className="text-primary">98% Accuracy</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                We're building the most comprehensive GTM data platform ever created. 
                <span className="text-primary font-semibold"> Jobs → Companies → People → Signals</span> - every signal you need to dominate your market.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Jobs Data - LIVE</span>
                </div>
                <div className="text-muted-foreground/50">→</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Companies - Aug 17</span>
                </div>
                <div className="text-muted-foreground/50">→</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>People - Aug 24</span>
                </div>
                <div className="text-muted-foreground/50">→</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span>Signals - Sep 1</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Jobs Data - Available Now */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full">
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium animate-pulse">
                      LIVE
                    </div>
                  </div>
                  <div className="text-center flex flex-col h-full">
                    <div className="text-4xl mb-4">💼</div>
                    <h3 className="text-xl font-bold mb-2">Jobs Data</h3>
                    <p className="text-muted-foreground mb-4">25M+ active job postings with real-time verification</p>
                    <div className="space-y-2 mb-4 text-xs">
                      <div className="flex justify-between">
                        <span>Active Jobs:</span>
                        <span className="font-bold text-primary">25M+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Growth:</span>
                        <span className="font-bold text-primary">1.5M+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span className="font-bold text-primary">95%</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="bg-background/50 rounded-lg p-3">
                        <div className="text-sm font-medium text-primary">Available Now</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Companies Data - Coming Soon */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full">
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      AUG 17
                    </div>
                  </div>
                  <div className="text-center flex flex-col h-full">
                    <div className="text-4xl mb-4">🏢</div>
                    <h3 className="text-xl font-bold mb-2">Companies Data</h3>
                    <p className="text-muted-foreground mb-4">Complete company profiles with technographics & funding</p>
                    <div className="space-y-2 mb-4 text-xs">
                      <div className="flex justify-between">
                        <span>Companies:</span>
                        <span className="font-bold text-primary">2M+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tech Stacks:</span>
                        <span className="font-bold text-primary">500+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Funding Data:</span>
                        <span className="font-bold text-primary">Real-time</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="bg-background/50 rounded-lg p-3">
                        <div className="text-sm font-medium text-primary">Coming Soon</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* People Data - Coming Soon */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full">
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      AUG 24
                    </div>
                  </div>
                  <div className="text-center flex flex-col h-full">
                    <div className="text-4xl mb-4">👥</div>
                    <h3 className="text-xl font-bold mb-2">People Data</h3>
                    <p className="text-muted-foreground mb-4">Decision maker profiles with contact enrichment</p>
                    <div className="space-y-2 mb-4 text-xs">
                      <div className="flex justify-between">
                        <span>Decision Makers:</span>
                        <span className="font-bold text-primary">50M+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email Accuracy:</span>
                        <span className="font-bold text-primary">98%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone Numbers:</span>
                        <span className="font-bold text-primary">85%</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="bg-background/50 rounded-lg p-3">
                        <div className="text-sm font-medium text-primary">Coming Soon</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Signals Data - Coming Soon */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full">
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-gray-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      SEP 1
                    </div>
                  </div>
                  <div className="text-center flex flex-col h-full">
                    <div className="text-4xl mb-4">📡</div>
                    <h3 className="text-xl font-bold mb-2">Signals Data</h3>
                    <p className="text-muted-foreground mb-4">Real-time monitoring of social posts, job changes & postings</p>
                    <div className="space-y-2 mb-4 text-xs">
                      <div className="flex justify-between">
                        <span>Job Changes:</span>
                        <span className="font-bold text-primary">50K/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Social Posts:</span>
                        <span className="font-bold text-primary">1M+/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Real-time Alerts:</span>
                        <span className="font-bold text-primary">Instant</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="bg-background/50 rounded-lg p-3">
                        <div className="text-sm font-medium text-primary">Coming Soon</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-primary/10 to-muted/20 rounded-2xl p-8 border border-primary/20 mb-8">
                <h3 className="text-2xl font-bold mb-4">🚀 The Ultimate GTM Data Platform</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  When complete, you'll have access to <span className="text-primary font-semibold">every signal</span> you need to dominate your market. 
                  Jobs tell you who's hiring, companies show you who's growing, and people give you direct access to decision makers.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Real-time job data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary/70 rounded-full"></div>
                    <span>Company technographics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
                    <span>Decision maker contacts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary/20 rounded-full"></div>
                    <span>Real-time signals monitoring</span>
                  </div>
                </div>
              </div>
              
              <Link href="/roadmap">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300">
                  Explore the Complete Roadmap
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                Join the waitlist and be first to access new data types
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-32 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to dominate your next GTM project?
            </h2>
            <p className="mt-6 text-lg leading-8 text-background/80">
              Join thousands of GTM professionals who trust Endflow to build perfect lists in minutes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  Start Free - Get 10,000 Credits
                </Button>
              </Link>
            </div>
            <div className="mt-6 text-sm text-background/70">
              No credit card required • 10,000 free credits • $100 value
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}