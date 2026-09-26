import { IconInfo } from "@/components/ui/Icons";

interface EntryInstructionsProps {
  instructions?: string[];
  checkout?: boolean;
}

const defaultInstructions = [
  "Carry a valid photo ID for verification at the venue.",
  "Show the QR code on your ticket when requested at the entrance.",
  "Screenshots of the ticket may be used if permitted by the event.",
  "Contact support if you face any issue with your ticket or entry.",
];

export function EntryInstructions({
  instructions = defaultInstructions,
  checkout = false,
}: EntryInstructionsProps) {
  if (checkout) {
    return (
      <section className="mx-4 mt-3 rounded-lg bg-[#eef5ff] px-3 py-3 text-[10px] text-[#536481] sm:mx-6">
        <h2 className="text-[13px] font-bold text-[#17203b]">
          <IconInfo size={16} className="mr-1 inline text-[#1e66ce]" />{" "}
          Important Instructions
        </h2>
        <ol className="mt-1 space-y-1 pl-5">
          <li>Carry a valid college ID for entry.</li>
          <li>Show this QR code at the venue entrance.</li>
          <li>Screenshots are valid for entry.</li>
          <li>For any issues, please contact support.</li>
        </ol>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Important Instructions</h2>

      <ol className="space-y-3">
        {instructions.map((instruction, index) => (
          <li
            key={`${index}-${instruction}`}
            className="flex gap-3 rounded-lg border border-[var(--color-border)] p-4"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-muted)]/10 text-xs font-semibold">
              {index + 1}
            </span>

            <p className="text-sm leading-6 text-[var(--color-muted)]">
              {instruction}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
