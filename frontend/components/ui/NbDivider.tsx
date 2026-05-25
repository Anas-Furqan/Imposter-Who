import { twMerge } from "tailwind-merge";

interface NbDividerProps {
  label?: string;
  className?: string;
}

export const NbDivider = ({ label, className }: NbDividerProps) => {
  return (
    <div className={twMerge("relative py-4 w-full flex items-center justify-center", className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-b-[2.5px] border-nb-border" />
      </div>
      {label && (
        <div className="relative px-4 py-1 bg-nb-surface border-[2.5px] border-nb-border rounded-[8px] text-sm font-bold font-heading text-nb-text uppercase tracking-wider">
          {label}
        </div>
      )}
    </div>
  );
};

export default NbDivider;
