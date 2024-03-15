import { useState } from "react";
import { AssetInfo } from "../lib/shyft";

export namespace AssetToken {
  type ItemProps = {
    selected: boolean;
    token: AssetInfo;
    onSelected: (token: AssetInfo, checked: boolean) => void;
  };

  export function Item({ token, selected, onSelected }: ItemProps) {
    const [error, setError] = useState(false);

    return (
      token.info && (
        <div className="flex space-x-4 items-center">
          <input
            checked={selected}
            type="checkbox"
            onInput={() => onSelected(token, !selected)}
          />
          {error ? (
            <div className="w-10 h-10 bg-white/20 rounded-full animate-pulse" />
          ) : (
            <img
              src={token.info.image}
              className="w-10 h-10 rounded-full"
              onError={() => setError(true)}
            />
          )}
          <div className="flex-1 flex flex-col">
            <p className="text-lg font-bold">{token.info.name}</p>
            <p className="text-sm text-stone-300">
              {token.balance} {token.info.symbol}
            </p>
          </div>
          <div className="flex-col text-end hidden">
            <p className="font-mono">
              $<span className="font-sans">1.02</span>
            </p>
            <p className="font-mono text-sm text-stone-400">
              $<span className="font-sans">0.00</span>
            </p>
          </div>
        </div>
      )
    );
  }

  export function Template() {
    return (
      <div className="flex space-x-4 items-center bg-stone-800/50 p-4 rounded-md animate-pulse">
        <div className="w-4 h-4 bg-white/20 rounded" />
        <div className="w-10 h-10 bg-white/20 rounded-full" />
        <div className="flex-1 flex flex-col space-y-2">
          <div className="h-4 bg-white/20 rounded" />
          <div className="w-24 h-3 bg-white/20 rounded" />
        </div>
        <div className="flex flex-col space-y-1">
          <div className="w-12 h-3 bg-white/20 rounded" />
          <div className="self-end w-8 h-3 bg-white/20 rounded" />
        </div>
      </div>
    );
  }
}
