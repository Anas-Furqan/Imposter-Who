"use client";

interface NbTagProps {
  children: React.ReactNode;
  onRemove?: () => void;
}

export default function NbTag({ children, onRemove }: NbTagProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[var(--nb-yellow)] px-3 py-1 text-xs shadow-[2px_2px_0px_#000]">
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-xs font-bold"
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
}
