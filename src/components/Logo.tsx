'use client';

import { useEffect, useState } from "react";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const SIZES = {
  default: {
    width: 180,
    height: 40,
  },
  small: {
    width: 140,
    height: 32,
  },
} as const;

export function Logo({ className, ...props }: LogoProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill={theme === "dark" ? "#fff" : "#003139"} fillOpacity="0.2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 5a3 3 0 013-3h16a3 3 0 013 3v16a3 3 0 01-3 3H8a3 3 0 01-3-3V5zm3-1h16a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V5a1 1 0 011-1z"
        fill={theme === "dark" ? "#fff" : "#003139"}
      />
    </svg>
  );
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 24"
      fill="none"
      className={className}
    >
      <text
        x="0"
        y="20"
        fontFamily="Arial"
        fontSize="24"
        fontWeight="bold"
        fill="currentColor"
      >
        AutoQuote24
      </text>
    </svg>
  )
}
