import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface NbTagProps {
  children: ReactNode;
  onRemove?: () => void;
  className?: string;
}

export const NbTag = ({ children, onRemove, className }: NbTagProps) => {
  return (
    <div
      className={twMerge(
        "inline-flex items-center gap-2 bg-nb-yellow text-nb-text border-2 border-nb-border rounded-[8px] px-3 py-1 shadow-[2px_2px_0px_#000] font-body font-medium",
        className
      )}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:text-nb-red focus:outline-none font-bold text-lg leading-none mt-[-2px]"
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default NbTag;
