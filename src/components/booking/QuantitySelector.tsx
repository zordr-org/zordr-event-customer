import { Button } from "@/components/ui/Button";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({
  value,
  min = 0,
  max = 10,
  onChange,
}: QuantitySelectorProps) {
  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={decrease}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </Button>

      <span
        className="min-w-6 text-center text-sm font-medium"
        aria-live="polite"
      >
        {value}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={increase}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </Button>
    </div>
  );
}
