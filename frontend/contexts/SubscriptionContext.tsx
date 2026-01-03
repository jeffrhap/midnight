"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SubscriptionContextType {
  isSubscribed: boolean;
  setSubscribed: () => void;
  clearSubscription: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const SUBSCRIPTION_KEY = 'midnight_subscribed';

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSubscribed(localStorage.getItem(SUBSCRIPTION_KEY) === 'true');
    }
  }, []);

  const setSubscribed = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SUBSCRIPTION_KEY, 'true');
      setIsSubscribed(true);
    }
  };

  const clearSubscription = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SUBSCRIPTION_KEY);
      setIsSubscribed(false);
    }
  };

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, setSubscribed, clearSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

