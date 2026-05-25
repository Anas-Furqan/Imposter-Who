import { InputHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface NbInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const NbInput = ({
  label,
  error,
  icon,
  className,
  ...props
}: NbInputProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="font-body font-bold text-[14px] text-nb-text uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={twMerge(
            "w-full bg-nb-surface border-[2.5px] border-nb-border rounded-[10px] px-4 py-3 text-base outline-none transition-all",
            "focus:shadow-nb-md focus:border-nb-yellow",
            error ? "border-nb-red focus:shadow-[4px_4px_0px_#FF3B5C]" : "",
            icon ? "pl-10" : "",
            className
          )}
          {...props}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-nb-text">
            {icon}
          </div>
        )}
      </div>
      {error && <span className="text-sm text-nb-red font-medium">{error}</span>}
    </div>
  );
};

export default NbInput;
