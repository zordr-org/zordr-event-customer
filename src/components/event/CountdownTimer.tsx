"use client";

import { useEffect, useState } from "react";
import { IconClock } from "@/components/ui/Icons";

interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getRemainingTime(targetDate: string) {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    expired: false,
  };
}

export function CountdownTimer({
  days,
  hours,
  minutes,
  seconds,
}: CountdownTimerProps) {
  return (
    <div className="mt-2 flex h-[56px] items-center rounded-[9px] bg-[#ecfbf5] px-3">
      <IconClock size={22} className="mr-2 text-[#17203b]" />
      <p className="mr-auto text-[11px] font-bold text-[#17203b]">
        Registrations close in
      </p>
      {[
        [days, "Days"],
        [hours, "Hours"],
        [minutes, "Minutes"],
        [seconds, "Seconds"],
      ].map(([value, label]) => (
        <div
          key={label}
          className="w-[43px] border-l border-[#cfe9dc] text-center"
        >
          <p className="text-[15px] font-bold leading-4 text-[#17203b]">
            {String(value).padStart(2, "0")}
          </p>
          <p className="text-[8px] text-[#526070]">{label}</p>
        </div>
      ))}
    </div>
  );
}
