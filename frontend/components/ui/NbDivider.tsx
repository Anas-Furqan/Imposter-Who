"use client";

interface NbDividerProps {
  label?: string;
}

export default function NbDivider({ label }: NbDividerProps) {
  return (
    <div className="relative my-4 flex items-center">
      <div className="h-[2px] w-full bg-black" />
      {label && (
        <span className="absolute left-1/2 -translate-x-1/2 rounded-full border-2 border-black bg-white px-3 py-1 text-[10px] font-semibold uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
