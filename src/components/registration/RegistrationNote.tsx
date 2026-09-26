interface RegistrationNoteProps {
  children: React.ReactNode;
}

export function RegistrationNote({ children }: RegistrationNoteProps) {
  return (
    <div className="flex gap-2 rounded-lg bg-[#eef5ff] px-3 py-2 text-[10px] text-[#536481]">
      {children}
    </div>
  );
}
