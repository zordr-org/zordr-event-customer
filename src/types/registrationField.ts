export type FieldType = "text" | "email" | "phone" | "dropdown";

export interface RegistrationField {
  id: string;
  label: string;
  fieldType: FieldType;
  required: boolean;
  sortOrder: number;
  options?: string[];
}
