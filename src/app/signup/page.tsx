"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trackingEvents } from "@/lib/tracking";
import { Logo } from "@/components/logo";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Track signup page view
    trackingEvents.pageView('/signup');
    trackingEvents.signupStarted();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Track signup attempt
    trackingEvents.signupStarted();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would normally make an API call to create the user account
    console.log("Form submitted:", formData);
    
    // Track successful signup
    trackingEvents.signupCompleted(10000);
    trackingEvents.creditsClaimedClaimed(10000);
    
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader className="space-y-1 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Logo 
                    variant="dark" 
                    type="icon" 
                    size="xl" 
                    href="/" 
                    animated={true}
                  />
                </div>
                <CardTitle className="text-2xl">Create your account</CardTitle>
                <CardDescription>
                  Start building perfect lists with AI-powered search
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* 10k Credits Banner */}
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Gift className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold text-primary">Get 10,000 Free Credits</div>
                      <div className="text-sm text-muted-foreground">$100 value • No credit card required</div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Work email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="company"
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password (8+ characters)"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                      <label className="text-sm text-muted-foreground">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        name="agreeToMarketing"
                        checked={formData.agreeToMarketing}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                      <label className="text-sm text-muted-foreground">
                        Send me GTM insights, product updates, and special offers
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading || !formData.agreeToTerms}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <Logo 
                          variant="light" 
                          type="icon" 
                          size="sm" 
                          isLoading={true} 
                          href="" 
                          animated={false}
                        />
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      "Create Account & Get 10,000 Credits"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="text-center text-sm text-muted-foreground mb-4">
              What you get with your free account:
            </div>
            <div className="space-y-3">
              {[
                "10,000 free credits ($100 value)",
                "Natural language job searches",
                "Active job verification",
                "Contact enrichment",
                "CSV export capabilities",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}