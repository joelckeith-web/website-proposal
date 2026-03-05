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
      {/* Dynamic Island (smaller, doesn't obscure content) */}
      <div
        className="absolute top-[14px] left-1/2 -translate-x-1/2 z-10 w-[40px] h-[12px] rounded-full"
        style={{ background: "#000000" }}
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

/* ── MacBook Pro frame using Apple product photo ── */

interface MacBookProFrameProps {
  children: ReactNode;
  className?: string;
}

export function MacBookProFrame({ children, className = "" }: MacBookProFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* MacBook Pro product photo as frame */}
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src="/images/macbook-pro-frame.png"
        alt=""
        aria-hidden="true"
        className="w-full h-auto block relative z-0 pointer-events-none"
        loading="eager"
      />
      {/* Screenshot overlaid on the screen area */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{
          top: "3.5%",
          left: "12.4%",
          width: "75.4%",
          height: "76%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
