import { Nft } from "@shyft-to/js";

export namespace AssetNft {
  type ItemProps = {
    nft: Nft;
    selected: boolean;
    onSelected: (item: Nft, checked: boolean) => void;
  };
  export function Item({ nft, selected, onSelected }: ItemProps) {
    return (
      <div
        className="relative h-36 flex flex-col bg-stone-800/50 rounded-md cursor-pointer"
        onClick={() => onSelected(nft, !selected)}
      >
        <input
          checked={selected}
          type="checkbox"
          className="checkbox absolute left-2 top-2"
          onChange={() => onSelected(nft, !selected)}
        />
        {nft.is_compressed && (
          <button className="absolute right-2 top-2 text-sm bg-white text-purple-700 px-3 py-0.5 rounded-full">
            CNFT
          </button>
        )}
        <div className="flex-1">
          <img
            src={nft.cached_image_uri ?? nft.image_uri}
            className="w-full h-36 object-cover rounded-md"
          />
        </div>
        <div className="absolute bottom-0 inset-x-0  p-2 bg-black/50 rounded-b-md">
          <p className="truncate">{nft.name}</p>
        </div>
      </div>
    );
  }

  export function Template() {
    return (
      <div className="relative h-36 flex flex-col bg-stone-800/50 rounded-md animate-pulse">
        <div className="absolute left-2 top-2 w-6 h-6 bg-white/20 rounded-md" />
        <div className="flex-1" />
        <div className="absolute bottom-0 inset-x-0 bg-white/10 p-2 rounded-b-md">
          <p className="h-6 bg-white/20 truncate rounded-md"></p>
        </div>
      </div>
    );
  }
}
