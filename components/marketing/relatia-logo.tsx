import React from "react";

/**
 * Relatia SVG Logo — Premium geometric mark + serif wordmark.
 *
 * Mark concept: Two embracing arcs with a center point,
 * symbolizing connection, relationship, and trust.
 */

export interface RelatiaLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "default" | "lg";
}

export function RelatiaLogo({
  className = "",
  showWordmark = true,
  size = "default",
}: RelatiaLogoProps) {
  const markSize = size === "sm" ? 24 : size === "lg" ? 40 : 32;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Geometric mark */}
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left embrace arc */}
        <path
          d="M10 5C5 5 2 10.5 2 16C2 21.5 5 27 10 27"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Right embrace arc */}
        <path
          d="M22 5C27 5 30 10.5 30 16C30 21.5 27 27 22 27"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Center point — the connection */}
        <circle cx="16" cy="16" r="3" fill="currentColor" />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className={`font-serif tracking-tight ${
            size === "sm"
              ? "text-lg"
              : size === "lg"
                ? "text-3xl"
                : "text-xl"
          }`}
          style={{ fontWeight: 600 }}
        >
          Relatia
        </span>
      )}
    </span>
  );
}

export interface RelatiaLogoMarkProps {
  className?: string;
  size?: number;
}

export function RelatiaLogoMark({
  className = "",
  size = 32,
}: RelatiaLogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Relatia"
    >
      <path
        d="M10 5C5 5 2 10.5 2 16C2 21.5 5 27 10 27"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 5C27 5 30 10.5 30 16C30 21.5 27 27 22 27"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
    </svg>
  );
}
