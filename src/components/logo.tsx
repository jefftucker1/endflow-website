"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  type?: "full" | "icon";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  isLoading?: boolean;
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  icon: {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-10 w-10",
    xl: "h-12 w-12",
  },
  full: {
    sm: "h-6 w-auto",
    md: "h-8 w-auto",
    lg: "h-10 w-auto", 
    xl: "h-12 w-auto",
  },
};

export function Logo({
  variant = "dark",
  type = "full",
  size = "md",
  href = "/",
  isLoading = false,
  animated = true,
  className = "",
}: LogoProps) {
  
  // Determine which logo to use based on variant and type
  const getLogoSrc = () => {
    if (type === "icon") {
      return variant === "dark" 
        ? "/images/endflow_icon.svg" 
        : "/images/endflow_icon_white.svg";
    } else {
      return variant === "dark"
        ? "/images/endflow_logo.svg"
        : "/images/ednflow_logo_white.svg";
    }
  };

  const logoSrc = getLogoSrc();
  const sizeClass = sizeClasses[type][size];

  const logoElement = (
    <motion.div
      className={`inline-flex items-center ${className}`}
      initial={animated ? { opacity: 0, scale: 0.8 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={animated ? { scale: 1.05 } : {}}
    >
      <motion.div
        animate={isLoading ? { rotate: 360 } : {}}
        transition={
          isLoading
            ? {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }
            : {}
        }
        className="relative"
      >
        <Image
          src={logoSrc}
          alt="Endflow Logo"
          width={type === "icon" ? 40 : 120}
          height={40}
          className={`${sizeClass} object-contain`}
          priority
        />
        
        {/* Loading ring around logo when spinning */}
        {isLoading && (
          <motion.div
            className="absolute inset-0 border-2 border-transparent border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </motion.div>
      
      {/* Optional loading text */}
      {isLoading && type === "full" && (
        <motion.span
          className="ml-2 text-sm text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.span>
      )}
    </motion.div>
  );

  // Wrap with Link if href is provided
  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}

// Convenience components for common use cases
export function LogoLight(props: Omit<LogoProps, "variant">) {
  return <Logo {...props} variant="light" />;
}

export function LogoDark(props: Omit<LogoProps, "variant">) {
  return <Logo {...props} variant="dark" />;
}

export function LogoIcon(props: Omit<LogoProps, "type">) {
  return <Logo {...props} type="icon" />;
}

export function LoadingLogo(props: Omit<LogoProps, "isLoading">) {
  return <Logo {...props} isLoading={true} />;
}