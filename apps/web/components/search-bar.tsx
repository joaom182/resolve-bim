"use client";
import { useState } from "react";
import { Search } from "react-feather";

interface SearchBarProps {
  onSearch: (entityId: number) => void;
  onReset: () => void;
}

export default function SearchBar({ onSearch, onReset }: SearchBarProps) {
  const [state, setState] = useState("");

  const handKeyPress = (event) => {
    if (event.key !== "Enter" || (!!state && isNaN(parseInt(state)))) return;

    if (!state) {
      onReset?.();
    } else {
      onSearch?.(parseInt(state));
    }
  };

  return (
    <div className={`relative bg-slate-3 p-4 `}>
      <Search className={`text-slate-12`} />
      <input
        className={`absolute pl-14 text-slate-12 left-0 top-0 w-full h-full bg-transparent ring-0 outline-none`}
        onKeyDown={handKeyPress}
        placeholder="Entity ID"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <p className="absolute right-4 top-4 text-sm text-slate-11">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-11 px-1.5 font-mono text-[10px] font-medium text-slate-12 opacity-100">
          <span className="text-xs">enter</span>
        </kbd>
      </p>
    </div>
  );
}
