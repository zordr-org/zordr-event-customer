export function formatEventDateTime(iso: string): string {
  const date = new Date(iso);

  return date
    .toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/\b(am|pm)\b/i, (match) => match.toUpperCase());
}

export function formatPrice(paise: number): string {
  if (paise === 0) {
    return "Free";
  }

  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}
