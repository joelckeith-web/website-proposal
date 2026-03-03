"use client";

import { type ReactNode } from "react";

interface BrowserFrameProps {
  children: ReactNode;
  url?: string;
  className?: string;
}

export function BrowserFrame({
  children,
  url = "outdoor-renovations.vercel.app",
  className = "",
}: BrowserFrameProps) {
  return (
    <div className={`browser-chrome ${className}`}>
      <div className="browser-bar">
        <div className="browser-dots">
          <span className="browser-dot" style={{ background: "#ff5f57" }} />
          <span className="browser-dot" style={{ background: "#febc2e" }} />
          <span className="browser-dot" style={{ background: "#28c840" }} />
        </div>
        <div className="browser-url">
          <span style={{ color: "rgba(255,255,255,0.25)" }}>https://</span>
          {url}
        </div>
      </div>
      <div className="browser-content overflow-hidden">{children}</div>
    </div>
  );
}

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className = "" }: PhoneFrameProps) {
  return (
    <div className={`device-phone ${className}`}>
      {/* Notch */}
      <div
        className="absolute top-[10px] left-1/2 -translate-x-1/2 z-10 w-[80px] h-[24px] rounded-b-xl"
        style={{ background: "#1a1a1a" }}
      />
      <div className="screen">{children}</div>
    </div>
  );
}

interface LaptopFrameProps {
  children: ReactNode;
  className?: string;
}

export function LaptopFrame({ children, className = "" }: LaptopFrameProps) {
  return (
    <div className={`device-laptop ${className}`}>
      {/* Camera dot */}
      <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-[#333]" />
      <div className="screen">{children}</div>
    </div>
  );
}
