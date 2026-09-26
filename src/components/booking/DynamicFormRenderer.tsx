import { Input } from "@/components/ui/Input";
import type { RegistrationField } from "@/types/registrationField";

interface DynamicFormRendererProps {
  fields: RegistrationField[];
  values: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
}

export function DynamicFormRenderer({
  fields,
  values,
  onChange,
}: DynamicFormRendererProps) {
  const sortedFields = [...fields].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-5">
      {sortedFields.map((field) => {
        const value = values[field.id] ?? "";

        return (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="text-sm font-medium">
              {field.label}

              {field.required && (
                <span className="ml-1 text-[var(--color-destructive)]">*</span>
              )}
            </label>

            {field.fieldType === "dropdown" ? (
              <select
                id={field.id}
                value={value}
                required={field.required}
                onChange={(event) => onChange(field.id, event.target.value)}
                className="h-10 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 text-sm text-[var(--color-foreground)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
              >
                <option value="">Select an option</option>

                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id={field.id}
                type={
                  field.fieldType === "email"
                    ? "email"
                    : field.fieldType === "phone"
                      ? "tel"
                      : "text"
                }
                value={value}
                required={field.required}
                onChange={(event) => onChange(field.id, event.target.value)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
