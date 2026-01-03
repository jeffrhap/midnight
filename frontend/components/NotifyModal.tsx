"use client";

import { useState } from "react";

interface NotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotifyModal({ isOpen, onClose }: NotifyModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Improved email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    // Simulate API call - replace with actual service integration
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Store in localStorage for now (replace with actual API)
    // TODO: Replace with API route for production
    const emails = JSON.parse(localStorage.getItem("midnight_waitlist") || "[]");
    emails.push({ email: email.trim(), timestamp: new Date().toISOString() });
    localStorage.setItem("midnight_waitlist", JSON.stringify(emails));

    // Remove console.log in production (use environment-based logging)
    if (process.env.NODE_ENV === "development") {
      console.log("Email submitted:", email);
    }
    setStatus("success");
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4" onClick={handleBackdropClick}>
      <div className="relative w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg p-8 md:p-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--accent-warm)]/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--accent-warm)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-sans text-2xl font-light text-[var(--text-primary)] mb-3">You're on the list</h3>
            <p className="font-sans text-base text-[var(--text-muted)] mb-6">We'll notify you when MODEL 00:00 launches.</p>
            <button
              onClick={onClose}
              className="font-mono text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] tracking-[2px] transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <span className="font-mono text-xs text-[var(--text-muted)] tracking-[3px]">MODEL 00:00</span>
              <h3 className="font-sans text-2xl md:text-3xl font-light text-[var(--text-primary)] mt-3 mb-2">Get Notified</h3>
              <p className="font-sans text-base text-[var(--text-muted)]">Be the first to know when we launch.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-4 bg-[var(--bg-deep)] border rounded-sm font-mono text-base text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--accent-warm)] transition-colors ${
                    status === "error" ? "border-red-500" : "border-[var(--border-subtle)]"
                  }`}
                  disabled={status === "loading"}
                />
                {status === "error" && <p className="mt-2 font-mono text-xs text-red-500">Please enter a valid email address</p>}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-8 py-4 bg-[var(--accent-warm)] rounded-sm hover:bg-[var(--accent-warm-hover)] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-mono text-sm font-medium text-white tracking-[2px]">
                  {status === "loading" ? "SUBMITTING..." : "NOTIFY ME"}
                </span>
              </button>
            </form>

            <p className="mt-6 text-center font-sans text-xs text-[var(--text-subtle)]">No spam. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  );
}
