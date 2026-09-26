import * as React from "react";
import { IconCheck } from "@/components/ui/Icons";

interface CheckoutStep {
  id: string;
  label: string;
}

interface CheckoutStepperProps {
  currentStep: string;
}

const steps: CheckoutStep[] = [
  { id: "tickets", label: "Select Tickets" },
  { id: "registration", label: "Registration" },
  { id: "payment", label: "Payment" },
  { id: "confirmation", label: "Confirmation" },
];

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="w-full">
      <div className="relative flex justify-between">
        {/* Connecting Lines Behind */}
        <div className="absolute top-4 left-0 flex w-full -translate-y-1/2 justify-between px-8 sm:px-12 z-0">
          {steps.map((_, index) => {
            if (index === steps.length - 1) return null;
            const isCompletedLine = index < currentIndex;
            return (
              <div 
                key={`line-${index}`} 
                className={`h-0.5 flex-1 mx-2 transition-colors ${
                  isCompletedLine ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]"
                }`} 
              />
            );
          })}
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const isCurrent = step.id === currentStep;
          const isCompleted = index < currentIndex;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-[var(--color-background)] px-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  isCurrent
                    ? "bg-[var(--color-primary)] text-white"
                    : isCompleted
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[#F1F5F9] text-[var(--color-muted)]"
                }`}
              >
                {isCompleted ? <IconCheck size={18} /> : index + 1}
              </div>
              <span
                className={`text-[10px] font-medium sm:text-xs ${
                  isCurrent || isCompleted
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-muted)]"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
