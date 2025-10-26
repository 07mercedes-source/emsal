"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function ThemeProvider({ children }) {
  return (
    <div className={cn("min-h-screen bg-gray-50 text-gray-800 font-sans")}>
      {children}
    </div>
  );
}
