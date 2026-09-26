import type { RegistrationField } from "@/types/registrationField";

interface DynamicFormRendererProps {
  fields: RegistrationField[];
  values: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
  errors?: Record<string, string>;
}

export function DynamicFormRenderer({
  fields,
  values,
  onChange,
  errors = {},
}: DynamicFormRendererProps) {
  const sortedFields = [...fields].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-5">
      {sortedFields.map((field) => {
        const value = values[field.id] ?? "";
        const error = errors[field.id];

        return (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="text-sm font-medium">
              {field.label}

              {field.required && <span className="ml-1 text-red-500">*</span>}
            </label>

            {field.fieldType === "dropdown" ? (
              <select
                id={field.id}
                value={value}
                onChange={(event) => onChange(field.id, event.target.value)}
                required={field.required}
                className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="">Select {field.label}</option>

                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                type={field.fieldType === "phone" ? "tel" : field.fieldType}
                value={value}
                onChange={(event) => onChange(field.id, event.target.value)}
                required={field.required}
                className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            )}

            {error && (
              <p className="text-sm text-red-500" role="alert">
                {error}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
