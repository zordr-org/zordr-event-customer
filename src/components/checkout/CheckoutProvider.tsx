"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  getCheckout,
  getEvent,
  saveCheckout,
  type MockRegistration,
} from "@/lib/mock-api";
import type { EventDetail } from "@/types/event";

export type RegistrationForm = MockRegistration;

interface CheckoutContextValue {
  quantities: Record<string, number>;
  registration: RegistrationForm;
  paymentMethod: string;
  paid: boolean;
  setQuantity: (ticketId: string, quantity: number) => void;
  setRegistrationField: (field: keyof RegistrationForm, value: string) => void;
  setPaymentMethod: (method: string) => void;
  markPaid: () => void;
  resetCheckout: () => void;
  event: EventDetail;
  orderId: string;
}

interface CheckoutState {
  eventId: string;
  quantities: Record<string, number>;
  registration: RegistrationForm;
  paymentMethod: string;
  paid: boolean;
}

const initialRegistration: RegistrationForm = {
  name: "",
  email: "",
  phone: "",
  college: "",
  roll: "",
  branch: "",
  year: "",
  team: "",
  shirt: "",
};
const initialState: CheckoutState = {
  eventId: "event-1",
  quantities: {},
  registration: initialRegistration,
  paymentMethod: "upi",
  paid: false,
};
const CheckoutContext = createContext<CheckoutContextValue | null>(null);
const storageKey = "zordr-checkout-state";

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const { orderId } = useParams<{ orderId: string }>();
  const [state, setState] = useState<CheckoutState>(() => {
    if (typeof window === "undefined") return initialState;
    const checkout = getCheckout(orderId);
    if (checkout) return checkout;
    try {
      const saved = window.sessionStorage.getItem(storageKey);
      return saved
        ? ({ ...initialState, ...JSON.parse(saved) } as CheckoutState)
        : initialState;
    } catch {
      window.sessionStorage.removeItem(storageKey);
      return initialState;
    }
  });

  useEffect(() => {
    if (orderId)
      saveCheckout({ ...state, orderId, eventId: getEvent(state.eventId).id });
    window.sessionStorage.setItem(
      `${storageKey}-${orderId}`,
      JSON.stringify(state),
    );
  }, [orderId, state]);

  const value = useMemo<CheckoutContextValue>(
    () => ({
      ...state,
      setQuantity: (ticketId, quantity) =>
        setState((current) => ({
          ...current,
          quantities: {
            ...current.quantities,
            [ticketId]: Math.max(0, quantity),
          },
        })),
      setRegistrationField: (field, value) =>
        setState((current) => ({
          ...current,
          registration: { ...current.registration, [field]: value },
        })),
      setPaymentMethod: (paymentMethod) =>
        setState((current) => ({ ...current, paymentMethod })),
      markPaid: () => setState((current) => ({ ...current, paid: true })),
      resetCheckout: () => setState(initialState),
      event: getEvent(state.eventId),
      orderId,
    }),
    [orderId, state],
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context)
    throw new Error("useCheckout must be used inside CheckoutProvider");
  return context;
}
