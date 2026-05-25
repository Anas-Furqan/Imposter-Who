"use client";

import { ChangeEvent } from "react";

interface NbInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  error?: string;
  icon?: React.ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function NbInput({
  label,
  placeholder,
  type = "text",
  value,
  error,
  icon,
  onChange,
}: NbInputProps) {
  return (
    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-black">
      {label}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>}
        <input
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-[10px] border-[2.5px] px-4 py-3 text-sm outline-none transition-shadow ${
            icon ? "pl-10" : ""
          } ${
            error
              ? "border-[var(--nb-red)] shadow-[4px_4px_0px_#ff3b5c]"
              : "border-black focus:border-[var(--nb-yellow)] focus:shadow-[4px_4px_0px_#000]"
          }`}
        />
      </div>
      {error && <span className="text-xs text-[var(--nb-red)]">{error}</span>}
    </label>
  );
}
