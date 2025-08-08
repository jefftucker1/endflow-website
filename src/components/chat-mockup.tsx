"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Building2, MapPin, Calendar, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  isTyping?: boolean;
}

interface Job {
  id: number;
  company: string;
  logo?: string;
  title: string;
  location: string;
  posted: string;
  employees: string;
  salary?: string;
}

const demoMessages: Message[] = [
  {
    id: 1,
    type: "user",
    content: "Find React jobs in SF with 50-500 employees",
  },
  {
    id: 2,
    type: "bot",
    content: "Searching...",
  },
];

const demoJobs: Job[] = [
  { id: 1, company: "Stripe", logo: "/images/stripe.jpeg", title: "Senior React Developer", location: "San Francisco, CA", posted: "2 days ago", employees: "250-500", salary: "$150k-200k" },
  { id: 2, company: "Notion", logo: "/images/notion.jpeg", title: "Frontend Engineer", location: "San Francisco, CA", posted: "1 day ago", employees: "100-250", salary: "$140k-180k" },
  { id: 3, company: "Linear", logo: "/images/linear.jpeg", title: "React Developer", location: "San Francisco, CA", posted: "3 days ago", employees: "50-100", salary: "$130k-170k" },
  { id: 4, company: "Vercel", logo: "/images/vercel.jpeg", title: "Senior Frontend Engineer", location: "San Francisco, CA", posted: "5 days ago", employees: "100-250", salary: "$160k-210k" },
  { id: 5, company: "Figma", logo: "/images/figma.jpeg", title: "React Developer", location: "San Francisco, CA", posted: "1 week ago", employees: "250-500", salary: "$145k-185k" },
];

export function ChatMockup() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showSpreadsheet, setShowSpreadsheet] = useState(false);
  const [visibleJobs, setVisibleJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (currentMessageIndex < demoMessages.length) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setMessages(prev => [...prev, demoMessages[currentMessageIndex]]);
          setIsTyping(false);
          setCurrentMessageIndex(prev => prev + 1);
        }, 800);
      }, currentMessageIndex === 0 ? 300 : 1500);

      return () => clearTimeout(timer);
    } else if (currentMessageIndex === demoMessages.length) {
      // Show "Searching..." for 3 seconds, then switch to spreadsheet
      setTimeout(() => {
        setShowSpreadsheet(true);
        // Animate jobs appearing one by one with longer delays
        demoJobs.forEach((job, index) => {
          setTimeout(() => {
            setVisibleJobs(prev => [...prev, job]);
          }, index * 400); // Slower animation for more dramatic effect
        });
      }, 3000); // Show "Searching..." for 3 seconds
    }
  }, [currentMessageIndex]);

  if (showSpreadsheet) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-background border">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <Logo 
            variant="dark" 
            type="full" 
            size="sm" 
            href="" 
            animated={false}
          />
          <div className="w-16"></div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">React Jobs in San Francisco (47 results)</h3>
            <p className="text-sm text-muted-foreground">Live data from job boards • Updated 2 minutes ago</p>
          </div>

          {/* Spreadsheet Header */}
          <div className="grid grid-cols-6 gap-4 p-3 bg-muted/50 rounded-t-lg border-b font-medium text-sm">
            <div className="flex items-center space-x-1">
              <Building2 className="w-4 h-4" />
              <span>Company</span>
            </div>
            <div>Job Title</div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Posted</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Size</span>
            </div>
            <div>Salary</div>
          </div>

                    {/* Spreadsheet Rows */}
          <div className="max-h-64 overflow-y-auto">
            {visibleJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className="grid grid-cols-6 gap-4 p-3 border-b hover:bg-muted/30 transition-colors"
              >
                 <div className="flex items-center space-x-2">
                   {job.logo ? (
                     <img 
                       src={job.logo} 
                       alt={`${job.company} logo`} 
                       className="w-6 h-6 object-contain"
                     />
                   ) : null}
                   <span className="font-medium text-sm">{job.company}</span>
                 </div>
                 <div className="text-sm">{job.title}</div>
                 <div className="text-sm text-muted-foreground">{job.location}</div>
                 <div className="text-sm text-muted-foreground">{job.posted}</div>
                 <div className="text-sm text-muted-foreground">{job.employees}</div>
                 <div className="text-sm text-muted-foreground">{job.salary}</div>
               </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing 5 of 47 results
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Export to CSV
              </Button>
              <Button size="sm">
                Get Hiring Contacts
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-background border">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <Logo 
          variant="dark" 
          type="full" 
          size="sm" 
          href="" 
          animated={false}
        />
        <div className="w-16"></div>
      </div>

      <div className="h-64 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-[80%] ${
                  message.type === "user" ? "flex-row-reverse" : "flex-row"
                } items-start space-x-2 space-x-reverse`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Ask about jobs, companies, or people..."
            className="flex-1"
            disabled
          />
          <Button size="icon" disabled>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}