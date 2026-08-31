"use client";

import { useEffect, useState } from "react";

export function CoverPicker({ currentUrl }: { currentUrl: string | null }) {
  const [preview, setPreview] = useState<string | null>(currentUrl);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : currentUrl);
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-20 h-20 shrink-0 bg-background-elevated border border-border overflow-hidden">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-[10px] text-center px-1">
            Sin imagen
          </div>
        )}
      </div>
      <input
        name="cover"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="text-sm text-muted"
      />
    </div>
  );
}
